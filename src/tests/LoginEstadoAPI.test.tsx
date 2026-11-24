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

it('usa el estado actual de los campos al llamar a la API', async () => {
    mockedAxios.post.mockResolvedValue ({
        status: 200,
        data: { accessToken: 'token123', refreshToken: 'refresh123' }
    });

    render(
        <MemoryRouter>
        <Login />
        </MemoryRouter>
    );

    const emailInput = screen.getByRole('textbox') as HTMLInputElement;
    fireEvent.change (emailInput, {
        target: { name: 'email', value: 'admin@test.com' }
    });

    const passwordInput = screen.getByDisplayValue('') as HTMLInputElement;
    fireEvent.change ( passwordInput, {
        target: { name: 'password', value: '123456' }
    });

    expect (emailInput.value).toBe('admin@test.com');
    expect (passwordInput.value).toBe('123456');

    fireEvent.click(screen.getByRole('button'));

    await waitFor(() => {
        expect(mockedAxios.post).toHaveBeenCalledWith(
            'http://developer.jquiroz.net:3005/api/users/login',
            { email: 'admin@test.com', password: '123456' },
            expect.any(Object)
        );
    });
});
