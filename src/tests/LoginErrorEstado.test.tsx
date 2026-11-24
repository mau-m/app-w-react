import axios from 'axios';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Login from '../components/Login';

vi.mock('axios');

vi.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key: string) => key
    })
}));

const mockedAxios = vi.mocked (axios);

it('conserva el estado de los campos después de un error de login', async () => {
    mockedAxios.post.mockRejectedValue(new Error('Credenciales incorrectas'));
    window.alert = vi.fn();

    render(
        <MemoryRouter>
        <Login />
        </MemoryRouter>
    );

    const emailInput = screen.getByRole('textbox') as HTMLInputElement;
    fireEvent.change(emailInput, {
        target: { name: 'email', value: 'admin@test.com' }
    });

    const passwordInput = screen.getByDisplayValue('') as HTMLInputElement;
    fireEvent.change( passwordInput, {
        target: { name: 'password', value: '123456' }
    });

    fireEvent.click(screen.getByRole('button'));

    await waitFor(() => {
        expect(window.alert).toHaveBeenCalled();
    });

    // El estado debe conservarse a pesar del error de la API
    expect(emailInput.value).toBe('admin@test.com');
    expect(passwordInput.value).toBe('123456');
});
