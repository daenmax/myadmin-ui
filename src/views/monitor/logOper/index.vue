<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="操作名称" prop="name">
        <el-input
          v-model="queryParams.name"
          placeholder="请输入操作名称"
          clearable
          style="width: 240px;"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="操作类型" prop="type">
        <el-select
          v-model="queryParams.type"
          placeholder="操作类型"
          clearable
          style="width: 240px"
        >
          <el-option
            v-for="dict in dict.type.sys_oper_type"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="请求方法" prop="method">
        <el-input
          v-model="queryParams.method"
          placeholder="请输入请求方法"
          clearable
          style="width: 240px;"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="请求方式" prop="requestType">
        <el-input
          v-model="queryParams.requestType"
          placeholder="请输入请求方式"
          clearable
          style="width: 240px;"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="URL" prop="requestUrl">
        <el-input
          v-model="queryParams.requestUrl"
          placeholder="请输入请求URL"
          clearable
          style="width: 240px;"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="请求者IP" prop="requestIp">
        <el-input
          v-model="queryParams.requestIp"
          placeholder="请输入请求者IP"
          clearable
          style="width: 240px;"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="请求地址" prop="requestLocation">
        <el-input
          v-model="queryParams.requestLocation"
          placeholder="请输入请求者地址"
          clearable
          style="width: 240px;"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="请求参数" prop="requestParams">
        <el-input
          v-model="queryParams.requestParams"
          placeholder="请输入请求参数"
          clearable
          style="width: 240px;"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="响应结果" prop="responseResult">
        <el-input
          v-model="queryParams.responseResult"
          placeholder="请输入响应结果"
          clearable
          style="width: 240px;"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="错误信息" prop="errorMsg">
        <el-input
          v-model="queryParams.errorMsg"
          placeholder="请输入错误信息"
          clearable
          style="width: 240px;"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="请求结果" prop="status">
        <el-select
          v-model="queryParams.status"
          placeholder="请求结果"
          clearable
          style="width: 240px"
        >
          <el-option
            v-for="dict in dict.type.sys_common_status"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="操作时间">
        <el-date-picker
          v-model="dateRange"
          style="width: 240px"
          value-format="yyyy-MM-dd HH:mm:ss"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-time="['00:00:00', '23:59:59']"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input
          v-model="queryParams.remark"
          placeholder="请输入备注"
          clearable
          style="width: 240px;"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['monitor:logOper:del']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          @click="handleClean"
          v-hasPermi="['monitor:logOper:del']"
        >清空</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['monitor:logOper:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table ref="tables" v-loading="loading" :data="list" @selection-change="handleSelectionChange" :default-sort="defaultSort" @sort-change="handleSortChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="操作ID" align="center" prop="id"  :show-overflow-tooltip="true"/>
      <el-table-column label="用户ID" align="center" prop="createId" :show-overflow-tooltip="true" />
      <el-table-column label="操作名称" align="center" prop="name"  :show-overflow-tooltip="true"/>
      <el-table-column label="操作类型" align="center" prop="type">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.sys_oper_type" :value="scope.row.type"/>
        </template>
      </el-table-column>
      <el-table-column label="请求方法" align="center" prop="method" :show-overflow-tooltip="true"/>
      <el-table-column label="请求方式" align="center" prop="requestType" />
      <el-table-column label="请求URL" align="center" prop="requestUrl"  :show-overflow-tooltip="true"/>
      <el-table-column label="请求者IP" align="center" prop="requestIp" />
      <el-table-column label="请求者地址" align="center" prop="requestLocation" width="130" :show-overflow-tooltip="true" />
      <el-table-column label="请求时间" align="center" prop="requestTime" sortable="custom" :sort-orders="['descending', 'ascending']" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.requestTime) }} </span>
        </template>
      </el-table-column>
      <el-table-column label="请求结果" align="center" prop="status">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.sys_common_status" :value="scope.row.status"/>
        </template>
      </el-table-column>
      <el-table-column label="执行耗时" align="center" prop="executeTime" sortable="custom" :sort-orders="['descending', 'ascending']" width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.executeTime }} 毫秒</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="right" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-view"
            @click="handleView(scope.row,scope.index)"
            v-hasPermi="['monitor:logOper:query']"
          >详细</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 操作日志详细 -->
    <el-dialog name="操作日志详细" :visible.sync="open" width="1000px" append-to-body>
      <el-form ref="form" :model="form" label-width="100px" size="mini">
        <el-row>
          <el-col :span="12">
            <el-form-item label="操作名称：">{{ form.name }} / {{ typeFormat(form) }}</el-form-item>
            <el-form-item
              label="登录信息："
            >{{ form.createId }} / {{ form.requestIp }} / {{ form.requestLocation }}</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="请求地址：">{{ form.requestUrl }}</el-form-item>
            <el-form-item label="请求方式："><el-tag  size="mini">{{ form.requestType }}</el-tag></el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="请求方法：">{{ form.method }}</el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="请求参数：">{{ form.requestParams }}</el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="响应结果：">{{ form.responseResult }}</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="请求结果：">
              <div v-if="form.status === '0'"><el-tag type="success" size="mini">成功</el-tag></div>
              <div v-else-if="form.status === '1'"><el-tag type="danger" size="mini">失败</el-tag></div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="执行耗时">{{ form.executeTime }}毫秒</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="请求时间：">{{ parseTime(form.requestTime) }}</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="响应时间：">{{ parseTime(form.responseTime) }}</el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="异常信息：" v-if="form.status === '1'">{{ form.errorMsg }}</el-form-item>
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
import { page, del, clean } from "@/api/monitor/logOper";
import { exportData } from '@/api/monitor/logLogin'

