import gql from "graphql-tag";

const Renting = {
    insert: gql`
       mutation MyMutation($object: renting_insert_input = {}) {
            insert_renting_one(object: $object) {
                renting_id
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
    update: gql`
    mutation MyMutation($renting_id: uuid = "", $object: renting_set_input = {}) {
        update_renting_by_pk(pk_columns: {renting_id: $renting_id}, _set: $object) {
            renting_id
        }
    }

    `,
    delete: gql`
    mutation MyMutation($renting_id: uuid = "") {
        delete_renting_by_pk(renting_id: $renting_id) {
            renting_id
        }
    }


    `,
    getAll: gql`
        query MyQuery {
  renting {
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
    created_at
    customer {
      customer_firstname
      customer_id
      created_at
      customer_district
      customer_gender
      customer_gmail
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



    `
    ,
    getOne: gql`
query MyQuery($renting_id: uuid = "") {
  renting_by_pk(renting_id: $renting_id) {
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
      updated_at
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
  renting(where: {_or: [{customer: {customer_firstname: {_ilike: $strText}}}, {customer: {customer_lastname: {_ilike: $strText}}}]}) {
    created_at
    updated_at
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
    renting_customer_id
    renting_deposit
    renting_end_date
    renting_id
    renting_lease_agreement
    renting_room_id
    renting_staff_id
    renting_start_date
    renting_status
  }
}

    `,
}

export default Renting;