<template>
  <div style="margin-top:15px">
    <span style="margin-left:10px;margin-bottom:10px;">我创建的队伍</span>
    <el-row style="margin-left:10px;" v-loading="teaminfoloading">
      <el-col v-for="(team,index) in ownTeam" :key="index"  :xs="16" :sm="14" :md="6" :lg="4" :xl="4" style="margin-right:10px;margin-top:10px;margin-bottom:10px;">
        <el-container>
          <el-header>
            队伍{{index+1}}
            <span style="color:red;font-size:13px">（最多{{team.categoryA.count_limit}}人）</span>
            <el-popover
              placement="top-start"
              title="解散队伍"
              width="40"
              trigger="hover"
              content="您将解散此队伍，请慎重操作！！！">
              <el-button type="danger" icon="el-icon-delete" circle style="margin-top:13px;float:right" slot="reference" @click="teamDismiss(team.id)"></el-button>
            </el-popover>
            
            </el-header>
          <el-main style="min-height:204px;">
            <span style="line-height:28px;">
              <strong>所属大类:</strong>{{team.categoryA.name}}<br>
            </span>
            <span style="line-height:28px;">
              <strong>所属小类:</strong>{{team.categoryB.name}}<br>
            </span>
            <span style="line-height:28px;">
              <strong>邀请码:</strong>{{team.invitation_code}}<span style="color:#E6A23C;font-size:11px;">(快把我告诉你的小伙伴吧！)</span><br>
            </span>
          </el-main>
          <el-footer>
            <el-button type="primary" round style="margin-top:10px;float:left;width:73px;padding: 10px 8px;"  @click="changeindex(team.id)">调整队伍</el-button>
            <el-button type="success" round style="margin-top:10px;float:right;width:73px;padding: 10px 8px;" @click="teamDialogVisible = true,getTeamMate(team.id)">查看队员</el-button>
          </el-footer>
        </el-container>
      </el-col>
    </el-row>

    <span style="margin-left:10px;margin-bottom:10px;">我加入的队伍</span>
    <el-row style="margin-left:10px;">
      <el-col v-for="(team,index) in otherTeam" :key="index" :xs="16" :sm="14" :md="6" :lg="4" :xl="4" style="margin-right:10px;margin-top:10px;margin-bottom:10px;">
        <el-container >
          <el-header>队伍{{index+1}}<span style="color:red;font-size:13px">（最多{{team.categoryA.count_limit}}人）</span></el-header>
          <el-main style="min-height:204px;">
            <span style="line-height:28px;">
              <strong>所属大类:</strong>{{team.categoryA.name}}<br>
            </span>
            <span style="line-height:28px;">
              <strong>所属小类:</strong>{{team.categoryB.name}}<br>
            </span>
            <span style="line-height:28px;">
              <strong>邀请码:</strong>{{team.invitation_code}}<br>
            </span>
            <span style="line-height:28px;">
              <strong>第一作者姓名:</strong>{{team.owner.stu_name}}<br>
            </span>
            <span style="line-height:28px;">
              <strong>第一作者学号:</strong>{{team.owner.stu_number}}<br>
            </span>
          </el-main>
          <el-footer>
            <el-button type="danger" round style="margin-top:10px;float:left;width:73px;padding: 10px 8px;" @click="exitTeam(team.id)">退出队伍</el-button>
            <el-button type="success" round style="margin-top:10px;float:right;width:73px;padding: 10px 8px;" @click="teamDialogVisible = true,getTeamMate(team.id)">查看队员</el-button>
          </el-footer>
        </el-container>
      </el-col>
    </el-row>
    
    <el-row style="margin-top:10px;">
      您可以<el-button type="primary" @click="dialogFormVisible = true,initCategoryInfo1()">创建队伍</el-button>或者
      <el-button type="warning" @click="dialogAddTeamVisible = true">加入队伍</el-button>
      <el-dialog title="创建队伍" :visible.sync="dialogFormVisible" width="60%">
        <el-form :model="form" style="width:100%">
          <el-row>
            <el-col :xs="24" :sm="24" :md="20" :lg="20" :xl="20">
                <el-form-item label="所属大类" style="width:150%;margin-bottom:0px:">
                    <el-select v-model="form.category1" placeholder="请选择" :change="CategoryAChange()"  style="width:280px">
                      <el-option
                        v-for="item in categoryA"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                      </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
          </el-row>
          <el-row style="margin-top:20px;">
            <el-col :xs="24" :sm="24" :md="20" :lg="20" :xl="20">
              <el-form-item label="所属小类" style="width:100%;margin-bottom:0px;">
                  <el-select v-model="form.category2" placeholder="请选择" style="width:280px" >
                    <el-option
                      v-for="item in categoryB"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <span  v-if="form.category1==8||form.category1==10||form.category1==12||form.category1==67">注意!您目前选择的是<span style="color:red">专业组</span>,所以您必须属于该专业</span>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false,createNewTeam()">确 定</el-button>
        </div>
      </el-dialog>

      <el-dialog title="加入队伍" :visible.sync="dialogAddTeamVisible" width="60%">
        <el-form :model="form" style="width:100%">
          <el-row>
            <el-col :xs="24" :sm="24" :md="18" :lg="12" :xl="12">
                <el-form-item label="队伍邀请码" style="width:100%;margin-bottom:0px:">
                     <el-input v-model="invitation_code"></el-input>
                </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogAddTeamVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogAddTeamVisible = false,StudentAddTeam()">确 定</el-button>
        </div>
      </el-dialog>

      <el-dialog
        title="队员信息"
        :visible.sync="teamDialogVisible"
        width="60%"
        v-loading="teammateinfoloading"
        >
       <div>
          <span style="line-height:36px;" v-for="(mate,index) in mates" :key="index">
              <strong>姓名:</strong>{{mate.stu_name}}(第{{index+1}}作者)<br><strong>学号:</strong>{{mate.stu_number}}<br>
          </span>
       </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="teamDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="teamDialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>

    </el-row>
    
  </div>
