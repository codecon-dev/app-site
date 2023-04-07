import { useEffect } from 'react';
import { GetServerSideProps, NextApiResponse } from 'next';
import LoginLinkService from 'src/services/LoginLinkService';

import Page from '@components/_ui/Page';

export default function TicketHash() {
    const meta = {
        title: `Área do inscrito - Codecon`
    };

    useEffect(() => {
        location.href = '/summit/inscrito';
    });

    return (
        <Page meta={meta} hideNav hideFooter>
            <p style={{ textAlign: 'center', margin: '5em' }}>Redirecionando...</p>
        </Page>
    );
}

export const getServerSideProps: GetServerSideProps = async context => {
    const hash = context.params?.hash;
    const res = context.res as NextApiResponse;

    if (!hash) {
        return {
            notFound: true
        };
    }

    await LoginLinkService.login(hash.toString(), 'SUMMIT', res);

    return {
        props: {}
    };
};
