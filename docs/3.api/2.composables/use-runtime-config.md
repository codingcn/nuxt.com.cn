---
title: 'useRuntimeConfig'
description: '使用 useRuntimeConfig 组合函数访问运行时配置变量。'
links:
  - label: 源码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/asyncData.ts
    size: xs
---

## 使用方法

```vue [app.vue]
<script setup lang="ts">
const config = useRuntimeConfig()
</script>
```

```ts [server/api/foo.ts]
export default defineEventHandler((event) => {
  const config = useRuntimeConfig(event)
})
```

:read-more{to="/docs/guide/going-further/runtime-config"}

## 定义运行时配置

下面的示例展示了如何设置一个公共 API 基础 URL 和一个只在服务器端可访问的秘密 API 令牌。

我们应该始终在 `nuxt.config` 中定义 `runtimeConfig` 变量。

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  runtimeConfig: {
    // 私有密钥仅在服务器端可用
    apiSecret: '123',

    // 对客户端暴露的公共密钥
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || '/api'
    }
  }
})
```

::callout
需要在服务器端可访问的变量直接添加在 `runtimeConfig` 中。需要在客户端和服务器端都可访问的变量在 `runtimeConfig.public` 中定义。
::

:read-more{to="/docs/guide/going-further/runtime-config"}

## 访问运行时配置

要访问运行时配置，我们可以使用 `useRuntimeConfig()` 组合函数：

```ts [server/api/test.ts]
export default defineEventHandler((event) => {
  const config = useRuntimeConfig(event)

  // 访问公共变量
  const result = await $fetch(`/test`, {
    baseURL: config.public.apiBase,
    headers: {
      // 访问私有变量（仅在服务器端可用）
      Authorization: `Bearer ${config.apiSecret}`
    }
  })
  return result
}
```

在这个示例中，由于 `apiBase` 在 `public` 命名空间中定义，它在服务器端和客户端都可以访问，而 `apiSecret` **只能在服务器端访问**。

## 环境变量

可以使用以 `NUXT_` 为前缀的匹配环境变量名称来更新运行时配置的值。

:read-more{to="/docs/guide/going-further/runtime-config"}

### 使用 `.env` 文件

我们可以在 `.env` 文件中设置环境变量，以便在**开发**和**构建/生成**过程中可以访问它们。

``` [.env]
NUXT_PUBLIC_API_BASE = "https://api.localhost:5555"
NUXT_API_SECRET = "123"
```

::callout
在 `.env` 文件中设置的任何环境变量在**开发**和**构建/生成**过程中可以通过 `process.env` 在 Nuxt 应用中访问。
::

::callout{color="amber" icon="i-ph-warning-duotone"}
在**生产运行时**中，你应该使用平台环境变量，而不是使用 `.env` 文件。
::

:read-more{to="/docs/guide/directory-structure/env"}

## `app` 命名空间

Nuxt 在运行时配置中使用 `app` 命名空间，其中包括 `baseURL` 和 `cdnURL` 等键。你可以通过设置环境变量来在运行时自定义它们的值。

::callout
这是一个保留的命名空间。你不应该在 `app` 中引入其他键。
::

### `app.baseURL`

默认情况下，`baseURL` 设置为 `'/'`。

然而，可以通过设置 `NUXT_APP_BASE_URL` 作为环境变量来在运行时更新 `baseURL`。

然后，你可以使用 `config.app.baseURL` 访问这个新的基础 URL：

```ts [/plugins/my-plugin.ts]
export default defineNuxtPlugin((NuxtApp) => {
  const config = useRuntimeConfig()

  // 通用访问 baseURL
  const baseURL = config.app.baseURL
})
```

### `app.cdnURL`

这个示例展示了如何设置一个自定义的 CDN URL，并使用 `useRuntimeConfig()` 来访问它们。

你可以使用 `NUXT_APP_CDN_URL` 环境变量来为 `.output/public` 中的静态资源使用自定义 CDN。

然后可以使用 `config.app.cdnURL` 访问新的 CDN URL。

```ts [server/api/foo.ts]
export default defineEventHandler((event) => {
  const config = useRuntimeConfig()

  // 通用访问 cdnURL
  const cdnURL = config.app.cdnURL
})
```

:read-more{to="/docs/guide/going-further/runtime-config"}
