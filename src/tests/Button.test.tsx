/** @jest-environment jsdom */
// o también puedes usar: /** @vitest-environment jsdom */
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import Button from '../components/Button';

vi.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key: string) => key,
    }),
}));

vi.mock('../components/utils', () => ({
    getSvgUrl: (iconName: string) => `/icons/${iconName}.svg`,
}));

describe ('Button', () => {
    it('muestra el label traducido', () => {
        render (
            <Button
                iconName="save"
                labelKey="buttons.save"
            />
        );

        expect (
            screen.getByText('buttons.save')
        ).toBeInTheDocument();
    });
});
