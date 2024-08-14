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
                <nuxt-link to="/issue-report" class="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 w-fit">
                    <Icon name="mingcute:left-fill" class="text-gray-500" size="20" />
                    <p class="text-lg font-normal text-gray-600">ກັບຄືນ</p>
                </nuxt-link>
            </div>
            <div class="flex justify-center items-center">
                <p class="text-xl font-medium text-gray-600">ລາຍລະອຽດຜູ້ເຊົ່າລາຍງານ</p>
            </div>
            <div></div>
        </div>
        <div class="w-[700px] bg-white shadow-md border border-gray-50 mx-auto mt-4 rounded-md mb-4 p-4">
            <div class="w-full grid grid-cols-12 gap-6">
                <div class="col-span-4">
                    <p class="font-medium">ຮູບລາຍງານ</p>
                    <div class="w-48 h-48 bg-gray-100 rounded-md overflow-hidden mt-4">
                        <n-image
                            v-if="reportIssueData?.customer?.customer_profile"
                            :src="getUrl(reportIssueData?.report_issue_image, 400)"
                            class="w-full h-full"
                            height="100%"
                            width="100%"
                            object-fit="cover"
                        />
                    </div>
                </div>
                <div class="col-span-8">
                    <p class="font-medium">ລາຍລະອຽດການລາຍງານ</p>
                    <div v-if="loading" class="mt-4">
                        <n-skeleton text :repeat="2" /> <n-skeleton text style="width: 50%" />
                    </div>
                    <div v-else>
                        <div class="w-full flex items-center mt-4">
                            <div class="min-w-[200px]">
                                <p class="text-gray-500">ຫົວຂໍ້:</p>
                            </div>
                            <p>{{ reportIssueData?.report_issue_title }}</p>
                        </div>
                        <div class="w-full flex items-center mt-2">
                            <div class="min-w-[200px]">
                                <p class="text-gray-500">ລາຍງານວັນທີ:</p>
                            </div>
                            <p>{{ timeFormatter(reportIssueData?.created_at) }}</p>
                        </div>
                        <p class="text-gray-500 mt-2">ລາຍລະອຽດ:</p>
                        <div class="w-full mt-4">
                            <p class="max-w-[100%] break-words">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ reportIssueData?.report_issue_detail }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="w-[700px] bg-white shadow-md border border-gray-50 mx-auto mt-4 rounded-md mb-20 p-4">
            <div class="w-full grid grid-cols-12 gap-6">
                <div class="col-span-4">
                    <p class="font-medium">ຮູບຜູ້ລາຍງານ</p>
                    <div class="w-20 h-20 bg-gray-100 rounded-full overflow-hidden mt-4">
                        <n-image
                            v-if="reportIssueData?.customer?.customer_profile"
                            :src="getUrl(reportIssueData?.customer.customer_profile, 400)"
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
                            <p>{{ reportIssueData?.customer?.customer_firstname }}</p>
                        </div>
                        <div class="w-full flex items-center mt-2">
                            <div class="min-w-[200px]">
                                <p class="text-gray-500">ນາມສະກຸນ:</p>
                            </div>
                            <p>{{ reportIssueData?.customer?.customer_lastname }}</p>
                        </div>
                        <div class="w-full flex items-center mt-2">
                            <div class="min-w-[200px]">
                                <p class="text-gray-500">ເພດ:</p>
                            </div>
                            <p>{{ reportIssueData?.customer?.customer_gender }}</p>
                        </div>
                        <div class="w-full flex items-center mt-2">
                            <div class="min-w-[200px]">
                                <p class="text-gray-500">ເບີໂທ:</p>
                            </div>
                            <p>{{ reportIssueData?.customer?.customer_phone }}</p>
                        </div>
                        <div class="w-full flex items-center mt-2">
                            <div class="min-w-[200px]">
                                <p class="text-gray-500">ເລກບັດປະຈຳໂຕ:</p>
                            </div>
                            <p>{{ reportIssueData?.customer?.customer_identification_id }}</p>
                        </div>
                        <div class="w-full flex items-center mt-2">
                            <div class="min-w-[200px]">
                                <p class="text-gray-500">ບ້ານ:</p>
                            </div>
                            <p>{{ reportIssueData?.customer?.customer_village }}</p>
                        </div>
                        <div class="w-full flex items-center mt-2">
                            <div class="min-w-[200px]">
                                <p class="text-gray-500">ເມືອງ:</p>
                            </div>
                            <p>{{ reportIssueData?.customer?.customer_district }}</p>
                        </div>
                        <div class="w-full flex items-center mt-2">
                            <div class="min-w-[200px]">
                                <p class="text-gray-500">ແຂວງ:</p>
                            </div>
                            <p>{{ reportIssueData?.customer?.customer_province }}</p>
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
import { timeFormatter } from '~~/utils/helpers';

const { getOne } = useReportIssue();
const { getUrl } = useFile();
import { useMessage } from "naive-ui";
import Models from "~/model";
const message = useMessage();


const { id } = useRoute().params;
const loading = ref(false);




const items = [
    {
        title: 'ລາຍງານ',
        disabled: false,
        href: '/issue-report',
    },
    {
        title: 'ລາຍລະອຽດລາຍງານ',
        disabled: true,
        href: '/announcement/add',
    },
];

const reportIssueData = ref({});


const getCurrenReportIssue = async () => {
    const resGetOne = await getOne(id);
    if(!resGetOne) {
        return;
    }
    reportIssueData.value = resGetOne;
    console.log(reportIssueData.value);
}


onMounted(async () => {
    loading.value = true;
    await getCurrenReportIssue();
    loading.value = false;
})


</script>