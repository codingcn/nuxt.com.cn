---
title: 'showError'
description: Nuxt 提供了一种快速简单的方式来显示全屏错误页面。
links:
  - label: 源代码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/error.ts
    size: xs
---

在你的页面、组件和插件中，你可以使用 `showError` 来显示错误。

**参数:**

- `error`: `string | Error | Partial<{ cause, data, message, name, stack, statusCode, statusMessage }>`

```ts
showError("😱 哦不，一个错误被抛出了。")
showError({
  statusCode: 404,
  statusMessage: "页面未找到"
})
```

通过使用 [`useError()`](/docs/api/composables/use-error) 将错误设置到状态中，可以在组件之间创建一个响应式且支持 SSR 的共享错误状态。

::callout
`showError` 调用了 `app:error` 钩子。
::

:read-more{to="/docs/getting-started/error-handling"}
