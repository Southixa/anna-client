import gql from "graphql-tag";

const Liked = {
    insert: gql`
        mutation MyMutation($object: liked_insert_input!) {
            insert_liked_one(object: $object) {
                liked_id
                thesis_id
            }
        }
    `,
    update: gql`
        mutation UpdateStaffMutation($id: uuid!, $object: staff_set_input!) {
            update_staff_by_pk(pk_columns: {staff_id: $id}, _set: $object) {
                staff_id
            }
    }
    `,
    delete: gql`
    mutation deleteStaff ($id: uuid!){
        delete_staff_by_pk(staff_id: $id) {
            staff_id
        }
    }
    `,
    deleteByuserIdAndThesisId: gql`
    mutation MyMutation($user_id: uuid = "", $thesis_id: uuid = "") {
    delete_liked(where: {user_id: {_eq: $user_id}, _and: {thesis_id: {_eq: $thesis_id}}}) {
        returning {
        user_id
        thesis_id
        liked_id
        }
    }
    }
    `,
    getAll: gql`
      query degreeType($offset: Int, $limit: Int) {
        degree_type(offset: $offset, limit: $limit) {
            degree_type_id
            degree_type_name
        }
    }
    `
    ,
    getAllByUserId: gql`
    query MyQuery($user_id: uuid = "") {
            liked(where: {user_id: {_eq: $user_id}}) {
                liked_id
                thesis_id
                user_id
            }
        }

    `,
    getAllByUserIdAndThesisId: gql`
        query MyQuery($user_id: uuid = "", $thesis_id: uuid = "") {
        liked(where: {user_id: {_eq: $user_id}, _and: {thesis_id: {_eq: $thesis_id}}}) {
            liked_id
            thesis_id
            user_id
        }
    }
    `,
    getOne: gql`
        query staff($id: uuid!) {
            staff_by_pk(staff_id: $id) {
                staff_id
                staff_profile
                staff_firstname
                staff_lastname
                staff_phone
                staff_email
                staff_password
                staff_role
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
        query search ($strText: String!, $phone: Int!) {
        staff(where:
            {
            _or: [
                {staff_lastname: {_ilike: $strText}},
                {staff_firstname: {_ilike: $strText}},
                {staff_email: {_ilike: $strText}},
                {staff_phone: {_eq: $phone}},
            ]
            }
        ) {
            staff_id
            staff_firstname
            staff_lastname
            staff_email
            staff_password
            staff_phone
            staff_profile
            staff_role
        }
    }
    `
}

export default Liked;