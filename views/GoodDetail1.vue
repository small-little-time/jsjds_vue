<template>
    <div style="">
        <div class="gd-top">
            <el-row>
                <div style="width:56px;height:56px;border-radius: 50%;overflow: hidden;float:left">
                    <img :src="this.UserAvatar" width="56px" height="56px"/>
                </div>
                <strong><span style="float:left;margin-left:3%">-------{{username}}-------<br></span></strong>
                <strong><span style="font-size:12px;color:#fff;background-color:red;border-radius: 3px;" v-if="realname === ybusername">易班用户</span>
                <span style="font-size:12px;color:#fff;background-color:red;border-radius: 3px;" v-else>非易班用户</span></strong>
                <br>
                <br>
                <span style="float:left;margin-left:6%;font-size:75%;line-height:0%;color:gray">发布于：怀化学院东校区{{location}}</span>  
                <div style="background-color:rgb(244, 245, 249);width: 100%;height: 1px;float:left"></div>
            </el-row>
        </div>
            <el-row>
                <div style="margin-left:5%;float:left;margin-top:1%;font-size:150%;color:red">租金:¥{{rent}} &nbsp;&nbsp;&nbsp; 押金:¥{{deposit}}</div>
            </el-row>
        <div style="float:left;margin-left:3%;margin-right:3%">
            <div style="text-align:center">
                
                <span style="text-align:left;display: inline-block;float:left;">
                    <span style="background-color:red;color:#fff;font-size:70%;float:left;padding-left:2px;padding-right:2px;border-radius: 3px;">
                        {{state}}
                    </span>{{desc}}<br><br>
                    <strong><span>电话号码：{{phone}}<br>QQ：{{qq}}<br><br></span></strong>
                </span>
            </div>
            <div>
                <img v-if="img1!=store.state.baseUrl+'/images/null'" :src="img1" width=300px height="300px">
                <div style= "padding-bottom:1%;float:left;width:100%;" v-if="img1!=store.state.baseUrl+'/images/null'"></div>
                <img v-if="img2!=store.state.baseUrl+'/images/null'" :src="img2" width=300px height="300px">
                <div style= "padding-bottom:1%;float:left;width:100%;" v-if="img2!=store.state.baseUrl+'/images/null'"></div>
                <img v-if="img3!=store.state.baseUrl+'/images/null'" :src="img3" width=300px height="300px">
                <div style= "padding-bottom:1%;float:left;width:100%;" v-if="img3!=store.state.baseUrl+'/images/null'"></div>
                <img v-if="img4!=store.state.baseUrl+'/images/null'" :src="img4" width=300px height="300px">
                <div style= "padding-bottom:1%;float:left;width:100%;" v-if="img4!=store.state.baseUrl+'/images/null'"></div>
                <div style="margin-bottom:30px">
                    <span v-if="isLiked" v-on:click="Like"><i class="iconfont icon-shoucang" style="color:red" ></i>超赞&nbsp;&nbsp;&nbsp;</span>
                    <span v-else v-on:click="Like"> <i class="iconfont icon-shoucang1" ></i>超赞&nbsp;&nbsp;&nbsp;</span>
                    <i class="iconfont icon-liuyan"></i>留言&nbsp;&nbsp;&nbsp;
                    <span v-if="isCollect" v-on:click="Collect"><i class="iconfont icon-shoucang-copy-copy"  style="color:red"></i>收藏&nbsp;&nbsp;&nbsp;</span>
                    <span v-else v-on:click="Collect"><i class="iconfont icon-shoucang2"></i>收藏&nbsp;&nbsp;&nbsp;</span>
                    <!-- <el-button > -->
                    <span type="text" @click="open2" style="background-color:red;color:#fff;font-size:120%;float:right;padding-left:8px;padding-right:8px;border-radius: 3px;">
                        我想要
                    </span>
                    <!-- </el-button> -->
                    <br><br><br><br>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import { getGoodDetailById,createOrder } from '../api/api';

export default {
    data(){
        return{
            username:"",
            location:"",
            rent:"",
            deposit:"",
            state:"",
            img1:"",
            img2:"",
            img3:"",
            img4:"",
            UserAvatar:"",
            isLiked:false,
            isCollect:false,
            desc:"",
            realname:"",
            qq:"",
            phone:"",
            id:'',
            ybrealname:''
        }

    },
    methods:{
        open2() {
        if(this.store.state.isLogin==false)
        {
            this.$router.push({ path:'/login' });
            return false;
        }

        this.$confirm('是否向此商品发布者发送 求租/购 意愿?', '提示：', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            let header = { Authorization:this.store.state.token}
            let para =  {id:this.id}
            createOrder(para,header).then((res) => {
                console.log(res)
			}).catch((res)=>{
				console.log(res);
			});
            this.$message({
                type: 'success',
                message: '请至 我的租借中查看进展!'
            });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消。'
          });          
        });
      },
        Like:function(){
            this.isLiked = !this.isLiked;
        },
        Collect:function(){
            this.isCollect= !this.isCollect;
        },
        getGoodDetail:function(){
            let id = sessionStorage.getItem('goodid');
            alert(id)
            let para = {id:id}
            getGoodDetailById(para).then((res) => {
                console.log(res)
                this.username = res.data.data.owner.username;
                this.ybrealname = res.data.data.owner.realname;
                this.location = "";
                this.rent = res.data.data.rent;
                this.deposit = res.data.data.deposit;
                this.state = res.data.data.state;
                this.desc = res.data.data.description;
                this.UserAvatar = res.data.data.owner.avatar;
                this.img1 = this.store.state.baseUrl+"/images/"+res.data.data.img1;
                this.img2 =  this.store.state.baseUrl+"/images/"+res.data.data.img2;
                this.img3 =  this.store.state.baseUrl+"/images/"+res.data.data.img3;
                this.img4 =  this.store.state.baseUrl+"/images/"+res.data.data.img4;
                this.realname = res.data.data.realname;
                this.phone =  res.data.data.phone;
                this.qq =  res.data.data.qq;
                this.id =  res.data.data.id;
			}).catch((res)=>{
				console.log(res);
			});
        }
            
    },
    mounted:function(){
        this.getGoodDetail();
    }

}
</script>

<style>
    *{
        margin: 0px;
        padding: 0px;
    }
    .el-message-box{
        width: 90%!important;
        margin-top: -20%;
    }
    /* .el-message--success{

    } */

</style>
