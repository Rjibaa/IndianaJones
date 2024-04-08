import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('train')
export class Train {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({
      length: 50
    })
    departureCity: string;

    @Column({
        length: 50
      })
    arrivalCity: string;

    @Column({
        length: 5
      })
    departureTime: string;

    @Column({
        length: 5
      })
    travelTime: string; 
}