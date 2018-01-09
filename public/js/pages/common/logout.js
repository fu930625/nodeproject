function Logout(container){
   	this.container = container;
    this.init();
}
Logout.Temp = `
	<li>
		<a href='javascript:;'>退出</a>
	</li>`;
	
$.extend(Logout.prototype,{
	init:function(){
		//alert(123)
		this.createDom();
		this.bindEvents();
	},
	createDom:function() {
		this.element = $(Logout.Temp),
		this.container.append(this.element)
	},
	bindEvents:function() {
		this.element.on("click",$.proxy(this.handleClick,this))
	},
	handleClick:function() {
		$.ajax({
		url: "/api/logout",
			success: $.proxy(this.handleLogoutSucc,this)
		})
},
	handleLogoutSucc: function(res){
	if(res && res.data && res.data.logout ){
			window.location.reload();
	}
	}

	
	
	
	
	
	
	
})
	
