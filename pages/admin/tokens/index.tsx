import PrivateArea from '@components/_ui/PrivateArea';

import AdminArea from '@components/AdminArea';

export default function Admin() {
    return (
        <PrivateArea onlyAdmin>
            <AdminArea />
        </PrivateArea>
    );
}
