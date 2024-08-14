import { NhostClient } from "@nhost/vue";
import { useCookie, useRuntimeConfig } from "nuxt/app";


export const useNhost = () => {
    const cookie = useCookie('token')
    const runtimeConfig = useRuntimeConfig();

    const nhostState = useState('nhost', () => {
      return new NhostClient({
        subdomain: runtimeConfig.public.NHOST_SUBDOMAIN,
        region: runtimeConfig.public.NHOST_REGION,
      })
    })

    if(nhostState.value?.auth?.getSession() == null) {
        nhostState.value.graphql.setAccessToken(cookie.value)
    }
  
    return { nhost: nhostState.value }
  }