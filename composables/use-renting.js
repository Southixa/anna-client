import { useMessage } from "naive-ui";
import Models from "~/model";
export const useRenting = () => {
    const { nhost } = useNhost();
    const { upload, delFile } = useFile();
    const message = useMessage();

    const add = async (item) => {

        const leaseAgreement = await upload(item.leaseAgreement)
        if(!leaseAgreement) return false

        const { data, error } = await nhost.graphql.request(
            Models.Renting.insert,
            {
                object: {
                    renting_customer_id: item.customerId,
                    renting_room_id: item.roomId,
                    renting_start_date: item.startDate,
                    renting_deposit: item.deposit,
                    renting_lease_agreement: leaseAgreement,
                    renting_status: "booking"
                }
            }
        )
        if(error) {
            message.error("ເພີ່ມຂໍ້ມູນການເຊົ່າບໍ່ສຳເລັດ");
            console.log("error occurred in insert useRenting =>", error);
            return false
        }
        message.success("ເພີ່ມຂໍ້ມູນການເຊົ່າສຳເລັດ");
        return true;
    }

    const getAll = async () => {
        const { data, error } = await nhost.graphql.request(
            Models.Renting.getAll,
        )
        if(error) {
            message.error("ດຶງຂໍ້ມູນການເຊົ່າບໍ່ສຳເລັດ");
            console.log("error occurred in getAll useRenting =>", error);
            return false
        }
        return data.renting;
    }

    const del = async (id, leaseAgreement) => {

        const { data, error } = await nhost.graphql.request(
            Models.Renting.delete,
            {
                renting_id: id
            }
        )
        if(error) {
            message.error("ລົບຂໍ້ມູນການເຊົ່າບໍ່ສຳເລັດ");
            console.log("error occurred in delete useRenting =>", error);
            return false
        }

        const delLeaseAgreement = await delFile(leaseAgreement)
        if(!delLeaseAgreement) return false

        message.success("ລົບຂໍ້ມູນການເຊົ່າສຳເລັດແລ້ວ");
        return true

    }

    const searchRenting = async (keyword) => {
        const { data, error } = await nhost.graphql.request(
            Models.Renting.search,
            {
                strText: `%${keyword}%`
            }
        )
        if(error) {
            message.error("ຄົ້ນຫາຂໍ້ມູນການເຊົ່າບໍ່ສຳເລັດ");
            console.log("error occurred in search useRenting =>", error);
            return false
        }
        return data.renting
    }

    const getOne = async (id) => {
        const { data, error } = await nhost.graphql.request(
            Models.Renting.getOne,
            {
                renting_id: id
            }
        )
        if(error) {
            message.error("ດຶງຂໍ້ມູນການເຊົ່າບໍ່ສຳເລັດ");
            console.log("error occurred in getOne useRenting =>", error);
            return false
        }
        return data.renting_by_pk
    }

    const updateRentingLeft = async (item) => {

        const { data, error } = await nhost.graphql.request(
            Models.Renting.update,
            {
                renting_id: item.rentingId,
                object: {
                    renting_status: "left",
                    renting_end_date: item.rentingEndDate
                }
            }
        )
        if(error) {
            message.error("ແກ້ໄຂຂໍ້ມູນການເຊົ່າບໍ່ສຳເລັດ");
            console.log("error occurred in update useRenting =>", error);
            return false
        }
        message.success("ແກ້ໄຂຂໍ້ມູນການເຊົ່າສຳເລັດແລ້ວ");
        return true
    }

    return { add, getAll, del, searchRenting, getOne, updateRentingLeft }
}