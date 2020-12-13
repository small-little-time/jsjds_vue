<template>

<div>
   <el-steps :active="active" align-center>
      <el-step title="步骤1" description="请先选择需要评审的分类"></el-step>
      <el-step title="步骤2" description="请输入评审员密码"></el-step>
      <el-step title="步骤3" description="信息确认"></el-step>
      <el-step title="步骤4" description="生成评审账号"></el-step>
    </el-steps>
    <el-col class="selectCate" :span="10" :offset="7" style="margin-top:30px;" v-if="active==0">
      <el-transfer v-model="categoriesSelect" :props="{key: 'id',label: 'name'}"
          :data="categories" :titles="['全部分类', '已选择']">
      </el-transfer>
    </el-col>
    <el-col class="getpassword" :span="10" :offset="7" style="margin-top:30px;" v-if="active==1">
      <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="ruleForm2.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm2.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input type="text" v-model="ruleForm2.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
    </el-col>
    <el-col class="checkinfo" :span="10" :offset="7" style="margin-top:30px;" v-if="active==2">
      所选分类:
      <span v-for="item in categoriesSelectArr" :key="item.id">
        {{item.name}}
      </span><br>
      评审员:{{this.ruleForm2.name}}<br>
      账号密码:{{this.ruleForm2.pass}}<br>
    </el-col>
    <el-col class="checkinfo" :span="10" :offset="7" style="margin-top:30px;" v-if="active==3">
      成功！！！:<br>
      评审员账号:<span style="color:red">{{newRater.username}}</span><br>
      所选分类:
      <span v-for="item in categoriesSelectArr" :key="item.id">
        {{item.name}}
      </span><br>
      评审员:{{this.ruleForm2.name}}<br>
      账号密码:<span style="color:red">{{this.ruleForm2.pass}}</span><br>
      <span style="color:red">请牢记上述信息！</span>
    </el-col>
  <el-col class="next" :span="3" :offset="20" style="margin-top:30px;margin-bottom:10px;" v-if="active!=3">
      <el-button type="primary" round @click="next">下一步</el-button>
  </el-col>
</div>
  



    
</template>

<script>
import {getAllcategories,addNewRater } from '@/api/review'

 export default {
    data() {
      const validatePass = (rule, value, callback) => {
          if (value==null||(value.length<6)) {
            callback(new Error('密码需大于6位'))
          } else {
            callback()
          }
        }
        const validatePass2 = (rule, value, callback) => {
          if (this.ruleForm2.pass!=value) {
            callback(new Error('两次密码不一致'))
          } else {
            callback()
          }
        }
      return {
        categories:[],
        categoriesSelect: [],
        categoriesSelectArr:[],
        active: 0,
        newRater:'',
        ruleForm2: {
          pass: '',
          checkPass: '',
          name: '',
          categoriesSelect:''
        },
        rules2: {
          pass: [
            { required: true, trigger: 'blur',validator: validatePass}
          ],
          checkPass: [
            { required: true, trigger: 'blur',validator: validatePass2}
          ],
          name: [
            { required: true, trigger: 'blur'}
          ]
        }
      };
    },
    methods:{
      initCategories(){
        getAllcategories().then((res)=>{
          if(res.data.flag){
            this.categories = res.data.data
          }
        }).catch(()=>{

        })
      },
      next() {
        if(this.active==0){
          if(this.categoriesSelect.length==0){
            this.$message.error('请先选择分类');
          }else{
            this.active++;
          }
        }else if(this.active==1){
          this.$refs.ruleForm2.validate(valid => {
            if(valid){
              this.active++;
              this.categories.forEach((item)=>{
                for(let i=0;i<this.categoriesSelect.length;i++){
                  if(this.categoriesSelect[i]==item.id){
                    this.categoriesSelectArr.push(item)
                  }
                }
              })
              console.log(this.categoriesSelectArr)
            }else{
              this.$message.error('请先完成信息');
            }
          })
        }else if(this.active==2){
          for(let index in this.categoriesSelect){
            if(index==0){
              this.ruleForm2.categoriesSelect+=this.categoriesSelect[index]
            }else{
              this.ruleForm2.categoriesSelect+=","+this.categoriesSelect[index]
            }
           
          }
          addNewRater(this.ruleForm2).then((res)=>{
            if(res.data.flag){
              this.newRater = res.data.data
            }
          }).catch(()=>{
            
          })
          this.active++
        }

      }
    },
    mounted(){
      this.initCategories();
    }
    
  };
</script>

<style rel="stylesheet/scss" lang="scss">
 
</style>
