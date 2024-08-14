import gql from "graphql-tag";

const Payment = {
  insert: gql`
    mutation MyMutation($object: payment_insert_input = {}) {
      insert_payment_one(object: $object) {
        payment_id
      }
    }
  `,
  getOneByMonthAndYear: gql`
    query MyQuery($month: Int!, $year: Int!) {
      payment(
        where: {
          _and: [
            { payment_month: { _eq: $month } }
            { payment_year: { _eq: $year } }
          ]
        }
      ) {
        payment_id
        payment_month
        payment_qr_code
        payment_year
        updated_at
        payment_account_number
        payment_account_name
        payment_account_bank_name
        created_at
      }
    }
  `,
  getOneByGmail: gql`
    query MyQuery($gmail: String = "") {
      customer(where: { customer_gmail: { _eq: $gmail } }) {
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
  update: gql`
    mutation MyMutation($payment_id: uuid = "", $object: payment_set_input = {}) {
        update_payment_by_pk(pk_columns: {payment_id: $payment_id}, _set: $object) {
            payment_id
        }
    }
  `,
  delete: gql`
    mutation MyMutation($payment_id: uuid = "") {
      delete_payment_by_pk(payment_id: $payment_id) {
        payment_id
      }
    }
  `,
  getAll: gql`
    query MyQuery {
      payment {
        created_at
        payment_account_bank_name
        payment_account_name
        payment_account_number
        payment_id
        payment_month
        payment_qr_code
        payment_year
        updated_at
      }
    }
  `,
  getOne: gql`
    query MyQuery($payment_id: uuid = "") {
      payment_by_pk(payment_id: $payment_id) {
        created_at
        payment_account_bank_name
        payment_account_name
        payment_account_number
        payment_id
        payment_month
        payment_qr_code
        payment_year
        updated_at
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
    query MyQuery($number: Int!) {
      payment(
        where: {
          _or: [
            { payment_month: { _eq: $number } }
            { payment_year: { _eq: $number } }
          ]
        }
      ) {
        created_at
        payment_account_bank_name
        payment_account_name
        payment_account_number
        payment_id
        payment_month
        payment_qr_code
        payment_year
        updated_at
      }
    }
  `,
};

export default Payment;
