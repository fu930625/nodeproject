function UpdatePosition(container){
	this.container = container;
	this.id='';
	this.init();
}
 
UpdatePosition.ModelTemp = `
	<div class="modal fade js-update-modal" role="dialog" aria-labelledby="UpdatePositionLabel">
	  <div class="modal-dialog" role="document">
	    <div class="modal-content">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	        <h4 class="modal-title" id="UpdatePositionLabel">需改职位</h4>
	      </div>
	      <div class="modal-body">
			<div class="form-group">
			  <label for="addpos-company">公司名称</label>
			  <input type="text" class="form-control js-company" id="update-company" placeholder="请输入公司名">
			</div>
			<div class="form-group">
			  <label for="addpos-position">职位名称</label>
			  <input type="text" class="form-control js-position" id="update-position" placeholder="请输入职位名称">
			</div>
			<div class="form-group">
			  <label for="addpos-salary">薪资范围</label>
			  <select class="form-control js-salary " id=""update-salary">
				  <option>5-10k</option>
				  <option>10-15k</option>
				  <option>15-20k</option>
				  <option>20-25k</option>
				  <option>25-30k</option>
			  </select>
			</div>
			<div class="form-group">
			  <label for="addpos-address">办公地点</label>
			  <input type="text" class="form-control js-address" id=""update-address" placeholder="请输入办公地点">
			</div>
		
		<div class="form-group">
		  <label for="addpos-logo">公司logo</label>
		  <input type="file" class="form-control js-logo" id="updatepos-logo">
		</div>
	      </div>
	      <div class="modal-footer">
	        <button type="button" class="btn btn-primary js-submit">提交</button>
	      </div>
	      <div class="alert alert-success hide js-succ-notice" role="alert" style="margin:20px;">
			添加成功
	      </div>
	      <div class="alert alert-danger hide js-err-notice" role="alert" style="margin:20px;">
			对不起，您所注册的用户名已存在
	      </div>
	    </div>
	  </div>
	</div>
`


$.extend(UpdatePosition.prototype, {
	init: function(){
		this.createDom();
		this.bindEvents();
		 
	},
	createDom: function(){
	this.modal = $(UpdatePosition.ModelTemp)
	this.SuccNoticeElem = this.modal.find(".js-succ-notice");
	this.container.append(this.modal);
	this.companyElem = this.modal.find(".js-company");
	this.positionElem = this.modal.find(".js-position");
	this.salaryElem = this.modal.find(".js-salary");
	this.logoElem = this.modal.find(".js-logo");
	this.addressElem = this.modal.find(".js-address");
   },
    showItem: function(id){
    	 this.modal.modal("show");
    	 this.getPositionInfo(id);
    },
    getPositionInfo: function(id){
    	$.ajax({
    		type:"get",
    		url:"/api/getPosition",
    		data: {
    			id:id
    		},
    		success: $.proxy(this.handleGetPositionInfoSucc,this)
    	});
    },
    handleGetPositionInfoSucc: function(res){
		if(res && res.data && res.data.info){
			var info =  res.data.info;
			this.companyElem.val(info.company);
			this.positionElem.val(info.position);
			this.salaryElem.val(info.salary);
			this.addressElem.val(info.address)
			this.id = info._id;
		}
    },
    bindEvents: function(){
   	var submintBtn = this.modal.find(".js-submit");
   	submintBtn.on("click",$.proxy(this.handleSubmitBtnClick,this));
   },
   handleSubmitBtnClick: function(){
   	var company = this.companyElem.val();
   	    position = this.positionElem.val();
   	    salary = this.salaryElem.val();
   	    address =this.addressElem.val();
   	    logo = this.logoElem[0].files[0];
   	    		
   	   // 创建一个表单数据的对象
		var formData = new FormData();
		formData.append("company", company);
		formData.append("position", position);
		formData.append("salary", salary);
		formData.append("address", address);
		formData.append("logo", logo);
        formData.append("id", this.id);
       
		
    $.ajax({
    	processData: false,
			contentType: false,
    	cache: false,
    	type: "POST",
    	url: "/api/updatePosition/",
    	data:formData,
    	success: $.proxy(this.handleUpdatePositionSucc,this)
    })
   },
  handleUpdatePositionSucc: function(res) {
   	console.log(res)
   	if(res && res.data && res.data.uptate){
   		this.succNoticeElem
   	}
	if(res && res.data && res.data.update){
   		this.SuccNoticeElem.removeClass("hide");
   		setTimeout($.proxy(this.handleDelay,this),3000);
	     $(this).trigger("change");
   	}
	   },
	   
handleDelay: function() {
		this.SuccNoticeElem.addClass("hide");	
		this.modal.modal("hide")

}

})
