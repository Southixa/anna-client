<template>
    <p class="text-gray-800 font-semibold">#ແຈ້ງການ</p>
    <div class="w-full mt-4 grid grid-cols-12 gap-2 md:gap-4">
        <div v-if="loading" class="col-span-4 md:col-span-3 w-full h-[180px]">
            <div class="w-full h-[124px]">
                <n-skeleton height="100%" width="100%" />
            </div>
            <div>
                <n-skeleton text style="width: 60%" class="mt-2" />
            </div>
            <div>
                <n-skeleton text style="width: 100%" class="mt-2" />
            </div>
        </div>
        <nuxt-link v-else class="col-span-4 md:col-span-3" v-for=" (item, index) in announcements" :key="index" :to="`/announcement/${item.announcement_id}`">
            <div class="w-full h-[160px] md:h-[180px] hover:bg-gray-50 transition-all duration-200 rounded-sm overflow-hidden">
                <div class="w-full h-[80px] md:h-[124px] border border-gray-50">
                    <img :src="getUrl(item.announcement_thumbnail, 400)" alt="thumbnail" class="w-full h-full object-cover" />
                </div>
                <div class="w-full h-[56px] px-1 py-1">
                    <p class="text-gray-800 text-sm mt-1">{{ setMaxText(item.announcement_title, 30) }}</p>
                    <p class="text-gray-500 text-xs mt-1">{{ timeFormatter(item.created_at) }}</p>
                </div>
            </div>
        </nuxt-link>
    </div>
</template>

<script setup>

import { formatCurrency, timeFormatter, setMaxText } from '~~/utils/helpers';

const { getAll } = useAnnouncement();
const { getUrl } = useFile();

const loading = ref(false);

const announcements = ref([]);

const getAllOfIt = async () => {
  const resGetAll = await getAll();
  if (!resGetAll) {
    return;
  }

  // sort by announcements_created_at
  resGetAll.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  announcements.value = resGetAll;
  console.log(announcements.value);
}

onMounted(async () => {
  loading.value = true;
  await getAllOfIt();
  loading.value = false;
});


</script>
