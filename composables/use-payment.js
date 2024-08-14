import { useMessage } from "naive-ui";
import Models from "~/model";
export const usePayment = () => {
    const { nhost } = useNhost();
    const { upload, delFile } = useFile();
    const message = useMessage();

    const add = async (item) => {

        const qrCode = await upload(item.qrCode)
        if(!qrCode) return false

        const { data, error } = await nhost.graphql.request(
            Models.Payment.insert,
            {
                object: {
                    payment_qr_code: qrCode,
                    payment_month: item.month,
                    payment_year: item.year,
                    payment_account_bank_name: item.accountBankName,
                    payment_account_number: item.accountNumber,
                    payment_account_name: item.accountName
                }
            }
        )
        if(error) {
            message.error("ເພີ່ມຂໍ້ມູນເດືອນຊຳລະເງິນບໍ່ສຳເລັດ");
            console.log("error occurred in insert usePayment =>", error);
            return false
        }
        message.success("ເພີ່ມຂໍ້ມູນເດືອນຊຳລະເງິນສຳເລັດແລ້ວ");
        return data.insert_payment_one;
    }

    const getOneByMonthAndYear = async (month, year) => {
        const { data, error } = await nhost.graphql.request(
            Models.Payment.getOneByMonthAndYear,
            {
                month: month,
                year: year
            }
        )
        if(error) {
            message.error("ດຶງຂໍ້ມູນເດືອນຊຳລະເງິນບໍ່ສຳເລັດ");
            console.log("error occurred in getOneByMonthAndYear =>", error);
            return false
        }
        return data.payment;
    }

    const getAll = async () => {
        const { data, error } = await nhost.graphql.request(
            Models.Payment.getAll,
        )
        if(error) {
            message.error("ດຶງຂໍ້ມູນເດືອນຊຳລະເງິນບໍ່ສຳເລັດ");
            console.log("error occurred in getAll usePayment =>", error);
            return false
        }
        return data.payment;
    }

    const del = async (id, qrCode) => {

        const { data, error } = await nhost.graphql.request(
            Models.Payment.delete,
            {
                payment_id: id
            }
        )
        if(error) {
            message.error("ລົບຂໍ້ມູນເດືອນຊຳລະເງິນບໍ່ສຳເລັດ");
            console.log("error occurred in delete usePayment =>", error);
            return false
        }

        const delQrCode = await delFile(qrCode)
        if(!delQrCode) return false

        message.success("ລົບຂໍ້ມູນເດືອນຊຳລະເງິນສຳເລັດແລ້ວ");
        return true
    }

    const getOne = async (id) => {
        const { data, error } = await nhost.graphql.request(
            Models.Payment.getOne,
            {
                payment_id: id
            }
        )
        if(error) {
            message.error("ດຶງຂໍ້ມູນເດືອນຊຳລະເງິນບໍ່ສຳເລັດ");
            console.log("error occurred in getOne usePayment =>", error);
            return false
        }
        return data.payment_by_pk
    }

    const update = async (id, item) => {

        const { data, error } = await nhost.graphql.request(
            Models.Payment.update,
            {
                payment_id: id,
                object: {
                    payment_month: item.month,
                    payment_year: item.year,
                    payment_account_bank_name: item.accountBankName,
                    payment_account_number: item.accountNumber,
                    payment_account_name: item.accountName,
                    payment_qr_code: item.qrCode
                }
            }
        )
        if(error) {
            message.error("ແກ້ໄຂຂໍ້ມູນເດືອນຊຳລະເງິນບໍ່ສຳເລັດ");
            console.log("error occurred in update usePayment =>", error);
            return false
        }
        message.success("ແກ້ໄຂຂໍ້ມູນເດືອນຊຳລະເງິນສຳເລັດແລ້ວ");
        return true
    }

    const updateWithImage = async (id, item) => {

        const rqCode = await upload(item.qrCode)
        if(!rqCode) return false

        const { data, error } = await nhost.graphql.request(
            Models.Payment.update,
            {
                payment_id: id,
                object: {
                    payment_month: item.month,
                    payment_year: item.year,
                    payment_account_bank_name: item.accountBankName,
                    payment_account_number: item.accountNumber,
                    payment_account_name: item.accountName,
                    payment_qr_code: rqCode
                }
            }
        )
        if(error) {
            message.error("ແກ້ໄຂຂໍ້ມູນເດືອນຊຳລະເງິນບໍ່ສຳເລັດ");
            console.log("error occurred in update usePayment =>", error);
            return false
        }
        message.success("ແກ້ໄຂຂໍ້ມູນເດືອນຊຳລະເງິນສຳເລັດແລ້ວ");
        return true

    }


    const searchPayment = async (keyword) => {

        if(isNaN(parseInt(keyword))) {
            keyword = 0;
        }

        const { data, error } = await nhost.graphql.request(
            Models.Payment.search,
            {
                number: keyword
            }
        )
        if(error) {
            message.error("ຄົ້ນຫາຂໍ້ມູນເດືອນຊຳລະບໍ່ສຳເລັດ");
            console.log("error occurred in search =>", error);
            return false
        }
        return data.payment
    }


    return { add, getOneByMonthAndYear, getAll, del, searchPayment, getOne, update, updateWithImage }
}