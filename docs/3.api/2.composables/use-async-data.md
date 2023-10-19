---
title: 'useAsyncData'
description: useAsyncData提供了一种在SSR友好的组合式中访问异步解析数据的方式。
links:
  - label: 源代码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/asyncData.ts
    size: xs
---

在你的页面、组件和插件中，你可以使用useAsyncData来获取异步解析的数据。

::callout
[`useAsyncData`](/docs/api/composables/use-async-data)是一种组合式，可以直接在设置函数、插件或路由中调用。它返回响应式的组合式，并处理将响应添加到Nuxt负载中，以便在页面水合时从服务器传递到客户端，而不需要在客户端重新获取数据。
::

## 用法

```vue [pages/index.vue]
<script setup>
const { data, pending, error, refresh } = await useAsyncData(
  'mountains',
  () => $fetch('https://api.nuxtjs.dev/mountains')
)
</script>
```

### 监听参数

内置的`watch`选项允许在检测到任何更改时自动重新运行获取器函数。

```vue [pages/index.vue]
<script setup>
const page = ref(1)
const { data: posts } = await useAsyncData(
  'posts',
  () => $fetch('https://fakeApi.com/posts', {
    params: {
      page: page.value
    }
  }), {
    watch: [page]
  }
)
</script>
```

::callout{color="amber" icon="i-ph-warning-duotone"}
[`useAsyncData`](/docs/api/composables/use-async-data)是编译器转换的保留函数名，因此你不应该将自己的函数命名为[`useAsyncData`](/docs/api/composables/use-async-data)。
::

:read-more{to="/docs/getting-started/data-fetching#useasyncdata"}

## 参数

- `key`：一个唯一的键，用于确保数据获取可以在请求中正确去重。如果不提供键，则会为`useAsyncData`的实例生成一个与文件名和行号唯一对应的键。
- `handler`：一个必须返回真值（例如，不能是`undefined`或`null`）的异步函数，否则请求可能会在客户端上重复。
- `options`：
  - `server`：是否在服务器上获取数据（默认为`true`）
  - `lazy`：是否在加载路由后解析异步函数，而不是阻塞客户端导航（默认为`false`）
  - `immediate`：当设置为`false`时，将阻止立即触发请求。（默认为`true`）
  - `default`：在异步函数解析之前，设置`data`的默认值的工厂函数 - 在`lazy: true`或`immediate: false`选项下非常有用
  - `transform`：一个在解析后可以用来修改`handler`函数结果的函数
  - `pick`：只从`handler`函数结果中选择指定的键
  - `watch`：监听响应式源以自动刷新
  - `deep`：以深层响应式对象返回数据（默认为`true`）。可以将其设置为`false`以返回浅层响应式对象的数据，如果你的数据不需要深层响应式，则可以提高性能。

::callout
在内部，`lazy: false`使用`<Suspense>`来阻止在数据获取完成之前加载路由。考虑使用`lazy: true`并实现一个加载状态，以获得更快的用户体验。
::

::read-more{to="/docs/api/composables/use-lazy-async-data"}
你可以使用`useLazyAsyncData`来实现与`lazy: true`和`useAsyncData`相同的行为。
::

## 返回值

- `data`：传入的异步函数的结果。
- `pending`：一个布尔值，指示数据是否仍在获取中。
- `refresh`/`execute`：一个可以用来刷新`handler`函数返回的数据的函数。
- `error`：如果数据获取失败，则为一个错误对象。
- `status`：一个字符串，表示数据请求的状态（`"idle"`、`"pending"`、`"success"`、`"error"`）。

默认情况下，Nuxt会等待`refresh`完成后才能再次执行它。

::callout
如果你没有在服务器上获取数据（例如，`server: false`），那么直到水合完成之前，数据将不会被获取。这意味着即使在客户端上等待[`useAsyncData`](/docs/api/composables/use-async-data)，`data`仍然为`null`。
::

## 类型

```ts [Signature]
function useAsyncData<DataT, DataE>(
  handler: (nuxtApp?: NuxtApp) => Promise<DataT>,
  options?: AsyncDataOptions<DataT>
): AsyncData<DataT, DataE>
function useAsyncData<DataT, DataE>(
  key: string,
  handler: (nuxtApp?: NuxtApp) => Promise<DataT>,
  options?: AsyncDataOptions<DataT>
): Promise<AsyncData<DataT, DataE>

type AsyncDataOptions<DataT> = {
  server?: boolean
  lazy?: boolean
  immediate?: boolean
  deep?: boolean
  default?: () => DataT | Ref<DataT> | null
  transform?: (input: DataT) => DataT
  pick?: string[]
  watch?: WatchSource[]
  getCachedData?: (key: string) => DataT
}

type AsyncData<DataT, ErrorT> = {
  data: Ref<DataT | null>
  pending: Ref<boolean>
  refresh: (opts?: AsyncDataExecuteOptions) => Promise<void>
  execute: (opts?: AsyncDataExecuteOptions) => Promise<void>
  error: Ref<ErrorT | null>
  status: Ref<AsyncDataRequestStatus>
};

interface AsyncDataExecuteOptions {
  dedupe?: boolean
}

type AsyncDataRequestStatus = 'idle' | 'pending' | 'success' | 'error'
```

:read-more{to="/docs/getting-started/data-fetching"}
