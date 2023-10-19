---
title: "useState"
description: useState可组合函数创建一个响应式且支持服务器端渲染的共享状态。
links:
  - label: 源码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/state.ts
    size: xs
---

## 使用方法

```ts
// 创建一个响应式状态并设置默认值
const count = useState('counter', () => Math.round(Math.random() * 100))

```

:read-more{to="/docs/getting-started/state-management"}

::callout
由于 `useState` 中的数据将被序列化为 JSON，因此重要的是它不包含无法序列化的内容，例如类、函数或符号。
::

::callout{color="amber" icon="i-ph-warning-duotone"}
`useState` 是编译器转换的保留函数名，因此你不应该将自己的函数命名为 `useState`。
::

## 使用 `shallowRef`

如果你不需要你的状态具有深层响应性，你可以将 `useState` 与 [`shallowRef`](https://vuejs.org/api/reactivity-advanced.html#shallowref) 结合使用。当状态包含大型对象和数组时，这可以提高性能。

```ts
const state = useState('my-shallow-state', () => shallowRef({ deep: 'not reactive' }))
// isShallow(state) === true
```

## 类型

```ts
useState<T>(init?: () => T | Ref<T>): Ref<T>
useState<T>(key: string, init?: () => T | Ref<T>): Ref<T>
```

- `key`: 一个唯一的键，确保数据获取在请求中被正确地去重。如果你不提供键，则会为 [`useState`](/docs/api/composables/use-state) 的实例生成一个在文件和行号上唯一的键。
- `init`: 当未初始化时，提供状态的初始值的函数。这个函数也可以返回一个 `Ref`。
- `T`: （仅 TypeScript）指定状态的类型
