---
title: "nuxi upgrade"
description: 升级命令将 Nuxt 3 升级到最新版本。
links:
  - label: 源码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/cli/blob/main/src/commands/upgrade.ts
    size: xs
---

```bash [终端]
npx nuxi upgrade [--force|-f]
```

`upgrade` 命令将 Nuxt 3 升级到最新版本。

选项        | 默认值          | 描述
-------------------------|-----------------|------------------
`--force, -f` | `false` | 在升级之前删除 `node_modules` 和锁定文件。
