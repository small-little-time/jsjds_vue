<template>
    <div>
        <el-row>
            <input id="t1" v-model="ruleForm2.title" style="height:48px;border:0px;line-height:38px;outline:none;width:90%;margin-left:5%;font-size:18px;" placeholder="标题 品类品牌型号都是卖家喜欢搜索的" class="yb-title"/>
        </el-row>
        <div style="width:90%;height:1px;margin-left:5%;background-color:rgb(179, 174, 174);"></div>
        <el-row>
            <textarea v-model="ruleForm2.description" style="border:0px;line-height:38px;outline:none;width:90%;margin-left:5%;font-size:16px;" rows="4" placeholder="描述一下宝贝的转手原因，入手渠道和使用···"></textarea>
        </el-row>
        <div style="width:90%;height:1px;margin-left:5%;background-color:rgb(179, 174, 174);"></div>
        <!--   -->
       <div  style="border:2px solid #efefef;margin-top:8px;margin-left:10px;margin-right:10px;padding:10px;border-radius:4px">
        <div>
           <span > 请上传实物照片</span>
        </div>
        <div>
        <el-row>
            
            <el-upload
                class="upload-demo"
                :action="store.state.baseUrl+'/common/upload'"
                :limit="4"
                :onSuccess="uploadSuccess"
                :file-list="ruleForm2.fileList2"
                list-type="picture"
                :before-remove="beforeRemove"
                :on-remove="handleRemove"
                :on-exceed="handleExceed"
                :before-upload="beforeImagesUpload">
                 <el-button  type="primary"  style="width:64px;height:64px;background-color:#fff;border:1px solid rgb(179, 174, 174);"><span style="font-size:36px;color:rgb(179, 174, 174)">+</span></el-button>
            </el-upload>
        </el-row>
        </div>

        </div>
       
        <div style="margin-top:8px">
            <el-row >
                <span>实物几成新:</span>
                &nbsp;&nbsp;&nbsp;
                <el-select v-model="ruleForm2.state" placeholder="请选择">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
           </el-row>
        </div>

        <!-- 分类 -->
        <div style="margin-top:8px;padding-top:10px">
            <span class="demonstration">商品的分类:</span>
            &nbsp;&nbsp;&nbsp;
            <el-cascader 
                :options="category"
                v-model="ruleForm2.selectedOptions"
                @change="handleChange">
            </el-cascader>
        </div>

        <div style="margin-top:8px;margin-bottom:20%;padding:10px">
            <el-row>
               <div >
                    <!-- v-on:input="check" -->
                    <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
    
                        <!-- <el-form-item label="密码" prop="pass">
                            <el-input type="password" v-model="ruleForm2.pass" autocomplete="off"></el-input>
                        </el-form-item>
                        
                        <el-form-item label="确认密码" prop="checkPass">
                            <el-input type="password" v-model="ruleForm2.checkPass" autocomplete="off"></el-input>
                        </el-form-item>
                        
                        <el-form-item label="年龄" prop="age">
                            <el-input v-model.number="ruleForm2.age"></el-input>
                        </el-form-item> -->


                          <el-form-item label="真实姓名" prop="realname">
                            <el-input v-model="ruleForm2.realname" autocomplete="off"></el-input>
                        </el-form-item>

                        <el-form-item label="电话号码" prop="iphone">
                            <el-input v-model="ruleForm2.iphone" autocomplete="off"></el-input>
                        </el-form-item>
                        
                        <el-form-item label="QQ" prop="qq">
                            <el-input v-model="ruleForm2.qq" autocomplete="off"></el-input>
                        </el-form-item>

                        <el-form-item label="押金" prop="deposit">
                            <el-input v-model="ruleForm2.deposit" autocomplete="off"></el-input>
                        </el-form-item>

                        <el-form-item label="一次性租金" prop="rent">
                            <el-input v-model="ruleForm2.rent" autocomplete="off"></el-input>
                        </el-form-item>

                        <el-form-item label="租借最大天数" prop="maxdays">
                            <el-input v-model="ruleForm2.maxdays" autocomplete="off"></el-input>
                        </el-form-item>
                        
                        <el-form-item style="margin-left:-100px">
                            <button  class="pu-button" type="primary" @click="submitForm('ruleForm2')">提交</button>
                        </el-form-item>

                    </el-form>
                    
                </div>

            </el-row>

        </div>
        <!-- <div style="margin-bottom:30%">
            <el-button v-on:click="submit" type="warning">确认发布</el-button>
        </div> -->
    </div>
    
