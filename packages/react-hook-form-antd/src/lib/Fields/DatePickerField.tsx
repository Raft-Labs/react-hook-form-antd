import { DatePicker, Form, FormItemProps } from 'antd';
import { PickerProps } from 'antd/lib/date-picker/generatePicker';
import moment, { Moment } from 'moment';
import { Controller, UseFormReturn } from 'react-hook-form';

type DatePickerFieldProps = PickerProps<Moment> & {
  name: string;
  label: string;
  customHelp?: string;
  formHook: UseFormReturn;
  formItemProps?: FormItemProps;
};
const FormItem = Form.Item;

export const DatePickerField = ({
  name,
  label,
  formHook,
  customHelp,
  formItemProps,
  ...props
}: DatePickerFieldProps) => {
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
            <DatePicker
              {...props}
              onBlur={onBlur}
              onChange={(date) => {
                onChange(date);
              }}
              value={value ? moment(value).second(0) : undefined}
            />
          </FormItem>
        );
      }}
      control={control}
    />
  );
};
