import { gql } from "@apollo/client";


export const USER_ATTRIBUTES = gql`
    fragment LoginUser on User {
        id
        fullName
        firstName
        lastName
        email
        contactNumber
        hasVerifiedEmail
        photoTiny:photo(size:TINY)
        photoThumb:photo(size:THUMB)
        company {
            name
        }
    }
`

export const ME_QUERY = gql`
    query {
        user: me {
            ...LoginUser
        }
    }
    ${USER_ATTRIBUTES}
`