export class CreateUserDto {
  name: string;
  email: string;
  password: string;
  age?: number;
  dateOfBirth?: string;
  profilePicture?: string; // optional
  coverPicture?: string;
  verified?: boolean;
}
export interface JwtUser {
  id: string;
  email: string;
  name: string;
  type: string;
  iat: number;
  exp: number;
}
