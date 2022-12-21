import { Inject, Injectable } from "@nestjs/common";
import { DataSource, QueryRunner } from "typeorm";
import { ProfileDto } from "@/user/dto/profile.dto";

@Injectable()
export class ProfileService {
    private queryRunner: QueryRunner;

    constructor(
        @Inject('DATABASE_CONNECTION')
        dataSource: DataSource,
    ) {
        this.queryRunner = dataSource.createQueryRunner();
    }

    public async createProfile(userId: number, addressId: number, name: string): Promise<number> {
        const profile = await this.queryRunner.query(`INSERT INTO profile(userId, addressId, name) VALUES (${userId}, ${addressId}, '${name}')`);

        return profile.insertId;
    }

    public async getProfile(userId: number): Promise<ProfileDto | null> {
        const result = await this.queryRunner.query("SELECT * FROM profile WHERE userId = ? ORDER BY created_at DESC", [userId]);

        if (result.length > 0){
            return new ProfileDto(result[0]);
        }

        return null;
    }

}