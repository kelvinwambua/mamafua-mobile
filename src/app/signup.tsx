import { useRouter } from 'expo-router';
import React from 'react';

import type { SignUpFormProps } from '@/components/signup-form';
import { SignUpForm } from '@/components/signup-form';
import { useAuth } from '@/core';
import { FocusAwareStatusBar } from '@/ui';

export default function SignUp() {
  const router = useRouter();
  const { createUser } = useAuth();

  const onSubmit: SignUpFormProps['onSubmit'] = async (data) => {
    console.log('Form data received:', data);
    try {
      await createUser(data.email, data.password, data.name);
      console.log('Sign up successful');
      router.push('/');
    } catch (error) {
      console.error('Sign up error:', error);
      // Handle the error (e.g., show an error message to the user)
    }
  };

  return (
    <>
      <FocusAwareStatusBar />
      <SignUpForm onSubmit={onSubmit} />
    </>
  );
}
