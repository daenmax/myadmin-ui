<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="任务名称" prop="jobName">
        <el-input v-model="queryParams.jobName" placeholder="请输入任务名称" clearable style="width: 240px"
          @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="执行结果" prop="status">
        <el-select v-model="queryParams.status" placeholder="请选择执行结果" clearable style="width: 240px">
          <el-option v-for="dict in dict.type.sys_common_status" :key="dict.value" :label="dict.label"
            :value="dict.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="queryParams.remark" placeholder="请输入备注" clearable style="width: 240px"
          @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="执行时间">
        <el-date-picker v-model="dateRange" style="width: 240px" value-format="yyyy-MM-dd HH:mm:ss" type="daterange"
          range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期"
          :default-time="['00:00:00', '23:59:59']"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button type="danger" plain icon="el-icon-delete" size="mini" :disabled="multiple" @click="handleDelete"
          v-hasPermi="['monitor:jobLog:del']">删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="danger" plain icon="el-icon-delete" size="mini" @click="handleClean"
          v-hasPermi="['monitor:jobLog:del']">清空</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="warning" plain icon="el-icon-download" size="mini" @click="handleExport"
          v-hasPermi="['monitor:jobLog:export']">导出</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="info" plain icon="el-icon-close" size="mini" @click="handleClose">关闭</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="jobLogList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="日志编号" width="80" align="center" prop="id" v-if="false" />
      <el-table-column label="任务名称" align="center" prop="jobName" :show-overflow-tooltip="true" />
      <el-table-column label="调用目标字符串" align="center" prop="invokeTarget" :show-overflow-tooltip="true" />
      <el-table-column label="日志信息" align="center" prop="jobMessage" :show-overflow-tooltip="true" />
      <el-table-column label="执行结果" align="center" prop="status">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.sys_common_status" :value="scope.row.status" />
        </template>
      </el-table-column>
      <el-table-column label="执行时间" align="center" prop="createTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="remark" label="备注"></el-table-column>
      <el-table-column label="操作" align="right" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button size="mini" type="text" icon="el-icon-view" @click="handleView(scope.row)"
            v-hasPermi="['monitor:jobLog:query']">详细</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
      @pagination="getList" />

    <!-- 调度日志详细 -->
    <el-dialog title="调度日志详细" :visible.sync="open" width="1000px" append-to-body>
      <el-form ref="form" :model="form" label-width="100px" size="mini">
        <el-row>
          <el-col :span="12">
            <el-form-item label="日志序号：">{{ form.id }}</el-form-item>
            <el-form-item label="任务名称：">{{ form.jobName }}</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="调用方法：">{{ form.invokeTarget }}</el-form-item>
            <el-form-item label="执行时间：">{{ form.createTime }}</el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="执行结果：">
              <div v-if="form.status === '0'"><el-tag type="success" size="mini">成功</el-tag></div>
              <div v-else-if="form.status === '1'"><el-tag type="danger" size="mini">失败</el-tag></div>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="日志信息：">{{ form.jobMessage }}</el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="异常信息：" v-if="form.status === '1'">{{ form.exceptionInfo }}</el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="备注信息：">{{ form.remark }}</el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="open = false">关 闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { query } from "@/api/monitor/job";
import { page, del, clean, exportData } from "@/api/monitor/jobLog";

export default {
  name: "JobLog",
  dicts: ['sys_common_status'],
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 调度日志表格数据
      jobLogList: [],
      // 是否显示弹出层
      open: false,
      // 日期范围
      dateRange: [],
      // 表单参数
      form: {},
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        jobName: undefined,
        remark: undefined,
        status: undefined
      }
    };
  },
  created() {
    const jobId = this.$route.params && this.$route.params.jobId;
    if (jobId !== undefined && jobId != 0) {
      query(jobId).then(response => {
        this.queryParams.jobName = response.data.jobName;
        this.getList();
      });
    } else {
      this.getList();
    }
  },
  methods: {
    /** 查询调度日志列表 */
    getList() {
      this.loading = true;
      this.dateRange = Array.isArray(this.dateRange) ? this.dateRange : [];
      this.queryParams.startTime = this.dateRange[0]
      this.queryParams.endTime = this.dateRange[1]
      page(this.queryParams).then(response => {
        this.jobLogList = response.data.records;
        this.total = response.data.total;
        this.loading = false;
      }
      );
    },
    // 返回按钮
    handleClose() {
      const obj = { path: "/monitor/job" };
      this.$tab.closeOpenPage(obj);
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.dateRange = [];
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id);
      this.multiple = !selection.length;
    },
    /** 详细按钮操作 */
    handleView(row) {
      this.open = true;
      this.form = row;
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = this.ids;
      this.$modal.confirm('是否确认删除这' + ids.length + '条日志吗？').then(function () {
        return del(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => { });
    },
    /** 清空按钮操作 */
    handleClean() {
      this.$modal.confirm('是否确认清空所有调度日志数据项？').then(function () {
        return clean();
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("清空成功");
      }).catch(() => { });
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download(exportData, {
        ...this.queryParams
      }, `log_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
