import { v4 as uuidv4 } from 'uuid';
import { Resend } from 'resend';

import Attendee from 'src/database/model/Attendee';
import { WelcomeEmail } from '../../transactional/emails/welcome';

type Event = 'DIGITAL' | 'SUMMIT' | 'FEATURE';

export type AttendeeResponse = {
    success: boolean;
    message: string;
};
export default class AttendeeService {
    public static async create(
        even3Id: string,
        name: string,
        lastName: string,
        displayName: string,
        email: string,
        event: Event
    ): Promise<void> {
        const attendee: Attendee | null = await Attendee.findByEmaildAndEvent(email, event);

        if (attendee) return;

        await Attendee.create({
            uuid: uuidv4(),
            even3Id,
            name,
            lastName,
            displayName,
            email,
            event
        });

        await this.sendWelcomeEmail(email, name);
    }

    public static async completeRegistration(
        attendee: Attendee,
        displayName: string,
        mobilePhone: string
    ): Promise<AttendeeResponse> {
        attendee.mobilePhone = mobilePhone;
        attendee.displayName = displayName;
        await attendee.save();

        return {
            success: true,
            message: `Seus dados foram salvos`
        };
    }

    public static async acceptTerms(attendee: Attendee): Promise<AttendeeResponse> {
        attendee.acceptedTerms = true;
        await attendee.save();

        return {
            success: true,
            message: `Obrigado e bom evento!`
        };
    }

    private static async sendWelcomeEmail(email: string, name: string): Promise<void> {
        const resend = new Resend(process.env.RESEND_API_KEY || '');

        await resend.emails.send({
            from: 'Codecon Summit <contato@codecon.dev>',
            to: email,
            subject: 'Acesse a área para pessoas inscritas',
            react: WelcomeEmail({ name })
        });
    }
}
