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

    return {
        form: container.querySelector('form') as HTMLFormElement,
            email: container.querySelector('input[name="email"]') as HTMLInputElement,
            password : container.querySelector('input[name="password"]') as HTMLInputElement
    };
};

describe('Login - validacion de formulario', () => {
    it('formulario vacio es invalido', () => {
        const { form } = renderLogin();
        expect(form.checkValidity()).toBe(false);
    });

    it('formulario con solo el correo lleno sigue siendo invalido', () => {
        const { form , email } = renderLogin ();

        fireEvent.change(email, {
            target: { name: 'email', value: 'admin@test.com' }
        });

        expect(form.checkValidity()).toBe(false);
    });

    it('formulario con correo y contrasena llenos es valido', () => {
        const { form, email, password } = renderLogin();

        fireEvent.change(email, {
            target: { name: 'email', value: 'admin@test.com' }
        });

        fireEvent.change(password, {
            target : { name: 'password', value: '123456' }
        });

        expect(form.checkValidity()).toBe(true);
    });
});
