import * as yup from 'yup'
import { PasswordSchema, PhoneSchema } from './Schema'

export const CompanySchema = yup.object().shape({
    company: yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('This field is required!'),
});

export const RegisterSchema = yup.object().shape({
    firstName: yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('This field is required!'),
    lastName: yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('This field is required!'),
    email: yup.string()
        .email('Invalid email!')
        .required('This field is required!'),
    contactNumber: PhoneSchema
        .required('This field is required!'),
    password: PasswordSchema
        .required('This field is required!'),
    confirmPassword: yup.string()
        .oneOf([yup.ref('password'), null], 'Password dose not match!')
        .required('This field is required!')
});

export const LoginSchema = yup.object().shape({
    email: yup.string()
        .email('Invalid email!')
        .required('This field is required!'),
    password: yup.string()
        .required('This field is required!'),
});

export const ForgotPasswordSchema = yup.object().shape({
    email: yup.string()
        .email('Invalid email!')
        .required('This field is required!'),
});

export const ResetPasswordSchema = yup.object().shape({
    password: PasswordSchema
        .required('This field is required!'),
    confirmPassword: yup.string()
        .oneOf([yup.ref('password'), null], 'Password dose not match!')
        .required('This field is required!')
});