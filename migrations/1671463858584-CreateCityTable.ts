import { appendTimestamps } from "@/database/utils";
import { MigrationInterface, QueryRunner, Table, TableColumnOptions, TableForeignKey, TableOptions } from "typeorm"

export class CreateCityTable1671463858584 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const citySchemaTable = {
            name: 'city',
            columns: [
            {
                name: 'id',
                type: 'int',
                isPrimary: true,
                isGenerated: true,
                generationStrategy: 'increment',
            },
            {
                name: 'name',
                type: 'varchar',
                length: 255,
            },
            {
                name: 'countryId',
                type: 'int',
            },
            ] as TableColumnOptions[],
            engine: 'InnoDB',
        } as TableOptions;
        
        appendTimestamps(citySchemaTable, true);

        await queryRunner.createTable(new Table(citySchemaTable), true);

        await queryRunner.createForeignKey(
            'city',
            new TableForeignKey({
              columnNames: ['countryId'],
              referencedColumnNames: ['id'],
              referencedTableName: 'country',
            }),
          );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('city');
    }

}
