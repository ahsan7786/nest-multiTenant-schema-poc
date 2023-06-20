import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('resturant')
export class Resturant{

    @PrimaryGeneratedColumn()
    id:number

    @Column()
    name:string


}