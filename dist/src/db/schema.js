"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dangerZonesTable = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
exports.dangerZonesTable = (0, pg_core_1.pgTable)("dangerzones", {
    id: (0, pg_core_1.integer)().primaryKey().generatedAlwaysAsIdentity(),
    name: (0, pg_core_1.varchar)({ length: 255 }).notNull(),
    radius: (0, pg_core_1.integer)().notNull(),
    temporary: (0, pg_core_1.boolean)().notNull(),
    expires: (0, pg_core_1.timestamp)().notNull(),
    lat: (0, pg_core_1.doublePrecision)().notNull(),
    lng: (0, pg_core_1.doublePrecision)().notNull(),
});
//# sourceMappingURL=schema.js.map