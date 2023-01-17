import { type } from "os";
import {   Client } from "src/client/entity/client.entity";
import { Plant } from "src/plant/entity/plant.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    state: string;
    @ManyToOne(type=> Client, Client=>Client.orders)

    client: Client;
    @ManyToOne(type=> Plant, Plant=>Plant.orders )
    @JoinColumn({ name : "Plant"})
    plant :Plant;
    
}