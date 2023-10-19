---
title: useHeadSafe
description: 推荐的方法是使用用户输入来提供头数据。
links:
  - label: 源码
    icon: i-simple-icons-github
    to: https://github.com/unjs/unhead/blob/main/packages/unhead/src/composables/useHeadSafe.ts
    size: xs
---


`useHeadSafe` 组合函数是对 [`useHead`](/docs/api/composables/use-head) 组合函数的包装，它限制了输入值只能是安全的。

## 用法

你可以像 [`useHead`](/docs/api/composables/use-head) 一样传递所有相同的值：

```ts
useHeadSafe({
  script: [
    { id: 'xss-script', innerHTML: 'alert("xss")' }
  ],
  meta: [
    { 'http-equiv': 'refresh', content: '0;javascript:alert(1)' }
  ]
})
// 将安全地生成以下内容
// <script id="xss-script"></script>
// <meta content="0;javascript:alert(1)">
```

::阅读更多{to="https://unhead.unjs.io/usage/composables/use-head-safe" target="_blank"}::
阅读 `unhead` 文档的更多内容。

## 类型

```ts
useHeadSafe(input: MaybeComputedRef<HeadSafe>): void
```

安全值的白名单包括：

```ts
export default {
  htmlAttrs: ['id', 'class', 'lang', 'dir'],
  bodyAttrs: ['id', 'class'],
  meta: ['id', 'name', 'property', 'charset', 'content'],
  noscript: ['id', 'textContent'],
  script: ['id', 'type', 'textContent'],
  link: ['id', 'color', 'crossorigin', 'fetchpriority', 'href', 'hreflang', 'imagesrcset', 'imagesizes', 'integrity', 'media', 'referrerpolicy', 'rel', 'sizes', 'type'],
}
```

请查看[@unhead/schema](https://github.com/unjs/unhead/blob/main/packages/schema/src/safeSchema.ts)获取更详细的类型信息。
