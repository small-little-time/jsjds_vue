<template>
  <el-form v-loading="saving" ref="form" :model="form" :rules="mineInfoRules" label-width="80px" class="class-form">
    <span v-if="!tipflag" style="font-size:14px;margin-left:5%;line-height:40px;">您当前状态:<span style="color:red">不可加入队伍，请先补全信息</span></span>
    <span v-else style="font-size:14px;margin-left:5%;line-height:40px;">您当前状态:<span style="color:green"><strong>恭喜!快点击左侧'我的队伍'，加入队伍吧！</strong></span></span>
    <el-row>
      <el-col :xs="24" :sm="16" :md="16" :lg="12" :xl="10">
        <el-form-item label="姓名" class="class-name" prop="realname">
          <el-input v-model="form.realname" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :xs="24" :sm="16" :md="16" :lg="12" :xl="10">
        <el-form-item label="学号" class="academy-name">
          <el-input v-model="form.stu_number" disabled />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :xs="24" :sm="16" :md="16" :lg="12" :xl="10">
        <el-form-item label="二级学院" class="academy-name">
          <el-autocomplete
            :disabled="state.academy"
            v-model="academy_name"
            :fetch-suggestions="queryAcademyAsync"
            placeholder="“二级学院”和“专业”仅允许填写一次，填写之后无法再修改。"
            value-key="academy_name"
            style="width: 100%"
            @select="handleAcademySelect"
          />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :xs="24" :sm="16" :md="16" :lg="12" :xl="10">
        <el-form-item label="专业" class="academy-name">
          <el-select v-model="form.major_id" :disabled="state.major" placeholder="请先选择学院" style="width: 100%">
            <el-option
              v-for="item in majors"
              :key="item.id"
              :label="item.academy_name"
              :value="item.id"/>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :xs="24" :sm="16" :md="16" :lg="12" :xl="10">
        <el-form-item label="身份证" class="academy-name" prop="id_number">
          <el-input v-model="form.id_number" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :xs="24" :sm="16" :md="16" :lg="12" :xl="10" >
        <el-form-item label="邮箱" class="academy-name" prop="mail">
          <el-input v-model="form.mail" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :xs="24" :sm="16" :md="16" :lg="12" :xl="10">
        <el-form-item label="电话" class="academy-name" prop="phone">
          <el-input v-model="form.phone" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :xs="24" :sm="16" :md="16" :lg="12" :xl="10">
        <el-form-item label="QQ" class="academy-name" prop="qq">
          <el-input v-model="form.qq" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :xs="24" :sm="16" :md="16" :lg="12" :xl="10">
        <el-form-item label="学生证" class="auth-images">
          <el-upload
            :on-preview="handlePictureCardPreview"
            :before-remove="handleBeforeRemove"
            :on-success="hanleSuccess"
            :limit="1"
            :on-exceed="handleExceed"
            :before-upload="handleBeforeUpload"
            :file-list="imageList"
            action="http://121.40.238.199:10010/upload-service/upload/image"
            list-type="picture-card">
            <i class="el-icon-plus" />
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img :src="dialogImageUrl" width="100%" alt="">
          </el-dialog>
          <span style="color:red;font-size:12px;">*照片格式为jpg或png，大小为1MB以内(图片上传保存成功后，将无法删除)</span>
        </el-form-item>
      </el-col>
    </el-row>
    <span style="color:red;font-size:13px;margin-left:5%">*保存完学院、专业、学生证才可以加入队伍哦</span><br>

    <el-form-item>
      <el-button :loading="creating" type="primary" @click="saveStudent()" >保存</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { queryAcademyByName, initStudentInfo, saveStudentInfo } from '@/api/mine'
import { validatePhoneNumber, validEmail, validateIDNumber, validQQ } from '@/utils/validate'

