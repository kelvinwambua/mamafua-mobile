import { type User } from 'firebase/auth';

import { getItem, removeItem, setItem } from '../storage';

export type TokenType = User;

export const getToken = () => getItem<TokenType>('user');
export const removeToken = () => removeItem('user');
export const setToken = (value: TokenType) => setItem<TokenType>('user', value);
