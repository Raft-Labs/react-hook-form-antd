import { Checkbox, CheckboxProps, Form, FormItemProps } from 'antd';
import { Controller, UseFormReturn } from 'react-hook-form';

interface CheckboxFieldProps extends CheckboxProps {
  name: string;
  customHelp?: string;
  formHook: UseFormReturn<any>;
  formItemProps?: FormItemProps;
}
const FormItem = Form.Item;

export const CheckboxField = ({
  name,
  formHook,
  customHelp,
  formItemProps,
  children,
  ...props
}: CheckboxFieldProps) => {
  const { control } = formHook;
  return (
    <Controller
      name={name}
      render={({ field, fieldState }) => {
        const { onChange, value } = field;
        const { error } = fieldState;
        return (
          <FormItem
            {...formItemProps}
            validateStatus={error ? 'error' : 'validating'}
            help={error ? error?.message : customHelp || undefined}
          >
            <Checkbox {...props} checked={value} onChange={onChange}>
              {children}
            </Checkbox>
          </FormItem>
        );
      }}
      control={control}
    />
  );
};
