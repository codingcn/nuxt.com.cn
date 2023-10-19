---
title: 'useHydration'
description: '允许完全控制水合循环以从服务器设置和接收数据。'
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/hydrate.ts
    size: xs
---

`useHydration` 是一个内置的可组合函数，它提供了一种方式，在每次发起新的 HTTP 请求时，在服务器端设置数据并在客户端接收数据。通过使用 `useHydration`，你可以完全控制数据的注水过程。

::callout
这是一个高级的可组合函数，主要在内部使用（比如 `useAsyncData`）或由 Nuxt 模块使用。
::

## 类型

```ts [signature]
useHydration <T> (key: string, get: () => T, set: (value: T) => void) => {}
```

你可以在可组合函数、插件和组件中使用 `useHydration()`。

`useHydration` 接受三个参数：

- `key`：在你的 Nuxt 应用程序中标识数据的唯一键
  - **类型**：`String`
- `get`：返回初始数据的函数
  - **类型**：`Function`
- `set`：在客户端接收数据的函数
  - **类型**：`Function`

一旦使用服务器端的 `get` 函数返回初始数据，你可以使用在 `useHydration` 可组合函数中作为第一个参数传递的唯一键，在 `nuxtApp.payload` 中访问该数据。

:read-more{to="/docs/getting-started/data-fetching"}
