let ctx;
let cols=5;
let rows=5;
let p=[];
let shuffle;
let bingo;
let cellValue;
let totalValue=0;
function setup() {
	ctx=createCanvas(301, 301);
	ctx.parent('bingo-panel');
	var c=1;
		for(let i=0;i<rows;i++){
		p[i]=[];
       for(let j=0;j<cols;j++){
		  p[i][j]= new grid(i*60,j*60,c);
		  c++;
		  
	   }

	}
	shuffle=select('#shuffleButton','.shuffle');
	shuffle.mouseClicked(shuffling);
	bingo=select('#bingo-tracking','.bingo-panel');
}
function shuffling(){
	for(let i=0;i<rows;i++){
		for(let j=0;j<cols;j++){
			let k=floor(random(0,4));
			let l=floor(random(0,4));
			let temp=p[i][j].v;
			p[i][j].v=p[k][l].v;
			p[k][l].v=temp;
		}
	}
shuffle.style('display','none');	
}

function draw() {
background(255);
totalValue=0;
let d=0;
for(let i=0;i<rows;i++){
	for(let j=0;j<cols;j++){
		if(i==j){
			if(p[i][j].ticked==true){
				d++;
				
				//console.log(d);
			}
	    }
  
	}
	if(d==5){
		totalValue++;
		d=0;
	}
}
for(let i=0;i<rows;i++){
	let c=0;
	for(let j=0;j<cols;j++){
		p[i][j].show();
		p[i][j].cellHover();
		if(p[i][j].ticked==true){
			c++;
			//console.log("c register");
		}
		
	}
	   
        if(c==5){
			totalValue++;
			c=0;
			//console.log("cols and dia");
		}
	}	

for(let i=0;i<rows;i++){
	let r=0;
	for(let j=0;j<cols;j++){
		//p[j][i].show();
		p[j][i].cellHover();
		if(p[j][i].ticked==true){
			r++;
			//console.log("r registered");
		}
        if(r==5){
			totalValue++;
			r=0;
			//console.log("row");
		}
	}	
}
let dr=0;
for(let i=0;i<rows;i++){
	for(let j=0;j<cols;j++){
		//p[j][i].show();
		p[i][j].cellHover();
		  if(i+j==4){
			if(p[i][j].ticked==true){
				dr++;
				//console.log(dr);
			}
		}
        if(dr==5){
			totalValue+=1;
			//console.log("sec-dia");
			dr=0;
		}
	}	
}
//console.log("totalValue:",totalValue);
if(totalValue==1){
	//console.log("b");
	bingo.html('B');
}else if(totalValue==2){
	bingo.html('BI');
}else if(totalValue==3){
	bingo.html('BIN');
}else if(totalValue==4){
	bingo.html('BING');
}else if(totalValue==5){
	bingo.html('BINGO');
}
}
class grid{
	constructor(x,y,v){
		this.x=x;
		this.y=y;
		this.v=v;
		this.hover=false;
		this.ticked=false;
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
		if(mouseX>this.x&&mouseX<this.x+60&&mouseY>this.y&&mouseY<this.y+60)
			{
				this.hover=true;
				if(mouseIsPressed){
				this.ticked=true;
			
			}
			
		}else{
			this.hover=false;
		}
	  }
	if(this.ticked==true){
		line(this.x+3,this.y+3,this.x+60-3,this.y+60-3);
	}

	}
}