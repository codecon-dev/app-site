import { Column, Grid } from "@components/_ui/Grid";
import Page from "@components/_ui/Page/Page";
import PrivateArea from "@components/_ui/PrivateArea/PrivateArea";
import Chest from "@components/bau/Chest";
import { ChestState } from "@components/bau/Chest/Chest";
import ChestPrize from "@components/bau/Chest/ChestPrize/ChestPrize";
import { useUserData } from "@lib/hooks/useUserData";
import ChestModel from "@models/chest/Chest";
import { GetServerSideProps } from "next";
import { ChestOpenRequest } from "pages/api/games/chest/open";
import { useState } from "react";
import ApiResponse from "src/api/ApiResponse";

type BauProps = {
    chestPublicId: string;
};

export default function Bau(props: BauProps) {
    const meta = { title: "Baú de Prêmios - Codecon Digital" };
    const [chestState, setChestState] = useState<ChestState>("closed");
    const [prizeState, setPrizeState] = useState<string | null>(null);
    const { email } = useUserData();

    function openChest() {
        if (chestState !== "closed") return;

        setChestState("unlocked");
        getPrize(props.chestPublicId, email).then(() => {
            setChestState("opened");
        }).catch(() => {
            alert("Ocorreu um erro inesperado");
        });
    };

    async function getPrize(chestPublicId: string, email?: string) {
        if (!email) {
            alert("Usuário não está logado");
            return null;
        }

        const payload: ChestOpenRequest = {
            email: email,
            publicId: chestPublicId
        };

        const response = await fetch("/api/games/chest/open", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        const json: ApiResponse = await response.json();
        if (!json.success) {
            alert("Ocorreu um erro desconhecido. Tente novamente ou contate a organização do evento");
            return null;
        }

        setPrizeState(json.data?.prize ?? "Nada ¯\\_(ツ)_/¯");
    }

    return (
        <Page theme="digital" meta={meta} hideNav hideFooter>
            <PrivateArea>
                <Grid align="center">
                    <Column lg={2} sm={0} xsm={0} />
                    <Column lg={8} sm={12} xsm={12}>
                        <ChestPrize show={chestState == "opened"} prize={prizeState} />
                        <Chest state={chestState} onClick={() => openChest()} />
                    </Column>
                </Grid>
            </PrivateArea>
        </Page>
    );
}

export const getServerSideProps: GetServerSideProps<BauProps> = async context => {
    const publicId = context.params?.publicId;
    if (!publicId) return { notFound: true };

    const chest = await ChestModel.findOne({ where: { publicId: publicId } });
    if (!chest) return { notFound: true };

    return {
        props: {
            chestPublicId: chest.publicId
        }
    };
};