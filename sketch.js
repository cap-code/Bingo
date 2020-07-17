let ctx;
let cols=5;
let rows=5;
let p=[];
let cellValue;
function setup() {
	ctx=createCanvas(301, 301);
	ctx.parent('bingo-panel');
		for(let i=0;i<rows;i++){
		p[i]=[];
       for(let j=0;j<cols;j++){
		  p[i][j]= new grid(i*60,j*60,0);
		  
	   }

	}
}

function draw() {
background(255);
for(let i=0;i<rows;i++){
	for(let j=0;j<cols;j++){
		p[i][j].show();
		p[i][j].cellHover();

	}
}

//console.log(cellValue);

}
class grid{
	constructor(x,y,v){
		this.x=x;
		this.y=y;
		this.v=v;
		this.hover=false;
	}
	show(){
		if(this.hover==false){
			fill(255);

		}else{
			fill(0,255,0,50);
		}
		rect(this.x,this.y,60,60,10);
		fill(0);
		textAlign(CENTER,CENTER);
		textSize(23);
		text(this.v,this.x+30,this.y+30);
	}
	cellHover(){
		if(mouseIsPressed){
		if(mouseX>this.x&&mouseX<this.x+40&&mouseY>this.y&&mouseY<this.y+40)
			{
				this.hover=true;
			
		}else{
			this.hover=false;
		}
	  }
	
	}
}