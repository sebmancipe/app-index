import { appendTimestamps } from "@/database/utils";
import { MigrationInterface, QueryRunner, Table, TableColumnOptions, TableOptions } from "typeorm"

export class CreateUserTable1671463034955 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const userSchemaTable = {
            name: 'user',
            columns: [
            {
                name: 'id',
                type: 'int',
                isPrimary: true,
                isGenerated: true,
                generationStrategy: 'increment',
            },
            {
                name: 'username',
                type: 'varchar',
                length: 32,
            },
            {
                name: 'password',
                type: 'varchar',
                length: 255,
            },
            ] as TableColumnOptions[],
            engine: 'InnoDB',
        } as TableOptions;
        
        appendTimestamps(userSchemaTable, true);

        await queryRunner.createTable(new Table(userSchemaTable), true);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('user')
    }
}
