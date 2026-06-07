import os
import re
from groq import Groq
from dotenv import load_dotenv
from .vector_store import store_reviews, get_relevant_reviews
from .preprocessor import parse_reviews

load_dotenv()

# Setup Groq client
client = Groq(api_key=os.getenv("GROQ_API_KEY"))

def analyze_reviews(raw_text):
    # Step 1 - Clean & parse reviews
    reviews = parse_reviews(raw_text)

    if len(reviews) == 0:
        return {"error": "No valid reviews found!"}

    print(f"Parsed {len(reviews)} reviews")

    # Step 2 - Store in ChromaDB
    store_reviews(reviews)

    # Step 3 - Get relevant reviews
    relevant = get_relevant_reviews(
        query="product quality features performance experience",
        n=50
    )

    print(f"Retrieved {len(relevant)} relevant reviews")

    # Step 4 - Build prompt
    reviews_text = "\n".join([f"- {r}" for r in relevant])

    prompt = f"""
You are an expert product review analyzer for an e-commerce platform.
You work for ALL product categories - electronics, clothes, shoes,
furniture, food, beauty products, anything!

Analyze the following customer reviews carefully.

REVIEWS:
{reviews_text}

Based on these reviews, provide analysis in this EXACT format:

PRODUCT CATEGORY: [detect what type of product this is from reviews]

RATING: [give a number between 1.0 to 5.0 based on overall sentiment]

SUMMARY: [write 3-4 lines summarizing overall customer experience]

PROS:
- [pro 1]
- [pro 2]
- [pro 3]
- [pro 4]
- [pro 5]

CONS:
- [con 1]
- [con 2]
- [con 3]
- [con 4]
- [con 5]

SENTIMENT:
Positive: [percentage]%
Negative: [percentage]%
Neutral: [percentage]%

ASPECTS:
- [Aspect Name]: [X]/5
- [Aspect Name]: [X]/5
- [Aspect Name]: [X]/5
- [Aspect Name]: [X]/5
- [Aspect Name]: [X]/5

FAKE REVIEWS: [number of suspicious reviews and brief reason]

VERDICT: [One powerful line final verdict]

STRICT RULES:
- Only analyze what is actually mentioned in reviews
- Never make up or assume information
- Handle negation correctly eg not bad = positive
- Handle sarcasm correctly eg oh great it broke = negative
- Be honest about limitations
- Works for ANY product category
- Detect category automatically from context
- For ASPECTS detect top 5 most mentioned aspects
- Only include aspects actually mentioned in reviews
- If aspect not mentioned skip it
"""

    # Step 5 - Send to Groq
    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ],
        temperature=0.3,
        max_tokens=1500
    )

    # Step 6 - Get response
    result = response.choices[0].message.content

    print("=== RAW GROQ RESPONSE ===")
    print(result)
    print("=========================")

    # Step 7 - Parse response
    return parse_response(result)


