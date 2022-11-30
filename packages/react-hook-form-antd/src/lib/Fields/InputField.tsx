/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, FormItemProps, Input, InputProps, InputRef } from 'antd';
import { ReactNode, Ref } from 'react';
import { Controller, UseFormReturn } from 'react-hook-form';

interface InputFieldProps extends InputProps {
  name: string;
  label: ReactNode;
  customHelp?: string;
  formHook: UseFormReturn<any>;
  formItemProps?: FormItemProps;
  ref?: Ref<InputRef>;
}
const FormItem = Form.Item;

export const InputField = ({
  name,
  label,
  formHook,
  customHelp,
  formItemProps,
  ref,
  ...props
}: InputFieldProps) => {
  const { control } = formHook;

  return (
    <Controller
      name={name}
      render={({ field, fieldState }) => {
        const { onChange, value, onBlur } = field;
        const { error } = fieldState;
        return (
          <FormItem
            {...formItemProps}
            label={label}
            validateStatus={error ? 'error' : 'validating'}
            help={error ? error?.message : customHelp || undefined}
          >
            <Input
              {...props}
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              ref={ref}
            />
          </FormItem>
        );
      }}
      control={control}
    />
  );
};
