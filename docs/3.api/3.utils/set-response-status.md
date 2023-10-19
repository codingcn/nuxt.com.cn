---
title: 'setResponseStatus'
description: setResponseStatus函数用于设置响应的状态码（可选地设置状态消息）。
links:
  - label: 源代码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/ssr.ts
    size: xs
---

Nuxt提供了组合式函数和工具，以支持一流的服务器端渲染。

`setResponseStatus`函数用于设置响应的状态码（可选地设置状态消息）。

```js
const event = useRequestEvent()

// 将状态码设置为404以显示自定义404页面
setResponseStatus(event, 404)

// 同时设置状态消息
setResponseStatus(event, 404, '页面未找到')
```

::callout
在浏览器中，`setResponseStatus`函数不会产生任何效果。
::

:read-more{to="/docs/getting-started/error-handling"}
