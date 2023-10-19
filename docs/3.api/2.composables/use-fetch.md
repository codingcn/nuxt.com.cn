---
title: 'useFetch'
description: '使用一个与SSR兼容的可组合函数从API端点获取数据。'
links:
  - label: 源代码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/fetch.ts
    size: xs
---

这个可组合函数提供了一个方便的封装，包装了[`useAsyncData`](/docs/api/composables/use-async-data)和[`$fetch`](/docs/api/utils/dollarfetch)。它根据URL和fetch选项自动生成一个键，根据服务器路由提供请求URL的类型提示，并推断API响应类型。

::callout
`useFetch`是一个可组合函数，可以直接在设置函数、插件或路由中调用。它返回响应式的可组合函数，并处理将响应添加到Nuxt的负载中，以便在页面水合时可以从服务器传递给客户端，而无需在客户端重新获取数据。
::

## 用法

```vue [pages/index.vue]
<script setup>
const route = useRoute()

const { data, pending, error, refresh } = await useFetch(`https://api.nuxtjs.dev/mountains/${route.params.slug}`, {
  pick: ['title']
})
</script>
```

使用`query`选项，您可以向查询中添加搜索参数。此选项是从[unjs/ofetch](https://github.com/unjs/ofetch)扩展的，并使用[unjs/ufo](https://github.com/unjs/ufo)创建URL。对象会自动转换为字符串。

```ts
const param1 = ref('value1')
const { data, pending, error, refresh } = await useFetch('https://api.nuxtjs.dev/mountains', {
  query: { param1, param2: 'value2' }
})
```

结果为`https://api.nuxtjs.dev/mountains?param1=value1&param2=value2`

您还可以使用[拦截器](https://github.com/unjs/ofetch#%EF%B8%8F-interceptors)：

```ts
const { data, pending, error, refresh } = await useFetch('/api/auth/login', {
  onRequest({ request, options }) {
    // 设置请求头
    options.headers = options.headers || {}
    options.headers.authorization = '...'
  },
  onRequestError({ request, options, error }) {
    // 处理请求错误
  },
  onResponse({ request, response, options }) {
    // 处理响应数据
    localStorage.setItem('token', response._data.token)
  },
  onResponseError({ request, response, options }) {
    // 处理响应错误
  }
})
```

::callout{color="amber" icon="i-ph-warning-duotone"}
`useFetch`是编译器转换的保留函数名，因此您不应将自定义函数命名为`useFetch`。
::

:link-example{to="/docs/examples/advanced/use-custom-fetch-composable"}

:read-more{to="/docs/getting-started/data-fetching"}

:link-example{to="/docs/examples/features/data-fetching"}

## 参数

- `URL`：要获取的URL。
- `Options`（扩展自[unjs/ofetch](https://github.com/unjs/ofetch)选项和[AsyncDataOptions](/docs/api/composables/use-async-data#params)）：
  - `method`：请求方法。
  - `query`：使用[ufo](https://github.com/unjs/ufo)将查询搜索参数添加到URL。
  - `params`：`query`的别名。
  - `body`：请求体 - 自动转换为字符串（如果传递的是对象）。
  - `headers`：请求头。
  - `baseURL`：请求的基本URL。

::callout
所有的fetch选项都可以给定`computed`或`ref`值。如果它们被更新，将自动进行新的请求。
::

- `Options`（来自[`useAsyncData`](/docs/api/composables/use-async-data)）：
  - `key`：一个唯一的键，用于确保数据获取可以在请求之间正确去重。如果未提供，将根据使用`useAsyncData`的静态代码位置生成。
  - `server`：是否在服务器上获取数据（默认为`true`）。
  - `lazy`：是否在加载路由后解析异步函数，而不是阻止客户端导航（默认为`false`）。
  - `immediate`：如果设置为`false`，将阻止立即发出请求（默认为`true`）。
  - `default`：一个工厂函数，用于设置`data`的默认值，在异步函数解析之前使用 - 与`lazy: true`或`immediate: false`选项一起使用。
  - `transform`：在解析后可以用于更改`handler`函数结果的函数。
  - `pick`：仅从`handler`函数结果中选择指定的键。
  - `watch`：监听一组响应式源，并在它们发生变化时自动刷新获取的结果。默认情况下，会监听fetch选项和URL。您可以通过使用`watch: false`来完全忽略响应式源。结合`immediate: false`，可以实现完全手动的`useFetch`。
  - `deep`：以深层ref对象的形式返回数据（默认为`true`）。可以将其设置为`false`，以在浅层ref对象中返回数据，如果您的数据不需要深层响应，则可以提高性能。

::callout
如果您将函数或ref作为`url`参数，或者如果您将函数作为`options`参数的参数传递给`useFetch`调用，即使选项似乎相同，该调用也不会与代码库中的其他`useFetch`调用匹配。如果您希望强制匹配，可以在`options`中提供自己的键。
::

## 返回值

- `data`：传入的异步函数的结果。
- `pending`：一个布尔值，指示数据是否仍在获取中。
- `refresh`/`execute`：一个可以用于刷新`handler`函数返回的数据的函数。
- `error`：如果数据获取失败，则为错误对象。
- `status`：表示数据请求的状态的字符串（"idle"、"pending"、"success"、"error"）。

默认情况下，Nuxt会等待`refresh`完成后才能再次执行。

::callout
如果您没有在服务器上获取数据（例如，使用`server: false`），那么直到水合完成之前，数据将不会被获取。这意味着即使在客户端上等待`useFetch`，`data`也将在`<script setup>`中保持为null。
::

## 类型

```ts [Signature]
function useFetch<DataT, ErrorT>(
        url: string | Request | Ref<string | Request> | () => string | Request,
        options?: UseFetchOptions<DataT>
): Promise<AsyncData<DataT, ErrorT>>

type UseFetchOptions<DataT> = {
  key?: string
  method?: string
  query?: SearchParams
  params?: SearchParams
  body?: RequestInit['body'] | Record<string, any>
  headers?: Record<string, string> | [key: string, value: string][] | Headers
  baseURL?: string
  server?: boolean
  lazy?: boolean
  immediate?: boolean
  getCachedData?: (key: string) => DataT
  deep?: boolean
  default?: () => DataT
  transform?: (input: DataT) => DataT
  pick?: string[]
  watch?: WatchSource[] | false
}

type AsyncData<DataT, ErrorT> = {
  data: Ref<DataT | null>
  pending: Ref<boolean>
  refresh: (opts?: AsyncDataExecuteOptions) => Promise<void>
  execute: (opts?: AsyncDataExecuteOptions) => Promise<void>
  error: Ref<ErrorT | null>
  status: Ref<AsyncDataRequestStatus>
}

interface AsyncDataExecuteOptions {
  dedupe?: boolean
}

type AsyncDataRequestStatus = 'idle' | 'pending' | 'success' | 'error'
```
