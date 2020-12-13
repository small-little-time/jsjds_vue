<template>
    <div>
        <div class="yb-bac">
            <el-row >
                <el-input
                        placeholder="请输入内容"
                        v-model="input10"
                        clearable class="yb-input">
                    </el-input>
                    <el-button type="warning" icon="el-icon-search" >搜索</el-button>
            </el-row>
            <el-row style="margin-top:5px;"> 
                    <el-carousel height="150px">
                        <el-carousel-item v-for="item in welcomeimg" :key="item">
                        <img :src="store.state.baseUrl+'/images/'+item.img"/>
                        </el-carousel-item>
                    </el-carousel>
            </el-row>
            <el-row style="margin-top:5px;border-radius:6px;width:95%;margin-left:2.5%;background:#efefef;">
                <div v-for="a in category" :key="a" style="width:20%;float:left;" v-on:click="showlist(a.id)">
                    <span :class="a.classname"  class="icon iconfont yb-icon" :style=a.style></span><br>
                    <span style="">{{a.cname}}</span>
                </div>
                <div style="width:20%;float:left;" v-on:click="showlist(0)">
                    <span class="icon iconfont icon-quanbu yb-icon"  style="color:rgb(89, 176, 248)"></span><br>
                    <span >全部</span>
                </div>
                
            </el-row>
            
            {{input10}}
        </div>
        <div >
            <el-row>
                <span>最新商品</span>
                <div style="background-color:rgb(242,242,242);margin-bottom:80px;">
                            <div style="float:left;width:48%;">
                                <div v-for="(item, index) in hotgoods" :key="item" v-on:click='showDetail(item.id)'>
                                        <div v-if="index%2!=0" style="width:100%;height:300px;border-radius:8px;background-color:#fff;margin-left:2%;margin-top:16px;">
                                            <div style="height:220px;overflow:hidden;">
                                                <img :src="store.state.baseUrl+'/images/'+item.img1" width="100%" height="300px" style="height:600px;border-top-left-radius:8px;border-top-right-radius:8px;" />
                                            </div>
                                            <div class="gd-show">
                                                <span style="font-weight:bold;">{{item.title}}</span><br/>
                                            </div>
                                            <span style="float:left;margin-left:16px;margin-top:6px;"><span style="font-size:14px;">押金：</span><span style="font-size:12px;font-weight:bold;color:red">￥</span><span style="color:red;font-weight:bold">{{item.deposit}}</span></span>
                                            <div style="clear:both"></div>
                                            <div style="width:86%;height:0px;border-top:1.5px solid rgb(242,242,242);margin-left:7%;margin-top:3px;"></div>
                                            <span style="float:left;margin-left:16px;margin-top:3px;font-size:14px;">发起人：{{item.realname}} </span>
                                        </div>
                                </div>
                            </div>
                            <div style="float:right;width:48%;margin-right:1%">
                                <div v-for="(item, index) in hotgoods" :key="item" v-on:click='showDetail(item.id)'>
                                    <div  v-if="index%2===0"  style="width:100%;height:280px;border-radius:8px;background-color:#fff;margin-top:16px;">
                                        <div style="height:200px;overflow:hidden;">
                                            <img :src="store.state.baseUrl+'/images/'+item.img1" width="100%" height="300px" style="height:600px;border-top-left-radius:8px;border-top-right-radius:8px;" />
                                        </div >
                                        <div class="gd-show">
                                            <span style="font-weight:bold;">{{item.title}}</span><br/>
                                        </div>
                                        <span style="float:left;margin-left:16px;margin-top:6px;"><span style="font-size:14px;">押金：</span><span style="font-size:12px;font-weight:bold;color:red">￥</span><span style="color:red;font-weight:bold">{{item.deposit}}</span></span>
                                        <div style="clear:both"></div>
                                        <div style="width:86%;height:0px;border-top:1.5px solid rgb(242,242,242);margin-left:7%;margin-top:3px;">
                                            <span style="float:left;margin-left:3px;margin-top:3px;font-size:14px;">发起人：{{item.realname}}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                 <!-- <div style="background-color:rgb(242,242,242);margin-bottom:80px;">
                            <div style="float:left;width:48%;">
                                <div v-for="(item, index) in hotgoods" :key="item" v-on:click='showDetail(item.id)'>
                                        <div v-if="index%2!=0" style="width:100%;height:300px;border-radius:8px;background-color:#fff;margin-left:2%;margin-top:16px;">
                                            <div style="height:220px;overflow:hidden;">
                                                <img :src="store.state.baseUrl+'/images/'+item.img1" width="100%" height="300px" style="height:600px;border-top-left-radius:8px;border-top-right-radius:8px;" />
                                            </div>
                                            <span style="font-weight:bold">{{item.title}}</span><br/>
                                            <span style="float:left;margin-left:16px;margin-top:6px;"><span style="font-size:14px;">押金：</span><span style="font-size:12px;font-weight:bold;color:red">￥</span><span style="color:red;font-weight:bold">{{item.deposit}}</span></span>
                                            <div style="clear:both"></div>
                                            <div style="width:86%;height:0px;border-top:1.5px solid rgb(242,242,242);margin-left:7%;margin-top:3px;"></div>
                                            <span style="float:left;margin-left:16px;margin-top:3px;font-size:14px;">发起人：{{item.realname}} </span>
                                        </div>
                                </div>
                            </div>
                            <div style="float:right;width:48%;margin-right:1%">
                                <div v-for="(item, index) in hotgoods" :key="item" v-on:click='showDetail(item.id)'>
                                    <div  v-if="index%2===0"  style="width:100%;height:280px;border-radius:8px;background-color:#fff;margin-top:16px;">
                                        <div style="height:200px;overflow:hidden;">
                                            <img :src="store.state.baseUrl+'/images/'+item.img1" width="100%" height="300px" style="height:600px;border-top-left-radius:8px;border-top-right-radius:8px;" />
                                        </div >
                                        <div class="gd-show">
                                            <span style="font-weight:bold;">{{item.title}}</span><br/>
                                        </div>
                                        <span style="float:left;margin-left:16px;margin-top:6px;"><span style="font-size:14px;">押金：</span><span style="font-size:12px;font-weight:bold;color:red">￥</span><span style="color:red;font-weight:bold">{{item.deposit}}</span></span>
                                        <div style="clear:both"></div>
                                        <div style="width:86%;height:0px;border-top:1.5px solid rgb(242,242,242);margin-left:7%;margin-top:3px;">
                                            <span style="float:left;margin-left:3px;margin-top:3px;font-size:14px;">发起人：{{item.realname}}</span>
                                        </div>
                                    </div>
                                </div>
                            </div> -->
                            <div style="clear:both"></div>
                        </div>
                <!-- <el-tabs v-model="activeName" @tab-click="handleClick" class="yb-tabs">
                    <el-tab-pane label="数码产品" name="first">用户管理</el-tab-pane>
                    <el-tab-pane label="书籍文具" name="second" >
                       
                    </el-tab-pane>
                    <el-tab-pane label="电脑外设" name="third">玩具</el-tab-pane>
                    <el-tab-pane label="动、植物" name="fourth">动物</el-tab-pane>
                </el-tabs> -->
            </el-row>
        </div>
    </div>
    
