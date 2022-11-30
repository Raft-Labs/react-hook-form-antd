import { Form, FormItemProps, Radio, RadioGroupProps } from 'antd';
import { ReactNode } from 'react';
import { Controller, UseFormReturn } from 'react-hook-form';

interface RadioGroupFieldProps extends RadioGroupProps {
  name: string;
  label: ReactNode;
  customHelp?: string;
  formHook: UseFormReturn<any>;
  formItemProps?: FormItemProps;
}
const FormItem = Form.Item;

export const RadioGroupField = ({
  name,
  label,
  formHook,
  options,
  customHelp,
  formItemProps,
  ...props
}: RadioGroupFieldProps) => {
  const { control } = formHook;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const { onChange, value } = field;
        const { error } = fieldState;
        return (
          <FormItem
            {...formItemProps}
            label={label}
            validateStatus={error ? 'error' : 'validating'}
            help={error ? error?.message : customHelp || undefined}
          >
            <Radio.Group
              {...props}
              options={options}
              value={value}
              onChange={onChange}
            />
          </FormItem>
        );
      }}
    />
  );
};
