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

        <el-form-item v-if="!dataForm.id" label="是否添加院部">
          <el-radio v-model="addAcademy" :label="true">是</el-radio>
          <el-radio v-model="addAcademy" :label="false">否</el-radio>
        </el-form-item>

        <el-form-item v-if="!addAcademy" label="比赛分类大类" prop="parentId">
          <el-select v-model="dataForm.parentId" :clearable="true" filterable placeholder="请选择比赛分类">
            <el-option
              v-for="item in academyData"
              :key="item.id"
              :label="item.academyName"
              :value="item.id"/>
          </el-select>
        </el-form-item>
        <el-form-item v-if="!addAcademy" label="专业名称" prop="academyName">
          <el-input v-model="dataForm.academyName" placeholder="请输入需要添加的专业名称"/>
        </el-form-item>

        <el-form-item v-if="addAcademy" label="院部名称" prop="academyName">
          <el-input v-model="dataForm.academyName" placeholder="请输入需要添加的院部名称"/>
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
import { getAllAcademy, updateAcademy, insertAcademy, getAcademyById } from '@/api/info'

export default {
  data() {
    return {
      visible: false,
      dataForm: this.initForm(),
      academyData: [],
      isAdd: true,
      isUpdate: true,
      notExitCategoryIds: [],
      exitCategoryIds: [],
      addAcademy: true,
      dataRule: {
        academyName: [
          { required: true, message: '名称不能为空', trigger: 'blur' }
        ],
        parentId: [
          { required: true, message: '分类不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getAllAcademy()
  },
  methods: {
    init(id) {
      this.dataForm.id = id || 0
      this.visible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
        this.getAllAcademy()
        if (this.dataForm.id) {
          getAcademyById(this.dataForm.id).then((res) => {
            this.dataForm = res.data.data
            if (this.dataForm.parentId !== 0) {
              this.addAcademy = false
            }
          }).catch((err) => {
            console.log(err)
          })
        } else {
          this.dataForm = {
            id: 0,
            parentId: '',
            academyName: ''
          }
        }
      })
    },
    getAllAcademy() {
      getAllAcademy().then((res) => {
        this.academyData = res.data.data
      }).catch((err) => {
        this.$message.error(err.response.data.message)
      })
    },
    initForm() {
      return {
        id: 0,
        parentId: '',
        academyName: ''
      }
    },
    dataFormSubmit() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          let api
          if (!this.dataForm.id) { // 新增
            api = insertAcademy
            if (this.addAcademy) {
              this.dataForm.parentId = 0
            } else {
              this.dataForm.countLimit = null
            }
          } else { // 修改
            api = updateAcademy
          }
          api(this.dataForm).then((response) => {
            if (response && response.data.code === 0) {
              this.dataForm = this.initForm()
              this.$message({
                message: '操作成功',
                type: 'success',
                duration: 1000,
                onClose: () => {
                  this.visible = false
                  this.$emit('refreshDataList')
                  this.$emit('refreshCategoryList')
                }
              })
            }
          }).catch((err) => {
            console.log(err)
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

