---
title: 'preloadRouteComponents'
description: preloadRouteComponents允许你手动预加载Nuxt应用中的单个页面。
links:
  - label: 源代码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/preload.ts
    size: xs
---

预加载路由会加载用户可能在未来导航到的给定路由的组件。这样确保了组件提前可用，并且不太可能阻塞导航，从而提高性能。

::callout{color="green" icon="i-ph-rocket-launch-duotone"}
如果你使用`NuxtLink`组件，Nuxt已经自动预加载了必要的路由。
::

:read-more{to="/docs/api/components/nuxt-link"}

## 示例

在使用`navigateTo`时预加载路由。

```ts
// 我们不等待这个异步函数，以避免阻塞渲染
// 这个组件的设置函数
preloadRouteComponents('/dashboard')

const submit = async () => {
  const results = await $fetch('/api/authentication')

  if (results.token) {
    await navigateTo('/dashboard')
  }
}
```

:read-more{to="/docs/api/utils/navigate-to"}

::callout
在服务器上，`preloadRouteComponents`没有任何效果。
::
