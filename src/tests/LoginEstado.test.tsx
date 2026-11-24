import { render, screen, fireEvent } from '@testing-library/react';
import { it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Login from '../components/Login';

// MOCK i18n
vi.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key: string) => key
    })
}));
it('actualiza el estado del email y password', () => {
    render(
        <MemoryRouter>
            <Login />
        </MemoryRouter>
    );

    const emailInput = screen.getByRole('textbox') as HTMLInputElement;

    fireEvent.change(emailInput, {
        target: { name: 'email', value: 'test@mail.com' }
    });

    expect(emailInput.value).toBe('test@mail.com');

    const passwordInput = screen.getByDisplayValue('') as HTMLInputElement;

    fireEvent.change(passwordInput, {
        target: { name: 'password', value: '123456' }
    });

    expect(passwordInput.value).toBe('123456');
});
