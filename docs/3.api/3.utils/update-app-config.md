---
title: 'updateAppConfig'
description: '在运行时更新应用配置。'
links:
  - label: 源代码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/config.ts
    size: xs
---

::callout
使用深度赋值方式更新[`app.config`](/docs/guide/directory-structure/app-config)。现有的（嵌套的）属性将被保留。
::

## 使用方法

```js
const appConfig = useAppConfig() // { foo: 'bar' }

const newAppConfig = { foo: 'baz' }

updateAppConfig(newAppConfig)

console.log(appConfig) // { foo: 'baz' }
```

:read-more{to="/docs/guide/directory-structure/app-config"}
