import { User } from '../models';

export const getUserByLogin = (users: User[], login: string) => users.find((user) => user.login === login);
export const getUserById = (users: User[], id: string) => users.find((user) => user.id === id);
