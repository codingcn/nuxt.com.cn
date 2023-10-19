---
title: "nuxi generate"
description: 预渲染应用程序的每个路由，并将结果存储为纯HTML文件。
links:
  - label: 源码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/cli/blob/main/src/commands/generate.ts
    size: xs
---

```bash [终端]
npx nuxi generate [rootDir] [--dotenv]
```

`generate` 命令会预渲染应用程序的每个路由，并将结果存储为纯HTML文件，你可以部署在任何静态托管服务上。该命令会触发 `nuxi build` 命令，并将 `prerender` 参数设置为 `true`。

选项        | 默认值          | 描述
-------------------------|-----------------|------------------
`rootDir` | `.` | 要生成的应用程序的根目录
`--dotenv` | `.` | 指定要加载的另一个 `.env` 文件，**相对于根目录**。

::read-more{to="/docs/getting-started/deployment#static-hosting"}
了解更多关于预渲染和静态托管的信息。
::
