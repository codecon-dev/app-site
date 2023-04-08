import sendgrid from '@sendgrid/mail';

import Attendee from 'src/database/model/Attendee';

type Event = 'DIGITAL' | 'SUMMIT' | 'FEATURE';

export default class AttendeeService {
    public static async createFromSympla(
        symplaId: string,
        symplaData: any,
        event: Event
    ): Promise<void> {
        const attendee: Attendee | null = await Attendee.findBySymplaIdAndEvent(symplaId, event);

        if (attendee) return;

        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        symplaData.map(async (t: any) => {
            void (await Attendee.create({
                symplaId: t.order_id as string,
                name: t.first_name as string,
                lastName: t.last_name as string,
                email: t.email as string,
                event
            }));
        });
    }

    public static async sendWelcomeEmail(
        id: string,
        name: string,
        lastName: string,
        email: string,
        event: Event
    ): Promise<void> {
        const attendee: Attendee | null = await Attendee.findByEmaildAndEvent(email, event);

        if (attendee) return;

        await Attendee.create({
            symplaId: id,
            name,
            lastName,
            email,
            event
        });

        sendgrid.setApiKey(process.env.SENDGRID_API_KEY || '');

        let templateId;
        let eventName;

        switch (event) {
            case 'DIGITAL':
                templateId = 'd-c18b9d72d4784e10b0879ae94e4eba9e';
                eventName = 'Codecon Digital';
                break;
            case 'SUMMIT':
                templateId = 'd-c9cbcc08854849e2baf96c16a50cddd9';
                eventName = 'Codecon Summit';
                break;
            case 'FEATURE':
                templateId = 'd-ca3b1747b9a94526acfdb5812df7a1b4';
                eventName = 'Codecon Feature';
                break;
        }

        const msg = {
            to: email,
            from: {
                email: 'contato@codecon.dev',
                name: eventName
            },
            templateId,
            dynamicTemplateData: {
                url: `https://codecon.dev/${event.toLowerCase()}/inscrito`,
                order: id
            }
        };

        await sendgrid.send(msg);
    }

    private static async findOrCreate(
        id: string,
        name: string,
        lastName: string,
        email: string,
        event: Event
    ): Promise<Attendee> {
        const [attendee, created] = await Attendee.findOrCreate({
            where: { symplaId: id, name, lastName, email, event }
        });

        return await attendee.save();
    }
}
