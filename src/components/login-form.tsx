import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import React from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import * as z from 'zod';

import { Button, ControlledInput, Text, View } from '@/ui';

const schema = z.object({
  name: z.string().optional(),
  email: z
    .string({
      required_error: 'Email is required',
    })
    .email('Invalid email format'),
  password: z
    .string({
      required_error: 'Password is required',
    })
    .min(6, 'Password must be at least 6 characters'),
});

export type FormType = z.infer<typeof schema>;

export type LoginFormProps = {
  onSubmit?: SubmitHandler<FormType>;
};

export const LoginForm = ({ onSubmit = () => {} }: LoginFormProps) => {
  const { handleSubmit, control } = useForm<FormType>({
    resolver: zodResolver(schema),
  });
  const router = useRouter();

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={10}
    >
      <View className="flex-1 justify-center p-4">
        <Text testID="form-title" className="pb-6 text-center text-2xl">
          Sign In
        </Text>
        <ControlledInput
          testID="name"
          control={control}
          name="name"
          label="Name"
        />
        <ControlledInput
          testID="email-input"
          control={control}
          name="email"
          label="Email"
        />
        <ControlledInput
          testID="password-input"
          control={control}
          name="password"
          label="Password"
          placeholder="***"
          secureTextEntry={true}
        />
        <Button
          testID="login-button"
          label="Login"
          onPress={handleSubmit(onSubmit)}
        />
        <View className="mt-4 flex-row justify-center">
          <Text>Don't have an account? </Text>
          <TouchableOpacity onPress={() => router.push('/signup')}>
            <Text className="text-blue-500">Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};
