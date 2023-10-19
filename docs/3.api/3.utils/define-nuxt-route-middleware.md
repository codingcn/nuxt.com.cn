---
title: "defineNuxtRouteMiddleware"
description: "使用defineNuxtRouteMiddleware辅助函数来创建具名的路由中间件。"
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/router.ts
    size: xs
---


路由中间件存储在Nuxt应用程序的`middleware/`目录中（除非[另有设置](/docs/api/nuxt-config#middleware)）。

## 类型

```ts
defineNuxtRouteMiddleware(middleware: RouteMiddleware) => RouteMiddleware

interface RouteMiddleware {
  (to: RouteLocationNormalized, from: RouteLocationNormalized): ReturnType<NavigationGuard>
}
```

## 参数

### `middleware`

- **类型**：`RouteMiddleware`

接受两个Vue Router的路由位置对象作为参数的函数：下一个路由`to`作为第一个参数，当前路由`from`作为第二个参数。

在**[Vue Router文档](https://router.vuejs.org/api/interfaces/RouteLocationNormalized.html)**中了解更多有关`RouteLocationNormalized`可用属性的信息。

## 示例

### 显示错误页面

您可以使用路由中间件抛出错误并显示有用的错误消息：

```ts [middleware/error.ts]
export default defineNuxtRouteMiddleware((to) => {
  if (to.params.id === '1') {
    throw createError({ statusCode: 404, statusMessage: '页面未找到' })
  }
})
```

上述路由中间件将重定向用户到`~/error.vue`文件中定义的自定义错误页面，并公开从中间件传递的错误消息和代码。

### 重定向

在路由中间件中使用[`useState`](/docs/api/composables/use-state)与`navigateTo`辅助函数结合，根据用户的身份验证状态将用户重定向到不同的路由：

```ts [middleware/auth.ts]
export default defineNuxtRouteMiddleware((to, from) => {
  const auth = useState('auth')
  
  if (!auth.value.isAuthenticated) {
    return navigateTo('/login')
  }

  if (to.path !== '/dashboard') {
    return navigateTo('/dashboard')
  }
})
```

[`navigateTo`](/docs/api/utils/navigate-to)和[`abortNavigation`](/docs/api/utils/abort-navigation)都是全局可用的辅助函数，您可以在`defineNuxtRouteMiddleware`中使用它们。
