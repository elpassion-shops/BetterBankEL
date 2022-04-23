import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import 'whatwg-fetch';
import { mswServer } from '../mocks/mswServer';
import LoginForm from '../pages/SampleLoginForm';

beforeAll(() => mswServer.listen());
afterEach(() => mswServer.resetHandlers());
afterAll(() => mswServer.close());

describe('LoginForm', () => {
  it('should render successfully', () => {
    // given
    const { baseElement } = render(<LoginForm />);

    // then
    expect(baseElement).toBeTruthy();
  });

  it('should allow a user to log in', async () => {
    // given
    const accountBalance = '42';
    const accountNumber = '61109010140000071219812874';
    render(<LoginForm />);

    // when
    await userEvent.type(screen.getByLabelText(/username/i), 'johnUser');
    await userEvent.click(screen.getByRole('button', { name: /submit/i }));

    // then
    expect(
      await screen.findByText('f79e82e8-c34a-4dc7-a49e-9fadc0979fda')
    ).toBeInTheDocument();
    expect(await screen.findByText('John')).toBeInTheDocument();
    expect(await screen.findByText('Maverick')).toBeInTheDocument();
    expect(await screen.findByText(accountBalance)).toBeInTheDocument();
    expect(await screen.findByText(accountNumber)).toBeInTheDocument();
  });
});
