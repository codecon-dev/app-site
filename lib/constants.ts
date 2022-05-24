export const SITE_URL = 'https://codecon.dev';
export const SITE_ORIGIN = process.env.NEXT_PUBLIC_SITE_ORIGIN || new URL(SITE_URL).origin;
export const TWITTER_USER_NAME = 'codecondev';
export const BRAND_NAME = 'Codecon';
export const SITE_NAME_MULTILINE = ['Codecon'];
export const SITE_NAME = 'Codecon';
export const META_DESCRIPTION =
  'Acompanhe os meetups semanais da nossa comunidade sobre desenvolvimento de software, ferramentas e tudo que há de bom.';
export const SITE_DESCRIPTION = 'Uma experiência online e interativa para a comunidade.';
export const DATE = '25 de setembro';
export const SHORT_DATE = '25 de setembro';
export const FULL_DATE = '25 de setembro';
export const TWEET_TEXT =
  'Já confirmei minha presença na Codecon 2021. Evento online, gamificado e interativo, feito para devs e devas.';
export const COOKIE = 'user-id';
export const SYMPLA_URL =
  'https://www.sympla.com.br/codecon-2021---code-better-beat-the-game__1293945';
export const RANKING_ENABLED = true;
export const GATHER_URL = 'https://gather.town/app/qsW0FsKL6d1eWb6b/Codecon';
export const LIVE_ENABLED = false;
export const SALES_ENABLED = false;
export const GAMES_ENABLED = false;

// Remove process.env.NEXT_PUBLIC_... below and replace them with
// strings containing your own privacy policy URL and copyright holder name
export const LEGAL_URL = process.env.NEXT_PUBLIC_PRIVACY_POLICY_URL;
export const COPYRIGHT_HOLDER = process.env.NEXT_PUBLIC_COPYRIGHT_HOLDER;

export const CODE_OF_CONDUCT =
  'https://www.notion.so/vercel/Code-of-Conduct-Example-7ddd8d0e9c354bb597a0faed87310a78';
export const REPO = 'https://github.com/vercel/virtual-event-starter-kit';
export const SAMPLE_TICKET_NUMBER = 1234;
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

export type TicketGenerationState = 'default' | 'loading';
