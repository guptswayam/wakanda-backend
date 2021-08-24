import { Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("missions")
export class Mission {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column()
  name: string

  @Column({type: "text"})
  brief: string
  
  @Column({type: "enum", enum: ["inductee", "soldier", "avenger"], default: "inductee"})
  minLevel: string

  @Column()
  points:Number

  @DeleteDateColumn()
  deletedAt: Date

}