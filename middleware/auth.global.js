export default defineNuxtRouteMiddleware((_to, from) => {
  const { $helpers } = useNuxtApp();

  if (_to.path === '/login') {
    return
  }

  if (!$helpers.isLogin()) {
    return navigateTo('/login')
  }
});