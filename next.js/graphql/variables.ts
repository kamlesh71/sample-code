import { makeVar } from '@apollo/client'
import { stringify } from 'querystring';

interface User {
    id: number,
    fullName: string,
    email: string,
    contactNumber: string,
    firstName: string,
    lastName: string,
    photoTiny: string,
    photoThumb: string,
    hasVerifiedEmail: boolean
    company?: {
        name: string
    }
}

interface Path {
    url: string,
    params?: {
        [key: string]: string
    }
}

// auth
export const IsLoggedIn = makeVar<null | boolean>(null);
export const ActiveUser = makeVar<User | null>(null);
export const ShowSignUp = makeVar<boolean>(false);

// generic
export const EnableFullScreenLoader = makeVar<boolean>(false);
export const IntendedRedirect  = makeVar<Path | null>(null);