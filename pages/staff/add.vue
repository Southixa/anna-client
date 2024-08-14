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
                <nuxt-link to="/staff" class="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 w-fit">
                    <Icon name="mingcute:left-fill" class="text-gray-500" size="20" />
                    <p class="text-lg font-normal text-gray-600">ກັບຄືນ</p>
                </nuxt-link>
            </div>
            <div class="flex justify-center items-center">
                <p class="text-xl font-medium text-gray-600">ເພີ່ມຂໍ້ມູນຜູ້ໃຊ້ງານລະບົບ</p>
            </div>
            <div></div>
        </div>
        <div class="w-[500px] bg-white shadow-md border border-gray-50 mx-auto mt-4 rounded-md mb-20 p-4">
            
            <p>ຮູບ</p>
            
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
                <n-form-item label="ຊື່" path="username">
                    <n-input 
                    placeholder="ປ້ອນຊື່..." 
                    v-model:value="formValue.username"
                    @keydown.enter.prevent
                    :disabled="loading"
                    />
                </n-form-item>
                <n-form-item label="ເບີໂທ" path="phone">
                    <n-input 
                    placeholder="ປ້ອນເບີໂທ..." 
                    v-model:value="formValue.phone"
                    @keydown.enter.prevent
                    :disabled="loading"
                    />
                </n-form-item>
                <n-form-item label="ສິດ" path="role">
                    <n-select 
                    placeholder="--ເລືອກ--"
                    v-model:value="formValue.role" 
                    :options="roleOptions" 
                    :disabled="loading"
                    />
                </n-form-item>
                <n-form-item label="ອີເມວ" path="email">
                    <n-input 
                    placeholder="ປ້ອນອີເມວ..." 
                    v-model:value="formValue.email"
                    @keydown.enter.prevent
                    :disabled="loading"
                    />
                </n-form-item>
                <n-form-item label="ລະຫັດຜ່ານ" path="password">
                    <n-input 
                    placeholder="ປ້ອນລະຫັດຜ່ານ..." 
                    v-model:value="formValue.password"
                    @keydown.enter.prevent
                    :disabled="loading"
                    />
                </n-form-item>
            </n-form>

            <div class="flex justify-center gap-4 mt-14 mb-4">
                <NuxtLink to="/staff">
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

const { getOneByGmail, getOneByPhoneNumber, add } = useStaff();
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
        title: 'ຜູ້ໃຊ້ລະບົບ',
        disabled: false,
        href: '/staff',
    },
    {
        title: 'ເພີ່ມຜູ້ໃຊ້ລະບົບ',
        disabled: true,
        href: '/staff/add',
    },
];

const formRef = ref(null);
const size = ref('medium');
const formValue = ref({
    profile: "test",
    username: "southixa",
    phone: "557484938",
    role: "user",
    email: "southixa.pele10@gmail.com",
    password: "12345678",
})

const roleOptions =  ref([
    {
        label: 'admin',
        value: 'user'
    },
]);

const loading = ref(false);


const rules = Rules.Staff;

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

    const resGetOneByGmail = await getOneByGmail(formValue.value.email);
    console.log("resGetOneByGmail", resGetOneByGmail);
    if(!resGetOneByGmail) {
        loading.value = false;
        return;
    }
    if(resGetOneByGmail.length > 0) {
        message.error("ອີເມວນີ້ຖືກໃຊ້ແລ້ວ")
        loading.value = false;
        return;
    }

    // check phoneNumber
    const resGetOneByPhoneNumber = await getOneByPhoneNumber(formValue.value.phone);
    console.log("resGetOneByPhoneNumber", resGetOneByPhoneNumber);
    if(!resGetOneByPhoneNumber) {
        loading.value = false;
        return;
    }
    if(resGetOneByPhoneNumber.length > 0) {
        message.error("ເບີໂທນີ້ຖືກໃຊ້ແລ້ວ")
        loading.value = false;
        return;
    }

    formValue.value.profile = fileList.value[0].file;

    const resAddStaff = await add(formValue.value);
    if(!resAddStaff) {
        loading.value = false;
        return;
    }
    loading.value = false;
    await navigateTo('/staff');
}


</script>