import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('order')
export class Order{
    
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    amount:number
}