function openCity(evt, cityName) {
	var i, x, tablinks;
	x = document.getElementsByClassName("city");
	for (i = 0; i < x.length; i++) {
		x[i].style.display = "none";
	}
	tablinks = document.getElementsByClassName("tablink");
	for (i = 0; i < x.length; i++) {
		tablinks[i].className = tablinks[i].className.replace(" w3-border-red", "");
	}
	document.getElementById(cityName).style.display = "block";
	evt.currentTarget.firstElementChild.className += " w3-border-red";
	
	if(cityName === "Circular"){
		caesarDisk.canvasFocused = true;
		startDisk();
	}else{
		clearInterval(caesarDisk.interval);
		caesarDisk.canvasFocused = false;
	}		
}










class CaesarCipher{
	constructor(){
		this.plain_text 		 = "";
		this.cshift_Distance 	 = 0;
		this.plain_text_Index 	 =[];
		this.plain_text_Length 	 = 0;
		this.original_text 		 = "";
		this.shiftSelection	 	 = "";
	}	
	calculate_shift(){
		this.original_text 		 = document.getElementById("inputPlaintext1").value;
		this.shiftSelection	 	 = document.getElementById("cshiftOption1").value;
		if (this.original_text == "") {
			alert("Name must be filled out");
			return false;
		}else {
			//alert(this.original_text);
			this.plain_text=this.original_text.replace(/[^A-Za-z]/g, "").toUpperCase();

			
			document.getElementById("cleanPlaintext1").innerHTML="<p>Plaintext: "+this.plain_text+"</p>";

			this.plain_text_Length=this.plain_text.length;
			this.cshift_Distance = this.shiftSelection.charCodeAt(0)-65;

			var ct="";
			for(var i=0; i<this.plain_text_Length; i++){
				ct += String.fromCharCode((this.plain_text.charCodeAt(i)-65+this.cshift_Distance)%26 + 65);
			}
			
			document.getElementById("ciphertextResult1").innerHTML="<p>Ciphertext: "+ct+"</p>";
			document.getElementById("originalText1").innerHTML="<p>Original text: " + this.original_text+"</p>";
			document.getElementById("shiftDistance1").innerHTML="<p>Shift letter: " + this.shiftSelection+",  to the right "+this.cshift_Distance +" positions.</p>";			
		}
	}
	optionSelect(){  
		var i=65;
		var cshOp = document.getElementById("cshiftOption1");
		for(i=65; i<=90; i++){
			if(i==65){
				addChildNode(cshOp, "option", String.fromCharCode(i), {value: String.fromCharCode(i), selected:null});
			}
			addChildNode(cshOp,     "option", String.fromCharCode(i), {value: String.fromCharCode(i)               });
		}
	}
}
var myCipher =  new CaesarCipher();
myCipher.optionSelect();

function process_cipher(){
	myCipher.calculate_shift();
}

function addChildNode(parentNode, nodeName, nodeText, nodeAttr){
	//console.log("nodeattr.length" + nodeAttr.length);
	var newNode = document.createElement(nodeName); 
	//if(nodeAttr.length !=0){
		for (x in nodeAttr){
			if(x === null) break;
			var valueAttr	  = document.createAttribute(x);	
			if(nodeAttr[x] != null)
				valueAttr.value	  = nodeAttr[x];
			newNode.setAttributeNode(valueAttr);
		}
	//}	
	var textNode      = document.createTextNode(nodeText);		
	newNode.appendChild(textNode);
	parentNode.appendChild(newNode);
}











var diskFormStatus = false;
var myDisk1;
var myDisk2;
var lockClickSound = document.getElementById("turningMetalSound"); 
lockClickSound.loop = false;

function startDisk() {
	myDisk1 = new cipherDisk(100, "gray", "gray", 200, 150, 0);
	myDisk2 =  new cipherDisk(70, "gray", "gray", 200, 150, 0);	
	caesarDisk.start();
}

