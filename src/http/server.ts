import fastify from "fastify";
import { createGoal } from "../services/create-goal";
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from "fastify-type-provider-zod";
import z from "zod";
import { getWeekPendingGoals } from "../services/get-pending-goals";
import { createGoalCompletion } from "../services/create-goal-completion";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.get("/pending-goals", async () => {
  const { pendingGoals } = await getWeekPendingGoals();

  return { pendingGoals };
});

app.post(
  "/goals",
  {
    schema: {
      body: z.object({
        title: z.string(),
        desiredWeeklyFrequency: z.number().int().min(1).max(7),
      }),
    },
  },
  async (request) => {
    const { title, desiredWeeklyFrequency } = request.body;

    await createGoal({
      title: title,
      desiredWeeklyFrequency: desiredWeeklyFrequency,
    });
  }
);

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

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log("http server running in http://localhost:3333/goals");
  });

//postgresql://maindb_owner:Wx2qa8eVTgUE@ep-floral-water-a58l88dr.us-east-2.aws.neon.tech/maindb?sslmode=require
