import MaterialTable, { Column } from 'material-table';
import { ReactNode } from 'react';

export interface Rankeable {
    position: number;
}

type Props = {
    data: Rankeable[];
    columns: Column<any>[];
    children?: ReactNode;
};

export default function Ranking({ data, columns, children }: Props) {
    return (
        <section>
            <div className="container">
                <MaterialTable
                    options={{ pageSize: 10 }}
                    columns={[
                        { title: 'Posição', field: 'position', cellStyle: { width: '10%' } },
                        ...columns
                    ]}
                    data={data}
                    title="Ranking"
                />
                <br />
                {children}
            </div>
        </section>
    );
}
