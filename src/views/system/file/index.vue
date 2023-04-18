<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="文件名" prop="fileName">
        <el-input v-model="queryParams.fileName" placeholder="请输入文件名" clearable size="small"
          @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="文件原名" prop="originalName">
        <el-input v-model="queryParams.originalName" placeholder="请输入文件原名" clearable size="small"
          @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="文件后缀" prop="fileSuffix">
        <el-input v-model="queryParams.fileSuffix" placeholder="请输入文件后缀" clearable size="small"
          @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="文件地址" prop="fileUrl">
        <el-input v-model="queryParams.fileUrl" placeholder="请输入文件地址" clearable size="small"
          @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="MD5" prop="fileMd5">
        <el-input v-model="queryParams.fileMd5" placeholder="请输入文件MD5" clearable size="small"
          @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="文件类型" prop="fileType">
        <el-input v-model="queryParams.fileType" placeholder="请输入文件类型" clearable size="small"
          @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="文件大小">
        <div class="file-size">
          <el-input class="file-size-input" v-model="queryParams.fileSizeMin" placeholder="最小字节" clearable size="small"
            @keyup.enter.native="handleQuery" />
          -
          <el-input class="file-size-input" v-model="queryParams.fileSizeMax" placeholder="最大字节" clearable size="small"
            @keyup.enter.native="handleQuery" />
        </div>
      </el-form-item>
      <el-form-item label="文件状态" prop="status">
        <el-select v-model="queryParams.status" placeholder="文件状态" clearable style="width: 240px">
          <el-option v-for="dict in dict.type.sys_normal_disable" :key="dict.value" :label="dict.label"
            :value="dict.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="OSS" prop="ossId">
        <el-select v-model="queryParams.ossId" placeholder="OSS" clearable style="width: 240px">
          <el-option v-for="ossConfig in ossConfigAllList" :key="ossConfig.id" :label="ossConfig.name"
            :value="ossConfig.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="创建时间">
        <el-date-picker v-model="dateRange" size="small" style="width: 240px" value-format="yyyy-MM-dd HH:mm:ss"
          type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期"
          :default-time="['00:00:00', '23:59:59']"></el-date-picker>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="queryParams.remark" placeholder="请输入备注" clearable size="small"
          @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button type="primary" plain icon="el-icon-plus" size="mini" @click="handleFile"
          v-hasPermi="['system:file:upload']" v-show="uploadFileShow">上传文件</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="primary" plain icon="el-icon-plus" size="mini" @click="handleImage"
          v-hasPermi="['system:file:upload']" v-show="uploadImageShow">上传图片</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="danger" plain icon="el-icon-delete" size="mini" :disabled="multiple" @click="handleDelete"
          v-hasPermi="['system:file:remove']">删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="info" plain icon="el-icon-s-operation" size="mini" @click="handleOssConfig"
          v-hasPermi="['system:ossConfig:list']">配置管理</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="fileList" @selection-change="handleSelectionChange"
      :header-cell-class-name="handleHeaderClass" @header-click="handleHeaderCLick" v-if="showTable">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="id" v-if="false" />
      <el-table-column label="文件名" align="center" prop="fileName" />
      <el-table-column label="原文件名" align="center" prop="originalName" />
      <el-table-column label="文件后缀" align="center" prop="fileSuffix">
        <template slot-scope="scope">
          <el-tag type="danger" size="mini">{{ scope.row.fileSuffix }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column label="文件展示" align="center" prop="fileUrl">
        <template slot-scope="scope">
          <ImagePreview v-if="previewListResource && checkFileSuffix(scope.row.fileSuffix)" :width=100 :height=100
            :src="scope.row.fileUrl" :preview-src-list="[scope.row.fileUrl]" />
          <span v-text="scope.row.fileUrl" v-if="!checkFileSuffix(scope.row.fileSuffix) || !previewListResource" />
        </template>
      </el-table-column>

      <el-table-column label="文件大小(字节)" align="center" prop="fileSize" />
      <el-table-column label="文件MD5" align="center" prop="fileMd5" />
      <el-table-column label="文件类型" align="center" prop="fileType">
        <template slot-scope="scope">
          <el-tag type="info" size="mini">{{ scope.row.fileType }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="所属OSS" align="center" prop="ossName">
        <template slot-scope="scope">
          <dict-tag color="red" :options="dict.type.oss_type" :value="scope.row.ossName" />
        </template>
      </el-table-column>

      <el-table-column label="文件状态" align="center" prop="status">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.sys_normal_disable" :value="scope.row.status" />
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center" prop="createTime" width="180" sortable="custom">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="备注" align="center" prop="remark" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button size="mini" type="text" icon="el-icon-download" @click="handleDownload(scope.row)"
            v-hasPermi="['system:file:download']">下载</el-button>
          <el-button size="mini" type="text" icon="el-icon-delete" @click="handleDelete(scope.row)"
            v-hasPermi="['system:file:remove']">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
      @pagination="getList" />

    <!-- 添加或修改文件对象存储对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="文件名">
          <fileUpload v-model="form.file" :limit="uploadFileConfig.limit" :fileSize="uploadFileConfig.fileSize"
            :fileType="uploadFileConfig.fileType" :isShowTip="uploadFileConfig.isShowTip" v-if="type === 0" />
          <imageUpload v-model="form.file" :limit="uploadImageConfig.limit" :fileSize="uploadImageConfig.fileSize"
            :fileType="uploadImageConfig.fileType" :isShowTip="uploadImageConfig.isShowTip" v-if="type === 1" />
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
import { listFile, delFile } from "@/api/system/file";
import { allListOssConfig } from "@/api/system/ossConfig";

export default {
  name: "File",
  dicts: ['sys_normal_disable', 'oss_type'],
  data() {
    return {
      // 文件上传限制策略
      uploadFileConfig: {},
      // 图片上传限制策略
      uploadImageConfig: {},
      showTable: true,
      // 按钮loading
      buttonLoading: false,
      // 文件上传按钮是否可见
      // 注意，只有这个参数 和 数据权限['system:file:upload'] 同时成立，按钮才会可见，是 与&& 的关系
      uploadFileShow: false,
      // 图片上传按钮是否可见
      // 注意，只有这个参数 和 数据权限['system:file:upload'] 同时成立，按钮才会可见，是 与&& 的关系
      uploadImageShow: false,
      // 遮罩层
      loading: true,
      // 导出遮罩层
      exportLoading: false,
      // 选中数组
      ids: [],
      // 选中数组
      fileNames: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // file对象存储表格数据
      fileList: [],
      // 所有配置信息列表
      ossConfigAllList: [],
      // 弹出层标题
      title: "",
      // 弹出层标题
      type: 0,
      // 是否显示弹出层
      open: false,
      // 预览列表图片
      previewListResource: true,
      // 创建时间时间范围
      dateRange: [],
      // 默认排序
      defaultSort: { prop: 'createTime', order: 'ascending' },
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        fileName: undefined,
        fileSizeMin: undefined,
        fileSizeMax: undefined,
        originalName: undefined,
        fileSuffix: undefined,
        fileUrl: undefined,
        fileMd5: undefined,
        fileType: undefined,
        status: undefined,
        createTime: undefined,
        ossId: undefined,
        startTime: undefined,
        endTime: undefined,
        remark: undefined
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        file: [
          { required: true, message: "文件不能为空", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getAllOssConfigList();
    this.getList();
  },
  methods: {
    getAllOssConfigList(){
      allListOssConfig().then(response => {
        this.ossConfigAllList = response.data
      });
    },
    /** 查询file对象存储列表 */
    getList() {
      this.loading = true;
      this.dateRange = Array.isArray(this.dateRange) ? this.dateRange : [];
      this.queryParams.startTime = this.dateRange[0]
      this.queryParams.endTime = this.dateRange[1]
      this.getConfigKey("sys.file.previewListResource").then(response => {
        this.previewListResource = response.data === undefined ? true : response.data === 'true';
      });
      this.getConfigKey("sys.upload.file").then(response => {
        if (response.data === null) {
          //null，不存在该参数
          this.uploadFileShow = true;
        } else {
          if (response.data === "") {
            //存在该参数，但是禁用了，所以禁止上传任何文件
            this.uploadFileShow = false;
          } else {
            this.uploadFileShow = true;
            this.uploadFileConfig = JSON.parse(response.data)
          }
        }
      });
      this.getConfigKey("sys.upload.image").then(response => {
        if (response.data === null) {
          //null，不存在该参数
          this.uploadImageShow = true;
        } else {
          if (response.data === "") {
            //存在该参数，但是禁用了，所以禁止上传任何文件
            this.uploadImageShow = false;
          } else {
            this.uploadImageShow = true;
          this.uploadImageConfig = JSON.parse(response.data)
          }
        }
      });
      listFile(this.queryParams).then(response => {
        this.fileList = response.data.records
        this.total = response.data.total;
        this.loading = false;
        this.showTable = true;
      });
    },
    checkFileSuffix(fileSuffix) {
      let arr = ["png", "jpg", "jpeg", "gif", "bmp"];
      return arr.some(type => {
        return fileSuffix.indexOf(type) > -1;
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
        file: undefined,
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
      this.showTable = false;
      this.dateRange = [];
      this.resetForm("queryForm");
      this.queryParams.orderByColumn = this.defaultSort.prop;
      this.queryParams.isAsc = this.defaultSort.order;
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.fileNames = selection.map(item => item.fileName)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    // 设置列的排序为我们自定义的排序
    handleHeaderClass({ column }) {
      column.order = column.multiOrder
    },
    // 点击表头进行排序
    handleHeaderCLick(column) {
      if (column.sortable !== 'custom') {
        return
      }
      switch (column.multiOrder) {
        case 'descending':
          column.multiOrder = 'ascending';
          break;
        case 'ascending':
          column.multiOrder = '';
          break;
        default:
          column.multiOrder = 'descending';
          break;
      }
      this.handleOrderChange(column.property, column.multiOrder)
    },
    handleOrderChange(prop, order) {
      let orderByArr = this.queryParams.orderByColumn ? this.queryParams.orderByColumn.split(",") : [];
      let isAscArr = this.queryParams.isAsc ? this.queryParams.isAsc.split(",") : [];
      let propIndex = orderByArr.indexOf(prop)
      if (propIndex !== -1) {
        if (order) {
          //排序里已存在 只修改排序
          isAscArr[propIndex] = order;
        } else {
          //如果order为null 则删除排序字段和属性
          isAscArr.splice(propIndex, 1);//删除排序
          orderByArr.splice(propIndex, 1);//删除属性
        }
      } else {
        //排序里不存在则新增排序
        orderByArr.push(prop);
        isAscArr.push(order);
      }
      //合并排序
      this.queryParams.orderByColumn = orderByArr.join(",");
      this.queryParams.isAsc = isAscArr.join(",");
      this.getList();
    },
    /** 配置管理 */
    handleOssConfig() {
      this.$router.push({ path: '/system/oss-config/index' })
    },
    /** 文件按钮操作 */
    handleFile() {
      this.reset();
      this.open = true;
      this.title = "上传文件";
      this.type = 0;
    },
    /** 图片按钮操作 */
    handleImage() {
      this.reset();
      this.open = true;
      this.title = "上传图片";
      this.type = 1;
    },
    /** 提交按钮 */
    submitForm() {
      this.open = false;
      this.getList();
    },
    /** 下载按钮操作 */
    handleDownload(row) {
      this.$download.file(row.id)
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const fileIds = row.id ? [row.id] : this.ids;
      const fileNames = row.fileName || this.fileNames;
      this.$modal.confirm('是否确认删除文件名为"' + fileNames + '"的数据项?').then(() => {
        this.loading = true;
        return delFile(fileIds);
      }).then(() => {
        this.loading = false;
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).finally(() => {
        this.loading = false;
      });
    }
  }
};
</script>
<style>
.file-size {
  border: 1px solid #DCDFE6;
  display: flex;
  width: 214px;
  border-radius: 3px;
  height: 36px;
}

.file-size-input .el-input__inner {
  border: 0px;
}

/* .file-size:focus {
  border: 1px solid #409EFF;
} */
</style>
