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

        <el-form-item v-if="!dataForm.id" label="是否添加大类">
          <el-radio v-model="addRootCategory" :label="true">是</el-radio>
          <el-radio v-model="addRootCategory" :label="false">否</el-radio>
        </el-form-item>

        <el-form-item v-if="!addRootCategory" label="比赛分类大类" prop="parentId">
          <el-select v-model="dataForm.parentId" :clearable="true" filterable placeholder="请选择比赛分类">
            <el-option
              v-for="item in categoryData"
              :key="item.id"
              :label="item.name"
              :value="item.id"/>
          </el-select>
        </el-form-item>
        <el-form-item v-if="!addRootCategory" label="比赛分类小类" prop="name">
          <el-input v-model="dataForm.name" placeholder="请输入需要添加的比赛分类小类名称"/>
        </el-form-item>

        <el-form-item v-if="addRootCategory" label="比赛分类大类" prop="name">
          <el-input v-model="dataForm.name" placeholder="请输入需要添加的比赛分类大类名称"/>
        </el-form-item>
        <el-form-item v-if="addRootCategory" label="最多组队人数" prop="countLimit">
          <el-input-number v-model="dataForm.countLimit" :min="1" :max="10" label="组队人数"/>
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
import { getAllCategory, updateCategory, insertCategory, getCategoryById } from '@/api/info'

export default {
  data() {
    return {
      visible: false,
      dataForm: this.initForm(),
      categoryData: [],
      isAdd: true,
      isUpdate: true,
      notExitCategoryIds: [],
      exitCategoryIds: [],
      addRootCategory: true,
      dataRule: {
        countLimit: [
          { required: true, message: '组队人数不能为空', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '分类名称不能为空', trigger: 'blur' }
        ],
        parentId: [
          { required: true, message: '分类不能为空', trigger: 'blur' }
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
        this.getAllCategory()
        if (this.dataForm.id) {
          getCategoryById(this.dataForm.id).then((res) => {
            this.dataForm = res.data.data
            console.log(res.data.data)
            if (this.dataForm.parentId !== 0) {
              this.addRootCategory = false
            }
          }).catch((err) => {
            console.log(err)
          })
        } else {
          this.dataForm = {
            id: 0,
            parentId: '',
            name: '',
            countLimit: 1
          }
        }
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
        parentId: '',
        name: '',
        countLimit: 1
      }
    },
    dataFormSubmit() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          let api
          if (!this.dataForm.id) { // 新增
            api = insertCategory
            if (this.addRootCategory) {
              this.dataForm.parentId = 0
            } else {
              this.dataForm.countLimit = null
            }
          } else { // 修改
            api = updateCategory
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

