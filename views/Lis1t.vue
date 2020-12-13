<template>
    <div>
        <!-- <el-row class="list-top">
            <div style="float:left;width:25%;margin-top:4px;margin-bottom:4px" :key="item">
                <el-button v-on:click="subMenu(0)" style="width:95%;padding: 10px 0px;border: 1px solid #fff!important;background-color:rgb(229,229,229)">全部</el-button>
            </div>
            <div v-for="item in btnlist" style="float:left;width:25%;margin-top:4px;margin-bottom:4px" :key="item">
                <el-button v-on:click="subMenu(item.id)" style="width:95%;padding: 10px 0px;border: 1px solid #fff!important;background-color:rgb(229,229,229)">{{item.cname}}</el-button>
            </div>
        </el-row>
        
        <el-row v-if="issonlist" style="background-color:rgb(244, 245, 249);">
            <div v-for="item in sonlist" style="float:left;width:25%;margin-top:4px;" :key="item" v-on:click="subCont(item.id)">
                {{item.cname}}
            </div>
        </el-row> -->
        <div style="background-color:rgb(183, 222, 252);">
            <el-row class="list-top">
                <div style="float:left;width:22%;margin-bottom:4px;margin-left:4px;" >
                    <el-button v-on:click="subMenu(0)" type="primary" style="padding:11px 6px!important;margin-top:6px;width:98%;height:35px!important;">全部</el-button>
                </div>
                <div v-for="item in btnlist" style="float:left;width:22%;margin-bottom:4px;margin-left:4px;" :key="item">
                    <el-button v-on:click="subMenu(item.id)" type="primary" style="margin-top:6px;width:98%;padding:11px 6px!important;height:35px!important;">{{item.cname}}</el-button>
                </div>
            </el-row>
        </div>
        <div class="list-line"></div>
        <el-row v-if="issonlist" style="background-color:rgb(244, 245, 249);margin-top:4px;width:100%;">
            <div v-for="item in sonlist" style="float:left;width:22%;margin-top:1px;margin-left:2.5%;margin-bottom:4px" :key="item" v-on:click="subCont(item.id)">
                <el-button type="info" plain style="height:25px;padding:7px 0px!important;">{{item.cname}}</el-button>
            </div>
        </el-row>

        <div style="margin-top:4px"></div>

        
        <!-- <el-row class="yb-list">
            <div style="width:88%;margin-left:6%;margin-top:8px;">
                 <div v-for="item in btnlist" style="float:left;width:25%;margin-top:4px;" :key="item">
                    <el-button style="width:95%;padding: 12px 0px;border: 1px solid #fff!important;background-color:#efefef">{{item.name}}</el-button>
                </div>
            </div>
        </el-row> -->

        <el-row class="yb-detail">
            <div style="background-color:rgb(242,242,242);margin-bottom:80px;">
                <div style="float:left;width:48%;">
                    <div v-for="(item, index) in goods" :key="item" v-on:click='showDetail(item.id)'>
                            <div v-if="index%2!=0" style="width:100%;height:300px;border-radius:8px;background-color:#fff;margin-left:2%;margin-top:16px;">
                                <div style="height:220px;overflow:hidden;">
                                    <img :src="store.state.baseUrl+'/images/'+item.img1" width="100%" height="300px" style="height:600px;border-top-left-radius:8px;border-top-right-radius:8px;" />
                                </div>
                                <span style="font-weight:bold">{{item.title}}</span><br/>
                                <span style="float:left;margin-left:16px;margin-top:6px;"><span style="font-size:14px;">押金：</span><span style="font-size:12px;font-weight:bold;color:red">￥</span><span style="color:red;font-weight:bold">{{item.deposit}}</span></span>
                                <div style="clear:both"></div>
                                <div style="width:86%;height:0px;border-top:1.5px solid rgb(242,242,242);margin-left:7%;margin-top:7px;"></div>
                                <span style="float:left;margin-left:16px;margin-top:6px;font-size:14px;">发起人：{{item.realname}} </span>
                            </div>
                    </div>
                </div>
                <div style="float:right;width:48%;margin-right:1%">
                    <div v-for="(item, index) in goods" :key="item" v-on:click='showDetail(item.id)'>
                        <div  v-if="index%2===0"  style="width:100%;height:280px;border-radius:8px;background-color:#fff;margin-top:16px;">
                            <div style="height:200px;overflow:hidden;">
                                <img :src="store.state.baseUrl+'/images/'+item.img1" width="100%" height="300px" style="height:600px;border-top-left-radius:8px;border-top-right-radius:8px;" />
                            </div>
                                <span style="font-weight:bold">{{item.title}}</span><br/>
                            <span style="float:left;margin-left:16px;margin-top:6px;"><span style="font-size:14px;">押金：</span><span style="font-size:12px;font-weight:bold;color:red">￥</span><span style="color:red;font-weight:bold">{{item.deposit}}</span></span>
                            <div style="clear:both"></div>
                            <div style="width:86%;height:0px;border-top:1.5px solid rgb(242,242,242);margin-left:7%;margin-top:7px;"></div>
                            <span style="float:left;margin-left:16px;margin-top:6px;font-size:14px;">发起人：{{item.realname}} </span>
                        </div>
                    </div>
                </div>
                <div style="clear:both"></div>
            </div>
        </el-row>
    </div>