</template>

<script>
import {initCategoryInfo,createTeam,getOwnTeam,getOtherTeam,addTeam,deleteTeam,teamMate,userExitTeam,changeTeamMateIndex } from '@/api/myteam'

export default {
    data() {
      return {
        dialogFormVisible: false,
        dialogAddTeamVisible:false,
        teamDialogVisible:false,
        teaminfoloading:false,
        teammateinfoloading:false,
        form: {
          category1:'',
          category2:'',
        },
        categoryA:[],
        categoryB:[],
        category_selected:'',
        ownTeam:'',
        otherTeam:'',
        invitation_code:"",
        mates:'',
      }
    },
    methods: {
      CategoryAChange(){
        for(let i=0;i<this.categoryA.length;i++){
          if(this.categoryA[i].id==this.form.category1){
            this.categoryB = this.categoryA[i].categories
            break;
          }
        }
      },
      initCategoryInfo1(){
        initCategoryInfo().then((res) => {
          this.categoryA = res.data.data;
          }).catch(() => {
        })
      },
      createNewTeam(){
        this.teaminfoloading = true;
        createTeam(this.form).then((res) => {
            if(res.data.flag){
              this.$message({
                message: res.data.message,
                type: 'success'
              });
            }else{
              this.$message({
                message: res.data.message,
                type: 'error'
              });
            }
            this.initTeamInfo();
          }).catch(() => {
            this.teaminfoloading = false;
        })
      },
      StudentAddTeam(){
        this.teaminfoloading = true;
        let para = {
          invitation_code:this.invitation_code
        }
        addTeam(para).then((res) => {
            if(res.data.flag){
              this.$message({
                message: res.data.message,
                type: 'success'
              });
              this.initTeamInfo();
            }else{
              this.$message({
                message: res.data.message,
                type: 'error'
              });
               this.teaminfoloading = false;
            }
            }).catch(() => {
               this.teaminfoloading = false;
          })
      },
      teamDismiss(tid){
        this.$confirm('此操作将永久删除该队伍, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.teaminfoloading = true;
          let para={
            tid:tid
          }
          deleteTeam(para).then((res) => {
            if(res.data.flag){
              this.$message({
                message: res.data.message,
                type: 'success'
              });
              this.initTeamInfo();
            }else{
              this.$message({
                message: res.data.message,
                type: 'error'
              });
               this.teaminfoloading = false;
            }
            }).catch(() => {
               this.teaminfoloading = false;
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
      exitTeam(tid){
        this.$confirm('此操作将退出该队伍, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.teaminfoloading = true;
          let para={
            tid:tid
          }
          userExitTeam(para).then((res) => {
            if(res.data.flag){
              this.$message({
                message: res.data.message,
                type: 'success'
              });
              this.initTeamInfo();
            }else{
              this.$message({
                message: res.data.message,
                type: 'error'
              });
               this.teaminfoloading = false;
            }
            }).catch(() => {
               this.teaminfoloading = false;
          })
        }).catch(() => {
          this.teaminfoloading = false;
          this.$message({
            type: 'info',
            message: '已取消退出'
          });          
        });
      },
      getTeamMate(tid){
        this.teammateinfoloading = true;
        let para={
          tid:tid
        }
        teamMate(para).then((res) => {
          console.log(res)
            if(res.data.flag){
              this.mates = res.data.data;
            }else{
              this.$message({
                message: res.data.message,
                type: 'error'
              });
            }
            this.teammateinfoloading = false;
            }).catch(() => {
              this.teammateinfoloading = false;
          })
      },
      initTeamInfo(){
        this.teaminfoloading = true;
        getOwnTeam().then((res) => {
          this.ownTeam = res.data.data
          this.teaminfoloading = false;
            }).catch(() => {
          })
        getOtherTeam().then((res) => {
          this.otherTeam = res.data.data
          this.teaminfoloading = false;
          }).catch(() => {
        })
      },
      changeindex(tid){
        this.$confirm('此操作将调整第二、三作者的顺序, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.teaminfoloading = true;
          let para={
            tid:tid
          }
          changeTeamMateIndex(para).then((res) => {
            if(res.data.flag){
              this.$message({
                message: res.data.message,
                type: 'success'
              });
              this.initTeamInfo();
            }else{
              this.$message({
                message: res.data.message,
                type: 'error'
              });
               this.teaminfoloading = false;
            }
            }).catch(() => {
               this.teaminfoloading = false;
          })
        }).catch(() => {
          this.teaminfoloading = false;
          this.$message({
            type: 'info',
            message: '已取消调整'
          });          
        });
      }
    },
    mounted(){
      this.initTeamInfo();
    },
    computed: {
      getCategory1() {
        return this.form.category1;
      }
    },
    watch:{
      getCategory1(){
        this.form.category2=''
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
