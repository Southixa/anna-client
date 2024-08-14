import { useMessage } from "naive-ui";
import Models from "~/model";
export const useAnnouncement = () => {
    const { nhost } = useNhost();
    const { upload, delFile } = useFile();
    const message = useMessage();

    const add = async (item) => {

        const thumbnail = await upload(item.thumbnail)
        if(!thumbnail) return false

        const { data, error } = await nhost.graphql.request(
            Models.Announcement.insert,
            {
                object: {
                    announcement_title: item.title,
                    announcement_detail: item.detail,
                    announcement_thumbnail: thumbnail
                }
            }
        )
        if(error) {
            message.error("ເພີ່ມຂໍ້ມູນແຈ້ງການບໍ່ສຳເລັດ");
            console.log("error occurred in insert announcement =>", error);
            return false
        }
        message.success("ເພີ່ມຂໍ້ມູນແຈ້ງການສຳເລັດແລ້ວ");
        return true;

    }

    const getAll = async () => {
        const { data, error } = await nhost.graphql.request(
            Models.Announcement.getAll,
        )
        if(error) {
            message.error("ດຶງຂໍ້ມູນແຈ້ງການບໍ່ສຳເລັດ");
            console.log("error occurred in getAll announcement =>", error);
            return false
        }
        return data.announcement;
    }

    const del = async (id, thumbnail) => {

        const { data, error } = await nhost.graphql.request(
            Models.Announcement.delete,
            {
                announcement_id: id
            }
        )
        if(error) {
            message.error("ລົບຂໍ້ມູນແຈ້ງການບໍ່ສຳເລັດ");
            console.log("error occurred in delete announcement =>", error);
            return false
        }

        const delThumbnail = await delFile(thumbnail)
        if(!delThumbnail) return false

        message.success("ລົບຂໍ້ມູນແຈ້ງການສຳເລັດແລ້ວ");
        return true

    }

    const searchAnnouncement = async (keyword) => {

        const { data, error } = await nhost.graphql.request(
            Models.Announcement.search,
            {
                strText: `%${keyword}%`
            }
        )
        if(error) {
            message.error("ຄົ້ນຫາຂໍ້ມູນແຈ້ງການບໍ່ສຳເລັດ");
            console.log("error occurred in search announcement =>", error);
            return false
        }
        return data.announcement
    }

    const getOne = async (id) => {

        const { data, error } = await nhost.graphql.request(
            Models.Announcement.getOne,
            {
                announcement_id: id
            }
        )
        if(error) {
            message.error("ດຶງຂໍ້ມູນແຈ້ງການບໍ່ສຳເລັດ");
            console.log("error occurred in getOne announcement =>", error);
            return false
        }
        return data.announcement_by_pk
    }

    const update = async (id, item) => {

        const { data, error } = await nhost.graphql.request(
            Models.Announcement.update,
            {
                announcement_id: id,
                object: {
                    announcement_title: item.title,
                    announcement_detail: item.detail,
                    announcement_thumbnail: item.thumbnail
                }
            }
        )
        if(error) {
            message.error("ແກ້ໄຂຂໍ້ມູນແຈ້ງການບໍ່ສຳເລັດ");
            console.log("error occurred in update announcement =>", error);
            return false
        }
        message.success("ແກ້ໄຂຂໍ້ມູນແຈ້ງການສຳເລັດແລ້ວ");
        return true
    }

    const updateWithImage = async (id, item) => {
        const thumbnail = await upload(item.thumbnail)
        if(!thumbnail) return false

        const { data, error } = await nhost.graphql.request(
            Models.Announcement.update,
            {
                announcement_id: id,
                object: {
                    announcement_title: item.title,
                    announcement_detail: item.detail,
                    announcement_thumbnail: thumbnail
                }
            }
        )
        if(error) {
            message.error("ແກ້ໄຂຂໍ້ມູນແຈ້ງການບໍ່ສຳເລັດ");
            console.log("error occurred in update announcement =>", error);
            return false
        }
        message.success("ແກ້ໄຂຂໍ້ມູນແຈ້ງການສຳເລັດແລ້ວ");
        return true
    }

    return { add, getAll, del, searchAnnouncement, getOne, update, updateWithImage }

}