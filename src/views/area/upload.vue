<template>
  <div>
    <div style="float: left;">
      <el-upload
        :limit="limitNum"
        :auto-upload="false"
        :action="UploadUrl()"
        :before-upload="beforeUploadFile"
        :on-change="fileChange"
        :on-exceed="exceedFile"
        :on-success="handleSuccess"
        :on-error="handleError"
        :file-list="fileList"
        drag
        accept=".xlsx">
        <i class="el-icon-upload"/>
        <div class="el-upload__text">请先下载模板文件，填写好模板文件后,将文件拖到此处，或<em>点击上传</em></div>
      </el-upload>
    </div>
    <div style="float: left;margin-left: 10px;">
      <h3>只能上传下载的模板xlsx文件，且不超过10M</h3>
      <el-button size="small" type="info" @click="downloadTemplate()">下载模板文件</el-button>
      <br><br><br>
      <el-button size="small" type="primary" @click="uploadFile">立即上传</el-button>
      <el-button size="small">取消</el-button>

    </div>
  </div>
</template>

<script>
import { uploadFile, downloadTemplate } from '../../api/info'
import fileDownload from 'js-file-download'

export default {
  data() {
    return {
      limitNum: 1, // 上传excell时，同时允许上传的最大数
      fileList: [] // excel文件列表
    }
  },
  methods: {
    // 文件超出个数限制时的钩子
    exceedFile(files, fileList) {
      this.$message.warning(`只能选择 ${this.limitNum} 个文件，当前共选择了 ${files.length + fileList.length} 个`)
    },
    // 文件状态改变时的钩子
    fileChange(file, fileList) {
      console.log(file.raw)
      this.fileList.push(file.raw)
      console.log(this.fileList)
    },
    // 上传文件之前的钩子, 参数为上传的文件,若返回 false 或者返回 Promise 且被 reject，则停止上传
    beforeUploadFile(file) {
      const extension = file.name.substring(file.name.lastIndexOf('.') + 1)
      const size = file.size / 1024 / 1024
      if (extension !== 'xlsx') {
        this.$message.warning('只能上传后缀是.xlsx的文件')
      }
      if (size > 10) {
        this.$message.warning('文件大小不得超过10M')
      }
    },
    // 文件上传成功时的钩子
    handleSuccess(res, file, fileList) {
      this.$message.success('文件上传成功')
    },
    // 文件上传失败时的钩子
    // eslint-disable-next-line handle-callback-err
    handleError(err, file, fileList) {
      this.$message.error('文件上传失败')
    },
    UploadUrl: function() {
      // 因为action参数是必填项，我们使用二次确认进行文件上传时，直接填上传文件的url会因为没有参数导致api报404，所以这里将action设置为一个返回为空的方法就行，避免抛错
      return ''
    },
    uploadFile() {
      if (this.fileList.length === 0) {
        this.$message.warning('请上传文件')
      } else {
        const loading = this.$loading({
          lock: true,
          text: '解析中',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        const form = new FormData()
        const file = this.fileList[0]
        form.append('file', file)
        uploadFile(form).then((response) => {
          if (response && response.data.code === 50000) {
            this.$message({
              message: '操作成功',
              type: 'success',
              duration: 1000,
              onClose: () => {
                this.$emit('refreshDataList')
                loading.close()
              }
            })
          } else {
            this.$message.error(response.data.message)
            loading.close()
          }
          // eslint-disable-next-line handle-callback-err
        }).catch((err) => {
          loading.close()
          this.$message.error('解析失败，请检查是否有重复数据，或者联系管理员')
        })
      }
    },
    downloadTemplate() {
      downloadTemplate().then((res) => {
        this.$message.success('正在下载,请稍等')
        const fileName = '答辩队伍.xlsx'
        fileDownload(res.data, fileName)
      }).catch((err) => {
        this.$message.error(err.response.data.message)
      })
    }
  }
}
</script>

<style scoped>

</style>
