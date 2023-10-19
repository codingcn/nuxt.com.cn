---
title: "useRequestHeaders"
description: "使用 useRequestHeaders 来访问传入请求的头部信息。"
links:
  - label: 源代码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/ssr.ts
    size: xs
---

你可以使用内置的 [`useRequestHeaders`](/docs/api/composables/use-request-headers) 组合函数来访问页面、组件和插件中传入请求的头部信息。

```js
// 获取所有请求头信息
const headers = useRequestHeaders()

// 仅获取 cookie 请求头信息
const headers = useRequestHeaders(['cookie'])
```

::callout
在浏览器中，`useRequestHeaders` 将返回一个空对象。
::

## 示例

我们可以使用 `useRequestHeaders` 来访问并代理初始请求的 `authorization` 头部信息，以便在 SSR 过程中对未来的内部请求进行授权。

下面的示例将 `authorization` 请求头部信息添加到一个同构的 `$fetch` 调用中。

```vue [pages/some-page.vue]
<script setup lang="ts">
const { data } = await useFetch('/api/confidential', {
  headers: useRequestHeaders(['authorization'])
})
</script>
```
