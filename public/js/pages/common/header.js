 function Header(headerContainer,index){
 	this.headerContainer= headerContainer;
 	this.selectedIndex = index;
 	this.init()
 }
 //创建一个模板
Header.temply =`
	<nav class="navbar navbar-default">
	  <div class="container-fluid">
	
	    <div class="navbar-header">
	      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
	       
	        <span class="icon-bar"></span>
	        <span class="icon-bar"></span>
	        <span class="icon-bar"></span>
	      </button>
	      <a class="navbar-brand" href="#">拉勾网后台</a>
	    </div>
	
	    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
	      <ul class="nav navbar-nav js-left">
	        <li><a href="/">首页</a></li>
	        <li><a href="list.html">列表页</a></li>
	        <li><a href="candidate.html">候选人管理</a></li>
	      </ul>
	     
	      <ul class="nav navbar-nav navbar-right js-right" >

	       </ul>
	    </div>
	  </div>
	  
	

	</nav>
`
$.extend(Header.prototype, {
	init:function(){
	   this.createDom();
	   this.getLoginInfo();
       this.setSelected();
	},
	 //创建dom，吧模板挂起来 
	createDom: function() {
	   this.element = $(Header.temply); 
	   this.headerContainer.append(this.element);
	   this.rightArea = this.element.find(".js-right");
	},
	setSelected:function() {
		var leftArea = this.element.find(".js-left");
		    leftItems = this.element.find("li"),
		leftItems.eq(this.selectedIndex).addClass("active")
	},
	getLoginInfo:function() {
		$.ajax({
	         type:"get",
			url:"/api/isLogin",
			success:$.proxy(this.handleGetLoginSucc,this)
		})
	},
	handleGetLoginSucc:function(res){
//		alert(123)
		console.log(res)
		if(res && res.data && res.data.isLogin){
//			alert()
			this.createLoginout();
		}else{
			 this.createLogin();
             this.createRegister();
		}
	},
   createLogin: function() {
		this.login = new Login(this.rightArea, this.element);
		//传了2个参数。在login头部已经用container,modelContainer 来接收参数
	},
  createRegister: function(){
		this.register = new Register(this.rightArea, this.element);
	},
	//退出按钮
  createLoginout: function(){
  	this.logout = new Logout(this.rightArea);
  }
	
	
	
	
	
})

	