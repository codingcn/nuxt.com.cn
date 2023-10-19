---
title: 'refreshNuxtData'
description: refreshNuxtData重新从服务器获取所有数据并更新页面。
links:
  - label: 源代码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/asyncData.ts
    size: xs
---

::callout
`refreshNuxtData` 重新从服务器获取所有数据并更新页面，同时使 [`useAsyncData`](/docs/api/composables/use-async-data)、`useLazyAsyncData`、[`useFetch`](/docs/api/composables/use-fetch) 和 `useLazyFetch` 的缓存失效。
::

## 类型

```ts
refreshNuxtData(keys?: string | string[])
```

**参数:**

* `keys`:

  **类型**: `String | String[]`

  `refreshNuxtData` 接受一个字符串或字符串数组作为 `keys`，用于获取数据。该参数是**可选的**。当没有指定 `keys` 时，将重新获取所有 [`useAsyncData`](/docs/api/composables/use-async-data) 和 [`useFetch`](/docs/api/composables/use-fetch) 的数据。

## 刷新所有数据

下面的示例将刷新当前页面上使用 [`useAsyncData`](/docs/api/composables/use-async-data) 和 [`useFetch`](/docs/api/composables/use-fetch) 获取的所有数据。

```vue [pages/some-page.vue]
<script setup lang="ts">
const refreshing = ref(false)
const refreshAll = async () => {
  refreshing.value = true
  try {
    await refreshNuxtData()
  } finally {
    refreshing.value = false
  }
}
</script>

<template>
  <div>
    <button :disabled="refreshing" @click="refreshAll">
      重新获取所有数据
    </button>
  </div>
</template>
```

## 刷新特定数据

下面的示例将只刷新与 `count` 键匹配的数据。

```vue [pages/some-page.vue]
<script setup lang="ts">
  const { pending, data: count } = await useLazyAsyncData('count', () => $fetch('/api/count'))
  const refresh = () => refreshNuxtData('count')
</script>

<template>
  <div>
    {{ pending ? '加载中' : count }}
  </div>
  <button @click="refresh">刷新</button>
</template>
```

:read-more{to="/docs/getting-started/data-fetching"}
