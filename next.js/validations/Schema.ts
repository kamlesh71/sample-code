import * as yup from 'yup'
import { isValidPhoneNumber } from 'react-phone-number-input'

export const PasswordSchema = yup.string()
    .matches(/[A-Z]/, 'Must be at least one uppercase.')
    .matches(/[a-z]/, 'Must be at least one lowercase.')
    .matches(/[0-9]/, 'Must be at least one number.')
    .matches(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, 'Must be at least one special character.')
    .min(8, 'Too Short!')
    .max(100, 'too long');

export const PhoneSchema = yup.string().test('phone', 'Invalid phone number!', function(value) {
    return isValidPhoneNumber(value);
});