</template>

<script>
import { getCategories,getSubMenu,getGoodsBySecId,getGoodsByFirId } from '../api/api';

export default {
    data(){
        return{
            goods:[],
            // goods2:[
            //     {username:'b1',name:'九九新笔记本电脑',img:"background-image:url('http://img.zcool.cn/community/014565554b3814000001bf7232251d.jpg@1280w_1l_2o_100sh.png')",deposit:"100"},{username:'b2',name:'九九新笔记本电脑',img:"background-image:url('http://img.zcool.cn/community/014565554b3814000001bf7232251d.jpg@1280w_1l_2o_100sh.png')",deposit:"100"},{username:'张三',name:'九九新笔记本电脑',img:"background-image:url('http://img.zcool.cn/community/014565554b3814000001bf7232251d.jpg@1280w_1l_2o_100sh.png')",deposit:"100"},{username:'张三',name:'九九新笔记本电脑',img:"background-image:url('http://img.zcool.cn/community/014565554b3814000001bf7232251d.jpg@1280w_1l_2o_100sh.png')",deposit:"100"},{username:'张三',name:'九九新笔记本电脑',img:"background-image:url('http://img.zcool.cn/community/014565554b3814000001bf7232251d.jpg@1280w_1l_2o_100sh.png')",deposit:"100"},
            // ],
            btnlist:[],
            sonlist:[],
            sonlist2:[{name:'123',id:'0'},{name:'123',id:'1'},{name:'魅族',id:'2'},{name:'一加',id:'3'},{name:'Vivo',id:'4'},{name:'诺基亚',id:'5'}],
            id2:0,
            issonlist:false,
        }
    },
    methods:{
        showDetail:function(goodid){
            sessionStorage.setItem('goodid', goodid);
            this.$router.push({ path: '/gooddetail' });
        },
        subMenu:function(pid){
            let para =  {id:pid}
            getSubMenu(para).then((res) => {
                this.sonlist = res.data;
                console.log(res)
			}).catch((res)=>{
				console.log(res);
            });
            getGoodsByFirId(para).then((res) => {
                this.goods = res.data;
			}).catch((res)=>{
				console.log(res);
			});   
            if (pid == 0) {
                this.issonlist=false;
            }else{
                this.issonlist=true;
            }
        },
        subCont:function(secid){
            let para =  {id:secid}
            getGoodsBySecId(para).then((res) => {
                this.goods = res.data;
                // console.log(res)
			}).catch((res)=>{
				console.log(res);
			});   
            this.goods=this.goods2;

        },
        getBtnList(){
             getCategories().then((res) => {
                this.btnlist = res.data;
			}).catch((res)=>{
				console.log(res);
			});
        }
    },
    mounted:function(){
        this.getBtnList();
        this.subMenu(0)
    }
}
</script>

<style>
    *{
        margin: 0;
        padding: 0;
    }
    /* .list-top{
        background-color:white;
        width: 100%;
    } */
    .list-top{
        background-color:rgb(183, 222, 252);
        width: 100%;
        margin-left: 3%;
        /* padding-left: 3%; */
    }

    .list-line{
        background-color:rgb(219, 239, 255);
        width: 100%;
        height: 10px;
        float: left; 
    }


    .yb-list{
        height: 106px;
        width: 100%;
        background-color:#fff;
    }
    .yb-detail{
        width: 100%;
        background-color:#efefef;
    }
    /* 二级按钮颜色 */
    .el-button--info.is-plain {
    width: 90%;  
}

</style>
