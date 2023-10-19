---
title: 'defineRouteRules'
description: '定义页面级别的混合渲染路由规则。'
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/pages/runtime/composables.ts
    size: xs
---




::read-more{to="/docs/guide/going-further/experimental-features#inlinerouterules" icon="i-ph-star-duotone"}
此功能是实验性的，要使用它，您必须在`nuxt.config`中启用`experimental.inlineRouteRules`选项。
::

### 使用方法

```vue [pages/index.vue]
<script setup>
defineRouteRules({
  prerender: true
})
</script>

<template>
  <h1>你好，世界！</h1>
</template>
```

将被翻译为：

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  routeRules: {
    '/': { prerender: true }
  }
})
```

::callout
当运行[`nuxt build`](/docs/api/commands/build)时，主页将在`.output/public/index.html`中进行预渲染并静态提供服务。
::

### 注意事项

- 在`~/pages/foo/bar.vue`中定义的规则将应用于`/foo/bar`请求。
- 在`~/pages/foo/[id].vue`中的规则将应用于`/foo/**`请求。

如果您需要更多控制，例如如果您在页面的[`definePageMeta`](/docs/api/utils/define-page-meta)中使用自定义的`path`或`alias`设置，您应该直接在`nuxt.config`中设置`routeRules`。

::read-more{to="/docs/guide/concepts/rendering#hybrid-rendering" icon="i-ph-medal-duotone"}
阅读更多关于`routeRules`的内容。
::
