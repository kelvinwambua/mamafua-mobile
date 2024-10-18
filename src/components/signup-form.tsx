import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import React from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import * as z from 'zod';

import { Button, ControlledInput, Text, TouchableOpacity, View } from '@/ui';

const schema = z
  .object({
    name: z.string().min(1, 'Name is required'),
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
    confirmPassword: z.string({
      required_error: 'Confirm Password is required',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export type SignUpFormType = z.infer<typeof schema>;

export type SignUpFormProps = {
  onSubmit?: SubmitHandler<SignUpFormType>;
};

export const SignUpForm = ({ onSubmit = () => {} }: SignUpFormProps) => {
  const { handleSubmit, control } = useForm<SignUpFormType>({
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
          Sign Up
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
        <ControlledInput
          testID="confirm-password-input"
          control={control}
          name="confirmPassword"
          label="Confirm Password"
          placeholder="***"
          secureTextEntry={true}
        />
        <Button
          testID="signup-button"
          label="Sign Up"
          onPress={handleSubmit(onSubmit)}
        />
        <View className="mt-4 flex-row justify-center">
          <Text>Already have an account?</Text>
          <TouchableOpacity onPress={() => router.push('/login')}>
            <Text className="text-blue-500">Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};
