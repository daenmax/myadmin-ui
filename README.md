<h1 align="center" style="margin: 30px 0 30px; font-weight: bold;">MyAdmin</h1>
<h4 align="center">基于SpringBoot3.x开发的通用后台管理框架</h4>
<p align="center">
<a href='https://gitee.com/daenmax/myadmin/stargazers'>
<img src='https://gitee.com/daenmax/myadmin/badge/star.svg?theme=dark' alt='star'>
</a>
<a href='https://github.com/daenmax/myadmin'>
<img src='https://img.shields.io/github/stars/daenmax/myadmin.svg?style=social&label=Stars' alt='star'>
</a>
<a href="https://gitee.com/classicChickenWings/ape-frame">
<img src="https://img.shields.io/badge/version-v1.0.0-brightgreen.svg">
</a>
</p>

## 👻 致谢

因本人精力有限，故 MyAdmin-UI 是基于 [RuoYi-Vue-Plus](https://gitee.com/dromara/RuoYi-Vue-Plus/) 的前端部分进行二次开发

最后同步于 `2023/5/8 9:30`

在此特别感谢 [RuoYi-Vue-Plus](https://gitee.com/dromara/RuoYi-Vue-Plus/)

## 🐻‍❄️ 介绍

正如你所看到的，我也想做一个适用于大部分场景的快速开发框架，所以，沿用`My系列`的`MyAdmin`便诞生了

框架基于SpringBoot3.x开发，使用了Mybatis-Plus、dynamic-datasource多数据源、druid数据库连接池、Sa-Token权限认证、SpringDoc接口文档、lombok、actuator健康监控、retry重试等组件

## 🦊 链接

### 文档教程

[官网](https://myadmin.daenx.cn/)

### 在线体验

[等待部署](https://myadmin.daenx.cn/)

### 后端仓库

[MyAdmin](https://gitee.com/daenmax/myadmin)

## 🐮 开始

```bash
# 克隆项目
git clone https://gitee.com/daenmax/myadmin-ui

# 进入项目目录
cd myadmin-ui

# 安装依赖
npm install

# 建议不要直接使用 cnpm 安装依赖，会有各种诡异的 bug。可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npmmirror.com

# 启动服务
npm run dev
```

浏览器访问 http://localhost:80

## 🤖 发布

```bash
# 构建测试环境
npm run build:stage

# 构建生产环境
npm run build:prod
```

## ⚡ 反馈与交流

在使用过程中有任何问题和想法，请给我提 [Issue](https://gitee.com/daenmax/myadmin-ui/issues)

你也可以在Issue查看别人提的问题和给出解决方案。

或者加入我们的交流群：

<table>
  <tbody>
    <tr>
      <td align="center" valign="middle">
        <img src="#" alt="暂无" class="no-zoom" style="width:100px;margin: 10px;">
        <p>MyAdmin 微信群(添加我微信备注"进群")</p>
      </td>
      <td align="center" valign="middle">
        <img src="https://myadmin.daenx.cn/img/%E9%A6%96%E9%A1%B5%E5%9B%BE%E7%89%87/qqGroup.png" alt="群号: 373752019" style="width:100px;margin: 10px;">
        <p>MyAdmin QQ群: 373752019</p>
      </td>
    </tr>
  </tbody>
</table>

## 🐽 后记
