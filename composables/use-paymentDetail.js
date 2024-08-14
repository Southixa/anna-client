import { useMessage } from "naive-ui";
import Models from "~/model";
export const usePaymentDetail = () => {
    const { nhost } = useNhost();
    const { upload, delFile } = useFile();
    const message = useMessage();

    const addList = async (listItem) => {

        const { data, error } = await nhost.graphql.request(
            Models.Payment_detail.insertList,
            {
                objects: listItem
            }
        )
        if(error) {
            message.error("ເພີ່ມຂໍ້ມູນລາຍຊື່ການຊຳລະສຳເລັດ");
            console.log("error occurred in insert usePaymentDetail =>", error);
            return false
        }
        message.success("ເພີ່ມຂໍ້ມູນລາຍຊື່ການຊຳລະສຳເລັດແລ້ວ");
        return true;
    }

    const getAllByPaymentId = async (paymentId) => {

        const { data, error } = await nhost.graphql.request(
            Models.Payment_detail.getAllByPaymentId,
            {
                payment_id: paymentId
            }
        )
        if(error) {
            message.error("ດຶງຂໍ້ມູນລາຍຊື່ຜູ້ຕ້ອງຊຳລະເງິນບໍ່ສຳເລັດ");
            console.log("error occurred in getAllByPaymentId usePaymentDetail =>", error);
            return false
        }
        return data.payment_detail
    }

    const getAllByCustomerId = async (customerId) => {

        const { data, error } = await nhost.graphql.request(
            Models.Payment_detail.getAllByCustomerId,
            {
                customer_id: customerId
            }
        )
        if(error) {
            message.error("ດຶງຂໍ້ມູນລາຍການເດືອນທີ່ຕ້ອງຊຳລະເງິນບໍ່ສຳເລັດ");
            console.log("error occurred in getAllByCustomerId usePaymentDetail =>", error);
            return false
        }
        return data.payment_detail
    }

    const getOne = async (id) => {

        const { data, error } = await nhost.graphql.request(
            Models.Payment_detail.getOne,
            {
                payment_detail_id: id
            }
        )
        if(error) {
            message.error("ດຶງຂໍ້ມູນລາຍລະອຽດການຊຳລະເງິນບໍ່ສຳເລັດ");
            console.log("error occurred in getOne usePaymentDetail =>", error);
            return false
        }
        return data.payment_detail_by_pk
    }

    const uploadPayment = async (id, file) => {

        const slip = await upload(file)
        if(!slip) return false

        const { data, error } = await nhost.graphql.request(
            Models.Payment_detail.update,
            {
                payment_detail_id: id,
                object: {
                    payment_detail_is_approved: 'pending',
                    payment_detail_slip: slip,
                    updated_at: new Date()
                }
            }
        )
        if(error) {
            message.error("ບໍ່ສາມາດແກ້ໄຂສະຖານະໄດ້");
            console.log("error occurred in updateStatus usePaymentDetail =>", error);
            return false
        }
        message.success("ສົ່ງຂໍ້ມູນການໂອນສຳເລັດ");
        return true


    }

    const updateStatus = async (id, status) => {

        const { data, error } = await nhost.graphql.request(
            Models.Payment_detail.update,
            {
                payment_detail_id: id,
                object: {
                    payment_detail_is_approved: status
                }
            }
        )
        if(error) {
            message.error("ບໍ່ສາມາດແກ້ໄຂສະຖານະໄດ້");
            console.log("error occurred in updateStatus usePaymentDetail =>", error);
            return false
        }
        message.success("ອັບເດດສະຖານະສຳເລັດ");
        return true
    }

    const searchPaymentDetail = async (keyword) => {

        const { data, error } = await nhost.graphql.request(
            Models.Payment_detail.search,
            {
                strText: `%${keyword}%`
            }
        )
        if(error) {
            message.error("ດຶງຂໍ້ມູນລາຍຊື່ຜູ້ຕ້ອງຊຳລະເງິນບໍ່ສຳເລັດ");
            console.log("error occurred in searchPaymentDetail usePaymentDetail =>", error);
            return false
        }
        return data.payment_detail
    }


    return { addList, getAllByPaymentId, getOne, updateStatus, searchPaymentDetail, getAllByCustomerId, uploadPayment }
}