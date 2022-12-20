import { appendTimestamps } from "@/database/utils";
import { MigrationInterface, QueryRunner, Table, TableColumnOptions, TableForeignKey, TableOptions } from "typeorm"

export class CreateAddressTable1671464170494 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const addressSchemaTable = {
            name: 'address',
            columns: [
            {
                name: 'id',
                type: 'int',
                isPrimary: true,
                isGenerated: true,
                generationStrategy: 'increment',
            },
            {
                name: 'street',
                type: 'varchar',
                length: 255,
            },
            {
                name: 'cityId',
                type: 'int',
            },
            ] as TableColumnOptions[],
            engine: 'InnoDB',
        } as TableOptions;
        
        appendTimestamps(addressSchemaTable, true);
        
        await queryRunner.createTable(new Table(addressSchemaTable), true);

        await queryRunner.createForeignKey(
            'address',
            new TableForeignKey({
              columnNames: ['cityId'],
              referencedColumnNames: ['id'],
              referencedTableName: 'city',
            }),
          );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('address');
    }

}
