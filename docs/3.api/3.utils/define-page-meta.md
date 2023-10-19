---
title: 'definePageMeta'
description: '为你的页面组件定义元数据。'
links:
  - label: 源码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/pages/runtime/composables.ts
    size: xs
---

`definePageMeta`是一个编译器宏，你可以用它为位于[`pages/`](/docs/guide/directory-structure/pages)目录中的**页面**组件设置元数据（除非[另有设置](/docs/api/nuxt-config#pages)）。通过这种方式，你可以为Nuxt应用程序的每个静态或动态路由设置自定义元数据。

```vue [pages/some-page.vue]
<script setup lang="ts">
definePageMeta({
  layout: 'default'
})
</script>
```

:read-more{to="/docs/guide/directory-structure/pages/#page-metadata"}

## 类型

```ts
definePageMeta(meta: PageMeta) => void

interface PageMeta {
  validate?: (route: RouteLocationNormalized) => boolean | Promise<boolean> | Partial<NuxtError> | Promise<Partial<NuxtError>>
  redirect?: RouteRecordRedirectOption
  name?: string
  path?: string
  alias?: string | string[]
  pageTransition?: boolean | TransitionProps
  layoutTransition?: boolean | TransitionProps
  key?: false | string | ((route: RouteLocationNormalizedLoaded) => string)
  keepalive?: boolean | KeepAliveProps
  layout?: false | LayoutKey | Ref<LayoutKey> | ComputedRef<LayoutKey>
  middleware?: MiddlewareKey | NavigationGuard | Array<MiddlewareKey | NavigationGuard>
  scrollToTop?: boolean | ((to: RouteLocationNormalizedLoaded, from: RouteLocationNormalizedLoaded) => boolean)
  [key: string]: unknown
}
```

## 参数

### `meta`

- **类型**：`PageMeta`

  接受以下页面元数据的对象：

  **`name`**

  - **类型**：`string`

    你可以为此页面的路由定义一个名称。默认情况下，名称是根据[`pages/`目录](/docs/guide/directory-structure/pages)内的路径生成的。

  **`path`**

  - **类型**：`string`

    如果你有一个比文件名更复杂的模式，你可以定义一个路径匹配器。

  **`alias`**

  - **类型**：`string | string[]`

    记录的别名。允许定义额外的路径，这些路径将像记录的副本一样工作。允许使用类似`/users/:id`和`/u/:id`的路径简写。所有的`alias`和`path`值必须共享相同的参数。

  **`keepalive`**

  - **类型**：`boolean` | [`KeepAliveProps`](https://vuejs.org/api/built-in-components.html#keepalive)

    在切换路由或使用[`KeepAliveProps`](https://vuejs.org/api/built-in-components.html#keepalive)时，设置为`true`以保留页面状态，或进行精细控制。

  **`key`**

  - **类型**：`false` | `string` | `((route: RouteLocationNormalizedLoaded) => string)`

    当你需要更多地控制何时重新渲染`<NuxtPage>`组件时，设置`key`值。

  **`layout`**

  - **类型**：`false` | `LayoutKey` | `Ref<LayoutKey>` | `ComputedRef<LayoutKey>`

    为每个路由设置静态或动态布局的名称。如果需要禁用默认布局，可以将其设置为`false`。

  **`layoutTransition`**

  - **类型**：`boolean` | [`TransitionProps`](https://vuejs.org/api/built-in-components.html#transition)

    设置当前布局应用的过渡名称。你也可以将此值设置为`false`以禁用布局过渡。

  **`middleware`**

  - **类型**：`MiddlewareKey` | [`NavigationGuard`](https://router.vuejs.org/api/interfaces/NavigationGuard.html#navigationguard) | `Array<MiddlewareKey | NavigationGuard>`

    在`definePageMeta`内直接定义匿名或命名中间件。了解更多关于[路由中间件](/docs/guide/directory-structure/middleware)的信息。

  **`pageTransition`**

  - **类型**：`boolean` | [`TransitionProps`](https://vuejs.org/api/built-in-components.html#transition)

    设置当前页面应用的过渡名称。你也可以将此值设置为`false`以禁用页面过渡。

  **`redirect`**

  - **类型**：[`RouteRecordRedirectOption`](https://router.vuejs.org/guide/essentials/redirect-and-alias.html#redirect-and-alias)

    如果直接匹配路由，将重定向到何处。重定向发生在任何导航守卫之前，并触发以新目标位置进行的新导航。

  **`validate`**

  - **类型**：`(route: RouteLocationNormalized) => boolean | Promise<boolean> | Partial<NuxtError> | Promise<Partial<NuxtError>>`

    验证给定的路由是否可以使用此页面有效地呈现。如果有效，则返回`true`，否则返回`false`。如果找不到其他匹配，这将意味着404。你还可以直接返回一个带有`statusCode`/`statusMessage`的对象，以立即以错误响应（不会检查其他匹配）。

  **`scrollToTop`**

  - **类型**：`boolean | (to: RouteLocationNormalized, from: RouteLocationNormalized) => boolean`

    告诉Nuxt在渲染页面之前是否滚动到顶部。如果你想覆盖Nuxt的默认滚动行为，可以在`~/app/router.options.ts`中进行设置（参见[文档](/docs/guide/directory-structure/pages/#router-options)）。

  **`[key: string]`**

  - **类型**：`any`

    除了上述属性外，你还可以设置**自定义**元数据。你可能希望以类型安全的方式通过[扩充`meta`对象的类型](/docs/guide/directory-structure/pages/#typing-custom-metadata)来实现。

## 示例

### 基本用法

下面的示例演示了：

- `key`如何是一个返回值的函数；
- `keepalive`属性如何确保在多个组件之间切换时`<modal>`组件不会被缓存；
- 如何添加`pageType`作为自定义属性：

```vue [pages/some-page.vue]
<script setup lang="ts">
definePageMeta({
  key: (route) => route.fullPath,

  keepalive: {
    exclude: ['modal']
  },

  pageType: 'Checkout'
})
</script>
```

### 定义中间件

下面的示例展示了如何直接在`definePageMeta`内使用`function`定义中间件，或将其设置为与位于`middleware/`目录中的中间件文件名相匹配的`string`：

```vue [pages/some-page.vue]
<script setup lang="ts">
definePageMeta({
  // 将中间件定义为函数
  middleware: [
    function (to, from) {
      const auth = useState('auth')

      if (!auth.value.authenticated) {
          return navigateTo('/login')
      }

      if (to.path !== '/checkout') {
        return navigateTo('/checkout')
      }
    }
  ],

  // ... 或者设置为字符串
  middleware: 'auth'

  // ... 或者设置为多个字符串
  middleware: ['auth', 'another-named-middleware']
})
</script>
```

### 定义布局

你可以定义与布局文件名相匹配的布局（默认情况下位于[`layouts/`目录](/docs/guide/directory-structure/layouts)）。你也可以通过将`layout`设置为`false`来禁用布局：

```vue [pages/some-page.vue]
<script setup lang="ts">
definePageMeta({
  // 设置自定义布局
  layout: 'admin'

  // ... 或者禁用默认布局
  layout: false
})
</script>
```
