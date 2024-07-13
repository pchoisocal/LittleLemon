import React from 'react';
import { render } from '@testing-library/react';
import Testimonials from './components/Testimonials';
import Menu from './components/Menu';
import Footer from './components/Footer';
import App from './App';

test('renders App component with all child components', () => {
  const { getByTestId } = render(<App />);
  
  // Check if each component is rendered
  expect(getByTestId('nav-component')).toBeInTheDocument();
  expect(getByTestId('main-component')).toBeInTheDocument();
  expect(getByTestId('menu-component')).toBeInTheDocument();
  expect(getByTestId('testimonials-component')).toBeInTheDocument();
  expect(getByTestId('footer-component')).toBeInTheDocument();

})

test('renders Menu component', () => {
  render(<Menu/>);
});

test('renders Footer component', () => {
  render(<Footer/>);
});

test('renders Testimonials component', () => {
  render(<Testimonials/>);
});

test('renders Testimonials header', () => {
  const { getByText } = render(<Testimonials />);
  const headerElement = getByText('Testimonials');
  expect(headerElement).toBeInTheDocument();
});

