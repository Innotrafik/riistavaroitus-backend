import { boolean, doublePrecision, integer, pgTable, pgView, timestamp, varchar } from "drizzle-orm/pg-core";

export const dangerZoneTypesTable = pgTable("dangerzonetypes", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
});

export const dangerZonesTable = pgTable("dangerzones", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  radius: integer().notNull(),
  temporary: boolean().notNull(),
  expires: timestamp().default(null),
  lat: doublePrecision().notNull(),
  lng: doublePrecision().notNull(),
  type: integer().references(() => dangerZoneTypesTable.id).notNull(),
  created: timestamp().notNull().defaultNow(),
  updated: timestamp().$onUpdate(() => new Date()),
});