export default {
  data() {
    const validateRealName = (rule, value, callback) => {
      if (value == null || (value.length < 2 || value.length > 5)) {
        callback(new Error('请输入正确的姓名'))
      } else {
        callback()
      }
    }
    const validateiDNumber = (rule, value, callback) => {
      if (!validateIDNumber(value)) {
        callback(new Error('请输入正确的身份证号码'))
      } else {
        callback()
      }
    }
    const validemail = (rule, value, callback) => {
      if (!validEmail(value)) {
        callback(new Error('请输入正确的邮箱'))
      } else {
        callback()
      }
    }
    const validateQQ = (rule, value, callback) => {
      if (!validQQ(value)) {
        callback(new Error('请输入正确的QQ'))
      } else {
        callback()
      }
    }
    const validatePhonenumber = (rule, value, callback) => {
      if (!validatePhoneNumber(value)) {
        callback(new Error('请输入正确的手机号'))
      } else {
        callback()
      }
    }

    return {
      form: {
        realname: '',
        academy_id: '',
        major_id: '',
        id_number: '',
        mail: '',
        phone: '',
        qq: ''
      },
      mineInfoRules: {
        realname: [{ required: true, trigger: 'blur', validator: validateRealName }],
        id_number: [{ required: true, trigger: 'blur', validator: validateiDNumber }],
        mail: [{ required: true, trigger: 'blur', validator: validemail }],
        phone: [{ required: true, trigger: 'blur', validator: validatePhonenumber }],
        qq: [{ required: true, trigger: 'blur', validator: validateQQ }]
      },
      state: {
        academy: false,
        major: false
      },
      academy_temp: '',
      academy_name: '',
      academy_result: '',
      majors: '',
      major_name: '',
      creating: false,
      dialogImageUrl: '',
      dialogVisible: false,
      imageList: [],
      images: [],
      delimageflag: false,
      saving: false,
      tipflag: false
    }
  },
  mounted() {
    this.initStudent()
  },
  methods: {
    queryAcademyAsync(queryString, cb) {
      var that = this
      if (queryString !== null && queryString !== '' && that.academy_temp !== queryString) {
        const para = {
          name: queryString
        }
        queryAcademyByName(para).then((res) => {
          var results = res.data.data
          cb(results)
          that.academy_result = results
        }).catch(() => {
        })
        that.academy_temp = queryString
      } else {
        if (that.academy_name == null || that.academy_name === '') {
          that.academy_result = []
        } else {
          cb(that.academy_result)
        }
      }
    },
    handleAcademySelect(item) {
      this.form.major_id = ''
      this.form.academy_id = item.id
      this.majors = item.academies
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },

    handleBeforeRemove(file, fileList) {
      if (this.delimageflag) {
        this.delimageflag = false
        return true
      } else {
        this.$message.error('对不起！暂不支持删除！如有疑问请联系工作人员')
        return false
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
    handleExceed(files, fileList) {
      this.delimageflag = true
      this.$message.error('每位用户仅允许上传一张图片')
    },
    handleBeforeUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isPNG = file.type === 'image/png'
      const isLt5M = file.size / 1024 / 1024 < 1
      if (!isJPG && !isPNG) {
        this.delimageflag = true
        this.$message.error('上传头像图片只能是 JPG/PNG 格式!' + file.type)
      }
      if (!isLt5M) {
        this.delimageflag = true
        this.$message.error('上传头像图片大小不能超过 5MB!')
      }
      return (isJPG || isPNG) && isLt5M
    },
    saveStudent() {
      this.$refs.form.validate(valid => {
        if (valid) {
          if (this.form.academy_id == null || this.form.academy_id === '' ||
              this.form.major_id == null || this.form.major_id === '') {
            this.$message({
              message: '学院与专业必选的哦',
              type: 'error'
            })
            return
          }
          this.saving = true
          saveStudentInfo(this.form).then((res) => {
            if (res.data.flag) {
              this.$message({
                message: res.data.message,
                type: 'success'
              })
            } else {
              this.$message({
                message: res.data.message,
                type: 'error'
              })
            }
            this.saving = false
            this.$confirm("保存成功！是否立即跳转至'我的队伍'页面进行报名?", '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'success'
            }).then(() => {
              this.$router.push({ path: '/myteam/dashboard' })
            }).catch(() => {
              this.initStudent()
            })
          }).catch(() => {
            this.saving = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    initStudent() {
      this.saving = true
      initStudentInfo().then((res) => {
        if (res.data.data.academy !== null && res.data.data.academy !== '') {
          this.state.academy = true
        }
        if (res.data.data.major !== null && res.data.data.major !== '') {
          this.state.major = true
        }
        // eslint-disable-next-line no-sequences
        this.form.realname = res.data.data.stu_name,
        this.form.id_number = res.data.data.id_number,
        this.form.mail = res.data.data.stu_mail,
        this.form.phone = res.data.data.stu_phone,
        this.form.qq = res.data.data.stu_qq,
        this.form.stu_number = res.data.data.stu_number
        this.academy_name = res.data.data.academy.academy_name
        if (res.data.data.academy.academy_name !== null && res.data.data.academy.academy_name !== '') {
          this.form.academy_id = -1
        }
        if (res.data.data.major !== null) {
          this.form.major_id = res.data.data.major.academy_name
        } else {
          this.majors = res.data.data.academy.academies
        }
        if (res.data.data.stu_idCard !== null && res.data.data.stu_idCard !== '') {
          this.images = []
          this.imageList = []
          this.images.push(res.data.data.stu_idCard)
          this.imageList.push({ 'url': res.data.data.stu_idCard })
        }
        if (res.data.data.academy !== null && res.data.data.academy !== '' &&
          res.data.data.major !== null && res.data.data.major !== '' &&
          res.data.data.stu_idCard !== null && res.data.data.stu_idCard !== '') {
          this.tipflag = true
        }
        this.saving = false
      }).catch(() => {
        this.saving = false
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.class-form{
  width: 80%;
  margin-left: 5%;
  margin-top: 40px;
  .class-name{
  }
  .academy-name{
  }
}

</style>
