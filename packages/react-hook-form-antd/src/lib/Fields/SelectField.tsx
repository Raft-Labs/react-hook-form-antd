import { Form, FormItemProps, Select, SelectProps } from 'antd';
import { ReactNode } from 'react';
import { Controller, UseFormReturn } from 'react-hook-form';

interface SelectFieldProps extends SelectProps {
  name: string;
  label: ReactNode;
  customHelp?: string;
  formHook: UseFormReturn;
  formItemProps?: FormItemProps;
}
const FormItem = Form.Item;

export const SelectField = ({
  name,
  label,
  formHook,
  options,
  customHelp,
  formItemProps,
  ...props
}: SelectFieldProps) => {
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
            <Select
              {...props}
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              options={options}
            />
          </FormItem>
        );
      }}
      control={control}
    />
  );
};
