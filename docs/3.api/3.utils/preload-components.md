---
title: 'preloadComponents'
description: Nuxt提供了一些工具，让你能够控制预加载组件的行为。
links:
- label: 源代码
  icon: i-simple-icons-github
  to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/preload.ts
  size: xs
---

预加载组件会在你的页面很快需要的时候加载，这些组件你希望在渲染生命周期的早期开始加载。这样可以确保它们尽早可用，并且不太可能阻塞页面的渲染，从而提高性能。

使用 `preloadComponents` 来手动预加载已在你的Nuxt应用中全局注册的单个组件。默认情况下，Nuxt将这些组件注册为异步组件。你必须使用帕斯卡命名法（Pascal-cased）的组件名称。

```js
await preloadComponents('MyGlobalComponent')

await preloadComponents(['MyGlobalComponent1', 'MyGlobalComponent2'])
```

::callout
在服务器上，`preloadComponents` 不会产生任何效果。
::
