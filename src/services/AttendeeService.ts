import Attendee from 'src/database/model/Attendee';

export default class AttendeeService {
    public static async createFromSympla(
        symplaId: string,
        symplaData: any,
        event: 'DIGITAL' | 'SUMMIT' | 'FEATURE'
    ): Promise<void> {
        const attendee: Attendee | null = await Attendee.findBySymplaIdAndEvent(symplaId, event);

        if (attendee) return;

        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        symplaData.map(async (t: any) => {
            void (await Attendee.create({
                symplaId: t.order_id,
                name: t.first_name,
                lastName: t.last_name,
                email: t.email,
                event
            }));
        });
    }
}
