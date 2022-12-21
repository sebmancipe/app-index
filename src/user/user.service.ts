import { Inject, Injectable } from "@nestjs/common";
import { DataSource, QueryRunner } from "typeorm";
import { UserDto } from "@/user/dto/user.dto";
import { Hasher } from "@/user/hasher/hasher";

@Injectable()
export class UserService {
    private queryRunner: QueryRunner;

    constructor(
        @Inject('DATABASE_CONNECTION')
        dataSource: DataSource,
        private readonly hasher: Hasher
    ) {
        this.queryRunner = dataSource.createQueryRunner();
    }

    public async getUser(username: string): Promise<UserDto | null> {
        const result = await this.queryRunner.query("SELECT * FROM user WHERE username = ?", [username]);

        if (result.length > 0){
            return new UserDto(result[0]);
        }

        return null;
    }

    public async saveUser(username: string, password: string): Promise<number> {
        const hashedPassword = await this.hasher.hash(password);

        const user = await this.queryRunner.query(`INSERT INTO user(username, password) VALUES ('${username}', '${hashedPassword}')`);

        return user.insertId;
    }
}