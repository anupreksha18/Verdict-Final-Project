import axios from "axios";

const BASE_URL = "http://127.0.0.1:5000";

// Mode 1 — Paste reviews manually
export const analyzeReviews = async (reviews) => {
  const response = await axios.post(
    `${BASE_URL}/analyze`,
    { reviews }
  );
  return response.data;
};

// Mode 2 — Paste Flipkart URL
export const scrapeAndAnalyze = async (url) => {
  const response = await axios.post(
    `${BASE_URL}/scrape-analyze`,
    { url },
    { timeout: 120000 } // 2 min timeout for scraping
  );
  return response.data;
};

// Mode 3 — Search by product name
export const datasetAnalyze = async (product_name) => {
  const response = await axios.post(
    `${BASE_URL}/dataset-analyze`,
    { product_name }
  );
  return response.data;
};

// Get available products list
export const getProducts = async () => {
  const response = await axios.get(`${BASE_URL}/products`);
  return response.data;
};