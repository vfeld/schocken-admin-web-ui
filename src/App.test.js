import { render, screen } from '@testing-library/react';
import App from './App';

test('renders schocken-admin-ui', () => {
  render(<App />);
  const linkElement = screen.getByText(/schocken/i);
  expect(linkElement).toBeInTheDocument();
});
