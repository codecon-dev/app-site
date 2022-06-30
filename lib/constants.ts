export const SITE_URL = 'https://codecon.dev';
export const SITE_ORIGIN = process.env.NEXT_PUBLIC_SITE_ORIGIN || new URL(SITE_URL).origin;
export const TWITTER_USER_NAME = 'codecondev';
export const SITE_NAME = 'Codecon • 22, 23 e 24 de setembro';
export const META_DESCRIPTION =
  'A Codecon reúne código, diversão e atividades em um ambiente virtual onde você consegue de verdade interagir com outras pessoas.';
export const REGISTER_URL = 'https://hotmart.com/checkout/918058';
export const EVENT_PRICE = 9;
export const WORKSHOP_PRICE = 30;

export const NAVIGATION = [
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

export const ATTENDEE_NAVIGATION = [
  {
    name: 'Inscreva-se',
    route: REGISTER_URL,
    type: 'button'
  }
];
