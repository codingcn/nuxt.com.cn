---
title: useLazyAsyncData
description: 这个封装了 useAsyncData 的包装器立即触发导航。
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/asyncData.ts
    size: xs
---

## 描述

默认情况下，[`useAsyncData`](/docs/api/composables/use-async-data)会阻塞导航，直到其异步处理程序解析完成。`useLazyAsyncData`在`useAsyncData`周围提供了一个包装器，通过将`lazy`选项设置为`true`，在处理程序解析之前触发导航。

::callout
`useLazyAsyncData`具有与[`useAsyncData`](/docs/api/composables/use-async-data)相同的签名。
::

:read-more{to="/docs/api/composables/use-async-data"}

## 示例

```vue [pages/index.vue]
<script setup lang="ts">
/* 在获取完成之前，导航将会发生。
  在组件的模板中直接处理挂起和错误状态
*/
const { pending, data: count } = await useLazyAsyncData('count', () => $fetch('/api/count'))

watch(count, (newCount) => {
  // 因为 count 可能最初为 null，你不会立即访问到它的内容，但你可以监视它。
})
</script>

<template>
  <div>
    {{ pending ? '加载中' : count }}
  </div>
</template>
```

::callout{color="amber" icon="i-ph-warning-duotone"}
`useLazyAsyncData`是编译器转换的保留函数名，所以你不应该将自己的函数命名为`useLazyAsyncData`。
::

:read-more{to="/docs/getting-started/data-fetching#uselazyasyncdata"}
