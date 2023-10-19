---
title: 'useNuxtData'
description: '访问数据获取组合函数的当前缓存值。'
links:
  - label: 源代码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/asyncData.ts
    size: xs
---

::callout
`useNuxtData` 可以让你访问到 [`useAsyncData`](/docs/api/composables/use-async-data) ，`useLazyAsyncData`，[`useFetch`](/docs/api/composables/use-fetch) 和 [`useLazyFetch`](/docs/api/composables/use-lazy-fetch) 的当前缓存值，需要显式提供键名。
::

## 用法

下面的示例展示了如何在从服务器获取最新数据时，使用缓存数据作为占位符。

```vue [pages/posts.vue]
<script setup>
// 我们可以使用 'posts' 键名后续访问相同的数据
const { data } = await useFetch('/api/posts', { key: 'posts' })
</script>
```

```ts [pages/posts/[id\\].vue]
// 访问 posts.vue（父路由）中 useFetch 的缓存值
const { id } = useRoute().params
const { data: posts } = useNuxtData('posts')
const { data } = useLazyFetch(`/api/posts/${id}`, {
  key: `post-${id}`,
  default() {
    // 从缓存中找到对应的帖子，并将其设置为默认值。
    return posts.value.find(post => post.id === id)
  }
})
```

## 乐观更新

我们可以利用缓存，在后台使数据失效的同时，在 mutation 后更新 UI。

```vue [pages/todos.vue]
<script setup>
// 我们可以使用 'todos' 键名后续访问相同的数据
const { data } = await useAsyncData('todos', () => $fetch('/api/todos'))
</script>
```

```vue [components/NewTodo.vue]
<script setup>
const newTodo = ref('')
const previousTodos = ref([])

// 访问 todos.vue 中 useFetch 的缓存值
const { data: todos } = useNuxtData('todos')

const { data } = await useFetch('/api/addTodo', {
  method: 'post',
  body: {
    todo: newTodo.value
  },
  onRequest () {
    previousTodos.value = todos.value // 将之前的缓存值存储起来，以便在请求失败时恢复数据。

    todos.value.push(newTodo.value) // 乐观地更新 todos。
  },
  onRequestError () {
    todos.value = previousTodos.value // 如果请求失败，回滚数据。
  },
  async onResponse () {
    await refreshNuxtData('todos') // 如果请求成功，后台使 todos 失效。
  }
})
</script>
```

## 类型

```ts
useNuxtData<DataT = any> (key: string): { data: Ref<DataT | null> }
```
