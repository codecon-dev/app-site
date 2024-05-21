import PrivateArea from '@components/_ui/PrivateArea';

import AdminArea from '@components/AdminArea';
import ImportTokens from '@components/AdminArea/ImportTokens';

export default function Admin() {
    return (
        <PrivateArea onlyAdmin>
            <AdminArea>
                <ImportTokens />
            </AdminArea>
        </PrivateArea>
    );
}
