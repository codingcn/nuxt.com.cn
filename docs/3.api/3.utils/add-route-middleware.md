---
title: 'addRouteMiddleware'
description: 'addRouteMiddleware()是一个辅助函数，用于在你的应用程序中动态添加中间件'
links:
  - label: 源码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/router.ts
    size: xs
---


::callout
路由中间件是存储在 Nuxt 应用程序的 [`middleware/`](/docs/guide/directory-structure/middleware) 目录中的导航守卫（除非[另有设置](/docs/api/nuxt-config#middleware)）。
::

## 类型

```ts
addRouteMiddleware (name: string | RouteMiddleware, middleware?: RouteMiddleware, options: AddRouteMiddlewareOptions = {})
```

## 参数

### `name`

- **类型：** `string` | `RouteMiddleware`

可以是字符串或类型为 `RouteMiddleware` 的函数。该函数以下一个路由 `to` 作为第一个参数，当前路由 `from` 作为第二个参数，两者都是 Vue 路由对象。

了解更多关于[路由对象](/docs/api/composables/use-route)的可用属性。

### `middleware`

- **类型：** `RouteMiddleware`

第二个参数是类型为 `RouteMiddleware` 的函数。与上述类似，它提供了 `to` 和 `from` 路由对象。如果在 `addRouteMiddleware()` 的第一个参数中已经传递了函数，则它变为可选项。

### `options`

- **类型：** `AddRouteMiddlewareOptions`

可选的 `options` 参数允许你将 `global` 的值设置为 `true`，以指示路由中间件是否为全局的（默认为 `false`）。

## 示例

### 匿名路由中间件

匿名路由中间件没有名称。它将一个函数作为第一个参数，使第二个 `middleware` 参数变得多余：

```ts [plugins/my-plugin.ts]
export default defineNuxtPlugin(() => {
  addRouteMiddleware((to, from) => {
    if (to.path === '/forbidden') {
      return false
    }
  })
})
```

### 命名路由中间件

命名路由中间件以字符串作为第一个参数，以函数作为第二个参数。

当在插件中定义时，它会覆盖位于 `middleware/` 目录中具有相同名称的任何现有中间件：

```ts [plugins/my-plugin.ts]
export default defineNuxtPlugin(() => {
  addRouteMiddleware('named-middleware', () => {
    console.log('在 Nuxt 插件中添加了命名中间件')
  })
})
```

### 全局路由中间件

设置一个可选的第三个参数 `{ global: true }`，以指示路由中间件是否为全局的：

```ts [plugins/my-plugin.ts]
export default defineNuxtPlugin(() => {
  addRouteMiddleware('global-middleware', (to, from) => {
      console.log('在每次路由更改时运行的全局中间件')
    },
    { global: true }
  )
})
```
