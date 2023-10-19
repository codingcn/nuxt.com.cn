---
title: 'nuxi prepare'
description: prepare命令会在你的应用程序中创建一个.nuxt目录，并生成类型。
links:
  - label: 源代码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/cli/blob/main/src/commands/prepare.ts
    size: xs
---

```bash [终端]
npx nuxi prepare [--log-level] [rootDir]
```

`prepare` 命令会在你的应用程序中创建一个 [`.nuxt`](/docs/guide/directory-structure/nuxt) 目录，并生成类型。这在 CI 环境中或作为 [`package.json`](/docs/guide/directory-structure/package) 中的 `postinstall` 命令中非常有用。

选项        | 默认值          | 描述
-------------------------|-----------------|------------------
`rootDir` | `.` | 准备应用程序的根目录。
