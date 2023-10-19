---
title: 'useNuxtApp'
description: '访问Nuxt应用程序的共享运行时上下文。'
links:
  - label: 源码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/nuxt.ts
    size: xs
---

`useNuxtApp`是一个内置的可组合函数，它提供了一种访问Nuxt共享运行时上下文的方式，该上下文在客户端和服务器端都可用。它帮助你访问Vue应用程序实例、运行时钩子、运行时配置变量和内部状态，如`ssrContext`和`payload`。

```vue [app.vue]
<script setup lang="ts">
const nuxtApp = useNuxtApp()
</script>
```

## 方法

### `provide (name, value)`

`nuxtApp`是一个运行时上下文，你可以使用[Nuxt插件](/docs/guide/directory-structure/plugins)来扩展它。使用`provide`函数创建Nuxt插件，以使值和辅助方法在你的Nuxt应用程序中的所有组合函数和组件中都可用。

`provide`函数接受`name`和`value`参数。

```js
const nuxtApp = useNuxtApp()
nuxtApp.provide('hello', (name) => `Hello ${name}!`)

// 输出 "Hello name!"
console.log(nuxtApp.$hello('name'))
```

如上面的示例所示，`$hello`已成为`nuxtApp`上下文的新的自定义部分，并且在所有可以访问`nuxtApp`的地方都可用。

### `hook(name, cb)`

`nuxtApp`中可用的钩子允许你自定义Nuxt应用程序的运行时方面。你可以在Vue.js组合函数和[Nuxt插件](/docs/guide/directory-structure/plugins)中使用运行时钩子来钩入渲染生命周期。

`hook`函数用于在特定点上的渲染生命周期中添加自定义逻辑。当创建Nuxt插件时，通常使用`hook`函数。

