<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="标题" prop="title">
        <el-input
          v-model="queryParams.title"
          placeholder="请输入标题"
          clearable
          size="small"
          @keyup.enter.native="handlePage"
        />
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <el-input
          v-model="queryParams.content"
          placeholder="请输入内容"
          clearable
          size="small"
          @keyup.enter.native="handlePage"
        />
      </el-form-item>
      <el-form-item label="类型" prop="type">
        <el-select
          v-model="queryParams.type"
          placeholder="数据类型"
          clearable
          style="width: 240px"
        >
          <el-option
            v-for="dict in dict.type.test_data_type"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select v-model="queryParams.status" placeholder="状态" clearable style="width: 240px">
          <el-option v-for="dict in dict.type.sys_normal_disable" :key="dict.value" :label="dict.label"
            :value="dict.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input
          v-model="queryParams.remark"
          placeholder="请输入备注"
          clearable
          size="small"
          @keyup.enter.native="handlePage"
        />
      </el-form-item>
      <el-form-item label="创建时间">
        <el-date-picker
          v-model="dateRange"
          size="small"
          style="width: 240px"
          value-format="yyyy-MM-dd HH:mm:ss"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-time="['00:00:00', '23:59:59']"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handlePage">搜索-MP分页插件</el-button>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handlePage2">搜索-自己写的SQL</el-button>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handlePage3">搜索-MP自定义SQL</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['test:data:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['test:data:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['test:data:del']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="info"
          plain
          icon="el-icon-upload2"
          size="mini"
          @click="handleImport"
          v-hasPermi="['test:data:import']"
        >导入</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['test:data:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getPage"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="dataList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="id" align="center" prop="id" v-if="false"/>
      <el-table-column label="标题" align="center" prop="title" />
      <el-table-column label="内容" align="center" prop="content" />
      <el-table-column label="类型" align="center" prop="type">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.test_data_type" :value="scope.row.type"/>
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center" width="100">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.status"
            active-value="0"
            inactive-value="1"
            @change="handleDataChange(scope.row)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="备注" align="center" prop="remark" />
      <el-table-column label="创建人" align="center" prop="createName" />
      <el-table-column label="创建时间" align="center" prop="createTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="更新人" align="center" prop="updateName" />
      <el-table-column label="更新时间" align="center" prop="updateTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.updateTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="right" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['test:data:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['test:data:del']"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getPage"
    />

    <!-- 添加或修改测试数据对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="标题" prop="title">
          <el-input v-model="form.title" placeholder="请输入标题" />
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <el-input v-model="form.content" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="类型" prop="type">
          <el-select v-model="form.type" placeholder="请选择类型">
            <el-option v-for="item in dict.type.test_data_type" :key="item.value" :label="item.label"
              :value="item.value" :disabled="item.status == 1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="form.status">
            <el-radio
              v-for="dict in dict.type.sys_normal_disable"
              :key="dict.value"
              :label="dict.value"
            >{{dict.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" type="textarea" placeholder="请输入备注"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button :loading="buttonLoading" type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 用户导入对话框 -->
    <el-dialog :title="upload.title" :visible.sync="upload.open" width="400px" append-to-body>
      <el-upload
        ref="upload"
        :limit="1"
        accept=".xlsx, .xls"
        :headers="upload.headers"
        :action="upload.url + '?updateSupport=' + upload.updateSupport"
        :disabled="upload.isUploading"
        :on-progress="handleFileUploadProgress"
        :on-success="handleFileSuccess"
        :auto-upload="false"
        drag
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip text-center" slot="tip">
          <span>仅允许导入xls、xlsx格式文件。</span>
          <el-link type="primary" :underline="false" style="font-size:12px;vertical-align: baseline;" @click="importTemplate">下载模板</el-link>
        </div>
      </el-upload>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitFileForm">确 定</el-button>
        <el-button @click="upload.open = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  page,
  page2,
  page3,
  query,
  del,
  add,
  edit,
  changeStatus,
  exportData,
  importTemplate,
  importData
} from '@/api/test/data'
import {getToken} from "@/utils/auth";

export default {
  name: "Data",
  dicts: ['sys_normal_disable','test_data_type'],
  components: {
  },
  data() {
    return {
      //按钮loading
      buttonLoading: false,
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 选中数组
      titles: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 测试数据表格数据
      dataList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 创建时间时间范围
      dateRange: [],
      // 用户导入参数
      upload: {
        // 是否显示弹出层（用户导入）
        open: false,
        // 弹出层标题（用户导入）
        title: "",
        // 是否禁用上传
        isUploading: false,
        // 设置上传的请求头部
        headers: { Authorization: "Bearer " + getToken() },
        // 上传的地址
        url: process.env.VUE_APP_BASE_API + importData
      },
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        title: undefined,
        content: undefined,
        type: undefined,
        status: undefined,
        remark: undefined,
        createTime: undefined,
        startTime: undefined,
        endTime: undefined
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        title: [
          { required: true, message: "标题不能为空", trigger: "blur" }
        ],
        content: [
          { required: true, message: "内容不能为空", trigger: "blur" }
        ],
      }
    };
  },
  created() {
    this.getPage();
  },
  methods: {
    /** 分页列表1 */
    getPage() {
      this.loading = true;
      this.dateRange = Array.isArray(this.dateRange) ? this.dateRange : [];
      this.queryParams.startTime=this.dateRange[0]
      this.queryParams.endTime=this.dateRange[1]
      page(this.queryParams).then(response => {
        this.dataList = response.data.records
        this.total = response.data.total;
        this.loading = false;
      });
    },
    /** 分页列表2 */
    getPage2() {
      this.loading = true;
      this.dateRange = Array.isArray(this.dateRange) ? this.dateRange : [];
      this.queryParams.startTime=this.dateRange[0]
      this.queryParams.endTime=this.dateRange[1]
      page2(this.queryParams).then(response => {
        this.dataList = response.data.records
        this.total = response.data.total;
        this.loading = false;
      });
    },
    /** 分页列表 */
    getPage3() {
      this.loading = true;
      this.dateRange = Array.isArray(this.dateRange) ? this.dateRange : [];
      this.queryParams.startTime=this.dateRange[0]
      this.queryParams.endTime=this.dateRange[1]
      page3(this.queryParams).then(response => {
        this.dataList = response.data.records
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
        title: undefined,
        content: undefined,
        type: "0",
        status: "0",
        remark: undefined,
        createTime: undefined,
        createName: undefined,
        updateTime: undefined,
        updateName: undefined,
        isDelete: undefined
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handlePage() {
      this.queryParams.pageNum = 1;
      this.getPage();
    },
    /** 搜索按钮操作 */
    handlePage2() {
      this.queryParams.pageNum = 1;
      this.getPage2();
    },
    /** 搜索按钮操作 */
    handlePage3() {
      this.queryParams.pageNum = 1;
      this.getPage3();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.dateRange = [];
      this.resetForm("queryForm");
      this.handlePage();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加测试数据";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.loading = true;
      this.reset();
      const id = row.id || this.ids
      query(id).then(response => {
        this.loading = false;
        this.form = response.data;
        this.open = true;
        this.title = "修改测试数据";
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
              this.getPage();
            }).finally(() => {
              this.buttonLoading = false;
            });
          } else {
            add(this.form).then(response => {
              this.$modal.msgSuccess("新增成功");
              this.open = false;
              this.getPage();
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
      const titles = row.title || this.titles;
      this.$modal.confirm('是否确认删除 "' + titles + '" ？').then(() => {
        this.loading = true;
        return del(ids);
      }).then(() => {
        this.loading = false;
        this.getPage();
        this.$modal.msgSuccess("删除成功");
      }).finally(() => {
        this.loading = false;
      });
    },
    // 数据状态修改
    handleDataChange(row) {
      let text = row.status === "0" ? "启用" : "停用";
      this.$modal.confirm('确认要 ' + text + ' ' + row.title + ' 这条数据吗？').then(function() {
        return changeStatus(row.id, row.status);
      }).then(() => {
        this.$modal.msgSuccess(text + "成功");
      }).catch(function() {
        row.status = row.status === "0" ? "1" : "0";
      });
    },
    /** 导入按钮操作 */
    handleImport() {
      this.upload.title = "测试数据导入";
      this.upload.open = true;
    },
    /** 下载模板操作 */
    importTemplate() {
      this.download(importTemplate, {
      }, `data_template_${new Date().getTime()}.xlsx`)
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download(exportData, {
        ...this.queryParams
      }, `data_${new Date().getTime()}.xlsx`)
    },
    // 文件上传中处理
    handleFileUploadProgress(event, file, fileList) {
      this.upload.isUploading = true;
    },
    // 文件上传成功处理
    handleFileSuccess(response, file, fileList) {
      this.upload.open = false;
      this.upload.isUploading = false;
      this.$refs.upload.clearFiles();
      this.$alert(response.msg + "->" + response.data, "导入结果", { dangerouslyUseHTMLString: true });
      this.getPage();
    },
    // 提交上传文件
    submitFileForm() {
      this.$refs.upload.submit();
    }
  }
};
</script>
