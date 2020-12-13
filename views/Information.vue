<template>
    <div>
       <div>
           <h2>消息</h2>
       </div>
       <div>
            <el-tabs type="border-card">
            <el-tab-pane label="官方">
                <!--  -->
               <div v-for="a in news1" :key="a" style="clear:both;border:1px solid #efefef;margin-bottom:2px" @click="newsFun1(a.id)">
                    <div style="float:left" >
                    <img src="http://pic.5577.com/up/2017-4/2017420112744129.png" alt="通知" style="width:50px;height:50px" />
                    </div>
                    <div style="float:left" >
                        <div style="margin-left:1px;text-align:left;font-weight:bold">
                            <span>通知</span>
                             &nbsp;&nbsp;
                            <span>{{a.times}}</span>
                        </div>
                        <div style="float:left">
                        <p>{{a.content}}</p>
                        </div>
                    </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="私信">
                <div v-for="a in news2" :key="a" style="clear:both;border:1px solid #efefef;margin-bottom:2px" >
                    <div style="float:left" >
                    <img src="http://pic.5577.com/up/2017-4/2017420112744129.png" alt="通知" style="width:50px;height:50px" />
                    </div>
                    <div style="float:left;text-align:left" >
                        <div @click="newsFun2(a.id)" style="margin-top:10px;">
                            <div style="margin-left:1px;text-align:left;font-weight:bold">
                            
                            </div>
                        </div>

                    </div>
              </div>
            </el-tab-pane>
            
            </el-tabs>
       </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            news1:[
                {id:"0",content:"好消息！",times:"2018/11/20"},
            ],
            // {id:"0",username:"张三",content:"久久新笔记本",iphone:"13329244211",QQ:"342343423",state:"false",times:"2018/11/21"},
            //     {id:"1",username:"王子健",content:"NOKIA手机！",iphone:"13329244211",QQ:"342343423",state:"true",times:"2018/11/22"},
            //     {id:"2",username:"李四",content:"nike红色跑鞋！",iphone:"13329244411",QQ:"3422243423",state:"true",times:"2018/11/23"},
            news2:[
                
            ],
    
        }
    },
    mounted:function(){
        if(this.store.state.isLogin==false)
            this.$router.push({ path:'/login' });
    },
    methods:{
        newsFun1:function(){
                this.$confirm('好消息！好消息！本平台将在2018/11/29推出新活动，交易双方各返现1元', '提示：', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                this.$message({
                    type: 'success',
                    message: '生活愉快'
                });
                }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消。'
                });          
                });
        },newsFun2:function(){
                this.$confirm('好消息！好消息！本平台将在2018/11/29推出新活动，交易双方各返现1元', '提示：', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                this.$message({
                    type: 'success',
                    message: '生活愉快'
                });
                }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消。'
                });          
                });
        },
    }
}
</script>

<style>

</style>
