import axios from "axios";

export const getAIRecommendations =
  async (tasks, notes) => {

    const response =
      await axios.post(
        "http://localhost:8000/recommend",
        {
          tasks,
          notes,
        }
      );

    return response.data;
};