import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

test('renders the clean homepage by default', () => {
  render(<App />);

  expect(
    screen.getByRole('heading', {
      name: /a cleaner front door for agricultural trade operations/i,
    })
  ).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /about/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
});

test('navigates to the login page from the header', () => {
  render(<App />);

  fireEvent.click(screen.getAllByRole('button', { name: /^login$/i })[0]);

  expect(screen.getByRole('heading', { name: /secure access for platform participants/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /sign up/i })).toBeInTheDocument();
});
