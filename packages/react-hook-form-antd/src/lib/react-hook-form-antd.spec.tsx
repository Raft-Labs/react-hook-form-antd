import { render } from '@testing-library/react';

import ReactHookFormAntd from './react-hook-form-antd';

describe('ReactHookFormAntd', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ReactHookFormAntd />);
    expect(baseElement).toBeTruthy();
  });
});
