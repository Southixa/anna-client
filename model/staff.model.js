import gql from "graphql-tag";

const Staff = {
    insert: gql`
        mutation insertStuff($object: staff_insert_input!) {
            staff: insert_staff_one(object: $object) {
                staff_id
            }
        }
    `,
    getOneByGmail: gql`
        query MyQuery($email: citext = "") {
            users(where: {email: {_eq: $email}}) {
                id
            }
        }
    `,
    getOneByPhoneNumber: gql`
        query MyQuery($phoneNumber: String = "") {
            users(where: {phoneNumber: {_eq: $phoneNumber}}) {
                id
            }
    }


    `,
    update: gql`
     mutation MyMutation($object: users_set_input = {}, $id: uuid = "") {
        updateUsers(where: {id: {_eq: $id}}, _set: $object) {
            returning {
            id
            }
        }
    }

    `,
    delete: gql`
    mutation MyMutation($id: uuid = "") {
        deleteUsers(where: {id: {_eq: $id}}) {
            returning {
               id
            }
        }
    }

    `,
    getAll: gql`
     query MyQuery {
        users {
            activeMfaType
            avatarUrl
            createdAt
            currentChallenge
            defaultRole
            disabled
            displayName
            email
            emailVerified
            id
            isAnonymous
            lastSeen
            locale
            newEmail
            otpHash
            otpHashExpiresAt
            otpMethodLastUsed
            passwordHash
            phoneNumber
            phoneNumberVerified
            ticket
            ticketExpiresAt
            totpSecret
            updatedAt
        }
        }

    `
    ,
    getOne: gql`
        query staff($id: uuid!) {
            staff_by_pk(staff_id: $id) {
                staff_id
                staff_firstname
                staff_lastname
                staff_email
                staff_phone
                staff_password
                staff_profile
                staff_role
                users_id
            }
        }
    `,
    countAll: gql`
         {
            staff_aggregate {
                aggregate {
                count(columns: staff_id)
                }
            }
        }
    `,
    search: gql`
        query MyQuery($strText: String = "") {
        users(where: {_or: [{displayName: {_ilike: $strText}}, {currentChallenge: {_ilike: $strText}}, {phoneNumber: {_ilike: $strText}}, {defaultRole: {_ilike: $strText}}]}) {
            id
            updatedAt
            totpSecret
            ticketExpiresAt
            ticket
            phoneNumberVerified
            phoneNumber
            passwordHash
            otpMethodLastUsed
            otpHashExpiresAt
            otpHash
            newEmail
            locale
            lastSeen
            isAnonymous
            emailVerified
            email
            displayName
            disabled
            defaultRole
            currentChallenge
            createdAt
            avatarUrl
            activeMfaType
        }
        }
    `
}

export default Staff;