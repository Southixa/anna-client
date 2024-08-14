<template>
    <p class="text-gray-800 font-semibold">#ໂປຟາຍ</p>
    <div class="w-full flex justify-center mt-4">
        <div class="w-[450px] grid grid-cols-12 gap-6">
            <div class="col-span-5">
                <div class="mt-2 w-full h-[120px] border border-gray-50 rounded-sm overflow-hidden bg-gray-100">
                    <n-image
                        :src="getUrl(user.customer_profile, 800)"
                        class="w-full h-full rounded-sm"
                        height="100%"
                        width="100%"
                        object-fit="cover"
                    />
                </div>
            </div>
            <div class="col-span-7">
                <p class="text-gray-800 font-semibold">ລາຍລະອຽດ</p>
                <div class="w-full flex justify-between items-center mt-2">
                    <p class="text-gray-500">ຊື່:</p>
                    <p class="text-gray-500">{{ user.customer_firstname }}</p>
                </div>
                <div class="w-full flex justify-between items-center mt-2">
                    <p class="text-gray-500">ນາມສະກຸນ:</p>
                    <p class="text-gray-500">{{ user.customer_lastname }}</p>
                </div>
                <div class="w-full flex justify-between items-center mt-2">
                    <p class="text-gray-500">ເບີໂທ:</p>
                    <p class="text-gray-500">{{ user.customer_phone }}</p>
                </div>
                <div class="w-full flex justify-between items-center mt-2">
                    <p class="text-gray-500">ລົງທະບຽນວັນທີ:</p>
                    <p class="text-gray-500">{{ timeFormatter(user.created_at) }}</p>
                </div>
                <div>
                    <n-button
          type="error"
          @click="handleLogout"
          class="rounded-md mt-8 w-full text-white"
          size="small"
        >
          ອອກລະບົບ
        </n-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { getUserFromLocalStorage, timeFormatter, clearLocalStorage } from "../../utils/helpers";
const { getUrl } = useFile();

const user = getUserFromLocalStorage();
console.log(user);

const handleLogout = () => {
    clearLocalStorage();
    navigateTo("/login");
}

</script>