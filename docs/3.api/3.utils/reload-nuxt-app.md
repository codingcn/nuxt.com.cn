---
title: 'reloadNuxtApp'
description: reloadNuxtApp会对你的应用进行强制刷新。
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/chunk.ts
    size: xs
---

::callout
`reloadNuxtApp`会对你的应用进行强制刷新，重新从服务器请求页面及其依赖项。
::



默认情况下，它还会保存你的应用的当前`state`（也就是你可以通过`useState`访问的任何状态）。

你可以在`nuxt.config`文件中启用`experimental.restoreState`选项，以启用对该状态的实验性还原。

### 类型

```ts
reloadNuxtApp(options?: ReloadNuxtAppOptions)

interface ReloadNuxtAppOptions {
  ttl?: number
  force?: boolean
  path?: string
  persistState?: boolean
}
```

### `options`（可选）

**类型**: `ReloadNuxtAppOptions`

接受以下属性的对象:

- `path`（可选）

  **类型**: `string`

  **默认值**: `window.location.pathname`

  要重新加载的路径（默认为当前路径）。如果这与当前窗口位置不同，它将触发导航并在浏览器历史中添加一个条目。

- `ttl`（可选）

  **类型**: `number`

  **默认值**: `10000`

  在指定的毫秒数内忽略未来的重新加载请求。如果在此时间段内再次调用，`reloadNuxtApp`将不会重新加载你的应用程序，以避免重新加载循环。

- `force`（可选）

  **类型**: `boolean`

  **默认值**: `false`

  此选项允许完全绕过重新加载循环保护，即使在之前指定的TTL内已经发生过重新加载，也会强制重新加载。

- `persistState`（可选）

  **类型**: `boolean`

  **默认值**: `false`

  是否将当前的Nuxt状态转储到sessionStorage中（作为`nuxt:reload:state`）。默认情况下，除非同时设置了`experimental.restoreState`，否则重新加载不会产生任何效果，除非你自己处理还原状态。
