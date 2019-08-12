<template>
	<div>
	
		<pageheader></pageheader>
		<div class="main-box">
			<titlepanel ref="titlepanel" :formCheckState="formCheckState" :titleData="titleData" @changeFormCheckState="changeFormCheckState"></titlepanel>
			<programme ref="programme" :formCheckState="formCheckState" :titleData="titleData" @changeFormCheckState="changeFormCheckState" @checkTitleForm="checkTitleForm"></programme>
		</div>
		<sidebtns @preViewImg="preViewImg" @saveImg="saveImg"></sidebtns>
		<footbtns @preViewImg="preViewImg" @saveImg="saveImg"></footbtns>
		<pagefooter></pagefooter>
	</div>
</template>

<script>
	import pageheader from '@/components/Header/Header'
	import titlepanel from '@/components/TitlePanel/TitlePanel'
	import programme from '@/components/programme/programme'
	import pagefooter from '@/components/footer/footer'
	import sidebtns from '@/components/programme/sideBtns'
	import footbtns from '@/components/programme/footbtns'
	
	export default {
		data(){
			return{
				titleData:{
		        	customName:'',
		        	programmeTitle:'',
		        	logoShow:true,
		        	companyName:'北京鲸鹳科技有限公司',
		        	slogan:'',
		        },
		        formCheckState:true,
			}
		},
		components:{
			pageheader,
			titlepanel,
			programme,
			pagefooter,
			footbtns,
			sidebtns
		},
		methods:{
			//修改表单检查状态值
			changeFormCheckState:function(state){
				this.formCheckState = state;
			},
			//检查头部表单数据
			checkTitleForm:function(){
				this.$refs.titlepanel.checkTitleForm();
			},
			//获取头部表单数据
			getTitleData:function(){
				
			},
			//预览图片
			preViewImg:function(){
				this.$refs.programme.previewImgFun();
			},
			//生成图片
			saveImg:function(){
				this.$refs.programme.saveImg();
			}
			
		},
	}

</script>

<style>
	body{
		background: #F3F3F4;
	}
	.main-box{
		width: 1100px;
		margin: 0 auto;
		background: white;
	}
	.el-button--primary{
		background: #00ACA0 !important;
		border-color: #00ACA0 !important;
	}
</style>
