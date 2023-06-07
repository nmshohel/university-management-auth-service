import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { generateUserId } from './user.utils';
import { IUser } from './user.interface';
import { User } from './user.model';

const createdUser = async (user: IUser): Promise<IUser | null> => {
  // auto generated user id
  const id = await generateUserId();
  user.id = id;

  // default password
  if (!user.password) {
    user.password = config.default_user_pass as string;
  }
  const createdUser = await User.create(user);
  if (!createdUser) {
    throw new ApiError(400, 'failed to create user');
  }

  return createdUser;
};

export const UserService = {
  createdUser,
};
