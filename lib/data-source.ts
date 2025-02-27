import "reflect-metadata";
import { DataSource } from "typeorm";
import { Event } from "@/entities/Event";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST, // Use Docker service name
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true, // Auto-create tables (disable in production)
  logging: false,
  entities: [Event],
});
