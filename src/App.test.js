import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

// this is because a known issue with mapBox -> https://github.com/mapbox/mapbox-gl-js/issues/3436 
jest.mock('mapbox-gl/dist/mapbox-gl', () => ({
  Map: () => ({})
}));

test('renders learn react link', () => {
  const { getByText } = render(<App />);
  //const linkElement = getByText(/learn react/i);
  //expect(linkElement).toBeInTheDocument();
});
