<template>
    <nuxt-link :to="`/payment`" class="w-fit">
        <button class="hover:bg-gray-100 px-4 py-2 rounded-md flex justify-center items-center gap-2 text-gray-600 transition-all duration-200">
            <Icon name="ph:arrow-left" class="text-gray-500" size="14"/>
            <p class="text-sm">ກັບຄືນ</p>
        </button>
    </nuxt-link>
    <p class="text-gray-800 font-semibold mt-4">#ລາຍລະອຽດຄ່າເຊົ່າ</p>
    <div class="w-full mt-4 flex justify-center">
        <div class="w-[400px] min-h-[200px]">
            <div  style="background-size: cover" class="w-full min-h-[250px] bg-[url('~/assets/image/payment/pattern_bg2.jpg')] bg-gray-100 border border-gray-50 rounded-sm px-[12px] py-[8px]">
                <div class="w-full flex justify-between items-center">
                    <p class="text-gray-600">ຊື່ທະນາຄານ:</p>
                    <n-skeleton v-if="loading" text style="width: 30%" />
                    <p v-else>{{ paymentDetail?.payment?.payment_account_bank_name }}</p>
                </div>
                <div class="w-full flex justify-between items-center mt-1">
                    <p class="text-gray-600">ຊື່ບັນຊີ:</p>
                    <n-skeleton v-if="loading" text style="width: 30%" />
                    <p v-else>{{ paymentDetail?.payment?.payment_account_name }}</p>
                </div>
                <div class="w-full flex justify-between items-center mt-1">
                    <p class="text-gray-600">ເລກບັນຊີ:</p>
                    <n-skeleton v-if="loading" text style="width: 30%" />
                    <p v-else>{{ paymentDetail?.payment?.payment_account_number }}</p>
                </div>
                <div class="w-full mt-1">
                    <p class="text-gray-600">QR-Code:</p>
                </div>
                <div class="w-full mt-1 flex justify-center items-center">
                    <div class="w-[120px] h-[120px] border rounded-sm overflow-hidden border-gray-100">
                        <n-skeleton v-if="loading" height="100%" width="100%" />
                        <n-image
                            v-else
                            :src="getUrl(paymentDetail?.payment?.payment_qr_code, 400)"
                            class="w-full h-full rounded-sm"
                            height="100%"
                            width="100%"
                            object-fit="cover"
                        />
                    </div>
                </div>
            </div>
            <div class="w-full mt-2 border border-gray-100 px-[12px] py-[8px]">
                <div class="w-full flex justify-between items-center">
                    <p class="text-gray-600">ເດືອນ:</p>
                    <n-skeleton v-if="loading" text style="width: 30%" />
                    <p v-else>{{ paymentDetail?.payment?.payment_month }}</p>
                </div>
                <div class="w-full flex justify-between items-center">
                    <p class="text-gray-600">ປີ:</p>
                    <n-skeleton v-if="loading" text style="width: 30%" />
                    <p v-else>{{ paymentDetail?.payment?.payment_year }}</p>
                </div>
                <div class="w-full flex justify-between items-center">
                    <p class="text-gray-600">ຈຳນວນທີ່ຕ້ອງຈ່າຍ:</p>
                    <n-skeleton v-if="loading" text style="width: 30%" />
                    <p class="text-red-600" v-else>{{ formatCurrency(paymentDetail?.payment_deatil_total_price) }} <span class="text-gray-600">ກີບ</span></p>
                </div>
                <div class="w-full flex justify-between items-center mt-1 mb-1">
                    <p class="text-gray-600">ສະຖານະ:</p>
                    <n-skeleton v-if="loading" text style="width: 30%" />
                    <p class="text-white px-[12px] bg-gray-300 min-w-[80px] text-center rounded-md"  v-if="paymentDetail?.payment_detail_is_approved == 'waiting'">ລໍຖ້າການໂອນ</p>
                    <p class="text-white px-[12px] bg-yellow-300 min-w-[80px] text-center rounded-md"  v-if="paymentDetail?.payment_detail_is_approved == 'pending'">ລໍຖ້າແອດມິນອະນຸມັດ</p>
                    <p class="text-white px-[12px] bg-green-300 min-w-[80px] text-center rounded-md"  v-if="paymentDetail?.payment_detail_is_approved == 'success'">ຈ່າຍແລ້ວ</p>
                    <p class="text-white px-[12px] bg-red-300 min-w-[80px] text-center rounded-md"  v-if="paymentDetail?.payment_detail_is_approved == 'reject'">ຖືກປະຕິເສດ</p>
                </div>
                <div v-if="paymentDetail?.payment_detail_is_approved != 'waiting'" class="w-full flex justify-between items-center">
                    <p class="text-gray-600">ໂອນວັນທີ:</p>
                    <n-skeleton v-if="loading" text style="width: 30%" />
                    <p v-else>{{ timeFormatter(paymentDetail?.updated_at) }}</p>
                </div>
                <div v-if="paymentDetail?.payment_detail_is_approved != 'waiting'">
                    <div class="w-full mt-1">
                    <p class="text-gray-600">ຮູບການໂອນ:</p>
                </div>
                <div class="w-full mt-1 flex justify-center items-center">
                    <div class="w-[120px] h-[120px] border rounded-sm overflow-hidden border-gray-100">
                        <n-skeleton v-if="loading" height="100%" width="100%" />
                        <n-image
                            v-else
                            :src="getUrl(paymentDetail?.payment_detail_slip, 400)"
                            class="w-full h-full rounded-sm"
                            height="100%"
                            width="100%"
                            object-fit="cover"
                        />
                    </div>
                </div>
                </div>
                <div v-else>
                    <div>
                    <p class="mb-4 text-gray-800 mt-2 font-semibold">ອັບໂຫຼດຮູບການໂອນ:</p>
                    <n-upload
                            @change="handleUploadChange"
                            accept="image/*"
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
                    @click="handleSubmit"
                    class="rounded-md mt-8 w-full text-white"
                    size="medium"
                    >
                    ສົ່ງ
                    </n-button>
                </div>
                </div>
                
            </div>
        </div>
    </div>
</template>

<script setup>

import { formatCurrency, timeFormatter, setMaxText } from '~~/utils/helpers';
import { useLoadingBar } from "naive-ui";
import { useMessage } from "naive-ui";

const { getOne, uploadPayment } = usePaymentDetail();
const { getUrl } = useFile();
const { id } = useRoute().params;
const message = useMessage();

const loading = ref(false);

const loadingBar = useLoadingBar();

const paymentDetail = ref({});


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


const handleSubmit = async () => {
    if(fileList.value.length === 0) {
        message.error("ກະລຸນາອັບໂຫຼດຮູບ");
        return;
    }

    loading.value = true;
    const resUploadPayment = await uploadPayment(id, fileList.value[0].file);
    if (!resUploadPayment) {
        loading.value = false;
        return;
    }

    await getCurrent();
    loading.value = false;

}

const getCurrent = async () => {
    const resGetOne = await getOne(id);
    if (!resGetOne) {
        return;
    }
    paymentDetail.value = resGetOne;
    console.log(resGetOne);
}

onMounted(async () => {
    loadingBar.start()
    loading.value = true;
    await getCurrent();
    loadingBar.finish()
    loading.value = false;
});


</script>
