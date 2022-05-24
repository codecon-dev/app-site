 import { GetStaticProps } from 'next';
 
 import Page from '@components/page';
 import Layout from '@components/layout';
 
 import { getAllSponsors } from '@lib/cms-api';
 import { Sponsor } from '@lib/types';
 import { META_DESCRIPTION } from '@lib/constants';
import Claim from '@components/claim';
 
 type Props = {
   sponsors: Sponsor[];
 };
 
 
 export default function Cadastro({ sponsors }: Props) {
   const meta = {
     title: 'Codecon - 25 de setembro de 2021',
     description: META_DESCRIPTION
   };
 
   return (
     <Page meta={meta} fullViewport>
       <Layout sponsors={sponsors} hideFooter hideNav>
            <Claim />
       </Layout>
     </Page>
   );
 }
 
 export const getStaticProps: GetStaticProps<Props> = async () => {
   const sponsors = await getAllSponsors();
 
   return {
     props: {
       sponsors
     }
   };
 };