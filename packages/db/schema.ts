import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

// Waitlist Schema
export const waitlist = pgTable("waitlist", {
  id: text("id").primaryKey(),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at")
    .$defaultFn(() => new Date())
    .notNull(),
});

const schema = {
  waitlist,
};

export default schema;
