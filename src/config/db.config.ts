export default {
    type: 'postgres',
    host: process.env.DB_HOST ?? "localhost",
    port: parseInt(process.env.DBPORT ?? "5432"),
    username: 'postgres',
    password:  '',
    database: 'aoebetting',
    synchronize: true,
    logging: process.env ?? true,
   }