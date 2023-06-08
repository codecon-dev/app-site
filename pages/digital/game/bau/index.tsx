import { Column, Grid } from "@components/_ui/Grid";
import Page from "@components/_ui/Page/Page";
import PrivateArea from "@components/_ui/PrivateArea/PrivateArea";
import Chest from "@components/bau/Chest";
export default function Bau() {
    const meta = { title: "Baú de Prêmios - Codecon Digital" };
    return (
        <Page theme="digital" meta={meta} hideNav hideFooter>
            <PrivateArea>
                <Grid align="center">
                    <Column lg={2} sm={0} xsm={0} />
                    <Column lg={8} sm={12} xsm={12}>
                            <Chest opened={opened} />
                    </Column>
                </Grid>
            </PrivateArea>
        </Page>
    );
}
