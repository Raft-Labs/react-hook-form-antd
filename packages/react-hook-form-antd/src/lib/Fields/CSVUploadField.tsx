import { InboxOutlined, LoadingOutlined } from '@ant-design/icons';
import { Form, FormItemProps, message, Upload, UploadProps } from 'antd';
import { RcFile } from 'antd/lib/upload';
import { ReactNode, useState } from 'react';
import { Controller, UseFormReturn } from 'react-hook-form';

interface CSVUploadFieldProps extends UploadProps {
  name: string;
  label: ReactNode;
  customHelp?: string;
  formHook: UseFormReturn;
  formItemProps?: FormItemProps;
}
const FormItem = Form.Item;

export const CSVUploadField = ({
  name,
  label,
  formHook,
  customHelp,
  formItemProps,
  ...props
}: CSVUploadFieldProps) => {
  const { control } = formHook;

  const [loading, setLoading] = useState<boolean>(false);
  return (
    <Controller
      name={name}
      render={({ field, fieldState }) => {
        const { onChange } = field;
        const { error } = fieldState;

        const beforeUpload = async (file: RcFile) => {
          setLoading(true);
          const fileTypes = ['application/vnd.ms-excel', 'text/csv'];
          const isCSV = fileTypes.includes(file.type);
          if (!isCSV) {
            message.error('You can only upload CSV file');
          }
          const isLt2M = file.size / 1024 / 1024 < 10;
          if (!isLt2M) {
            message.error('File must be smaller than 10MB');
          }
          if (!isCSV && !isLt2M) {
            setLoading(false);
            return;
          }
          onChange(file);
          setLoading(false);
          return false;
        };

        const uploadButton = (
          <div className="p-5">
            {loading ? (
              <LoadingOutlined style={{ fontSize: 30 }} />
            ) : (
              <InboxOutlined style={{ fontSize: 30 }} />
            )}
            <div style={{ marginTop: 8 }}>
              To upload click or drag file to this area
            </div>
          </div>
        );
        return (
          <FormItem
            {...formItemProps}
            label={label}
            validateStatus={error ? 'error' : 'validating'}
            help={error ? error?.message : customHelp || undefined}
          >
            <Upload
              {...props}
              listType="picture-card"
              type="drag"
              showUploadList={{ showRemoveIcon: true, showPreviewIcon: false }}
              maxCount={1}
              beforeUpload={beforeUpload}
              onRemove={() => {
                onChange(undefined);
              }}
            >
              {uploadButton}
            </Upload>
          </FormItem>
        );
      }}
      control={control}
    />
  );
};
