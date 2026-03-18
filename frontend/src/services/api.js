import axios from "axios";

const BASE_URL = "http://127.0.0.1:5000";

export const analyzeReviews = async (reviews) => {
  const response = await axios.post(
    `${BASE_URL}/analyze`,
    { reviews }
  );
  return response.data;
};