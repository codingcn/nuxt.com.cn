---
title: 'useRequestURL'
description: '使用useRequestURL组合函数来访问传入的请求URL。'
links:
  - label: 源码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/url.ts
    size: xs
---

`useRequestURL` 是一个辅助函数，返回一个在服务器端和客户端都可使用的 [URL 对象](https://developer.mozilla.org/zh-CN/docs/Web/API/URL/URL)。

::code-group

```vue [pages/about.vue]
<script setup lang="ts">
const url = useRequestURL()
</script>

<template>
  <p>URL 是：{{ url }}</p>
  <p>路径是：{{ url.pathname }}</p>
</template>
```

```html [开发环境下的结果]
<p>URL 是：http://localhost:3000/about</p>
<p>路径是：/about</p>
```

::

::callout{icon="i-simple-icons-mdnwebdocs" color="gray" to="https://developer.mozilla.org/zh-CN/docs/Web/API/URL#instance_properties" target="_blank"}
在 MDN 文档中了解有关 URL 实例属性的详细信息。
::
