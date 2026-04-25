from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from webdriver_manager.chrome import ChromeDriverManager
import time

options = Options()
options.add_argument("--disable-blink-features=AutomationControlled")
options.add_experimental_option("excludeSwitches", ["enable-automation"])
options.add_experimental_option("useAutomationExtension", False)
options.add_argument("--window-size=1920,1080")
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

url = "https://www.flipkart.com/frippe-luxe-nude-20-g/product-reviews/itmee1ce1b77260f?pid=ESDHCJFMRGPFKY5M"
print("🌐 Loading Flipkart...")
driver.get(url)

# Wait longer for JS to load
print("⏳ Waiting for page to fully load...")
time.sleep(6)

# Scroll down slowly to trigger JS rendering
print("📜 Scrolling to load reviews...")
for i in range(5):
    driver.execute_script("window.scrollBy(0, 400)")
    time.sleep(1)

time.sleep(3)

print(f"📄 Title: {driver.title}")

# Print ALL div classes on page to find correct one
all_divs = driver.find_elements(By.TAG_NAME, "div")
print(f"Total divs on page: {len(all_divs)}")

# Look for divs containing review-like text
print("\n🔍 Searching for review text...")
for div in all_divs:
    try:
        text = div.text.strip()
        classes = div.get_attribute("class")
        # Look for divs with short review-like text
        if text and 20 < len(text) < 300 and classes:
            if any(word in text.lower() for word in ["good", "nice", "product", "quality", "happy", "love", "worst", "bad", "amazing"]):
                print(f"✅ Class: {classes}")
                print(f"   Text: {text[:100]}")
                print()
    except:
        continue

input("\nPress Enter to close...")
driver.quit()