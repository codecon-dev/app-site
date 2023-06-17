import { useEffect } from 'react';

import Page from '@components/_ui/Page';

export default function Contato() {
    const meta = {
        title: 'Mapa - Codecon Digial'
    };

    useEffect(() => {
        const random = Math.floor(Math.random() * 10);

        if (random > 5) {
            location.href = 'https://app.gather.town/app/5MDPU9ttxlh5XNHb/Codecon%202023';
        } else {
            location.href = 'https://app.gather.town/app/OVvnhf0zgFUPKznN/Codecon%202023%20-%202';
        }
    });

    return (
        <Page meta={meta} hideNav hideFooter>
            <p style={{ textAlign: 'center', margin: '5em' }}>Redirecionando...</p>
        </Page>
    );
}
