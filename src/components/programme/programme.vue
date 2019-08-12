<template>
	<div class="bor-panel">
		<el-form ref="programmePros" :model='programmePros'  style="width:100%">
		<template v-for="(progItem,progKey) in programmePros.data">
			<div class="pro-cont-title">
				方案{{proIndexObj[progKey+1]}}报价<el-button v-if="progKey > 0" type="primary" class="logo-show-btn add-prog-btn" @click="deleteProgramme(progKey)">删除</el-button>
			</div>
			<!--<el-form ref="progItem" :model='progItem'  style="width:100%">-->
				<div class="pro-cont-proname">
						<el-form-item class="pro-cont-name-box" label="方案名称：" :prop="'data.'+progKey+'.programmeData.programmeName'" :rules="[{ required: true, message: '方案名称不能为空'}]">
						    <el-input style="width: 90%;" v-model="progItem.programmeData.programmeName" placeholder="例：员工福利保障方案一"></el-input>
						</el-form-item>
				</div>
				<div class="pro-form-box">
					<div class="pro-form-item">
						<div class="pro-form-header">
							保险方案总览
						</div>
						<div class="pro-form-cont">
							<div class="pro-total-form-item">
								<el-form-item label="保障对象：" :prop="'data.'+progKey+'.programmeData.programeTotalData.target'" :rules="[{ required: true, message: '请选择保障对象'}]">
								    <el-select v-model="progItem.programmeData.programeTotalData.target">
								    	<el-option label="员工" value="员工"></el-option>
								    	<el-option label="配偶" value="配偶"></el-option>
								    	<el-option label="子女" value="子女"></el-option>
								    	<el-option label="父母" value="父母"></el-option>
								    </el-select>
								</el-form-item>
							</div>
							<div class="pro-total-form-item">
								<el-form-item label="保障人数：" >
								    <el-input type="text" v-model="progItem.programmeData.programeTotalData.personNum" placeholder="">
								    	<span slot="suffix" >人</span>
								    </el-input>
								</el-form-item>
							</div>
							<div class="pro-total-form-item pro-total-err-3">
								<el-form-item label="标准费用：" :prop="'data.'+progKey+'.programmeData.programeTotalData.standardCost'" :rules="[{ required: true, message: '标准费用不能为空'}]">
									    <el-input v-model="progItem.programmeData.programeTotalData.standardCost">
									    	<span slot="suffix" >元/人/年</span>
									    </el-input>
								</el-form-item>
							</div>
							<div class="pro-total-form-item">
								<el-form-item label="保费合计：">
									    <el-input  prop="totalCost" v-model="progItem.programmeData.programeTotalData.totalCost">
									    	<span slot="suffix">元/年</span>
									    </el-input>
								</el-form-item>
							</div>
						</div>
						<div class="pro-form-header">
							保障责任
						</div>
						<div class="pro-formtable-cont">
							<div class="pro-formtable-title">
								<div>保障内容</div><div>保障责任</div><div>保障额度</div><div>年免赔额</div><div>赔付比例</div>
							</div>
						</div>
						<div class="pro-form-table-cont">
							
							<programmelist ref="programmelistchild" :formCheckState="formCheckState" :progKey="progKey" :proList="progItem.programmeList" @callParentToChangeFormCheckState="callParentToChangeFormCheckState" @proListChildToParentToChange="proListChildToParentToChange" @insurDeleteCont="insurDeleteCont" @addInsurCont="addInsurCont(progItem.programmeList)" @insurListAddCont="insurListAddCont"></programmelist>
						</div>
						<div class="pro-form-header" style="margin-top: 40px;margin-bottom: 20px;">
							参保规则
						</div>
						<div class="pro-form-rule-box">
							<el-input
							  type="textarea"
							  :rows="15"
							  :placeholder="placeHold"
							  resize="none"
							  style="background: #F0F4F7;"
							  v-model="progItem.programmeData.insurRouls">
							</el-input>
	
						</div>
					</div>
					
				</div>
				
				
			
			<!--</el-form>-->
		
		</template>
		</el-form>
		<div class="pro-bigform-box">
			 <el-button type="primary" class="add-programme-btn" @click="addProgrammePros">+点击增加保障方案</el-button>
		</div>
		
		<div class="pro-form-box">
			<div class="pro-form-item">
				<div class="pro-form-header">
					专属服务人员
				</div>
				<div class="pro-form-rule-box">
					<service ref="serviceblock" :formCheckState="formCheckState" :serviceList="serviceList" @callParentToChangeFormCheckState="callParentToChangeFormCheckState" @serviceDelete="serviceDelete" @addServicePerson="addServicePerson"></service>
				</div>
			</div>
		</div>
		<div class="pro-form-box">
			<div class="page-footer-box">
				<img class="page-footer-ewm" src="../../assets/img/it-ewm.png"/>
				<p>为了每一个拼搏的未来</p>
				<p>扫码二维码进入保险极客官网了解更多</p>
				<p>注：以上各项保险责任以及报价仅作为参考，最终保障细则和详细内容请依据最终签订的保险合同条款。</p>
				<div class="foot-tip">最终解释权归保险极客所有</div>
			</div>
		</div>
		
		
		
		<!--imgtemp-->
		<div class="img-temp-box" id="imgTempBox">
			<imagetemp :serviceList="serviceList" :programmePros="programmePros.data" :titleData="titleData"></imagetemp>
		</div>
		<div class="img-show-out-box" v-show="imgShowState">
			<div class="img-show-mask" @click="imgShowState = false"></div>
			<div class="img-show-box">
				<div class="img-show-menu">
					<div class="img-show-menu-name">方案预览</div>
					<div class="img-show-menu-close"><i  @click="imgShowState = false" class="el-icon-close"></i></div>
				</div>
				<div class="img-wraper-box">
					<img src="" id="imgShowTarget"/>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import programmelist from '@/components/programme/programmelist'
	import service from '@/components/programme/service'
	import imagetemp from '@/components/imagetemp/imagetemp'
	import html2canvas from 'html2canvas'
	
	export default {
	    data() {
	      return {
	        form: {
	          name: '',
	          region: '',
	          date1: '',
	          date2: '',
	          delivery: false,
	          type: [],
	          resource: '',
	          desc: ''
	        },
	        
	        imgShowState:false, //预览图片显示状态
	        programmePros:{data:[]},
	        
	        
	        //////////////////////////////
	        programmeData:{
	        	insurRouls:'',
	        	programmeName:'',
	        	programeTotalData:{
	        		target:'',
	        		personNum:'',
	        		standardCost:'',
	        		totalCost:''
	        	},
	        },
	        
	        
	        
	        //////////////////////////////
	        
	        proIndexObj:{
	        	1:'一',
	        	2:'二',
	        	3:'三',
	        	4:'四',
	        	5:'五',
	        	6:'六',
	        	7:'七',
	        	8:'八',
	        	9:'九',
	        	10:'十'
	        },
	        
	        relationChooseVal:'员工',
	        
	        placeHold:'示例：\n 1、起保人数：该方案参保需满足以下条件之一： （1）起保人数大于20人；（2）费用大于2000\n2、参保年龄：18-65周岁，平均年龄小于40周岁（不含）\n3、职业类别：1-3类\n4、男性参保人数不高于总参保人数的60%\n5、最高可以购买3份',
	        
	        serviceList:{data:[
	        	{
	        		user:{value:'',errmsg:''},
	        		phone:{value:'',errmsg:''},
	        		email:{value:'',errmsg:''}
	        	}
	        ]},
	        programmeList:{
	        	0:{
	        		name:'补充医疗',
	        		list:{
	        			0:{
	        				'name':'补充医疗-门（急）诊',
	        				'list':{
	        					'amount':{
	        						'name':'保额',
	        						'value':'',
	        						'unit':'元'
	        					},
	        					'deduction':{
	        						'name':'免赔额',
	        						'value':'',
	        						'unit':'元'
	        					},
	        					'payment':{
	        						'name':'赔付比',
	        						'value':''
	        					},
	        				},
	        				'disabled':false,
	        			},
	        			1:{
	        				'name':'补充医疗-住院',
	        				'list':{
	        					'amount':{
	        						'name':'保额',
	        						'value':'',
	        						'unit':'元'
	        					},
	        					'deduction':{
	        						'name':'免赔额',
	        						'value':'',
	        						'unit':'元'
	        					},
	        					'payment':{
	        						'name':'赔付比',
	        						'value':''
	        					},
	        				},
	        				'disabled':false,
	        			},
	        			2:{
	        				'name':'补充医疗-门（急）诊+住院',
	        				'list':{
	        					'amount':{
	        						'name':'保额',
	        						'value':'',
	        						'unit':'元'
	        					},
	        					'deduction':{
	        						'name':'免赔额',
	        						'value':'',
	        						'unit':'元'
	        					},
	        					'payment':{
	        						'name':'赔付比',
	        						'value':''
	        					},
	        				},
	        				'disabled':false,
	        			}
	        		},
	        	},
	        	1:{
	        		name:'综合医疗',
	        		list:{
	        			0:{
	        				'name':'综合医疗-门（急）诊',
	        				'list':{
	        					'amount':{
	        						'name':'保额',
	        						'value':'',
	        						'unit':'元'
	        					},
	        					'deduction':{
	        						'name':'免赔额',
	        						'value':'',
	        						'unit':'元'
	        					},
	        					'payment':{
	        						'name':'赔付比',
	        						'value':''
	        					},
	        				},
	        				'disabled':false,
	        			},
	        			1:{
	        				'name':'综合医疗-住院',
	        				'list':{
	        					'amount':{
	        						'name':'保额',
	        						'value':'',
	        						'unit':'元'
	        					},
	        					'deduction':{
	        						'name':'免赔额',
	        						'value':'',
	        						'unit':'元'
	        					},
	        					'payment':{
	        						'name':'赔付比',
	        						'value':''
	        					},
	        				},
	        				'disabled':false,
	        			},
	        		},
	        	},
	        	2:{
	        		name:'一般意外伤害',
	        		list:{
	        			0:{
	        				'name':'意外身故、残疾',
	        				'list':{
	        					'amount':{
	        						'name':'保额',
	        						'value':'',
	        						'unit':'元'
	        					},
	        				},
	        				'disabled':false,
	        			},
	        			1:{
	        				'name':'意外伤害医疗',
	        				'list':{
	        					'amount':{
	        						'name':'保额',
	        						'value':'',
	        						'unit':'元'
	        					},
	        				},
	        				'disabled':false,
	        			},
	        			2:{
	        				'name':'意外住院津贴',
	        				'list':{
	        					'amount':{
	        						'name':'保额',
	        						'value':'',
	        						'unit':'元'
	        					},
	        					'days':{
	        						'name':'保险期间内最高给付天数',
	        						'value':'',
	        						'unit':'天'
	        					},
	        				},
	        				'disabled':false,
	        			},
	        		},
	        	},
	        	3:{
	        		name:'交通意外身故、残疾',
	        		list:{
	        			0:{
	        				'name':'飞机',
	        				'list':{
	        					'amount':{
	        						'name':'保额',
	        						'value':'',
	        						'unit':'元'
	        					},
	        				},
	        				'disabled':false,
	        			},
	        			1:{
	        				'name':'轨道',
	        				'list':{
	        					'amount':{
	        						'name':'保额',
	        						'value':'',
	        						'unit':'元'
	        					},
	        				},
	        				'disabled':false,
	        			},
	        			2:{
	        				'name':'轮船',
	        				'list':{
	        					'amount':{
	        						'name':'保额',
	        						'value':'',
	        						'unit':'元'
	        					},
	        				},
	        				'disabled':false,
	        			},
	        			3:{
	        				'name':'营运汽车',
	        				'list':{
	        					'amount':{
	        						'name':'保额',
	        						'value':'',
	        						'unit':'元'
	        					},
	        				},
	        				'disabled':false,
	        			},
	        			2:{
	        				'name':'自驾（乘）车',
	        				'list':{
	        					'amount':{
	        						'name':'保额',
	        						'value':'',
	        						'unit':'元'
	        					},
	        				},
	        				'disabled':false,
	        			},
	        		},
	        	},
	        	4:{
	        		name:'30种重大疾病',
	        		list:{
	        			0:{
	        				'name':'飞机',
	        				'list':{
	        					'amount':{
	        						'name':'保额',
	        						'value':'',
	        						'unit':'元'
	        					},
	        				},
	        				'disabled':false,
	        			},
	        		}
	        	},
	        	5:{
	        		name:'猝死',
	        		list:{
	        			0:{
	        				'name':'猝死',
	        				'list':{
	        					'amount':{
	        						'name':'保额',
	        						'value':'',
	        						'unit':'元'
	        					},
	        				},
	        				'disabled':false,
	        			},
	        		}
	        	},
	        	6:{
	        		name:'百万医疗保障',
	        		list:{
	        			0:{
	        				'name':'百万医疗-门（急）诊',
	        				'list':{
	        					'amount':{
	        						'name':'保额',
	        						'value':'',
	        						'unit':'元'
	        					},
	        					'deduction':{
	        						'name':'免赔额',
	        						'value':'',
	        						'unit':'元'
	        					},
	        					'payment':{
	        						'name':'赔付比',
	        						'value':''
	        					},
	        				},
	        				'disabled':false,
	        			},
	        			1:{
	        				'name':'百万医疗-住院',
	        				'list':{
	        					'amount':{
	        						'name':'保额',
	        						'value':'',
	        						'unit':'元'
	        					},
	        					'deduction':{
	        						'name':'免赔额',
	        						'value':'',
	        						'unit':'元'
	        					},
	        					'payment':{
	        						'name':'赔付比',
	        						'value':''
	        					},
	        				},
	        				'disabled':false,
	        			},
	        		},
	        	},
	        	7:{
	        		name:'女性生育',
	        		list:{
	        			0:{
	        				'name':'女性生育',
	        				'list':{
	        					'amount':{
	        						'name':'保额',
	        						'value':'',
	        						'unit':'元'
	        					},
	        				},
	        				'disabled':false,
	        			},
	        		},
	        	},
	        	8:{
	        		name:'一般住院津贴',
	        		list:{
	        			0:{
	        				'name':'一般住院津贴',
	        				'list':{
	        					'amount':{
	        						'name':'保额',
	        						'value':'',
	        						'unit':'元/天'
	        					},
								'days':{
									'name':'保险期间内最高给付天数',
									'value':'',
									'unit':'天'
								},
	        				},
	        				'disabled':false,
	        			},
	        		},
	        	},
	        
	        
	        
	      	}
	      }
	    },
	    props:['titleData','formCheckState'],
	    components:{programmelist,service,imagetemp},
	    mounted:function(){
	    	this.addProgrammePros();
	    },
	    methods: {
	      //保障责任表单子组件通知父组件修改值
	      proListChildToParentToChange:function(obj,key){
	      	this.$set(this.programmePros.data[key],'programmeList',obj);  
	      },
	      //html转图
	      htmlToImg:function(){
	      	
	    	var _this = this;
	    	setTimeout(function(){
	    		var ele = document.getElementById("imgTempBox");
		      	html2canvas(ele,{
		      		x:-3500,
		      		y:0,
		      		backgroundColor:'null'
		      	}).then(function(canvas) {
		      		document.getElementById("imgShowTarget").setAttribute('src', canvas.toDataURL())
				});
				
		      	_this.imgShowState = true;
	    	})
	      },
	      //预览图片
	      previewImgFun:function(){
	      	this.htmlToImg();
	      },
	      //通知父组件修改表单检查状态值
	      callParentToChangeFormCheckState:function(state){
	      	this.$emit('changeFormCheckState',state)
	      },
	      //验证表单
	      checkForm:function(){
	      	this.callParentToChangeFormCheckState(true);
	      	this.checkProlistForm();
	      	this.$emit('checkTitleForm');
	      	
	      	for(var i = 0; i < this.$refs.programmelistchild.length; i++){
	      		this.$refs.programmelistchild[i].checkProlistChildForm();
	      	}
	      	this.$refs.serviceblock.checkServiceForm();
	      	
	      	
	      },
	      //检查本页方案表表单
	      checkProlistForm:function(){
	      	this.$refs['programmePros'].validate((valid) => {
	          if (valid) {
//	            alert('submit!');
	          } else {
	          	this.callParentToChangeFormCheckState(false);
//	            return false;
	          }
	        });
	      },
	      //生成图片
	      saveImg:function(){
	      	var _this = this;
	      	
	       this.checkForm()
//	      	return false;
	      	
	      	
	    	setTimeout(function(){
	    		if(!_this.formCheckState){
	    			return false;
	    		}
	    		var ele = document.getElementById("imgTempBox");
		      	html2canvas(ele,{
		      		x:-3500,
		      		y:0,
		      		backgroundColor:'null'
		      	}).then(function(canvas) {
		      		_this.downloadFile(canvas.toDataURL(), _this.titleData.programmeTitle)
				});
				
	    	},1000)
	      },
	      //下载图片
	      
		  downloadFile:function(content, fileName) { //下载base64图片
		    var base64ToBlob = function(code) {
		        let parts = code.split(';base64,');
		        let contentType = parts[0].split(':')[1];
		        let raw = window.atob(parts[1]);
		        let rawLength = raw.length;
		        let uInt8Array = new Uint8Array(rawLength);
		        for(let i = 0; i < rawLength; ++i) {
		            uInt8Array[i] = raw.charCodeAt(i);
		        }
		        return new Blob([uInt8Array], {
		            type: contentType
		        });
		    };
		    let aLink = document.createElement('a');
		    let blob = base64ToBlob(content); //new Blob([content]);
		    let evt = document.createEvent("HTMLEvents");
		    evt.initEvent("click", true, true); //initEvent 不加后两个参数在FF下会报错  事件类型，是否冒泡，是否阻止浏览器的默认行为
		    aLink.download = fileName;
		    aLink.href = URL.createObjectURL(blob);
		    aLink.click();
		  },
	      //关闭预览图片
	      closePreviewImg:function(){
	      	this.imgShowState = false;
	      },
	      
	      
	      
	      onSubmit() {
	      },
	      changeLogoShow:function(){
	      	this.logoShowState = !this.logoShowState;
	      },
	      //删除保障方案
	      deleteProgramme:function(key){
	      	this.$confirm('确定删除方案？', '', {
	          confirmButtonText: '确定',
	          cancelButtonText: '取消',
	          type: 'warning',
	          center: true
	        }).then(() => {
        	  this.$delete(this.programmePros.data,key);
	          this.$message({
	            type: 'success',
	            message: '删除成功!'
	          });
	        }).catch(() => {
	          this.$message({
	            type: 'info',
	            message: '已取消删除'
	          });
	        });
	      	
	      },
	      //添加保障方案
	      addProgrammePros:function(){
	      	var obj = {};
	    	obj.programmeData = JSON.parse(JSON.stringify(this.programmeData));
	    	obj.programmeList = JSON.parse(JSON.stringify(this.programmeList));
	    	this.programmePros.data.push(obj);
	      },
	      //删除服务人员
	      serviceDelete:function(key){
	      	this.$confirm('确定删除联系人？', '', {
	          confirmButtonText: '确定',
	          cancelButtonText: '取消',
	          type: 'warning',
	          center: true
	        }).then(() => {
        	  this.serviceList.data.splice(key,1);
	          this.$message({
	            type: 'success',
	            message: '删除成功!'
	          });
	        }).catch(() => {
	          this.$message({
	            type: 'info',
	            message: '已取消删除'
	          });
	        });
	      	
	      },
	      //添加服务人员
	      addServicePerson:function(){
	      	var obj = {
        		user:{value:'',errmsg:''},
        		phone:{value:'',errmsg:''},
        		email:{value:'',errmsg:''}
        	}
	      	this.serviceList.data.push(obj);
	      },
	      //添加自定义保障内容
	      addInsurCont:function(proList){
	      	var obj = {
	      		name:'',
	      		type:'custom',
	      		list:{
	      			0:{
	      				'name':'',
	      				'list':{
	      					'amount':{
	      						'name':'保额',
	      						'value':'',
	      						'unit':'元',
	      					},
        					'deduction':{
        						'name':'免赔额',
        						'value':'',
        					},
        					'payment':{
        						'name':'赔付比',
        						'value':''
        					},
        					'other':{
        						'name':'其他',
        						'value':''
        					},
	      				},
	      				'disabled':true
	      			}
	      		}
	      	}
	      	
	      	this.$set(proList,Object.keys(proList).length,obj)
//	      	this.programmeList[Object.keys(this.programmeList).length] = obj;
	      },
	      //添加自定义保障责任
	      insurListAddCont:function(key){
	      	var keys = key.split('__');
	      	var obj = {
  				'name':'',
  				'list':{
  					'amount':{
  						'name':'保额',
  						'value':'',
  						'unit':'元',
  					},
					'deduction':{
						'name':'免赔额',
						'value':'',
					},
					'payment':{
						'name':'赔付比',
						'value':''
					},
					'other':{
						'name':'其他',
						'value':''
					},
  				},
  				'disabled':true
  			}
	      	
	      	this.$set(this.programmePros.data[keys[1]].programmeList[keys[0]]['list'],Object.keys(this.programmePros.data[keys[1]].programmeList[keys[0]]['list']).length,obj)
	      },
	      insurDeleteCont:function(key){
	      	this.$confirm('确定删除自定义保障责任？', '', {
	          confirmButtonText: '确定',
	          cancelButtonText: '取消',
	          type: 'warning',
	          center: true
	        }).then(() => {
	          this.$message({
	            type: 'success',
	            message: '删除成功!'
	          });
	          var keys = key.split('_');
	          this.$delete(this.programmePros.data[keys[2]].programmeList[keys[0]]['list'],keys[1]);
	        }).catch(() => {
	          this.$message({
	            type: 'info',
	            message: '已取消删除'
	          });
	        });
	      },
	      //预览图片
	      
	    }
	 }
	
