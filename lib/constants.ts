import { MenuItem } from './types/all';

export const SITE_URL = 'https://www.codecon.dev';
export const SITE_ORIGIN = process.env.NEXT_PUBLIC_SITE_ORIGIN || new URL(SITE_URL).origin;
export const TWITTER_USER_NAME = 'codecondev';
export const SITE_NAME = 'Codecon • Festival de código e tecnologia';
export const META_DESCRIPTION =
    'A Codecon reúne código, diversão e atividades em um ambiente virtual onde você consegue de verdade interagir com outras pessoas.';
export const REGISTER_URL =
    'https://www.sympla.com.br/codecon-2022---be-the-developer-of-the-future__1631778';
export const EVENT_PRICE = 59;
export const WORKSHOP_PRICE = 0;
export const RANKING_ENABLED = true;
export const WHATSAPP_LINK = 'https://chat.whatsapp.com/CPP0eFxck7yDhvdsnBm6Lu';

export const NAVIGATION_2022: MenuItem[] = [
    {
        name: 'Quem vai',
        route: '/quem-vai'
    },
    {
        name: 'Programação',
        route: '/programacao'
    },
    {
        name: 'Como funciona',
        route: '/como-funciona'
    },
    {
        name: 'Workshops',
        route: '/workshops'
    },
    {
        name: 'Patrocinadores',
        route: '/patrocinadores'
    }
];

export const ATTENDEE_NAVIGATION_2022: MenuItem[] = [
    {
        name: 'Inscrições encerradas',
        route: REGISTER_URL,
        type: 'button'
    }
];
