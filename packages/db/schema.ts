import { pgTableCreator, pgTable, text, timestamp } from "drizzle-orm/pg-core";


export const createTable = pgTableCreator((name) => `eight_${name}`);

// Waitlist Schema
export const waitlist = createTable("waitlist", {
  id: text("id").primaryKey(),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at")
    .$defaultFn(() => new Date())
    .notNull(),
},
);

const schema = {
  waitlist
};

export default schema;
