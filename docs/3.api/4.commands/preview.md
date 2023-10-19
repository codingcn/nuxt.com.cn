---
title: "nuxi preview"
description: preview命令在构建命令后启动服务器以预览应用程序。
links:
  - label: 源码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/cli/blob/main/src/commands/preview.ts
    size: xs
---


```bash [终端]
npx nuxi preview [rootDir] [--dotenv]
```

`preview` 命令在运行 `build` 命令后启动服务器以预览你的 Nuxt 应用程序。`start` 命令是 `preview` 的别名。在生产环境中运行应用程序时，请参考[部署章节](/docs/getting-started/deployment)。

选项        | 默认值          | 描述
-------------------------|-----------------|------------------
`rootDir` | `.` | 要预览的应用程序的根目录。
`--dotenv` | `.` | 指定另一个 `.env` 文件来加载，**相对于**根目录。

该命令将 `process.env.NODE_ENV` 设置为 `production`。如果要覆盖该设置，请在 `.env` 文件中定义 `NODE_ENV` 或作为命令行参数传入。

::callout
为了方便起见，在预览模式下，你的[`.env`](/docs/guide/directory-structure/env)文件将被加载到 `process.env` 中。（然而，在生产环境中，你需要确保自己设置环境变量。）
::
