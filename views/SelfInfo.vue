<template>
    <div class="mh-total">
        <div class="mh-top">
            <span style="margin-top:5%;margin-left:10%;float:left;font-size:20px;font-weight:bold;line-height:110%">
                欢迎来到<br>易班共享平台<br>
                <span  v-if="this.store.state.isLogin==false">
                <button class="button" v-on:click="loginB">马上登录</button>
                </span>
            </span>
            <img src="../assets/logo.jpg" style="width:80px;height:80px;float:right;margin-top:10%">
            <!-- 通过图片的margin-top控制这个div高度 -->
        </div> 
        <div class="mh-line"></div>
        <div class="mh-mi">
            <el-collapse v-model="activeNames" @change="handleChange" >
                <el-collapse-item>
                    <template slot="title">
                        <i class="iconfont icon-wofabude">我发布的</i>
                    </template>
                    <div v-for="item in fabu" :key="item" style="clear:both">
                           <!-- {{item.id}}  -->
                        <div style="float:left;width:30%;margin-left:5%">
                        <span @click="showDetail(item.id,item.freeze,'0')" style="color: #9a9a11;width:80%">{{item.title}}</span>
                        </div>
                        <div style="float:left;width:30%">
                        <span style="color:red" v-if="item.freeze=='0'">正常</span>
                        <span style="color:red" v-else-if="item.freeze=='1'">冻结</span>
                        <span style="color:red" v-else>下架</span>
                        </div>
                        <div style="float:left;width:30%;margin-top:-10px;marfin-right:5%">
                        <el-button type="text" @click="fubuId(item)">编辑状态</el-button>
                        <el-dialog
                            title="请慎重选择商品状态"
                            :visible.sync="dialogVisible1"
                            width="70%"
                            :before-close="handleClose">
                            <div>
                            <el-radio v-model="state" label="0">正常</el-radio>
                            <el-radio v-model="state" label="2" >下架</el-radio>
                            </div>
                            
                            <span slot="footer" class="dialog-footer">
                            <el-button @click="fubucancel">取 消</el-button>
                            <el-button type="primary" @click="fabuconfirm">确 定</el-button>
                            </span>
                        </el-dialog>
                        </div>
                    </div>
                </el-collapse-item>
                <el-collapse-item>
                    <template slot="title">
                        <i class="iconfont icon--womaichude">等待处理</i>
                    </template>
                    <div v-for="item in disposal" :key="item" style="clear:both">
                           <!-- {{item.id}}  -->
                        <div style="float:left;width:30%;margin-left:20%">
                        <span @click="showDetail(item.good.id,item.state,'1')" style="color: #9a9a11;width:80%">{{item.good.title}}</span>
                        </div>
                       
                        <div style="float:left;width:30%;margin-top:-10px">
                        <el-button type="text" @click="disposalId(item)">处理</el-button>
                        <el-dialog
                            title="需要处理的交易"
                            :visible.sync="dialogVisible2"
                            width="70%"
                            :before-close="handleClose">
                            <div style="margin-left:30%;text-align:left">
                                <span><strong>标题:</strong></span>
                                &nbsp;&nbsp;
                                <span>{{title}}</span>
                            </div>
                            <div style="margin-left:30%;text-align:left">
                                <span><strong>租借人:</strong></span>
                                &nbsp;&nbsp;
                                <span>{{name}}</span>
                            </div>
                            
                            <span slot="footer" class="dialog-footer">
                            <el-button @click="disposalcancel">拒绝</el-button>
                            <el-button type="primary" @click="disposalconfirm">同意</el-button>
                            </span>
                        </el-dialog>
                        </div>
                    </div>
                </el-collapse-item>
                <el-collapse-item>
                    <template slot="title">
                        <i class="iconfont icon--womaichude">我想要的</i>
                    </template>
                    <div v-for="item in wanted" :key="item" style="clear:both">
                           <!-- {{item.id}}  -->
                        <div style="float:left;width:30%;margin-left:5%">
                            <span @click="showDetail(item.good.id,item.state,'1')" style="color: #9a9a11;width:80%">{{item.good.title}}</span>
                        </div>
                        <span style="color:red">等待对方确认</span>
                        <div style="float:right;width:30%;margin-top:-10px;margin-right:5%">
                            <el-button type="text" @click="notlike(item)">不想要了</el-button>
                        </div>
                    </div>
                </el-collapse-item>
                <el-collapse-item>
                    <template slot="title">
                        <i class="iconfont icon--womaichude">在租状态的物品</i>
                    </template>
                    <div v-for="item in lending" :key="item" style="clear:both">
                           <!-- {{item.id}}  -->
                        <div style="float:left;width:30%;margin-left:5%">
                            <span @click="showDetail(item.good.id,item.state,'1')" style="color: #9a9a11;width:80%">{{item.good.title}}</span>
                        </div>
                        <div style="float:right;width:30%;margin-top:-10px;margin-right:5%">
                            <el-button type="text" @click="reback(item)">物品已归还</el-button>
                        </div>
                    </div>
                </el-collapse-item>
                <el-collapse-item>
                    <template slot="title">
                        <i class="iconfont icon--womaidaode">我买到的</i>
                    </template>
                    <div v-for="item in maidao" :key="item" v-on:click="maidaoFun(item.id)">
                       
                    </div>
                </el-collapse-item>
                <el-collapse-item>
                    <template slot="title">
                        <i class="iconfont icon--wozudaode">我租到的</i>
                    </template>
                    <div v-for="item in zudao" :key="item" v-on:click="zudaoFun(item.id)">
                      
                    </div>
                </el-collapse-item>
                <el-collapse-item>
                    <template slot="title">
                        <i class="iconfont icon-woshoucangde">我收藏的</i>
                    </template>
                    <div v-for="item in shoucang" :key="item" v-on:click="shoucangFun(item.id)">
                       
                    </div>
                </el-collapse-item>
                <el-collapse-item>
                    <template slot="title">
                        <i class="iconfont icon-wodequanzi">我的圈子</i>
                    </template>
                    <div v-for="item in quanzi" :key="item" v-on:click="quanziFun(item.id)">
                       
                    </div>
                </el-collapse-item>
                <el-collapse-item>
                    <template slot="title">
                        <i class="iconfont icon--wodepaimai">我的拍卖</i>
                    </template>
                    <div v-for="item in paimai" :key="item" v-on:click="paimaiFun(item.id)">
                       
                    </div>
                </el-collapse-item>
                <el-collapse-item>
                    <template slot="title">
                        <i class="iconfont icon-yibizhuanqu" v-on:click="yibizhuanquFun(item.id)"> 我的易币</i>
                    </template>
                    <span>0</span>
                </el-collapse-item>
            </el-collapse>
        </div>
        <div class="mh-line"></div>
        <div class="mh-mi">
            <el-collapse v-model="activeNames" @change="handleChange"  >
                <el-collapse-item>
                        <template slot="title">
                           <span > <i class="iconfont icon-shezhi">设置</i></span>
                        </template>
                </el-collapse-item>
            </el-collapse>
        </div>
        <div class="mh-line"></div>
        <div style="margin-bottom:10%;width:100%;float:left;"><br><br><br></div>

    </div>
