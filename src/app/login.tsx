import { useRouter } from 'expo-router';
import React from 'react';

import type { LoginFormProps } from '@/components/login-form';
import { LoginForm } from '@/components/login-form';
import { signInWithEmail } from '@/core/auth';
import { FocusAwareStatusBar } from '@/ui';
export default function Login() {
  const router = useRouter();

  const onSubmit: LoginFormProps['onSubmit'] = async (data) => {
    console.log('Form data received:', JSON.stringify(data));
    try {
      console.log('About to call signInWithEmail');
      console.log('Email:', data.email);
      console.log('Password:', data.password);
      await signInWithEmail(data.email, data.password);
      console.log('Sign in successful');
      router.push('/');
    } catch (error) {
      console.error('Sign in error:', JSON.stringify(error));
    }
  };
  return (
    <>
      <FocusAwareStatusBar />
      <LoginForm onSubmit={onSubmit} />
    </>
  );
}