export default {
  name: "LogOper",
  dicts: ['sys_oper_type', 'sys_common_status'],
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
      // 表格数据
      list: [],
      // 是否显示弹出层
      open: false,
      // 日期范围
      dateRange: [],
      // 默认排序
      defaultSort: {prop: 'requestTime', order: 'descending'},
      // 表单参数
      form: {},
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        name: undefined,
        type: undefined,
        method: undefined,
        requestType: undefined,
        requestUrl: undefined,
        requestIp: undefined,
        requestLocation: undefined,
        requestParams: undefined,
        responseResult: undefined,
        errorMsg: undefined,
        remark: undefined,
        status: undefined,
        startTime: undefined,
        endTime: undefined
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询登录日志 */
    getList() {
      this.loading = true;
      this.dateRange = Array.isArray(this.dateRange) ? this.dateRange : [];
      this.queryParams.startTime=this.dateRange[0]
      this.queryParams.endTime=this.dateRange[1]
      page(this.queryParams).then( response => {
          this.list = response.data.records
          this.total = response.data.total;
          this.loading = false;
        }
      );
    },
    // 操作日志类型字典翻译
    typeFormat(row, column) {
      return this.selectDictLabel(this.dict.type.sys_oper_type, row.type);
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
      this.queryParams.pageNum = 1;
      this.$refs.tables.sort(this.defaultSort.prop, this.defaultSort.order)
    },
    /** 多选框选中数据 */
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.multiple = !selection.length
    },
    /** 排序触发事件 */
    handleSortChange(column, prop, order) {
      this.queryParams.orderByColumn = column.prop;
      this.queryParams.isAsc = column.order;
      this.getList();
    },
    /** 详细按钮操作 */
    handleView(row) {
      this.open = true;
      this.form = row;
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id ? [row.id] : this.ids;
      this.$modal.confirm('是否确认删除日志ID为"' + ids + '"的数据项？').then(function() {
        return del(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 清空按钮操作 */
    handleClean() {
      this.$modal.confirm('是否确认清空所有操作日志吗？').then(function() {
        return clean();
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("清空成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download(exportData, {
        ...this.queryParams
      }, `logOper_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>

