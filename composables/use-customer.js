import { useMessage } from "naive-ui";
import Models from "~/model";
export const useCustomer = () => {
    const { nhost } = useNhost();
    const { upload, delFile } = useFile();
    const message = useMessage();

    const add = async (item) => {

        const profile = await upload(item.profile)
        if(!profile) return false

        const { data, error } = await nhost.graphql.request(
            Models.Customer.insert,
            {
                object: {
                    customer_profile: profile,
                    customer_firstname: item.firstname,
                    customer_lastname: item.lastname,
                    customer_phone: item.phone,
                    customer_gender: item.gender,
                    customer_identification_id: item.identificationId,
                    customer_province: item.province,
                    customer_district: item.district,
                    customer_village: item.village,
                    customer_gmail: item.email,
                    customer_password: item.password
                }
            }
        )
        if(error) {
            message.error("ເພີ່ມຂໍ້ມູນຜູ້ເຊົ່າບໍ່ສຳເລັດ");
            console.log("error occurred in insert =>", error);
            return false
        }
        message.success("ເພີ່ມຂໍ້ມູນຜູ້ເຊົ່າສຳເລັດ");
        return true;
    }

    const getOneByGmail = async (gmail) => {
        const { data, error } = await nhost.graphql.request(
            Models.Customer.getOneByGmail,
            {
                gmail
            }
        )
        if(error) {
            message.error("ດຶງຂໍ້ມູນຜູ້ໃຊ້ຈາກ gmail ບໍ່ສຳເລັດ");
            console.log("error occurred in getOneByGmail =>", error);
            return false
        }
        return data.customer;
    }

    const getOneByGmailAndPassword = async (gmail, password) => {
        const { data, error } = await nhost.graphql.request(
            Models.Customer.getOneByGmailAndPassword,
            {
                email: gmail,
                password: password
            }
        )
        if(error) {
            console.log("error occurred in getOneByGmailAndPassword =>", error);
            return false
        }
        if(data.customer.length === 0) {
            console.log("no data in getOneByGmailAndPassword =>", data.customer);
        }
        return data.customer[0];
    }
    

    const getAll = async () => {
        const { data, error } = await nhost.graphql.request(
            Models.Customer.getAll,
        )
        if(error) {
            message.error("ດຶງຂໍ້ມູນຜູ້ໃຊ້ບໍສຳເລັດ");
            console.log("error occurred in getAll =>", error);
            return false
        }
        return data.customer
    }

    const del = async (id, profile) => {

        const { data, error } = await nhost.graphql.request(
            Models.Customer.delete,
            {
                customer_id: id
            }
        )
        if(error) {
            message.error("ລົບຂໍ້ມູນຜູ້ເຊົ່າບໍ່ສຳເລັດ");
            console.log("error occurred in delete =>", error);
            return false
        }

        const delProfile = await delFile(profile)
        if(!delProfile) return false

        message.success("ລົບຂໍ້ມູນຜູ້ເຊົ່າສຳເລັດແລ້ວ");
        return true
    }

    const getOne = async (id) => {
        const { data, error } = await nhost.graphql.request(
            Models.Customer.getOne,
            {
                customer_id: id
            }
        )
        if(error) {
            message.error("ດຶງຂໍ້ມູນຜູ້ເຊົ່າບໍ່ສຳເລັດ");
            console.log("error occurred in getOne =>", error);
            return false
        }
        return data.customer_by_pk
    }

    const update = async (id, item) => {

        const { data, error } = await nhost.graphql.request(
            Models.Customer.update,
            {
                customer_id: id,
                object: {
                    customer_profile: item.profile,
                    customer_firstname: item.firstname,
                    customer_lastname: item.lastname,
                    customer_phone: item.phone,
                    customer_gender: item.gender,
                    customer_identification_id: item.identificationId,
                    customer_province: item.province,
                    customer_district: item.district,
                    customer_village: item.village,
                    customer_gmail: item.email,
                    customer_password: item.password
                }
            }
        )
        if(error) {
            message.error("ແກ້ໄຂຂໍ້ມູນຜູ້ເຊົ່າບໍ່ສຳເລັດ");
            console.log("error occurred in update =>", error);
            return false
        }
        message.success("ແກ້ໄຂຂໍ້ມູນຜູ້ເຊົ່າສຳເລັດແລ້ວ");
        return true
    }

    const updateWithImage = async (id, item) => {
        const profile = await upload(item.profile)
        if(!profile) return false

        const { data, error } = await nhost.graphql.request(
            Models.Customer.update,
            {
                customer_id: id,
                object: {
                    customer_profile: profile,
                    customer_firstname: item.firstname,
                    customer_lastname: item.lastname,
                    customer_phone: item.phone,
                    customer_gender: item.gender,
                    customer_identification_id: item.identificationId,
                    customer_province: item.province,
                    customer_district: item.district,
                    customer_village: item.village,
                    customer_gmail: item.email,
                    customer_password: item.password
                }
            }
        )
        if(error) {
            message.error("ແກ້ໄຂຂໍ້ມູນຜູ້ເຊົ່າບໍ່ສຳເລັດ");
            console.log("error occurred in update =>", error);
            return false
        }
        message.success("ແກ້ໄຂຂໍ້ມູນຜູ້ເຊົ່າສຳເລັດແລ້ວ");
        return true
    }

    const searchCustomer = async (keyword) => {

        const { data, error } = await nhost.graphql.request(
            Models.Customer.search,
            {
                strText: `%${keyword}%`
            }
        )
        if(error) {
            message.error("ຄົ້ນຫາຂໍ້ມູນຜູ້ເຊົ່າບໍ່ສຳເລັດ");
            console.log("error occurred in search =>", error);
            return false
        }
        return data.customer
    }


    return { add, getOneByGmail, getAll, del, getOne, update, updateWithImage, searchCustomer, getOneByGmailAndPassword }
}