---
title: "nuxi typecheck"
description: typecheck命令使用vue-tsc来检查你的整个应用程序中的类型。
links:
  - label: 源码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/cli/blob/main/src/commands/typecheck.ts
    size: xs
---

```bash [终端]
npx nuxi typecheck [--log-level] [rootDir]
```

`typecheck`命令运行[`vue-tsc`](https://github.com/vuejs/language-tools/tree/master/packages/vue-tsc)来检查你的整个应用程序中的类型。

选项        | 默认值          | 描述
-------------------------|-----------------|------------------
`rootDir` | `.` | 目标应用程序的目录。

::callout
此命令将`process.env.NODE_ENV`设置为`production`。如果要覆盖，请在[`.env`](/docs/guide/directory-structure/env)文件中定义`NODE_ENV`或作为命令行参数。
::

::read-more{to="/docs/guide/concepts/typescript#type-checking"}
详细了解如何在构建或开发时启用类型检查。
::
