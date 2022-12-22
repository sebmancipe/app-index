import { Inject, Injectable } from '@nestjs/common';
import { DataSource, QueryRunner } from 'typeorm';
import { FullAddressDto } from '@/location/dto/full.address.dto';
import { CityDto } from '@/location/dto/city.dto';

@Injectable()
export class LocationService {
  private queryRunner: QueryRunner;

  constructor(
    @Inject('DATABASE_CONNECTION')
    dataSource: DataSource,
  ) {
    this.queryRunner = dataSource.createQueryRunner();
  }

  public async createAddress(cityId: number, street: string): Promise<number> {
    const result = await this.queryRunner.query(
      `INSERT INTO address(street, cityId) VALUES ('${street}', ${cityId})`,
    );

    return result.insertId;
  }

  public async getCity(cityId: number): Promise<CityDto | null> {
    const result = await this.queryRunner.query(
      'SELECT * FROM city WHERE id = ?',
      [cityId],
    );

    if (result.length > 0) {
      return new CityDto(result[0]);
    }

    return null;
  }

  public async getFullAddress(
    addressId: number,
  ): Promise<FullAddressDto | null> {
    const result = await this.queryRunner.query(
      'SELECT a.street, c.name as cityName, co.name as countryName FROM address a JOIN city c ON c.id = a.cityId JOIN country co ON co.id = c.countryId WHERE a.id = ? ORDER BY a.created_at DESC',
      [addressId],
    );

    if (result.length > 0) {
      return new FullAddressDto(result[0]);
    }

    return null;
  }
}
