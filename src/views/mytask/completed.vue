<template>
    <div style="margin-top:10px;margin-left:50px;">
        <el-table
            :data="completedworks"
            stripe
            style="width: 100%">
            <el-table-column
            prop="works_name"
            label="作品名称"
            width="180px">
            </el-table-column>
            <el-table-column
            prop="score"
            width="180px"
            label="分数">
            </el-table-column>
            <el-table-column
            prop="desc"
            width="180px"
            label="评语">
            </el-table-column>
            <el-table-column
            width="120"
            label="操作">
            <template slot-scope="scope">
                <el-button type="primary"  @click="showDetail(scope.row),detailVisible=true">查阅/修改</el-button>
            </template>
            </el-table-column>
        </el-table>
        <!-- <el-col :xs="16" :sm="14" :md="6" :lg="4" :xl="4" v-for="(works,index) in completedworks" :key="index" style="margin-right:15px;">
            <el-container>
                <el-header>{{works.works_name}}</el-header>
                <el-main style="line-height:25px;"><span v-if="works.works_introduction.length>50" >{{works.works_introduction.substring(0,50)}}······</span>
            <span v-else>{{works.works_introduction}}</span></el-main>
                <el-footer><el-button type="primary" icon="el-icon-edit" circle style="float:right;margin-top:8px;" @click="showDetail(works),detailVisible=true"></el-button></el-footer>
            </el-container>
        </el-col> -->


        <el-dialog v-if="works!=null" :title="works.works_name" :visible.sync="detailVisible">
            <span style="line-height:30px;">队伍编号:<span style="color:red">{{works.team_id}}</span></span><br>
            <span style="line-height:30px;">参赛类别:<span style="color:red">{{works.category.name}}</span></span><br>
             作品简介:<span style="line-height:25px;">{{works.works_introduction}}</span><br><br>
            作品截图:
            <div v-if="images_url!=null">
                <div  v-for="(url,index) in images_url" :key="index">
                    <img :src="url" width="100%"/>
                </div>
            </div>
            <div v-else>
                暂无
            </div>
            作品链接:
            <span style="line-height:30px;color:red">{{works.works_url}}</span><br>
            开源代码与组件:
            <span v-if="works.operating_instructions!=null&&works.operating_instructions!=''" style="line-height:30px;">{{works.operating_instructions}}<br></span>
            <span v-else style="line-height:30px;">暂无<br></span>
            安装说明:
            <span v-if="works.installation_instructions!=null&&works.installation_instructions!=''" style="line-height:30px;">{{works.installation_instructions}}<br></span>
            <span v-else style="line-height:30px;">暂无<br></span>
            设计思路:
            <span v-if="works.design_thought!=null&&works.design_thought!=''" style="line-height:30px;">{{works.design_thought}}<br></span>
            <span v-else style="line-height:30px;">暂无<br></span>
            其他说明:
            <span v-if="works.other_description!=null&&works.other_description!=''" style="line-height:30px;">{{works.other_description}}<br></span>
            <span v-else style="line-height:30px;">暂无<br></span>
            设计要点:
            <span v-if="works.design_point!=null&&works.design_point!=''" style="line-height:30px;">{{works.design_point}}<br></span>
            <span v-else style="line-height:30px;">暂无<br></span>
            <el-dialog
            width="40%"
            title="评分"
            :visible.sync="rateVisible"
            append-to-body>
            <span style="color:red;font-size:13px;">所有项均必填</span><br>
             <span style="color:red;font-size:13px;">85-100为优秀,60-84为一般,低于60为不符合主题,请输入整数</span>
            <el-form label-position="right" label-width="80px" :model="raterForm">
                <el-form-item label="得分">
                    <el-input v-model="raterForm.score"></el-input>
                </el-form-item>
                <el-form-item label="评语">
                    <el-input v-model="raterForm.desc"></el-input>
                </el-form-item>
                <el-button type="primary" @click="updateScore()">提交</el-button>
            </el-form>
            </el-dialog>
            <div slot="footer" class="dialog-footer">
            <el-button @click="detailVisible = false">取 消</el-button>
            <el-button type="primary" @click="rateVisible = true,getOldScore(works.id);">更改分数</el-button>
            </div>
        </el-dialog>
    </div>


    
</template>

<script>

import {getAllCompletedWorks,oldScore,updataScore } from '@/api/review'


export default {
    data() {
      return {
          completedworks:[],
          detailVisible:false,
          rateVisible:false,
          works:null,
          images_url:[],
          raterForm:{
              wid:'',
              score:'',
              desc:'',
          }
      }
    },
    methods:{
        initCompleted(){
            getAllCompletedWorks().then((res)=>{
                if(res.data.flag){
                    this.completedworks = res.data.data;
                    this.completedworks.reverse();
                }
            })
        },
        showDetail(works){
          this.works = works;
          if(works.works_img_url!=null){
              this.images_url = works.works_img_url.split(",")
          }else{
              this.images_url = null;
          }
      },
      getOldScore(wid){
          let para = {
              wid:wid
          }
          oldScore(para).then((res)=>{
                if(res.data.flag){
                    this.raterForm.score = res.data.data.score;
                    this.raterForm.desc = res.data.data.desc;
                }
            })
      },
      updateScore(){
           this.raterForm.wid = this.works.id;
          this.$confirm('是否确认修改分数', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
              updataScore(this.raterForm).then((res)=>{
                  if(res.data.flag){
                      this.detailVisible = false;
                      this.rateVisible=false;
                       this.$message({
                            type: 'success',
                            message: '修改成功!'
                        });
                  }else{
                      this.$message.error('鬼知道哪里出问题了');
                  }
              })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消修改'
          });          
        });
      }
    },
    mounted(){
        this.initCompleted();
    }

}
</script>

<style>
    .el-header, .el-footer {
        background-color: #B3C0D1;
        color: #333;
        text-align: center;
        line-height: 60px;
    }
    .el-main {
        background-color: #E9EEF3;
        color: #333;
        text-align: center;
        line-height: 160px;
    }
</style>
