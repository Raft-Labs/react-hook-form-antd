/* eslint-disable @typescript-eslint/no-explicit-any */
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import {
  Form,
  FormItemProps,
  Image,
  ImageProps,
  message,
  Upload,
  UploadProps,
} from 'antd';
import ImgCrop from 'antd-img-crop';
import { RcFile } from 'antd/lib/upload';
import { ReactNode, useState } from 'react';
import { Controller, UseFormReturn } from 'react-hook-form';
import { ImgCropProps } from '../../types/image-upload';

interface ImageUploadFieldProps extends UploadProps {
  name: string;
  label: ReactNode;
  customHelp?: string;
  formHook: UseFormReturn<any>;
  formItemProps?: FormItemProps;
  buttonLabel?: string;
  cropProps?: ImgCropProps;
  url?: string;
  imageProps?: ImageProps;
}
const FormItem = Form.Item;

const getBase64 = async (file: RcFile) => {
  if (file) {
    const data: string | ArrayBuffer = await new Promise((resolve) => {
      const reader = new FileReader();
      reader?.readAsDataURL(file);
      reader.onload = () => resolve(reader?.result as string);
    });

    return data;
  }
  return '';
};

const checkJpgOrPng = (file: RcFile) =>
  file.type === 'image/jpeg' || file.type === 'image/png';
const checkLt2M = (file: RcFile) => file.size / 1024 / 1024 < 2;

export const ImageUploadField = ({
  name,
  label,
  formHook,
  customHelp,
  formItemProps,
  buttonLabel,
  cropProps,
  url,
  imageProps,
  ...props
}: ImageUploadFieldProps) => {
  const { control } = formHook;
  const [dataUri, setDataUri] = useState(url);
  const [loading, setLoading] = useState<boolean>(false);
  return (
    <Controller
      name={name}
      render={({ field, fieldState }) => {
        const { onChange, value } = field;
        const { error } = fieldState;

        const beforeUpload = async (file: RcFile) => {
          setLoading(true);
          const isJpgOrPng = checkJpgOrPng(file);
          const isLt2M = checkLt2M(file);
          if (!isJpgOrPng) message.error('You can only upload JPG/PNG file!');
          if (!isLt2M) message.error('File must smaller than 2MB!');
          if (!(isJpgOrPng && isLt2M)) {
            setLoading(false);
            return isJpgOrPng && isLt2M;
          }
          onChange(file);
          const fileUrl = await getBase64(file);
          setDataUri(fileUrl as string);
          setLoading(false);
          return isJpgOrPng && isLt2M;
        };

        return (
          <FormItem
            {...formItemProps}
            label={label}
            validateStatus={error ? 'error' : 'validating'}
            help={error ? error?.message : customHelp || undefined}
          >
            <ImgCrop {...cropProps}>
              <Upload
                {...props}
                listType="picture-card"
                showUploadList={false}
                maxCount={1}
                beforeUpload={beforeUpload}
                onRemove={() => onChange(undefined)}
              >
                {url && !value ? (
                  <Image {...imageProps} src={url} />
                ) : value ? (
                  <Image {...imageProps} src={dataUri} />
                ) : (
                  <div>
                    {loading ? <LoadingOutlined /> : <PlusOutlined />}
                    <div style={{ marginTop: 8 }}>
                      {buttonLabel || 'Upload'}
                    </div>
                  </div>
                )}
              </Upload>
            </ImgCrop>
          </FormItem>
        );
      }}
      control={control}
    />
  );
};
