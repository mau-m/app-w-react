import { render, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Login from '../components/Login';

vi.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key: string) => key
    })
}));

vi.mock('../components/utils', () => ({
    getSvgUrl: (iconName : string) => `/icons/${iconName}.svg `
}));

const renderLogin = () => {
    const { container } = render(
        <MemoryRouter>
        <Login />
        </MemoryRouter>
    );
    return container.querySelector('input[name="email"]') as HTMLInputElement;
};

describe('Login - validacion de correo', () => {
    it('correo vacio es invalido (valueMissing)', () => {
        const email = renderLogin();
        expect(email.validity.valueMissing).toBe(true);
        expect(email.validity.valid).toBe(false);
    });

    it('correo sin formato valido es invalido(typeMismatch)', () => {
        const email = renderLogin();

        fireEvent.change(email, {
            target: { name: 'email', value: 'correo-sin-arroba' }
        });

        expect(email.validity.typeMismatch).toBe(true);
        expect(email.validity.valid).toBe(false);
    });

    it('correo con formato correcto es valido', () => {
        const email = renderLogin();

        fireEvent.change(email, {
            target: { name: 'email', value: 'admin@test.com' }
        });

        expect(email.validity.valid).toBe(true);
    });
});
