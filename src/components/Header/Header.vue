<template>
  	<div class="header-box">
  		<div class="header-cont-box">
  			<img src="../../assets/img/insgeekLogo02.png"/>
  			<p>保险方案报价美图生成系统</p>
  		</div>
  
  	</div>

</template>

<script>
</script>

<style>
	.header-box{
		width: 100%;
		height: 60px;
		background: #fff;
	}
	.header-cont-box{
		width: 1200px;
		margin: 0 auto;
		overflow: hidden;
		line-height: 60px;
	}
	.header-cont-box img{
		width: 100px;
		float: left;
		display: inline-block;
		margin-top: 10px;
/*		margin-left: 100px;*/
	}
	.header-cont-box p{
		margin-left: 30px;
		float: left;
		font-size: 16px;
		color: #00ACA0;
		position: relative;
		padding-left: 20px;
		
	}
	.header-cont-box p:after{
		content: ' ';
		border-left: 1px solid #00aca0;
		position: absolute;
		top: 38%;
		bottom: 38%;
		left: 0;
	}

</style>