</template>

<script>

import { addGood,delPic } from '../api/api';
export default {
    
    data(){

        var checkName = (rule,value,callback) => {
        if (value === '') {
          callback(new Error('名字不能空'));
        }else if(!/^[\u4e00-\u9fa5]+$/.test(value)){
          callback(new Error('请输入汉字'));
        }
        else {
          callback();
        }
      };

      var checkIph = (rule,value,callback) => {
        if (value === '') {
          callback(new Error('电话号码不能空'));
        } else if (!Number.isInteger(parseInt(value))||(!this.onlyNub(value))) {
          callback(new Error('请输入整数'));
        } else　if(!/^(13[0-9]|15[012356789]|17[0135678]|18[0-9]|14[579])[0-9]{8}$/.test(parseInt(value))){
             callback(new Error('请输入有效电话号码'));
        }  else {
          callback();
        };

      };


     var checkQq = (rule,value,callback) => {

        if(value === ''){
          callback(new Error('QQ不能空'));
        }else if ((!Number.isInteger(parseInt(value)))||!this.onlyNub(value)) {
          callback(new Error('请输入整数'));
        } 
        else if(parseInt(value)<0){
          callback(new Error('不能为负数'));
        } else {
          callback();
        };
     };
     
     var checkDeposit = (rule,value,callback) => {
        if (value === '') {
          callback(new Error('押金不能为空'));
        }else if (!this.isNumber(value)) {
          callback(new Error('请输入合法整数或小数'));
        } else if(parseInt(value)<0){
          callback(new Error('不能为负数'));
        } else {
          callback();
        };
     };

     var checkRent = (rule,value,callback) => {
          if (value === '') {
          callback(new Error('一次性租金不能空'));
        }else if (!this.isNumber(value)) {
          callback(new Error('请输入合法整数或小数'));
        } else if(parseInt(value)<0){
          callback(new Error('不能为负数'));
        } else {
          callback();
        };
     };

     var checkMD = (rule,value,callback) => {
        if (value === '') {
          callback(new Error('租借最大天数不能空'));
        }else if (!Number.isInteger(parseInt(value))||!this.onlyNub(value)) {
          callback(new Error('请输入整数'));
        } 
        else if(parseInt(value)<0){
          callback(new Error('不能为负数'));
        }else {
          callback();
        };
     };
        return{
           ruleForm2:{
                title:'', //标题
                description:'', //描述
                state:'', //几成新
                realname:'',  //姓名
                iphone:'',
                qq:'',
                deposit:'', //押金
                rent:'', //租金
                maxdays:'',//最大出借天数
                selectedOptions: [],//分类选项选择内容
                fileList2:[],//图片
                
            },
            rules2: {
                // pass: [
                //   { validator: validatePass, trigger: 'blur' }
                // ],
                // checkPass: [
                //   { validator: validatePass2, trigger: 'blur' }
                // ],
                // age: [
                //   { validator: checkAge, trigger: 'blur' }
                // ],
                realname: [
                    { validator: checkName, trigger: 'blur' }
                ],
                iphone: [
                    { validator: checkIph, trigger: 'blur' }
                ],
                qq: [
                    { validator: checkQq, trigger: 'blur' }
                ],
                deposit: [
                    { validator: checkDeposit, trigger: 'blur' }
                ],
                rent: [
                    { validator: checkRent, trigger: 'blur' }
                ],
                maxdays: [
                    { validator: checkMD, trigger: 'blur' }
                ],

            },
            
            options: [{
                value: '十成新',
                label: '十成新'
            }, {
                value: '九成新',
                label: '九成新'
            }, 
             {
                value: '八成新',
                label: '八成新'
            }, 
             {
                value: '七成新',
                label: '七成新'
            }, 
             {
                value: '六成新',
                label: '六成新'
            }, 
             {
                value: '五成新',
                label: '五成新'
            }, 
             {
                value: '四成新',
                label: '四成新'
            },  
            ],
            //联级选择器的内容
            
        
         category: [{
          value: '1',
          label: '数码产品',
          children: [{
            value: '19',
            label: '手机',
          }, {
            value: '20',
            label: '电脑',
          }
          , {
            value: '21',
            label: '电器',
          } , {
            value: '22',
            label: '相机',
          }, {
            value: '23',
            label: '其他',
          }]
        },{
            value: '2',
            label: '书籍',
            children:[{
                value: '5',
                label: '小说',
            },{
                value: '6',
                label: '期刊杂志'
            }
            ,{
                value: '7',
                label: '经典文学'
            }
            ,{
                value: '8',
                label: '学习资料'
            },{
                value: '9',
                label: '其他'
            }]
        },{
            value: '3',
            label: '衣物伞帽',
            children:[{
                value: '10',
                label: 'coser装扮',
            },{
                value:'11',
                label: '正装'
            },{
                value:'12',
                label: '雨伞'
            },{
                value:'13',
                label: '其他'
            }]
        },{
            value: '4',
            label: '游戏外设',
            children:[{
                value: '14',
                label: '游戏手柄'
            },{
                value: '15',
                label: '鼠标键盘'
            },{
                value: '16',
                label: 'ps4',
            },{
                value: '17',
                label: '掌机'
            },{
                value: '18',
                label: '其他'
            }]
        }],
         
        //-----------------------------------
            }
            
    },

     mounted:function(){
        if(this.store.state.isLogin==false)
            this.$router.push({ path:'/login' });
    },
    methods: {
        handleRemove(file, fileList) {
            this.ruleForm2.fileList2 = fileList;
            let para =  {name:file.name}
            let header = { Authorization:this.store.state.token}
            delPic(para,header)
        },
        beforeRemove(file, fileList) {
           return this.$confirm(`确定移除 ${ file.name }？`);
        },
        handleExceed(files, fileList) {
            this.$message.warning(`当前限制选择 4 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
        },
        handlePreview(file) {
        console.log(file);
        },
        uploadSuccess:function(res){
            let obj = res;
            obj.url = this.store.state.baseUrl+'/images/'+obj.url;
            this.ruleForm2.fileList2.push(obj);
        },
        submitForm(formName) {

        if(this.ruleForm2.title===''){
            this.$message.error("标题不能为空！");
              return false;
            }
            if(this.ruleForm2.description===''){
                this.$message.error("描述不能为空！");
              return false;
            }
            if(this.ruleForm2.state===''){
                this.$message.error("请选择实物几成新！");
              return false;
            }
            if(this.ruleForm2.selectedOptions.length==0){
                this.$message.error("请选择分类！");
              return false;
            }
            if(this.ruleForm2.selectedOptions.length==1){
                this.$message.error("请选择二级分类！");
               return false;
            }
            // alert(this.ruleForm2.fileList2.length);
            if(this.ruleForm2.fileList2.length===0){
                this.$message.error("请上传照片");
              return false;
            }
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let para =  {
                title:this.ruleForm2.title, //标题
                description:this.ruleForm2.description, //描述
                state:this.ruleForm2.state, //几成新
                realname:this.ruleForm2.realname,  //姓名
                phone:this.ruleForm2.iphone,
                qq:this.ruleForm2.qq,
                deposit:this.ruleForm2.deposit, //押金
                rent:this.ruleForm2.rent, //租金
                maxdays:this.ruleForm2.maxdays,//最大出借天数
                // selectedOptions: this.ruleForm2.selectedOptions,//分类选项选择内容
                // fileList2:this.ruleForm2.fileList2,//图片
                firparentid:this.ruleForm2.selectedOptions[0],
                secparentid:this.ruleForm2.selectedOptions[1],
                img1:this.ruleForm2.fileList2[0]==null?null:this.ruleForm2.fileList2[0].name,
                img2:this.ruleForm2.fileList2[1]==null?null:this.ruleForm2.fileList2[1].name,
                img3:this.ruleForm2.fileList2[2]==null?null:this.ruleForm2.fileList2[2].name,
                img4:this.ruleForm2.fileList2[3]==null?null:this.ruleForm2.fileList2[3].name,
            };
            //Object.assign({}, this.ruleForm2);
           let header = { Authorization:this.store.state.token}
            console.log(para)
            // console.log(para);
            addGood(para,header).then((res) => {
                if(res.data.code!="200"){
                     this.$message.error(res.data.errorMessage);
                }else{
                     this.$message({
                        showClose: true,
                        message: '发布成功，正在返回主页',
                        type: 'success'
                    });
                    setTimeout(() => {
                        
                    }, 500);
                    this.$router.push({ path: '/' });
                }
			}).catch((res)=>{
				console.log(res);
			});
            this.$router.push({path:'/'});
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },


      onlyNub(str){
          var flag=1;
          for (var i=0;i<str.length;i++)
          {
            if(!(str.charAt(i)>='0'&&str.charAt(i)<='9'))
            flag=0;
          }
          if(flag===1)  return true;
          else return false;
      },
      isNumber(str){
        var flag=1,sum=0;
        for (var i=0;i<str.length;i++){
          if(!(str.charAt(i)>='0'&&str.charAt(i)<='9'||str.charAt(i)==='.'||str.charAt(i)==='-')){
              flag=0;
          }
          if(str.charAt(i)==='.'){
              sum++;
          }
        }
        // alert(flag);
        // alert(sum);
        if(flag===1&&(sum===0||sum===1)) return true;
        else  return false;
      },

        //上传
        beforeImagesUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isPNG = file.type === 'image/png';
        const isGIF = file.type === 'image/gif';
        const isLt5M = file.size / 1024 / 1024 < 5;

        if (!isJPG&&!isPNG&&!isGIF) {
          this.$message.error('上传图片只能是 JPG/PNG/GIF 格式!');
        }
        if (!isLt5M) {
          this.$message.error('上传图片大小不能超过 5MB!');
        }
        return (isJPG  || isPNG || isGIF) && isLt5M;
      },

      //联级选择
    //   handleChange(value) {
    //     console.log(value);
    //   },

      //发布,检查数据合法性
      submit(){
        // alert("hh");
        this.submitForm(this.ruleForm2);
          // console.log(this.addForm.title)
          // if(this.addForm.title==='')
          // {
            

          // }
      }
}

}
</script>

<style>

    .yb-title:focus{
        border: 0px!important;
    }

    .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .el-message-box{
      width: 90%!important;
      margin-top: -20%!important;
      /* margin-left: 10%; */
  }
  .pu-button {
        display: inline-block;
        width:80%;
        height: 40px;
        padding: 5px 25px;
        font-size: 15px;
        cursor: pointer;
        text-align: center;   
        text-decoration: none;
        outline: none;
        color:white;
        background-color: rgb(21, 150, 248);
        border: none;
        border-radius: 5px;
        box-shadow: 0 1px #999;
    }
    .pu-button:hover {
        background-color:rgb(73, 168, 240);
    }

    .pu-button:active {
        background-color:rgb(73, 168, 240);
        box-shadow: 0 1px #666;
        transform: translateY(1px);
    }
    /* 按钮 size*/
  /* .el-button{
      width: 90%;
  }
    
    .el-button--primary {
    color: #fff;
    background-color:rgb(255, 218, 68)!important;
    border-color: #e0b058!important;
} */

</style>