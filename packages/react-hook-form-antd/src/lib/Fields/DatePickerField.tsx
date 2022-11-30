import { DatePicker, Form, FormItemProps } from 'antd';
import { PickerProps } from 'antd/lib/date-picker/generatePicker';
import dayjs, { Dayjs } from 'dayjs';
import { ReactNode } from 'react';
import { Controller, UseFormReturn } from 'react-hook-form';

type DatePickerFieldProps = PickerProps<Dayjs> & {
  name: string;
  label: ReactNode;
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
              value={dayjs(value).second(0)}
            />
          </FormItem>
        );
      }}
      control={control}
    />
  );
};
