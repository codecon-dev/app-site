import ResourceNotFoundError from '@lib/errors/ResourceNotFoundError';
import Attendee from '@models/Attendee';
import Chest from '@models/chest/Chest';
import ChestOpen from '@models/chest/ChestOpen';
import { StatusCodes } from 'http-status-codes';
import { NextApiRequest, NextApiResponse } from 'next';
import { Transaction } from 'sequelize';
import ApiResponse, { HttpMethod, WithLoggedAttendeeRequest } from 'src/api/ApiResponse';
import { withTransaction } from 'src/database/DataSource';
import ChestOpenService, { ChestInfo } from 'src/services/ChestOpenService';

export interface ChestOpenRequest extends WithLoggedAttendeeRequest {
    publicId: string;
}

export default async function ChestOpenController(req: NextApiRequest, res: NextApiResponse) {
    await ApiResponse.withCurrentAttendeeAndErrorHandler(
        req,
        res,
        HttpMethod.POST,
        async (attendee: Attendee) => {
            const params: ChestOpenRequest = req.body;

            const chest = await Chest.findOne({ where: { publicId: params.publicId } });
            if (!chest) throw new ResourceNotFoundError('Baú não encontrado');

            const chestOpen = await withTransaction<ChestInfo | undefined>(
                async (transaction: Transaction) => {
                    return await ChestOpenService.openChest(chest, attendee, transaction);
                }
            );
            if (!chestOpen)
                throw new Error(`Falha ao abrir o baú ${chest.id} para o usuário ${attendee.uuid}`);

            ApiResponse.build(res, StatusCodes.OK, 'Baú aberto com sucesso', {
                prize: (await chestOpen.chest.getPrize())?.description,
                firstOpen: chestOpen.firstOpen
            });
        }
    );
}
