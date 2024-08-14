import gql from "graphql-tag";

const Customer = {
    insert: gql`
        mutation insertCustomer($object: customer_insert_input = {}) {
            insert_customer_one(object: $object) {
                customer_id
            }
        }
    `,
    getOneByGmail: gql`
        query MyQuery($gmail: String = "") {
    customer(where: {customer_gmail: {_eq: $gmail}}) {
        created_at
        customer_district
        customer_firstname
        customer_gender
        customer_gmail
        customer_id
        customer_identification_id
        customer_lastname
        customer_password
        customer_phone
        customer_profile
        customer_province
        customer_village
    }
    }

    `,
    getOneByGmailAndPassword: gql`
    query MyQuery($email: String = "", $password: String = "") {
  customer(where: {customer_gmail: {_eq: $email}, customer_password: {_eq: $password}}) {
    created_at
    customer_district
    customer_firstname
    customer_gender
    customer_gmail
    customer_id
    customer_identification_id
    customer_lastname
    customer_password
    customer_phone
    customer_profile
    customer_province
    customer_village
    updated_at
  }
}

    `,
    update: gql`
    mutation MyMutation($customer_id: uuid = "", $object: customer_set_input = {}) {
    update_customer_by_pk(pk_columns: {customer_id: $customer_id}, _set: $object) {
            customer_id
        }
    }
    `,
    delete: gql`
    mutation MyMutation($customer_id: uuid = "") {
        delete_customer_by_pk(customer_id: $customer_id) {
            customer_id
        }
    }

    `,
    getAll: gql`
        query MyQuery {
        customer {
            created_at
            customer_district
            customer_firstname
            customer_gender
            customer_gmail
            customer_id
            customer_identification_id
            customer_lastname
            customer_password
            customer_phone
            customer_profile
            customer_province
            customer_village
        }
        }


    `
    ,
    getOne: gql`
        query MyQuery($customer_id: uuid = "") {
        customer_by_pk(customer_id: $customer_id) {
            created_at
            customer_district
            customer_firstname
            customer_gender
            customer_gmail
            customer_id
            customer_identification_id
            customer_lastname
            customer_password
            customer_phone
            customer_profile
            customer_province
            customer_village
        }
    }

    `,
    countAll: gql`
        {
            student_aggregate {
                aggregate {
                count(columns: student_id)
                }
            }
        }
    `,
    search: gql`
        query MyQuery($strText: String = "") {
    customer(where: {_or: 
        [
        {customer_firstname: {_ilike: $strText}},
        {customer_lastname: {_ilike: $strText}},
        {customer_gmail: {_ilike: $strText}},
        {customer_province: {_ilike: $strText}},
        {customer_district: {_ilike: $strText}},
        {customer_village: {_ilike: $strText}},
        {customer_identification_id: {_ilike: $strText}},
        ]
    }) {
        created_at
        customer_district
        customer_firstname
        customer_gender
        customer_gmail
        customer_id
        customer_identification_id
        customer_lastname
        customer_password
        customer_phone
        customer_profile
        customer_province
        customer_village
    }
    }
    `,
}

export default Customer;