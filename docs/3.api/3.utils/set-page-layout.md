---
title: 'setPageLayout'
description: setPageLayout允许你动态地改变页面的布局。
links:
  - label: 源代码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/router.ts
    size: xs
---

::callout
`setPageLayout`依赖于对Nuxt上下文的访问权限，并且只能在组件的setup函数、插件和路由中间件中调用。
::

```ts [middleware/custom-layout.ts]
export default defineNuxtRouteMiddleware((to) => {
  // 在你要导航到的路由上设置布局
  setPageLayout('other')
})
```

::callout
如果你选择在服务器端动态设置布局，你必须在布局被Vue渲染之前（即在插件或路由中间件中）进行设置，以避免水合不匹配。
::
