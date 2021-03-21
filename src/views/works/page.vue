<template>
  <div >
    <div style="float:left;">
      友情提示：带<span style="color:red">*</span>号为必填<br>
      <!-- 完善作品功能将于<span style="color:red">3月30日</span>至<span style="color:red">4月8日</span>开放 -->
      <!--      <span style="color:red">本功能将于5月25日关闭</span>-->
    </div>
    <br>
    <br>
    <el-col v-if="tid!==null" :xs="24" :sm="24" :md="18" :lg="11" :xl="11" style="margin-left:3px;margin-top:20px;" >
      <el-form v-loading="teaminfoloading" ref="form" :model="form" :rules="worksRules" label-width="80px" class="auth-form">
        <el-form-item label="作品分类" class="auth-name">
          <el-input :placeholder="categoryB" disabled/>
        </el-form-item>
        <el-form-item label="队伍编号" class="auth-name">
          <el-input :placeholder="tid" disabled/>
        </el-form-item>
        <el-form-item label="作品名称" class="auth-name" prop="works_name">
          <el-input v-model="form.works_name"/>
        </el-form-item>
        <el-form-item label="指导老师" class="auth-name" prop="teacher_name">
          <el-input v-model="form.teacher_name" placeholder="多个请以分号分隔"/>
        </el-form-item>
        <el-form-item label="作品简介" class="auth-name" prop="works_introduction">
          <el-input
            :rows="3"
            v-model="form.works_introduction"
            type="textarea"
            placeholder="请输入内容"/>
        </el-form-item>
        <el-form-item label="开源代码与组件使用情况说明" class="auth-name" prop="operating_instructions">
          <el-input
            :rows="5"
            v-model="form.operating_instructions"
            type="textarea"
            placeholder="请输入内容"/>
        </el-form-item>
        <el-form-item label="作品安装说明" class="auth-name" prop="installation_instructions">
          <el-input
            :rows="4"
            v-model="form.installation_instructions"
            type="textarea"
            placeholder="请输入内容"/>
        </el-form-item>
        <el-form-item label="作品效果图" class="auth-name">
          <el-upload
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :on-success="hanleSuccess"
            :before-upload="handleBeforeUpload"
            :limit="3"
            :on-exceed="handleExceed"
            :file-list="imageList"
            action="http://121.40.238.199:10010/upload-service/upload/image"
            list-type="picture-card">
            <i class="el-icon-plus"/>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img :src="dialogImageUrl" width="100%" alt="">
          </el-dialog>
        </el-form-item>
        <el-form-item label="设计思路" class="auth-name" prop="design_thought">
          <el-input
            :rows="4"
            v-model="form.design_thought"
            type="textarea"
            placeholder="请输入内容"/>
        </el-form-item>
        <el-form-item label="设计重点和难点" class="auth-name" prop="design_point">
          <el-input
            :rows="4"
            v-model="form.design_point"
            type="textarea"
            placeholder="请输入内容"/>
        </el-form-item>
        <el-form-item label="其他说明" class="auth-name" prop="other_description">
          <el-input
            :rows="4"
            v-model="form.other_description"
            type="textarea"
            placeholder="请输入内容"/>
        </el-form-item>
        <el-form-item label="作品百度云链接" prop="works_url">
          <el-input
            v-model="form.works_url"
            type="text"
            placeholder="http开头"/>
        </el-form-item>
        <el-form-item label="提取码" class="auth-name" prop="works_key">
          <el-input
            v-model="form.works_key"
            type="text"
            placeholder="请输入提取码"/>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="saveWorks()" >提交</el-button>
        </el-form-item>
      </el-form>

    </el-col>

    <el-dialog
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      title="请先选择作品"
      width="50%"
    >
      <div v-if="ownTeam.length==0">
        您名下还没有任何队伍！<br>
        <router-link to="/">返回首页</router-link>
      </div>
      <el-col v-for="(team,index) in ownTeam" v-else :key="index" :xs="24" :sm="24" :md="18" :lg="11" :xl="11" style="margin-right:10px;margin-top:10px;margin-bottom:10px;">
        <el-container >
          <el-header>
            队伍{{ index+1 }}
          </el-header>
          <el-main style="min-height:160px;">
            <span style="line-height:28px;">
              <strong>所属大类:</strong>{{ team.categoryA.name }}<br>
            </span>
            <span style="line-height:28px;">
              <strong>所属小类:</strong>{{ team.categoryB.name }}<br>
            </span>
          </el-main>
          <el-footer style="text-align:center;padding-top:10px;">
            <el-button type="success" round style="width:73px;padding: 10px 8px;" @click="choseTeam(team)">选择</el-button>
          </el-footer>
        </el-container>
      </el-col>
      <div style="clear:both"/>
    </el-dialog>
  </div>

