import pandas as pd
import os

# ── Load dataset once when server starts ────────────────────
DATASET_PATH = os.path.join(os.path.dirname(__file__), "data", "1429_1.csv")

df_cache = None

def load_dataset():
    """Load CSV dataset into memory — called once on startup"""
    global df_cache
    if df_cache is not None:
        return df_cache

    try:
        print(" Loading dataset...")
        df = pd.read_csv(DATASET_PATH, on_bad_lines='skip', low_memory=False)

        # Keep only columns we need
        cols_needed = ['name', 'brand', 'categories', 'reviews.text', 'reviews.title', 'reviews.rating']
        df = df[[c for c in cols_needed if c in df.columns]]

        # Drop rows with no review text
        df = df.dropna(subset=['reviews.text'])
        df = df[df['reviews.text'].str.strip() != '']

        df_cache = df
        print(f"Dataset loaded! Total reviews: {len(df)}")
        return df

    except Exception as e:
        print(f" Failed to load dataset: {str(e)}")
        return None


def search_product_reviews(product_name, max_reviews=60):
    """
    Search dataset for reviews matching product name
    Returns: (reviews_list, product_info, error_message)
    """
    try:
        df = load_dataset()

        if df is None:
            return None, None, "Dataset could not be loaded. Please check the CSV file."

        if not product_name or len(product_name.strip()) < 2:
            return None, None, "Please enter a valid product name."

        query = product_name.strip().lower()
        print(f"🔍 Searching dataset for: '{query}'")

        # Search in name column (case insensitive, partial match)
        mask = df['name'].str.lower().str.contains(query, na=False)

        # Also search in brand if no results
        if mask.sum() == 0 and 'brand' in df.columns:
            mask = df['brand'].str.lower().str.contains(query, na=False)

        # Also search in categories
        if mask.sum() == 0 and 'categories' in df.columns:
            mask = df['categories'].str.lower().str.contains(query, na=False)

        matched = df[mask]

        if matched.empty:
            return None, None, f"No reviews found for '{product_name}'. Try a different product name or paste reviews manually."

        print(f" Found {len(matched)} reviews for '{product_name}'")

        # Get product info
        product_info = {
            "name": matched['name'].iloc[0] if 'name' in matched.columns else product_name,
            "brand": matched['brand'].iloc[0] if 'brand' in matched.columns else "Unknown",
            "total_reviews_in_dataset": len(matched)
        }

        # Combine title + review text for richer context
        reviews = []
        for _, row in matched.head(max_reviews).iterrows():
            title = str(row.get('reviews.title', '')).strip()
            text = str(row.get('reviews.text', '')).strip()

            if title and title != 'nan' and text and text != 'nan':
                combined = f"{title}. {text}"
            elif text and text != 'nan':
                combined = text
            else:
                continue

            if len(combined) > 10:
                reviews.append(combined)

        if not reviews:
            return None, None, f"Reviews found but could not extract text for '{product_name}'."

        print(f" Extracted {len(reviews)} reviews for analysis")
        return reviews, product_info, None

    except Exception as e:
        return None, None, f"Search failed: {str(e)}"


def get_available_products(limit=20):
    """Return list of available product names in dataset"""
    try:
        df = load_dataset()
        if df is None:
            return []

        products = df['name'].dropna().unique().tolist()
        return products[:limit]

    except:
        return []