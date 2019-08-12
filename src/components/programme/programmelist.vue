<template>
	<div>
		<div class="insur-list-box"  v-for="(item,key) in proList" v-if=" Object.keys(item.list).length > 0">
			<template v-if="!item.type">
				<div class="insur-name">
					<div class="insur-name-cont">
						<span v-text="item.name"></span>
					</div>
				</div>
				<div class="insur-cont-outbox">
					<div class="insur-cont-box" v-for="(initem,inkey) in item.list">
							<div class="insur-cont-item" style="text-align: left;">
								<el-checkbox style="margin-left: 15px;" class="item-checkbox" v-model="initem.disabled"></el-checkbox>{{initem.name}}
							</div>
							<div class="insur-cont-item" v-for="(listitem , listkey,listindex) in initem.list" :class="getInsurContItemClass(listkey,listindex,initem.disabled)">
								<el-form-item :label="listitem.name+'：'" :key="listkey" :error="listitem.hasOwnProperty('errmsg') && listitem.errmsg ? listitem.errmsg : ''"> <!-- prop="'programmeList.'+key+'.list.'+inkey+'.list.'+'listkey'+'.value'" :rules="initem.disabled ? [{ required: true, message: '未填写', trigger: 'blur'}] : {}" -->
 										<el-autocomplete
									      class="inline-input"
									      v-model="listitem.value"
									      :fetch-suggestions="querySearch"
									      placeholder=""
									      v-if="listkey == 'deduction'"
									      size="mini"
									      @blur="checkProlistChildForm"
									    >
									    	<span slot="suffix" v-text="listitem.unit" v-if="listitem.unit"></span>
									    </el-autocomplete>
									    
									    
									    <el-input v-model="listitem.value" size="mini"  @blur="checkProlistChildForm" v-if="listkey == 'amount' || listkey == 'days'">
									    	<span slot="suffix" v-text="listitem.unit" v-if="listitem.unit"></span>
									    </el-input>
									    
									    <el-autocomplete
									      class="inline-input"
									      v-model="listitem.value"
									      :fetch-suggestions="querySearch2"
									      placeholder=""
									      v-if="listkey == 'payment'"
									      size="mini"
									      @blur="checkProlistChildForm"
									    >
									    	<span slot="suffix" v-text="listitem.unit" v-if="listitem.unit"></span>
									    </el-autocomplete>
									    
									    
								</el-form-item>
							</div>
					</div>
				</div>
			</template>
			<template v-else>
				<div class="insur-name insur-custom-box">
					<div class="insur-name-cont">
						 <el-input class="insur-custom-name" style="text-align: center;margin-top: 5px;" v-model="item.name" placeholder="填写保障内容"></el-input>
					</div>
				</div>
				<div class="insur-cont-outbox insur-custom-box">
					<div class="insur-cont-box insur-cont-border" v-for="(initem,inkey) in item.list">
						
							
							<div class="insur-cont-item" style="text-align: left;">
								<el-input class="insur-custom-name" style="text-align: center;" v-model="initem.name" placeholder="填写保障责任"></el-input>
							</div>
							<div class="insur-custom-form">
								
								<div class="insur-cont-item" v-for="(listitem , listkey) in initem.list" :class="listkey == 'days' ? 'days-class insur-custom-item-'+listkey : 'insur-custom-item-'+listkey">
									<el-form-item :label="listitem.name+'：'">
											<el-autocomplete
										      class="inline-input"
										      v-model="listitem.value"
										      :fetch-suggestions="querySearch"
										      placeholder=""
										      v-if="listkey == 'deduction'"
										      size="mini"
										    >
										    	<span slot="suffix" v-text="listitem.unit" v-if="listitem.unit"></span>
										    </el-autocomplete>
										    
										    
										    <el-input v-model="listitem.value" size="mini" v-if="listkey == 'amount' || listkey == 'days'">
										    </el-input>
										    <el-radio-group v-model="listitem.unit" size="mini" v-if="listkey == 'amount'">
											  <el-radio-button label="元">元</el-radio-button>
											  <el-radio-button label="元/天">元/天</el-radio-button>
											</el-radio-group>
										    
										    <el-autocomplete
										      class="inline-input"
										      v-model="listitem.value"
										      :fetch-suggestions="querySearch2"
										      placeholder=""
										      v-if="listkey == 'payment'"
										      size="mini"
										    >
										    	<span slot="suffix" v-text="listitem.unit" v-if="listitem.unit"></span>
										    </el-autocomplete>
										    
										    <el-input v-model="listitem.value" size="mini" v-if="listkey == 'other'">
										    </el-input>
										    
									</el-form-item>
								</div>
								<div class="insur-cont-item insur-cuntom-delete">
									 <el-button type="primary" size="mini" @click="insurDeleteCont(key,inkey)">删除</el-button>
								</div>
							</div>
					
					</div>
					<div class="insur-cont-add-insur">
						<el-button @click="insurListAddCont(key)">+添加保障责任</el-button>
					</div>
				</div>
			</template>
		</div>
		<div class="insur-cont-add-insur add-insur-bigbtn">
			<el-button @click="insurAddCont" type="primary" >+自定义添加保障内容</el-button>
		</div>
	</div>
