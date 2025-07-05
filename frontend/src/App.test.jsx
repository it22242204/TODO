import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders header logo', () => {
  render(<App />);
  const logo = screen.getByLabelText(/Pro Todo Manager/i);
  expect(logo).toBeInTheDocument();
});