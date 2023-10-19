---
title: "onNuxtReady"
description: onNuxtReady组合式函数允许在你的应用程序完成初始化后运行回调函数。
links:
  - label: 源码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/ready.ts
    size: xs
---

::callout
`onNuxtReady`仅在客户端运行。 :br
它非常适合运行不应阻塞应用程序初始渲染的代码。
::

```ts [plugins/ready.client.ts]
export default defineNuxtPlugin(() => {
  onNuxtReady(async () => {
    const myAnalyticsLibrary = await import('my-big-analytics-library')
    // 使用myAnalyticsLibrary进行一些操作
  })
})
```

即使在应用程序初始化后运行也是“安全”的。在这种情况下，代码将注册在下一个空闲回调中运行。
