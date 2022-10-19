// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {
  AutoCompleteField,
  CheckboxField,
  CSVUploadField,
  DatePickerField,
  ImageUploadField,
  InputField,
  InputNumberField,
  InputPasswordField,
  InputTextAreaField,
  MainForm,
  RadioGroupField,
  RangePickerField,
  RichTextEditorField,
  SelectField,
  SwitchField,
  TimezonePicker,
} from '@raftlabs/react-hook-form-antd';
import { useForm } from 'react-hook-form';
export function App() {
  const form1 = useForm();
  return (
    <>
      <div>Demo App to Check ReactHookFormAntd</div>
      <div>
        <MainForm
          formHook={form1}
          onSubmit={console.log}
          className="grid grid-cols-3 items-center justify-center"
        >
          <AutoCompleteField
            formHook={form1}
            name="a1"
            label="A1"
            options={[{ value: '123', label: '123' }]}
          />
          <CheckboxField formHook={form1} name="check1" />
          <CSVUploadField formHook={form1} label="CSV1" name="csv1" />
          <DatePickerField formHook={form1} label="Date Now" name="daten" />
          <ImageUploadField
            formHook={form1}
            label="PFP"
            name="pfp"
            buttonLabel="Upload PFP"
          />
          <InputField formHook={form1} label="Name" name="name" />
          <InputNumberField formHook={form1} label="PIN" name="pin" />
          <InputPasswordField formHook={form1} label="Pass" name="pass" />
          <InputTextAreaField formHook={form1} label="Note" name="note" />
          <RadioGroupField
            formHook={form1}
            label="Gender"
            name="gender"
            options={['Male', 'Female']}
          />
          <RangePickerField
            formHook={form1}
            label="Date Range"
            name="daterange"
          />
          <RichTextEditorField formHook={form1} label="Blog" name="blog" />
          <SelectField
            formHook={form1}
            label="Lang"
            name="lang"
            options={[{ label: 'English', value: 'eng' }]}
          />
          <SwitchField formHook={form1} label="DemoSwtich" name="demoswitch" />
          <TimezonePicker formHook={form1} label="Select TimeZ" name="timez" />
          <button type="submit">Submit to Console</button>
        </MainForm>
      </div>
    </>
  );
}

export default App;