var caesarDisk = {
    canvas : document.getElementById("canvas1"),
	canvasFocused : true,
    start: function(){
		this.canvas.width = 500;
		this.canvas.height = 400;

		this.context = this.canvas.getContext("2d");
	//	document.body.insertBefore(this.canvas, document.body.childNodes[0]);
		this.interval = setInterval(updateDisk,400);
		updateDisk();
		this.canvas.addEventListener('touchmove', function (e) {
           	myDisk2.x = e.touches[0].screenX;
           	myDisk2.y = e.touches[0].screenY;
			e.preventDefault();
        })
		window.addEventListener('keydown', function (e) {
			if(!caesarDisk.canvasFocused) return;
			lockClickSound.play();
            myDisk2.key = e.keyCode;
			if (myDisk2.key == 37) {myDisk2.theta -= Math.PI/13; }
			if (myDisk2.key == 39) {myDisk2.theta += Math.PI/13; }
			if (myDisk2.key == 38) {myDisk2.theta -= Math.PI/13; }
			if (myDisk2.key == 40) {myDisk2.theta += Math.PI/13; }
			e.preventDefault();
        })
		/*
        window.addEventListener('keyup', function (e) {
			//alert("keyDown" + e.keyCode);
            myDisk2.key = false;
        })
		*/
		this.canvas.addEventListener('mousedown', function (e) {
			lockClickSound.play();
			myDisk2.key=true;
			e.preventDefault();
			//this.canvas.setAttribute('tabindex','0');
			//this.canvas.focus();
        })
        this.canvas.addEventListener('mouseup', function (e) {
			myDisk2.key=false;
			e.preventDefault();
        })
		this.canvas.addEventListener('mousemove', function (e) {
			if(myDisk2.key){
				if (e.pageX < myDisk2.x){
					myDisk2.theta -= Math.PI/13; 
				}else { 
					myDisk2.theta += Math.PI/13;
				}
				
			}
			e.preventDefault();
        })
		
        this.canvas.addEventListener('touchstart', function (e) {
			lockClickSound.play();
            myDisk2.key = true;
			e.preventDefault();
        })
        this.canvas.addEventListener('touchend', function (e) {
            myDisk2.key = false;
			e.preventDefault();
        })
		
		this.canvas.addEventListener('touchmove', function (e) {
			if(myDisk2.key){
				if (e.pageX < myDisk2.x){
					myDisk2.theta -= Math.PI/13; 
				}else { 
					myDisk2.theta += Math.PI/13;
				}
			}
			e.preventDefault();
        })
	},
    clear: function(){
	        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }	
}  

function cipherDisk(radius, arcColor, bgColor, x, y, theta, speed){
    this.radius  = radius;
    this.arcColor= arcColor;
    this.bgColor = bgColor;
	this.x 		 = x; 
	this.y		 = y;
	this.theta	 = theta;
	this.speed	 = speed;
	
	
    this.update   = function () {
		this.gradient = caesarDisk.context.createRadialGradient(0,0,   this.radius*0.65, 0,0,   this.radius *1.35);
		this.gradient.addColorStop(0, 'gold');
		this.gradient.addColorStop(0.5, 'gold');
		this.gradient.addColorStop(1, 'green');
		
		ctx = caesarDisk.context;
		ctx.save();
		ctx.translate(x, y);
		ctx.rotate(this.theta);
	
		ctx.beginPath();
		ctx.arc(0, 0, this.radius, 0, 2*Math.PI);
		ctx.fillStyle = this.arcColor;
		ctx.fill();

		ctx.strokeStyle = this.gradient;

		ctx.lineWidth = this.radius*0.4;
		ctx.stroke();

		ctx.font = radius*0.15 + "px arial";
		ctx.textBaseline="middle";
		ctx.textAlign="center";
		for(var num = 0; num < 26; num++){
			ctx.save();
     	       ctx.rotate(num * Math.PI / 13);
    	       ctx.translate(0, -radius);
    	       ctx.fillText(String.fromCharCode(65+num), 0, 0);
			ctx.restore();
		}	
		ctx.restore();
    }
}

function updateDisk(){

      caesarDisk.clear();

      myDisk1.update();
      myDisk2.update();	
}












class caesarTable{
	constructor(){
		this.plain_text_index = [];		
		this.plain_text 		 = "";
		this.cshift_Distance 	 = 0;
		this.plain_text_Index 	 =[];
		this.plain_text_Length 	 = 0;
		this.original_text 		 = "";
		this.shiftSelection	 	 = "";
	}	
	
