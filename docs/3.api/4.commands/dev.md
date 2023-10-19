---
title: 'nuxi dev'
description: dev 命令在 http://localhost:3000 启动一个带有热模块替换功能的开发服务器
links:
  - label: 源码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/cli/blob/main/src/commands/dev.ts
    size: xs
---

```bash [终端]
npx nuxi dev [rootDir] [--dotenv] [--log-level] [--clipboard] [--open, -o] [--no-clear] [--port, -p] [--host, -h] [--https] [--ssl-cert] [--ssl-key]
```

`dev` 命令在 [http://localhost:3000](https://localhost:3000) 启动一个带有热模块替换功能的开发服务器。

选项        | 默认值          | 描述
-------------------------|-----------------|------------------
`rootDir` | `.` | 要提供的应用程序的根目录。
`--dotenv` | `.` | 指向要加载的另一个 `.env` 文件，**相对于根目录**。
`--clipboard` | `false` | 将 URL 复制到剪贴板。
`--open, -o` | `false` | 在浏览器中打开 URL。
`--no-clear` | `false` | 启动后不清除控制台。
`--port, -p` | `3000` | 监听的端口。
`--host, -h` | `localhost` | 服务器的主机名。
`--https` | `false` | 使用 `https` 协议监听，默认使用自签名证书。
`--ssl-cert` |`null` | 指定 https 证书。
`--ssl-key` |`null` | 指定 https 证书的密钥。

端口和主机还可以通过 NUXT_PORT、PORT、NUXT_HOST 或 HOST 环境变量进行设置。

除了上述选项，`nuxi` 还可以将选项传递给 `listhen`，例如，使用 `--no-qr` 关闭开发服务器的 QR 码。您可以在 [unjs/listhen](https://github.com/unjs/listhen) 文档中找到 `listhen` 选项的列表。

此命令将 `process.env.NODE_ENV` 设置为 `development`。

::callout
如果在开发中使用自签名证书，您需要在环境中设置 `NODE_TLS_REJECT_UNAUTHORIZED=0`。
::
