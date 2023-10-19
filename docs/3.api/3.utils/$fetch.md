---
title: "$fetch"
description: Nuxt使用ofetch来全局暴露`$fetch`辅助函数，用于在Vue应用程序或API路由中进行HTTP请求。
links:
  - label: 源码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/entry.ts
    size: xs
---


Nuxt使用[ofetch](https://github.com/unjs/ofetch)来全局暴露`$fetch`辅助函数，用于在Vue应用程序或API路由中进行HTTP请求。

::callout{icon="i-ph-rocket-launch-duotone"}
在服务器端渲染期间，调用`$fetch`来获取内部[API路由](/docs/guide/directory-structure/server)将直接调用相关函数（模拟请求），**节省了额外的API调用**。
::

::callout{color="blue" icon="i-ph-info-duotone"}
在组件中使用`$fetch`而不使用[`useAsyncData`](/docs/api/composables/use-async-data)进行包装会导致数据被获取两次：首先在服务器端获取，然后在客户端进行混合渲染期间再次获取，因为`$fetch`不会将状态从服务器传递到客户端。因此，获取将在两端执行，因为客户端需要再次获取数据。
::

我们建议在获取组件数据时使用[`useFetch`](/docs/api/composables/use-fetch)或[`useAsyncData`](/docs/api/composables/use-async-data) + `$fetch`来防止重复获取数据。

```vue [app.vue]
<script setup lang="ts">
// 在SSR中数据将被获取两次，一次在服务器端，一次在客户端。
const dataTwice = await $fetch('/api/item')

// 在SSR中，数据仅在服务器端获取并传递到客户端。
const { data } = await useAsyncData('item', () => $fetch('/api/item'))

// 你也可以使用useFetch作为useAsyncData + $fetch的快捷方式
const { data } = await useFetch('/api/item')
</script>
```

:read-more{to="/docs/getting-started/data-fetching"}

你可以在只在客户端执行的任何方法中使用`$fetch`。

```vue [pages/contact.vue]
<script setup lang="ts">
function contactForm() {
  $fetch('/api/contact', {
    method: 'POST',
    body: { hello: 'world '}
  })
}
</script>

<template>
  <button @click="contactForm">联系我们</button>
</template>
```

::callout
`$fetch`是在Nuxt中进行HTTP调用的首选方式，而不是为Nuxt 2设计的[@nuxt/http](https://github.com/nuxt/http)和[@nuxtjs/axios](https://github.com/nuxt-community/axios-module)。
::