</template>

<script>
import { getSellerGood,getSellerOrder,changeFreeze,deleteOrder,confirmOrder,getBuyerOrder,delOrderByBuyer,queryLendingOrder,rebackGood} from '../api/api';

export default {
    data() {
      return {
        dialogVisible1: false,
        dialogVisible2: false,
        activeNames: [{},{}],
        id:'0',
        state:'0',
        title:'',
        name:'',
        gid:'',
        fabu:[
        ],
        disposal:[
        ],
        wanted:[],
        lending:[],
        maidao:[],
        zudao:[],
        shoucan:[],
        quanzi:[],
        paimai:[],
       
        // yibizhuanqu:[],
      };
    },
    mounted:function(){
        if(this.store.state.isLogin){
            this.getSellerGoods();
            this.getSellerOrders();
            this.getBuyerOrders();
            this.queryLendingGood();
        }
    },
    methods: {
        reback(item){
            this.$confirm('请再次确认您已收回物品?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    let header = { Authorization:this.store.state.token}
                    let para = {
                        oid:item.id,
                        gid:item.good.id
                    }
                    rebackGood(para,header).then((res) => {
                        if(res.data.code!="200"){
                            this.$message.error(res.data.errorMessage);
                        }else{
                            this.$message({
                                type: 'success',
                                message: '确认成功!物品状态已改为正常'
                            });
                            this.queryLendingGood();
                            }
                        }).catch((res)=>{
                            console.log(res);
                        });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    });          
                });
           

        },
        queryLendingGood(){
             let header = { Authorization:this.store.state.token}
             queryLendingOrder(header).then((res) => {
                if(res.data.code!="200"){
                     this.$message.error(res.data.errorMessage);
                }else{
                    this.lending = res.data.data;
                }
			}).catch((res)=>{
				console.log(res);
			});
        },
        notlike(item) {
            this.$confirm('您即将删除此条记录', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
                let header = { Authorization:this.store.state.token}
                let para = {
                    id:item.id
                }
                delOrderByBuyer(para,header).then((res) => {
                if(res.data.code!="200"){
                     this.$message.error(res.data.errorMessage);
                }else{
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    this.getBuyerOrders();
                }
			}).catch((res)=>{
				console.log(res);
			});
                
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        },
        getSellerOrders:function(){
            let header = { Authorization:this.store.state.token}
            getSellerOrder(header).then((res) => {
                if(res.data.code!="200"){
                     this.$message.error(res.data.errorMessage);
                }else{
                   this.disposal = res.data.data
                }
			}).catch((res)=>{
				console.log(res);
			});
        },
        getSellerGoods:function(){
            let header = { Authorization:this.store.state.token}
            getSellerGood(header).then((res) => {
                if(res.data.code!="200"){
                     this.$message.error(res.data.errorMessage);
                }else{
                   this.fabu = res.data.data
                }
			}).catch((res)=>{
				console.log(res);
			});
        },
        getBuyerOrders:function(){
            let header = { Authorization:this.store.state.token}
            getBuyerOrder(header).then((res) => {
                if(res.data.code!="200"){
                     this.$message.error(res.data.errorMessage);
                }else{
                   this.wanted = res.data.data
                }
			}).catch((res)=>{
				console.log(res);
			});

        },
        handleChange(val) {
            console.log(val);
        },
        fubucancel(){
            this.dialogVisible1=false;
        },
        fubuId(para){
            if(para.freeze=='1')
            {
                this.$message.error('此商品已冻结！');
                return false;
            }
            this.state=para.freeze;
            this.id=para.id;
            this.dialogVisible1=true;
        },
        fabuconfirm(){
             let para =  {
                 state:this.state,
                 id:this.id}
            let header = { Authorization:this.store.state.token}
             changeFreeze(para,header).then((res) => {
                if(res.status!="200"){
                     this.$message.error(res.data.errorMessage);
                }else{
                     this.$message({
                        showClose: true,
                        message: '修改成功',
                        type: 'success'
                    });
                    this.getSellerGoods();
                    this.dialogVisible1=false;
                }
			}).catch((res)=>{
				console.log(res);
            });

        },
        disposalcancel(){
             let para =  {
                 id:this.id}
            let header = { Authorization:this.store.state.token}
             deleteOrder(para,header).then((res) => {
                if(res.status!="200"){
                     this.$message.error(res.data.errorMessage);
                }else{
                     this.$message({
                        showClose: true,
                        message: '拒绝成功',
                        type: 'success'
                    });
                    this.getSellerOrders();
                    this.dialogVisible1=false;
                }
			}).catch((res)=>{
				console.log(res);
            });
            this.dialogVisible2=false;
        },
        disposalId(para){
            this.id=para.id;
            this.gid = para.good.id;
            this.title=para.good.title;
            this.name=para.user.realname;
            this.dialogVisible2=true;
        },
        disposalconfirm(){
            let para =  {
                 id:this.id,
                 gid:this.gid
                }
            let header = { Authorization:this.store.state.token}
            confirmOrder(para,header).then((res) => {
                if(res.status!="200"){
                     this.$message.error(res.data.errorMessage);
                }else{
                     this.$message({
                        showClose: true,
                        message: '确认成功',
                        type: 'success'
                    });
                    this.getSellerOrders();
                    this.dialogVisible1=false;
                }
			}).catch((res)=>{
				console.log(res);
            });
        
        },

     showDetail:function(goodid,para,flag){
         if(para=='2'&&flag=='0')
         {
             this.$message.error('此商品已下架！');
             return false;
         }
         sessionStorage.setItem('goodid', goodid);
         this.$router.push({ path: '/gooddetail' });
     },  

      loginB(){
          this.$router.push({ path: '/login' });
      },
    }
  }
</script>
    
<style >
    *{
        margin: 0px;
        padding: 0px;
    }
    .mh-total{
        width: 100%;
        height: 100%!important;
    }
    .mh-top{
        /* position: fixed!imposrtant; */
        background-color: rgb(183, 222, 252);
         /* background-color: rgb(21, 150, 248); */
        width: 100%!important;
        /* height: 12%!important; */
        float: left;
    }
    .mh-line{
        background-color:rgb(244, 245, 249);
        width: 100%;
        height: 10px;
        float: left; 
    }
    .mh-mi{
        width: 97%;
        float: left;
    }
    .button {
        display: inline-block;
        margin-top: 10px;
        padding: 5px 25px;
        font-size: 15px;
        cursor: pointer;
        text-align: center;   
        text-decoration: none;
        outline: none;
        color:black;
        background-color: rgb(21, 150, 248);
        border: none;
        border-radius: 5px;
        box-shadow: 0 1px #999;
    }
    .button:hover {
        background-color: rgb(73, 168, 240);
    }

    .button:active {
        background-color:rgb(73, 168, 240);
        box-shadow: 0 1px #666;
        transform: translateY(1px);
    }
</style>