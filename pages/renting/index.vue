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
                <n-input @keyup.enter="handleSearch" v-model:value="search" type="text" placeholder="ຄົ້ນຫາຊື່ ແລະ ນາມສະກຸນຜູ້ເຊົ່າ..." class="mt-1" >
                    <template #prefix>
                        <n-icon :component="IosSearch" />
                    </template>
                </n-input>
            </div>
            <div class="col-start-12 col-span-2 w-full flex items-end text-white">
                <NuxtLink to="/renting/add">
                    <n-button color="#18a058">
                        <template #icon>
                            <n-icon>
                                <add-icon />
                            </n-icon>
                        </template>
                        ເພີ່ມການເຊົ່າ
                    </n-button>
                </NuxtLink>
            </div>
        </div>
        <div class="w-full mt-8">
            <p class="text-gray-600 mb-2">ການເຊົ່າທັງໝົດ <span class="text-gray-800 font-semibold">{{ rentings.length }}</span> ລາຍການ</p>
            <v-data-table
                :loading="loading"
                :headers="headers"
                :items="rentings"
            >
                <template v-slot:item.customer.customer_profile="{ value }">
                    <div class="w-10 h-10 bg-gray-100 rounded-full overflow-hidden">
                        <n-image
                            :src="getUrl(value, 200)"
                            class="w-full h-full rounded-full"
                            height="100%"
                            width="100%"
                            object-fit="cover"
                        />
                    </div>
                </template>
                <template v-slot:item.room_quantity="{ value }">
                    {{ value }} ຄົນ
                </template>
                <template v-slot:item.renting_start_date="{ value }">
                    <p v-if="value">{{ timeFormatter(value) }}</p>
                    <p v-else>--</p>
                </template>
                <template v-slot:item.renting_end_date="{ value }">
                    <p v-if="value">{{ timeFormatter(value) }}</p>
                    <p v-else>--</p>
                </template>
                <template v-slot:item.renting_status="{ value }">
                    <span v-if="value == `booking`" class="bg-yellow-400 min-w-8 px-4 py-[2px] text-xs text-white rounded-full">ກຳລັງເຊົ່າ</span>
                    <span v-else-if="value == `left`" class="bg-gray-300 min-w-8 px-4 py-[2px] text-xs text-white rounded-full">ອອກແລ້ວ</span>
                </template>
                <template v-slot:item.manage="{ item }">
                    <div class="w-full flex items-center gap-2">
                        <NuxtLink :to="`/renting/${item.renting_id}`">
                            <n-button circle>
                                <template #icon>
                                    <n-icon><eye-icon class="text-gray-500" /></n-icon>
                                </template>
                            </n-button>
                        </NuxtLink>
                        <n-popconfirm :show-icon="false" positive-text="ຢືນຍັນ" negative-text="ຍົກເລີກ" :positive-button-props="{ type: 'error', class: 'text-white' }" @positive-click="handleDelete(item.renting_id, item.renting_lease_agreement)">
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
import { formatCurrency, timeFormatter } from '~~/utils/helpers';

const { getAll, del, searchRenting } = useRenting()
const { getUrl } = useFile();

const items = [
    {
        title: 'ການເຊົ່າ',
        disabled: true,
        href: '/customer',
    },
];

const search = ref('')
const headers = [
        { title: 'ລຳດັບ', key: 'index'},
        { title: 'ໂປຟາຍ', key: 'customer.customer_profile' },
        { title: 'ຊື່', key: 'customer.customer_firstname' },
        { title: 'ນາມສະກຸນ', key: 'customer.customer_lastname' },
        { title: 'ເບີໂທ', key: 'customer.customer_phone' },
        { title: 'ເລກຫ້ອງເຊົ່າ', key: 'room.room_number' },
        { title: 'ວັນເລີ່ມເຊົ່າ', key: 'renting_start_date' },
        { title: 'ວັນອອກ', key: 'renting_end_date' },
        { title: 'ສະຖານະ', key: 'renting_status' },
        { title: 'ຈັດການ', key: 'manage' },
      ]

const rentings = ref([]);
const loading = ref(false);

const editItem = (item) => {
    console.log(item)
}
const deleteItem = (item) => {
    console.log(item)
}

const getAllRentings = async () => {
    const resGetAll = await getAll();
    if(!resGetAll){
        return;
    }
    const addIndex = resGetAll.map((item, index) => {
        return { ...item, index: index + 1 }
    })
    console.log(addIndex);
    rentings.value = addIndex;
}

const handleSearch = async () => {
    loading.value = true;
    if(!search.value){
        await getAllRentings();
        loading.value = false;
        return;
    }
    const resSearch = await searchRenting(search.value);
    if(!resSearch){
        loading.value = false;
        return;
    }
    const addIndex = resSearch.map((item, index) => {
        return { ...item, index: index + 1 }
    })
    rentings.value = addIndex;
    loading.value = false;
}

onMounted( async () => {
    loading.value = true;
    await getAllRentings();
    loading.value = false;
})

const handleDelete = async (id, leaseAgreement) => {

    loading.value = true;
    const resDel = await del(id, leaseAgreement);
    if(!resDel){
        loading.value = false;
        return;
    }
    await getAllRentings();
    loading.value = false;
}

</script>