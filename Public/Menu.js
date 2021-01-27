class Menu {
	constructor() {
		this.local = [canvas.width/4, 0];
		this.online = [canvas.width/4, canvas.height/2];
		
		
		this.passcode = "";
		this.create = [canvas.width/4, 0];
		this.join = [canvas.width/4, canvas.height/2];
		
		this.insertRoomName = [];
		this.playerName = "";
		this.connect = [];
		
		this.waitingText = "Waiting for player 2 to connect";
		
		this.menuMode = 0;
		
		
	}

	getMode() {
		return this.menuMode;
	}

	setMode(mode) {
		this.menuMode = mode;
	}
	
	
	
	show() {
		if (this.menuMode == 0) { //Main Menu
			ctx.beginPath();
			ctx.lineWidth = "5";
			ctx.strokeStyle = "black";
			ctx.fillStyle = "gray";
			
			ctx.fillRect(this.local[0], this.local[1], canvas.width-canvas.width/2, canvas.height/2);
			//ctx.fillRect(this.online[0], this.online[1], canvas.width-canvas.width/2, canvas.height/2);
			ctx.fill();
			ctx.closePath();
		}
		else if (this.menuMode == 1) { //Join Menu
			ctx.beginPath();
			ctx.fillStyle = "gray";
			ctx.strokeStyle = "black";
			ctx.stroke();
			ctx.fill();
			ctx.fillRect(this.local[0], this.local[1], canvas.width, canvas.height/3);
			ctx.fillRect(this.online[0], this.online[1], canvas.width, canvas.height/3);
			ctx.closePath();
		}
		else if (this.menuMode == 2) { //Create Menu
			ctx.beginPath();
			ctx.fillStyle = "gray";
			ctx.strokeStyle = "black";
			ctx.stroke();
			ctx.fill();
			ctx.fillRect(this.local[0], this.local[1], canvas.width, canvas.height/3);
			ctx.fillRect(this.online[0], this.online[1], canvas.width, canvas.height/3);
			ctx.closePath();
		}
		else if (this.menuMode == 3) { //Waiting Room
			ctx.beginPath();
			ctx.fillStyle = "gray";
			ctx.strokeStyle = "black";
			ctx.stroke();
			ctx.fill();
			ctx.fillRect(this.local[0], this.local[1], canvas.width, canvas.height/3);
			ctx.fillRect(this.online[0], this.online[1], canvas.width, canvas.height/3);
			ctx.closePath();
		}
		
	}
	
}