</template>

<script>
	export default {
	    data() {
	      return {
	        insurAmount:'',		//保额
	        deduction:'',		//免赔额
	        paymanet:'',		//赔付比
	        checked:true,
	        select_de:[
	        	{value:'100'},{value:'200'},{value:'300'},{value:'400'},{value:'500'},{value:'600'},{value:'700'},{value:'800'},{value:'900'},{value:'1000'},
	        ],
	        select_pay:[
	        	{value:'10%'},{value:'20%'},{value:'30%'},{value:'40%'},{value:'50%'},{value:'60%'},{value:'70%'},{value:'80%'},{value:'90%'},{value:'100%'},
	        ],
	      }
	    },
	    props:["proList","progKey","formCheckState"],
	    mounted:function(){
	    },
	    methods: {
	      onSubmit() {
	      },
	      querySearch(queryString, cb) {
	        var results = this.select_de;
	        // 调用 callback 返回建议列表的数据
	        cb(results);
	      },
	      querySearch2(queryString, cb) {
	        var results = this.select_pay;
	        // 调用 callback 返回建议列表的数据
	        cb(results);
	      },
	      //添加自定义保障内容
	      insurAddCont:function(){
	      	this.$emit('addInsurCont')
	      },
	      insurListAddCont:function(key){
	      	this.$emit('insurListAddCont',key+'__'+this.progKey);
	      },
	      insurDeleteCont:function(key,listkey){
	      	this.$emit('insurDeleteCont',key+'_'+listkey+'_'+this.progKey)
	      },
	      //检查表单
	      checkProlistChildForm:function(){
//	      	this.$refs['proList'].validate((valid) => {
//	          if (valid) {
////	            alert('submit!');
//	          } else {
//	          	console.log('check err')
//	            return false;
//	          }
//	        });
			var i;
			var dataObj = JSON.parse(JSON.stringify(this.proList))
			for(i in dataObj){
				var proObj = dataObj[i];
				var j;
				if(!proObj.type){
					for(j in proObj.list){
						var mObj = proObj.list[j]
						var m;
						for(m in mObj.list){
							if(mObj.disabled){
								var k;
								for(k in mObj.list){
									var jObj = mObj.list;
									if(jObj[k].value == ''){
										jObj[k].errmsg = '未填写';
										this.$emit('callParentToChangeFormCheckState',false);
									}else{
										jObj[k].errmsg = '';
									}
								}
							}else{
								var k;
								for(k in mObj.list){
									var jObj = mObj.list;
									jObj[k].errmsg = '';
								}
							}
						}
					}
				}
			}
	        this.$emit('proListChildToParentToChange',dataObj,this.progKey)
	        
	      },
	      getInsurContItemClass:function(listkey,listindex,able){
	      	var class_1 = listkey == 'days' ? 'days-class' : '';
	      	var class_2 = listindex > 0 ? 'add-prolist-err-2' : '';
	      	var class_3 = able ? 'prolist-novali-class' : 'prolist-novali-class';
	      	return class_1+' '+class_2 + ' ' + class_3;
	      }
	    }
   	}
</script>

