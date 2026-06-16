import axios from "axios";

export const getRecommendations =
  async () => {

    const token =
      localStorage.getItem(
        "token"
      );

    return axios.get(
      "http://localhost:5000/api/ai/recommend",
      {
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      }
    );
};