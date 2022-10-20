# @raftlabs/react-hook-form-antd

A wrapper of Ant Design Form Components with React Hook Form

## Installation

```sh
npm i @raftlabs/react-hook-form-antd
OR
yarn add @raftlabs/react-hook-form-antd
```

---

## Tech Stack/Dependencies

### **Install these dependencies before using the library**

- [Ant Design](https://ant.design/)
- [React Hook Form](https://react-hook-form.com/)

---

## List of Components

- AutoCompleteField
- CheckboxField
- CSVUploadField
- DatePickerField
- ImageUploadField
- InputField
- InputNumberField
- InputPasswordField
- InputTextAreaField
- MainForm
- RadioGroupField
- RangePickerField
- RichTextEditorField
- SelectField
- SwitchField
- TimezonePicker

---

## Usage

Most components are based off the components provided by Ant Design.

### MainForm Options

|   Name   | Type                                                          | Description                                                                     |
| :------: | :------------------------------------------------------------ | :------------------------------------------------------------------------------ |
| formHook | [UseFormReturn](https://react-hook-form.com/ts#UseFormReturn) | Form Hook returned by [useForm()](https://react-hook-form.com/api/useform) hook |
| onSubmit | (data, event) => void                                         | Submit function to invoke                                                       |

#### Other optional props are listed [here](https://ant.design/components/form/#API)

### Form Field Options

|               Name                | Type                                                           | Description                                                                     |
| :-------------------------------: | :------------------------------------------------------------- | :------------------------------------------------------------------------------ |
|               name                | string                                                         | Name of the field                                                               |
|               label               | string                                                         | Label for the Field                                                             |
|            customHelp             | string                                                         | Custom Helper Message to Display under the input field                          |
| buttonLabel(for ImageUploadField) | string                                                         | Button Label for the Upload Button                                              |
|             formHook              | [UseFormReturn](https://react-hook-form.com/ts#UseFormReturn)  | Form Hook returned by [useForm()](https://react-hook-form.com/api/useform) hook |
| options(for AutoComplete, Select) | {label:string, value:string}[]                                 | Options List to display                                                         |
|           formItemProps           | [FormItemProps](https://ant.design/components/form/#Form.Item) | FormItemProps to be forwarded to the Ant Design components                      |

## Demo

```js
import { MainForm, SelectField } from '@raftlabs/react-hook-form-antd';
import { useForm } from 'react-hook-form';
import { Button } from 'antd';

export const App = () => {
  const form = useForm();
  return (
    <MainForm formHook={form} onSubmit={console.log}>
      <SelectField
        formHook={form}
        label="Language"
        name="lang"
        customHelp="Enter your preferred language"
        options={[
          { label: 'English', value: 'eng' },
          { label: 'Spanish', value: 'esp' },
        ]}
      />
      <Button type="primary" htmlType="submit">
        Submit to Console
      </Button>
    </MainForm>
  );
};
```
