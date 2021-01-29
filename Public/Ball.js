class Ball {
	constructor(x, y, dx, dy, d) {
		this.x = x;
		this.y = y;
		this.dx = dx;
		this.dy = dy;
		this.w = d;
		this.h = d;
		
	}
		
	goal() {
		this.x = (canvas.width/2)-5;
		this.y = (canvas.height/2)-5;
		if (this.dx > 0) {
			this.dx = -2;
		}
		else {
			this.dx = 2;
		}
		if (this.dy > 0) {
			this.dy = 3;
		}
		else {
			this.dy = -3;
		} 
	}

	setX(x) {
		this.x = x;
	}
		
	getH() {
		return this.h;
	}

	getW() {
		return this.w;
	}
		
	getY() {
		return this.y;
	}
		
	getX() {
		return this.x;
	}

	hit(pY, pX, pH, pW) {
		var padTop = pY;
		var padBot = pY + pH;
		var padMid = (pH / 2) + pY;
		var ballC = (this.h / 2) + this.y;
		if (ballC <= padMid) {
			console.log("Hit Top Half");
			this.dy = -5 + ((ballC-padTop)*(5 - 0) / (padMid-padTop) + 0);
		}
		else if (ballC > padMid) {
			console.log("Hit Bottom Half");
			this.dy = ((ballC-padMid)*(5 - 0) / (padBot-padMid) + 0);
		}
		
		if (this.dx < 10 && this.dx > -10) {
			this.dx *= -1.2;
		}
		else {
			this.dx *= -1;
		}
		
	}
		
	update() {
		if (this.x <= 0-this.w) {
			this.goal();
		}
		if (this.x+this.w >= canvas.width+this.w) {
			this.goal();
		}
		if (this.y <= 0) {
			this.y = 0;
			this.dy *= -1;
		}
		if (this.y+this.h >= canvas.height) {
			this.y = canvas.height-this.h;
			this.dy *= -1;
		}

		this.x += this.dx;
		this.y += this.dy;
	}

	show() {
		ctx.beginPath();
		ctx.fillStyle = "black";
		ctx.fill();
		ctx.fillRect(this.x, this.y, this.w, this.h);
		ctx.closePath()
	}
}
