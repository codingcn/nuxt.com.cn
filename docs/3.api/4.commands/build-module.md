---
title: 'nuxi build-module'
description: 'nuxi build-module是一个 Nuxt 命令，用于在发布之前构建你的 Nuxt 模块。'
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/cli/blob/main/src/commands/build-module.ts
    size: xs
---


```bash [终端]
npx nuxi build-module [--stub] [rootDir]
```

`build-module` 命令会运行 `@nuxt/module-builder`，在你的 `rootDir` 中生成一个包含完整构建的 `dist` 目录，该目录用于存放你的 **nuxt-module**。

选项        | 默认值          | 描述
-------------------------|-----------------|------------------
`rootDir` | `.` | 要打包的模块的根目录。
`--stub` | `false` | 使用 [jiti](https://github.com/unjs/jiti#jiti) 在开发中对你的模块进行存根处理。（**注意：** 这主要用于开发目的。）

::read-more{to="https://github.com/nuxt/module-builder" icon="i-simple-icons-github" color="gray" target="_blank"}
了解更多关于 `@nuxt/module-builder` 的信息。
::
