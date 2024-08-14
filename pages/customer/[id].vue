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
                <nuxt-link to="/customer" class="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 w-fit">
                    <Icon name="mingcute:left-fill" class="text-gray-500" size="20" />
                    <p class="text-lg font-normal text-gray-600">ກັບຄືນ</p>
                </nuxt-link>
            </div>
            <div class="flex justify-center items-center">
                <p class="text-xl font-medium text-gray-600">ແກ້ໄຂຂໍ້ມູນຜູ້ເຊົ່າ</p>
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
                        :file-list="fileList"
                        list-type="image-card"
                    />
            <n-form
            ref="formRef"
            :label-width="80"
            :model="formValue"
            :rules="rules"
            :size="size"
            >
                <n-form-item label="ຊື່" path="firstname">
                    <n-input 
                    placeholder="ປ້ອນຊື່..." 
                    v-model:value="formValue.firstname"
                    @keydown.enter.prevent
                    :disabled="loading"
                    />
                </n-form-item>
                <n-form-item label="ນາມສະກຸນ" path="lastname">
                    <n-input 
                    placeholder="ປ້ອນນາມສະກຸນ..." 
                    v-model:value="formValue.lastname"
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
                <n-form-item label="ເພດ" path="gender">
                    <n-select 
                    placeholder="--ເລືອກ--"
                    v-model:value="formValue.gender" 
                    :options="genderOptions" 
                    :disabled="loading"
                    />
                </n-form-item>
                <n-form-item label="ເລກບັດປະຈຳໂຕ" path="identificationId">
                    <n-input 
                    placeholder="ປ້ອນເລກບັດປະຈຳໂຕ..." 
                    v-model:value="formValue.identificationId"
                    @keydown.enter.prevent
                    :disabled="loading"
                    />
                </n-form-item>
                <n-form-item label="ແຂວງ" path="province">
                    <n-input 
                    placeholder="ປ້ອນແຂວງ..." 
                    v-model:value="formValue.province"
                    @keydown.enter.prevent
                    :disabled="loading"
                    />
                </n-form-item>
                <n-form-item label="ເມືອງ" path="district">
                    <n-input 
                    placeholder="ປ້ອນເມືອງ..." 
                    v-model:value="formValue.district"
                    @keydown.enter.prevent
                    :disabled="loading"
                    />
                </n-form-item>
                <n-form-item label="ບ້ານ" path="village">
                    <n-input 
                    placeholder="ປ້ອນເມືອງ..." 
                    v-model:value="formValue.village"
                    @keydown.enter.prevent
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
                <NuxtLink to="/customer">
                    <n-button :disabled="loading" tertiary color="#002749" size="medium" class="w-40 shadow font-normal">
                        ຍົກເລີກ
                    </n-button>
                </NuxtLink>
                <n-button @click="handleEdit" :loading="loading" type="primary" class="w-40 shadow font-normal text-white" size="medium">
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

const { add, getOneByGmail, getOne, update, updateWithImage } = useCustomer();
const { getUrl } = useFile();

import { useMessage } from "naive-ui";
import Models from "~/model";
const message = useMessage();

const showModal = ref(false);
const previewImageUrl = ref("");

const { id } = useRoute().params;



const fileList = ref([
]);

const handleUploadChange = (options) => {
    const { file, event } = options;
    if(file.status === "removed") {
        isImageChanged.value = true;
        fileList.value = [];
        return;
    }

    // filter file.type only png, jpg, jpeg
    if(file.type !== "image/png" && file.type !== "image/jpg" && file.type !== "image/jpeg") {
        message.error("ອັບໂຫຼດແຕ່ສະເພາະຮູບທຳນັ້ນ");
    }

    isImageChanged.value = true;
    fileList.value = [file];
};


const items = [
    {
        title: 'ຜູ້ເຊົ່າ',
        disabled: false,
        href: '/customer',
    },
    {
        title: 'ແກ້ໄຂຜູ້ເຊົ່າ',
        disabled: true,
        href: '/customer/edit',
    },
];

const formRef = ref(null);
const size = ref('medium');
const formValue = ref({
    profile: "",
    firstname: "",
    lastname: "",
    phone: "",
    gender: "",
    identificationId: "",
    province: "",
    district: "",
    village: "",
    email: "",
    password: "",
})

const genderOptions =  ref([
    {
        label: 'ຊາຍ',
        value: 'ຊາຍ',
    },
    {
        label: 'ຍິງ',
        value: 'ຍິງ'
    },
]);

const loading = ref(false);
const isImageChanged = ref(false);


const rules = Rules.Customer;

async function handleEdit () {

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
    if(resGetOneByGmail.length > 0 && resGetOneByGmail[0].customer_id !== id) {
        message.error("ອີເມວນີ້ຖືກໃຊ້ແລ້ວ")
        loading.value = false;
        return;
    }


    if(isImageChanged.value) {
        formValue.value.profile = fileList.value[0].file;
        const resUpdate = await updateWithImage(id, formValue.value);
        if(!resUpdate) {
            loading.value = false;
            return;
        }
        loading.value = false;
        await navigateTo('/customer');
    } else {
        const resUpdate = await update(id, formValue.value);
        if(!resUpdate) {
            loading.value = false;
            return;
        }
        loading.value = false;
        await navigateTo('/customer');
    }

    return;
}


const getCurrentCustomer = async () => {
    const resGetOne = await getOne(id);
    if(!resGetOne) {
        return;
    }
    formValue.value.profile = resGetOne.customer_profile;
    formValue.value.firstname = resGetOne.customer_firstname;
    formValue.value.lastname = resGetOne.customer_lastname;
    formValue.value.phone = resGetOne.customer_phone;
    formValue.value.gender = resGetOne.customer_gender;
    formValue.value.identificationId = resGetOne.customer_identification_id;
    formValue.value.province = resGetOne.customer_province;
    formValue.value.district = resGetOne.customer_district;
    formValue.value.village = resGetOne.customer_village;
    formValue.value.email = resGetOne.customer_gmail;
    formValue.value.password = resGetOne.customer_password;

    const imageUrl = getUrl(resGetOne.customer_profile, 200);

    if(!imageUrl) {
        return;
    }


    fileList.value = [{
        id: '1',
        name: 'profile_image.png',
        status: 'pending',
        url: imageUrl
    }]

}

onMounted(async () => {
    loading.value = true;
    await getCurrentCustomer();
    loading.value = false;
})


</script>