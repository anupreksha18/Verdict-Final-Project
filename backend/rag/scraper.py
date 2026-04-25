from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
import time
import random


def get_driver():
    """Setup Chrome driver — visible window for better compatibility"""
    options = Options()
    options.add_argument("--disable-blink-features=AutomationControlled")
    options.add_experimental_option("excludeSwitches", ["enable-automation"])
    options.add_experimental_option("useAutomationExtension", False)
    options.add_argument("--window-size=1920,1080")
    options.add_argument("--disable-notifications")
    options.add_argument(
        "user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
        "AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/120.0.0.0 Safari/537.36"
    )
    driver = webdriver.Chrome(
        service=Service(ChromeDriverManager().install()),
        options=options
    )
    driver.execute_script(
        "Object.defineProperty(navigator, 'webdriver', {get: () => undefined})"
    )
    return driver


def extract_asin(url):
    """Extract ASIN from Amazon URL"""
    try:
        parts = url.split("/")
        for i, part in enumerate(parts):
            if part in ["dp", "product", "gp"]:
                return parts[i + 1].split("?")[0]
        return None
    except:
        return None


def build_flipkart_reviews_url(url):
    """Convert Flipkart product URL to reviews URL"""
    try:
        # Extract product path and pid
        # e.g. /frippe-luxe-nude-20-g/p/itmee1ce1b77260f?pid=XXX
        # becomes /frippe-luxe-nude-20-g/product-reviews/itmee1ce1b77260f?pid=XXX
        if "/product-reviews/" in url:
            return url  # already a reviews URL

        pid = None
        if "pid=" in url:
            pid = url.split("pid=")[1].split("&")[0]

        # Replace /p/ with /product-reviews/
        reviews_url = url.replace("/p/", "/product-reviews/")

        # Remove extra params after pid
        if "?" in reviews_url:
            base = reviews_url.split("?")[0]
            reviews_url = f"{base}?pid={pid}" if pid else base

        return reviews_url
    except:
        return url


def scrape_flipkart_reviews(url, max_pages=3):
    """
    Scrape Flipkart reviews using Selenium
    Returns: (reviews_list, error_message)
    """
    driver = None
    reviews = []

    try:
        print(f"🔍 Scraping Flipkart reviews...")
        driver = get_driver()

        # Convert to reviews URL
        reviews_url = build_flipkart_reviews_url(url)
        print(f"📄 Reviews URL: {reviews_url}")

        for page in range(1, max_pages + 1):

            # Add page number
            if page == 1:
                page_url = reviews_url
            else:
                page_url = f"{reviews_url}&page={page}" if "?" in reviews_url else f"{reviews_url}?page={page}"

            print(f"📄 Loading page {page}...")
            driver.get(page_url)

            # Wait for page to load
            time.sleep(5)

            # Scroll to trigger JS rendering
            for _ in range(4):
                driver.execute_script("window.scrollBy(0, 500)")
                time.sleep(0.8)

            time.sleep(2)

            # Use the correct selector found from inspection
            selectors = [
                "div.css-146c3p1",   # ✅ Pure review text — confirmed working!
                "div.fWi7J_",        # Full review card fallback
                "div.yiQOTv",        # Another fallback
            ]

            found = False
            for selector in selectors:
                elements = driver.find_elements(By.CSS_SELECTOR, selector)
                if elements:
                    for el in elements:
                        text = el.text.strip()
                        if text and len(text) > 10:
                            reviews.append(text)
                    print(f"✅ Found {len(elements)} reviews on page {page} with {selector}")
                    found = True
                    break

            if not found:
                print(f"⚠️ No reviews on page {page}")
                break

            time.sleep(random.uniform(2.0, 3.0))

        if not reviews:
            return None, "No reviews found on Flipkart. Please try again."

        # Remove duplicates
        reviews = list(dict.fromkeys(reviews))
        print(f"✅ Total Flipkart reviews scraped: {len(reviews)}")
        return reviews, None

    except Exception as e:
        return None, f"Flipkart scraping failed: {str(e)}"

    finally:
        if driver:
            driver.quit()


def scrape_amazon_reviews(url, max_pages=3):
    """
    Amazon requires login — not supported currently
    """
    return None, "Amazon requires login to access reviews. Please use a Flipkart URL or paste reviews manually."


def scrape_reviews(url, max_pages=3):
    """
    Auto detect site and scrape reviews
    Main function called from app.py
    Returns: (reviews_list, error_message)
    """
    url_lower = url.lower()

    if "flipkart" in url_lower:
        print("🛒 Detected: Flipkart")
        return scrape_flipkart_reviews(url, max_pages)

    elif "amazon" in url_lower:
        print("🛒 Detected: Amazon")
        return scrape_amazon_reviews(url, max_pages)

    else:
        return None, "Currently supports Flipkart URLs. Amazon requires login. You can also paste reviews manually!"