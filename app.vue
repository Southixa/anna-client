<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <naive-config>
      <n-message-provider>
        <n-loading-bar-provider>
          <NuxtLayout>
            <v-app>
              <NuxtPage/>
            </v-app>
          </NuxtLayout>
        </n-loading-bar-provider>
      </n-message-provider>
    </naive-config>
  </n-config-provider>
</template>

<script setup>

const themeOverrides = {
    common: {
      primaryColor: '#111111',
      primaryColorHover: '#111111',
      // infoColor: '#F3F4F6',
      // infoColorHover: '#E5E7EB',
      // infoColorPressed: "#E5E7EB",
    },
    Input: {
    borderHover: `1px solid #111111`,
    borderFocus: `1px solid #111111`,
    textColor: '#111111',
  },
    Button: {
      textColor: '#111111',
      borderHover: `1px solid #111111`,
      borderFocus: `1px solid #111111`,
    },
  //   InternalSelection: {
  //     borderHover: `1px solid #002749`,
  //     borderFocus: `1px solid #002749`
  //   },
    // ...
  }

</script>