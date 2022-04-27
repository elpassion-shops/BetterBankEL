import React from 'react';
import { render } from '@testing-library/react';

import Index from '../pages/index';

describe(Index.name, () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Index />);
    expect(baseElement).toBeTruthy();
  });

  it('should contain proper title', async () => {
    // given
    const context = render(<Index />);

    // when

    // then
    const element = await context.findByText('Home page');
    expect(element).not.toBeNull();
  });
});
