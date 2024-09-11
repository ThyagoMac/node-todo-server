import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { getWeekSummary } from "../../services/get-week-summary";

export const getWeekSummaryRoute: FastifyPluginAsyncZod = async (
  app,
  _opts
) => {
  app.get("/week-summary", async () => {
    const { summary } = await getWeekSummary();

    return { summary };
  });
};
