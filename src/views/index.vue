<template>
  <div class="app-container home">
    <el-row :gutter="20">
      <el-col :sm="24" :lg="12" style="padding-left: 20px">
        <h2>MyAdmin后台管理框架</h2>
        <p>
          MyAdmin-UI 是基于 RuoYi-Vue & RuoYi-Vue-Plus 前端部分 的后台管理系统前端框架
          <br/>
          * 前端开发框架 Vue、Element UI<br/>
          * 后端开发框架 Spring Boot 3.x<br/>
          * 权限认证框架 Sa-Token、Jwt 支持多终端认证系统<br/>
          * 数据库框架 Mybatis-Plus 快速 CRUD 增加开发效率<br/>
          * 多数据源框架 dynamic-datasource 支持主从与多种类数据库异构<br/>
          * 序列化框架 Jackson 统一使用 jackson 高效可靠<br/>
          * S3云存储 支持 Minio、七牛云、阿里云、腾讯云等<br/>
          * 校验框架 Validation 增强接口安全性 严谨性<br/>
          * Excel框架 Alibaba EasyExcel 性能优异 扩展性强<br/>
          * 文档框架 SpringDoc 无注解零入侵基于java注释<br/>
          * 工具类框架 Hutool、Lombok 减少代码冗余 增加安全性<br/>
          * 代码生成器 适配MP、SpringDoc规范化代码 一键生成前后端代码<br/>
        </p>
        <p>
          <b>当前版本:</b> <span>v{{ version }}</span>
        </p>
        <p>
          <el-tag type="danger">&yen;免费开源</el-tag>
        </p>
        <p>
          <el-button
            type="primary"
            size="mini"
            icon="el-icon-cloudy"
            plain
            @click="goTarget('https://gitee.com/daenmax/myadmin')"
            >访问码云</el-button
          >
          <el-button
            type="primary"
            size="mini"
            icon="el-icon-cloudy"
            plain
            @click="goTarget('https://github.com/daenmax/myadmin')"
          >访问GitHub</el-button
          >
          <el-button
            type="primary"
            size="mini"
            icon="el-icon-cloudy"
            plain
            @click="goTarget('https://myadmin.daenx.cn/pages/07eb0b/')"
          >更新日志</el-button
          >
        </p>
      </el-col>

      <el-col :sm="24" :lg="12" style="padding-left: 50px">
        <el-row>
          <el-col :span="12">
            <h2>技术选型</h2>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <h4>后端技术</h4>
            <ul>
              <li>SpringBoot</li>
              <li>Sa-Token</li>
              <li>JWT</li>
              <li>MyBatisPlus</li>
              <li>Druid</li>
              <li>FastJson2</li>
              <li>...</li>
            </ul>
          </el-col>
          <el-col :span="6">
            <h4>前端技术</h4>
            <ul>
              <li>Vue</li>
              <li>Vuex</li>
              <li>Element-ui</li>
              <li>Axios</li>
              <li>Sass</li>
              <li>Quill</li>
              <li>...</li>
            </ul>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-divider />
  </div>
</template>

<script>
export default {
  name: "Index",
  data() {
    return {
      // 版本号
      version: process.env.VUE_APP_VERSION,
    };
  },
  methods: {
    goTarget(href) {
      window.open(href, "_blank");
    },
  },
};
</script>

<style scoped lang="scss">
.home {
  blockquote {
    padding: 10px 20px;
    margin: 0 0 20px;
    font-size: 17.5px;
    border-left: 5px solid #eee;
  }
  hr {
    margin-top: 20px;
    margin-bottom: 20px;
    border: 0;
    border-top: 1px solid #eee;
  }
  .col-item {
    margin-bottom: 20px;
  }

  ul {
    padding: 0;
    margin: 0;
  }

  font-family: "open sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 13px;
  color: #676a6c;
  overflow-x: hidden;

  ul {
    list-style-type: none;
  }

  h4 {
    margin-top: 0px;
  }

  h2 {
    margin-top: 10px;
    font-size: 26px;
    font-weight: 100;
  }

  p {
    margin-top: 10px;

    b {
      font-weight: 700;
    }
  }

  .update-log {
    ol {
      display: block;
      list-style-type: decimal;
      margin-block-start: 1em;
      margin-block-end: 1em;
      margin-inline-start: 0;
      margin-inline-end: 0;
      padding-inline-start: 40px;
    }
  }
}
</style>