def parse_response(text):
    result = {
        "product_category": "",
        "rating": 0.0,
        "summary": "",
        "pros": [],
        "cons": [],
        "sentiment": {
            "positive": 0,
            "negative": 0,
            "neutral": 0
        },
        "aspects": {},
        "fake_reviews": "",
        "verdict": ""
    }

    lines = text.split('\n')
    current_section = None

    for line in lines:
        line = line.strip()

        if not line:
            continue

        # Remove markdown bold
        clean_line = line.replace('**', '').strip()

        # Product Category
        if clean_line.startswith('PRODUCT CATEGORY:'):
            result['product_category'] = clean_line.replace(
                'PRODUCT CATEGORY:', ''
            ).strip()
            current_section = None

        # Rating
        elif clean_line.startswith('RATING:'):
            try:
                rating_str = clean_line.replace(
                    'RATING:', ''
                ).strip()
                numbers = re.findall(
                    r'\d+\.?\d*', rating_str
                )
                if numbers:
                    result['rating'] = float(numbers[0])
            except:
                result['rating'] = 0.0
            current_section = None

        # Summary
        elif clean_line.startswith('SUMMARY:'):
            result['summary'] = clean_line.replace(
                'SUMMARY:', ''
            ).strip()
            current_section = 'summary'

        # Sections
        elif clean_line == 'PROS:':
            current_section = 'pros'

        elif clean_line == 'CONS:':
            current_section = 'cons'

        elif clean_line == 'SENTIMENT:':
            current_section = 'sentiment'

        elif clean_line == 'ASPECTS:':
            current_section = 'aspects'

        # Fake Reviews
        elif clean_line.startswith('FAKE REVIEWS:'):
            result['fake_reviews'] = clean_line.replace(
                'FAKE REVIEWS:', ''
            ).strip()
            current_section = None

        # Verdict
        elif clean_line.startswith('VERDICT:'):
            result['verdict'] = clean_line.replace(
                'VERDICT:', ''
            ).strip()
            current_section = None

        # Pros list
        elif current_section == 'pros' and \
                clean_line.startswith('-'):
            item = clean_line[1:].strip()
            if item:
                result['pros'].append(item)

        # Cons list
        elif current_section == 'cons' and \
                clean_line.startswith('-'):
            item = clean_line[1:].strip()
            if item:
                result['cons'].append(item)

        # Sentiment percentages
        elif current_section == 'sentiment':
            if 'Positive:' in clean_line:
                try:
                    numbers = re.findall(
                        r'\d+', clean_line
                    )
                    if numbers:
                        result['sentiment'][
                            'positive'
                        ] = int(numbers[0])
                except:
                    pass
            elif 'Negative:' in clean_line:
                try:
                    numbers = re.findall(
                        r'\d+', clean_line
                    )
                    if numbers:
                        result['sentiment'][
                            'negative'
                        ] = int(numbers[0])
                except:
                    pass
            elif 'Neutral:' in clean_line:
                try:
                    numbers = re.findall(
                        r'\d+', clean_line
                    )
                    if numbers:
                        result['sentiment'][
                            'neutral'
                        ] = int(numbers[0])
                except:
                    pass

        # Dynamic aspects
        elif current_section == 'aspects':
            # Remove leading dash
            aspect_line = clean_line.lstrip('-').strip()

            # Skip instruction lines
            if aspect_line.startswith('[') or \
                aspect_line.startswith('*') or \
                aspect_line.startswith('Example') or \
                aspect_line.startswith('Only') or \
                aspect_line.startswith('DO') or \
                aspect_line.startswith('Format') or \
                aspect_line.startswith('Detect') or \
                aspect_line.startswith('Rate') or \
                not aspect_line:
                continue

            if ':' in aspect_line:
                parts = aspect_line.split(':')
                if len(parts) >= 2:
                    aspect_name = parts[0].strip()
                    aspect_value = ':'.join(
                        parts[1:]
                    ).strip()

                    # Clean markdown
                    aspect_name = aspect_name.replace(
                        '**', ''
                    ).strip()
                    aspect_value = aspect_value.replace(
                        '**', ''
                    ).strip()

                    # Validate
                    if aspect_name and \
                        aspect_value and \
                        len(aspect_name) < 30 and \
                        len(aspect_name) > 1 and \
                        aspect_name not in [
                            'FAKE REVIEWS',
                            'VERDICT',
                            'RATING',
                            'SUMMARY',
                            'ASPECTS',
                            'SENTIMENT',
                            'PRODUCT CATEGORY'
                        ]:
                        result['aspects'][
                            aspect_name
                        ] = aspect_value

        # Summary continuation
        elif current_section == 'summary':
            if not any(clean_line.startswith(s) for s in [
                'PROS', 'CONS', 'SENTIMENT',
                'ASPECTS', 'FAKE', 'VERDICT',
                'RATING', 'PRODUCT'
            ]):
                if result['summary']:
                    result['summary'] += ' ' + clean_line

    print(f" Parsed aspects: {result['aspects']}")
    return result