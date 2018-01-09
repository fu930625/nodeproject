   function Page(){
	
}

$.extend(Page.prototype, {
	init: function(){
		this.createHeader();
		this.createAddCandidate();
//		this.createPositionList();
//		this.createPagination();
	},
	createHeader: function() {
		var headerContainer = $(".js-header");
		this.header = new Header(headerContainer,1);
		
	},
	createAddCandidate: function() {
		var CandidateContainer = $(".js-container");
		this.addCandidate = new AddCandidate(PositionContainer);
		$(this.addCandidate).on("change",$.proxy(this.handleAddPosition,this))
	
	},
//	createPositionList: function() {
//		var PositionContainer = $(".js-container");
//		this.positionList = new PositionList(PositionContainer);
//		//接收者 监听 
//      $(this.positionList).on("change",$.proxy(this.handleListChange,this))
//     
//	},
//	createPagination: function() {
//		var PaginationContainer = $(".js-pagination");
//		this.pagination =  new Pagination(PaginationContainer);
//		$(this.pagination).on("change",$.proxy(this.handlePaginationChange, this))
//	},
//	handleListChange: function(e) {
//		this.pagination.setTotal(e.total)
//	},
//	
//	handlePaginationChange: function(e) {
//	  this.positionList.changePage(e.page);
//	},
//	handleAddPosition: function(){
//		 this.positionList.getListInfo();
//	}
	
});