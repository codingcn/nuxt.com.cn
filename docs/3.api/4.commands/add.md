---
title: "nuxi add"
description: "在你的Nuxt应用程序中创建一个实体脚手架。"
links:
  - label: 源代码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/cli/blob/main/src/commands/add.ts
    size: xs
---

```bash [终端]
npx nuxi add [--cwd] [--force] <TEMPLATE> <NAME>
```

选项        | 默认值          | 描述
-------------------------|-----------------|------------------
`TEMPLATE` | - | 指定要生成的文件的模板。
`NAME` | - | 指定要创建的文件的名称。
`--cwd` | `.` | 目标应用程序的目录。
`--force` | `false` | 如果文件已经存在，则强制覆盖。

**修饰符:**

某些模板支持额外的修饰符标志，用于在名称后面添加后缀（如`.client`或`.get`）。

```bash [终端]
# 生成 `/plugins/sockets.client.ts`
npx nuxi add plugin sockets --client
```

## `nuxi add component`

* 修饰符标志: `--mode client|server` 或者 `--client` 或者 `--server`

```bash [终端]
# 生成 `components/TheHeader.vue`
npx nuxi add component TheHeader
```

## `nuxi add composable`

```bash [终端]
# 生成 `composables/foo.ts`
npx nuxi add composable foo
```

## `nuxi add layout`

```bash [终端]
# 生成 `layouts/custom.vue`
npx nuxi add layout custom
```

## `nuxi add plugin`

* 修饰符标志: `--mode client|server` 或者 `--client` 或者 `--server`

```bash [终端]
# 生成 `plugins/analytics.ts`
npx nuxi add plugin analytics
```

## `nuxi add page`

```bash [终端]
# 生成 `pages/about.vue`
npx nuxi add page about
```

```bash [终端]
# 生成 `pages/category/[id].vue`
npx nuxi add page "category/[id]"
```

## `nuxi add middleware`

* 修饰符标志: `--global`

```bash [终端]
# 生成 `middleware/auth.ts`
npx nuxi add middleware auth
```

## `nuxi add api`

* 修饰符标志: `--method`（可以接受`connect`、`delete`、`get`、`head`、`options`、`patch`、`post`、`put`或`trace`），或者你可以直接使用`--get`、`--post`等。

```bash [终端]
# 生成 `server/api/hello.ts`
npx nuxi add api hello
```
