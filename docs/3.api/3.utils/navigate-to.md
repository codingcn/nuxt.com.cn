---
title: "navigateTo"
description: navigateTo是一个帮助函数，用于以编程方式导航用户。
links:
  - label: 源代码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/router.ts
    size: xs
---

::callout
`navigateTo`在服务器端和客户端均可使用。
::

## 用法

### 在Vue组件中

```vue
<script setup lang="ts">
// 将'to'作为字符串传递
await navigateTo('/search')

// ... 或者作为路由对象传递
await navigateTo({ path: '/search' })

// ... 或者作为带有查询参数的路由对象传递
await navigateTo({
  path: '/search',
  query: {
    page: 1,
    sort: 'asc'
  }
})
</script>
```

### 在路由中间件中

```ts
export default defineNuxtRouteMiddleware((to, from) => {
  if (to.path !== '/search') {
    // 将重定向代码设置为'301 Moved Permanently'
    return navigateTo('/search', { redirectCode: 301 })
  }
})
```

:read-more{to="/docs/guide/directory-structure/middleware"}

### 外部URL

```vue
<script setup lang="ts">
// 将抛出错误；
// 默认情况下不允许导航到外部URL
await navigateTo('https://nuxt.com')

// 设置'external'参数为'true'，将成功重定向
await navigateTo('https://nuxt.com', {
  external: true
})
</script>
```

### 使用open()

```vue
<script setup lang="ts">
// 将在新标签页中打开'https://nuxt.com'
await navigateTo('https://nuxt.com', {  
  open: {
    target: '_blank',
    windowFeatures: {
      width: 500,
      height: 500
    }
  }
})
</script>
```

## 类型

```ts
navigateTo(to: RouteLocationRaw | undefined | null, options?: NavigateToOptions) => Promise<void | NavigationFailure> | RouteLocationRaw

interface NavigateToOptions {
  replace?: boolean
  redirectCode?: number
  external?: boolean
  open?: OpenOptions
}
```

::callout{color="amber" icon="i-ph-warning-duotone"}
调用`navigateTo`时，请确保始终使用`await`或`return`来处理其结果。
::

## 参数

### `to`

**类型**：[`RouteLocationRaw`](https://router.vuejs.org/api/interfaces/RouteLocation.html) | `undefined` | `null`

**默认值**：`'/'`

`to`可以是一个简单的字符串或一个重定向的路由对象。当传递`undefined`或`null`时，它将默认为`'/'`。

### `options`（可选）

**类型**：`NavigateToOptions`

接受以下属性的对象：

- `replace`（可选）

  **类型**：`boolean`

  **默认值**：`false`

  默认情况下，`navigateTo`会将给定的路由推入Vue Router的实例中（客户端）。

  可以通过将`replace`设置为`true`来改变此行为，表示应该替换给定的路由。

- `redirectCode`（可选）

  **类型**：`number`

  **默认值**：`302`

  当重定向发生在服务器端时，默认情况下，`navigateTo`将重定向到给定的路径，并将重定向代码设置为[`302 Found`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/302)。

  可以通过提供不同的`redirectCode`来修改此默认行为。通常，可以使用[`301 Moved Permanently`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/301)进行永久重定向。

- `external`（可选）

  **类型**：`boolean`

  **默认值**：`false`

  当设置为`true`时，允许导航到外部URL。否则，`navigateTo`将抛出错误，因为默认情况下不允许外部导航。

- `open`（可选）

  **类型**：`OpenOptions`

  允许使用窗口的[open()](https://developer.mozilla.org/en-US/docs/Web/API/Window/open)方法导航到URL。此选项仅在客户端上有效，并在服务器端上被忽略。

  接受以下属性的对象：

  - `target`

    **类型**：`string`

    **默认值**：`'_blank'`

    字符串，不包含空格，指定要加载资源的浏览上下文的名称。

  - `windowFeatures`（可选）

    **类型**：`OpenWindowFeatures`

    接受以下属性的对象：

    - `popup`（可选）

      **类型**：`boolean`

    - `width`或`innerWidth`（可选）

      **类型**：`number`

    - `height`或`innerHeight`（可选）

      **类型**：`number`

    - `left`或`screenX`（可选）

      **类型**：`number`

    - `top`或`screenY`（可选）

      **类型**：`number`

    - `noopener`（可选）

      **类型**：`boolean`

    - `noreferrer`（可选）

      **类型**：`boolean`

    有关**windowFeatures**属性的更详细信息，请参阅[文档](https://developer.mozilla.org/en-US/docs/Web/API/Window/open)。
