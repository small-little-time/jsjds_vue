<template>
  <div>
    <div><h3 style="text-align:center">此页面主要用来配置哪些专业不能能报名哪些比赛大类，比如广电专业不能报数媒非专业组</h3></div>

    <div class="filter-container">
      <el-form>
        <el-form-item>
          <el-button type="primary" style="margin-left: 5%;" @click="addOrUpdateHandle()">新增</el-button>
          <el-button type="danger" @click="deleteHandle()">批量删除</el-button>
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
        prop="id"
        header-align="center"
        align="center"
        width="50"
        label="序列"/>
      <el-table-column
        prop="academyName"
        header-align="center"
        align="center"
        label="专业"/>
      <el-table-column
        prop="categoryName"
        header-align="center"
        align="center"
        label="分类"/>

      <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        width="150"
        label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="addOrUpdateHandle(scope.row.id)">修改</el-button>
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
import AddOrUpdate from './filter-add-or-update'
import { getAllFilter, deleteFilter } from '@/api/info'

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
      getAllFilter(params).then((res) => {
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
        deleteFilter(ids).then((response) => {
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
    },
    addOrUpdateHandle(id) {
      this.addOrUpdateVisible = true
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(id)
      })
    }
  }
}

</script>

<style>

</style>

