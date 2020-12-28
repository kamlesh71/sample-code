import { gql } from '@apollo/client';

import { USER_ATTRIBUTES } from 'graphql/queries/account'

export const REGISTER_MUTATION = gql`
    mutation Register($firstName: String!, $lastName: String!, $email: String!, $contactNumber: String!, $password: String!, $deviceName: String!, $company: String){
        register(inputs: {
            firstName: $firstName,
            lastName: $lastName,
            email: $email,
            contactNumber: $contactNumber,
            deviceName: $deviceName,
            company: $company,
            password: $password
        }) {
            token,
            user {
                ...LoginUser
            }
        }
    }
    ${USER_ATTRIBUTES}
`;

export const LOGIN_MUTATION = gql`
    mutation Login($email: String!, $password: String!, $deviceName: String!, $remember: Boolean!) {
        login(inputs: {
            email: $email,
            password: $password,
            remember: $remember,
            deviceName: $deviceName
        }) {
            token,
            user {
                ...LoginUser
            }
        }
    }
    ${USER_ATTRIBUTES}
`

export const LOGOUT_MUTATION = gql`
    mutation Logout {
        logout {
            success
            message
        }
    }
`

export const RESEND_VERIFICATION_CODE_MUTATION = gql`
    mutation ResendCode {
        sendVerificationCode {
            success
            message
        }
    }
`

export const VALIDATE_VERIFICATION_CODE_MUTATION = gql`
    mutation VerifyUser($code: String!) {
        verifyUser(token:$code){
            success
            message
        }
    }
`

export const FORGOT_PASSWORD_MUTATION = gql`
    mutation ForgotPassword($email: String!) {
        forgotPassword(inputs:{
            email:$email
        }){
            success
            message
        }
    }
`

export const VALIDATE_PASSWORD_CODE_MUTATION = gql`
    mutation ValidatePasswordCode($email: String!, $code: String!) {
        validatePasswordCode(inputs: {
            email: $email,
            code: $code
        }) {
            success
            message
        }
    }
`

export const RESET_PASSWORD_MUTATION = gql`
    mutation ResetPassword( $email: String!, $code: String!, $password: String! ) {
        resetPassword(inputs: {
            email: $email,
            code: $code,
            password: $password
        }) {
            success
            message
        }
    }
`