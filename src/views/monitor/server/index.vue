<template>
  <div class="app-container">
    <el-row :span="12" class="card-box">
      <el-button style="float: right;" type="primary" :loading="loading" plain @click="queryInfo">刷新</el-button>
    </el-row>
    <el-row>
      <el-col :span="12" class="card-box">
        <el-card>
          <div slot="header"><span><i class="el-icon-cpu"></i> CPU</span></div>
          <div class="el-table el-table--enable-row-hover el-table--medium" style="display: flex;">
            <table cellspacing="0" style="width: 50%;">
              <thead>
                <tr>
                  <th class="el-table__cell is-leaf">
                    <div class="cell">属性</div>
                  </th>
                  <th class="el-table__cell is-leaf">
                    <div class="cell">值</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="el-table__cell is-leaf">
                    <div class="cell">核心数</div>
                  </td>
                  <td class="el-table__cell is-leaf">
                    <div class="cell" v-if="server.cpu">{{ server.cpu.cpuNum }}</div>
                  </td>
                </tr>
                <tr>
                  <td class="el-table__cell is-leaf">
                    <div class="cell">用户使用率</div>
                  </td>
                  <td class="el-table__cell is-leaf">
                    <div class="cell" v-if="server.cpu">{{ server.cpu.used }}%</div>
                  </td>
                </tr>
                <tr>
                  <td class="el-table__cell is-leaf">
                    <div class="cell">系统使用率</div>
                  </td>
                  <td class="el-table__cell is-leaf">
                    <div class="cell" v-if="server.cpu">{{ server.cpu.sys }}%</div>
                  </td>
                </tr>
                <tr>
                  <td class="el-table__cell is-leaf">
                    <div class="cell">当前空闲率</div>
                  </td>
                  <td class="el-table__cell is-leaf">
                    <div class="cell" v-if="server.cpu">{{ server.cpu.free }}%</div>
                  </td>
                </tr>
              </tbody>
            </table>
            <div style="width: 50%;height: 100%;">
              <div ref="chartMain" style="width: 100%;height: 220px;"></div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12" class="card-box">
        <el-card>
          <div slot="header"><span><i class="el-icon-tickets"></i> 内存</span></div>
          <div class="el-table el-table--enable-row-hover el-table--medium">
            <table cellspacing="0" style="width: 100%;">
              <thead>
                <tr>
                  <th class="el-table__cell is-leaf">
                    <div class="cell">属性</div>
                  </th>
                  <th class="el-table__cell is-leaf">
                    <div class="cell">内存</div>
                  </th>
                  <th class="el-table__cell is-leaf">
                    <div class="cell">JVM</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="el-table__cell is-leaf">
                    <div class="cell">总内存</div>
                  </td>
                  <td class="el-table__cell is-leaf">
                    <div class="cell" v-if="server.memory">{{ server.memory.total }}{{ server.memory.unit }}</div>
                  </td>
                  <td class="el-table__cell is-leaf">
                    <div class="cell" v-if="server.jvm">{{ server.jvm.total }}{{ server.jvm.unit }}</div>
                  </td>
                </tr>
                <tr>
                  <td class="el-table__cell is-leaf">
                    <div class="cell">已用内存</div>
                  </td>
                  <td class="el-table__cell is-leaf">
                    <div class="cell" v-if="server.memory">{{ server.memory.used }}{{ server.memory.unit }}</div>
                  </td>
                  <td class="el-table__cell is-leaf">
                    <div class="cell" v-if="server.jvm">{{ server.jvm.used }}{{ server.jvm.unit }}</div>
                  </td>
                </tr>
                <tr>
                  <td class="el-table__cell is-leaf">
                    <div class="cell">剩余内存</div>
                  </td>
                  <td class="el-table__cell is-leaf">
                    <div class="cell" v-if="server.memory">{{ server.memory.free }}{{ server.memory.unit }}</div>
                  </td>
                  <td class="el-table__cell is-leaf">
                    <div class="cell" v-if="server.jvm">{{ server.jvm.free }}{{ server.jvm.unit }}</div>
                  </td>
                </tr>
                <tr>
                  <td class="el-table__cell is-leaf">
                    <div class="cell">使用率</div>
                  </td>
                  <td class="el-table__cell is-leaf">
                    <div class="cell" v-if="server.memory" :class="{ 'text-danger': server.memory.usage > 80 }">{{
                      server.memory.usage }}%</div>
                  </td>
                  <td class="el-table__cell is-leaf">
                    <div class="cell" v-if="server.jvm" :class="{ 'text-danger': server.jvm.usage > 80 }">{{
                      server.jvm.usage }}%</div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </el-card>
      </el-col>

      <el-col :span="24" class="card-box">
        <el-card>
          <div slot="header">
            <span><i class="el-icon-monitor"></i> 服务器信息</span>
          </div>
          <div class="el-table el-table--enable-row-hover el-table--medium">
            <table cellspacing="0" style="width: 100%;">
              <tbody>
                <tr>
                  <td class="el-table__cell is-leaf">
                    <div class="cell">服务器名称</div>
                  </td>
                  <td class="el-table__cell is-leaf">
                    <div class="cell" v-if="server.system">{{ server.system.computerName }}</div>
                  </td>
                  <td class="el-table__cell is-leaf">
                    <div class="cell">操作系统</div>
                  </td>
                  <td class="el-table__cell is-leaf">
                    <div class="cell" v-if="server.system">{{ server.system.osName }}</div>
                  </td>
                </tr>
                <tr>
                  <td class="el-table__cell is-leaf">
                    <div class="cell">服务器IP</div>
                  </td>
                  <td class="el-table__cell is-leaf">
                    <div class="cell" v-if="server.system">{{ server.system.computerIp }}</div>
                  </td>
                  <td class="el-table__cell is-leaf">
                    <div class="cell">系统架构</div>
                  </td>
                  <td class="el-table__cell is-leaf">
                    <div class="cell" v-if="server.system">{{ server.system.osArch }}</div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </el-card>
      </el-col>

      <el-col :span="24" class="card-box">
        <el-card>
          <div slot="header">
            <span><i class="el-icon-coffee-cup"></i> Java虚拟机信息</span>
          </div>
          <div class="el-table el-table--enable-row-hover el-table--medium">
            <table cellspacing="0" style="width: 100%;table-layout:fixed;">
              <tbody>
                <tr>
                  <td class="el-table__cell is-leaf">
                    <div class="cell">Java名称</div>
                  </td>
                  <td class="el-table__cell is-leaf">
                    <div class="cell" v-if="server.jvm">{{ server.jvm.name }}</div>
                  </td>
                  <td class="el-table__cell is-leaf">
                    <div class="cell">Java版本</div>
                  </td>
                  <td class="el-table__cell is-leaf">
                    <div class="cell" v-if="server.jvm">{{ server.jvm.version }}</div>
                  </td>
                </tr>
                <tr>
                  <td class="el-table__cell is-leaf">
                    <div class="cell">启动时间</div>
                  </td>
                  <td class="el-table__cell is-leaf">
                    <div class="cell" v-if="server.jvm">{{ server.jvm.startTime }}</div>
                  </td>
                  <td class="el-table__cell is-leaf">
                    <div class="cell">运行时长</div>
                  </td>
                  <td class="el-table__cell is-leaf">
                    <div class="cell" v-if="server.jvm">{{ server.jvm.runTime }}</div>
                  </td>
                </tr>
                <tr>
                  <td colspan="1" class="el-table__cell is-leaf">
                    <div class="cell">安装路径</div>
                  </td>
                  <td colspan="3" class="el-table__cell is-leaf">
                    <div class="cell" v-if="server.jvm">{{ server.jvm.home }}</div>
                  </td>
                </tr>
                <tr>
                  <td colspan="1" class="el-table__cell is-leaf">
                    <div class="cell">项目路径</div>
                  </td>
                  <td colspan="3" class="el-table__cell is-leaf">
                    <div class="cell" v-if="server.system">{{ server.system.userDir }}</div>
                  </td>
                </tr>
                <tr>
                  <td colspan="1" class="el-table__cell is-leaf">
                    <div class="cell">运行参数</div>
                  </td>
                  <td colspan="3" class="el-table__cell is-leaf">
                    <div class="cell" v-if="server.jvm">{{ server.jvm.inputArgs }}</div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </el-card>
      </el-col>

      <el-col :span="24" class="card-box">
        <el-card>
          <div slot="header">
            <span><i class="el-icon-receiving"></i> 磁盘状态</span>
          </div>
          <div class="el-table el-table--enable-row-hover el-table--medium">
            <table cellspacing="0" style="width: 100%;">
              <thead>
                <tr>
                  <th class="el-table__cell el-table__cell is-leaf">
                    <div class="cell">盘符路径</div>
                  </th>
                  <th class="el-table__cell is-leaf">
                    <div class="cell">文件系统</div>
                  </th>
                  <th class="el-table__cell is-leaf">
                    <div class="cell">盘符类型</div>
                  </th>
                  <th class="el-table__cell is-leaf">
                    <div class="cell">总大小</div>
                  </th>
                  <th class="el-table__cell is-leaf">
                    <div class="cell">可用大小</div>
                  </th>
                  <th class="el-table__cell is-leaf">
                    <div class="cell">已用大小</div>
                  </th>
                  <th class="el-table__cell is-leaf">
                    <div class="cell">已用百分比</div>
                  </th>
                </tr>
              </thead>
              <tbody v-if="server.disks">
                <tr v-for="(disk, index) in server.disks" :key="index">
                  <td class="el-table__cell is-leaf">
                    <div class="cell">{{ disk.dirName }}</div>
                  </td>
                  <td class="el-table__cell is-leaf">
                    <div class="cell">{{ disk.sysTypeName }}</div>
                  </td>
                  <td class="el-table__cell is-leaf">
                    <div class="cell">{{ disk.typeName }}</div>
                  </td>
                  <td class="el-table__cell is-leaf">
                    <div class="cell">{{ disk.total }}</div>
                  </td>
                  <td class="el-table__cell is-leaf">
                    <div class="cell">{{ disk.free }}</div>
                  </td>
                  <td class="el-table__cell is-leaf">
                    <div class="cell">{{ disk.used }}</div>
                  </td>
                  <td class="el-table__cell is-leaf">
                    <div class="cell" :class="{ 'text-danger': disk.usage > 80 }">{{ disk.usage }}%</div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getServer } from "@/api/monitor/server";
import * as echarts from 'echarts'

export default {
  name: "Server",
  data() {
    return {
      // 服务器信息
      server: [],
      loading: true,
    };
  },
  created() {
    this.queryInfo();
  },
  mounted() {
    this.initEachart();
  },
  methods: {
    /** 查询服务器信息 */
    queryInfo() {
      this.openLoading();
      this.loading = true
      getServer().then(response => {
        this.server = response.data;
        this.$modal.closeLoading();
        this.loading = false
      }).catch(() => {
        this.$modal.closeLoading();
        this.loading = false
      });
    },
    // 打开加载层
    openLoading() {
      this.$modal.loading("正在加载，请稍等...");
    },
    initEachart() {
      console.log(this.$refs.chartMain)
      var myChart = echarts.init(this.$refs.chartMain);
      myChart.setOption({
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '5%',
          left: 'center'
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 40,
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 1048, name: 'Search Engine' },
              { value: 735, name: 'Direct' },
              { value: 300, name: 'Video Ads' }
            ]
          }
        ]
      });
    }
  }
};
</script>
