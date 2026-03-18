from flask import Flask, request, jsonify
from flask_cors import CORS
from rag.rag_engine import analyze_reviews

app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return jsonify({
        "message": "E-Commerce Review Mining API is running!",
        "status": "success"
    })

@app.route('/analyze', methods=['POST'])
def analyze():
    try:
        data = request.get_json()

        if not data:
            return jsonify({
                "error": "No data provided!"
            }), 400

        raw_reviews = data.get('reviews', '')

        if not raw_reviews:
            return jsonify({
                "error": "No reviews provided!"
            }), 400

        # Support both list and string
        if isinstance(raw_reviews, list):
            # List of reviews
            # Join into single string
            raw_reviews = '\n'.join(raw_reviews)
        elif isinstance(raw_reviews, str):
            # Plain text string
            # Use as is
            pass
        else:
            return jsonify({
                "error": "Reviews must be text or list!"
            }), 400

        if len(raw_reviews.strip()) < 10:
            return jsonify({
                "error": "Reviews too short!"
            }), 400

        print("📥 Received reviews for analysis...")

        result = analyze_reviews(raw_reviews)

        if "error" in result:
            return jsonify(result), 400

        print("✅ Analysis complete!")

        return jsonify({
            "status": "success",
            "data": result
        })

    except Exception as e:
        print(f"❌ Error: {str(e)}")
        return jsonify({
            "error": str(e)
        }), 500

@app.route('/health', methods=['GET'])
def health():
    return jsonify({
        "status": "healthy",
        "message": "API is working!"
    })

if __name__ == '__main__':
    app.run(
        debug=True,
        port=5000
    )