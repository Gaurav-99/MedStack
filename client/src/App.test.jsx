import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import { act } from 'react';

test('renders MedStack header', () => {
    render(
        <Provider store={store}>
            <App />
        </Provider>
    );
    const linkElements = screen.getAllByText(/MedStack/i);
    expect(linkElements[0]).toBeInTheDocument();
});

test('renders Educational Disclaimer', () => {
    render(
        <Provider store={store}>
            <App />
        </Provider>
    );
    const disclaimer = screen.getByText(/not medical advice/i);
    expect(disclaimer).toBeInTheDocument();
});
