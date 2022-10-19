import { Form, FormItemProps } from 'antd';

export function FormItem({ children, ...props }: FormItemProps) {
  return <Form.Item {...props}>{children}</Form.Item>;
}