</template>

<script>
import { getOwnTeam } from '@/api/myteam'
import { saveWorksAPI, getWorksInfo } from '@/api/works'
import { validURL } from '@/utils/validate'

export default {
  data() {
    const max20 = (rule, value, callback) => {
      if (value == null || value === '') {
        callback(new Error('该项为必须项'))
      }
      if (value.length > 20) {
        callback(new Error('最大为20个字符'))
      }
      callback()
    }
    const max150 = (rule, value, callback) => {
      if (value == null || value === '') {
        callback(new Error('该项为必须项'))
      }
      if (value.length > 150) {
        callback(new Error('最大为20个字符'))
      }
      callback()
    }
    const validUrl = (rule, value, callback) => {
      if (!validURL(value)) {
        callback(new Error('请输入正确的分享链接'))
      }
      callback()
    }
    const validKey = (rule, value, callback) => {
      if (value == null || value === '') {
        callback(new Error('请输入提取码'))
        return
      }
      if (value.length !== 4) {
        callback(new Error('请输入正确的提取码'))
      }
      callback()
    }
    const max550 = (rule, value, callback) => {
      /*  let total = this.form.works_name.length + this.form.teacher_name.length + this.form.works_introduction.length + this.form.works_url.length
        if (this.form.operating_instructions !== null) {
          total += this.form.operating_instructions.length
        }
        if (this.form.installation_instructions !== null) {
          total += this.form.installation_instructions.length
        }
        if (this.form.design_thought !== null) {
          total += this.form.design_thought.length
        }
        if (this.form.design_point !== null) {
          total += this.form.design_point.length
        }
        if (this.form.other_description !== null) {
          total += this.form.other_description.length
        }
        if (this.form.imagestring !== null) {
          total += this.form.imagestring.length
        }
        if (total > 550) {
          callback(new Error('当前页面最多可输入550个字符'))
        }
        if (value.length > 150) {
          callback(new Error('最大为20个字符'))
        }
        callback()*/
      callback()
    }
    return {
      form: {
        team_id: '',
        works_name: '',
        teacher_name: '',
        works_introduction: '',
        operating_instructions: '',
        installation_instructions: '',
        design_thought: '',
        design_point: '',
        other_description: '',
        // other_description:'',
        works_url: '',
        works_key: '',
        imagestring: ''
      },
      worksRules: {
        works_name: [{ required: true, trigger: 'blur', validator: max20 }],
        teacher_name: [{ required: true, trigger: 'blur', validator: max20 }],
        works_introduction: [{ required: true, trigger: 'blur', validator: max150 }],
        operating_instructions: [{ required: false, trigger: 'blur', validator: max550 }],
        installation_instructions: [{ required: false, trigger: 'blur', validator: max550 }],
        design_thought: [{ required: false, trigger: 'blur', validator: max550 }],
        design_point: [{ required: false, trigger: 'blur', validator: max550 }],
        other_description: [{ required: false, trigger: 'blur', validator: max550 }],
        works_url: [{ required: true, trigger: 'blur', validator: validUrl }],
        works_key: [{ required: true, trigger: 'blur', validator: validKey }]
      },
      tid: this.$route.params.tid,
      ownTeam: '',
      dialogVisible: false,
      teaminfoloading: true,
      dialogImageUrl: '',
      categoryB: '',
      imageList: [],
      images: []
    }
  },
  mounted() {
    if (this.tid == null) {
      this.teaminfoloading = true
      getOwnTeam().then((res) => {
        this.ownTeam = res.data.data
        this.teaminfoloading = false
      }).catch(() => {
      })
      this.dialogVisible = true
    }
  },
  methods: {
    choseTeam(team) {
      this.tid = team.id
      this.categoryB = team.categoryB.name
      const para = {
        tid: this.tid
      }
      getWorksInfo(para).then((res) => {
        if (res.data.flag) {
          if (res.data.data !== null) {
            this.form = res.data.data
            if (res.data.data.works_img_url !== null && res.data.data.works_img_url !== '') {
              this.form.imagestring = res.data.data.works_img_url
              this.imageList = this.string2image(res.data.data.works_img_url)
              this.images = res.data.data.works_img_url.split(',')
            }
          }
        } else {
          this.$message({
            message: res.data.message,
            type: 'error'
          })
        }
      }).catch(() => {
      })
      this.dialogVisible = false
    },
    handleClose(done) {
      if (this.tid == null) {
        this.$message({
          message: '您尚未选择队伍',
          type: 'error'
        })
      } else {
        done()
      }
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleRemove(file, fileList) {
      var that = this
      this.images.forEach(function(value, i) {
        if (file.url === value) {
          that.images.splice(i, 1)
        }
      })
      this.form.imagestring = ''
      for (let i = 0; i < this.images.length; i++) {
        if (i === 0) {
          this.form.imagestring += this.images[i]
        } else {
          this.form.imagestring = this.form.imagestring + ',' + this.images[i]
        }
      }
    },
    hanleSuccess(response, file, fileList) {
      this.images.push(response)
      this.form.imagestring = ''
      for (let i = 0; i < this.images.length; i++) {
        if (i === 0) {
          this.form.imagestring += this.images[i]
        } else {
          this.form.imagestring = this.form.imagestring + ',' + this.images[i]
        }
      }
    },
    string2image(str) {
      var res = []
      var temp = str.split(',')
      for (let i = 0; i < temp.length; i++) {
        res.push({ 'url': temp[i] })
      }
      return res
    },
    handleBeforeUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isPNG = file.type === 'image/png'
      const isLt5M = file.size / 1024 / 1024 < 1
      if (!isJPG && !isPNG) {
        this.$message.error('上传图片只能是 JPG/PNG 格式!')
      }
      if (!isLt5M) {
        this.$message.error('上传图片大小不能超过 1MB!')
      }
      return (isJPG || isPNG) && isLt5M
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    saveWorksByPart() {

    },
    saveWorks() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.form.team_id = this.tid
          saveWorksAPI(this.form).then((res) => {
            this.teaminfoloading = true
            if (res.data.flag) {
              this.$message({
                message: res.data.message,
                type: 'success'
              })
              const para = {
                tid: this.tid
              }
              getWorksInfo(para).then((res) => {
                this.teaminfoloading = false
                if (res.data.flag) {
                  if (res.data.data !== null) {
                    this.form = res.data.data
                    if (res.data.data.works_img_url !== null && res.data.data.works_img_url !== '') {
                      this.form.imagestring = res.data.data.works_img_url
                      this.imageList = this.string2image(res.data.data.works_img_url)
                      this.images = res.data.data.works_img_url.split(',')
                    }
                  }
                } else {
                  this.$message({
                    message: res.data.message,
                    type: 'error'
                  })
                  this.teaminfoloading = false
                }
              })
            } else {
              this.$message({
                message: res.data.message,
                type: 'error'
              })
              this.teaminfoloading = false
            }
          }).catch(() => {
            this.teaminfoloading = false
          })
        } else {
          this.$message({
            message: '请先完善信息',
            type: 'error'
          })
          return false
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  .el-header{
      background-color: #B3C0D1;
      color: #333;
      text-align: center;
      line-height: 60px;
    }
  .el-main {
    background-color: #E9EEF3;
    color: #333;
  }
  .el-footer {
      background-color: #B3C0D1;
      color: #333;
    }
</style>
