import { MenuItem } from './types/all';

export const SITE_URL = 'https://www.codecon.dev';
export const SITE_ORIGIN = process.env.NEXT_PUBLIC_SITE_ORIGIN || new URL(SITE_URL).origin;
export const TWITTER_USER_NAME = 'codecondev';
export const SITE_NAME = 'Codecon • Festival de código e tecnologia';
export const META_DESCRIPTION =
    'A Codecon reúne código, diversão e atividades em um ambiente virtual onde você consegue de verdade interagir com outras pessoas.';
export const DIGITAL_REGISTER_URL =
    'https://www.sympla.com.br/codecon-2022---be-the-developer-of-the-future__1631778';
export const EVENT_PRICE = 59;
export const WORKSHOP_PRICE = 0;
export const RANKING_ENABLED = true;
export const WHATSAPP_LINK = 'https://chat.whatsapp.com/CPP0eFxck7yDhvdsnBm6Lu';

export const DIGITAL_MENU_NAV: MenuItem[] = [
    {
        name: 'Quem vai',
        route: '/digital/quem-vai'
    },
    {
        name: 'Programação',
        route: '/digital/programacao'
    },
    {
        name: 'Como funciona',
        route: '/digital/como-funciona'
    },
    {
        name: 'Patrocinadores',
        route: '/digital/patrocinadores'
    }
];

export const DIGITAL_ATTENDEE_NAV: MenuItem[] = [
    {
        name: 'Inscrições encerradas',
        route: DIGITAL_REGISTER_URL,
        type: 'button'
    }
];

export const SUMMIT_MENU_NAV: MenuItem[] = [
    {
        name: 'Quem vai',
        route: '/summit/quem-vai'
    },
    {
        name: 'Programação',
        route: '/summit/programacao'
    },
    {
        name: 'Como funciona',
        route: '/summit/como-funciona'
    },
    {
        name: 'Patrocinadores',
        route: '/summit/patrocinadores'
    }
];

export const SUMMIT_ATTENDEE_NAV: MenuItem[] = [
    {
        name: 'Inscrições encerradas',
        route: DIGITAL_REGISTER_URL,
        type: 'button'
    }
];

export const FEATURE_MENU_NAV: MenuItem[] = [
    {
        name: 'Quem vai',
        route: '/feature/quem-vai'
    },
    {
        name: 'Programação',
        route: '/feature/programacao'
    },
    {
        name: 'Como funciona',
        route: '/feature/como-funciona'
    },
    {
        name: 'Patrocinadores',
        route: '/feature/patrocinadores'
    }
];

export const FEATURE_ATTENDEE_NAV: MenuItem[] = [
    {
        name: 'Inscrições encerradas',
        route: DIGITAL_REGISTER_URL,
        type: 'button'
    }
];
