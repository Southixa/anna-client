<template>
    <div class="w-full mt-4">
        <div>
            <v-breadcrumbs :items="items">
                <template v-slot:prepend>
                </template>
                <template v-slot:item="{ item }">
                <nuxt-link v-if="!item.disabled" :to="item.href">
                    {{ item.title }}
                </nuxt-link>
                <span v-else class="text-gray-400">
                    {{ item.title }}
                </span>
                </template>
            </v-breadcrumbs>
        </div>
        <div class="w-full grid grid-cols-3">
            <div>
                <nuxt-link to="/announcement" class="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 w-fit">
                    <Icon name="mingcute:left-fill" class="text-gray-500" size="20" />
                    <p class="text-lg font-normal text-gray-600">ກັບຄືນ</p>
                </nuxt-link>
            </div>
            <div class="flex justify-center items-center">
                <p class="text-xl font-medium text-gray-600">ເພີ່ມຂໍ້ມູນແຈ້ງການ</p>
            </div>
            <div></div>
        </div>
        <div class="w-[500px] bg-white shadow-md border border-gray-50 mx-auto mt-4 rounded-md mb-20 p-4">
            
            <p>ຮູບແຈ້ງການ</p>
            
                    <n-upload
                        @change="handleUploadChange"
                        class="w-full flex justify-center items-center"
                        :max="1"
                        :default-upload="false"
                        :default-file-list="fileList"
                        list-type="image-card"
                    />
            <n-form
            ref="formRef"
            :label-width="80"
            :model="formValue"
            :rules="rules"
            :size="size"
            >
                <n-form-item label="ຫົວຂໍ້" path="title">
                    <n-input 
                    placeholder="ປ້ອນຫົວຂໍ້..." 
                    v-model:value="formValue.title"
                    @keydown.enter.prevent
                    :disabled="loading"
                    />
                </n-form-item>
                <n-form-item label="ລາຍລະອຽດ" path="detail">
                    <n-input 
                    type="textarea"
                    placeholder="ປ້ອນລາຍລະອຽດ..." 
                    v-model:value="formValue.detail"
                    @keydown.enter.prevent
                    :disabled="loading"
                    />
                </n-form-item>
            </n-form>

            <div class="flex justify-center gap-4 mt-14 mb-4">
                <NuxtLink to="/announcement">
                    <n-button :disabled="loading" tertiary color="#002749" size="medium" class="w-40 shadow font-normal">
                        ຍົກເລີກ
                    </n-button>
                </NuxtLink>
                <n-button @click="handleAdd" :loading="loading" type="primary" class="w-40 shadow font-normal text-white" size="medium">
                    ບັນທຶກ
                </n-button>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>

<script setup>

import { onMounted } from 'vue';
import Rules from '../../utils/rule/index.js';

const { getOneByGmail } = useCustomer();
const { add } = useAnnouncement();
import { useMessage } from "naive-ui";
import Models from "~/model";
const message = useMessage();

const showModal = ref(false);
const previewImageUrl = ref("");



const fileList = ref([
]);

const handleUploadChange = (options) => {
    const { file, event } = options;
    if(file.status === "removed") {
        fileList.value = [];
        return;
    }

    // filter file.type only png, jpg, jpeg
    if(file.type !== "image/png" && file.type !== "image/jpg" && file.type !== "image/jpeg") {
        message.error("ອັບໂຫຼດແຕ່ສະເພາະຮູບທຳນັ້ນ");
    }

    fileList.value = [file];
};


const items = [
    {
        title: 'ແຈ້ງການ',
        disabled: false,
        href: '/announcement',
    },
    {
        title: 'ເພີ່ມແຈ້ງການ',
        disabled: true,
        href: '/announcement/add',
    },
];

const formRef = ref(null);
const size = ref('medium');
const formValue = ref({
    thumbnail: "test",
    title: "southixa",
    detail: "philavong",
})

const loading = ref(false);


const rules = Rules.Announment;

async function handleAdd () {

    //1. check validate input
    const invalidField = await formRef.value?.validate().catch((error)=>{return error;})
    if(invalidField.length > 0) {
        message.error("ກະລຸນາຕື່ມຂໍ້ມູນໃຫ້ຖືກຕ້ອງ")
        console.log("invalidField", invalidField);
        return;
    }

    //2. check image
    if(fileList.value.length === 0) {
        message.error("ກະລຸນາໃສ່ຮູບພາບ")
        return;
    }

    loading.value = true;

    formValue.value.thumbnail = fileList.value[0].file;

    const resAddAnnouncement = await add(formValue.value);
    if(!resAddAnnouncement) {
        loading.value = false;
        return;
    }
    loading.value = false;
    await navigateTo('/announcement');
}


</script>