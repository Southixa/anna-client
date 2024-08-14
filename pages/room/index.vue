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
                <n-input @keyup.enter="handleSearch" v-model:value="search" type="text" placeholder="ຄົ້ນຫາເລກຫ້ອງ ແລະ ຊື່ອາຄານ..." class="mt-1" >
                    <template #prefix>
                        <n-icon :component="IosSearch" />
                    </template>
                </n-input>
            </div>
            <div class="col-start-12 col-span-2 w-full flex items-end text-white">
                <NuxtLink to="/room/add">
                    <n-button color="#18a058">
                        <template #icon>
                            <n-icon>
                                <add-icon />
                            </n-icon>
                        </template>
                        ເພີ່ມຫ້ອງ
                    </n-button>
                </NuxtLink>
            </div>
        </div>
        <div class="w-full mt-8">
            <p class="text-gray-600 mb-2">ຫ້ອງທັງໝົດ <span class="text-gray-800 font-semibold">{{ rooms.length }}</span> ລາຍການ</p>
            <v-data-table
                :loading="loading"
                :headers="headers"
                :items="rooms"
            >
                <template v-slot:item.room_price="{ value }">
                    <v-chip color="red">
                        {{ formatCurrency(value) }} ກີບ
                    </v-chip>
                </template>
                <template v-slot:item.room_quantity="{ value }">
                    {{ value }} ຄົນ
                </template>
                <template v-slot:item.manage="{ item }">
                    <div class="w-full flex items-center gap-2">
                        <NuxtLink :to="`/room/${item.room_id}`">
                            <n-button circle>
                                <template #icon>
                                    <n-icon><edit-icon class="text-gray-500" /></n-icon>
                                </template>
                            </n-button>
                        </NuxtLink>
                        <n-popconfirm :show-icon="false" positive-text="ຢືນຍັນ" negative-text="ຍົກເລີກ" :positive-button-props="{ type: 'error', class: 'text-white' }" @positive-click="handleDelete(item.room_id)">
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
import { Edit32Filled as EditIcon } from '@vicons/fluent'
import { Random, Trash as TrashIcon } from "@vicons/fa";
import { onMounted } from 'vue';
import { formatCurrency } from '~~/utils/helpers';

const { getAll, searchByRoomNumberAndRoomBuildingName, del } = useRoom()

const items = [
    {
        title: 'ຫ້ອງ',
        disabled: true,
        href: '/room',
    },
];

const search = ref('')
const headers = [
        { title: 'ລຳດັບ', key: 'index' },
        { title: 'ເລກຫ້ອງ', key: 'room_number' },
        { title: 'ອາຄານ', key: 'room_building_name' },
        { title: 'ລາຄາຕໍ່ເດືອນ', key: 'room_price' },
        { title: 'ຈຳນວນຜູ້ເຊົ່າຢູ່ໄດ້ສູງສູດ', key: 'room_quantity' },
        { title: 'ຈັດການ', key: 'manage' },
      ]

const rooms = ref([]);
const loading = ref(false);

const editItem = (item) => {
    console.log(item)
}
const deleteItem = (item) => {
    console.log(item)
}

const getAllRooms = async () => {
    const resGetAll = await getAll();
    if(!resGetAll){
        return;
    }
    const addIndex = resGetAll.map((item, index) => {
        return { ...item, index: index + 1 }
    })
    console.log(addIndex);
    rooms.value = addIndex;
}

const handleSearch = async () => {
    loading.value = true;
    if(!search.value){
        await getAllRooms();
        loading.value = false;
        return;
    }
    const resSearch = await searchByRoomNumberAndRoomBuildingName(search.value, search.value);
    if(!resSearch){
        loading.value = false;
        return;
    }
    const addIndex = resSearch.map((item, index) => {
        return { ...item, index: index + 1 }
    })
    rooms.value = addIndex;
    loading.value = false;
}

onMounted( async () => {
    loading.value = true;
    await getAllRooms();
    loading.value = false;
})

const handleDelete = async (id) => {
    loading.value = true;
    const resDel = await del(id);
    console.log(resDel);
    if(!resDel){
        loading.value = false;
        return;
    }
    await getAllRooms();
    loading.value = false;
}

</script>