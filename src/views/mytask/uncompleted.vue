<template>
  <div>
    <span style="color:red;float:left">10个为一组，评审完毕后，请点击刷新，获取新的任务</span><br>

    <el-button type="primary" style="float:left" @click="initTasks10()">刷新作品</el-button>
    <br><br>

    <span style="position:fixed;right:10px;">
      总计{{ total }}件作品<br>
      已完成{{ completed }}件作品<br>
      剩余<span style="color:red">{{ uncompleted }}</span>件作品<br>
    </span>
    <el-col v-for="works in task10" :key="works.id" :span="18" :offset="3" class="works-item">
      <span style="line-height:40px;">作品名:{{ works.works_name }}</span><br>
      <span style="line-height:30px;">参赛类别:{{ works.category.name }}</span><br>
      作品简介:<span v-if="works.works_introduction.length>150">{{
        works.works_introduction.substring(0, 150)
      }}······</span>
      <span v-else>{{ works.works_introduction }}</span>
      <el-button
        type="success"
        round
        style="float:right;margin-top:50px;"
        @click="showDetail(works),detailVisible=true">评审
      </el-button>
    </el-col>

    <el-dialog v-if="works!=null" :title="works.works_name" :visible.sync="detailVisible">
      <span style="line-height:30px;">队伍编号:<span style="color:red">{{ works.team_id }}</span></span><br>
      <span style="line-height:30px;">参赛类别:<span style="color:red">{{ works.category.name }}</span></span><br>
      作品简介:<span style="line-height:25px;">{{ works.works_introduction }}</span><br><br>
      作品截图:
      <div v-if="images_url!=null">
        <div v-for="(url,index) in images_url" :key="index">
          <img :src="url" width="100%">
        </div>
      </div>
      <div v-else>
        暂无
      </div>
      作品链接:
      <span style="line-height:30px;color:red">{{ works.works_url }}</span><br>
      开源代码与组件:
      <span
        v-if="works.operating_instructions!=null&&works.operating_instructions!=''"
        style="line-height:30px;">{{ works.operating_instructions }}<br></span>
      <span v-else style="line-height:30px;">暂无<br></span>
      安装说明:
      <span v-if="works.installation_instructions!=null&&works.installation_instructions!=''" style="line-height:30px;">{{
          works.installation_instructions
        }}<br></span>
      <span v-else style="line-height:30px;">暂无<br></span>
      设计思路:
      <span
        v-if="works.design_thought!=null&&works.design_thought!=''"
        style="line-height:30px;">{{ works.design_thought }}<br></span>
      <span v-else style="line-height:30px;">暂无<br></span>
      其他说明:
      <span
        v-if="works.other_description!=null&&works.other_description!=''"
        style="line-height:30px;">{{ works.other_description }}<br></span>
      <span v-else style="line-height:30px;">暂无<br></span>
      设计要点:
      <span v-if="works.design_point!=null&&works.design_point!=''" style="line-height:30px;">{{
          works.design_point
        }}<br></span>
      <span v-else style="line-height:30px;">暂无<br></span>
      <el-dialog
        :visible.sync="rateVisible"
        width="40%"
        title="评分"
        append-to-body>
        <span style="color:red;font-size:13px;">所有项均必填</span><br>
        <span style="color:red;font-size:13px;">85-100为优秀,60-84为一般,低于60为不符合主题,请输入整数</span>
        <el-form :model="raterForm" label-position="right" label-width="80px">
          <el-form-item label="得分">
            <el-input v-model="raterForm.score"/>
          </el-form-item>
          <el-form-item label="评语">
            <el-input v-model="raterForm.desc"/>
          </el-form-item>
          <el-button type="primary" @click="rate()">提交</el-button>
        </el-form>
      </el-dialog>
      <div slot="footer" class="dialog-footer">
        <el-button @click="detailVisible = false">取 消</el-button>
        <el-button type="primary" @click="rateVisible = true">输入分数</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getTasks10, rateWorks, getTaskDetail } from '@/api/review'

export default {
  data() {
    return {
      task10: [],
      detailVisible: false,
      rateVisible: false,
      works: null,
      images_url: [],
      raterForm: {
        wid: '',
        score: '',
        desc: ''
      },
      total: 0,
      completed: 0,
      uncompleted: 0
    }
  },
  mounted() {
    this.initTasks10()
    this.GetTaskDeail()
  },
  methods: {
    initTasks10() {
      getTasks10().then((res) => {
        if (res.data.flag) {
          this.task10 = res.data.data
        }
      }).catch(() => {

      })
    },
    GetTaskDeail() {
      getTaskDetail().then((res) => {
        if (res.data.flag) {
          this.total = res.data.data.total
          this.completed = res.data.data.completed
          this.uncompleted = res.data.data.uncompleted
        }
      })
    },
    showDetail(works) {
      this.works = works
      if (works.works_img_url != null) {
        this.images_url = works.works_img_url.split(',')
      } else {
        this.images_url = null
      }
    },
    rate() {
      this.raterForm.wid = this.works.id
      rateWorks(this.raterForm).then((res) => {
        if (res.data.flag) {
          this.detailVisible = false
          this.rateVisible = false
          this.completed += 1
          this.uncompleted -= 1
          this.raterForm.score = ''
          this.raterForm.desc = ''
          for (let i = 0; i < this.task10.length; i++) {
            if (this.task10[i].id == this.raterForm.wid) {
              this.task10.splice(i, 1)
              break
            }
          }
          this.$message({
            message: res.data.message,
            type: 'success'
          })
        }
      }).catch(() => {

      })
    }

  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
 .works-item{
     height: 200px;
     margin-top: 20px;
     border-top: 1px solid rgb(216, 220, 229);
     box-shadow: rgba(0, 0, 0, 0.12) 0px 6px 3px 0px, rgba(0, 0, 0, 0.04) 0px 0px 0px 0px;
 }
</style>
