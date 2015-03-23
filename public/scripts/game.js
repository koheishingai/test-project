	/* jQuery(function ($) {
		var myTbl = $("myTbl");
		cell = myTbl.rows[3].cells[3]
		cell.innerHTML = "○";
	}); */
    var socket = io.connect(":8081");

    socket.emit("test1"); // 単独 - サーバーに投げる
    socket.emit("test2"); // 全体 - サーバーに投げる
    
    socket.on("test1", function(callback){ // 単独 - サーバーからのコールバック
      console.log("test1: "+callback);
    });
    
    socket.on("test2", function(callback){ // 全体 - サーバーからのコールバック
      console.log("test2: "+callback);    
    });
    
	var now_koma = {};
	var myTbl = document.getElementById("myTbl");
	(function(){		
		for (var i=0 ; i<=8 ; i++){
			cell = myTbl.rows[6].cells[i];
			cell.innerHTML = "<div class='center' name='hohei' onClick='selectCell(this)'>歩</div>";
		}
		cell = myTbl.rows[7].cells[1];
		cell.innerHTML = "<div class='center' name='hisya' onClick='selectCell(this)'>飛</div>";
		cell = myTbl.rows[7].cells[7];
		cell.innerHTML = "<div class='center' name='kaku' onClick='selectCell(this)'>角</div>";
		cell = myTbl.rows[8].cells[0];
		cell.innerHTML = "<div class='center' name='kyosya' onClick='selectCell(this)'>香</div>";
		cell = myTbl.rows[8].cells[1];
		cell.innerHTML = "<div class='center' name='keima' onClick='selectCell(this)'>桂</div>";
		cell = myTbl.rows[8].cells[2];
		cell.innerHTML = "<div class='center' name='gin' onClick='selectCell(this)'>銀</div>";
		cell = myTbl.rows[8].cells[3];
		cell.innerHTML = "<div class='center' name='kin' onClick='selectCell(this)'>金</div>";
		cell = myTbl.rows[8].cells[4];
		cell.innerHTML = "<div class='center' name='ou' onClick='selectCell(this)'>王</div>";
		cell = myTbl.rows[8].cells[5];
		cell.innerHTML = "<div class='center' name='kin' onClick='selectCell(this)'>金</div>";
		cell = myTbl.rows[8].cells[6];
		cell.innerHTML = "<div class='center' name='gin' onClick='selectCell(this)'>銀</div>";
		cell = myTbl.rows[8].cells[7];
		cell.innerHTML = "<div class='center' name='keima' onClick='selectCell(this)'>桂</div>";
		cell = myTbl.rows[8].cells[8];
		cell.innerHTML = "<div class='center' name='kyosya' onClick='selectCell(this)'>香</div>";
	}());
	
	function selectCell(x){
		if($(x).attr("name") ==="movePoint"){
			var cellCnt = x.parentElement.cellIndex
			var rowCnt = x.parentElement.parentElement.rowIndex;
			movePiece(cellCnt,rowCnt);
		}else{
			now_koma.cellCnt = x.parentElement.cellIndex;
			now_koma.rowCnt = x.parentElement.parentElement.rowIndex;
			now_koma.name = $(x).attr("name");
			selectPiece();
		}
	}
	
	function movePiece(cellCnt,rowCnt){
		var toCell = myTbl.rows[rowCnt].cells[cellCnt];
		var fromCell = myTbl.rows[now_koma.rowCnt].cells[now_koma.cellCnt];
		if (now_koma.name === "hohei"){
			if(rowCnt<3){
				changeKoma(toCell);
			}else{
				toCell.innerHTML = "<div class='center' name='hohei' onClick='selectCell(this)'>歩</div>";
			}
		}else if(now_koma.name === "hisya"){
			if(rowCnt<3){
				changeKoma(toCell);
			}else{
				toCell.innerHTML = "<div class='center' name='hisya' onClick='selectCell(this)'>飛</div>";
			}
		}else if(now_koma.name === "kaku"){
			if(rowCnt<3){
				changeKoma(toCell);
			}else{
				toCell.innerHTML = "<div class='center' name='kaku' onClick='selectCell(this)'>角</div>";
			}
		}else if(now_koma.name === "kyosya"){
			if(rowCnt<3){
				changeKoma(toCell);
			}else{
				toCell.innerHTML = "<div class='center' name='kyosya' onClick='selectCell(this)'>香</div>";
			}
		}else if(now_koma.name === "keima"){
			if(rowCnt<3){
				changeKoma(toCell);
			}else{
				toCell.innerHTML = "<div class='center' name='keima' onClick='selectCell(this)'>桂</div>";
			}
		}else if(now_koma.name === "gin"){
			if(rowCnt<3){
				changeKoma(toCell);
			}else{
				toCell.innerHTML = "<div class='center' name='gin' onClick='selectCell(this)'>銀</div>";
			}
		}else if(now_koma.name === "kin"){
			toCell.innerHTML = "<div class='center' name='kin' onClick='selectCell(this)'>金</div>";
		}else if(now_koma.name === "ou"){
			toCell.innerHTML = "<div class='center' name='ou' onClick='selectCell(this)'>王</div>";
		//ここから成り金
		}else if(now_koma.name === "nariHohei"){
			toCell.innerHTML = "<div class='centerNari' name='nariHohei' onClick='selectCell(this)'>と</div>";
		}else if(now_koma.name === "nariGin"){
			toCell.innerHTML = "<div class='centerNari' name='nariGin' onClick='selectCell(this)'>金g</div>";
		}else if(now_koma.name === "nariKeima"){
			toCell.innerHTML = "<div class='centerNari' name='nariKeima' onClick='selectCell(this)'>金ke</div>";
		}else if(now_koma.name === "nariKyosya"){
			toCell.innerHTML = "<div class='centerNari' name='nariKyosya' onClick='selectCell(this)'>金ky</div>";
		}else if(now_koma.name === "nariHisya"){
			toCell.innerHTML = "<div class='centerNari' name='nariHisya' onClick='selectCell(this)'>飛n</div>";
		}else if(now_koma.name === "nariKaku"){
			toCell.innerHTML = "<div class='centerNari' name='nariKaku' onClick='selectCell(this)'>角n</div>";
		}
		
		fromCell.innerHTML = "";
		movePointClear();
	}
	//成る
	function changeKoma(toCell){
		var res = confirm("成りますか？");
		var koma = now_koma.name
		if( res == true ) {
			if(koma === "hohei"){
				toCell.innerHTML = "<div class='centerNari' name='nariHohei' onClick='selectCell(this)'>と</div>";
			}else if(koma === "gin"){
				toCell.innerHTML = "<div class='centerNari' name='nariGin' onClick='selectCell(this)'>金g</div>";
			}else if(koma === "kyosya"){
				toCell.innerHTML = "<div class='centerNari' name='nariKyosya' onClick='selectCell(this)'>金ky</div>";
			}else if(koma === "keima"){
				toCell.innerHTML = "<div class='centerNari' name='nariKeima' onClick='selectCell(this)'>金ke</div>";
			}else if(koma === "hisya"){
				toCell.innerHTML = "<div class='centerNari' name='nariHisya' onClick='selectCell(this)'>飛n</div>";
			}else if(koma === "kaku"){
				toCell.innerHTML = "<div class='centerNari' name='nariKaku' onClick='selectCell(this)'>角n</div>";
			}
		}else{
			if(koma === "hohei"){
				toCell.innerHTML = "<div class='center' name='hohei' onClick='selectCell(this)'>歩</div>";
			}else if(koma === "gin"){
				toCell.innerHTML = "<div class='center' name='gin' onClick='selectCell(this)'>銀</div>";
			}else if(koma === "kyosya"){
				toCell.innerHTML = "<div class='center' name='kyosya' onClick='selectCell(this)'>香</div>";
			}else if(koma === "keima"){
				toCell.innerHTML = "<div class='center' name='keima' onClick='selectCell(this)'>桂</div>";
			}else if(koma === "hisya"){
				toCell.innerHTML = "<div class='center' name='hisya' onClick='selectCell(this)'>飛</div>";
			}else if(koma === "kaku"){
				toCell.innerHTML = "<div class='center' name='kaku' onClick='selectCell(this)'>角</div>";
			}
		}
	}
	
	function selectPiece(){
		movePointClear();
		if (now_koma.name === "hohei"){
			moveHohei();
		}else if (now_koma.name === "hisya"){
			moveHisya();
		}else if (now_koma.name === "kaku"){
			moveKaku();
		}else if (now_koma.name === "kyosya"){
			moveKyosya();
		}else if (now_koma.name === "keima"){
			moveKeima();
		}else if (now_koma.name === "gin"){
			moveGin();
		}else if (now_koma.name === "kin" || now_koma.name === "nariHohei" 
		|| now_koma.name === "nariKyosya" || now_koma.name === "nariGin" || now_koma.name === "nariKeima"){
			moveKin();
		}else if (now_koma.name === "ou"){
			moveOu();
		}else if (now_koma.name === "nariHisya"){
			moveNariHisya();
		}else if (now_koma.name === "nariKaku"){
			moveNariKaku();
		}
	}
	
	function moveHohei(){
		if(now_koma.rowCnt !== 0){
			var cell = myTbl.rows[now_koma.rowCnt-1].cells[now_koma.cellCnt];
			if (cell.textContent === ""){//敵の駒があるときの条件変更
				cell.innerHTML = "<div class='Center' name='movePoint' onClick='selectCell(this)'>・</div>";
			}
		}
	}
	
	function moveHisya(){
		var rowCnt = now_koma.rowCnt;
		var cellCnt = now_koma.cellCnt;
		//上
		for(i=rowCnt-1; i >= 0; i--){
			var cell = myTbl.rows[i].cells[now_koma.cellCnt];
			if (cell.textContent === ""){//後でやること：敵の駒があるときの条件変更
				cell.innerHTML = "<div class='Center' name='movePoint' onClick='selectCell(this)'>・</div>";
			}else{
				break;
			}
		}
		//下
		for(i=rowCnt+1; i <= 8; i++){
			var cell = myTbl.rows[i].cells[now_koma.cellCnt];
			if (cell.textContent === ""){//後でやること：敵の駒があるときの条件変更
				cell.innerHTML = "<div class='Center' name='movePoint' onClick='selectCell(this)'>・</div>";
			}else{
				break;
			}
		}
		//右
		for(i=cellCnt+1; i <= 8; i++){
			var cell = myTbl.rows[now_koma.rowCnt].cells[i];
			if (cell.textContent === ""){//後でやること：敵の駒があるときの条件変更
				cell.innerHTML = "<div class='Center' name='movePoint' onClick='selectCell(this)'>・</div>";
			}else{
				break;
			}
		}
		//左
		for(i=cellCnt-1; i >= 0; i--){
			var cell = myTbl.rows[now_koma.rowCnt].cells[i];
			if (cell.textContent === ""){//後でやること：敵の駒があるときの条件変更
				cell.innerHTML = "<div class='Center' name='movePoint' onClick='selectCell(this)'>・</div>";
			}else{
				break;
			}
		}
	}
	
	function moveKaku(){
		var rowCnt = now_koma.rowCnt;
		var cellCnt = now_koma.cellCnt;
		//右上
		var j = cellCnt;
		for(i=rowCnt-1; i >= 0; i--){
			j = j+1;
			if(j>8){
				break;
			}
			var cell = myTbl.rows[i].cells[j];
			if (cell.textContent === ""){//後でやること：敵の駒があるときの条件変更
				cell.innerHTML = "<div class='Center' name='movePoint' onClick='selectCell(this)'>・</div>";
			}else{
				break;
			}			
		}
		//右下
		j = cellCnt;
		for(i=rowCnt+1; i <= 8; i++){
			j = j+1;
			if(j>8){
				break;
			}
			var cell = myTbl.rows[i].cells[j];
			if (cell.textContent === ""){//後でやること：敵の駒があるときの条件変更
				cell.innerHTML = "<div class='Center' name='movePoint' onClick='selectCell(this)'>・</div>";
			}else{
				break;
			}
			
		}
		//左上
		j = cellCnt;
		for(i=rowCnt-1; i >= 0; i--){
			j = j-1;
			if(j<0){
				break;
			}
			var cell = myTbl.rows[i].cells[j];
			if (cell.textContent === ""){//後でやること：敵の駒があるときの条件変更
				cell.innerHTML = "<div class='Center' name='movePoint' onClick='selectCell(this)'>・</div>";
			}else{
				break;
			}			
		}
		//左下
		j = cellCnt;
		for(i=rowCnt+1; i <= 8; i++){
			j = j-1;
			if(j<0){
				break;
			}
			var cell = myTbl.rows[i].cells[j];
			if (cell.textContent === ""){//後でやること：敵の駒があるときの条件変更
				cell.innerHTML = "<div class='Center' name='movePoint' onClick='selectCell(this)'>・</div>";
			}else{
				break;
			}
		}
	}
	
	function moveKyosya(){
		var rowCnt = now_koma.rowCnt;
		//上
		for(i=rowCnt-1; i >= 0; i--){
			var cell = myTbl.rows[i].cells[now_koma.cellCnt];
			if (cell.textContent === ""){//後でやること：敵の駒があるときの条件変更
				cell.innerHTML = "<div class='Center' name='movePoint' onClick='selectCell(this)'>・</div>";
			}else{
				break;
			}
		}
	}
	
	function moveKeima(){
		var rowCnt = now_koma.rowCnt;
		var cellCnt = now_koma.cellCnt;
		if(rowCnt-2 >= 0){
			if(cellCnt-1 >= 0){
				var cell = myTbl.rows[rowCnt-2].cells[cellCnt-1];
				if (cell.textContent === ""){//敵の駒があるときの条件変更
					cell.innerHTML = "<div class='Center' name='movePoint' onClick='selectCell(this)'>・</div>";
				}
			}
			if(cellCnt+1 <= 8){
				var cell = myTbl.rows[rowCnt-2].cells[cellCnt+1];
				if (cell.textContent === ""){//敵の駒があるときの条件変更
					cell.innerHTML = "<div class='Center' name='movePoint' onClick='selectCell(this)'>・</div>";
				}
			}
		}
	}
	
	function moveGin(){
		var rowCnt = now_koma.rowCnt;
		var cellCnt = now_koma.cellCnt;
		if(rowCnt-1 >= 0){
			var cell = myTbl.rows[rowCnt-1].cells[cellCnt];
			if (cell.textContent === ""){//敵の駒があるときの条件変更
				cell.innerHTML = "<div class='Center' name='movePoint' onClick='selectCell(this)'>・</div>";
			}
			if(cellCnt-1 >= 0){
				var cell = myTbl.rows[rowCnt-1].cells[cellCnt-1];
				if (cell.textContent === ""){//敵の駒があるときの条件変更
					cell.innerHTML = "<div class='Center' name='movePoint' onClick='selectCell(this)'>・</div>";
				}
			}
			if(cellCnt+1 <= 8){
				var cell = myTbl.rows[rowCnt-1].cells[cellCnt+1];
				if (cell.textContent === ""){//敵の駒があるときの条件変更
					cell.innerHTML = "<div class='Center' name='movePoint' onClick='selectCell(this)'>・</div>";
				}
			}
		}
		if(rowCnt+1 <= 8){
			if(cellCnt-1 >= 0){
				var cell = myTbl.rows[rowCnt+1].cells[cellCnt-1];
				if (cell.textContent === ""){//敵の駒があるときの条件変更
					cell.innerHTML = "<div class='Center' name='movePoint' onClick='selectCell(this)'>・</div>";
				}
			}
			if(cellCnt+1 <= 8){
				var cell = myTbl.rows[rowCnt+1].cells[cellCnt+1];
				if (cell.textContent === ""){//敵の駒があるときの条件変更
					cell.innerHTML = "<div class='Center' name='movePoint' onClick='selectCell(this)'>・</div>";
				}
			}
		}
	}
	
	function moveKin(){
		var rowCnt = now_koma.rowCnt;
		var cellCnt = now_koma.cellCnt;
		if(rowCnt-1 >= 0){
			var cell = myTbl.rows[rowCnt-1].cells[cellCnt];
			if (cell.textContent === ""){//敵の駒があるときの条件変更
				cell.innerHTML = "<div class='Center' name='movePoint' onClick='selectCell(this)'>・</div>";
			}
			if(cellCnt-1 >= 0){
				var cell = myTbl.rows[rowCnt-1].cells[cellCnt-1];
				if (cell.textContent === ""){//敵の駒があるときの条件変更
					cell.innerHTML = "<div class='Center' name='movePoint' onClick='selectCell(this)'>・</div>";
				}
			}
			if(cellCnt+1 <= 8){
				var cell = myTbl.rows[rowCnt-1].cells[cellCnt+1];
				if (cell.textContent === ""){//敵の駒があるときの条件変更
					cell.innerHTML = "<div class='Center' name='movePoint' onClick='selectCell(this)'>・</div>";
				}
			}
		}
		if(rowCnt+1 <= 8){
			var cell = myTbl.rows[rowCnt+1].cells[cellCnt];
			if (cell.textContent === ""){//敵の駒があるときの条件変更
				cell.innerHTML = "<div class='Center' name='movePoint' onClick='selectCell(this)'>・</div>";
			}
		}
		if(cellCnt-1 >= 0){
			var cell = myTbl.rows[rowCnt].cells[cellCnt-1];
			if (cell.textContent === ""){//敵の駒があるときの条件変更
				cell.innerHTML = "<div class='Center' name='movePoint' onClick='selectCell(this)'>・</div>";
			}
		}
		if(cellCnt+1 <= 8){
			var cell = myTbl.rows[rowCnt].cells[cellCnt+1];
			if (cell.textContent === ""){//敵の駒があるときの条件変更
				cell.innerHTML = "<div class='Center' name='movePoint' onClick='selectCell(this)'>・</div>";
			}
		}
	}
	
	function moveOu(){
		var rowCnt = now_koma.rowCnt;
		var cellCnt = now_koma.cellCnt;
		if(rowCnt-1 >= 0){
			var cell = myTbl.rows[rowCnt-1].cells[cellCnt];
			if (cell.textContent === ""){//敵の駒があるときの条件変更
				cell.innerHTML = "<div class='Center' name='movePoint' onClick='selectCell(this)'>・</div>";
			}
			if(cellCnt-1 >= 0){
				var cell = myTbl.rows[rowCnt-1].cells[cellCnt-1];
				if (cell.textContent === ""){//敵の駒があるときの条件変更
					cell.innerHTML = "<div class='Center' name='movePoint' onClick='selectCell(this)'>・</div>";
				}
			}
			if(cellCnt+1 <= 8){
				var cell = myTbl.rows[rowCnt-1].cells[cellCnt+1];
				if (cell.textContent === ""){//敵の駒があるときの条件変更
					cell.innerHTML = "<div class='Center' name='movePoint' onClick='selectCell(this)'>・</div>";
				}
			}
		}
		if(rowCnt+1 <= 8){
			var cell = myTbl.rows[rowCnt+1].cells[cellCnt];
			if (cell.textContent === ""){//敵の駒があるときの条件変更
				cell.innerHTML = "<div class='Center' name='movePoint' onClick='selectCell(this)'>・</div>";
			}
			if(cellCnt-1 >= 0){
				var cell = myTbl.rows[rowCnt+1].cells[cellCnt-1];
				if (cell.textContent === ""){//敵の駒があるときの条件変更
					cell.innerHTML = "<div class='Center' name='movePoint' onClick='selectCell(this)'>・</div>";
				}
			}
			if(cellCnt+1 <= 8){
				var cell = myTbl.rows[rowCnt+1].cells[cellCnt+1];
				if (cell.textContent === ""){//敵の駒があるときの条件変更
					cell.innerHTML = "<div class='Center' name='movePoint' onClick='selectCell(this)'>・</div>";
				}
			}
		}
		if(cellCnt-1 >= 0){
			var cell = myTbl.rows[rowCnt].cells[cellCnt-1];
			if (cell.textContent === ""){//敵の駒があるときの条件変更
				cell.innerHTML = "<div class='Center' name='movePoint' onClick='selectCell(this)'>・</div>";
			}
		}
		if(cellCnt+1 <= 8){
			var cell = myTbl.rows[rowCnt].cells[cellCnt+1];
			if (cell.textContent === ""){//敵の駒があるときの条件変更
				cell.innerHTML = "<div class='Center' name='movePoint' onClick='selectCell(this)'>・</div>";
			}
		}
	}
	
	function moveNariHisya(){
		var rowCnt = now_koma.rowCnt;
		var cellCnt = now_koma.cellCnt;
		//上
		for(i=rowCnt-1; i >= 0; i--){
			var cell = myTbl.rows[i].cells[now_koma.cellCnt];
			if (cell.textContent === ""){//後でやること：敵の駒があるときの条件変更
				cell.innerHTML = "<div class='Center' name='movePoint' onClick='selectCell(this)'>・</div>";
			}else{
				break;
			}
		}
		//下
		for(i=rowCnt+1; i <= 8; i++){
			var cell = myTbl.rows[i].cells[now_koma.cellCnt];
			if (cell.textContent === ""){//後でやること：敵の駒があるときの条件変更
				cell.innerHTML = "<div class='Center' name='movePoint' onClick='selectCell(this)'>・</div>";
			}else{
				break;
			}
		}
		//右
		for(i=cellCnt+1; i <= 8; i++){
			var cell = myTbl.rows[now_koma.rowCnt].cells[i];
			if (cell.textContent === ""){//後でやること：敵の駒があるときの条件変更
				cell.innerHTML = "<div class='Center' name='movePoint' onClick='selectCell(this)'>・</div>";
			}else{
				break;
			}
		}
		//左
		for(i=cellCnt-1; i >= 0; i--){
			var cell = myTbl.rows[now_koma.rowCnt].cells[i];
			if (cell.textContent === ""){//後でやること：敵の駒があるときの条件変更
				cell.innerHTML = "<div class='Center' name='movePoint' onClick='selectCell(this)'>・</div>";
			}else{
				break;
			}
		}
		if(rowCnt-1 >= 0){
			var cell = myTbl.rows[rowCnt-1].cells[cellCnt];
			if(cellCnt-1 >= 0){
				var cell = myTbl.rows[rowCnt-1].cells[cellCnt-1];
				if (cell.textContent === ""){//敵の駒があるときの条件変更
					cell.innerHTML = "<div class='Center' name='movePoint' onClick='selectCell(this)'>・</div>";
				}
			}
			if(cellCnt+1 <= 8){
				var cell = myTbl.rows[rowCnt-1].cells[cellCnt+1];
				if (cell.textContent === ""){//敵の駒があるときの条件変更
					cell.innerHTML = "<div class='Center' name='movePoint' onClick='selectCell(this)'>・</div>";
				}
			}
		}
		if(rowCnt+1 <= 8){
			var cell = myTbl.rows[rowCnt+1].cells[cellCnt];
			if(cellCnt-1 >= 0){
				var cell = myTbl.rows[rowCnt+1].cells[cellCnt-1];
				if (cell.textContent === ""){//敵の駒があるときの条件変更
					cell.innerHTML = "<div class='Center' name='movePoint' onClick='selectCell(this)'>・</div>";
				}
			}
			if(cellCnt+1 <= 8){
				var cell = myTbl.rows[rowCnt+1].cells[cellCnt+1];
				if (cell.textContent === ""){//敵の駒があるときの条件変更
					cell.innerHTML = "<div class='Center' name='movePoint' onClick='selectCell(this)'>・</div>";
				}
			}
		}
	}
	
	function moveNariKaku(){
		var rowCnt = now_koma.rowCnt;
		var cellCnt = now_koma.cellCnt;
		//右上
		var j = cellCnt;
		for(i=rowCnt-1; i >= 0; i--){
			j = j+1;
			if(j>8){
				break;
			}
			var cell = myTbl.rows[i].cells[j];
			if (cell.textContent === ""){//後でやること：敵の駒があるときの条件変更
				cell.innerHTML = "<div class='Center' name='movePoint' onClick='selectCell(this)'>・</div>";
			}else{
				break;
			}			
		}
		//右下
		j = cellCnt;
		for(i=rowCnt+1; i <= 8; i++){
			j = j+1;
			if(j>8){
				break;
			}
			var cell = myTbl.rows[i].cells[j];
			if (cell.textContent === ""){//後でやること：敵の駒があるときの条件変更
				cell.innerHTML = "<div class='Center' name='movePoint' onClick='selectCell(this)'>・</div>";
			}else{
				break;
			}
			
		}
		//左上
		j = cellCnt;
		for(i=rowCnt-1; i >= 0; i--){
			j = j-1;
			if(j<0){
				break;
			}
			var cell = myTbl.rows[i].cells[j];
			if (cell.textContent === ""){//後でやること：敵の駒があるときの条件変更
				cell.innerHTML = "<div class='Center' name='movePoint' onClick='selectCell(this)'>・</div>";
			}else{
				break;
			}			
		}
		//左下
		j = cellCnt;
		for(i=rowCnt+1; i <= 8; i++){
			j = j-1;
			if(j<0){
				break;
			}
			var cell = myTbl.rows[i].cells[j];
			if (cell.textContent === ""){//後でやること：敵の駒があるときの条件変更
				cell.innerHTML = "<div class='Center' name='movePoint' onClick='selectCell(this)'>・</div>";
			}else{
				break;
			}
		}
		if(rowCnt-1 >= 0){
			var cell = myTbl.rows[rowCnt-1].cells[cellCnt];
			if (cell.textContent === ""){//敵の駒があるときの条件変更
				cell.innerHTML = "<div class='Center' name='movePoint' onClick='selectCell(this)'>・</div>";
			}
		}
		if(rowCnt+1 <= 8){
			var cell = myTbl.rows[rowCnt+1].cells[cellCnt];
			if (cell.textContent === ""){//敵の駒があるときの条件変更
				cell.innerHTML = "<div class='Center' name='movePoint' onClick='selectCell(this)'>・</div>";
			}
		}
		if(cellCnt-1 >= 0){
			var cell = myTbl.rows[rowCnt].cells[cellCnt-1];
			if (cell.textContent === ""){//敵の駒があるときの条件変更
				cell.innerHTML = "<div class='Center' name='movePoint' onClick='selectCell(this)'>・</div>";
			}
		}
		if(cellCnt+1 <= 8){
			var cell = myTbl.rows[rowCnt].cells[cellCnt+1];
			if (cell.textContent === ""){//敵の駒があるときの条件変更
				cell.innerHTML = "<div class='Center' name='movePoint' onClick='selectCell(this)'>・</div>";
			}
		}
	}
	
	function movePointClear(){
		for (var i=0 ; i<=8 ; i++){
			for (var y=0 ; y<=8 ; y++){
			var cell = myTbl.rows[i].cells[y];
				if(cell.textContent === "・"){
					cell.innerHTML = "";
				}
			}
		}
	}