<template>
	<div>
		
		<div class="it-cont-pro-big-title" v-text="proItem.programmeData.programmeName">
			保险方案一
		</div>
		<div class="it-cont-pro-title" style="margin-top: 50px;">
			保险方案总览
		</div>
		<div class="it-cont-cont-box">
			<div class="it-total-box">
				<div class="it-total-item" v-if="proItem.programmeData.programeTotalData.target">
					<p>保障对象</p><p v-text="proItem.programmeData.programeTotalData.target">员工</p>
				</div>
				<div class="it-total-item" v-if="proItem.programmeData.programeTotalData.personNum">
					<p>保障人数</p><p v-text="proItem.programmeData.programeTotalData.personNum+'人'">23人</p>
				</div>
				<div class="it-total-item" v-if='proItem.programmeData.programeTotalData.standardCost'>
					<p>标准费用</p><p class="it-price-sty">{{proItem.programmeData.programeTotalData.standardCost}}<span>元/人/年</span></p>
				</div>
				<div class="it-total-item" v-if="proItem.programmeData.programeTotalData.totalCost">
					<p>保费合计</p><p>{{proItem.programmeData.programeTotalData.totalCost}}<span>元/人/年</span></p>
				</div>
			</div>
		</div>
		<div class="it-cont-pro-title" style="margin-top: 0;">
			保障责任
		</div>
		<div class="it-insur-list-box">
			 <el-table
			    :data="formatInsurListData(proItem.programmeList,proKey)"
			    :border='true'
			    header-align="center"
			    :span-method="objectSpanMethod"
			    :current-row-key="proKey"
			    header-row-class-name="my-header"
			    cell-class-name="my-cell"
			    style="width: 100%;margin-top: 15px;background: #EDF4F5;"> <!--						    :span-method="objectSpanMethod" -->
			    <el-table-column
			      prop="insur_cont"
			      label="保障内容"
			      align="center"
			      width="180">
			    </el-table-column>
			    <el-table-column
			      prop="insur_name"
			      label="保障责任"
			      align="center"
			      width="180">
			    </el-table-column>
			    <el-table-column
			      prop="insur_amount"
			      align="center"
			      label="保障赔额">
			    </el-table-column>
			    
			    <el-table-column
			      prop="insur_deduction"
			      align="center"
			      label="年免赔额">
			    </el-table-column>
			    
			    <el-table-column
			      prop="insur_payment"
			      align="center"
			      label="赔付比例">
			    </el-table-column>
			  </el-table>
		</div>
		
		<div class="it-cont-pro-title">
			参保规则
		</div>
		<div class="it-cont-rules">
	<pre v-if="proItem.programmeData.insurRouls" v-text="proItem.programmeData.insurRouls">
	</pre>
	<pre v-else>
	1、起保人数：5人 
	2、参保年龄：18-50周岁，平均年龄小于33周岁（不含），参保人数超过20人的，平均年龄在33-35周岁（不含）的上浮10% 
	3、职业类别：1-3类 
	4、既往症：不承担重大既往症的医疗费用赔付责任 
	5、参保人员需已参加当地社保，补充医疗报销需先经过社保结算 
	6、就诊医院：中国大陆公立二级及以上医院（不含非公立医院及特需、外宾或国际医疗部）；若经北京保结算的，不限制医院级别和性质，但不含特需、外宾或国际医疗部
	7、企业参保人员比例不低于75%（承保人数小于20人需要全员参保）
	8、女性参保人数不高于总参保人数的50% 
	9、承保人数大于50人的，补充医疗可以选择扩展乙类（自付二），费用上浮15% 
	10、该套餐不适用于医药医疗类、健康管理类、文化传媒类、物业服务类以及酒店管理类公司
	</pre>
		</div>
	
	</div>
</template>

<script>
	
	export default {
		data() {
			return {
				spanArr:{data:[]},
				listSpanArr:{data_0:[]},
			}
		},
		props:['proItem'],
		mounted:function(){
		},
		methods:{
			//格式化保障责任表格
			formatInsurListData:function(obj,key){
				var dataArr = []
				var i;
				for(i in obj){
					var dataObj = {};
					var inobj = obj[i];
					var li;
					for(li in inobj['list']){
						var liobj = inobj['list'][li];
						if(liobj.disabled){
							dataObj = {};
							dataObj['insur_cont'] = inobj.name;
							dataObj['insur_name'] = liobj.name; 
							dataObj['table_key'] = key;
							dataObj['insur_amount'] = (liobj.list.amount.value+liobj.list.amount.unit).replace('元','');
							if(liobj.list.hasOwnProperty('deduction')){
								if(liobj.list.deduction.name != '免赔额'){
									dataObj['insur_deduction'] = '保险期间内最高给付' + liobj.list.deduction.value +'天';
								}else{
									dataObj['insur_deduction'] =liobj.list.deduction.value
								}
							}else{
								dataObj['insur_deduction'] = '-'
							}
							if(liobj.list.hasOwnProperty('days')){
								dataObj['insur_deduction'] = '保险期间内最高给付' + liobj.list.days.value +'天';
								dataObj['days'] = '保险期间内最高给付' + liobj.list.days.value +'天';
							}
							if( liobj.list.hasOwnProperty('other') && liobj.list.other.value){
								dataObj['insur_deduction'] = liobj.list.other.value;
								dataObj['days'] = liobj.list.other.value;
							}
							
							if(liobj.list.hasOwnProperty('payment')){
								dataObj['insur_payment'] =liobj.list.payment.value
							}else{
								dataObj['insur_payment'] = '-'
							}
							
							dataArr.push(dataObj);
						}
						
					}
				}
				console.log(dataObj)
				this.getSpanData(JSON.parse(JSON.stringify(dataArr)),key)
				return dataArr;
			},
			getSpanData:function(dataArrs,key){
				var obj = [1];
				var rowObj=[];
				var conIndex=0;
				if(dataArrs.length > 0){
					var s;
					for(s in dataArrs){
						if(s > 0){
							if(dataArrs[s].insur_cont === dataArrs[s-1].insur_cont){
								obj[conIndex]++;
								obj.push(0);
							}else{
								obj.push(1);
								conIndex = s;
							}
						}
						if(dataArrs[s].hasOwnProperty('days')){
							rowObj.push(1);
						}else{
							rowObj.push('');
						}
						console.log(dataArrs[s])
					}
				}
				rowObj.push(1);
				rowObj.push(1);
//				this.spanArr = JSON.parse(JSON.stringify(obj));
				this.$set(this.spanArr,'data',obj);
				this.$set(this.listSpanArr,'data_'+key,rowObj)
				console.log(this.listSpanArr)
			},
			objectSpanMethod({ row, column, rowIndex, columnIndex }) {
		        if (columnIndex === 0) {
		        	var _row = this.spanArr.data[rowIndex];
		        	var _col = _row > 0 ? 1 : 0;
		        	return {
		        		rowspan:_row,
		        		colspan:_col
		        	}
		        }
		        if(columnIndex === 3){
		        	console.log(columnIndex)
			        if(this.listSpanArr['data_'+row.table_key][rowIndex] == 1){
			        	
			        	return {
			        		rowspan:1,
			        		colspan:2
			        	}
			        }else{
			        	return {
			        		rowspan:1,
			        		colspan:1
			        	}
			        }
		        }
	      	}
		}
	}
</script>

<style>
</style>