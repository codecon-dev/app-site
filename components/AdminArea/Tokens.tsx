import { useEffect, useState } from 'react';
import axios from 'axios';
import MaterialTable from 'material-table';

import { CodecodesToken } from '@lib/types/codecodes';

import styles from './AdminArea.module.scss';

type Props = {
    token?: CodecodesToken;
    allTokens?: CodecodesToken[];
};

function Token({ code, externalTokenData }: { code: string; externalTokenData?: CodecodesToken }) {
    const [tokenData, setTokenData] = useState<CodecodesToken | null>(externalTokenData ?? null);

    useEffect(() => {
        async function getTokenData() {
            await axios.get(`/api/codecodes/token/?code=${code}`).then(function (response) {
                setTokenData(response.data.data as CodecodesToken);
            });
        }

        if (!tokenData) void getTokenData();
    }, [code, tokenData]);

    if (!tokenData) return <p>Carregando...</p>;

    return (
        <div className={styles.token}>
            <h3>Token - {tokenData.code}</h3>

            <div className={styles['token-detail']}>
                <p>
                    Nome: <pre>{tokenData.code}</pre>
                </p>
                <p>
                    Descrição: <pre>{tokenData.description}</pre>
                </p>
                <p>
                    Pontos: <pre>{tokenData.value}</pre>
                </p>
                <p>
                    Redução por resgate:{' '}
                    <pre>
                        {tokenData.decreaseValue == 0 ? 'Não reduz' : tokenData.decreaseValue}
                    </pre>
                </p>
                <p>
                    Pontos mínimos:{' '}
                    <pre>{tokenData.minimumValue == 0 ? 'Não tem' : tokenData.minimumValue}</pre>
                </p>
                <p>
                    Resgates máximos: <pre>{tokenData.totalClaims ?? 'Infinito'}</pre>
                </p>
                <p>
                    Resgates restantes: <pre>{tokenData.remainingClaims ?? 'Infinito'}</pre>
                </p>
                <p>
                    Resgates efetuados:{' '}
                    <pre>{tokenData.claimedBy && tokenData.claimedBy.length}</pre>
                </p>
                <p>
                    Expira em: <pre>{tokenData.expireAt ?? 'Não expira'}</pre>
                </p>
            </div>
            <p className={styles['claimed-by']}>
                Usuários que resgataram:
                <pre>
                    {tokenData.claimedBy && tokenData.claimedBy.length > 0
                        ? JSON.stringify(tokenData.claimedBy, null, 2)
                        : 'Nenhum'}
                </pre>
            </p>
        </div>
    );
}

function AllTokens({ allTokens }: { allTokens: CodecodesToken[] }) {
    return (
        <>
            <p>Clique no código para ver mais detalhes.</p>
            <br />
            <MaterialTable
                title="Todos os tokens"
                columns={[
                    { title: 'Código', field: 'code' },
                    { title: 'Descrição', field: 'description' },
                    { title: 'Número de pontos', field: 'value' }
                ]}
                options={{
                    paging: true,
                    pageSize: 10
                }}
                data={allTokens}
                detailPanel={rowData => {
                    return (
                        <div className={styles['row-detail']}>
                            <Token code={rowData.code} />
                        </div>
                    );
                }}
                onRowClick={(event, rowData, togglePanel) => {
                    togglePanel && togglePanel();
                }}
            />
        </>
    );
}

export default function Tokens({ token, allTokens }: Props) {
    return (
        <div>
            <h2>Tokens</h2>

            {token && <Token code={token.code} externalTokenData={token} />}

            {allTokens && <AllTokens allTokens={allTokens} />}
        </div>
    );
}
