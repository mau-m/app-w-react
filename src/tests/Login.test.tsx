import axios from 'axios';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Login from '../components/Login';

// MOCK i18n
vi.mock('react-i18next', () => ({
    useTranslation : () => ({
        t: (key: string) => key
    })
}));

// MOCK axios
vi.mock('axios');
const mockedAxios = vi.mocked(axios);

it('llama al endpoint de login', async () => {
    mockedAxios.post.mockResolvedValue({
        status : 200,
        data: {
            accessToken: 'token123',
            refreshToken: 'refresh123'
        }
    });

    render(
        <MemoryRouter>
        <Login />
        </MemoryRouter>
    );

    fireEvent.change(screen.getByRole('textbox'), {
        target: {
            name: 'email',
            value: 'admin@test.com'
        }
    });

    fireEvent.change(screen.getByRole('textbox', { name: '' }), {
        target: {
            name: 'password',
            value: '123456'
        }
    });

    fireEvent.click(screen.getByRole('button'));

    await waitFor(() => {
        expect(mockedAxios.post).toHaveBeenCalled();
    });
});
