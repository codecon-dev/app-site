export const SITE_URL = 'https://codecon.dev';
export const SITE_ORIGIN = process.env.NEXT_PUBLIC_SITE_ORIGIN || new URL(SITE_URL).origin;
export const TWITTER_USER_NAME = 'codecondev';
export const BRAND_NAME = 'Codecon';
export const SITE_NAME_MULTILINE = ['Codecon'];
export const SITE_NAME = 'Codecon';
export const META_DESCRIPTION =
  'Acompanhe os meetups semanais da nossa comunidade sobre desenvolvimento de software, ferramentas e tudo que há de bom.';
export const SITE_DESCRIPTION = 'Uma experiência online e interativa para a comunidade.';

export const NAVIGATION = [
  {
    name: 'Codecon 2022',
    route:
      'https://docs.google.com/presentation/d/1wxTENq1PUshxhlowOJT97zfpUh8SeKOCnmyoz41OSQ8/edit?usp=sharing',
    target: '_blank'
  },
  {
    name: 'Camisetas Dev',
    route: 'https://www.tshirtgeek.com.br/loja/codecon',
    target: '_blank'
  },
  {
    name: 'Comunidades de tecnologia',
    route: 'https://github.com/codecon-dev/awesome-communities-brazil',
    target: '_blank'
  },
  {
    name: 'Programação',
    route: '/programacao'
  },
  {
    name: 'Contato',
    route: '/contato'
  }
];
