export default {
    type: 'postgres',
    host: process.env.DB_HOST ?? "localhost",
    port: parseInt(process.env.DBPORT ?? "5432"),
    username: process.env.DB_USER,
    password:  process.env.DB_PASS,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: process.env ?? true,
   }