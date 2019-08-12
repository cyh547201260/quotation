<template>
	<div style="background: white;">
		<p class="title-desc-text">加*为必填项，不加为非必填项</p>
		<el-container class="cont-box bg-dark inp-dark">
			<el-form ref="titleData" :rules="rules" :model='titleData'  label-width="100px" style="width:100%">
				<div class="company-logo-show">
					<img src="../../assets/img/insgeekLogo02.png"/>
					<el-button type="primary" class="logo-show-btn" @click="changeLogoShow">{{titleData.logoShow ? '显示' : '隐藏'}}</el-button>
				</div>
				<el-form-item label="客户名称：">
				    <el-input v-model="titleData.customName" placeholder="例：北京百度科技有限公司"></el-input>
				</el-form-item>
				<el-form-item label="方案标题：" prop="programmeTitle">
				    <el-input v-model="titleData.programmeTitle" placeholder="例：2019年度员工福利保障计划"></el-input>
				</el-form-item>
				
				
				<el-form-item label="宣传标语：">
					<el-input type="textarea" :rows="5" placeholder="例：感谢选择保险极客，我们将竭诚为贵公司提供简单、方便、快捷的员工福利保险和健康管理解决方案。" v-model="titleData.slogan"></el-input>
				</el-form-item>
<!--<div id="" >
	<pre v-html="descContnet"></pre>
</div>-->
				
				
				
			</el-form>
		</el-container>
	</div>
</template>

<script>
	export default {
	    data() {
	      return {
	        rules: {
		          programmeTitle: [
		            { required: true, message: '方案标题'},
		          ],
		    },
	      }
	    },
	    props:['titleData','formCheckState'],
	    methods: {
	      onSubmit() {
	      },
	      changeLogoShow:function(){
	      	this.titleData.logoShow = !this.titleData.logoShow;
	      },
	      //验证表单
	      checkTitleForm:function(data){
	      	 this.$refs['titleData'].validate((valid) => {
	          if (valid) {
//	            alert('submit!');
	          } else {
	          	this.$emit('changeFormCheckState',false);
//	            return false;
	          }
	        });
	      }
	    }
	 }
</script>

<style>
	.title-desc-text{
		font-size: 14px;
		color: #999;
	    line-height: 50px;
		background: #F3F3F4;
	}
	.cont-box{
		padding: 30px;
		border-top: 0;
	}
	.bg-dark{
		background: #fff;
	}
	.inp-dark input,.inp-dark .el-textarea__inner{
		background: #F0F4F7;
	}
	.company-logo-show{
		text-align: center;
		margin-bottom: 30px;
	}
	.company-logo-show img{
		width: 100px;
		transform: translateY(13px);
		margin-right: 20px;
	}
	.company-logo-show .logo-show-btn{
		padding: 5px 8px !important;
		font-size: 12px !important;
	}
	.el-select{
		width: 100%;
	}
</style>