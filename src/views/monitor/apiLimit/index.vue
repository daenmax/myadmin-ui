<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="接口名称" prop="apiName">
        <el-input v-model="queryParams.apiName" placeholder="请输入接口名称" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="接口uri" prop="apiUri">
        <el-input v-model="queryParams.apiUri" placeholder="请输入接口uri" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="限制类型" prop="limitType">
        <el-select v-model="queryParams.limitType" placeholder="请选择限制类型" clearable>
          <el-option v-for="dict in dict.type.sys_api_limit_type" :key="dict.value" :label="dict.label"
            :value="dict.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="限制状态" prop="status">
        <el-select v-model="queryParams.status" placeholder="请选择限制状态" clearable>
          <el-option v-for="dict in dict.type.sys_normal_disable" :key="dict.value" :label="dict.label"
            :value="dict.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="停用提示" prop="retMsg">
        <el-input v-model="queryParams.retMsg" placeholder="请输入停用提示" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="queryParams.remark" placeholder="请输入备注" clearable style="width: 240px;"
          @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button type="primary" plain icon="el-icon-plus" size="mini" @click="handleAdd"
          v-hasPermi="['monitor:apiLimit:add']">新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="success" plain icon="el-icon-edit" size="mini" :disabled="single" @click="handleUpdate"
          v-hasPermi="['monitor:apiLimit:edit']">修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="danger" plain icon="el-icon-delete" size="mini" :disabled="multiple" @click="handleDelete"
          v-hasPermi="['monitor:apiLimit:remove']">删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="danger" plain icon="el-icon-refresh" size="mini" @click="handleRefreshCache"
          v-hasPermi="['monitor:apiLimit:refreshCache']">刷新缓存</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>
    <el-table v-loading="loading" :data="apiLimitList" @selection-change="handleSelectionChange"
      :default-sort="defaultSort" @sort-change="handleSortChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" width="100" align="center" prop="id" v-if="false" />
      <el-table-column label="接口名称" align="center" prop="apiName" :show-overflow-tooltip="true" />
      <el-table-column label="接口uri" align="center" prop="apiUri" :show-overflow-tooltip="true" />
      <el-table-column label="单个用户限制策略" align="center" prop="single" width="150">
        <template slot-scope="scope">
          <span>{{ showTrans(scope.row.singleTime, scope.row.singleFrequency, scope.row.singleTimeUnit) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="全部用户限制策略" align="center" prop="whole" width="150">
        <template slot-scope="scope">
          <span>{{ showTrans(scope.row.wholeTime, scope.row.wholeFrequency, scope.row.wholeTimeUnit) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="限制类型" align="center" prop="limitType">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.sys_api_limit_type" :value="scope.row.limitType" />
        </template>
      </el-table-column>
      <el-table-column label="停用提示" align="center" prop="retMsg" :show-overflow-tooltip="true" />
      <el-table-column label="创建时间" align="center" prop="createTime" sortable="custom"
        :sort-orders="['descending', 'ascending']" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime) }} </span>
        </template>
      </el-table-column>
      <el-table-column label="限制状态" align="center">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.status" active-value="0" inactive-value="1"
            @change="handleStatusChange(scope.row)"></el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="remark" label="备注"></el-table-column>
      <el-table-column label="操作" align="right" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button size="mini" type="text" icon="el-icon-edit" @click="handleUpdate(scope.row)"
            v-hasPermi="['monitor:apiLimit:edit']">修改</el-button>
          <el-button size="mini" type="text" icon="el-icon-delete" @click="handleDelete(scope.row)"
            v-hasPermi="['monitor:apiLimit:remove']">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
      @pagination="getList" />

    <!-- 添加或修改对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="800px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="接口名称" prop="apiName">
              <el-input v-model="form.apiName" placeholder="请输入接口名称" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="接口uri" prop="apiUri">
              <el-input v-model="form.apiUri" placeholder="请输入接口uri" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item prop="limitType">
              <span slot="label">
                限制类型
                <el-tooltip placement="top">
                  <div slot="content">
                    当选择限流时，可以设置当前接口对单个用户和全部用户的限制，可以同时存在，也可以只存在某一个<br>
                    当选择停用时，可以填写一个停用提示，用来告知用户为何停用当前接口、何时恢复等
                  </div>
                  <i class="el-icon-question"></i>
                </el-tooltip>
              </span>
              <el-select v-model="form.limitType" placeholder="请选择限制类型">
                <el-option v-for="dict in dict.type.sys_api_limit_type" :key="dict.value" :label="dict.label"
                  :value="dict.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="状态">
              <el-radio-group v-model="form.status">
                <el-radio v-for="dict in dict.type.sys_normal_disable" :key="dict.value" :label="dict.value">{{ dict.label
                }}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-show="form.limitType == 1">
          <el-col :span="24">
            <el-form-item prop="retMsg">
              <span slot="label">
                停用提示
                <el-tooltip placement="top">
                  <div slot="content">
                    当限制类型为限流时，接口返回的提示内容
                  </div>
                  <i class="el-icon-question"></i>
                </el-tooltip>
              </span>
              <el-input type="textarea" v-model="form.retMsg" placeholder="请输入停用提示" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row v-show="form.limitType == 0">
          <el-col :span="8">
            <el-form-item label="单个用户在" prop="singleTime">
              <el-input v-model="form.singleTime" placeholder="时间内" />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-select v-model="form.singleTimeUnit" placeholder="时间单位">
              <el-option v-for="dict in dict.type.sys_time_unit" :key="dict.value" :label="dict.label"
                :value="dict.value"></el-option>
            </el-select>
          </el-col>
          <el-col :span="12">
            <el-form-item label="内，允许访问" prop="singleFrequency">
              <el-input v-model="form.singleFrequency" placeholder="多少次" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-show="form.limitType == 0">
          <el-col :span="8">
            <el-form-item label="全部用户在" prop="wholeTime">
              <el-input v-model="form.wholeTime" placeholder="时间内" />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-select v-model="form.wholeTimeUnit" placeholder="时间单位">
              <el-option v-for="dict in dict.type.sys_time_unit" :key="dict.value" :label="dict.label"
                :value="dict.value"></el-option>
            </el-select>
          </el-col>
          <el-col :span="12">
            <el-form-item label="内，允许访问" prop="wholeFrequency">
              <el-input v-model="form.wholeFrequency" placeholder="多少次" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" type="textarea" placeholder="请输入备注" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { pageApiLimit, getApiLimit, delApiLimit, addApiLimit, updateApiLimit, changeApiLimitStatus, refreshCache } from "@/api/monitor/apiLimit";

export default {
  name: "ApiLimit",
  dicts: ['sys_api_limit_type', 'sys_normal_disable', 'sys_time_unit'],
  data() {
    return {
      // 遮罩层
      loading: true,
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
      // 定时任务表格数据
      apiLimitList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 是否显示详细弹出层
      openView: false,
      // 是否显示Cron表达式弹出层
      openCron: false,
      // 传入的表达式
      expression: "",
      // 默认排序
      defaultSort: { prop: 'createTime', order: 'descending' },
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        apiName: undefined,
        apiUri: undefined,
        limitType: undefined,
        retMsg: undefined,
        status: undefined,
        remark: undefined
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        apiName: [
          { required: true, message: "接口名称不能为空", trigger: "blur" }
        ],
        apiUri: [
          { required: true, message: "接口uri不能为空", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询定时任务列表 */
    getList() {
      this.loading = true;
      pageApiLimit(this.queryParams).then(response => {
        this.apiLimitList = response.data.records
        this.total = response.data.total;
        this.loading = false;
      });
    },
    // 时间单位翻译
    timeUnit(rowUnit, column) {
      return this.selectDictLabel(this.dict.type.sys_time_unit, rowUnit);
    },
    // 策略显示转换
    showTrans(time, num, unit) {
      if (time == undefined && num == undefined) {
        return "无";
      }
      return num + "次/" + time + this.timeUnit(unit);
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
        apiName: undefined,
        apiUri: undefined,
        singleFrequency: undefined,
        singleTime: undefined,
        singleTimeUnit: "0",
        wholeFrequency: undefined,
        wholeTime: undefined,
        wholeTimeUnit: "0",
        limitType: "0",
        retMsg: undefined,
        status: "0",
        remark: undefined
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
      this.ids = selection.map(item => item.id);
      this.names = selection.map(item => item.apiName)
      this.single = selection.length != 1;
      this.multiple = !selection.length;
    },
    /** 排序触发事件 */
    handleSortChange(column, prop, order) {
      this.queryParams.orderByColumn = column.prop;
      this.queryParams.isAsc = column.order;
      this.getList();
    },
    // 状态修改
    handleStatusChange(row) {
      let text = row.status === "0" ? "启用" : "停用";
      this.$modal.confirm('确认要"' + text + '""' + row.apiName + '"的限制吗？').then(function () {
        return changeApiLimitStatus(row.id, row.status);
      }).then(() => {
        this.$modal.msgSuccess(text + "成功");
      }).catch(function () {
        row.status = row.status === "0" ? "1" : "0";
      });
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加接口限制";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids;
      getApiLimit(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改接口限制";
      });
    },
    /** 提交按钮 */
    submitForm: function () {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != undefined) {
            updateApiLimit(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addApiLimit(this.form).then(response => {
              this.$modal.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id ? [row.id] : this.ids;
      const names = row.apiName || this.names;
      this.$modal.confirm('是否确认删除接口名称为"' + names + '"的限制吗？').then(function () {
        return delApiLimit(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => { });
    },
    /** 刷新缓存按钮操作 */
    handleRefreshCache() {
      refreshCache().then(() => {
        this.$modal.msgSuccess("刷新成功");
      });
    }
  }
};
</script>
