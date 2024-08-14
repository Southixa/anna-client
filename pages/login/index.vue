<template>
  <div class="w-full flex justify-center h-screen items-center z-10">
    <div class="w-[300px] min-h-[200px]">
      <p class="text-2xl font-bold text-center mb-4">ເຂົ້າສຸ່ລະບົບ</p>
          <n-input
            :disabled="loading"
            v-model:value="user.email"
            type="text"
            placeholder="ອີເມວລ"
            class=" rounded-md mt-4"
            size="medium"
          />
          <n-input
            :disabled="loading"
            v-model:value="user.password"
            type="password"
            show-password-on="click"
            placeholder="ລະຫັດຜ່ານ"
            :maxlength="20"
            class=" rounded-md mt-4"
            size="medium"
          >
            <template #password-visible-icon>
              <n-icon :size="16" :component="EyeOutline" />
            </template>
            <template #password-invisible-icon>
              <n-icon :size="16" :component="EyeOffOutline" />
            </template>
          </n-input>
        <n-button
          type="primary"
          :loading="loading"
          @click="handleLogin"
          class="rounded-md mt-8 w-full text-white"
          size="medium"
        >
          ເຂົ້າສຸ່ລະບົບ
        </n-button>
    </div>

  </div>
</template>

<script setup>
import { EyeOffOutline, EyeOutline } from "@vicons/ionicons5";
import { useMessage } from "naive-ui";
import Rules from "../../utils/rule/index.js";
import { setUserInLocalStorage } from "../../utils/helpers";
const message = useMessage();

const { getOneByGmailAndPassword } = useCustomer();

definePageMeta({
  layout: "blank",
});

const user = ref({
  email: "southixa.pele19@gmail.com",
  password: "12345678",
});


const loading = ref(false);

const handleLogin = async () => {
    if(user.value.email == "" || user.value.password == "") {
        message.error("ກະລຸນາປ້ອນຂໍ້ມູນໃຫ້ຄົບຖ່ານ");
        return;
    }
    // check email has @gmail.com
    if(!user.value.email.includes("@gmail.com")) {
        message.error("ກະລຸນາໃສ່ @gmail.com");
        return;
    }

    loading.value = true;
    const resLogin = await getOneByGmailAndPassword(user.value.email, user.value.password);
    if(!resLogin) {
        message.error("ອີເມວ ແລະ ລະຫັດຜ່ານບໍ່ຖືກຕ້ອງ");
        loading.value = false;
        return;
    }

    console.log(resLogin);
    setUserInLocalStorage(resLogin);
    loading.value = false;
    message.success("ເຂົ້າສຸ່ລະບົບສໍາເລັດແລ້ວ");

    navigateTo("/announcement");

};
onMounted(async () => {});


</script>
