export default class FormatHelper {
    public static validatePhone(phoneNumber: string): boolean {
        const sanitizedPhoneNumber = this.removeNonNumeric(phoneNumber);
        if (!sanitizedPhoneNumber.length) return false;

        const numberLength = sanitizedPhoneNumber.length;
        return numberLength == 11;
    }

    public static removeNonNumeric(value: string): string {
        if (!value?.length) return '';
        return value.replace(/\D/g, '');
    }
}
