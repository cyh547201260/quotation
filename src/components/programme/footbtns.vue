<template>
	<div class="footer-btns-box">
		<el-button class="preview-btn" @click="preViewImg">在线预览</el-button>
		<el-button class="make-img" @click="saveImg" type="primary">生成图片</el-button>
	</div>
</template>

<script>
	export default {
	    data() {
	      return {

	      }
	    },
	    mounted:function(){
	    },
	    methods: {
	    	preViewImg:function(){
	    		this.$emit('preViewImg');
	    	},
	    	saveImg:function(){
	    		this.$emit('saveImg');
	    	}
	    }
   	}
</script>

<style>
	.footer-btns-box{
		text-align: center;
		padding: 15px 0;
		width: 1100px;
		margin: 0 auto;
		padding-bottom: 100px;
		background: white;
	}
	.footer-btns-box .preview-btn{
		width: 244px;
		height: 48px;
		font-size: 22px;
		color: #00ACA0;
		border-color: #00ACA0;
	}
	.footer-btns-box .make-img{
		width: 415px;
		height: 48px;
		font-size: 22px;
		color: white;
		border-color: #00ACA0;
		background: #00ACA0;
	}
</style>