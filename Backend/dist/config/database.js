"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const pg_1 = require("pg");
exports.db = new pg_1.Pool({
    host: "localhost",
    port: 5432,
    user: "kasse_user",
    password: "kasse_password",
    database: "kasse_db"
});
