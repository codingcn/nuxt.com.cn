---
title: 'prefetchComponents'
description: Nuxt 提供了一些工具，让你能够控制预取组件的行为。
links:
  - label: 源代码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/preload.ts
    size: xs
---


预取组件会在后台下载代码，这是基于这样一个假设：该组件很可能用于渲染，如果用户要求使用该组件，它可以立即加载。该组件会被下载并缓存，以便未来的使用，而无需用户明确请求。

使用 `prefetchComponents` 来手动预取在你的 Nuxt 应用中全局注册的单个组件。默认情况下，Nuxt 将这些组件注册为异步组件。你必须使用组件名的帕斯卡命名法。

```ts
await prefetchComponents('MyGlobalComponent')

await prefetchComponents(['MyGlobalComponent1', 'MyGlobalComponent2'])
```

::callout
当前的实现与 [`preloadComponents`](/docs/api/utils/preload-components) 完全相同，只是在预加载组件的基础上添加了预取功能。我们正在努力改进这个行为。
::

::callout
在服务器上，`prefetchComponents` 不会产生任何效果。
::
