import re

def clean_review(text):
    # Remove HTML tags
    text = re.sub(r'<[^>]+>', '', text)

    # Remove HTML entities
    text = re.sub(r'&[a-zA-Z]+;', '', text)

    # Remove URLs
    text = re.sub(r'http\S+|www\S+', '', text)

    # Remove email addresses
    text = re.sub(r'\S+@\S+', '', text)

    # Remove star ratings like ★★★★☆ or ☆☆☆
    text = re.sub(r'[★☆⭐]+', '', text)

    # Remove star ratings like 5/5 or 4.5/5
    text = re.sub(r'\d+(\.\d+)?/\d+', '', text)

    # Remove dates like "12 January 2024"
    text = re.sub(
        r'\b\d{1,2}[/-]\d{1,2}[/-]\d{2,4}\b',
        '', text
    )
    text = re.sub(
        r'\b(?:January|February|March|April|May|'
        r'June|July|August|September|October|'
        r'November|December)\s+\d{1,2},?\s+\d{4}\b',
        '', text, flags=re.IGNORECASE
    )
    text = re.sub(
        r'\b\d{1,2}\s+(?:January|February|March|'
        r'April|May|June|July|August|September|'
        r'October|November|December)\s+\d{4}\b',
        '', text, flags=re.IGNORECASE
    )

    # Remove "Verified Purchase"
    text = re.sub(
        r'verified\s+purchase', '',
        text, flags=re.IGNORECASE
    )

    # Remove "X people found this helpful"
    text = re.sub(
        r'\d+\s+people?\s+found\s+this\s+helpful',
        '', text, flags=re.IGNORECASE
    )

    # Remove "helpful" standalone
    text = re.sub(
        r'\bhelpful\b', '',
        text, flags=re.IGNORECASE
    )

    # Remove "Report abuse"
    text = re.sub(
        r'report\s+abuse', '',
        text, flags=re.IGNORECASE
    )

    # Remove reviewer patterns
    text = re.sub(
        r'(reviewed?\s+by|by)\s+\w+',
        '', text, flags=re.IGNORECASE
    )

    # Remove "Top Reviewer" badges
    text = re.sub(
        r'top\s+\d*\s*reviewer',
        '', text, flags=re.IGNORECASE
    )

    # Remove emojis
    text = re.sub(
        r'[\U00010000-\U0010ffff]', '',
        text, flags=re.UNICODE
    )
    text = re.sub(
        r'[\u2600-\u26FF\u2700-\u27BF]', '', text
    )

    # Remove special characters
    # Keep letters numbers spaces basic punctuation
    text = re.sub(r'[^a-zA-Z0-9\s.,!?]', ' ', text)

    # Remove standalone numbers
    text = re.sub(r'\b\d+\b', '', text)

    # Remove extra whitespace
    text = re.sub(r'\s+', ' ', text)

    # Strip
    text = text.strip()

    return text


def is_valid_review(text):
    # Must have at least 5 words
    words = text.split()
    if len(words) < 5:
        return False

    # Must have at least 20 characters
    if len(text) < 20:
        return False

    # Must have enough letters
    letters = re.sub(r'[^a-zA-Z]', '', text)
    if len(letters) < 10:
        return False

    # Skip common noise phrases
    noise_phrases = [
        'verified purchase',
        'helpful',
        'report abuse',
        'top reviewer',
        'read more',
        'read less',
        'show more',
        'see more',
        'load more',
        'sort by',
        'filter by',
        'write a review',
        'customer review',
        'customer reviews',
        'out of stars',
        'global ratings',
        'top reviews',
    ]

    text_lower = text.lower().strip()
    for phrase in noise_phrases:
        if text_lower == phrase:
            return False

    return True


def split_into_sentences(text):
    # Split long paragraph into sentences
    sentences = re.split(r'(?<=[.!?])\s+', text)
    return [s.strip() for s in sentences if s.strip()]


def parse_reviews(raw_text):
    # First split by new lines
    lines = raw_text.split('\n')

    all_segments = []

    for line in lines:
        line = line.strip()

        if not line:
            continue

        # If line is very long paragraph
        # split into sentences
        if len(line) > 200:
            sentences = split_into_sentences(line)
            all_segments.extend(sentences)
        else:
            all_segments.append(line)

    cleaned_reviews = []

    for segment in all_segments:
        # Clean the segment
        cleaned = clean_review(segment)

        # Check if valid
        if is_valid_review(cleaned):
            cleaned_reviews.append(cleaned)

    # Remove duplicates keep order
    seen = set()
    unique_reviews = []
    for review in cleaned_reviews:
        normalized = review.lower().strip()
        if normalized not in seen:
            seen.add(normalized)
            unique_reviews.append(review)

    print(f"📝 Original lines: {len(lines)}")
    print(f"✅ Valid segments: {len(unique_reviews)}")

    return unique_reviews