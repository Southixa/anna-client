<template class="w-full relative">
    <div class="w-full bg-[#111111] p-[10px]">
        <div class="w-full min-h-screen bg-white p-4">
            <div class="max-w-[924px] mx-auto pt-0 md:pt-8">
                <div class="w-full flex justify-center flex-col items-center">
                    <p class="text-[60px] md:text-[100px] font-medium " style="font-family: 'Grey Qo'">Anna</p>
                    <p class=" text-[16px] text-gray-500" style="font-family: 'Dancing Script'" >anna management system</p>
                </div>
                <div class="w-full mt-8">
                    <div class="w-full h-[1px] border bg-[#111111]/60"></div>
                    <div class="w-full hidden justify-center md:flex">
                        <div class="flex justify-center gap-2 py-[8px]">
                            <!-- <nuxt-link to="/">
                                <button class="hover:bg-gray-100 transition-all duration-200 min-w-[80px] px-[10px] py-[4px] rounded-md">ໜ້າຫຼັກ</button>
                            </nuxt-link> -->
                            <nuxt-link to="/announcement">
                                <button class="hover:bg-gray-100 transition-all duration-200 min-w-[80px] px-[10px] py-[4px] rounded-md">ແຈ້ງການ</button>
                            </nuxt-link>
                            <nuxt-link to="/report">
                                <button class="hover:bg-gray-100 transition-all duration-200 min-w-[80px] px-[10px] py-[4px] rounded-md">ລາຍງານ</button>
                            </nuxt-link>
                            <nuxt-link to="/payment">
                                <button class="hover:bg-gray-100 transition-all duration-200 min-w-[80px] px-[10px] py-[4px] rounded-md">ຈ່າຍຄ່າຫ້ອງ</button>
                            </nuxt-link>
                            <nuxt-link to="/profile">
                                <button class="hover:bg-gray-100 transition-all duration-200 min-w-[80px] px-[10px] py-[4px] rounded-md">ໂປຟາຍ</button>
                            </nuxt-link>
                        </div>
                    </div>
                    <div class="w-full hidden md:block h-[1px] border bg-[#111111]/60"></div>
                </div>
                <div class="w-full mt-8">
                    <slot />
                </div>
            </div>
        </div>
        <div class="w-full bg-[#333333] min-h-[200px] flex justify-center items-center flex-col">
            <p class="text-[100px] font-medium  text-white" style="font-family: 'Grey Qo'">Anna</p>
                    <p class=" text-[16px] text-white" style="font-family: 'Dancing Script'" >anna management system</p>
        </div>
    </div>
    <div class="w-full sticky bottom-0 bg-white button-0 left-0 pb-[10px] pt-[14px] px-[10px] md:hidden shadow-2xl border-t">
        <div class="w-full grid grid-cols-12">
            <nuxt-link to="/announcement" class="col-span-3 flex justify-center">
                <div class="flex flex-col items-center">
                    <div class="w-[20px] h-[20px] flex justify-center items-center">
                        <Icon name="material-symbols:breaking-news-rounded" class="text-gray-400" size="16" />
                    </div>
                    <p class="text-[12px] text-center text-gray-500">ແຈ້ງການ</p>
                </div>
            </nuxt-link>
            <nuxt-link to="/report" class="col-span-3 flex justify-center">
                <div class="flex flex-col items-center">
                    <div class="w-[20px] h-[20px] flex justify-center items-center">
                        <Icon name="ic:sharp-report" class="text-gray-400" size="18" />
                    </div>
                    <p class="text-[12px] text-center text-gray-500">ລາຍງານ</p>
                </div>
            </nuxt-link>
            <nuxt-link to="/payment" class="col-span-3 flex justify-center">
                <div class="flex flex-col items-center">
                    <div class="w-[20px] h-[20px] flex justify-center items-center">
                        <Icon name="fluent:payment-20-filled" class="text-gray-400" size="20" />
                    </div>
                    <p class="text-[12px] text-center text-gray-500">ຈ່າຍຄ່າຫ້ອງ</p>
                </div>
            </nuxt-link>
            <nuxt-link to="/profile" class="col-span-3 flex justify-center">
                <div class="flex flex-col items-center">
                    <div class="w-[20px] h-[20px] flex justify-center items-center">
                        <Icon name="material-symbols:person" class="text-gray-400" size="20" />
                    </div>
                    <p class="text-[12px] text-center text-gray-500">ໂປຟາຍ</p>
                </div>
            </nuxt-link>
        </div>
    </div>
</template>

<script setup>

</script>

