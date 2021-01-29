class Paddle {
	constructor(x, y, dy, w, h) {
		this.x = x;
		this.y = y;
		this.dx = 0;
		this.dy = dy;
		this.w = w;
		this.h = h;
		
	}
	
	Up() {
		this.dy = -3;
	}

	Down() {
		this.dy = 3;
	}

	Stuck() {
		this.dy = 0;
	}

	setDY(dy) {
		this.dy = dy;
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
		
	hit() {
		
	}
		
	update() {
		if ((this.y + this.h <= canvas.height && this.dy >= 0) || 
			(this.y >= 0 && this.dy <= 0))
			this.y += this.dy;
	}

	show() {
		ctx.beginPath();
		ctx.fillStyle = "blue";
		ctx.fill();
		ctx.fillRect(this.x, this.y, this.w, this.h);
		ctx.closePath()
	}

}
