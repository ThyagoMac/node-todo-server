import { z } from "zod";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { createGoal } from "../../services/create-goal";
import { createGoalCompletion } from "../../services/create-goal-completion";

export const createCompletionRoute: FastifyPluginAsyncZod = async (
  app,
  _opts
) => {
  app.post(
    "/goals-completions",
    {
      schema: {
        body: z.object({
          goalId: z.string(),
        }),
      },
    },
    async (request) => {
      const { goalId } = request.body;

      await createGoalCompletion({
        goalId: goalId,
      });
    }
  );
};
