<template>
    <nuxt-link :to="`/announcement`" class="w-fit">
        <button class="hover:bg-gray-100 px-4 py-2 rounded-md flex justify-center items-center gap-2 text-gray-600 transition-all duration-200">
            <Icon name="ph:arrow-left" class="text-gray-500" size="14"/>
            <p class="text-sm">ກັບຄືນ</p>
        </button>
    </nuxt-link>
    <p class="text-gray-800 font-semibold mt-4">#ລາຍລະອຽດແຈ້ງການ</p>
    <div class="w-full mt-4 flex justify-center">
        <div class="w-[400px] min-h-[200px]">
            <div class="w-full h-[200px] bg-gray-100 border border-gray-50 rounded-sm">
                <n-skeleton v-if="loading" height="100%" width="100%" />
                <n-image
                    v-else
                    :src="getUrl(announcement?.announcement_thumbnail, 800)"
                    class="w-full h-full rounded-sm"
                    height="100%"
                    width="100%"
                    object-fit="cover"
                />
            </div>
            <div v-if="loading" class="mt-4">
                <n-skeleton text style="width: 100%" />
                <n-skeleton text style="width: 60%" class="mt-2" />
                <n-skeleton text style="width: 100%" :repeat="2" class="mt-4" />
            </div>
            <div v-else>
                <p class="mt-4 font-bold">{{ announcement?.announcement_title }}</p>
                <p class="text-gray-500 text-sm mt-2">{{ timeFormatter(announcement?.created_at) }}</p>
                <p class="mt-4 text-gray-600">{{ announcement?.announcement_detail }}</p>
            </div>
        </div>
    </div>
</template>

<script setup>

import { formatCurrency, timeFormatter, setMaxText } from '~~/utils/helpers';
import { useLoadingBar } from "naive-ui";

const { getOne } = useAnnouncement();
const { getUrl } = useFile();
const { id } = useRoute().params;

const loading = ref(false);

const loadingBar = useLoadingBar();

const announcement = ref({});

const getCurrent = async () => {
    const resGetOne = await getOne(id);
    if (!resGetOne) {
        return;
    }
    announcement.value = resGetOne;
    console.log(announcement.value);
}

onMounted(async () => {
    loadingBar.start()
    loading.value = true;
    await getCurrent();
    loadingBar.finish()
    loading.value = false;
});


</script>
