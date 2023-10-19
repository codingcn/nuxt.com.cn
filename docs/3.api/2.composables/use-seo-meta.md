---
title: 'useSeoMeta'
description: useSeoMeta组合函数能够以完全支持TypeScript的形式将你网站的SEO元标签定义为一个扁平对象。
links:
  - label: 源代码
    icon: i-simple-icons-github
    to: https://github.com/unjs/unhead/blob/main/packages/unhead/src/composables/useSeoMeta.ts
    size: xs
---


这样做可以帮助你避免常见的错误，比如使用`name`而不是`property`，以及拼写错误，因为有100多个元标签是完全被类型化的。

::callout
这是向你的网站添加元标签的推荐方式，它具有XSS安全性并且完全支持TypeScript。
::

:read-more{to="/docs/getting-started/seo-meta"}

## 使用方法

```vue [app.vue]
<script setup lang="ts">
useSeoMeta({
  title: '我的神奇网站',
  ogTitle: '我的神奇网站',
  description: '这是我的神奇网站，让我告诉你关于它的一切。',
  ogDescription: '这是我的神奇网站，让我告诉你关于它的一切。',
  ogImage: 'https://example.com/image.png',
  twitterCard: 'summary_large_image',
})
</script>
```

当插入具有响应性的标签时，你应该使用计算属性的获取器语法（`() => value`）：

```vue [app.vue]
<script setup lang="ts">
const title = ref('我的标题')

useSeoMeta({
  title,
  description: () => `描述：${title.value}`
})
</script>
```

## 参数

有超过100个参数。请参阅[源代码中的完整参数列表](https://github.com/harlan-zw/zhead/blob/main/src/metaFlat.ts)。

:read-more{to="/docs/getting-started/seo-meta"}
