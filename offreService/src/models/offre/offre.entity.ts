import {
    ObjectID,
    ObjectIdColumn,
    Column,
    Entity,
    CreateDateColumn,
    BeforeInsert
} from 'typeorm';

@Entity('offres')
export class Offre {
    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    name: string;

    @Column()
    fmsPrice: number;

    @Column({ default: 200 })
    monthlyPrice: number;

    @CreateDateColumn() creationDate: Date;

    /**
     * ISSUE : excpet : isActive will be generated automaticly if model not providing it
     * but it doesn't count it at all
     */
    @Column('boolean', {
        default: true
    })
    isActive: boolean;
}
