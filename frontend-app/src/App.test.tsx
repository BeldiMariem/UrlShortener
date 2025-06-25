import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

test('renders welcome message', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );

  const titleElement = screen.getByText(/welcome to/i);
  expect(titleElement).toBeInTheDocument();
});
