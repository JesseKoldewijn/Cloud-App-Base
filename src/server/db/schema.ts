// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import {
  bigint,
  boolean,
  index,
  mysqlTableCreator,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = mysqlTableCreator(
  (name) => `cloud-app-base_${name}`,
);

export const notesConfig = {
  name: {
    minLength: 5,
    maxLength: 256,
  },
  content: {
    minLength: 5,
    maxLength: 1500,
  },
};

export const notes = createTable(
  "note",
  {
    id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
    name: varchar("name", { length: notesConfig.name.maxLength }),
    slug: varchar("slug", { length: 256 }).unique().notNull(),
    content: varchar("content", { length: notesConfig.content.maxLength }),
    note_color: varchar("note_color", { length: 256 }).default("none"),
    note_color_isDark: boolean("note_color_is_dark"),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at").onUpdateNow(),
  },
  (example) => ({
    nameIndex: index("name_idx").on(example.name),
  }),
);
