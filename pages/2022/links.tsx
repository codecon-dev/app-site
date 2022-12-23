import Links from '@components/2022/home/Links';
import Page from '@components/2022/_ui/Page';

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
