/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Workshop, Sponsor, Talk } from '@lib/types/all';
import { Speaker } from '@lib/types/speakers';

const API_URL = 'https://graphql.datocms.com/';
const API_TOKEN = process.env.DATOCMS_READ_ONLY_API_TOKEN;

async function fetchCmsAPI(query: string, { variables }: { variables?: Record<string, any> } = {}) {
  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${API_TOKEN}`
      },
      body: JSON.stringify({
        query,
        variables
      })
    });

    const json = await res.json();
    if (json.errors) {
      // eslint-disable-next-line no-console
      console.error(json.errors);
      throw new Error('Failed to fetch API');
    }

    return json.data;
  } catch (error) {
    console.log(error);
    return {};
  }
}

export async function getAllSpeakers(limit: number): Promise<Speaker[]> {
  const data = await fetchCmsAPI(`
    {
      allSpeakers(orderBy: [order_ASC], first: ${limit}) {
        id
        name
        bio
        slug
        twitter
        github
        linkedin
        company
        image {
          url(imgixParams: {fm: jpg, fit: facearea, facepad: 3.5, sat: -100, bri: 7, w: 500, h: 500})
        }
        character {
          url
        }
      }
    }
  `);

  return data.allSpeakers;
}

export async function getAllTalks(): Promise<Talk[]> {
  const data = await fetchCmsAPI(`
    {
      allTalks(first: 100, orderBy: start_ASC) {
        id
        title
        slug
        emBreve
        start
        end
        description
        place
		    talkType
        speaker {
          name
          bio
          twitter
          slug
          github
          linkedin
          company
          image {
            url(imgixParams: {fm: jpg, fit: facearea, facepad: 3.5, sat: -100, w: 500, h: 500})
          }
        }
        sponsor {
          name
          logo {
            url
          }
        }
      }
    }
  `);

  return data.allTalks;
}

export async function getAllSponsors(): Promise<Sponsor[]> {
  const data = await fetchCmsAPI(`
    {
      allCompanies(first: 100, orderBy: name_ASC) {
        id
        name
        description
        slug
        color {
          hex
        }
        website
        youtubeSlug
        tier
        instagram
        twitter
        linkedin
        links {
          url
          text
        }
        cover {
          url
        }
        whiteLogo {
          url
        }
        logo {
          url
        }
        linksGather {
          url
          text
        }
      }
    }
  `);

  return data.allCompanies;
}

export async function getAllWorkshops(): Promise<Workshop[]> {
  const data = await fetchCmsAPI(`
    {
      allWorkshops(first: 100, orderBy: start_ASC) {
        id
        title
        slug
        description
		    start
		    end
        vagas
        teacher {
          name
          bio
          slug
          twitter
          github
          linkedin
          company
          image {
            url(imgixParams: {fm: jpg, fit: facearea, facepad: 3.5, w: 500, h: 500})
          }
        }
        link
      }
    }
  `);

  return data.allWorkshops;
}
