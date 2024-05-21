import PrivateArea from '@components/_ui/PrivateArea';

import AdminArea from '@components/AdminArea';
import NewToken from '@components/AdminArea/NewToken';

export default function Admin() {
    return (
        <PrivateArea onlyAdmin>
            <AdminArea>
                <NewToken />
            </AdminArea>
        </PrivateArea>
    );
}
