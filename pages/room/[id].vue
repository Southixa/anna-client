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
                <nuxt-link to="/room" class="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 w-fit">
                    <Icon name="mingcute:left-fill" class="text-gray-500" size="20" />
                    <p class="text-lg font-normal text-gray-600">ກັບຄືນ</p>
                </nuxt-link>
            </div>
            <div class="flex justify-center items-center">
                <p class="text-xl font-medium text-gray-600">ເພີ່ມຂໍ້ມູນຫ້ອງ</p>
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
                <n-form-item label="ເບີຫ້ອງ" path="number">
                    <n-input 
                    placeholder="ປ້ອນເບີຫ້ອງ..." 
                    v-model:value="formValue.number" 
                    @keydown.enter.prevent
                    :disabled="loading"
                    />
                </n-form-item>
                <n-form-item label="ຊື່ອາຄານ" path="buildingName">
                    <n-input 
                    placeholder="ປ້ອນຊື່ອາຄານ..." 
                    v-model:value="formValue.buildingName" 
                    @keydown.enter.prevent
                    :disabled="loading"
                    />
                </n-form-item>
                <n-form-item label="ລາຄາຕໍ່ເດືອນ" path="price">
                    <n-input
                    placeholder="ປ້ອນລາຄາຕໍ່ເດືອນ..." 
                    v-model:value="formValue.price" 
                    @keydown.enter.prevent
                    :disabled="loading"
                    />
                </n-form-item>
                <n-form-item label="ຈຳນວນຄົນຢູ່ໄດ້ສູງສຸດ" path="quantity">
                    <n-input 
                    placeholder="ປ້ອນຈຳນວນຄົນຢູ່ໄດ້ສູງສຸດ..." 
                    v-model:value="formValue.quantity" 
                    @keydown.enter.prevent
                    :disabled="loading"
                    />
                </n-form-item>
            </n-form>

            <div class="flex justify-center gap-4 mt-14 mb-4">
                <NuxtLink to="/room">
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

<script setup>

import { onMounted } from 'vue';
import Rules from '../../utils/rule/index.js';

const { id } = useRoute().params;

const { add, getOneByRoomNumber, getAll, getOne, update } = useRoom();
import { useMessage } from "naive-ui";
import Models from "~/model";
const message = useMessage();

const items = [
    {
        title: 'ຫ້ອງ',
        disabled: false,
        href: '/room',
    },
    {
        title: 'ແກ້ໄຂຫ້ອງ',
        disabled: true,
        href: '/room/add',
    },
];

const formRef = ref(null);
const size = ref('medium');
const formValue = ref({
    number: "",
    buildingName: "",
    price: "",
    quantity: "",
})

let initRoomNumber = null;

const loading = ref(false);

const rules = Rules.Room;

async function checkRoomExist () {
    if(initRoomNumber === formValue.value.number) {
        return false;
    }

    const resGetOneByRoomNumber = await getOneByRoomNumber(formValue.value.number);
    if(!resGetOneByRoomNumber) {
        loading.value = false;
        return false;
    }
    if(resGetOneByRoomNumber.length > 0) {
        message.error("ມີເບີຫ້ອງນີ້ແລ້ວ")
        loading.value = false;
        return true;
    }
    return false;
}

async function handleEdit () {

    //1. check validate input
    const invalidField = await formRef.value?.validate().catch((error)=>{return error;})
    if(invalidField.length > 0) {
        message.error("ກະລຸນາຕື່ມຂໍ້ມູນໃຫ້ຖືກຕ້ອງ")
        console.log("invalidField", invalidField);
        return;
    }


    loading.value = true;
    if(await checkRoomExist()) {
        loading.value = false;
        return;
    }
    const resEditRoom = await update(id, formValue.value);
    console.log(resEditRoom);
    loading.value = false;
    await navigateTo('/room');
}

const getCurrentRoom = async () => {
    const resGetOne = await getOne(id);
    if(!resGetOne) {
        return;
    }
    console.log(resGetOne);
    formValue.value = {
        number: resGetOne.room_number,
        buildingName: resGetOne.room_building_name,
        price: resGetOne.room_price,
        quantity: resGetOne.room_quantity
    }
    initRoomNumber = formValue.value.number;
}

onMounted( async () => {
    loading.value = true;
    await getCurrentRoom();
    loading.value = false;
})

</script>