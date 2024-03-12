import { useState } from 'react';

import ApiResponse from 'src/api/ApiResponse';
import { useUserData } from '@lib/hooks/useUserData';
import { ChestOpenRequest } from 'pages/api/games/chest/open';

import { Column, Grid } from '@components/_ui/Grid';
import Chest from '@components/bau/Chest';
import { ChestState } from '@components/bau/Chest/Chest';
import ChestPrize from '@components/bau/Chest/ChestPrize/ChestPrize';

type Props = {
    chestPublicId: string;
};

export default function OpenChest({ chestPublicId }: Props) {
    const [chestState, setChestState] = useState<ChestState>('closed');
    const [prizeState, setPrizeState] = useState<string | null>(null);
    const [firstOpen, setFirstOpen] = useState(false);
    const [userData] = useUserData();

    function openChest() {
        if (chestState !== 'closed') return;

        setChestState('unlocked');
        getPrize(chestPublicId, userData.attendeeUuid)
            .then(() => {
                setChestState('opened');
            })
            .catch(() => {
                alert('Ocorreu um erro inesperado');
            });
    }

    async function getPrize(chestPublicId: string, attendeeUuid?: string) {
        if (!attendeeUuid) {
            alert('Usuário não está logado');
            return null;
        }

        const payload: ChestOpenRequest = {
            attendeeUuid,
            publicId: chestPublicId
        };

        const response = await fetch('/api/games/chest/open', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        const json: ApiResponse = await response.json();
        if (!json.success) {
            alert(
                'Ocorreu um erro desconhecido. Tente novamente ou contate a organização do evento'
            );
            return null;
        }

        setPrizeState((json.data?.prize as string) ?? 'Nada ¯\\_(ツ)_/¯');
        setFirstOpen(json.data.firstOpen as boolean);
    }

    return (
        <Grid align="center">
            <Column lg={2} sm={0} xsm={0} />
            <Column lg={8} sm={12} xsm={12}>
                <ChestPrize
                    show={chestState == 'opened'}
                    prize={prizeState}
                    firstOpen={firstOpen}
                />
                <Chest state={chestState} onClick={() => openChest()} />
                <p style={{ textAlign: 'center', padding: '50px 0' }}>
                    Caso você ganhe alguma premiação, apresente o celular no balcão de
                    credenciamento.
                </p>
            </Column>
        </Grid>
    );
}
