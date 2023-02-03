import dotenv from "dotenv";

dotenv.config();

export default {
  dbConn: process.env.DB_CONN,
  jwtSecret: process.env.JWT_SECRET,
  port: process.env.PORT || 3000,
};
