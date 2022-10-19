import { Form, FormItemProps, Input } from 'antd';
import { TextAreaProps } from 'antd/lib/input';
import { Controller, UseFormReturn } from 'react-hook-form';

interface InputTextAreaFieldProps extends TextAreaProps {
  name: string;
  label?: string;
  customHelp?: string;
  formHook: UseFormReturn;
  formItemProps?: FormItemProps;
}
const FormItem = Form.Item;

export const InputTextAreaField = ({
  name,
  label,
  formHook,
  customHelp,
  formItemProps,
  className,
  ...props
}: InputTextAreaFieldProps) => {
  const { control } = formHook;
  const cls = [className, 'pid-discussion--type-suggestion']
    .filter(Boolean)
    .join(' ');
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
            help={
              <span className="text-xs lg:text-base">
                {error ? error?.message : customHelp || undefined}
              </span>
            }
          >
            <Input.TextArea
              {...props}
              className={cls}
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
