<template>
	<div class="sid-btns-box">
		<el-button @click="preViewImg" style="margin-bottom: 10px;">在线预览</el-button>
		<el-button @click="saveImg" type="primary">生成图片</el-button>
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
	.sid-btns-box{
		width: 200px;
		position: fixed;
		right: 10px;
		top: 40%;
		text-align: right;
	}
</style>