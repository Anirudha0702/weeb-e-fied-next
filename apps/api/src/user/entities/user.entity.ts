import { Gender } from '@prisma/client';

export class UserEntity {
  id: string;
  name: string;
  email: string;
  password: string;
  photoUrl?: string;
  gender?: Gender;
  authProvider?: string;
  authProviderId?: string;
  verified: boolean;
  createdAt: Date;
  updatedAt: Date;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
