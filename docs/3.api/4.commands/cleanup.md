---
title: 'nuxi clean'
description: "删除常见生成的 Nuxt 文件和缓存。"
links:
  - label: 源代码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/cli/blob/main/src/commands/cleanup.ts
    size: xs
---

```bash [终端]
npx nuxi clean|cleanup [rootDir]
```

`cleanup` 命令会删除常见生成的 Nuxt 文件和缓存，包括：
- `.nuxt`
- `.output`
- `node_modules/.vite`
- `node_modules/.cache`

选项        | 默认值          | 描述
-------------------------|-----------------|------------------
`rootDir` | `.` | 项目的根目录。
