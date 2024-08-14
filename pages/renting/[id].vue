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
                <p class="text-xl font-medium text-gray-600">ລາຍລະອຽດການເຊົ່າ</p>
            </div>
            <div></div>
        </div>
        <div class="w-[700px] bg-white shadow-md border border-gray-50 mx-auto mt-4 rounded-md mb-4 p-4">
            <div class="w-full flex justify-between items-center">
                <p class="font-bold text-lg">ຫ້ອງ {{ rentingData?.room?.room_number }} ຕຶກ {{ rentingData?.room?.room_building_name }}</p>
                <n-button v-if="rentingData?.renting_status === 'booking'" @click="showModal = true" type="error" class="text-white" icon-placement="right">
                    <template #icon>
                        <n-icon>
                            <exit-icon />
                        </n-icon>
                    </template>
                    ຍ້າຍອອກ
                </n-button>
                <n-modal
                    v-model:show="showModal"
                    :mask-closable="false"
                    preset="dialog"
                    title="ຢືນຢັນການຍ້າຍອອກ"
                    content="ຖ້າຢືນຢັນແລ້ວຈະບໍ່ສາມາດແກ້ໄຂໄດ້"
                    positive-text="ຢືນຢັນ"
                    negative-text="ຍົກເລີກ"
                    @positive-click="onPositiveClick"
                    @negative-click="onNegativeClick"
                />
            </div>
            <div class="w-[400px]">
                <div v-if="loading" class="mt-4">
                    <n-skeleton text style="width: 50%" />
                </div>
                <div v-else class="w-full flex mt-4">
                    <div class="min-w-[200px]">
                        <p class="text-gray-500">ລາຄາເຊົ່າຕໍ່ເດືອນ:</p>
                    </div>
                    <p>{{ formatCurrency(rentingData?.room?.room_price) }} ກີບ</p>
                </div>
            </div>
        </div>
        <div class="w-[700px] bg-white shadow-md border border-gray-50 mx-auto mt-4 rounded-md mb-4 p-4">
            <div class="w-full grid grid-cols-12 gap-6">
                <div class="col-span-4">
                    <p class="font-medium">ຮູບສັນຍາເຊົ່າ</p>
                    <div class="w-48 h-48 bg-gray-100 rounded-md overflow-hidden mt-4">
                        <n-image
                            v-if="rentingData?.renting_lease_agreement"
                            :src="getUrl(rentingData?.renting_lease_agreement, 400)"
                            class="w-full h-full"
                            height="100%"
                            width="100%"
                            object-fit="cover"
                        />
                    </div>
                </div>
                <div class="col-span-8">
                    <p class="font-medium">ລາຍລະອຽດການຈອງ</p>
                    <div v-if="loading" class="mt-4">
                        <n-skeleton text :repeat="2" /> <n-skeleton text style="width: 50%" />
                    </div>
                    <div v-else>
                        <div class="w-full flex mt-4">
                            <div class="min-w-[200px]">
                                <p class="text-gray-500">ລະຫັດການເຊົ່າ:</p>
                            </div>
                            <p>{{ rentingData?.renting_id }}</p>
                        </div>
                        <div class="w-full flex items-center mt-2">
                            <div class="min-w-[200px]">
                                <p class="text-gray-500">ເລີ່ມເຊົ່າວັນທີ:</p>
                            </div>
                            <p>{{ timeFormatter(rentingData?.renting_start_date) }}</p>
                        </div>
                        <div class="w-full flex items-center mt-2">
                            <div class="min-w-[200px]">
                                <p class="text-gray-500">ອອກວັນທີ:</p>
                            </div>
                            <p>{{ timeFormatter(rentingData?.renting_end_date) }}</p>
                        </div>
                        <div class="w-full flex items-center mt-2">
                            <div class="min-w-[200px]">
                                <p class="text-gray-500">ຄ່າຈອງ:</p>
                            </div>
                            <p>{{ formatCurrency(rentingData?.renting_deposit) }} ກີບ</p>
                        </div>
                        <div class="w-full flex items-center mt-2">
                            <div class="min-w-[200px]">
                                <p class="text-gray-500">ສະຖານະ:</p>
                            </div>
                            <div v-if="rentingData?.renting_status">
                                <P v-if="rentingData?.renting_status === 'booking'" class="text-white bg-yellow-300 rounded-full px-[20px] py-[2px] min-w-[100px] text-center">ກຳລັງເຊົ່າ</P>
                                <P v-else-if="rentingData?.renting_status === 'left'" class="text-white bg-gray-300 rounded-full px-[20px] py-[2px] min-w-[100px] text-center">ອອກແລ້ວ</P>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="w-[700px] bg-white shadow-md border border-gray-50 mx-auto mt-4 rounded-md mb-20 p-4">
            <div class="w-full grid grid-cols-12 gap-6">
                <div class="col-span-4">
                    <p class="font-medium">ຮູບຜູ້ເຊົ່າ</p>
                    <div class="w-20 h-20 bg-gray-100 rounded-full overflow-hidden mt-4">
                        <n-image
                            v-if="rentingData?.customer?.customer_profile"
                            :src="getUrl(rentingData?.customer.customer_profile, 400)"
                            class="w-full h-full"
                            height="100%"
                            width="100%"
                            object-fit="cover"
                        />
                    </div>
                </div>
                <div class="col-span-8">
                    <p class="font-medium">ລາຍລະອຽດຜູ້ເຊົ່າ</p>
                    <div v-if="loading" class="mt-4">
                        <n-skeleton text :repeat="2" /> <n-skeleton text style="width: 50%" />
                    </div>
                    <div v-else>
                        <div class="w-full flex items-center mt-4">
                            <div class="min-w-[200px]">
                                <p class="text-gray-500">ຊື່:</p>
                            </div>
                            <p>{{ rentingData?.customer?.customer_firstname }}</p>
                        </div>
                        <div class="w-full flex items-center mt-2">
                            <div class="min-w-[200px]">
                                <p class="text-gray-500">ນາມສະກຸນ:</p>
                            </div>
                            <p>{{ rentingData?.customer?.customer_lastname }}</p>
                        </div>
                        <div class="w-full flex items-center mt-2">
                            <div class="min-w-[200px]">
                                <p class="text-gray-500">ເພດ:</p>
                            </div>
                            <p>{{ rentingData?.customer?.customer_gender }}</p>
                        </div>
                        <div class="w-full flex items-center mt-2">
                            <div class="min-w-[200px]">
                                <p class="text-gray-500">ເບີໂທ:</p>
                            </div>
                            <p>{{ rentingData?.customer?.customer_phone }}</p>
                        </div>
                        <div class="w-full flex items-center mt-2">
                            <div class="min-w-[200px]">
                                <p class="text-gray-500">ເລກບັດປະຈຳໂຕ:</p>
                            </div>
                            <p>{{ rentingData?.customer?.customer_identification_id }}</p>
                        </div>
                        <div class="w-full flex items-center mt-2">
                            <div class="min-w-[200px]">
                                <p class="text-gray-500">ບ້ານ:</p>
                            </div>
                            <p>{{ rentingData?.customer?.customer_village }}</p>
                        </div>
                        <div class="w-full flex items-center mt-2">
                            <div class="min-w-[200px]">
                                <p class="text-gray-500">ເມືອງ:</p>
                            </div>
                            <p>{{ rentingData?.customer?.customer_district }}</p>
                        </div>
                        <div class="w-full flex items-center mt-2">
                            <div class="min-w-[200px]">
                                <p class="text-gray-500">ແຂວງ:</p>
                            </div>
                            <p>{{ rentingData?.customer?.customer_province }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>

<script setup>

import { onMounted } from 'vue';
import Rules from '../../utils/rule/index.js';
import { timeFormatter, formatCurrency } from '~~/utils/helpers';

const { getOne, updateRentingLeft } = useRenting();
const { getUrl } = useFile();
import { useMessage } from "naive-ui";
import { Exit as ExitIcon } from '@vicons/ionicons5'
import Models from "~/model";
const message = useMessage();


const showModal = ref(false)

const updateRentingStatus = async () => {
    const timestamp = new Date().getTime();
    const convertedEndDate = new Date(timestamp).toISOString().split('T')[0];
    const data = {
        rentingId: id,
        rentingEndDate: convertedEndDate
    }

    loading.value = true;
    const res = await updateRentingLeft(data);
    if(!res) {
        loading.value = false;
        return;
    }
    await getCurrenRenting();
    loading.value = false;
        
}

const onPositiveClick = async () => {
    showModal.value = false
    await updateRentingStatus();
}
const onNegativeClick = () => {
    showModal.value = false
}


const { id } = useRoute().params;
const loading = ref(false);




const items = [
    {
        title: 'ການເຊົ່າ',
        disabled: false,
        href: '/renting',
    },
    {
        title: 'ລາຍລະອຽດການເຊົ່າ',
        disabled: true,
        href: '/renting/add',
    },
];

const rentingData = ref({});


const getCurrenRenting = async () => {
    const resGetOne = await getOne(id);
    if(!resGetOne) {
        return;
    }
    rentingData.value = resGetOne;
    console.log(rentingData.value);
}


onMounted(async () => {
    loading.value = true;
    await getCurrenRenting();
    loading.value = false;
})


</script>