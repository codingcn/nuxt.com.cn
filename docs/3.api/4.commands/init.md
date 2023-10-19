---
title: "nuxi init"
description: init命令用于初始化一个全新的 Nuxt 项目。
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/cli/blob/main/src/commands/init.ts
    size: xs
---


```bash [终端]
npx nuxi init|create [--verbose|-v] [--template,-t] [dir]
```

`init` 命令使用 [unjs/giget](https://github.com/unjs/giget) 初始化一个全新的 Nuxt 项目。

## 选项

选项        | 默认值          | 描述
-------------------------|-----------------|------------------
`--template, -t` | `v3` | 指定要使用的模板名称或 git 仓库作为模板。格式为 `gh:org/name`，以使用自定义的 GitHub 模板。
`--force`      | `false` | 强制克隆到任何现有目录。
`--offline`   | `false` | 不尝试从 GitHub 下载，仅使用本地缓存。
`--prefer-offline` | `false` | 首先尝试使用本地缓存来下载模板。
`--shell` | `false` | 在克隆的目录中打开 shell（实验性功能）。

## 环境变量

- `NUXI_INIT_REGISTRY`：设置自定义模板注册表。([了解更多](https://github.com/unjs/giget#custom-registry))
  - 默认注册表从 [nuxt/starter/templates](https://github.com/nuxt/starter/tree/templates/templates) 加载。
