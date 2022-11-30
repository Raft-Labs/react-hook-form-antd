import { Form, FormItemProps, Input } from 'antd';
import { PasswordProps } from 'antd/lib/input';
import { ReactNode } from 'react';
import { Controller, UseFormReturn } from 'react-hook-form';
interface InputPasswordProps extends PasswordProps {
  name: string;
  label: ReactNode;
  customHelp?: string;
  formHook: UseFormReturn;
  formItemProps?: FormItemProps;
}
const FormItem = Form.Item;

export const InputPasswordField = ({
  name,
  label,
  formHook,
  customHelp,
  formItemProps,
  ...props
}: InputPasswordProps) => {
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
            <Input.Password
              {...props}
              value={value}
              onChange={onChange}
              onBlur={onBlur}
            />
          </FormItem>
        );
      }}
      control={control}
    />
  );
};