	table_Representation() {     
		for(var i=0; i<this.plain_text_Length; i++){
			this.plain_text_Index[i]= this.plain_text.charCodeAt(i)-65; 
		}

		document.getElementById("alphabetList2").innerHTML = "";

		var badge_Size = "";
		if(this.plain_text_Length<=15){
			badge_Size ="w3-large";   
		}else if (this.plain_text_Length<=30){
			badge_Size = "w3-small";
		}else {
			badge_Size = "w3-tiny";
		}
		var alphabets2 = document.getElementById("alphabetList2");
		var ttt = "";
		
		for(var j=0; j<this.plain_text_Length; j++){   
			for(var i=0; i<26; i++){

				if (i === this.plain_text_Index[j]){
					ttt = {id	 : j+"plaintext"+i,
							class:"w3-badge w3-silver w3-green whu-font "+badge_Size};
							
				}else if (i == (this.plain_text_Index[j]+this.cshift_Distance)%26){
					ttt = {id	 : j+"plaintext"+i,
							class:"w3-badge w3-silver w3-blue  whu-font "+badge_Size};
						
				}else {
					ttt = {id	 : j+"plaintext"+i,
							class:"w3-badge w3-silver 		   whu-font "+badge_Size};
				}
				
				var newNode = document.createElement("td"); 					
				addChildNode(newNode, "span", String.fromCharCode(i+65), ttt);
				alphabets2.appendChild(newNode);		
			} 
			addChildNode(alphabets2, "br", "", {}); 	
		}
	}
	calculate_shift(){
		this.original_text 		 = document.getElementById("inputPlaintext2").value;
		this.shiftSelection	 	 = document.getElementById("cshiftOption2").value;
		if (this.original_text == "") {
			alert("Name must be filled out");
			return false;
		}else {
			
			this.plain_text=this.original_text.replace(/[^A-Za-z]/g, "").toUpperCase();

			
			document.getElementById("cleanPlaintext2").innerHTML="<p>Plaintext: "+this.plain_text+"</p>";

			this.plain_text_Length=this.plain_text.length;
			this.cshift_Distance = this.shiftSelection.charCodeAt(0)-65;
			
			var ct="";
			for(var i=0; i<this.plain_text_Length; i++){
				ct += String.fromCharCode((this.plain_text.charCodeAt(i)-65+this.cshift_Distance)%26 + 65);
			}
			
			document.getElementById("ciphertextResult2").innerHTML="<p>Ciphertext: "+ct+"</p>";
			document.getElementById("originalText2").innerHTML="<p>Original text: " + this.original_text+"</p>";
			document.getElementById("shiftDistance2").innerHTML="<p>Shift letter: " + this.shiftSelection+",  to the right "+this.cshift_Distance +" positions.</p>";			
		}
	}
	optionSelect(){  
		var i=65;
		var cshOp = document.getElementById("cshiftOption2");
		for(i=65; i<=90; i++){
			if(i==65){
				addChildNode(cshOp, "option", String.fromCharCode(i), {value: String.fromCharCode(i), selected:null});
			}
			addChildNode(cshOp,     "option", String.fromCharCode(i), {value: String.fromCharCode(i)               });
		}
	}
}
var myTable =  new caesarTable();
myTable.optionSelect();

function process_table(){
	myTable.calculate_shift();
	myTable.table_Representation();
}











class caesarDecipher {
	constructor(canvas, width, height){
		this.canvas = canvas,
		this.canvas.width = width;    // if use this.canvas.style.width = width; the actual size could be much smaller.
		this.canvas.height = height;
		this.context = this.canvas.getContext("2d");
		this.x = 0;
		this.y = 0;
		this.cursorX=0;
		this.cursorY=0;
		this.shift=0;
		this.shiftY = false;
		this.turnoff = 1;
		this.abcList =  new Array();
	
	    this.interval = setInterval(updateShift,500);

						
		document.getElementById("shiftLeft").addEventListener('mousedown', function (e) {
			if(myCShift.turnoff > 0 ) {
				myCShift.shift -= 1; 
				myCShift.turnoff =1;
			}
        }, false);
		document.getElementById("shiftRight").addEventListener('mousedown', function (e) {
			if(myCShift.turnoff < 2 ) {
				myCShift.shift += 1; 
				myCShift.turnoff =1;
			}
        }, false);
		
		this.canvas.addEventListener('mousedown', function (e) {
			myCShift.shiftY=true;
			myCShift.cursorY = e.pageY;
			e.preventDefault();
        }, false)
        this.canvas.addEventListener('mouseup', function (e) {
			myCShift.shiftY=false;
			e.preventDefault();
        }, false)
		this.canvas.addEventListener('mousemove', function (e) {
			if(myCShift.shiftY ){
				if (e.pageY < myCShift.cursorY ){
					myCShift.y -= 1; 
				}else { 
					if (myCShift.y < 0) myCShift.y += 1;
				}
				myCShift.cursorY = e.pageY;
			}
			e.preventDefault();
        },false)

	}
    clear(){
	    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }	
}	

