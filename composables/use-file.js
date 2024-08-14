import { useMessage } from "naive-ui";
import Models from "~/model";
export const useFile = () => {
    const { nhost } = useNhost();
    const message = useMessage();

    const upload = async (file) => {
        const { fileMetadata, error } = await nhost.storage.upload({
            file
        });
        if(error) {
            message.error("ອັບໂຫລດຟາຍບໍ່ສຳເລັດ");
            console.log("error occurred in upload =>", error);
            return false
        }
        return fileMetadata.id
    }

    const getUrl = (id, size = null) => {
        if(!id) return ""
        const imageUrl = nhost.storage.getPublicUrl({ fileId: id, height: size, width: size })
        if(!imageUrl) {
            message.error("ດຶງຂໍ້ມູນຟາຍບໍ່ສຳເລັດ");
            console.log("error occurred in getUrl =>", error);
            return ""
        }
        return imageUrl
    }

    const delFile = async (id) => {
        const { error } = await nhost.storage.delete({ fileId: id })
        if(error) {
            message.error("ລຶບຟາຍບໍ່ສຳເລັດ");
            console.log("error occurred in delFile =>", error);
            return false
        }
        return true
    }


    return { upload, getUrl, delFile }
}