import { Form, FormItemProps, Select, SelectProps } from 'antd';
import { Controller, UseFormReturn } from 'react-hook-form';
import { timezones } from '../../utils/timezones';

interface TimezonePickerProps extends SelectProps {
  name: string;
  label: string | JSX.Element;
  customHelp?: string;
  formHook: UseFormReturn;
  formItemProps?: FormItemProps;
}

const FormItem = Form.Item;
const options = timezones.map((timezone) => {
  return {
    label: timezone?.label,
    value: timezone?.tzCode,
  };
});
export const TimezonePicker = ({
  name,
  label,
  formHook,
  customHelp,
  formItemProps,
  ...props
}: TimezonePickerProps) => {
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
              defaultValue="Europe/Dublin"
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              options={options}
              showSearch
            />
          </FormItem>
        );
      }}
      control={control}
    />
  );
};