class alphabetList{
	constructor(ct, x, y, blocksize, alphabet_Margin, charcode){
		this.x = x;
		this.y = y;
		this.blocksize = blocksize;
		this.charcode = charcode;
		this.length = this.charcode.length;	
		this.ctx = ct;
		this.alphabet_Margin = alphabet_Margin;
	}	
		
	update(){	
			//drawAlphabets(ct,0, 2*row*g, g, 0, "green", (row+1));
		this.ctx.save();
		this.ctx.translate(this.x, this.y);		
		var j=0;	
		for(var i=0; i<52; i++){
			this.ctx.save();
			this.ctx.beginPath();
			this.ctx.translate(i * this.blocksize, 0);

			this.ctx.moveTo(0, 0);
	 
			this.ctx.fillStyle = this.gradient;
			this.ctx.fillRect(0, 0, this.blocksize-this.alphabet_Margin,  this.blocksize); 
	 
			this.ctx.font = this.blocksize + "px Arial";
			
			this.ctx.fillStyle = "black";
	 
			this.ctx.textAlign = "center";
			this.ctx.fillText(String.fromCharCode(i%26+65), this.blocksize/3, this.blocksize); 
		
			if((j<this.charcode.length) && (i+65) === this.charcode[j]){
				this.ctx.beginPath();
				this.ctx.fillStyle = "blue";
				this.ctx.lineWidth = "2";

				this.ctx.rect(0, 0, this.blocksize - this.alphabet_Margin,  this.blocksize); 
				this.ctx.stroke();
				j++;	
			}	
			//console.log("Char = " + String.fromCharCode(i%26+65) +", "+ (i+1)*this.blocksize);
			this.ctx.restore();
		}
		this.ctx.restore();
	}
	setupGradient(sel) {
		this.gradient = this.ctx.createLinearGradient(0, 0, 0, 2* this.blocksize);
		if(sel == 0){
			this.gradient.addColorStop(0, "gold");
			this.gradient.addColorStop(0.5, 'gold');
			this.gradient.addColorStop(1, "green");
		} else if (sel == 1){
			this.gradient = "lightgreen";
		}		
	}	
}


var myCShift;
var plaintext = "ILOVEYOU";
var ciphertext = "ILOVEYOU";
var alphabetSize = 16;
//tableRepresent(false);


function tableRepresent(mode){
	if(!myCShift){
		var canvas  = document.getElementById("canvas");
		myCShift =  new caesarDecipher (canvas, canvas.width, canvas.height);
	}	
	var newcode;
	for(var i=0; i<ciphertext.length; i++){
		newcode = myCShift.shift + ciphertext.charCodeAt(i)
		//alert("width="+canvas.width);
		myCShift.abcList[i]=new alphabetList(myCShift.context, 0, i*alphabetSize*2, alphabetSize, 5, [newcode]);	
		myCShift.abcList[i].setupGradient(0);
	}
}


function updateShift(){
		plaintext = "";
		myCShift.clear();
		myCShift.context.save();
		myCShift.context.translate(0, myCShift.y);
		//console.log("ciphertext="+ciphertext);
		var newcode;
		for (var i=0; i<ciphertext.length; i++){
			newcode  = myCShift.shift + ciphertext.charCodeAt(i);
			myCShift.abcList[i].charcode=[newcode];
			myCShift.abcList[i].update();
			if(newcode <= 65) 		myCShift.turnoff = 0;
			if(newcode >= 116) 		myCShift.turnoff = 2;
			myCShift.abcList[i].setupGradient(1);
			plaintext += String.fromCharCode((newcode-65)%26+65);
			//console.log(", turnoff = " + myCShift.turnoff +", newcode = "+ newcode);
		}	
		myCShift.context.restore();
		//console.log(", plaintext = " + plaintext);
		document.getElementById("ciphertext").innerHTML = "<b>Ciphertext: </b> <br>" + ciphertext;
		document.getElementById("plaintext").innerHTML = "<b>Plaintext: </b><br> " + plaintext;
		//alert(plaintext);
}	


function processCiphertext() {
  var inputCiphertext = document.getElementById("deciphertext").value;

  if (inputCiphertext == "") {
    alert("Name must be filled out");
    return false;
  }else {

    ciphertext=inputCiphertext.replace(/[^A-Za-z]/g, "").toUpperCase();
	//alert("new ciphertext=" +ciphertext); 
	document.getElementById("ciphertext").innerHtml = "<b>Ciphertext: </b><br>"+ciphertext;
	tableRepresent();
	myCShift.shift = 0;
	myCShift.turnoff = 1;
	updateShift();
   }
}