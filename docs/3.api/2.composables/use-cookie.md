---
title: 'useCookie'
description: useCookie是一个适用于服务器端渲染（SSR）的组合函数，用于读取和写入cookie。
links:
  - label: 源代码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/cookie.ts
    size: xs
---

在你的页面、组件和插件中，你可以使用`useCookie`，一个适用于服务器端渲染（SSR）的组合函数，用于读取和写入cookie。

```ts
const cookie = useCookie(name, options)
```

::callout
`useCookie`的ref会自动将cookie值序列化和反序列化为JSON。
::

## 示例

下面的示例创建了一个名为`counter`的cookie。如果该cookie不存在，它将被初始设置为一个随机值。每当我们更新`counter`变量时，cookie也会相应地更新。

```vue [app.vue]
<script setup lang="ts">
const counter = useCookie('counter')

counter.value = counter.value || Math.round(Math.random() * 1000)
</script>

<template>
  <div>
    <h1>计数器: {{ counter || '-' }}</h1>
    <button @click="counter = null">重置</button>
    <button @click="counter--">减少</button>
    <button @click="counter++">增加</button>
  </div>
</template>
```

:link-example{to="/docs/examples/advanced/use-cookie"}

## 选项

Cookie组合函数接受几个选项，可以修改cookie的行为。

大多数选项将直接传递给[cookie](https://github.com/jshttp/cookie)包。

### `maxAge` / `expires`

使用这些选项来设置cookie的过期时间。

`maxAge`：指定一个`number`（以秒为单位）作为[`Max-Age` `Set-Cookie`属性](https://tools.ietf.org/html/rfc6265#section-5.2.2)的值。
给定的数字将被四舍五入为整数。默认情况下，不设置最大年龄。

`expires`：指定一个`Date`对象作为[`Expires` `Set-Cookie`属性](https://tools.ietf.org/html/rfc6265#section-5.2.1)的值。
默认情况下，不设置过期时间。大多数客户端将把它视为“非持久cookie”，并在条件（比如退出Web浏览器应用程序）下删除它。

::callout
[cookie存储模型规范](https://tools.ietf.org/html/rfc6265#section-5.3)指出，如果同时设置了`expires`和`maxAge`，则`maxAge`优先，但并非所有客户端都遵守这一规定，
因此，如果两者都设置了，它们应该指向相同的日期和时间！
::

::callout
如果`expires`和`maxAge`都没有设置，那么cookie将仅在会话期间存在，并在用户关闭浏览器时被删除。
::

### `httpOnly`

指定一个`boolean`值作为[`HttpOnly` `Set-Cookie`属性](https://tools.ietf.org/html/rfc6265#section-5.2.6)的值。如果为真，则设置`HttpOnly`属性；否则不设置。默认情况下，不设置`HttpOnly`属性。

::callout
当将此值设置为`true`时，请小心，因为符合规范的客户端将不允许客户端JavaScript看到`document.cookie`中的cookie。
::

### `secure`

指定一个`boolean`值作为[`Secure` `Set-Cookie`属性](https://tools.ietf.org/html/rfc6265#section-5.2.5)的值。如果为真，则设置`Secure`属性；否则不设置。默认情况下，不设置`Secure`属性。

::callout
当将此值设置为`true`时，请小心，因为符合规范的客户端将不会在将来将cookie发送回服务器，如果浏览器没有HTTPS连接，这可能导致hydration错误。
::

### `domain`

指定一个值作为[`Domain` `Set-Cookie`属性](https://tools.ietf.org/html/rfc6265#section-5.2.3)的值。默认情况下，不设置域，大多数客户端将仅将cookie应用于当前域。

### `path`

指定一个值作为[`Path` `Set-Cookie`属性](https://tools.ietf.org/html/rfc6265#section-5.2.4)的值。默认情况下，路径被认为是["默认路径"](https://tools.ietf.org/html/rfc6265#section-5.1.4)。

### `sameSite`

指定一个`boolean`或`string`值作为[`SameSite` `Set-Cookie`属性](https://tools.ietf.org/html/draft-ietf-httpbis-rfc6265bis-03#section-4.1.2.7)的值。

- `true`将`SameSite`属性设置为`Strict`以进行严格的同站点执行。
- `false`不设置`SameSite`属性。
- `'lax'`将`SameSite`属性设置为`Lax`以进行宽松的同站点执行。
- `'none'`将`SameSite`属性设置为`None`以进行明确的跨站点cookie。
- `'strict'`将`SameSite`属性设置为`Strict`以进行严格的同站点执行。

有关不同执行级别的更多信息，请参见[规范](https://tools.ietf.org/html/draft-ietf-httpbis-rfc6265bis-03#section-4.1.2.7)。

### `encode`

指定一个函数，用于编码cookie的值。由于cookie的值具有有限的字符集（必须是简单字符串），因此此函数可用于将一个值编码为适合cookie值的字符串。

默认编码器是`JSON.stringify` + `encodeURIComponent`。

### `decode`

指定一个函数，用于解码cookie的值。由于cookie的值具有有限的字符集（必须是简单字符串），因此此函数可用于将先前编码的cookie值解码为JavaScript字符串或其他对象。

默认解码器是`decodeURIComponent` + [destr](https://github.com/unjs/destr)。

::callout
如果从此函数抛出错误，则将返回原始的、未解码的cookie值作为cookie的值。
::

### `default`

指定一个返回cookie的默认值的函数。该函数还可以返回一个`Ref`。

### `watch`

指定一个`boolean`或`string`值，用于[监听](https://vuejs.org/api/reactivity-core.html#watch)cookie的ref数据。

- `true` - 将监听cookie的ref数据变化以及其嵌套属性（默认）。
- `shallow` - 只监听cookie的ref数据的顶级属性变化。
- `false` - 不监听cookie的ref数据变化。

**示例1：**

```vue
<script setup lang="ts">
const user = useCookie(
  'userInfo',
  {
    default: () => ({ score: -1 }),
    watch: false
  }
)

if (user.value && user.value !== null) {
  user.value.score++; // userInfo cookie不会随此更改而更新
}
</script>

<template>
  <div>用户分数: {{ user?.score }}</div>
</template>
```

**示例2：**

```vue
<script setup lang="ts">
const list = useCookie(
  'list',
  {
    default: () => [],
    watch: 'shallow'
  }
)

function add() {
  list.value?.push(Math.round(Math.random() * 1000))
  // list cookie不会随此更改而更新
}

function save() {
  if (list.value && list.value !== null) {
    list.value = [...list.value]
    // list cookie随此更改而更新
  }
}
</script>

<template>
  <div>
    <h1>列表</h1>
    <pre>{{ list }}</pre>
    <button @click="add">添加</button>
    <button @click="save">保存</button>
  </div>
</template>
```

## API路由中的Cookies

你可以使用[`h3`](https://github.com/unjs/h3)包中的`getCookie`和`setCookie`来在服务端API路由中设置cookie。

```ts [server/api/counter.ts]
export default defineEventHandler(event => {
  // 读取counter cookie
  let counter = getCookie(event, 'counter') || 0

   // 将counter cookie增加1
  setCookie(event, 'counter', ++counter)

  // 发送JSON响应
  return { counter }
})
```

:link-example{to="/docs/examples/advanced/use-cookie"}
