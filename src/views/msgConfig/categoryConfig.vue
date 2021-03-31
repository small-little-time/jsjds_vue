<template>
  <div>
    <div><h3 style="text-align:center">此页面主要用来配置比赛报名分类信息</h3></div>

    <div class="filter-container">
      <el-form>
        <el-form-item>
          <el-button type="primary" style="margin-left: 5%;" @click="addOrUpdateHandle()">新增</el-button>
          <el-button type="danger" @click="deleteHandle()">批量删除</el-button>
          <el-select v-model="parentId" filterable placeholder="请选择" style="margin-left: 50px;" @change="getDataList()">
            <el-option label="所有大类" value="0"/>
            <el-option
              v-for="item in categoryRootList"
              :key="item.id"
              :label="item.name"
              :value="item.id"/>
          </el-select>
          <el-button type="primary" @click="getDataList()">查询</el-button>
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
        prop="name"
        header-align="center"
        align="center"
        label="分类"/>
      <el-table-column
        prop="countLimit"
        header-align="center"
        align="center"
        label="队伍最大人数"/>
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
      @refreshDataList="getDataList"
      @refreshCategoryList="getAllCategory"
    />
  </div>
</template>

<script>
import AddOrUpdate from './categoryConfig-add-or-update'
import { getCategory, getAllCategory, deleteCategory } from '@/api/info'

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
      categoryRootList: [],
      dataListLoading: false,
      dataListSelections: [],
      addOrUpdateVisible: false,
      parentId: '0'
    }
  },
  created() {
    this.getAllCategory()
    this.getDataList()
  },
  methods: {
    getAllCategory() {
      getAllCategory().then((res) => {
        this.categoryRootList = res.data.data
      }).catch((err) => {
        console.log(err)
      })
    },
    getDataList() {
      const params = {
        'size': this.pageSize,
        'current': this.pageIndex,
        'parentId': this.parentId
      }
      getCategory(params).then((res) => {
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
        deleteCategory(ids).then((response) => {
          if (response && response.data.code === 0) {
            this.$message({
              message: '操作成功',
              type: 'success',
              duration: 1500,
              onClose: () => {
                this.getAllCategory()
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
