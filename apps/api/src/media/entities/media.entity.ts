import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Media {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  episodeNo: number;

  @Column()
  anilistId: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => "CURRENT_TIMESTAMP + INTERVAL '1 hour'",
  })
  expiresAt: Date;
}
