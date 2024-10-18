import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  updateProfile,
  type User,
} from 'firebase/auth';
import { create } from 'zustand';

import { createSelectors } from '../utils';
import { auth } from './firebase-config';
import { removeToken, setToken } from './utils';

interface AuthState {
  user: User | null;
  status: 'idle' | 'signOut' | 'signIn';
  signInWithEmail: (email: string, password: string) => Promise<void>;
  createUser: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => Promise<void>;
  hydrate: () => void;
}

const _useAuth = create<AuthState>((set) => ({
  status: 'idle',
  user: null,
  signInWithEmail: async (email, password) => {
    try {
      console.log('Attempting sign in with email:', email);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      setToken(userCredential.user);
      set({ status: 'signIn', user: userCredential.user });
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    }
  },
  createUser: async (email, password, name) => {
    try {
      console.log('Attempting to create user with email:', email);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      await updateProfile(userCredential.user, { displayName: name });
      setToken(userCredential.user);
      set({ status: 'signIn', user: userCredential.user });
    } catch (error) {
      console.error('Create user error:', error);
      throw error;
    }
  },
  signOut: async () => {
    try {
      await firebaseSignOut(auth);
      removeToken();
      set({ status: 'signOut', user: null });
    } catch (error) {
      console.error('Sign out error:', error);
      throw error;
    }
  },
  hydrate: () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setToken(user);
        set({ status: 'signIn', user });
      } else {
        removeToken();
        set({ status: 'signOut', user: null });
      }
    });
  },
}));

export const useAuth = createSelectors(_useAuth);
export const signOut = () => _useAuth.getState().signOut();
export const signInWithEmail = (email: string, password: string) =>
  _useAuth.getState().signInWithEmail(email, password);
export const createUser = (email: string, password: string, name: string) =>
  _useAuth.getState().createUser(email, password, name);
export const hydrateAuth = () => _useAuth.getState().hydrate();
