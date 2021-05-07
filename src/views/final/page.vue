<template>
  <el-row>
    <el-col :span="16" style="margin-top:10px;margin-left:10px;">
      <el-input v-model="team_id" placeholder="请输入队伍编号" style="width:40%;"/>
      <el-button type="success" @click="getWorksInfo()">确定</el-button>
      <div v-if="works!=null" style="width:90%">
        <span style="line-height:30px;">队伍编号:<span style="color:red">{{ works.team_id }}</span></span><br>
        <span style="line-height:30px;">参赛类别:<span style="color:red">{{ works.category.name }}</span></span><br>
        作品简介:<span style="line-height:25px;">{{ works.works_introduction }}</span><br><br>
        作品截图:
        <div v-if="images_url!=null">
          <div v-for="(url,index) in images_url" :key="index">
            <img :src="url" width="80%">
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
        <span
          v-if="works.installation_instructions!=null&&works.installation_instructions!=''"
          style="line-height:30px;">{{ works.installation_instructions }}<br></span>
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
        <span v-if="works.design_point!=null&&works.design_point!=''" style="line-height:30px;">{{ works.design_point }}<br></span>
        <span v-else style="line-height:30px;">暂无<br></span>
      </div>
    </el-col>
    <el-col :span="8" style="position:fixed;left:66%">
      <el-table
        :data="rateDetail"
        border
        style="width: 100%">
        <el-table-column
          prop="date"
          label="评分项目"
          width="180"/>
        <el-table-column
          prop="name"
          label="得分点"
          width="300"/>
      </el-table>
      <el-select v-model="recommend" placeholder="请选择" style="margin-top:10px;">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"/>
      </el-select>
      <el-input v-model="score" placeholder="请输入分数" style="width:60%;margin-top:10px;"/>
      <el-input v-model="comments" placeholder="请输入评语" style="width:60%;margin-top:10px;"/>
      <el-button type="primary" plain @click="rateWork()">提交</el-button>
    </el-col>
  </el-row>

</template>

<script>
import { initWorksInfo, rateWorks } from '@/api/final'

export default {
  data() {
    return {
      team_id: '',
      works: null,
      webids: [14, 15, 16, 66, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
      weids: [17, 18, 19, 20],
      recommend: '',
      score: '',
      images_url: null,
      rateDetail: [],
      options: [{
        value: '1',
        label: '强烈推荐'
      }, {
        value: '2',
        label: '推荐'
      }, {
        value: '3',
        label: '不推荐'
      }],
      media: [{
        date: '主题与内容（30分）',
        name: '主题符合大赛要求、内容能够清晰表达设计意图'
      }, {
        date: '美工与创意（25分）',
        name: '布置合理、色彩协调、特色鲜明、有新创意'
      }, {
        date: '技术与创新（30分）',
        name: '技术运用有创新、技巧熟练多且合理、设计开发规范'
      }, {
        date: '作品扣分（负分标记）',
        name: '（1）无法演示扣10分（2）媒体类作品主题元素与赛事主题元素无任何关联扣10分'
      }],
      weclass: [{
        date: '主题与内容（20分）',
        name: '主题符合大赛要求、教学内容科学正确，教学目标明确，作品结构完整'
      }, {
        date: '教学设计（20分）',
        name: '教学思想清晰、课程设计合理，有教学特色，教学方法得当，教学用语规范,教学资料完整'
      }, {
        date: '微视频（20分）',
        name: '教学视频图像清晰稳定、构图合理、声音清楚，主要教学环节有字幕、语音提示或操作提示，能较全面真实反映教学情境'
      }, {
        date: '美工与创意（10分）',
        name: '教学课件或视频界面布置合理、色彩协调、特色鲜明、有新创意'
      }, {
        date: '技术与创新（20分）',
        name: '技术运用有创新、技巧熟练多且合理教学形式新颖、趣味性强、教学目标达成'
      }, {
        date: '整体协调（10分）',
        name: '作品各方面协调配合、总体印象突出'
      }, {
        date: '作品扣分（负分标记）',
        name: '（1）无法演示扣10分（2）教学内容不切主题扣10分'
      }],
      program: [{
        date: '主题与内容（20分）',
        name: '主题符合大赛要求、内容能够清晰表达设计意图'
      }, {
        date: '方案概要（25）',
        name: '布置合理、色彩协调、特色鲜明、有新创意'
      }, {
        date: '核心内容展示（35分）',
        name: '技术运用有创新、技巧熟练多且合理、设计开发规范'
      }, {
        date: '技术与创新、原创性（20分）',
        name: '（1）无法演示扣10分（2）媒体类作品主题元素与赛事主题元素无任何关联扣10分'
      }, {
        date: '作品扣分（负分标记）',
        name: '（1）无法演示扣10分(2）非原创扣10分'
      }]
    }
  },
  computed: {},
  watch: {},
  mounted() {

  },
  methods: {
    getWorksInfo() {
      if (this.team_id == null || this.team_id.trim() == '') {
        this.$message({
          type: 'error',
          message: '请输入队伍编号!'
        })
        return
      }
      const para = {
        team_id: this.team_id
      }
      initWorksInfo(para).then((res) => {
        if (res.data.flag) {
          this.works = res.data.data
          if (this.works.works_img_url != null) {
            this.images_url = this.works.works_img_url.split(',')
          } else {
            this.images_url = null
          }
          const id = this.works.category.id
          let flag = false
          for (let i = 0; i < this.webids.length; i++) {
            if (id == this.webids[i]) {
              this.rateDetail = this.program
              flag = true
              break
            }
          }
          if (!flag) {
            for (let i = 0; i < this.weids.length; i++) {
              if (id == this.weids[i]) {
                this.rateDetail = this.weclass
                flag = true
                break
              }
            }
          }
          if (!flag) {
            this.rateDetail = this.media
          }
        } else {
          this.$message({
            type: 'error',
            message: res.data.message
          })
        }
      })
    },
    rateWork() {
      if (this.works == null || this.works == '' || this.recommend == null || this.recommend.trim() == '' || this.score == null || this.score.trim() == '' || this.comments.trim() === '') {
        this.$message({
          type: 'error',
          message: '请先完成信息'
        })
        return
      }
      const para = {
        works_id: this.works.id,
        recommend: this.recommend,
        score: this.score,
        comments: this.comments
      }
      rateWorks(para).then((res) => {
        if (res.data.flag) {
          this.$message({
            type: 'success',
            message: res.data.message
          })
          this.works = null
          this.rateDetail = null
          this.recommend = null
          this.score = null
          this.comments = null
          this.team_id = null
        } else {
          this.$message({
            type: 'error',
            message: res.data.message
          })
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
