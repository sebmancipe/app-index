import { MigrationInterface, QueryRunner } from "typeorm"

/**
 * Ideally, this would be in a specific seeder file along a custom tool to refresh database data,
 * however, migrations can handle the seeding as well.
 */
export class SeedTables1671511389744 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const countries = [
            'Colombia',
            'Brazil',
            'Argentina',
            'Switzerland',
            'France'
        ];
        await queryRunner.query("INSERT INTO country(name) VALUES " + countries.map((country) => `('${country}')`).join(",") + ";");

        const cities = [
            {
                name: 'Cali',
                countryId: 1,
            },
            {
                name: 'Barranquilla',
                countryId: 1,
            },
            {
                name: 'Recife',
                countryId: 2,
            },
            {
                name: 'Brasilia',
                countryId: 2,
            },
            {
                name: 'Buenos Aires',
                countryId: 3,
            },
            {
                name: 'Berne',
                countryId: 4,
            },
            {
                name: 'Marsella',
                countryId: 5,
            }
        ];
        await queryRunner.query("INSERT INTO city(name, countryId) VALUES " + cities.map((city) => `('${city.name}', ${city.countryId})`).join(","));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("TRUNCATE city");
        await queryRunner.query("TRUNCATE country");
    }

}
