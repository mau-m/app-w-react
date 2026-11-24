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
it('muestra error cuando el login falla', async () => {
    mockedAxios.post.mockRejectedValue(new Error('Credenciales incorrectas'));

    window.alert = vi.fn();
    render(
        <MemoryRouter>
        <Login />
        </MemoryRouter>
    );

    fireEvent.change(screen.getByRole('textbox'), {
        target: { name: 'email', value: 'admin@test.com' }
    });

    fireEvent.change(screen.getByRole('textbox', { name: '' }), {
        target: { name: 'password', value: '123456' }
    });

    fireEvent.click(screen.getByRole('button'));

    await waitFor(() => {
        expect(window.alert).toHaveBeenCalled();
    });
});