</script>

<style>
	.pro-cont-title{
		height: 50px;
		line-height: 40px;
		color: #999;
		padding-left: 50px;
		text-align: center;
	    font-size: 18px;
	    color: #00aca0;
	}
	
	.pro-cont-proname{
		padding: 10px 0;
		padding-left: 40px;
	}
	.pro-cont-proname .el-form-item{
		margin-bottom: 0;
	}
	.pro-cont-name-box{
		width: 95%;
	}
	.pro-cont-name-box input{
		background: #00ACA0;
		color: white;
	}
	.pro-cont-proname .el-form-item__label{
		color: #2E2D2E;
	}
	.bor-panel{
	}
	.pro-form-box{
		padding: 20px 30px;
	}
	.pro-bigform-box{
		padding: 20px 0;
		text-align: center;
		border-top: 1px solid #efefef;
		border-bottom: 1px solid #efefef;
		width: 98%;
		margin: 0 auto;
	}
	.pro-form-header{
		height: 40px;
		line-height: 40px;
		background:rgba(0,172,160,0.2);
		font-size: 14px;
		color: #2E2D2E;
		padding-left: 20px;
	}
	.pro-form-cont{
		display: flex;
		width: 80%;
		margin: 0 auto;
		justify-content: space-between;
	}
	.pro-total-form-item {
		text-align: center;
	}
	.pro-total-form-item .el-form-item__label{
		float: none;	
	}
	.pro-total-form-item .el-input{
		width: 84%;
	}
	.pro-formtable-cont{
		height: 40px;
		line-height: 40px;
		margin-top: 10px;
	}
	.pro-formtable-cont .pro-formtable-title{
		display: flex;
		background: #E4EEF0;
	}
	.pro-formtable-cont .pro-formtable-title div{
		flex: 1;
		text-align: center;
		position: relative;
	}
	.pro-formtable-cont .pro-formtable-title div:after{
		content: '';
		position: absolute;
		border-left: 2px solid white;
		top: 0;
		bottom: 0;
		left: 0;
	}
	.pro-formtable-cont .pro-formtable-title div:before{
		content: '';
		position: absolute;
		border-bottom: 2px solid white;
		right: 0;
		bottom: 0;
		left: 0;
	}
	.page-footer-box{
		text-align: center;
	}
	.page-footer-box p{
		font-size: 14px;
		color: #666;
	}
	.page-footer-box p:nth-child(2){
		margin-top: 20px;
		font-size: 18px;
		color: #2E2D2E;
	}
	.page-footer-box p:nth-child(3){
		margin-top: 16px;
		color: #2E2D2E;
	}
	.page-footer-box p:nth-child(4){
		margin-top: 80px;
		color: #4A4A4A;
	}
	.foot-tip{
		width: 90%;
		margin: 0 auto;
		height: 40px;
		line-height: 40px;
		text-align: center;
		font-size: 14px;
		color: #666;
		background: #efefef;
		margin-top: 20px;
		margin-bottom: 60px;
	}
	.add-prog-btn{
		float: right;
		margin-right: 50px;
		margin-top: 15px;
	}
	
	.img-temp-box{
		position: absolute;
		left: -3500px;
		/*left: 0;*/
		top: 0;
		width: 1090px;
	}
	.img-show-box{
	    position: absolute;
	    width: 700px;
	    height: 90%;
	    left: 50%;
	    margin-left: -350px;
	    top: 7%;
	}
	.img-show-box img{
		width: 100%;
	}
	.img-show-out-box{
		position: fixed;
		width: 100%;
		height: 100%;
		left: 0;
		top: 0;
		z-index: 9;
	}
	.img-show-mask{
		position: absolute;
		width: 100%;
		height: 100%;
		left: 0;
		top: 0;
		background: #000000;
		opacity: .5;
	}
	.pro-cont-name-box .el-form-item__error{
		left: 90px;
    	top: 125%;
	}
	.pro-total-err-3 .el-form-item__error{
		left: 15px;
	}
	
	.pro-form-cont .el-input__inner{
		border: 1px solid #00ACA0;
	}
	.pro-form-cont .el-input__prefix, .el-input__suffix{
		color: #00ACA0;
	}
	.pro-form-rule-box .el-textarea__inner{
		background: #F0F4F7;
	}
	.pro-form-table-cont{
		overflow: hidden;
	}
	.img-show-menu{
		margin-top: -30px;
		overflow: hidden;
	}
	.img-wraper-box{
		overflow-y: scroll;
		height: 100%;
	}
	.img-show-menu-name{
		font-size: 20px;
		color: white;
		float: left;
		margin-bottom: 5px;
	}
	.img-show-menu-close{
		float: right;
	}
	.img-show-menu-close .el-icon-close{
		font-size: 30px;
		cursor: pointer;
	    color: white;
	    margin-top: -5px;
	}
</style>