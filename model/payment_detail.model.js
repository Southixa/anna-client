import gql from "graphql-tag";

const Payment_detail = {
  insertList: gql`
    mutation MyMutation($objects: [payment_detail_insert_input!] = {}) {
        insert_payment_detail(objects: $objects) {
            returning {
            payment_detail_id
            }
        }
    }
  `,
  getAllByCustomerId: gql`
  query MyQuery($customer_id: uuid = "") {
  payment_detail(where: {renting: {customer: {customer_id: {_eq: $customer_id}}}}) {
    created_at
    payment_deatil_total_price
    payment_detail_id
    payment_detail_is_approved
    payment_detail_payment_id
    payment_detail_renting_id
    payment_detail_slip
    updated_at
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
    mutation MyMutation($payment_detail_id: uuid = "", $object: payment_detail_set_input = {}) {
        update_payment_detail_by_pk(pk_columns: {payment_detail_id: $payment_detail_id}, _set: $object) {
            payment_detail_id
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
  getAllByPaymentId: gql`
  query MyQuery($payment_id: uuid = "") {
  payment_detail(where: {payment_detail_payment_id: {_eq: $payment_id}}) {
    created_at
    payment_deatil_total_price
    payment_detail_id
    payment_detail_is_approved
    payment_detail_payment_id
    payment_detail_renting_id
    payment_detail_slip
    updated_at
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
    renting {
      created_at
      renting_customer_id
      renting_deposit
      renting_end_date
      renting_id
      renting_lease_agreement
      renting_room_id
      renting_staff_id
      renting_start_date
      renting_status
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
        updated_at
      }
      room {
        created_at
        room_building_name
        room_id
        room_number
        room_price
        room_quantity
        updated_at
      }
    }
  }
}

  `,
  getOne: gql`
query MyQuery($payment_detail_id: uuid = "") {
  payment_detail_by_pk(payment_detail_id: $payment_detail_id) {
    created_at
    payment_deatil_total_price
    payment_detail_id
    payment_detail_is_approved
    payment_detail_payment_id
    payment_detail_renting_id
    payment_detail_slip
    updated_at
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
    renting {
      created_at
      renting_customer_id
      renting_deposit
      renting_end_date
      renting_id
      renting_lease_agreement
      renting_room_id
      renting_staff_id
      renting_start_date
      renting_status
      updated_at
      room {
        created_at
        room_building_name
        room_id
        room_number
        room_price
        room_quantity
        updated_at
      }
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
  payment_detail(where: {_or: [{renting: {customer: {customer_firstname: {_ilike: $strText}}}}, {renting: {customer: {customer_lastname: {_ilike: $strText}}}}]}) {
    created_at
    payment_deatil_total_price
    payment_detail_id
    payment_detail_is_approved
    payment_detail_payment_id
    payment_detail_renting_id
    payment_detail_slip
    updated_at
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
    renting {
      created_at
      renting_customer_id
      renting_deposit
      renting_end_date
      renting_id
      renting_lease_agreement
      renting_room_id
      renting_staff_id
      renting_start_date
      renting_status
      updated_at
      room {
        created_at
        room_building_name
        room_id
        room_number
        room_price
        room_quantity
        updated_at
      }
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
  }
}

  `,
};

export default Payment_detail;
