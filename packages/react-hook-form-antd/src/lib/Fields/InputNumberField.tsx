import { Form, FormItemProps, InputNumber, InputNumberProps } from 'antd';
import { Controller, UseFormReturn } from 'react-hook-form';
interface InputNumberFieldProps extends InputNumberProps {
  name: string;
  label: string;
  customHelp?: string;
  formHook: UseFormReturn;
  formItemProps?: FormItemProps;
}
const FormItem = Form.Item;

export const InputNumberField = ({
  name,
  label,
  formHook,
  customHelp,
  formItemProps,
  ...props
}: InputNumberFieldProps) => {
  const { control } = formHook;

  return (
    <Controller
      name={name}
      control={control}
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
            <InputNumber
              {...props}
              value={value}
              onChange={onChange}
              onBlur={onBlur}
            />
          </FormItem>
        );
      }}
    />
  );
};
