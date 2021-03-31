<template>
  <div>
    <div class="filter-container">
      <el-form>
        <el-form-item>
          <el-button type="primary" style="margin-left: 5%;" @click="addOrUpdateHandle()">生成答辩顺序</el-button>
          <el-button type="danger" style="margin-left: 5%;" @click="deleteHandle()">清空答辩顺序</el-button>
          <el-button type="warning" style="margin-left: 5%;" @click="sendNotifySms()">发送通知短信</el-button>
          <el-button type="warning" style="margin-left: 5%;" @click="exportExcel()">导出Excel</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table
      v-loading="dataListLoading"
      :data="dataList"
      border
      style="width: 100%;"
      @selection-change="selectionChangeHandle">
      <el-table-column
        type="selection"
        header-align="center"
        align="center"
        width="50"/>
      <el-table-column
        prop="teamId"
        header-align="center"
        align="center"
        label="队伍id"/>
      <el-table-column
        prop="worksName"
        header-align="center"
        align="center"
        label="作品名称"/>
      <el-table-column
        prop="categoryRootName"
        header-align="center"
        align="center"
        label="作品分类(大类)"/>
      <el-table-column
        prop="categoryChildName"
        header-align="center"
        align="center"
        label="作品分类(小类)"/>
      <el-table-column
        prop="areaName"
        header-align="center"
        align="center"
        label="答辩场地"/>
      <el-table-column
        prop="sequence"
        header-align="center"
        align="center"
        label="场地答辩顺序"/>

    </el-table>
    <el-pagination
      :current-page="pageIndex"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageSize"
      :total="totalPage"
      layout="total, sizes, prev, pager, next, jumper"
      @size-change="sizeChangeHandle"
      @current-change="currentChangeHandle"/>
    <add-or-update
      v-if="addOrUpdateVisible"
      ref="addOrUpdate"
      :star-classify="starClassify"
      @refreshDataList="getDataList"/>
  </div>
</template>

<script>
import fileDownload from 'js-file-download'
import AddOrUpdate from './area-add-or-update'
import { getAllFinalTeamSeq, finalTeamGroup, truncateTeamSeq, sendNotifySms, exportFinalSeqExcel } from '@/api/info'

export default {
  components: {
    AddOrUpdate
  },
  data() {
    return {
      dataList: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListLoading: false,
      dataListSelections: [],
      addOrUpdateVisible: false,
      starClassify: []
    }
  },
  created() {
    this.getDataList()
  },
  methods: {
    getDataList() {
      const params = {
        'size': this.pageSize,
        'current': this.pageIndex
      }
      getAllFinalTeamSeq(params).then((res) => {
        this.dataList = res.data.data.records
        this.totalPage = res.data.data.total
      }).catch((err) => {
        this.$message.error(err.response.data.message)
      })
    },
    // 多选
    selectionChangeHandle(val) {
      this.dataListSelections = val
    },
    // 每页数
    sizeChangeHandle(val) {
      this.pageSize = val
      this.pageIndex = 1
      this.getDataList()
    },
    // 当前页
    currentChangeHandle(val) {
      this.pageIndex = val
      this.getDataList()
    },
    // 删除
    deleteHandle() {
      this.$confirm(`确定进行清空操作？？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const loading = this.$loading({
          lock: true,
          text: '删除中',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        truncateTeamSeq().then((response) => {
          if (response && response.data.code === 50000) {
            this.$message({
              message: '操作成功',
              type: 'success',
              duration: 1500,
              onClose: () => {
                this.getDataList()
                loading.close()
              }
            })
          }
        }).catch((err) => {
          console.log(err)
        })
      })
    },
    sendNotifySms() {
      this.$confirm(`发送短信提示？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const loading = this.$loading({
          lock: true,
          text: '后台正在缓慢发送',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        sendNotifySms().then((response) => {
          if (response && response.data.code === 50000) {
            this.$message({
              message: '后台正在缓慢发送，发送成功后会短信提醒',
              type: 'success',
              duration: 3000,
              onClose: () => {
                this.getDataList()
                loading.close()
              }
            })
          } else {
            this.$message.error(response.data.message)
            loading.close()
          }
        }).catch((err) => {
          loading.close()
          this.$message.error(err.response.data.message)
        })
      })
    },
    exportExcel() {
      const loading = this.$loading({
        lock: true,
        text: '下载中',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      exportFinalSeqExcel().then((res) => {
        loading.close()
        const fileName = '答辩顺序.xlsx'
        fileDownload(res.data, fileName)
      }).catch((err) => {
        loading.close()
        console.log(err)
      })
    },
    addOrUpdateHandle() {
      this.$confirm(`确定生成答辩排序信息？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const loading = this.$loading({
          lock: true,
          text: '生成中',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        finalTeamGroup().then((response) => {
          if (response && response.data.code === 50000) {
            this.$message({
              message: '后台正在生成，请一分钟后刷新页面',
              type: 'success',
              duration: 1500,
              onClose: () => {
                // this.getDataList()
                loading.close()
              }
            })
          } else {
            this.$message.error(response.data.message)
            loading.close()
          }
        }).catch((err) => {
          loading.close()
          this.$message.error(err.response.data.message)
        })
      })
    }
  }
}

</script>

<style>

</style>

