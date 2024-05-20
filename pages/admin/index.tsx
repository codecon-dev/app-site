import PrivateArea from '@components/_ui/PrivateArea';

import AdminArea from '@components/AdminArea';
import Stats from '@components/AdminArea/Stats';

export default function Admin() {
    return (
        <PrivateArea onlyAdmin>
            <AdminArea>
                <Stats />
            </AdminArea>
        </PrivateArea>
    );
}
