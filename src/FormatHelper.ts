export default class FormatHelper {
    
    public static readonly MOBILE_PHONE_MIN_LENGTH = 13;

    public static validatePhone(phoneNumber: string): boolean {
        const sanitizedPhoneNumber = this.removeNonNumeric(phoneNumber);
        if (!sanitizedPhoneNumber.length) return false;

        const numberLength = sanitizedPhoneNumber.length;
        return numberLength == this.MOBILE_PHONE_MIN_LENGTH;
    }

    public static removeNonNumeric(value: string): string {
        if (!value?.length) return '';
        return value.replace(/\D/g, '');
    }
}
