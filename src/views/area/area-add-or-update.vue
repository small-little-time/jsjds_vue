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
        <el-form-item v-if="isAdd" label="选择比赛分类" prop="ids">
          <el-checkbox-group v-model="dataForm.ids">
            <el-checkbox
              v-for="item in categoryData"
              :key="item.id"
              :label="item.id"
              :disabled="checkboxCategoryIsExit(item.id)">{{
                item.name
              }}
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>

        <el-form-item v-if="isUpdate" label="比赛分类" prop="categoryId">
          <el-select v-model="dataForm.categoryId" :clearable="true" filterable placeholder="请选择比赛分类">
            <el-option
              v-for="item in categoryData"
              v-if="categoryIsExit(item.id) "
              :key="item.id"
              :label="item.name"
              :value="item.id"/>
          </el-select>
        </el-form-item>
        <el-form-item label="比赛场地" prop="areaName">
          <el-input v-model="dataForm.areaName" placeholder="请输入答辩地点"/>
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
import { getAllCategory, areaInsertBatch, getAlreadySetCategory, getAreaById, updateArea } from '@/api/info'

export default {
  data() {
    return {
      visible: false,
      dataForm: this.initForm(),
      professionData: [],
      categoryData: [],
      isAdd: true,
      isUpdate: true,
      notExitCategoryIds: [],
      exitCategoryIds: [],
      dataRule: {
        ids: [
          { required: true, message: '分类不能为空', trigger: 'blur' }
        ],
        areaName: [
          { required: true, message: '场地不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getAllCategory()
  },
  methods: {
    init(id) {
      this.dataForm.id = id || 0
      this.visible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
        this.getAlreadySetCategory()
        if (this.dataForm.id) {
          getAreaById(this.dataForm.id).then((res) => {
            this.isAdd = false
            this.isUpdate = true
            this.dataForm = res.data.data
          }).catch((err) => {
            this.$message.error(err.response.data.message)
          })
        } else {
          this.isAdd = true
          this.isUpdate = false
        }
      })
    },
    checkboxCategoryIsExit(id) {
      if (this.exitCategoryIds.includes(id)) {
        return true
      } else {
        return false
      }
    },
    categoryIsExit(id) {
      if (this.exitCategoryIds.includes(id) && id !== this.dataForm.categoryId) {
        return false
      } else {
        return true
      }
    },
    getAlreadySetCategory() {
      getAlreadySetCategory().then((res) => {
        this.exitCategoryIds = res.data.data
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
        ids: [],
        areaName: ''
      }
    },
    dataFormSubmit() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          // eslint-disable-next-line no-unused-vars
          let api
          if (!this.dataForm.id) { // 新增
            api = areaInsertBatch
          } else { // 修改
            api = updateArea
          }
          api(this.dataForm).then((response) => {
            if (response && response.data.code === 50000) {
              this.$message({
                message: '操作成功',
                type: 'success',
                duration: 1000,
                onClose: () => {
                  this.visible = false
                  this.$emit('refreshDataList')
                }
              })
            } else {
              this.$message.error(response.data.message)
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

