from flask import Flask, request, jsonify
from flask_cors import CORS
from rag.rag_engine import analyze_reviews
from rag.scraper import scrape_reviews
from rag.dataset_search import search_product_reviews, get_available_products

app = Flask(__name__)
CORS(app)


# ── HOME ────────────────────────────────────────────────────
@app.route('/')
def home():
    return jsonify({
        "message": "E-Commerce Review Mining API is running!",
        "status": "success"
    })


# ── MODE 1: ANALYZE (paste reviews manually) ───────────────
@app.route('/analyze', methods=['POST'])
def analyze():
    try:
        data = request.get_json()

        if not data:
            return jsonify({"error": "No data provided!"}), 400

        raw_reviews = data.get('reviews', '')

        if not raw_reviews:
            return jsonify({"error": "No reviews provided!"}), 400

        if isinstance(raw_reviews, list):
            raw_reviews = '\n'.join(raw_reviews)
        elif isinstance(raw_reviews, str):
            pass
        else:
            return jsonify({"error": "Reviews must be text or list!"}), 400

        if len(raw_reviews.strip()) < 10:
            return jsonify({"error": "Reviews too short!"}), 400

        print("📥 Mode 1 — Manual reviews received...")
        result = analyze_reviews(raw_reviews)

        if "error" in result:
            return jsonify(result), 400

        print("✅ Analysis complete!")
        return jsonify({"status": "success", "data": result})

    except Exception as e:
        print(f"❌ Error: {str(e)}")
        return jsonify({"error": str(e)}), 500


# ── MODE 2: SCRAPE + ANALYZE (paste Flipkart URL) ──────────
@app.route('/scrape-analyze', methods=['POST'])
def scrape_and_analyze():
    try:
        data = request.get_json()

        if not data:
            return jsonify({"error": "No data provided!"}), 400

        url = data.get('url', '').strip()

        if not url:
            return jsonify({"error": "No URL provided!"}), 400

        if "flipkart" not in url.lower() and "amazon" not in url.lower():
            return jsonify({"error": "Please provide a valid Flipkart or Amazon URL!"}), 400

        print(f"🌐 Mode 2 — Starting scrape for: {url}")

        reviews, error = scrape_reviews(url, max_pages=3)

        if error:
            return jsonify({"error": error}), 400

        if not reviews or len(reviews) < 3:
            return jsonify({
                "error": "Not enough reviews found. Try again or paste reviews manually."
            }), 400

        raw_reviews = '\n'.join(reviews)

        print(f"📊 Analyzing {len(reviews)} scraped reviews...")
        result = analyze_reviews(raw_reviews)

        if "error" in result:
            return jsonify(result), 400

        print("✅ Scrape + Analysis complete!")
        return jsonify({
            "status": "success",
            "reviews_scraped": len(reviews),
            "data": result
        })

    except Exception as e:
        print(f"❌ Error: {str(e)}")
        return jsonify({"error": str(e)}), 500


# ── MODE 3: DATASET SEARCH + ANALYZE (type product name) ───
@app.route('/dataset-analyze', methods=['POST'])
def dataset_analyze():
    try:
        data = request.get_json()

        if not data:
            return jsonify({"error": "No data provided!"}), 400

        product_name = data.get('product_name', '').strip()

        if not product_name:
            return jsonify({"error": "No product name provided!"}), 400

        print(f"🔍 Mode 3 — Searching dataset for: '{product_name}'")

        # Step 1 — Search dataset
        reviews, product_info, error = search_product_reviews(product_name, max_reviews=60)

        if error:
            return jsonify({"error": error}), 400

        if not reviews or len(reviews) < 2:
            return jsonify({
                "error": f"Not enough reviews found for '{product_name}'. Try a different product name."
            }), 400

        # Step 2 — Join reviews
        raw_reviews = '\n'.join(reviews)

        print(f"📊 Analyzing {len(reviews)} dataset reviews for '{product_name}'...")

        # Step 3 — Send to RAG pipeline
        result = analyze_reviews(raw_reviews)

        if "error" in result:
            return jsonify(result), 400

        print("✅ Dataset + Analysis complete!")

        return jsonify({
            "status": "success",
            "product_info": product_info,
            "reviews_analyzed": len(reviews),
            "data": result
        })

    except Exception as e:
        print(f"❌ Error: {str(e)}")
        return jsonify({"error": str(e)}), 500


# ── GET AVAILABLE PRODUCTS (for suggestions) ───────────────
@app.route('/products', methods=['GET'])
def get_products():
    try:
        products = get_available_products(limit=50)
        return jsonify({
            "status": "success",
            "products": products
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ── HEALTH ──────────────────────────────────────────────────
@app.route('/health', methods=['GET'])
def health():
    return jsonify({
        "status": "healthy",
        "message": "API is working!"
    })


if __name__ == '__main__':
    app.run(debug=True, port=5000)