<template>
  <div>
    <el-dialog
      :title="!dataForm.id ? '新增' : '修改'"
      :close-on-click-modal="false"
      :visible.sync="visible">
      <el-form
        ref="dataForm"
        :model="dataForm"
        :rules="dataRule"
        label-width="150px"
        @keyup.enter.native="dataFormSubmit()">
        <el-form-item label="专业" prop="academyId">
          <el-select v-model="dataForm.academyId" :clearable="true" filterable placeholder="请选择专业">
            <el-option
              v-for="item in professionData"
              :key="item.id"
              :label="item.academyName"
              :value="item.id"/>
          </el-select>
        </el-form-item>
        <el-form-item label="比赛分类" prop="categoryaId">
          <el-select v-model="dataForm.categoryaId" :clearable="true" filterable placeholder="请选择比赛分类">
            <el-option
              v-for="item in categoryData"
              :key="item.id"
              :label="item.name"
              :value="item.id"/>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getAllProfession, getAllCategory, getAllowFilterById, updateAllowFilter, insertAllowFilter } from '@/api/info'

export default {
  data() {
    return {
      visible: false,
      dataForm: this.initForm(),
      professionData: [],
      categoryData: [],
      dataRule: {
        categoryaId: [
          { required: true, message: '分类不能为空', trigger: 'blur' }
        ],
        academyId: [
          { required: true, message: '专业不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getAllProfession()
    this.getAllCategory()
  },
  methods: {
    init(id) {
      this.dataForm.id = id || 0
      this.visible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
        if (this.dataForm.id) {
          getAllowFilterById(this.dataForm.id).then((res) => {
            this.dataForm.academyId = res.data.data.academyId
            this.dataForm.categoryaId = res.data.data.categoryaId
          }).catch((err) => {
            this.$message.error(err.response.data.message)
          })
        }
      })
    },
    getAllProfession() {
      getAllProfession().then((res) => {
        this.professionData = res.data.data
      }).catch((err) => {
        this.$message.error(err.response.data.message)
      })
    },
    getAllCategory() {
      getAllCategory().then((res) => {
        this.categoryData = res.data.data
      }).catch((err) => {
        this.$message.error(err.response.data.message)
      })
    },
    initForm() {
      return {
        id: 0,
        categoryaId: null,
        academyId: null
      }
    },
    dataFormSubmit() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          let api
          if (!this.dataForm.id) { // 新增
            api = insertAllowFilter
          } else { // 修改
            api = updateAllowFilter
          }
          api(this.dataForm).then((response) => {
            if (response && response.data.code === 0) {
              this.$message({
                message: '操作成功',
                type: 'success',
                duration: 1000,
                onClose: () => {
                  this.visible = false
                  this.$emit('refreshDataList')
                }
              })
            }
          }).catch((err) => {
            this.$message.error(err.response.data.message)
          })
        }
      }
      )
    }

  }
}

</script>

<style>

</style>

