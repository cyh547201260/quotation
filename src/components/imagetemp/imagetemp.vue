<template>
	<div class="it-box">
		<div class="it-outborder-box">
			<div class="it-inborder-box">
				<div class="it-top-header"><img v-show="titleData.logoShow" class="it-top-header-logo" src="../../assets/img/it-title-logo.png"/></div>
				<div class="it-top-title">
					<p v-text="titleData.customName"></p>
					<p v-text="titleData.programmeTitle"></p>
				</div>
				<div class="it-cont-desc" v-text="titleData.slogan">
					<!--slogan-->
				</div>
				<div class="it-cont-box" v-for="(proItem,proKey) in programmePros">
					<imagetemp :proItem="proItem" :proKey='proKey'></imagetemp>
				</div>
				<div class="it-cont-box">
					
					<div class="it-cont-pro-title">
						专属服务人员
					</div>
					<div class="it-cont-service">
						<div class="it-service-item" v-for="serItem in serviceList.data">
							<template v-if="serItem.user.value || serItem.phone.value || serItem.email.value">
								<p>联系人：{{serItem.user.value}}</p>
								<p>联系电话：{{serItem.phone.value}}</p>
								<p>邮箱：{{serItem.email.value}}</p>
							</template>
						</div>
					</div>
					<div class="it-footer-box">
						<img src="../../assets/img/it-ewm.png"/>
						<p>为了每一个拼搏的未来</p>
						<p>扫描二维码进入保险极客官网了解更多</p>
						<p>注：以上各项保险责任以及报价仅作为参考，最终保障细则和详细内容请依据最终签订的保险合同条款</p>
						<div class="it-footer-box-tip">
							最终解释权归保险极客所有
						</div>
						<div class="it-footer-money-tip">
							单位:人民币/元
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="it-footer-over" style="bottom: -2px;">
			<img style="width: 100%;" src="../../assets/img/it-page-foot-over.png"/>
		</div>
	</div>
</template>

<script>
	
	
	import imagetemp from '@/components/imagetemp/imagetable'
	
	
	export default {
		data() {
			return {
				spanArr:{data:[]},
				listSpanArr:{data_0:[]},
			}
		},
		props:['programmePros','titleData','serviceList'],
		mounted:function(){
//			this.getImg()
console.log(123)
		},
		components:{imagetemp},
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
	.it-box{
		width: 1090px;
		margin: 0 auto;
		background-image: url(../../assets/img/it-page-foot-arr.png);
		background-size: 100% auto;
		background-repeat: no-repeat;
		background-position: center bottom;
		position: relative;
	}
	.it-outborder-box{
		width: 990px;
		margin: 0 auto;
		margin-bottom: 0;
		border: 10px solid #00aca0;
		background: white;
	}
	.it-inborder-box{
		width: 940px;
		margin: 25px auto;
		border: 2px solid #00aca0;
		padding-bottom: 420px;
	}
	.it-top-header{
		width: 100%;
		height: 140px;
		background-image: url(../../assets/img/topheader-bg.png);
		background-size: 100% 100.8%;
		background-position: -1px -1px;
		text-align: center;
	}
	.it-top-header-logo{
		width: 140px;
		margin-top: 80px;
		
	}
	.it-top-title{
		text-align: center;
		margin-top: 70px;
	}
	.it-top-title p:first-child{
		font-size: 46px;
		color: #2E2D2E;
	}
	.it-top-title p:nth-child(2){
		font-size: 38px;
		color: #2E2D2E;
		margin-top: 30px;
	}
	.it-cont-box{
		width: 780px;
		margin: 0 auto ;
	}
	.it-cont-desc{
		width: 100%;
		text-align: center;
		margin-top: 60px;
		font-size: 16px;
		color: #2e2d2e;
	}
	.it-cont-pro-big-title{
		width: 100%;
		height: 50px;
		text-align: center;
		background: #00ACA0;
		color: white;
		font-size: 24px;
		line-height: 50px;
		margin-top: 50px;
	}
	.it-cont-pro-title{
		/*width: 100%;*/
		height: 45px;
		background:rgba(0,172,160,0.2);
		line-height: 45px;
		color: #202020;
		font-size: 18px;
		padding-left: 20px;
		margin-top: 40px;
	}
	.it-total-box{
		display: flex;
	}
	.it-total-item{
		flex: 1;
		text-align: center;
	}
	.it-total-item p:first-child{
		font-size: 18px;
		color: #2e2d2e;
		margin-top: 30px;
	}
	.it-total-item p:nth-child(2){
		font-size: 26px;
		color: #4A4A4A;
		margin-top: 20px;
		margin-bottom: 40px;
	}
	.it-total-item p.it-price-sty{
		color: #00ACA0;
	}
	.it-total-item p span{
		font-size: 12px;
	}
	.it-cont-rules{
		margin-top: 20px;
		font-size: 14px;
		color: #2e2d2e;
		line-height:24px;
		padding: 0 3px;
	}
	.it-cont-rules pre{
		white-space: pre-wrap;
		font-family: "微软雅黑";
	}
	.it-cont-service{
		width: 96%;
		margin: 0 auto;
		padding: 10px 0;
	}
	.it-service-item{
		display: flex;
	}
	.it-service-item p{
		flex: 1;
		font-size: 16px;
		color: #2e2d2e;
		line-height: 40px;
	}
	.it-footer-box{
		text-align: center;
		margin-top: 40px;
	}
	.it-footer-box p:nth-child(2){
		font-size: 16px;
		color: #2E2D2E;
		margin-top: 5px;
	}
	.it-footer-box p:nth-child(3){
		font-size: 14px;
		color: #2E2D2E;
		margin-top: 10px;
	}
	.it-footer-box p:nth-child(4){
		font-size: 14px;
		color: #4A4A4A;
		margin-top: 70px;
	}
	.it-footer-box-tip{
		width: 100%;
		background: #EDF1F5;
		height: 45px;
		line-height: 45px;
		color: #4A4A4A;
		font-size: 14px;
		margin-top: 14px;
	}
	.it-footer-money-tip{
		text-align: right;
		font-size: 14px;
		color: #4A4A4A;
		margin-top: 10px;
	}
	.it-footer-over{
		position: absolute;
		width: 100%;
		left: 0;
		bottom: 0;
	}
	.my-cell{
		background-color: #EDF4F5 !important;
		color: #2e2d2e;
	}
	.my-header th{
		background-color: #E4EEF0 !important;
		color: #2e2d2e;
	}
	.it-insur-list-box table{
		border-color: white !important;
	}
	
	
	.it-insur-list-box .el-table--border td, .el-table--border th, .el-table__body-wrapper .el-table--border.is-scrolling-left~.el-table__fixed {
	    border-right: 1px solid #fff;
	    border-bottom: 1px solid #fff;
	}
	.it-insur-list-box .el-table td, .el-table th.is-leaf{
		border-bottom: 1px solid #fff;
	}
	.it-insur-list-box .el-table tr{
		border-bottom: 1px solid #fff !important;
	}
	/*.it-insur-list-box .el-table__row{
		border-top: 1px solid #fff;
	}*/
	.it-insur-list-box td{
		border-bottom: 1px solid #fff !important;
		border-left: 1px solid #fff !important;
	}
</style>