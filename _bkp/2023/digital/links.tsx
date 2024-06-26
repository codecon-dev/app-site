import Links from '@components/home/Links';
import Page from '@components/_ui/Page';

export default function LinksPage() {
    const meta = {
        title: `Links - Codecon`
    };

    return (
        <Page hideNav hideFooter theme="digital" meta={meta}>
            <Links />
        </Page>
    );
}
