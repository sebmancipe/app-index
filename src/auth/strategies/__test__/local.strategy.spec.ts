import { AuthService } from '@/auth/auth.service';
import { UserLogInException } from '@/auth/exception';
import { LocalStrategy } from '@/auth/strategies/local.strategy';
import { UserDto } from '@/user/dto/user.dto';

describe('[LocalStrategy]', () => {
  it('Validates user by username and password', async () => {
    const validateUserMock = jest.fn();
    const authServiceMock = {
      validateUser: validateUserMock,
    } as any as AuthService;

    validateUserMock.mockResolvedValue({
      username: 'test',
      password: 'pass',
    } as UserDto);

    const localStrategy = new LocalStrategy(authServiceMock);
    const user = await localStrategy.validate('test', 'pass');

    expect(user.username).toEqual('test');
    expect(user.password).toEqual('pass');
  });

  it('Throws exception when user does not exist', async () => {
    const validateUserMock = jest.fn();
    const authServiceMock = {
      validateUser: validateUserMock,
    } as any as AuthService;

    validateUserMock.mockResolvedValue(null);

    const localStrategy = new LocalStrategy(authServiceMock);
    try {
      await localStrategy.validate('test', 'pass');
    } catch (e) {
      expect(e).toBeInstanceOf(UserLogInException);
      expect(e.message).toEqual(
        'The given password is incorrect or the user does not exist',
      );
    }
  });
});
