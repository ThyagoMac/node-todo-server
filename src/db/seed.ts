import dayjs from "dayjs";
import { client, db } from ".";
import { goalCompletions, goals } from "./schema";

async function seed() {
  await db.delete(goalCompletions);
  await db.delete(goals);

  const startofWeek = dayjs().startOf("week");

  const finalGoals = await db
    .insert(goals)
    .values([
      { title: "Acortar as 5:00AM", desiredWeeklyFrequency: 4 },
      { title: "Fazer exercicios", desiredWeeklyFrequency: 5 },
      { title: "Estudar node", desiredWeeklyFrequency: 2 },
    ])
    .returning();

  await db.insert(goalCompletions).values([
    { goalId: finalGoals[1].id, createdAt: startofWeek.toDate() },
    { goalId: finalGoals[0].id, createdAt: startofWeek.add(2, "day").toDate() },
  ]);
}

seed().finally(() => {
  client.end();
});
