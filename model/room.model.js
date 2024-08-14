import gql from "graphql-tag";

const Room = {
    insert: gql`
        mutation MyMutation($object: room_insert_input!) {
            insert_room_one(object: $object) {
                room_id
            }
        }
    `,
    getOneByRoomNumber: gql`
    query getOneByRoomNumber($room_number: bigint = "") {
        room(where: {room_number: {_eq: $room_number}}) {
            room_id
            room_number
            room_building_name
            room_price
            room_quantity
        }
    }
    `,
    getAll: gql`
    query getAllRoom($offset: Int = 0, $limit: Int = 9999) {
    room(offset: $offset, limit: $limit) {
        room_id
        room_number
        room_building_name
        room_price
        room_quantity
        updated_at
        created_at
    }
    }
    `,
    searchByRoomNumberAndRoomBuildingName: gql`
        query search($room_number: bigint = "", $room_building_name: String = "") {
            room(where: 
                {
                _or: [
                    {room_number: { _eq: $room_number }},
                    {room_building_name: { _eq: $room_building_name }}
                ]
                }
            ) {
                room_id
                room_number
                room_building_name
                room_price
                room_quantity
                updated_at
                created_at
            }
        }

    `,
    update: gql`
        mutation updateRoom($room_id: uuid = "", $object: room_set_input = {}) {
        update_room_by_pk(pk_columns: {room_id: $room_id}, _set: $object) {
            room_id
        }
    }
    `,
    delete: gql`
    mutation deleteRoom($room_id: uuid = "") {
        delete_room_by_pk(room_id: $room_id) {
            room_id
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
        query getOne($room_id: uuid = "") {
            room_by_pk(room_id: $room_id) {
                room_id
                room_number
                room_building_name
                room_price
                room_quantity
                updated_at
                created_at
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

export default Room;