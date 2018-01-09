 function PositionList(container) {
	this.container = container;
	this.page = 1;
	this.size = 10;
	this.init();
} 
PositionList.Temp=`
  <table class="table" style="margin-top:20px">
      <thead>
    	<tr>
    		<th>序号</th>
    		<th>公司</th>
    		<th>职位</th>
    		<th>薪资</th>
    		<th>地址</th>
    		<th>logo</th>
    		<th>操作   </th>
    	</tr>
    	 </thead>
    	 <tbody class="js-tbody"></tbody>
    </table>
`

$.extend(PositionList.prototype, {
	init: function(){
		this.createDom();
		this.getListInfo();
		this.createUpdatePosition();
		this.bindEvents();
		
	},
	createDom: function(){
		this.res = $(PositionList.Temp);
		this.container.append(this.res)
	},
	createUpdatePosition: function(){
		this.updatePosition =  new UpdatePosition(this.container);
		$(this.updatePosition).on("change",$.proxy(this.getListInfo,this));
	},
	bindEvents: function(){ 
		this.container.on("click",$.proxy(this.handleTableClick,this));
	},
	handleTableClick: function(e) {
		var target = $(e.target),
			isDeleteClick = target.hasClass("js-delete"),
			isUpdateClick = target.hasClass("js-update");
		if (isDeleteClick) {
			this.deleteItem(target.attr("data-id"));
		}
		if (isUpdateClick) {
			this.updatePosition.showItem(target.attr("data-id"));
		}
	},
	deleteItem: function(id) {
		$.ajax({
			url: "/api/removePosition",
			data: {
				id: id
			},
			success: $.proxy(this.handleItemDeleteSucc, this)
		})
	},
	handleItemDeleteSucc:function(res){
		if(res && res.data && res.data.delete){
			this.getListInfo();
		}
	},
	getListInfo: function(){
		$.ajax({
			type:"get",
			url:"/api/getPositionList",
			data:{
				page:this.page,
				size:this.size,
			},
			success: $.proxy(this.handleGetListInfoSucc,this)
		})
	},
	handleGetListInfoSucc: function(res){
		if(res && res.data && res.data.list){
		   this.createItems(res.data.list);
		   //发布订阅模式，触发事件，（发布者）
		   $(this).trigger(new $.Event("change",{
		   total:res.data.totalPage
		   }));
		}
	},
	createItems: function(list){
		var itemContainer = this.container.find(".js-tbody"),
		     str = "";
		for(var i=0;i<list.length;i++){
			var info = list[i],
               file = info.filename ? info.filename: "1515326778695timg2.jpg";
		    str += `<tr><td>${i +1}</td>
		               <td>${info.company}</td>
		                <td>${info.position}</td>
		                <td>${info.salary}</td>
		                <td>${info.address}</td>
		                 <td><img style="width:30px;height:30px;" src="/uploads/${file}" /></td>
		                <td>
		                <span class="js-update" data-id="${info._id}">修改  <span>
		                <span class="js-delete" data-id="${info._id}"> 删除<span>
		                </td>
		                </tr>`
		}
		itemContainer.html(str)
	},
	changePage: function(page){
		this.page = page;
		this.getListInfo();
	}
})



