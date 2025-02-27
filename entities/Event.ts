import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name: string;

  @Column()
  date: string;

  constructor(id: number, name: string, date: string) {
    this.id = id;
    this.name = name;
    this.date = date;
  }
}
