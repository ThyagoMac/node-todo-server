import fastify from "fastify";
import { createGoal } from "../services/create-goal";
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from "fastify-type-provider-zod";
import z from "zod";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

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

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log("http server running in http://localhost:3333/goals");
  });

//postgresql://maindb_owner:Wx2qa8eVTgUE@ep-floral-water-a58l88dr.us-east-2.aws.neon.tech/maindb?sslmode=require
