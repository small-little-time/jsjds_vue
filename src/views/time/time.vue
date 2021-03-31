<template>
  <div>
    <div><h3 style="text-align:center">此页面主要用来配置各种时间，如报名开始时间等</h3></div>

    <div class="filter-container">
      <el-form>
        <el-form-item>
          <el-button type="primary" style="margin-left: 5%;" @click="addOrUpdateHandle()">新增/修改</el-button>
          <!--          <el-button type="danger" @click="deleteHandle()">批量删除</el-button>-->
        </el-form-item>
      </el-form>
    </div>
    <el-table
      v-loading="dataListLoading"
      :data="dataList"
      border
      style="width: 100%;"
    >
      <el-table-column
        type="selection"
        header-align="center"
        align="center"
        width="50"/>
      <el-table-column
        prop="name"
        header-align="center"
        align="center"
        label="名称"/>
      <el-table-column
        prop="value"
        header-align="center"
        align="center"
        label="时间"/>
        <!--      <el-table-column
      fixed="right"
      header-align="center"
      align="center"
      width="150"
      label="操作">
      <template slot-scope="scope">
        <el-button type="text" size="small" @click="addOrUpdateHandle()">修改</el-button>
      </template>
    </el-table-column>-->
    </el-table>
    <add-or-update
      v-if="addOrUpdateVisible"
      ref="addOrUpdate"
      :star-classify="starClassify"
      @refreshDataList="getDataList"/>
  </div>
</template>

<script>
import { deleteArea, timeGet } from '@/api/info'
import AddOrUpdate from './time-add-or-update'

export default {
  components: {
    AddOrUpdate
  },
  data() {
    return {
      dataList: [],
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
      timeGet().then((res) => {
        this.dataList = res.data.data
        console.log(this.dataList)
      }).catch((err) => {
        this.$message.error(err.response.data.message)
      })
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
        deleteArea(ids).then((response) => {
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
    addOrUpdateHandle() {
      this.addOrUpdateVisible = true
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init()
      })
    }
  }
}

</script>

<style>

</style>

