---
title: "nuxi build"
description: "构建你的Nuxt应用程序。"
links:
  - label: 源代码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/cli/blob/main/src/commands/build.ts
    size: xs
---

```bash [终端]
npx nuxi build [--prerender] [--dotenv] [--log-level] [rootDir]
```

`build`命令会创建一个名为`.output`的目录，其中包含了你的应用程序、服务器和依赖项，准备好用于生产环境。

选项        | 默认值          | 描述
-------------------------|-----------------|------------------
`rootDir` | `.` | 要打包的应用程序的根目录。
`--prerender` | `false` | 预渲染应用程序的每个路由。（**注意：** 这是一个实验性标志，行为可能会发生变化。）
`--dotenv` | `.` | 指向另一个`.env`文件的路径，**相对于根目录**。

::callout
该命令将`process.env.NODE_ENV`设置为`production`。
::
