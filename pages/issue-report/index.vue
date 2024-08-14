<template>
    <div>
        <v-breadcrumbs :items="items">
            <template v-slot:prepend>
            </template>
        </v-breadcrumbs>
    </div>
    <div class="w-full bg-white shadow-md rounded-md border border-gray-100 p-4 mb-40">
        <div class="w-full grid grid-cols-12">
            <div class="col-span-6">
                <p class="text-gray-600">ຄົ້ນຫາ</p>
                <n-input @keyup.enter="handleSearch" v-model:value="search" type="text" placeholder="ຄົ້ນຫາຫົວຂໍ້ ແລະ ລາຍລະອຽດ..." class="mt-1" >
                    <template #prefix>
                        <n-icon :component="IosSearch" />
                    </template>
                </n-input>
            </div>
            <div class="col-start-12 col-span-2 w-full flex items-end text-white">
            </div>
        </div>
        <div class="w-full mt-8">
            <p class="text-gray-600 mb-2">ສົ່ງລາຍງານທັງໝົດ <span class="text-gray-800 font-semibold">{{ reportIssues.length }}</span> ລາຍການ</p>
            <v-data-table
                :loading="loading"
                :headers="headers"
                :items="reportIssues"
            >
                <template v-slot:item.customer.customer_profile="{ value }">
                    <div class="w-10 h-10 bg-gray-100 rounded-full overflow-hidden">
                        <n-image
                            :src="getUrl(value, 200)"
                            class="w-full h-full"
                            height="100%"
                            width="100%"
                            object-fit="cover"
                        />
                    </div>
                </template>
                <template v-slot:item.report_issue_image="{ value }">
                    <div class="w-10 h-10 bg-gray-100 rounded-md overflow-hidden">
                        <n-image
                            :src="getUrl(value, 400)"
                            class="w-full h-full"
                            height="100%"
                            width="100%"
                            object-fit="cover"
                        />
                    </div>
                </template>
                <template v-slot:item.customer="{ value }">
                    {{ value.customer_firstname }} {{ value.customer_lastname }}
                </template>
                <template v-slot:item.report_issue_detail="{ value }">
                    {{ setMaxText(value, 10) }}
                </template>
                <template v-slot:item.created_at="{ value }">
                    {{ timeFormatter(value) }}
                </template>
                <template v-slot:item.manage="{ item }">
                    <div class="w-full flex items-center gap-2">
                        <NuxtLink :to="`/issue-report/${item.report_issue_id}`">
                            <n-button circle>
                                <template #icon>
                                    <n-icon><eye-icon class="text-gray-500" /></n-icon>
                                </template>
                            </n-button>
                        </NuxtLink>
                        <n-popconfirm :show-icon="false" positive-text="ຢືນຍັນ" negative-text="ຍົກເລີກ" :positive-button-props="{ type: 'error', class: 'text-white' }" @positive-click="handleDelete(item.report_issue_id, item.report_issue_image)">
                            <template #activator>
                                <n-button class="w-9 h-9 text-white group">
                                    <template #icon>
                                        <n-icon size="18"><trash-icon class="group-hover:text-red-500 text-gray-500"/></n-icon>
                                    </template>
                                </n-button>
                            </template>
                            ທ່ານຕ້ອງການລົບຂໍ້ມູນແທ້ຫຼືບໍ່?
                        </n-popconfirm>
                    </div>
                    </template>
                    <template v-slot:no-data>
                        ບໍ່ມີຂໍ້ມູນ
                    </template>
            </v-data-table>
        </div>
    </div>
</template>

<style scoped>
</style>

<script setup>
import { IosSearch } from '@vicons/ionicons4'
import { Add as AddIcon } from '@vicons/ionicons5'
import { Eye as EyeIcon } from '@vicons/ionicons5'
import { Edit32Filled as EditIcon } from '@vicons/fluent'
import { Random, Trash as TrashIcon } from "@vicons/fa";
import { onMounted } from 'vue';
import { formatCurrency, timeFormatter, setMaxText } from '~~/utils/helpers';


const { getUrl } = useFile();
const { getAll, searchReportIssue, del } = useReportIssue();

const items = [
    {
        title: 'ຜູ້ເຊ່າ',
        disabled: true,
        href: '/customer',
    },
];

const search = ref('')
const headers = [
        { title: 'ລຳດັບ', key: 'index'},
        { title: 'ຮູບຜູ້ລາຍງານ', key: 'customer.customer_profile' },
        { title: 'ຊື່', key: 'customer' },
        { title: 'ຮູບລາຍງານ', key: 'report_issue_image' },
        { title: 'ຫົວຂໍ້ລາຍງານ', key: 'report_issue_title' },
        { title: 'ລາຍລະອຽດ', key: 'report_issue_detail' },
        { title: 'ລາຍງານວັນທີ', key: 'created_at' },
        { title: 'ຈັດການ', key: 'manage' },
      ]

const reportIssues = ref([]);
const loading = ref(false);



const getAllReportIssue = async () => {
    const resGetAll = await getAll();
    if(!resGetAll){
        return;
    }
    const addIndex = resGetAll.map((item, index) => {
        return { ...item, index: index + 1 }
    })
    console.log(addIndex);
    reportIssues.value = addIndex;
}

const handleSearch = async () => {
    loading.value = true;
    if(!search.value){
        await getAllReportIssue();
        loading.value = false;
        return;
    }
    const resSearch = await searchReportIssue(search.value);
    if(!resSearch){
        loading.value = false;
        return;
    }
    const addIndex = resSearch.map((item, index) => {
        return { ...item, index: index + 1 }
    })
    reportIssues.value = addIndex;
    loading.value = false;
}

onMounted( async () => {
    loading.value = true;
    await getAllReportIssue();
    loading.value = false;
})

const handleDelete = async (id, image) => {

    loading.value = true;
    const resDel = await del(id, image);
    if(!resDel){
        loading.value = false;
        return;
    }
    await getAllReportIssue();
    loading.value = false;
}

</script>