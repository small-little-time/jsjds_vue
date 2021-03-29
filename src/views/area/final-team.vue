<template>
  <div>
    <upload @refreshDataList="getDataList"/>
    <div class="filter-container" style="padding-top: 5%;padding-left: 10%;">
      <el-button type="danger" @click="deleteHandle()">批量删除</el-button>
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
        prop="id"
        header-align="center"
        align="center"
        width="50"
        label="序列"/>
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
        fixed="right"
        header-align="center"
        align="center"
        width="150"
        label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="deleteHandle(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
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
import upload from './upload'
import { getAllFinalTeam, deleteFinalTeam } from '@/api/info'

export default {

  components: {
    upload
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
      getAllFinalTeam(params).then((res) => {
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
    deleteHandle(id) {
      // eslint-disable-next-line no-unused-vars
      var ids = id ? [id] : this.dataListSelections.map(item => {
        return item.id
      })
      this.$confirm(`确定对[id=${ids.join(',')}]进行[${id ? '删除' : '批量删除'}]操作?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteFinalTeam(ids).then((response) => {
          if (response && response.data.code === 0) {
            this.$message({
              message: '操作成功',
              type: 'success',
              duration: 1500,
              onClose: () => {
                this.getDataList()
              }
            })
          }
        }).catch((err) => {
          this.$message.error(err.response.data.message)
        })
      })
    }

  }

}

</script>

<style>

</style>

