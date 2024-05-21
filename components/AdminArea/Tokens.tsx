import { useRouter } from 'next/navigation';

import { CodecodesToken } from '@lib/types/codecodes';

import MaterialTable from 'material-table';

type Props = {
    token?: CodecodesToken;
    allTokens?: CodecodesToken[];
};

function Token({ token }: { token: CodecodesToken }) {
    return (
        <div>
            <h3>Token - {token.code}</h3>
            <p>
                Nome: <pre>{token.code}</pre>
            </p>
            <p>
                Descrição: <pre>{token.description}</pre>
            </p>
            <p>
                Pontos: <pre>{token.value}</pre>
            </p>
            <p>
                Redução por resgate:{' '}
                <pre>{token.decreaseValue == 0 ? 'Não reduz' : token.decreaseValue}</pre>
            </p>
            <p>
                Pontos mínimos:{' '}
                <pre>{token.minimumValue == 0 ? 'Não tem' : token.minimumValue}</pre>
            </p>
            <p>
                Resgates máximos: <pre>{token.totalClaims ?? 'Infinito'}</pre>
            </p>
            <p>
                Resgates restantes: <pre>{token.remainingClaims ?? 'Infinito'}</pre>
            </p>
            <p>
                Resgates efetuados: <pre>{token.claimedBy && token.claimedBy.length}</pre>
            </p>
            <p>
                Expira em: <pre>{token.expireAt ?? 'Não expira'}</pre>
            </p>
            <p>
                Usuários que resgataram:
                <pre>
                    {token.claimedBy && token.claimedBy.length > 0
                        ? JSON.stringify(token.claimedBy, null, 2)
                        : 'Nenhum'}
                </pre>
            </p>
        </div>
    );
}

function AllTokens({ allTokens }: { allTokens: CodecodesToken[] }) {
    const router = useRouter();

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
                onRowClick={(event, rowData) => {
                    router.push(`/admin/tokens/${rowData?.code}`);
                }}
            />
        </>
    );
}

export default function Tokens({ token, allTokens }: Props) {
    return (
        <div>
            <h2>Tokens</h2>

            {token && <Token token={token} />}

            {allTokens && <AllTokens allTokens={allTokens} />}
        </div>
    );
}
