<template>
  <div>
    <el-dialog
      :close-on-click-modal="false"
      :visible.sync="visible"
      title="时间设置">
      <el-form
        ref="dataForm"
        :model="dataForm"
        :rules="dataRule"
        label-width="150px"
        @keyup.enter.native="dataFormSubmit()">

        <el-form-item label="报名截止时间" prop="enrollEndTime">
          <el-date-picker
            v-model="dataForm.enrollEndTime"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetime"
            placeholder="选择日期"/>
        </el-form-item>

        <el-form-item label="文件上传开始时间" prop="uploadStartTime">
          <el-date-picker
            v-model="dataForm.uploadStartTime"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetime"
            placeholder="选择日期"/>
        </el-form-item>

        <el-form-item label="文件上传截止时间" prop="uploadEndTime">
          <el-date-picker
            v-model="dataForm.uploadEndTime"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetime"
            placeholder="选择日期"/>
        </el-form-item>

        <el-form-item label="最终答辩时间" prop="replyStartTime">
          <el-date-picker
            v-model="dataForm.replyStartTime"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetime"
            placeholder="选择日期"/>
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
import { timeGetUpdateVO, timeSet } from '@/api/info'

export default {
  data() {
    return {
      visible: false,
      dataForm: this.initForm(),
      dataRule: {
        enrollEndTime: [
          { required: true, message: '报名截止时间不能为空', trigger: 'blur' }
        ],
        uploadStartTime: [
          { required: true, message: '文件上传开始时间不能为空', trigger: 'blur' }
        ],
        uploadEndTime: [
          { required: true, message: '文件上传截止时间场地不能为空', trigger: 'blur' }
        ]

      }
    }
  },
  created() {
  },
  methods: {
    init() {
      this.visible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
        timeGetUpdateVO().then((res) => {
          this.dataForm = res.data.data
        }).catch((err) => {
          console.log(err)
        })
      })
    },

    initForm() {
      return {
        enrollEndTime: '',
        uploadStartTime: '',
        uploadEndTime: '',
        replyStartTime: ''
      }
    },
    dataFormSubmit() {
      console.log(this.dataForm)
      this.$refs['dataForm'].validate((valid) => {
        timeSet(this.dataForm).then((response) => {
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
      )
    }

  }
}

</script>

<style>

</style>

