export const SITE_URL = 'https://codecon.dev';
export const SITE_ORIGIN = process.env.NEXT_PUBLIC_SITE_ORIGIN || new URL(SITE_URL).origin;
export const TWITTER_USER_NAME = 'codecondev';
export const BRAND_NAME = 'Codecon';
export const SITE_NAME_MULTILINE = ['Codecon'];
export const SITE_NAME = 'Codecon';
export const META_DESCRIPTION =
  'Acompanhe os meetups semanais da nossa comunidade sobre desenvolvimento de software, ferramentas e tudo que há de bom.';
export const SITE_DESCRIPTION = 'Uma experiência online e interativa para a comunidade.';
export const REGISTER_URL = 'https://hotmart.com/checkout/918058';

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
    name: 'Login',
    route: '/login'
  },
  {
    name: 'Inscreva-se',
    route: REGISTER_URL,
    type: 'button'
  }
];
