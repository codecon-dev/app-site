import { Column, Grid } from "@components/_ui/Grid";
import Page from "@components/_ui/Page/Page";
import PrivateArea from "@components/_ui/PrivateArea/PrivateArea";
import Chest from "@components/bau/Chest";
import { useState } from "react";

export default function Bau() {
    const meta = { title: "Baú de Prêmios - Codecon Digital" };
    const [opened, setOpened] = useState(false);

    const openChest = () => {
        setOpened(true);
        getPrize();
    };

    return (
        <Page theme="digital" meta={meta} hideNav hideFooter>
            <PrivateArea>
                <Grid align="center">
                    <Column lg={2} sm={0} xsm={0} />
                    <Column lg={8} sm={12} xsm={12}>
                        <div onClick={openChest}>
                            <Chest opened={opened} />
                        </div>
                    </Column>
                </Grid>
            </PrivateArea>
        </Page>
    );
}

function getPrize() {
    setTimeout(() => alert("Você ganhou um prêmio!"), 2500);
}