<style>
	.insur-list-box{
		display: flex;
		border-bottom: 1px solid #efefef;
		background: #EDF4F5;
	}
	.insur-name{
		flex: 1;
		text-align: center;
		position: relative;
		display: flex;
	}
	.insur-name-cont{
		position: absolute;
		height: 100%;
		width: 100%;
		display: table;
	}
	.insur-name-cont span{
		
		display: table-cell;
        vertical-align:middle
	}
	.insur-cont-outbox{
		flex: 4;
	}
	.insur-cont-box{
		display: flex;
	}
	.insur-cont-item{
		/*flex: 1;*/
		width: 25%;
		text-align: center;
		height: 50px;
		line-height: 50px;
	}
	.insur-cont-item.days-class{
		width: 50%;
	}
	.insur-cont-item.days-class .insur-cont-item{
		text-align: left;
	}
	.insur-cont-item.days-class .el-input{
		width: 30%;
	}
	.insur-cont-item .el-input{
		width: 60%;
	}
	.insur-cont-item .el-form-item__label{
		padding: 0;
		margin-left: 15px;
	}
	.insur-cont-box .el-form-item{
		margin-bottom: 0;
	}
	.item-checkbox{
		margin-right: 5px !important;
	}
	.insur-cont-outbox .insur-cont-item{
		text-align: left;
		position: relative;
	}
	.insur-cont-outbox .insur-cont-item:last-child:after{
		content: '';
		position: absolute;
		border-left: 2px solid white;
		border-right: 2px solid white;;
		top: 0;
		bottom: 0;
		left: 0;
		right: -2px;
	    pointer-events: none;
	}
	.insur-cont-outbox .insur-cont-item:after{
		content: '';
		position: absolute;
		border-left: 2px solid white;
		top: 0;
		bottom: 0;
		left: 0;
	    pointer-events: none;
	}
	.insur-cont-outbox .insur-cont-item:before{
		content: '';
		position: absolute;
		border-bottom: 2px solid white;
		right: 0;
		bottom: 0;
		left: 0;
		width: 500%;
	}
	.insur-name:after{
		content: '';
		position: absolute;
		border-bottom: 2px solid white;
		right: 0;
		bottom: 0;
		left: 0;
	}
	.insur-custom-box .insur-cont-item:after,
	.insur-custom-box .insur-cont-item:before{
		border: 0;
	}
	.insur-custom-box.insur-name:after{
		border: 0;
	}
	.insur-custom-box  .insur-cont-item:last-child:after{
		border: 0;
	}
	.insur-cont-outbox .el-autocomplete{
		width: 52%;
	}
	.insur-cont-outbox .el-autocomplete .el-input{
		width: 100%;
	}
	.insur-cont-add-insur{
		padding: 15px 0;
	}
	.insur-custom-box .insur-custom-name{
		width: 80%;
	}
	.insur-custom-box .insur-custom-name input{
		text-align: center;
	}
	.insur-custom-box .insur-custom-form{
		width: 75%;
		display: flex;
		flex-wrap: wrap;
	}
	.insur-custom-item-amount{
		width: 40%;
	}
	.insur-custom-box .insur-cont-item.insur-custom-item-amount .el-input{
		width: 50%;
	}
	.insur-custom-item-deduction{
		width: 30%;
	}
	.insur-custom-item-payment{
		width: 30%;
	}
	.insur-custom-item-other{
		width: 80%;
	}
	.insur-custom-box .insur-cuntom-delete{
		text-align: right;
		width: 20%;
	}
	.insur-custom-box .insur-cuntom-delete .el-button{
		margin-right: 30px;
	}
	.insur-custom-box .insur-cont-item .el-input {
	    width: 80%;
	}
	.insur-custom-box .el-radio-button--mini .el-radio-button__inner{
		padding: 7px 3px;
	}
	.insur-custom-box .insur-cont-item.insur-custom-item-amount .el-radio-group{
	    margin-left: -4px;
    	transform: translateY(-1px);
	}
	.insur-cont-border{
		border-bottom: 1px solid #efefef;
		padding-bottom: 20px;
		padding-top: 20px;
	}
	.insur-cont-border:first-child{
		padding-top: 0;
	}
	.insur-cont-item .el-form-item__error{
	    top: 83%;
	    left: 50px;
	}
	.add-prolist-err-2 .el-form-item__error{
		left: 65px;
	}
	.days-class .el-form-item__error{
		left: 178px;
	}
	.prolist-novali-class .el-form-item__label:before{
	    content: '*';
	    color: #F56C6C;
	    margin-right: 4px;
	}
	
	.insur-list-box .el-input__inner{
		border: 1px solid #00ACA0;
	}
	.el-button--primary{
		background: #00ACA0;
		border-color: #00ACA0;
	}
	.add-insur-bigbtn{
		text-align: center;
		background: #EDF4F5;
		height: 100px;
		line-height: 100px;
		border-top: 2px solid white;
		margin-top: -3px;
	}
</style>