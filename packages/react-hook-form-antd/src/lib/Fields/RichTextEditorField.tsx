import { Form, FormItemProps } from 'antd';
import { convertToHTML } from 'draft-convert';
import { ContentState, convertFromHTML, EditorState } from 'draft-js';
import { useEffect, useState } from 'react';
import { Editor, EditorProps } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Controller, UseFormReturn } from 'react-hook-form';

interface IRichTextEditorFieldProps extends EditorProps {
  name: string;
  label: string;
  formHook: UseFormReturn;
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
  const { control, getValues } = formHook;

  const FormItem = Form.Item;

  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [init, setInit] = useState<boolean>(false);
  const initialValue = getValues(name);

  useEffect(() => {
    if (initialValue?.length > 0 && !init) {
      const blocksFromHTML = convertFromHTML(initialValue);

      setEditorState(
        EditorState.createWithContent(
          ContentState.createFromBlockArray(
            blocksFromHTML.contentBlocks,
            blocksFromHTML.entityMap
          )
        )
      );
      setInit(true);
    }
  }, [initialValue, init]);
  return (
    <Controller
      name={name}
      render={({ field, fieldState }) => {
        const { onChange, onBlur } = field;
        const { error } = fieldState;
        return (
          <FormItem
            {...formItemProps}
            label={label}
            validateStatus={error ? 'error' : 'validating'}
            help={error ? error?.message : customHelp || undefined}
          >
            <Editor
              {...props}
              editorState={editorState}
              onEditorStateChange={(editorState) => {
                setEditorState(editorState);
                onChange(convertToHTML(editorState.getCurrentContent()));
              }}
              onBlur={onBlur}
              toolbar={{
                options: ['inline'],
                inline: { options: ['bold', 'italic', 'underline'] },
              }}
              editorStyle={{ minHeight: 200 }}
              wrapperClassName="border p-2"
              placeholder={placeholder}
            />
          </FormItem>
        );
      }}
      control={control}
    />
  );
};
