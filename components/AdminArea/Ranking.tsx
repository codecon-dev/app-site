/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react';
import axios from 'axios';
import MaterialTable from 'material-table';

import { AttendeeCodeCodes, AttendeeRank } from '@lib/types/codecodes';

import styles from './AdminArea.module.scss';

type Props = {
    user?: AttendeeCodeCodes;
    rankAttendees?: AttendeeRank[];
};

function User({
    userId,
    externalUserData,
    users
}: {
    userId?: string | null;
    externalUserData?: AttendeeCodeCodes;
    users?: AttendeeRank[];
}) {
    const [userData, setUserData] = useState<AttendeeCodeCodes | null>(externalUserData ?? null);

    useEffect(() => {
        async function getUserData() {
            await axios.get(`/api/codecodes/user/?email=${userId}`).then(function (response) {
                setUserData(response.data.data as AttendeeCodeCodes);
            });
        }

        if (!userData) void getUserData();
    }, [userId, users, userData]);

    console.log(userData);

    if (!userData) return <p>Carregando...</p>;

    return (
        <div className={styles.token}>
            <h3>Usuário - {userData.displayName}</h3>

            <div className={styles['token-detail']}>
                <p>
                    <img
                        width={100}
                        src={
                            userData.github
                                ? `https://github.com/${userData.github}.png`
                                : 'https://avatars.githubusercontent.com/u/0'
                        }
                        alt="Avatar GitHub"
                        style={{ borderRadius: '100%' }}
                    />
                </p>
                <p>
                    Nome:{' '}
                    <pre>
                        {userData.name} {userData.lastName}
                    </pre>
                </p>
                <p>
                    E-mail: <pre>{userData.email}</pre>
                </p>
                <p></p>
                <p>
                    Pontos: <pre>{userData.user?.score}</pre>
                </p>
                <p>
                    Número de resgates: <pre>{userData.user?.tokens.length}</pre>
                </p>
            </div>
            <p className={styles['claimed-by']}>
                Resgates feitos:
                <pre>
                    <pre>
                        {userData.user?.tokens && userData.user?.tokens.length > 0
                            ? JSON.stringify(userData.user?.tokens, null, 2)
                            : 'Nenhum'}
                    </pre>
                </pre>
            </p>
        </div>
    );
}

function Rank({ users }: { users: AttendeeRank[] }) {
    const rankAttendees = users.map((user, index) => ({
        userId: user.userId,
        tag: user.tag,
        score: user.score,
        position: index + 1,
        claims: user.claims
    }));

    return (
        <>
            <p>Clique no usuário para ver mais detalhes.</p>
            <br />
            <MaterialTable
                columns={[
                    { title: 'Posição', field: 'position' },
                    { title: 'Nome', field: 'tag' },
                    { title: 'E-mail', field: 'userId' },
                    { title: 'Pontuação', field: 'score', type: 'numeric' },
                    { title: 'Resgates', field: 'claims', type: 'numeric' }
                ]}
                data={rankAttendees}
                title="Ranking"
                options={{
                    paging: true,
                    pageSize: 10
                }}
                detailPanel={rowData => {
                    return (
                        <div className={styles['row-detail']}>
                            <User userId={rowData.userId} users={rankAttendees} />
                        </div>
                    );
                }}
                onRowClick={(event, rowData, togglePanel) => {
                    togglePanel && togglePanel();
                }}
            />
            <br />
            <p>
                <strong>Critérios de desempate:</strong> quem mais pontuou; quem mais fez resgates;
                quem fez o primeiro resgate antes; sorteio.
            </p>
        </>
    );
}

export default function Ranking({ rankAttendees, user }: Props) {
    return (
        <div>
            <h2>Ranking</h2>

            {rankAttendees && !user ? (
                <Rank users={rankAttendees} />
            ) : (
                <User userId={user?.email} externalUserData={user} users={rankAttendees} />
            )}
        </div>
    );
}
