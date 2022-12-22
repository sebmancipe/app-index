import { DataSource, QueryRunner } from "typeorm";
import { LocationService } from "@/location/location.service";

describe('[LocationService]', () => {
    it('Creates an address with cityId and street', async () => {
        const createQueryRunnerMock = jest.fn();
        const dataSourceMock = {
            createQueryRunner: createQueryRunnerMock,
        } as any as DataSource;

        const queryMock = jest.fn();
        const queryRunnerMock = {
            query: queryMock,
        } as any as QueryRunner;

        createQueryRunnerMock.mockReturnValue(queryRunnerMock);
        queryMock.mockResolvedValue({insertId: 5});

        const locationService = new LocationService(dataSourceMock);

        const addressId = await locationService.createAddress(1, 'Bakery St');

        expect(addressId).toEqual(5);
        expect(queryMock).toBeCalledTimes(1);
        expect(createQueryRunnerMock).toBeCalledTimes(1);
    });
    
    it('Gets a city using cityId', async () => {
        const createQueryRunnerMock = jest.fn();
        const dataSourceMock = {
            createQueryRunner: createQueryRunnerMock,
        } as any as DataSource;

        const queryMock = jest.fn();
        const queryRunnerMock = {
            query: queryMock,
        } as any as QueryRunner;

        createQueryRunnerMock.mockReturnValue(queryRunnerMock);
        queryMock.mockResolvedValue([{name: 'The awesome city', id: 5}]);

        const locationService = new LocationService(dataSourceMock);

        const city = await locationService.getCity(5);

        expect(city.id).toEqual(5);
        expect(city.name).toEqual('The awesome city');
        expect(queryMock).toBeCalledTimes(1);
        expect(createQueryRunnerMock).toBeCalledTimes(1);
    });

    it('Gets full address using an addressId', async () => {
        const createQueryRunnerMock = jest.fn();
        const dataSourceMock = {
            createQueryRunner: createQueryRunnerMock,
        } as any as DataSource;

        const queryMock = jest.fn();
        const queryRunnerMock = {
            query: queryMock,
        } as any as QueryRunner;

        createQueryRunnerMock.mockReturnValue(queryRunnerMock);
        queryMock.mockResolvedValue([{street: 'Bakery St', cityName: 'The awesome city', countryName: 'Colombia'}]);

        const locationService = new LocationService(dataSourceMock);

        const fullAddress = await locationService.getFullAddress(5);

        expect(fullAddress.cityName).toEqual('The awesome city');
        expect(fullAddress.countryName).toEqual('Colombia');
        expect(fullAddress.street).toEqual('Bakery St');
        expect(queryMock).toBeCalledTimes(1);
        expect(createQueryRunnerMock).toBeCalledTimes(1);
    });

    it('Gets null full address if not found', async () => {
        const createQueryRunnerMock = jest.fn();
        const dataSourceMock = {
            createQueryRunner: createQueryRunnerMock,
        } as any as DataSource;

        const queryMock = jest.fn();
        const queryRunnerMock = {
            query: queryMock,
        } as any as QueryRunner;

        createQueryRunnerMock.mockReturnValue(queryRunnerMock);
        queryMock.mockResolvedValue([]);

        const locationService = new LocationService(dataSourceMock);

        const fullAddress = await locationService.getFullAddress(5);

        expect(fullAddress).toBeNull();
        expect(queryMock).toBeCalledTimes(1);
        expect(createQueryRunnerMock).toBeCalledTimes(1);
    });
});