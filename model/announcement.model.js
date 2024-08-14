import gql from "graphql-tag";

const Announcement = {
    insert: gql`
        mutation MyMutation($object: announcement_insert_input = {}) {
            insert_announcement_one(object: $object) {
                announcement_id
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
     mutation MyMutation($announcement_id: uuid = "", $object: announcement_set_input = {}) {
    update_announcement_by_pk(pk_columns: {announcement_id: $announcement_id}, _set: $object) {
            announcement_id
        }
    }
    `,
    delete: gql`
    mutation MyMutation($announcement_id: uuid = "") {
        delete_announcement_by_pk(announcement_id: $announcement_id) {
            announcement_id
        }
    }


    `,
    getAll: gql`
    query MyQuery {
    announcement {
        announcement_id
        announcement_detail
        announcement_staff_id
        announcement_thumbnail
        announcement_title
        created_at
        updated_at
    }
    }


    `
    ,
    getOne: gql`
query MyQuery($announcement_id: uuid = "") {
  announcement_by_pk(announcement_id: $announcement_id) {
    announcement_detail
    announcement_id
    announcement_staff_id
    announcement_thumbnail
    announcement_title
    created_at
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
query MyQuery($strText: String = "") {
  announcement(where: {_or: [{announcement_title: {_ilike: $strText}}, {announcement_detail: {_ilike: $strText}}]}) {
    announcement_id
    announcement_detail
    announcement_staff_id
    announcement_thumbnail
    announcement_title
    created_at
    updated_at
  }
}
    `,
}

export default Announcement;