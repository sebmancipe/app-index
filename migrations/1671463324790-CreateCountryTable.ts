import { appendTimestamps } from "@/database/utils";
import { MigrationInterface, QueryRunner, Table, TableColumnOptions, TableOptions } from "typeorm"

export class CreateCountryTable1671463324790 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const countrySchemaTable = {
            name: 'country',
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
            ] as TableColumnOptions[],
            engine: 'InnoDB',
        } as TableOptions;
        
        appendTimestamps(countrySchemaTable, true);

        await queryRunner.createTable(new Table(countrySchemaTable), true);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('country')
    }

}
