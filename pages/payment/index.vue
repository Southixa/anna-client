<template>
    <p class="text-gray-800 font-semibold">#ຈ່າຍຄ່າຫ້ອງ</p>
    <div class="w-full flex flex-col gap-2 mt-4">
        <div v-if="!loading && paymentDetails.length == 0" class="w-full flex justify-center mt-5">
            <p class="text-gray-500 text-sm">ບໍ່ມີລາຍການ...</p>
        </div>
        <div v-if="loading" class="w-full h-[100px] rounded-sm overflow-hidden">
            <n-skeleton height="100%" width="100%" />
        </div>
        <nuxt-link v-else v-for="(item, index) in paymentDetails" :key="index" :to="`/payment/${item.payment_detail_id}`">
            <div style="background-size: cover" class="bg-[url('~/assets/image/payment/pattern_bg.jpg')] w-full h-[100px] bg-gray-100 rounded-sm px-[16px] py-[8px] hover:shadow-sm hover:outline outline-[1px] hover:outline-gray-200 transition-hover">
                <div class="w-full h-full grid grid-cols-12">
                    <div class="col-span-8 md:col-span-10">
                        <p class="text-gray-600 font-semibold text-lg">ເດືອນ {{ item?.payment?.payment_month }}</p>
                        <p class="text-gray-500 mt-1">{{ item?.payment?.payment_year }}</p>
                        <p class="text-red-500 mt-1">{{ formatCurrency(item?.payment_deatil_total_price) }} ກີບ</p>
                    </div>
                    <div class="col-span-4 md:col-span-2">
                        <div class="w-full h-full flex justify-center items-center">
                            <p v-if="item.payment_detail_is_approved == 'success'" class="text-gray-500 text-lg">ຈ່າຍແລ້ວ</p>
                            <p v-if="item.payment_detail_is_approved == 'waiting'" class="text-blue-800 text-lg">ລໍຖ້າຊຳລະເງິນ</p>
                            <p v-if="item.payment_detail_is_approved == 'pending'" class="text-yellow-500 text-lg">ລໍຖ້າອະນຸມັດ</p>
                            <p v-if="item.payment_detail_is_approved == 'reject'" class="text-red-500 text-lg">ຖືກຍົກເລີກ</p>
                        </div>
                    </div>
                </div>
            </div>
        </nuxt-link>
    </div>
    
</template>

<script setup>
import { onMounted } from "vue";
import { usePaymentDetail } from "../../composables/use-paymentDetail";
import { getUserFromLocalStorage, timeFormatter, formatCurrency, clearLocalStorage } from "../../utils/helpers";
const { getUrl } = useFile();
const { getAllByCustomerId } = usePaymentDetail();

const user = getUserFromLocalStorage();
const id = user.customer_id;

const handleLogout = () => {
    clearLocalStorage();
    navigateTo("/login");
}

const paymentDetails = ref([]);

const loading = ref(false);

const getPaymentDetails = async () => {
    const resGetAll = await getAllByCustomerId(id);
    if (!resGetAll) {
        return;
    }

    // sort by payment_detail_created_at
    resGetAll.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    console.log(resGetAll);
    paymentDetails.value = resGetAll;
}

onMounted(async () => {
    loading.value = true;
    await getPaymentDetails();
    loading.value = false;
})



</script>