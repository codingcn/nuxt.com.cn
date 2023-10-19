---
title: 'useServerSeoMeta'
description: useServerSeoMeta可组合函数可以让你以完整的TypeScript支持，将你的网站的SEO元标签定义为一个平铺对象。
links:
  - label: 源码
    icon: i-simple-icons-github
    to: https://github.com/unjs/unhead/blob/main/packages/unhead/src/composables/useServerSeoMeta.ts
    size: xs
---

就像[`useSeoMeta`](/docs/api/composables/use-seo-meta)一样，`useServerSeoMeta`可组合函数可以让你以完整的TypeScript支持，将你的网站的SEO元标签定义为一个平铺对象。

:read-more{to="/docs/api/composables/use-seo-meta"}

在大多数情况下，元标签不需要是响应式的，因为搜索引擎机器人只会扫描初始加载的页面。因此，我们建议使用[`useServerSeoMeta`](/docs/api/composables/use-server-seo-meta)作为性能优化的工具，在客户端不执行任何操作（或返回一个`head`对象）。

```vue [app.vue]
<script setup lang="ts">
useServerSeoMeta({
  robots: 'index, follow'
})
</script>
```

参数与[`useSeoMeta`](/docs/api/composables/use-seo-meta)完全相同。

:read-more{to="/docs/getting-started/seo-meta"}
