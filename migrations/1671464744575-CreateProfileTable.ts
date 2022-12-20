import { appendTimestamps } from "@/database/utils";
import { MigrationInterface, QueryRunner, Table, TableColumnOptions, TableForeignKey, TableOptions } from "typeorm"

export class CreateProfileTable1671464744575 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const profileSchemaTable = {
            name: 'profile',
            columns: [
            {
                name: 'id',
                type: 'int',
                isPrimary: true,
                isGenerated: true,
                generationStrategy: 'increment',
            },
            {
                name: 'userId',
                type: 'int',
            },
            {
                name: 'addressId',
                type: 'int',
            },
            {
                name: 'name',
                type: 'varchar',
                length: 255,
            }
            ] as TableColumnOptions[],
            engine: 'InnoDB',
        } as TableOptions;
        
        appendTimestamps(profileSchemaTable, true);
        
        await queryRunner.createTable(new Table(profileSchemaTable), true);

        await queryRunner.createForeignKey(
            'profile',
            new TableForeignKey({
              columnNames: ['userId'],
              referencedColumnNames: ['id'],
              referencedTableName: 'user',
            }),
          );

          await queryRunner.createForeignKey(
            'profile',
            new TableForeignKey({
              columnNames: ['addressId'],
              referencedColumnNames: ['id'],
              referencedTableName: 'address',
            }),
          );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('profile');
    }

}
