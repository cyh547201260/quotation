<template>
	<div>
		<el-form ref="service" >
			<div class="service-form-item" v-for="(item,key) in serviceList.data">
					<el-form-item  class="service-input-item" label="联系人：" prop="user" :error="item.user.errmsg ? item.user.errmsg : ''">
					    <el-input v-model="item.user.value" size="mini"></el-input>
					</el-form-item>
					<el-form-item  class="service-input-item" label="联系电话：" prop="phone" :error="item.phone.errmsg ? item.phone.errmsg : ''">
					    <el-input v-model="item.phone.value" size="mini"></el-input>
					</el-form-item>
					<el-form-item  class="service-input-item" label="邮箱：" prop="email" :error="item.email.errmsg ? item.email.errmsg : ''" >
					    <el-input v-model="item.email.value" size="mini"></el-input>
					</el-form-item>
				<div class="service-delete-btn" style="margin-top: 5px;">
					<el-button type="primary" size="mini" @click="serviceDelete(key)" :style="'visibility: '+  (key > 0 ? '' : 'hidden') +';'">删除</el-button>
				</div>
			</div>
			<div class="service-add-btn" style="margin-top: 20px;">
				<el-button type="primary" @click="addServicePerson" class="add-programme-btn">+添加联系人</el-button>
			</div>
		</el-form>
	</div>
	
</template>

<script>
	
	export default {
	    data() {
	      return {
	          serviceErrMsgs:{}
	      }
	    },
	    props:["serviceList","formCheckState"],
	    mounted:function(){
	    },
	    methods: {
	      onSubmit() {
	      },
	      addServicePerson:function(){
	      	this.$emit('addServicePerson')
	      },
	      serviceDelete:function(key){
	      	this.$emit('serviceDelete',key)
	      },
	      checkServiceForm:function(){
	      	var REGEX_MOBILE = /^1\d{10}$/; // 手机号正则
	      	var emailTest = /^([a-zA-Z0-9\-_.+]+)@([a-zA-Z0-9\-]+[.][a-zA-Z0-9\-.]+)$/;
			var dataObj = JSON.parse(JSON.stringify(this.serviceList.data));
			for(var i = 0; i < dataObj.length; i++){
    			var obj = dataObj[i];
    			if(obj.user.value || obj.phone.value || obj.email.value){
    				var k;
    				for(k in obj){
	    				if(k == 'user'){
	    					if(obj[k].value.length == 0){
	    						dataObj[i]['user']['errmsg']  = '未填写';
	    						this.$emit('callParentToChangeFormCheckState',false);
	    					}else{
	    						dataObj[i]['user']['errmsg']  = '';
	    					}
	    				}
	    				if(k == 'phone'){
	    					if(obj[k].value.length > 0){
		    					if(!REGEX_MOBILE.test(obj[k].value)){
									dataObj[i]['phone']['errmsg']  = '电话格式不正确';
									this.$emit('callParentToChangeFormCheckState',false);
			    				}else{
			    					dataObj[i]['phone']['errmsg']  = '';
			    				}
		    				}else{
		    					dataObj[i]['phone']['errmsg']  = '';
		    				}
	    				}
	    				if(k == 'email'){
	    					if( obj[k].value.length > 0){
		    					if(!emailTest.test(obj[k].value)){
			    					dataObj[i]['email']['errmsg']  = '邮箱格式不正确';
			    					this.$emit('callParentToChangeFormCheckState',false);
			    				}else{
			    					dataObj[i]['email']['errmsg'] = '';
			    				}
	    					}else{
	    						dataObj[i]['email']['errmsg'] = '';
	    					}
    					}
    				}
    			}
    		}
			this.serviceList.data  = JSON.parse(JSON.stringify(dataObj));
			
	      }
	    }
   	}
</script>

<style>
	.service-form-item{
		display: flex;
		padding: 10px 0;
	}
	.service-form-item .el-form-item{
		margin-bottom: 0;
	}
	.service-form-item .service-input-item{
		display: flex;
		margin-right: 20px;
	}
	.service-form-item .service-input-item:first-child{
		flex: 1;
	}
	.service-form-item .service-input-item:nth-child(2){
		flex: 2;
	}
	.service-form-item .service-input-item:nth-child(3){
		flex: 2;
		margin-right: 0;
	}
	.service-form-item .el-form-item__label{
		white-space: nowrap;
	}
	.service-form-item .el-form-item__content{
		width: 70%;
	}
	.service-input-item .el-input__inner{
		border: 1px solid #00aca0;
	}
</style> 