---
title: "defineNuxtComponent"
description: defineNuxtComponent()是一个辅助函数，用于使用Options API定义类型安全的Vue组件。
links:
  - label: 源代码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/component.ts
    size: xs
---

::callout
`defineNuxtComponent()`是一个辅助函数，用于使用类似于[`defineComponent()`](https://vuejs.org/api/general.html#definecomponent)的Options API定义类型安全的Vue组件。`defineNuxtComponent()`包装器还支持`asyncData`和`head`组件选项。
::

::callout{color="blue" icon="i-ph-info-duotone"}
在Nuxt 3中，使用`<script setup lang="ts">`声明Vue组件是推荐的方式。
::

:read-more{to=/docs/getting-started/data-fetching}

## `asyncData()`

如果你选择不在你的应用中使用`setup()`，你可以在组件定义中使用`asyncData()`方法：

```vue [pages/index.vue]
<script lang="ts">
export default defineNuxtComponent({
  async asyncData() {
    return {
      data: {
        greetings: '你好，世界！'
      }
    }
  },
})
</script>
```

## `head()`

如果你选择不在你的应用中使用`setup()`，你可以在组件定义中使用`head()`方法：

```vue [pages/index.vue]
<script lang="ts">
export default defineNuxtComponent({
  head(nuxtApp) {
    return {
      title: '我的网站'
    }
  },
})
</script>
```
