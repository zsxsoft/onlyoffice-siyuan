# Siyuan-OnlyOffice

本Repo用于集成思源笔记Docker版与OnlyOffice。由于此项目仅为应个人需求所开发，不接受任何咨询。

## 依赖
- 服务器
- 思源笔记Docker版
- OnlyOffice

## 使用
本项目分为后端（server）和挂件（widget）两个部分。

### server
- 将`server/config.json.sample`复制到`server/config.json`。
- 修改`server/config.json`，注意`siyuanUrl`和`onlyOfficeUrl`最后一个字符不要是斜杠。
- `cd server && npm install`
- 使用`./bin/www/`运行后端项目

### widget
- 找到思源笔记的`data/widgets/`，创建`onlyoffice-siyuan`文件夹，将`widget`文件夹下的内容拷贝过去。
- 修改`data/widgets/onlyoffice-siyuan/index.html`，将`apiServerHost`更改为server的运行地址。
- 在思源笔记里按`/`创建挂件，试试看。

## 示例docker-compose.yml
```yaml
version: "3"
services:
  siyuan:
    image: b3log/siyuan
    command: --workspace=/data
    restart: always
    volumes:
      - ./data:/data
    networks:
      siyuan:
  onlyoffice:
    image: node:16-alpine
    command: /app/bin/www
    restart: always
    volumes:
      - ./onlyoffice-siyuan/server:/app
      - ./data/data:/data
    networks:
      siyuan:
networks:
  siyuan:
```

## 为什么依赖于服务器？

OnlyOffice**不是**一个本地客户端，它的运作方式是，从一个指定的HTTP地址下载docx文件，保存时会把新的docx文件的**下载地址**通知指定的callback服务地址。因此要让OnlyOffice能拿到文档，就需要思源笔记Docker版本。要让OnlyOffice能够保存文件，就必须有一个callback服务和OnlyOffice同时在运行。

你当然可以不用思源笔记Docker版，自己折腾一个同步盘的HTTP服务也不是不行，但这不是我的需求。

## TODO
- [ ] 把widget的组件库换掉

## 开源协议

AGPL

