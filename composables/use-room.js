import { useMessage } from "naive-ui";
import Models from "~/model";
export const useRoom = () => {
    const { nhost } = useNhost();
    const message = useMessage();

    const getOneByRoomNumber = async (roomNumber) => {
        const { data, error } = await nhost.graphql.request(
            Models.Room.getOneByRoomNumber,
            {
                room_number: roomNumber
            }
        )
        if(error) {
            message.error("ດຶງຂໍ້ມູນຫ້ອງບໍ່ສຳເລັດ");
            console.log("error occurred in getOneByRoomNumber =>", error);
            return false
        }
        return data.room;

    }

    const add = async (item) => {
        const { data, error } = await nhost.graphql.request(
            Models.Room.insert,
            {
                object: {
                    room_number: item.number,
                    room_building_name: item.buildingName,
                    room_price: item.price,
                    room_quantity: item.quantity
                }
            }
        )
        if(error) {
            message.error("ເພີ່ມຂໍ້ມູນຫ້ອງບໍ່ສຳເລັດ");
            console.log("error occurred in insert =>", error);
            return false
        }
        message.success("ເພີ່ມຂໍ້ມູນຫ້ອງສຳເລັດ");
        return true;
    }

    const getAll = async () => {
        const { data, error } = await nhost.graphql.request(
            Models.Room.getAll,
            {
                offset: 0,
                limit: 999
            }
        );
        if(error) {
            message.error("ດຶງຂໍ້ມູນຫ້ອງບໍ່ສຳເລັດ");
            console.log("error occurred in getAll =>", error);
            return false
        }
        return data.room
    }

    const searchByRoomNumberAndRoomBuildingName = async (roomNumber, roomBuildingName) => {
        // check roomNumber is number or not
        if(isNaN(parseInt(roomNumber))) {
            roomNumber = 0;
        }

        const { data, error } = await nhost.graphql.request(
            Models.Room.searchByRoomNumberAndRoomBuildingName,
            {
                room_number: roomNumber,
                room_building_name: roomBuildingName
            }
        );
        if(error) {
            message.error("ດຶງຂໍ້ມູນຫ້ອງບໍ່ສຳເລັດ");
            console.log("error occurred in searchByRoomNumberAndRoomBuildingName =>", error);
            return false
        }
        return data.room
    }

    const del = async (id) => {
        const { data, error } = await nhost.graphql.request(
            Models.Room.delete,
            {
                room_id: id
            }
        );
        if(error) {
            message.error("ລຶບຫ້ອງເຊົ່າບໍ່ສຳເລັດ");
            console.log("error occurred in delete =>", error);
            return false
        }
        message.success("ລຶບຂໍ້ມູນສຳເລັດ");
        return true
    }

    const getOne = async (id) => {
        const { data, error } = await nhost.graphql.request(
            Models.Room.getOne,
            {
                room_id: id
            }
        );
        if(error) {
            message.error("ດຶງຂໍ້ມູນຫ້ອງບໍ່ສຳເລັດ");
            console.log("error occurred in getOne =>", error);
            return false
        }
        return data.room_by_pk
    }

    const update = async (id, item) => {
        const { data, error } = await nhost.graphql.request(
            Models.Room.update,
            {
                room_id: id,
                object: {
                    room_number: item.number,
                    room_building_name: item.buildingName,
                    room_price: item.price,
                    room_quantity: item.quantity
                }
            }
        );
        if(error) {
            message.error("ແກ້ໄຂຂໍ້ມູນຫ້ອງບໍ່ສຳເລັດ");
            console.log("error occurred in update =>", error);
            return false
        }
        message.success("ແກ້ໄຂຂໍ້ມູນຫ້ອງສຳເລັດ");
        return true
    }

    return { getOneByRoomNumber, add, getAll, searchByRoomNumberAndRoomBuildingName, del, getOne, update}
}