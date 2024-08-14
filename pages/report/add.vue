<template>
    <nuxt-link :to="`/report`" class="w-fit">
        <button class="hover:bg-gray-100 px-4 py-2 rounded-md flex justify-center items-center gap-2 text-gray-600 transition-all duration-200">
            <Icon name="ph:arrow-left" class="text-gray-500" size="14"/>
            <p class="text-sm">ກັບຄືນ</p>
        </button>
    </nuxt-link>
    <p class="text-gray-800 font-semibold mt-4">#ສົ່ງລາຍງານບັນຫາ</p>
    <div class="w-full mt-4 flex justify-center">
        <div class="w-[400px] min-h-[200px]">
            <div class="w-full mt-2 border border-gray-100 rounded-sm px-[12px] py-[8px]">
                <div>
                    <n-input
                        :disabled="loading"
                        v-model:value="formValue.title"
                        type="text"
                        placeholder="ຫົວຂໍ"
                        class=" rounded-md mt-4"
                        size="medium"
                    />
                    <n-input
                        :disabled="loading"
                        v-model:value="formValue.detail"
                        type="textarea"
                        placeholder="ລາຍລະອຽດ"
                        class=" rounded-md mt-4"
                        size="medium"
                    />
                    <div>
                    <p class="mb-2 text-gray-800 mt-4">ອັບໂຫຼດຮູບບັນຫາ:</p>
                    <n-upload
                            accept="image/*"
                            @change="handleUploadChange"
                            :show-remove-button="true"
                            :max="1"
                            :multiple="false"
                            :default-upload="false"
                            :default-file-list="fileListRef"
                            list-type="image"
                            :create-thumbnail-url="createThumbnailUrl"
                        >
                            <n-button>ອັບໂຫຼດຮູບ</n-button>
                        </n-upload>
                </div>
                <div>
                    <n-button
                    type="primary"
                    :loading="loading"
                    @click="showModal = true"
                    class="rounded-md mt-8 w-full text-white"
                    size="medium"
                    >
                    ສົ່ງ
                    </n-button>
                </div>
                <n-modal
                    :loading="loading"
                    v-model:show="showModal"
                    :mask-closable="true"
                    preset="dialog"
                    title="ຢືນຢັນ"
                    content="ຕ້ອງການສົ່ງລາຍງານແທ້ບໍ?"
                    positive-text="ຕົກລົງ"
                    negative-text="ຍົກເລີກ"
                    @positive-click="onPositiveClick"
                    @negative-click="onNegativeClick"
                />
                </div>
                
            </div>
        </div>
    </div>
</template>

<script setup>

import { formatCurrency, timeFormatter, setMaxText, getUserFromLocalStorage } from '~~/utils/helpers';
import { useLoadingBar } from "naive-ui";
import { useMessage } from "naive-ui";

const { add } = useReportIssue();
const message = useMessage();

const loading = ref(false);

const loadingBar = useLoadingBar();


const formValue = ref({
    title: "",
    detail: "",
});


const showModal = ref(false);


const onPositiveClick = async () => {
    await handleAdd();
    showModal.value = false;
}
const onNegativeClick = () => {
    showModal.value = false;
}



const fileListRef = ref([
]);
const fileList = ref([
])
const createThumbnailUrl = (file) => {
    console.log(file);
    if (!file) return void 0;
    if(file.type !== "image/png" && file.type !== "image/jpg" && file.type !== "image/jpeg") {
        return;
    }
    return URL.createObjectURL(file);
}

const handleUploadChange = (options) => {
    const { file, event } = options;
    if(file.status === "removed") {
        fileList.value = [];
        fileListRef.value = [];
        return;
    }

    // filter file.type only png, jpg, jpeg
    if(file.type !== "image/png" && file.type !== "image/jpg" && file.type !== "image/jpeg") {
        message.error("ອັບໂຫຼດແຕ່ສະເພາະຮູບທຳນັ້ນ");
        return;
    }

    fileList.value = [file];
};


const handleAdd = async () => {

    if(formValue.value.title === "" || formValue.value.detail === "") {
        message.error("ກະລຸນາປ້ອນຂໍ້ມູນໃຫ້ຄົບຖ້ວນ");
        return;
    }

    if(fileList.value.length === 0) {
        message.error("ກະລຸນາອັບໂຫຼດຮູບ");
        return;
    }

    const user = getUserFromLocalStorage();


    const data = {
        title: formValue.value.title,
        detail: formValue.value.detail,
        customer_id: user.customer_id,
        image: fileList.value[0].file,
    }

    loading.value = true;

    const resAddReport = await add(data);
    if (!resAddReport) {
        loading.value = false;
        return;
    }

    loading.value = false;

    navigateTo("/report");

}


</script>
