import { IsOptional, IsString, ValidateIf } from 'class-validator';
import { Gender } from '../entities/user.entity';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  name?: string;
  @IsString()
  @IsOptional()
  gender?: Gender;
  @IsString()
  @IsOptional()
  dob?: string;
  @IsString()
  @IsOptional()
  bio?: string;
  @ValidateIf((o) => o.newPassword !== undefined)
  @IsString()
  currentPassword?: string;

  @ValidateIf((o) => o.currentPassword !== undefined)
  @IsString()
  newPassword?: string;
}
