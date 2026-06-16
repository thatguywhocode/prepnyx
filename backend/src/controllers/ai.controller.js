import Task from "../models/task.model.js";
import Note from "../models/note.model.js";

import {
  getAIRecommendations
} from "../services/ai.service.js";

export const recommend =
  async (req, reply) => {

    const tasks =
      await Task.find({
        userId: req.user.id,
      });

    const notes =
      await Note.find({
        userId: req.user.id,
      });

    const result =
      await getAIRecommendations(
        tasks,
        notes
      );

    return reply.send(result);
};