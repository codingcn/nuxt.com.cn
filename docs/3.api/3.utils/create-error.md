---
title: 'createError'
description: 使用附加元数据创建一个错误对象
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/error.ts
    size: xs
---

你可以使用这个函数来创建一个带有附加元数据的错误对象。它可在你的应用程序的Vue和Nitro部分中使用，并且意味着要被抛出。

## 参数

- `err`: `{ cause, data, message, name, stack, statusCode, statusMessage, fatal }`

## 在Vue应用中

如果你抛出一个使用`createError`创建的错误：

- 在服务器端，它将触发一个全屏错误页面，你可以使用`clearError`来清除它。
- 在客户端，它将抛出一个非致命错误供你处理。如果你需要触发一个全屏错误页面，你可以通过设置`fatal: true`来实现。

### 示例

```vue [pages/movies/[slug\\].vue]
<script setup lang="ts">
const route = useRoute()
const { data } = await useFetch(`/api/movies/${route.params.slug}`)
if (!data.value) {
  throw createError({ statusCode: 404, statusMessage: '页面未找到' })
}
</script>
```

## 在API路由中

使用`createError`来触发服务器API路由中的错误处理。

### 示例

```js
export default eventHandler(() => {
  throw createError({
    statusCode: 404,
    statusMessage: '页面未找到'
  })
})
```

了解更多信息，请阅读[错误处理文档](/docs/getting-started/error-handling)。
