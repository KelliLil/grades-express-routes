import dotenv from "dotenv";

dotenv.config();

export default {
  dbConn: process.env.DB_CONN,
  port: process.env.PORT || 3000,
  config: process.env.SALT_ROUNDS || 10,
};
