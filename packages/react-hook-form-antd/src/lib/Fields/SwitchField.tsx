import { Form, FormItemProps, Switch, SwitchProps } from 'antd';
import { Controller, UseFormReturn } from 'react-hook-form';

interface SwitchFieldProps extends SwitchProps {
  name: string;
  label: string;
  customHelp?: string;
  formHook: UseFormReturn;
  formItemProps?: FormItemProps;
}
const FormItem = Form.Item;

export const SwitchField = ({
  name,
  label,
  formHook,
  customHelp,
  formItemProps,
  ...props
}: SwitchFieldProps) => {
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
            label={label}
            validateStatus={error ? 'error' : 'validating'}
            help={error ? error?.message : customHelp || undefined}
          >
            <Switch {...props} checked={value} onChange={onChange} />
          </FormItem>
        );
      }}
      control={control}
    />
  );
};
