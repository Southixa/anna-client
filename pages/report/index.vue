<template>
    <div class="w-full flex justify-between items-center">
        <p class="text-gray-800 font-semibold">#ລາຍງານບັນຫາ</p>
        <div class="w-[120px]">
            <nuxt-link to="/report/add">
                <n-button
                type="primary"
                class="rounded-md w-full text-white"
                size="small"
                >
                <template #icon>
                    <n-icon size="16">
                        <IosSendIcon />
                    </n-icon>
                </template>
                <p class="text-xs">
                    ສົ່ງຟອມລາຍງານ
                </p>
                </n-button>
            </nuxt-link>
        </div>
    </div>
    <div v-if="!loading && reports.length == 0" class="w-full flex justify-center mt-8">
        <p class="text-gray-500 text-sm">ບໍ່ມີລາຍການ...</p>
    </div>
    <div class="w-full flex flex-col gap-2 mt-4">
        <div v-if="loading" class="w-full h-[32px] rounded-md overflow-hidden">
            <n-skeleton height="100%" width="100%" />
        </div>
        <div v-for="(item, index) in reports" :key="index" @click="handleSetActiveCardId($event, item?.report_issue_id)" class="cursor-pointer hover:outline hover:outline-[1px] hover:outline-gray-100 w-full border border-gray-50 rounded-md overflow-hidden px-[8px] py-[4px]">
            <div class="w-full flex justify-between items-center">
                <p class="text-gray-700 font-medium">{{ item?.report_issue_title }}</p>
                <p class="text-gray-500 text-xs">{{ timeFormatter(item?.created_at) }}</p>
            </div>
            <n-collapse-transition :show="activeCardId == item?.report_issue_id" class="mb-[4px] mt-1">
                <div class="w-full flex gap-2">
                    <div data-child class="w-[80px] h-[80px] shrink-0 bg-gray-100 rounded-sm overflow-hidden">
                        <n-image
                            :src="getUrl(item?.report_issue_image, 400)"
                            class="w-full h-full rounded-sm"
                            height="100%"
                            width="100%"
                            object-fit="cover"
                        />
                    </div>
                    <div class="grow">
                        <p class="text-gray-600 text-xs md:text-sm">
                            {{ item?.report_issue_detail }}
                        </p>
                    </div>
                </div>
            </n-collapse-transition>
        </div>
    </div>
    
</template>

<script setup>
import { IosSend as IosSendIcon } from "@vicons/ionicons4";
import { onMounted } from "vue";
import { usePaymentDetail } from "../../composables/use-paymentDetail";
import { getUserFromLocalStorage, timeFormatter, formatCurrency, clearLocalStorage } from "../../utils/helpers";
const { getUrl } = useFile();
const { getAllByCustomerId } = useReportIssue();

const user = getUserFromLocalStorage();
const id = user.customer_id;

const activeCardId = ref("");

const reports = ref([]);

const loading = ref(false);

const handleSetActiveCardId = (event, reportIssueId) => {
   if (event.target.closest('[data-child]')) {
        return;
    }
    if (activeCardId.value == reportIssueId) {
        activeCardId.value = "";
        return;
    }
    activeCardId.value = reportIssueId;
}

const getReports = async () => {
    const resGetAll = await getAllByCustomerId(id);
    if (!resGetAll) {
        return;
    }

    // sort by payment_detail_created_at
    resGetAll.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    console.log(resGetAll);
    reports.value = resGetAll;
}

onMounted(async () => {
    loading.value = true;
    await getReports();
    loading.value = false;
})



</script>