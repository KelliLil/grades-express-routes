import dotenv from "dotenv";

dotenv.config();

export default {
  getDbConn(db) {
    return `${process.env.DB_CONN}/${db}?retryWrites=true&w=majority`;
  },
  port: process.env.PORT || 3000,
};
