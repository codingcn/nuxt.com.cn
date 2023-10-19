---
title: "useRouter"
description: "useRouter 组合函数返回路由实例。"
links:
  - label: 源码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/router.ts
    size: xs
---

```vue [pages/index.vue]
<script setup>
const router = useRouter()
</script>
```

如果你只需要在模板中使用路由实例，可以使用 `$router`：

```vue [pages/index.vue]
<template>
  <button @click="$router.back()">返回</button>
</template>
```

如果你有一个 `pages/` 目录，那么 `useRouter` 的行为与 `vue-router` 提供的行为相同。

::read-more{icon="i-simple-icons-vuedotjs" to="https://router.vuejs.org/api/interfaces/Router.html#Properties-currentRoute" target="_blank"}
阅读 `vue-router` 关于 `Router` 接口的文档。
::

## 基本操作

- [`addRoute()`](https://router.vuejs.org/api/interfaces/Router.html#addRoute): 向路由实例添加新的路由。可以提供 `parentName` 将新路由添加为现有路由的子路由。
- [`removeRoute()`](https://router.vuejs.org/api/interfaces/Router.html#removeRoute): 根据名称移除现有路由。
- [`getRoutes()`](https://router.vuejs.org/api/interfaces/Router.html#getRoutes): 获取所有路由记录的完整列表。
- [`hasRoute()`](https://router.vuejs.org/api/interfaces/Router.html#hasRoute): 检查是否存在具有给定名称的路由。
- [`resolve()`](https://router.vuejs.org/api/interfaces/Router.html#resolve): 返回路由位置的规范化版本。还包括一个 `href` 属性，其中包含任何现有的基础路径。

```ts [Example]
const router = useRouter()

router.addRoute({ name: 'home', path: '/home', component: Home })
router.removeRoute('home')
router.getRoutes()
router.hasRoute('home')
router.resolve({ name: 'home' })
```

::callout
`router.addRoute()` 将路由详细信息添加到路由数组中，它在构建 [Nuxt 插件](/docs/guide/directory-structure/plugins) 时非常有用，而 `router.push()` 则立即触发新的导航，在页面、Vue 组件和组合函数中非常有用。
::

## 基于 History API

- [`back()`](https://router.vuejs.org/api/interfaces/Router.html#back): 如果可能，返回上一页，与 `router.go(-1)` 相同。
- [`forward()`](https://router.vuejs.org/api/interfaces/Router.html#forward): 如果可能，前进到下一页，与 `router.go(1)` 相同。
- [`go()`](https://router.vuejs.org/api/interfaces/Router.html#go): 在历史记录中向前或向后移动，不受 `router.back()` 和 `router.forward()` 中施加的层次结构限制。
- [`push()`](https://router.vuejs.org/api/interfaces/Router.html#push): 通过将新条目推入历史堆栈来以编程方式导航到新的 URL。**建议使用 [`navigateTo`](/docs/api/utils/navigate-to) 代替。**
- [`replace()`](https://router.vuejs.org/api/interfaces/Router.html#replace): 通过替换当前路由历史堆栈中的当前条目来以编程方式导航到新的 URL。**建议使用 [`navigateTo`](/docs/api/utils/navigate-to) 代替。**

```ts [Example]
const router = useRouter()

router.back()
router.forward()
router.go(3)
router.push({ path: "/home" })
router.replace({ hash: "#bio" })
```

::read-more{icon="i-simple-icons-mdnwebdocs" color="gray" to="https://developer.mozilla.org/en-US/docs/Web/API/History" target="_blank"}
阅读有关浏览器的 History API 的更多信息。
::

## 导航守卫

`useRouter` 组合函数提供了 `afterEach`、`beforeEach` 和 `beforeResolve` 辅助方法，它们作为导航守卫。

然而，Nuxt 有一个称为 **路由中间件** 的概念，简化了导航守卫的实现，并提供了更好的开发者体验。

:read-more{to="/docs/guide/directory-structure/middleware"}

## Promise 和错误处理

- [`isReady()`](https://router.vuejs.org/api/interfaces/Router.html#isReady): 返回一个 Promise，在路由完成初始导航时解析。
- [`onError`](https://router.vuejs.org/api/interfaces/Router.html#onError): 添加一个错误处理程序，每次导航期间发生未捕获的错误时都会调用该处理程序。

:read-more{icon="i-simple-icons-vuedotjs" to="https://router.vuejs.org/api/interfaces/Router.html#Methods" title="Vue Router 文档" target="_blank"}

## 通用路由实例

如果你没有 `pages/` 文件夹，那么 [`useRouter`](/docs/api/composables/use-router) 将返回一个类似的通用路由实例，具有类似的辅助方法，但请注意，并非所有功能都可能受支持或以与 `vue-router` 完全相同的方式运行。
