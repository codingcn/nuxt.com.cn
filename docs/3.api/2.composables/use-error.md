---
title: "useError"
description: useError可组合函数返回正在处理的全局Nuxt错误。
links:
  - label: 源代码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/error.ts
    size: xs
---

该可组合函数返回正在处理的全局Nuxt错误，并且在客户端和服务器上都可用。

```ts
const error = useError()
```

`useError`在状态中设置一个错误，并在组件之间创建一个响应式且支持SSR的全局Nuxt错误。

Nuxt错误具有以下属性：

```ts
interface {
  // HTTP响应状态码
  statusCode: number
  // HTTP响应状态消息
  statusMessage: string
  // 错误消息
  message: string
}
```

:read-more{to="/docs/getting-started/error-handling"}
