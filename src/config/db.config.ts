export default {
  type: "postgres",
  host: process.env.DB_HOST ?? "localhost",
  port: parseInt(process.env.DBPORT ?? "5432"),
  username: process.env.DB_USER ?? "postgres",
  password: process.env.DB_PASS,
  database: "aoebetting",
  synchronize: true,
  logging: process.env ?? true,
  //xWNfOpsnnGvpDMrq3h8t
};
