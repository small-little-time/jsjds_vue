<template>
  <div>
    <div class="filter-container" style="padding-top: 2%;padding-left: 10%;">
      <el-button type="danger" @click="exportExcel()">导出最终成绩</el-button>
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
        width="100"
        label="队伍编号"/>
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
        prop="avgScore"
        header-align="center"
        align="center"
        label="平均分"/>

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
import { getFinalScore, exportFinalScore } from '@/api/info'
import fileDownload from 'js-file-download'

export default {

  components: {},
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
      getFinalScore(params).then((res) => {
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
    exportExcel() {
      const loading = this.$loading({
        lock: true,
        text: '解析中',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      exportFinalScore().then((res) => {
        this.$message.success('下载完成')
        const fileName = '最终成绩.xlsx'
        fileDownload(res.data, fileName)
        loading.close()
      }).catch((err) => {
        console.log(err.response.data.message)
      })
    }

  }

}

</script>

<style>

</style>

