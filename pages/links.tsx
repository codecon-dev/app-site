import Links from '@components/home/Links';
import Page from '@components/_ui/Page';

export default function LinksPage() {
    const meta = {
        title: `Links - Codecon`,
        image: '/images/share-image.png'
    };

    return (
        <Page meta={meta}>
            <Links />
        </Page>
    );
}