有关Nuxt调用的可用运行时钩子，请参阅[运行时钩子](/docs/api/advanced/hooks#app-hooks-runtime)。

```ts [plugins/test.ts]
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('page:start', () => {
    /* 在这里添加你的代码 */
  })
  nuxtApp.hook('vue:error', (..._args) => {
    console.log('vue:error')
    // if (process.client) {
    //   console.log(..._args)
    // }
  })
})
```

### `callHook(name, ...args)`

使用`callHook`调用任何现有钩子时，它会返回一个promise。

```ts
await nuxtApp.callHook('my-plugin:init')
```

## 属性

`useNuxtApp()`公开了以下属性，你可以使用它们来扩展和自定义你的应用程序并共享状态、数据和变量。

### `vueApp`

`vueApp`是全局Vue.js[应用程序实例](https://vuejs.org/api/application.html#application-api)，你可以通过`nuxtApp`访问它。

一些有用的方法：
- [`component()`](https://vuejs.org/api/application.html#app-component) - 如果同时传递名称字符串和组件定义，则注册一个全局组件，否则如果只传递名称，则检索已经注册的组件。
- [`directive()`](https://vuejs.org/api/application.html#app-directive) - 如果同时传递名称字符串和指令定义，则注册一个全局自定义指令，否则如果只传递名称，则检索已经注册的指令[(示例)](/docs/guide/directory-structure/plugins#vue-directives)。
- [`use()`](https://vuejs.org/api/application.html#app-use) - 安装一个**[Vue.js插件](https://vuejs.org/guide/reusability/plugins.html)** [(示例)](/docs/guide/directory-structure/plugins#vue-plugins)。

:read-more{icon="i-simple-icons-vuedotjs" to="https://vuejs.org/api/application.html#application-api"}

### `ssrContext`

`ssrContext`在服务器端渲染期间生成，只在服务器端可用。

Nuxt通过`ssrContext`公开以下属性：
- `url`（字符串）- 当前请求的URL。
- `event`（[unjs/h3](https://github.com/unjs/h3)请求事件）- 访问当前路由的请求和响应。
- `payload`（对象）- NuxtApp的负载对象。

### `payload`

`payload`将服务器端的数据和状态变量暴露给客户端。在从服务器端传递这些数据后，以下键将在客户端上可用：

- `serverRendered`（布尔值）- 表示响应是否是服务器端渲染的。
- `data`（对象）- 当你使用[`useFetch`](/docs/api/composables/use-fetch)或[`useAsyncData`](/docs/api/composables/use-async-data)从API端点获取数据时，可以从`payload.data`中访问结果负载。这些数据被缓存，帮助你在多次发出相同请求时避免重复获取相同的数据。

  ::code-group
  ```vue [app.vue]
  <script setup lang="ts">
  const { data } = await useAsyncData('count', () => $fetch('/api/count'))
  </script>
  ```
  ```ts [server/api/count.ts]
  export default defineEventHandler(event => {
    return { count: 1 }
  })
  ```
  ::

  在上面的示例中，使用[`useAsyncData`](/docs/api/composables/use-async-data)获取`count`的值后，如果访问`payload.data`，你将在那里看到记录的`{ count: 1 }`。

  当从[`ssrcontext`](#ssrcontext)中访问相同的`payload.data`时，你也可以在服务器端访问相同的值。

- `state`（对象）- 当你使用[`useState`](/docs/api/composables/use-state)在Nuxt中设置共享状态时，可以通过`payload.state.[name-of-your-state]`访问该状态数据。

  ```ts [plugins/my-plugin.ts]
  export const useColor = () => useState<string>('color', () => 'pink')

  export default defineNuxtPlugin((nuxtApp) => {
    if (process.server) {
      const color = useColor()
    }
  })
  ```

  还可以使用更高级的类型，如`ref`、`reactive`、`shallowRef`、`shallowReactive`和`NuxtError`。

  你还可以使用特殊的插件辅助函数添加自定义类型：

  ```ts [plugins/custom-payload.ts]
    /**
     * 这种类型的插件在Nuxt生命周期的早期运行，早于负载的恢复。
     * 你将无法访问到路由器或其他Nuxt注入的属性。
     */
  export default definePayloadPlugin((nuxtApp) => {
    definePayloadReducer('BlinkingText', data => data === '<blink>' && '_')
    definePayloadReviver('BlinkingText', () => '<blink>')
  })
  ```

### `isHydrating`

使用`nuxtApp.isHydrating`（布尔值）检查Nuxt应用程序是否在客户端进行水合。

```ts [components/nuxt-error-boundary.ts]
export default defineComponent({
  setup (_props, { slots, emit }) {
    const nuxtApp = useNuxtApp()
    onErrorCaptured((err) => {
      if (process.client && !nuxtApp.isHydrating) {
        // ...
      }
    })
  }
})
```

### `runWithContext`

::callout
你可能会遇到“Nuxt实例不可用”的消息，所以才会来到这里。请尽量少使用此方法，并报告导致问题的示例，以便最终在框架层面解决。
::

`runWithContext`方法用于调用一个函数并为其提供一个显式的Nuxt上下文。通常情况下，Nuxt上下文会在组件之间隐式传递，无需担心。然而，在中间件/插件中处理复杂的`async`/`await`场景时，可能会遇到异步调用后当前实例已被取消设置的情况。

```ts [middleware/auth.ts]
export default defineNuxtRouteMiddleware(async (to, from) => {
  const nuxtApp = useNuxtApp()
  let user
  try {
    user = await fetchUser()
    // Vue/Nuxt编译器在这里丢失了上下文，因为try/catch块中进行了操作。
  } catch (e) {
    user = null
  }
  if (!user) {
    // 将正确的Nuxt上下文应用于我们的`navigateTo`调用。  
    return nuxtApp.runWithContext(() => navigateTo('/auth'))
  }
})
```

#### 用法

```js
const result = nuxtApp.runWithContext(() => functionWithContext())
```

- `functionWithContext`：任何需要当前Nuxt应用程序上下文的函数。此上下文将自动正确应用。

`runWithContext`将返回`functionWithContext`返回的任何内容。

#### 上下文的更深入解释

Vue.js组合式API（以及类似的Nuxt可组合函数）依赖于隐式上下文。在生命周期中，Vue将当前组件的临时实例（Nuxt的nuxtApp临时实例）设置为全局变量，并在同一时钟周期内取消设置。在服务器端渲染时，有来自不同用户和nuxtApp的多个请求在同一个全局上下文中运行。因此，Nuxt和Vue会立即取消设置此全局实例，以避免在两个用户或组件之间泄漏共享引用。

这意味着什么？组合API和Nuxt Composables仅在生命周期内和在任何异步操作之前的同一时钟周期内可用：

```js
// --- Vue内部 ---
const _vueInstance = null
const getCurrentInstance = () => _vueInstance
// ---

// Vue/Nuxt在调用setup()时设置一个全局变量，引用当前组件实例（nuxtApp）
async function setup() {
  getCurrentInstance() // 可用
  await someAsyncOperation() // Vue在同一时钟周期内的异步操作之前取消设置上下文！
  getCurrentInstance() // null
}
```

解决方案是将当前实例缓存到本地变量中，例如`const instance = getCurrentInstance()`，并在下一个可组合函数调用中使用它。但问题是，现在任何嵌套的可组合函数调用都需要显式接受实例作为参数，并且不依赖于组合式API的隐式上下文。这是可组合函数的设计限制，而不是问题本身。

为了克服这个限制，Vue在编译我们的应用程序代码时做了一些幕后工作，并在每次调用`<script setup>`后恢复上下文：

```js
const __instance = getCurrentInstance() // 由Vue编译器生成
getCurrentInstance() // 可用！
await someAsyncOperation() // Vue取消设置上下文
__restoreInstance(__instance) // 由Vue编译器生成
getCurrentInstance() // 仍然可用！
```

有关Vue实际执行的工作的更好描述，请参阅[unjs/unctx＃2（评论）](https://github.com/unjs/unctx/issues/2#issuecomment-942193723)。

#### 解决方案

这就是`runWithContext`用于恢复上下文的方式，类似于`<script setup>`的工作方式。

Nuxt 3内部使用[unjs/unctx](https://github.com/unjs/unctx)来支持类似于Vue的插件和中间件的可组合函数。这使得像`navigateTo()`这样的可组合函数可以在不直接传递`nuxtApp`的情况下工作，从而将Composition API的DX和性能优势带给整个Nuxt框架。

Nuxt可组合函数与Vue Composition API具有相同的设计，因此需要类似的解决方案，以便在调用上下文恢复时自动进行此转换。请查看[unjs/unctx＃2](https://github.com/unjs/unctx/issues/2)（建议）、[unjs/unctx＃4](https://github.com/unjs/unctx/pull/4)（转换实现）和[nuxt/framework＃3884](https://github.com/nuxt/framework/pull/3884)（集成Nuxt）。

Vue目前仅支持`<script setup>`中异步上下文恢复的支持。在Nuxt 3中，已添加了对`defineNuxtPlugin()`和`defineNuxtRouteMiddleware()`的转换支持，这意味着当你使用它们时，Nuxt会自动进行上下文恢复的转换。

#### 剩余问题

自动恢复上下文的`unjs/unctx`转换似乎在包含`await`的`try/catch`语句中存在问题，这个问题最终需要解决，以消除上面提到的解决方法的要求。

#### 原生异步上下文

使用一个新的实验性功能，可以启用原生异步上下文支持，使用[Node.js `AsyncLocalStorage`](https://nodejs.org/api/async_context.html#class-asynclocalstorage)和新的unctx支持，使异步上下文**本地**可用于**任何嵌套的异步可组合函数**，无需转换或手动传递/调用上下文。

::callout
原生异步上下文支持目前在Bun和Node中可用。
::

:read-more{to="/docs/guide/going-further/experimental-features#asynccontext"}
