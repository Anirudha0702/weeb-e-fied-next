import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class HashService {
  async hash(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
  }

  async compare(raw: string, hashed: string): Promise<boolean> {
    return bcrypt.compare(raw, hashed);
  }
}
