import { SnakeNamingStrategy } from "typeorm-naming-strategies";
module.exports = {
  type: "postgre",
  host: "localhost",
  port: "4000",
  username: "test",
  password: "test",
  database: "test",
  synchronize: true,
  logging: true,
  entities: ["src/entity/**/*.ts"],
};
