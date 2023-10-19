---
title: 'prerenderRoutes'
description: prerenderRoutes用于指示Nitro预渲染额外的路由。
links:
  - label: 源代码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/ssr.ts
    size: xs
---

在进行预渲染时，即使生成的页面的HTML中没有显示它们的URL，你也可以提示Nitro预渲染额外的路径。

```js
const route = useRoute()

prerenderRoutes('/')
prerenderRoutes(['/', '/about'])
```

::callout
在浏览器中或在预渲染之外调用时，`prerenderRoutes`将没有任何效果。
::
