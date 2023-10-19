---
title: "nuxi devtools"
description: devtools命令允许你在每个项目中启用或禁用Nuxt DevTools。
links:
  - label: 源代码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/cli/blob/main/src/commands/devtools.ts
    size: xs
---

```bash [终端]
npx nuxi devtools enable|disable [rootDir]
```

运行`nuxi devtools enable`将全局安装Nuxt DevTools，并在你正在使用的特定项目中启用它。它会保存在你的用户级别的`.nuxtrc`文件中作为首选项。如果你想要移除某个项目的devtools支持，可以运行`nuxi devtools disable`。

选项        | 默认值          | 描述
-------------------------|-----------------|------------------
`rootDir` | `.` | 你想要为其启用devtools的应用程序的根目录。

::read-more{icon="i-simple-icons-nuxtdotjs" to="https://devtools.nuxt.com" target="_blank"}
了解更多关于**Nuxt DevTools**的信息。
::
