---
title: "useRoute"
description: useRoute组合函数返回当前路由。
links:
  - label: 源码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/router.ts
    size: xs
---



::callout
在Vue组件的模板中，你可以使用`$route`来访问路由。
::

## 示例

在下面的示例中，我们使用动态页面参数`slug`作为URL的一部分，通过[`useFetch`](/docs/api/composables/use-fetch)调用一个API。

```html [~/pages/[slug\\].vue]
<script setup lang="ts">
const route = useRoute()
const { data: mountain } = await useFetch(`/api/mountains/${route.params.slug}`)
</script>

<template>
  <div>
    <h1>{{ mountain.title }}</h1>
    <p>{{ mountain.description }}</p>
  </div>
</template>
```

如果你需要访问路由查询参数（例如在路径`/test?example=true`中的`example`），那么你可以使用`useRoute().query`而不是`useRoute().params`。

## API

除了动态参数和查询参数之外，`useRoute()`还提供了与当前路由相关的以下计算引用：

- `fullPath`：与当前路由关联的编码URL，包含路径、查询和哈希
- `hash`：URL中以`#`开头的解码哈希部分
- `matched`：与当前路由位置匹配的规范化的匹配路由数组
- `meta`：附加到记录的自定义数据
- `name`：路由记录的唯一名称
- `path`：URL中编码的路径名部分
- `redirectedFrom`：在到达当前路由位置之前尝试访问的路由位置

了解更多信息：[:read-more:](https://router.vuejs.org/api/interfaces/RouteLocationNormalizedLoaded.html)
