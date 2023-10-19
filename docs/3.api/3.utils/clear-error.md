---
title: "clearError"
description: clearError组合函数用于清除所有已处理的错误。
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/error.ts
    size: xs
---

# `clearError`

在你的页面、组件和插件中，你可以使用 `clearError` 来清除所有已处理的错误并重定向用户。

**参数:**

- `options?: { redirect?: string }`

你可以提供一个可选的路径来进行重定向（例如，如果你想要导航到一个“安全”的页面）。

```js
// 不进行重定向
clearError()

// 进行重定向
clearError({ redirect: '/homepage' })
```

错误是通过 [`useError()`](/docs/api/composables/use-error) 来设置的。`clearError` 组合式将重置这个状态，并使用提供的选项调用 `app:error:cleared` 钩子。

:read-more{to="/docs/getting-started/error-handling"}
