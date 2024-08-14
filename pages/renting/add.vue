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
                <nuxt-link to="/renting" class="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 w-fit">
                    <Icon name="mingcute:left-fill" class="text-gray-500" size="20" />
                    <p class="text-lg font-normal text-gray-600">ກັບຄືນ</p>
                </nuxt-link>
            </div>
            <div class="flex justify-center items-center">
                <p class="text-xl font-medium text-gray-600">ເພີ່ມຂໍ້ມູນການເຊົ່າ</p>
            </div>
            <div></div>
        </div>
        <div class="w-[500px] bg-white shadow-md border border-gray-50 mx-auto mt-4 rounded-md mb-20 p-4">
           
            <n-form
            ref="formRef"
            :label-width="80"
            :model="formValue"
            :rules="rules"
            :size="size"
            >
                <n-form-item label="ຜູ້ເຊົ່າ" path="customerId">
                    <n-select
                        v-model:value="formValue.customerId" 
                        placeholder="--ເລືອກຜູ້ເຊົ່າ--"
                        :options="customersOptions"
                        :render-label="renderLabel"
                        :render-tag="renderSingleSelectTag"
                        filterable
                    />
                </n-form-item>
                <n-form-item label="ຫ້ອງ" path="roomId">
                    <n-select 
                    placeholder="--ເລືອກຫ້ອງ--"
                    v-model:value="formValue.roomId" 
                    :options="roomsOptions" 
                    :disabled="loading"
                    />
                </n-form-item>
                <n-form-item label="ຄ່າມັດຈຳ" path="deposit">
                    <n-input 
                    placeholder="ປ້ອນຄ່າມັດຈຳ..." 
                    v-model:value="formValue.deposit"
                    @keydown.enter.prevent
                    :disabled="loading"
                    />
                </n-form-item>
                <n-form-item label="ວັນທີເລີ່ມເຊົ່າ" path="lastname">
                    <n-date-picker 
                    v-model:value="formValue.startDate" 
                    type="date"
                    class="w-full"
                     />
                </n-form-item>
                <p>ຮູບສັນຍາເຊົ່າ</p>
            
            <n-upload
                @change="handleUploadChange"
                class="mb-24 w-full flex justify-center items-center"
                :max="1"
                :default-upload="false"
                :file-list="fileList"
                list-type="image-card"
            />
            </n-form>

            <div class="flex justify-center gap-4 mt-14 mb-4">
                <NuxtLink to="/renting">
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
import { NAvatar, NTag, NText } from "naive-ui";

const { getAll } = useCustomer();
const { getAll: getAllRoom } = useRoom();
const { getUrl } = useFile();
const { add } = useRenting()
import { useMessage } from "naive-ui";
import Models from "~/model";
const message = useMessage();

const showModal = ref(false);
const previewImageUrl = ref("");

const options = [
  {
    label: "07akioni",
    value: "07akioni"
  },
  {
    label: "08akioni",
    value: "08akioni"
  },
  {
    label: "09akioni",
    value: "09akioni"
  }
];

const renderSingleSelectTag = ({ option }) => {
  return h(
    "div",
    {
      style: {
        display: "flex",
        alignItems: "center"
      }
    },
    [
      h(NAvatar, {
        src: getUrl(option.customer_profile, 50),
        round: true,
        size: 24,
        style: {
          marginRight: "12px"
        }
      }),
      option.customer_firstname + " " + option.customer_lastname
    ]
  );
};

const renderLabel = (option) => {
  return h(
    "div",
    {
      style: {
        display: "flex",
        alignItems: "center"
      }
    },
    [
      h(NAvatar, {
        src: getUrl(option.customer_profile, 50),
        round: true,
        size: "tiny",
      }),
      h(
        "div",
        {
          style: {
            marginLeft: "12px",
            padding: "4px 0"
          }
        },
        [
          h("div", null, [option.customer_firstname + " " + option.customer_lastname + " (" + option.customer_phone  + ")"]),
        ]
      )
    ]
  );
};



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
        title: 'ການເຊົ່າ',
        disabled: false,
        href: '/renting',
    },
    {
        title: 'ເພີ່ມການເຊົ່າ',
        disabled: true,
        href: '/renting/add',
    },
];

const formRef = ref(null);
const size = ref('medium');

// get current timestamp
const timestamp = new Date().getTime();

const formValue = ref({
    customerId: null,
    roomId: null,
    deposit: "",
    startDate: timestamp,
})


const loading = ref(false);


const rules = Rules.Renting;

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

    console.log(formValue.value);
    console.log(fileList.value[0].file);

    loading.value = true;

    formValue.value.leaseAgreement = fileList.value[0].file;
    // convert timestamp from formValue.value.startDate to 2024-08-05 and store in formValue.value.startDate
    const convertedStartDate = new Date(formValue.value.startDate).toISOString().split('T')[0];

    let data = {
        ...formValue.value,
        startDate: convertedStartDate
    }

    console.log(data);
    
    const resAddRenting = await add(data);
    if(!resAddRenting) {
        loading.value = false;
        return;
    }
    loading.value = false;
    await navigateTo('/renting');
}


const customersOptions = ref([]);
const roomsOptions = ref([]);

const getCustomers = async () => {
    const resGetAll = await getAll();
    if(!resGetAll){
        return;
    }
    const addIndex = resGetAll.map((item, index) => {
        return { ...item, value: item.customer_id, label: item.customer_firstname + " " + item.customer_lastname + " (" + item.customer_phone  + ")" }
    })
    console.log(addIndex);
    customersOptions.value = addIndex;
}

const getRooms = async () => {
    const resGetAll = await getAllRoom();
    if(!resGetAll){
        return;
    }
    const addIndex = resGetAll.map((item, index) => {
        return { value: item.room_id, label: item.room_number }
    })
    console.log(addIndex);
    roomsOptions.value = addIndex;
}


onMounted( async () => {
    loading.value = true;
    await Promise.all([
        getCustomers(), 
        getRooms()
    ]);
    loading.value = false;
})


</script>