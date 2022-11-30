/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  BoldOutlined,
  ItalicOutlined,
  UnderlineOutlined,
} from '@ant-design/icons';
import {
  createAutoformatPlugin,
  createBoldPlugin,
  createDeserializeMdPlugin,
  createHeadingPlugin,
  createItalicPlugin,
  createPlateUI,
  createPlugins,
  createUnderlinePlugin,
  getPluginType,
  HeadingToolbar,
  MarkToolbarButton,
  MARK_BOLD,
  MARK_ITALIC,
  MARK_UNDERLINE,
  Plate,
  PlateProps,
  PlateProvider,
  TEditableProps,
  usePlateEditorRef,
} from '@udecode/plate';
import { Form, FormItemProps } from 'antd';
import { ReactNode } from 'react';
import { Controller, UseFormReturn } from 'react-hook-form';
import { BlockType, serialize } from 'remark-slate';

const plateUI = createPlateUI();

const editableProps: TEditableProps = {
  placeholder: 'Type...',
};
const platePlugins = createPlugins(
  [
    createHeadingPlugin(),
    createBoldPlugin(),
    createItalicPlugin(),
    createUnderlinePlugin(),
    createDeserializeMdPlugin(),
    createAutoformatPlugin(),
  ],
  { components: plateUI }
);

interface IRichTextEditorFieldProps extends PlateProps {
  name: string;
  label: ReactNode;
  formHook: UseFormReturn<any>;
  formItemProps?: FormItemProps;
  placeholder?: string;
  customHelp?: string;
  autoFocus?: boolean;
}

export const RichTextEditorField = ({
  name,
  label,
  formHook,
  formItemProps,
  placeholder,
  customHelp,
  ...props
}: IRichTextEditorFieldProps) => {
  const plateEditor = usePlateEditorRef();
  const { control } = formHook;
  const FormItem = Form.Item;

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
            <PlateProvider
              {...props}
              value={value}
              plugins={platePlugins}
              onChange={(val: BlockType[]) =>
                onChange(
                  val.map((node: BlockType) => serialize(node)).join('\n')
                )
              }
            >
              <HeadingToolbar>
                <MarkToolbarButton
                  icon={<BoldOutlined />}
                  type={getPluginType(plateEditor, MARK_BOLD)}
                />
                <MarkToolbarButton
                  icon={<ItalicOutlined />}
                  type={getPluginType(plateEditor, MARK_ITALIC)}
                />
                <MarkToolbarButton
                  icon={<UnderlineOutlined />}
                  type={getPluginType(plateEditor, MARK_UNDERLINE)}
                />
              </HeadingToolbar>
              <Plate editableProps={editableProps} />
            </PlateProvider>
          </FormItem>
        );
      }}
      control={control}
    />
  );
};
