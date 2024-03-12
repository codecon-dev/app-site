import { v4 as uuidv4 } from 'uuid';

import Attendee from 'src/database/model/Attendee';

type Event = 'DIGITAL' | 'SUMMIT' | 'FEATURE';

export type AttendeeResponse = {
    success: boolean;
    message: string;
};
export default class AttendeeService {
    private static async sendWelcomeEmail(email: string) {
        return;
    }

    public static async create(
        even3Id: string,
        name: string,
        lastName: string,
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
            email,
            event
        });

        //await this.sendWelcomeEmail(email);
    }

    public static async completeRegistration(
        attendee: Attendee,
        mobilePhone: string,
        displayName: string
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
}
