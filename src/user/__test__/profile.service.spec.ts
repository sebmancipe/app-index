import { DataSource, QueryRunner } from "typeorm";
import { ProfileService } from "@/user/profile.service";

describe('[ProfileService]', () => {
    it('Creates a profile', async () => {
        const createQueryRunnerMock = jest.fn();
        const dataSourceMock = {
            createQueryRunner: createQueryRunnerMock,
        } as any as DataSource;

        const queryMock = jest.fn();
        const queryRunnerMock = {
            query: queryMock,
        } as any as QueryRunner;

        createQueryRunnerMock.mockReturnValue(queryRunnerMock);
        queryMock.mockResolvedValue({insertId: 15});

        const profileService = new ProfileService(dataSourceMock);

        const profileId = await profileService.createProfile(1, 2, 'pepe');

        expect(profileId).toEqual(15);
        expect(queryMock).toBeCalledTimes(1);
        expect(createQueryRunnerMock).toBeCalledTimes(1);
    });
    
    it('Gets a profile using an userId', async () => {
        const createQueryRunnerMock = jest.fn();
        const dataSourceMock = {
            createQueryRunner: createQueryRunnerMock,
        } as any as DataSource;

        const queryMock = jest.fn();
        const queryRunnerMock = {
            query: queryMock,
        } as any as QueryRunner;

        createQueryRunnerMock.mockReturnValue(queryRunnerMock);
        queryMock.mockResolvedValue([{name: 'Pepe', addressId: 5, userId: 12}]);

        const locationService = new ProfileService(dataSourceMock);

        const profile = await locationService.getProfile(6);

        expect(profile.addressId).toEqual(5);
        expect(profile.userId).toEqual(12);
        expect(profile.name).toEqual('Pepe');
        expect(queryMock).toBeCalledTimes(1);
        expect(createQueryRunnerMock).toBeCalledTimes(1);
    });
});