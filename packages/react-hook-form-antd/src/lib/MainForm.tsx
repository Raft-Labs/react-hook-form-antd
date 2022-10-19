import { Form, FormProps } from 'antd';
import React from 'react';
import { FormProvider, UseFormReturn } from 'react-hook-form';

interface MainFormProps extends FormProps {
  formHook: UseFormReturn;
  onSubmit: (values: unknown) => void;
  children: React.ReactNode;
}

export function MainForm({
  children,
  onSubmit,
  formHook,
  ...props
}: MainFormProps) {
  const { handleSubmit } = formHook;
  return (
    <FormProvider {...formHook}>
      <Form {...props} onFinish={handleSubmit(onSubmit)}>
        {children}
      </Form>
    </FormProvider>
  );
}
