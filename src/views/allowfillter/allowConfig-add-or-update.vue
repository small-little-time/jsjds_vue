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
        <el-form-item label="专业" prop="categoryId">
          <el-select v-model="dataForm.academyId" :clearable="true" filterable placeholder="请选择专业">
            <el-option
              v-for="item in professionData"
              :key="item.id"
              :label="item.academyName"
              :value="item.id"/>
          </el-select>
          <el-form-item label="比赛分类" prop="categoryId">
            <el-select v-model="dataForm.academyId" :clearable="true" filterable placeholder="请选择比赛分类">
              <el-option
                v-for="item in professionData"
                :key="item.id"
                :label="item.academyName"
                :value="item.id"/>
            </el-select>
          </el-form-item>
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
import { getAllProfession, getAllCategory, getAllowFilterById } from '@/api/info'

export default {
  data() {
    return {
      visible: false,
      dataForm: this.initForm(),
      professionData: [],
      categoryData: [],
      dataRule: {
        categoryId: [
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
            this.dataForm.categoryId = res.data.data.categoryaId
            console.log(this.dataForm)
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
        categoryId: null,
        academyId: null
      }
    },
    dataFormSubmit() {
      this.$refs['dataForm'].validate((valid) => {
          // eslint-disable-next-line no-empty
          if (valid) {

          }
        }
      )
    }
  }
}

</script>

<style>

</style>

