import Links from '@components/home/Links';
import Page from '@components/_ui/Page';

export default function LinksPage() {
    const meta = {
        title: `Links - Codecon`
    };

    return (
        <Page meta={meta}>
            <Links />
        </Page>
    );
}
