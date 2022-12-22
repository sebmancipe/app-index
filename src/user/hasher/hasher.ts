import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class Hasher {
  private SALT_ROUNDS = 10;

  private readonly hasher;

  constructor() {
    this.hasher = bcrypt;
  }

  public async hash(text: string): Promise<string> {
    const salt = await this.hasher.genSalt(this.SALT_ROUNDS);
    const hash = await this.hasher.hash(text, salt);

    return hash;
  }

  public async same(text: string, hash: string): Promise<boolean> {
    return await this.hasher.compare(text, hash);
  }
}