</template>

<script>
import { getCategories,hotGoods } from '../api/api';

export default {
    data() {
        return {
             welcomeimg:[{img:"welcome1.jpg"},{img:"welcome2.jpg"},{img:"welcome3.jpg"},{img:"welcome4.jpg"}],
            hotgoods:[],
            activeName: 'first',
            input10: '',
            category:[],
         }
    },
    methods:{
        // handleClick(tab, event) {
        //     console.log(tab);
        // },
        showlist(cid){
             let id = sessionStorage.setItem("cid",cid)
             this.$router.push({ path: '/list' });
        },
        getCategory(){
            getCategories().then((res) => {
                if(res.status!=200){
                     this.$message.error(res.data.errorMessage);
                }else{
                    this.category = res.data
                }
			}).catch((res)=>{
				console.log(res);
			});
        },
        getHotGoods(){
            hotGoods().then((res) => {
                if(res.status!=200){
                     this.$message.error(res.data.errorMessage);
                }else{
                    this.hotgoods = res.data
                }
			}).catch((res)=>{
				console.log(res);
			});
        },
        showDetail:function(goodid){
            sessionStorage.setItem('goodid', goodid);
            this.$router.push({ path: '/gooddetail' });
        }
        
    },
    mounted:function(){
        this.getCategory();
        this.getHotGoods();
    },

}
</script>

<style>
    *{
        margin:0px;
        padding: 0px;
    }
    .gd-show{
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }
    .yb-bac{
        padding-bottom: 5px;
        padding-top: 5px;
        background: -webkit-linear-gradient(top, rgb(3, 137, 242) 0%,rgb(183, 222, 252) 100%);
    }
    .yb-input{
        width: 50%!important;
    }
    .yb-btn{
        width: 20%;
        margin-left: 1%!important;
    }
    .yb-icon{
        width: 20%;
        font-size:40px;
    }
     .el-carousel__item h3 {
        color: #475669;
        font-size: 14px;
        opacity: 0.75;
        line-height: 150px;
        margin: 0;
    }


    .el-carousel__item:nth-child(2n) {
         background-color: #99a9bf;
    }
  
    .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
    }
    .el-tabs__nav-wrap::after{
        background-color: #fff!important; 
    }
    .el-tabs__header{
        margin: 0 0 0px!important;
    }
     .el-button--warning {
    width: 25%!important;
    color: #fff;
    background-color: rgb(135, 200, 253)!important;
    border-color: #1ac1c7!important;
    margin-left: 1%!important;
    }
</style>
