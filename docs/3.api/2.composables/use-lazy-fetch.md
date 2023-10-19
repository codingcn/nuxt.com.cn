---
title: 'useLazyFetch'
description: 这个对useFetch的封装会立即触发导航。
links:
  - label: 源码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/fetch.ts
    size: xs
---

## 描述

默认情况下，[`useFetch`](/docs/api/composables/use-fetch)在其异步处理程序解析之前会阻止导航。`useLazyFetch`提供了一个包装器，将[`useFetch`](/docs/api/composables/use-fetch)包装起来，通过将`lazy`选项设置为`true`来在处理程序解析之前触发导航。

::callout
`useLazyFetch`具有与[`useFetch`](/docs/api/composables/use-fetch)相同的签名。
::

:read-more{to="/docs/api/composables/use-fetch"}

## 示例

```vue [pages/index.vue]
<script setup lang="ts">
/* 在获取完成之前导航将会发生。
  在组件模板中直接处理待处理和错误状态。
*/
const { pending, data: posts } = await useLazyFetch('/api/posts')
watch(posts, (newPosts) => {
  // 因为posts可能最初为null，你不能立即访问它的内容，但可以监视它。
})
</script>

<template>
  <div v-if="pending">
    加载中 ...
  </div>
  <div v-else>
    <div v-for="post in posts">
      <!-- 做一些操作 -->
    </div>
  </div>
</template>
```

::callout
`useLazyFetch`是编译器转换的保留函数名，因此你不应该将自己的函数命名为`useLazyFetch`。
::

:read-more{to="/docs/getting-started/data-fetching"}
