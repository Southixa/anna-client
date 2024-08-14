import { useMessage } from "naive-ui";
import { useCookie, useRuntimeConfig } from "nuxt/app";
import Models from "~/model";
const cookie = useCookie('token')
export const useStaff = () => {
    const { nhost } = useNhost();
    const message = useMessage();
    const { upload, delFile } = useFile();
    const runtimeConfig = useRuntimeConfig();
    const subdomain = runtimeConfig.public.NHOST_SUBDOMAIN;
    const region = runtimeConfig.public.NHOST_REGION;

    const login = async (email, password) => {
        const res =  await nhost.auth.signIn({
            email: email,
            password: password
        })
        if(res.error) {
            message.error("ຂໍ້ມູນບໍ່ຖືກຕ້ອງ")
            return;
        }
        cookie.value = res.session.accessToken;
        message.success("ເຂົ້າສູ່ລະບົບສຳເລັດ")
        await navigateTo('/');
    }

    const update = async (id, item) => {

        const profile = await upload(item.profile)
        if(!profile) return false

        const { data, error } = await nhost.graphql.request(
            Models.Staff.update,
            {
                id: id,
                object: {
                    displayName: item.username,
                    phoneNumber: item.phone,
                    defaultRole: item.role,
                    avatarUrl: profile,
                    email: item.email,
                    currentChallenge: item.password
                }
            }
        )
        if(error) {
            message.error("ອັບເດດຂໍ້ມູນຜູ້ໃຊ້ລະບົບບໍ່ສຳເລັດ");
            console.log("error occurred in update =>", error);
            return false
        }
        return true
    }

    const add = async (item) => {
        try {
            const respon = await $fetch(`https://${subdomain}.auth.${region}.nhost.run/v1/signup/email-password`, {
                method: 'POST',
                body: {
                    email: item.email,
                    password: item.password
                }
            })
            console.log("respon of signUp =>", respon);
            console.log("respon?.user?.id =>", respon?.session?.user?.id);

            const resUpdate = await update(respon?.session?.user?.id, item);
            if(resUpdate) {
                message.success("ເພີ່ມຂໍ້ມູນຜູ້ໃຊ້ລະບົບສຳເລັດ");
                return true;
            }

            return respon?.session?.user?.id || "";
        } catch (error) {
            message.error("ເພີ່ມຂໍ້ມູນຜູ້ໃຊ້ລະບົບບໍ່ສຳເລັດ");
            console.log("error occurred in signUp =>", error);
            return false;
        }
    }

    const logout = async () => {
        await nhost.auth.signOut();
        cookie.value = "";
    }

    const getOneByGmail = async (gmail) => {
        const { data, error } = await nhost.graphql.request(
            Models.Staff.getOneByGmail,
            {
                email: gmail
            }
        )
        if(error) {
            message.error("ດຶງຂໍ້ມູນຜູ້ໃຊ້ລະບົບຈາກ gmail ບໍ່ສຳເລັດ");
            console.log("error occurred in getOneByGmail =>", error);
            return false
        }
        return data.users;
    }

    const getOneByPhoneNumber = async (phoneNumber) => {
        const { data, error } = await nhost.graphql.request(
            Models.Staff.getOneByPhoneNumber,
            {
                phoneNumber: phoneNumber
            }
        )
        if(error) {
            message.error("ດຶງຂໍ້ມູນຜູ້ໃຊ້ລະບົບຈາກ phoneNumber ບໍ່ສຳເລັດ");
            console.log("error occurred in getOneByPhoneNumber =>", error);
            return false
        }
        return data.users;
    }

    const getAll = async () => {
        const { data, error } = await nhost.graphql.request(
            Models.Staff.getAll,
        )
        if(error) {
            message.error("ດຶງຂໍ້ມູນຜູ້ໃຊ້ລະບົບບໍ່ສຳເລັດ");
            console.log("error occurred in getAll =>", error);
            return false
        }
        return data.users
    }

    const del = async (id, profile) => {

        const { data, error } = await nhost.graphql.request(
            Models.Staff.delete,
            {
                id: id
            }
        )
        if(error) {
            message.error("ລົບຂໍ້ມູນຜູ້ໃຊ້ລະບົບບໍ່ສຳເລັດ");
            console.log("error occurred in delete =>", error);
            return false
        }

        const delProfile = await delFile(profile)
        if(!delProfile) return false

        message.success("ລົບຂໍ້ມູນຜູ້ໃຊ້ລະບົບສຳເລັດແລ້ວ");
        return true
    }

    const searchStaff = async (keyword) => {

        const { data, error } = await nhost.graphql.request(
            Models.Staff.search,
            {
                strText: `%${keyword}%`
            }
        )
        if(error) {
            message.error("ຄົ້ນຫາຂໍ້ມູນຜູ້ໃຊ້ລະບົບບໍ່ສຳເລັດ");
            console.log("error occurred in search =>", error);
            return false
        }
        return data.users
    }

    return { login, logout, getOneByGmail, add, getAll, getOneByPhoneNumber, del, searchStaff }
}