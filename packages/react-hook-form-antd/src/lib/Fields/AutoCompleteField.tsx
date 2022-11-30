/* eslint-disable @typescript-eslint/no-explicit-any */
import { AutoComplete, AutoCompleteProps, Form, FormItemProps } from 'antd';
import { ReactNode } from 'react';
import { Controller, UseFormReturn } from 'react-hook-form';
interface AutoCompleteFieldProps extends AutoCompleteProps {
  name: string;
  label: ReactNode;
  customHelp?: string;
  formHook: UseFormReturn<any>;
  formItemProps?: FormItemProps;
}

const FormItem = Form.Item;

export const AutoCompleteField = ({
  name,
  label,
  formHook,
  customHelp,
  formItemProps,
  ...props
}: AutoCompleteFieldProps) => {
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
            <AutoComplete
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
