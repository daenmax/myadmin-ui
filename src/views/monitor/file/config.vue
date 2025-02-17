<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="配置名称" prop="name">
        <el-input v-model="queryParams.name" placeholder="配置名称" clearable size="small"
          @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="存储桶名" prop="bucketName">
        <el-input v-model="queryParams.bucketName" placeholder="请输入存储桶名称" clearable size="small"
          @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="自定域名" prop="domain">
        <el-input v-model="queryParams.domain" placeholder="请输入自定义域名" clearable size="small"
          @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="权限类型" prop="accessPolicy">
        <el-select v-model="queryParams.accessPolicy" placeholder="权限类型" clearable style="width: 240px">
          <el-option v-for="dict in dict.type.sys_oss_scope" :key="dict.value" :label="dict.label"
            :value="dict.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="配置状态" prop="status">
        <el-select v-model="queryParams.status" placeholder="配置状态" clearable style="width: 240px">
          <el-option v-for="dict in dict.type.sys_normal_disable" :key="dict.value" :label="dict.label"
            :value="dict.value" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button type="primary" plain icon="el-icon-plus" size="mini" @click="handleAdd"
          v-hasPermi="['monitor:ossConfig:add']">新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="success" plain icon="el-icon-edit" size="mini" :disabled="single" @click="handleUpdate"
          v-hasPermi="['monitor:ossConfig:edit']">修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="danger" plain icon="el-icon-delete" size="mini" :disabled="multiple" @click="handleDelete"
          v-hasPermi="['monitor:ossConfig:del']">删除</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="ossConfigList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="id" v-if="false" />
      <el-table-column label="配置名称" align="center" prop="name" />
      <el-table-column label="存储桶名称" align="center" prop="bucketName" />
      <el-table-column label="前缀" align="center" prop="prefix" />
      <el-table-column label="访问站点endpoint" align="center" prop="endpoint" width="200" />
      <el-table-column label="自定义域名" align="center" prop="domain" width="200" />
      <el-table-column label="是否HTTPS" align="center" prop="isHttps">
        <template slot-scope="scope">
          <dict-tag color="red" :options="dict.type.sys_yes_no" :value="scope.row.isHttps" />
        </template>
      </el-table-column>
      <el-table-column label="地域" align="center" prop="region" />
      <el-table-column label="权限类型" align="center" prop="accessPolicy">
        <template slot-scope="scope">
          <dict-tag color="red" :options="dict.type.sys_oss_scope" :value="scope.row.accessPolicy" />
        </template>
      </el-table-column>
      <el-table-column label="当前启用" align="center" prop="status">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.inUse" active-value="1" inactive-value="0"
            @change="handleInUseChange(scope.row)"></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="配置状态" align="center" prop="status">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.status" active-value="0" inactive-value="1"
            @change="handleStatusChange(scope.row)"></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="right" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button size="mini" type="text" icon="el-icon-edit" @click="handleUpdate(scope.row)"
            v-hasPermi="['monitor:ossConfig:edit']">修改</el-button>
          <el-button size="mini" type="text" icon="el-icon-delete" @click="handleDelete(scope.row)"
            v-hasPermi="['monitor:ossConfig:del']">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
      @pagination="getList" />

    <!-- 添加或修改对象存储配置对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="800px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="160px">
        <el-form-item label="配置名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入配置名称" />
        </el-form-item>
        <el-form-item label="accessKey" prop="accessKey">
          <el-input v-model="form.accessKey" placeholder="请输入accessKey" show-password />
        </el-form-item>
        <el-form-item label="secretKey" prop="secretKey">
          <el-input v-model="form.secretKey" placeholder="请输入secretKey" show-password />
        </el-form-item>
        <el-form-item label="存储桶名称" prop="bucketName">
          <el-input v-model="form.bucketName" placeholder="请输入存储桶名称" />
        </el-form-item>
        <el-form-item label="前缀" prop="prefix">
          <el-input v-model="form.prefix" placeholder="请输入前缀" />
        </el-form-item>
        <el-form-item label="访问站点endpoint" prop="endpoint">
          <el-input v-model="form.endpoint" placeholder="请输入访问站点endpoint" />
        </el-form-item>
        <el-form-item label="自定义域名" prop="domain">
          <el-input v-model="form.domain" placeholder="请输入自定义域名" />
        </el-form-item>
        <el-form-item label="是否HTTPS">
          <el-radio-group v-model="form.isHttps">
            <el-radio v-for="dict in dict.type.sys_yes_no" :key="dict.value" :label="dict.value">{{ dict.label }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="地域" prop="region">
          <el-input v-model="form.region" placeholder="请输入地域" />
        </el-form-item>
        <el-form-item label="权限类型" prop="accessPolicy">
          <el-select v-model="form.accessPolicy" placeholder="请选择权限类型">
            <el-option v-for="item in dict.type.sys_oss_scope" :key="item.value" :label="item.label"
              :value="item.value" :disabled="item.status == 1"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="配置状态" prop="status">
          <el-radio-group v-model="form.status">
            <el-radio v-for="dict in dict.type.sys_normal_disable" :key="dict.value"
              :label="dict.value">{{ dict.label }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" type="textarea" placeholder="请输入备注" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button :loading="buttonLoading" type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

import {
  page,
  query,
  del,
  add,
  edit,
  changeStatus,
  changeInUse
} from "@/api/monitor/ossConfig";

export default {
  name: "OssConfig",
  dicts: ['sys_yes_no', 'sys_normal_disable', 'sys_oss_scope'],
  data() {
    return {
      // 按钮loading
      buttonLoading: false,
      // 遮罩层
      loading: true,
      // 导出遮罩层
      exportLoading: false,
      // 选中数组
      ids: [],
      // 选中数组
      names: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 对象存储配置表格数据
      ossConfigList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 是否https字典
      isHttpsOptions: [],
      // 状态(0正常 1停用)字典
      statusOptions: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        name: undefined,
        bucketName: undefined,
        domain: undefined,
        accessPolicy: undefined,
        status: undefined,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        name: [
          { required: true, message: "配置名称不能为空", trigger: "blur" },
        ],
        accessKey: [
          { required: true, message: "accessKey不能为空", trigger: "blur" },
          {
            min: 2,
            max: 200,
            message: "accessKey长度必须介于 2 和 100 之间",
            trigger: "blur",
          },
        ],
        secretKey: [
          { required: true, message: "secretKey不能为空", trigger: "blur" },
          {
            min: 2,
            max: 100,
            message: "secretKey长度必须介于 2 和 100 之间",
            trigger: "blur",
          },
        ],
        bucketName: [
          { required: true, message: "bucketName不能为空", trigger: "blur" },
          {
            min: 2,
            max: 100,
            message: "bucketName长度必须介于 2 和 100 之间",
            trigger: "blur",
          },
        ],
        endpoint: [
          { required: true, message: "访问站点endpoint不能为空", trigger: "blur" },
          {
            min: 2,
            max: 100,
            message: "访问站点endpoint名称长度必须介于 2 和 100 之间",
            trigger: "blur",
          },
        ],
        accessPolicy: [
          { required: true, message: "权限类型不能为空", trigger: "blur" }
        ]
      },
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询对象存储配置列表 */
    getList() {
      this.loading = true;
      page(this.queryParams).then((response) => {
        this.ossConfigList = response.data.records
        this.total = response.data.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        id: undefined,
        name: undefined,
        accessKey: undefined,
        secretKey: undefined,
        bucketName: undefined,
        prefix: undefined,
        endpoint: undefined,
        domain: undefined,
        isHttps: "0",
        region: undefined,
        accessPolicy: "0",
        inUse: "0",
        status: "0",
        remark: undefined,
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.names = selection.map(item => item.name)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加对象存储配置";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.loading = true;
      this.reset();
      const id = row.id || this.ids;
      query(id).then((response) => {
        this.loading = false;
        this.form = response.data;
        this.open = true;
        this.title = "修改对象存储配置";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.buttonLoading = true;
          if (this.form.id != null) {
            edit(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            }).finally(() => {
              this.buttonLoading = false;
            });
          } else {
            add(this.form).then(response => {
              this.$modal.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            }).finally(() => {
              this.buttonLoading = false;
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id ? [row.id] : this.ids;
      const names = row.name || this.names;
      this.$modal.confirm('是否确认删除配置名称为"' + names + '"的OSS吗?').then(() => {
        this.loading = true;
        return del(ids);
      }).then(() => {
        this.loading = false;
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).finally(() => {
        this.loading = false;
      });
    },
    // 对象存储配置使用状态修改
    handleInUseChange(row) {
      let text = row.inUse === "1" ? "切换到" : "取消使用";
      let textMsg = row.inUse === "1" ? "系统将会自动切换到该配置" : "系统将无法使用文件存储功能";
      this.$modal.confirm('确认要 ' + text + " " + row.name + ' 配置吗?' + textMsg).then(() => {
        return changeInUse(row.id, row.inUse);
      }).then(() => {
        this.getList()
        this.$modal.msgSuccess(text + "成功");
      }).catch(() => {
        row.inUse = row.inUse === "0" ? "1" : "0";
      })
    },
    // 对象存储配置状态修改
    handleStatusChange(row) {
      let text = row.status === "0" ? "启用" : "停用";
      let textMsg = row.inUse === "0" ? "" : "系统将无法使用云存储功能";
      this.$modal.confirm('确认要 ' + text + " " + row.name + ' 配置吗?' + textMsg).then(() => {
        return changeStatus(row.id, row.status);
      }).then(() => {
        this.getList()
        this.$modal.msgSuccess(text + "成功");
      }).catch(() => {
        row.status = row.status === "0" ? "1" : "0";
      })
    }
  }
};
</script>
