import { render, screen } from '@testing-library/react';
import App from './App';

test('renders main navigation sections', () => {
  render(<App />);

  expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /marketplace/i })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /digital modules for modern agricultural trade/i })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /listing preview for buyers and suppliers/i })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /create a new account/i })).toBeInTheDocument();
});
