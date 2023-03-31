import Attendee from 'src/database/model/Attendee';

export default class AttendeeService {
    public static async createFromSympla(symplaId: string, symplaData: any[]): Promise<void> {
        const attendee: Attendee | null = await Attendee.findBySymplaId(symplaId);

        if (attendee) return;

        symplaData.map(async (t: any) => {
            void (await Attendee.create({
                symplaId: t.order_id,
                name: t.first_name,
                lastName: t.last_name,
                email: t.email
            }));
        });
    }
}
