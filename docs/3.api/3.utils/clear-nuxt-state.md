---
title: 'clearNuxtState'
description: 删除 useState的缓存状态。
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/state.ts
    size: xs
---


::callout
如果你想要使 `useState` 的状态失效，这个方法非常有用。
::

## 类型

```ts
clearNuxtState (keys?: string | string[] | ((key: string) => boolean)): void
```

## 参数

- `keys`: 一个或者多个在 [`useState`](/docs/api/composables/use-state) 中使用的键，用于删除它们的缓存状态。如果没有提供键值，将会使 **所有状态** 失效。
