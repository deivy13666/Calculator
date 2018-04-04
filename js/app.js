var Calculadora = {
	pantalla: document.getElementById("display"),
	valorPantalla: "0",
	operaciones: "",
	valor1: 0,
	valor2: 0,
	valor3: 0,
	resultado: 0,
	enter: false,

	init: (function(){
		this.eventosBotones(".tecla");
		this.eventosFuncion();
	}),

	eventosBotones: function(selector){
		var x = document.querySelectorAll(selector);
		for (var i=0; i<x.length; i++){
			x[i].onmouseover= this.achicarTecla;
			x[i].onmouseleave= this.regresaTecla;
		};
	},

	achicarTecla: function(event){
		Calculadora.dismBoton(event.target);
	},

	regresaTecla: function(event){
		Calculadora.aumentaBoton(event.target);
	},

	dismBoton: function(elemento){
		var x = elemento.id;
		if (x=="1" || x=="2" || x=="3" || x=="0" || x=="igual" || x=="punto" ) {
			elemento.style.width = "28%";
			elemento.style.height = "62px";
		} else if(x=="mas") {
			elemento.style.width = "88%";
			elemento.style.height = "98%";
		} else {
		elemento.style.width = "21%";
		elemento.style.height = "62px";
		}
	},
	
	aumentaBoton: function(elemento){
		var x = elemento.id;
		if (x=="1" || x=="2" || x=="3" || x=="0" || x=="igual" || x=="punto" ) {
			elemento.style.width = "29%";
			elemento.style.height = "62.91px";
		} else if(x=="mas") {
			elemento.style.width = "90%";
			elemento.style.height = "100%";
		} else {
		elemento.style.width = "22%";
		elemento.style.height = "62.91px";
		}
	},

	eventosFuncion: function(){
		document.getElementById("0").addEventListener("click", function() {Calculadora.ingresaNumero("0");});
		document.getElementById("1").addEventListener("click", function() {Calculadora.ingresaNumero("1");});
		document.getElementById("2").addEventListener("click", function() {Calculadora.ingresaNumero("2");});
		document.getElementById("3").addEventListener("click", function() {Calculadora.ingresaNumero("3");});
		document.getElementById("4").addEventListener("click", function() {Calculadora.ingresaNumero("4");});
		document.getElementById("5").addEventListener("click", function() {Calculadora.ingresaNumero("5");});
		document.getElementById("6").addEventListener("click", function() {Calculadora.ingresaNumero("6");});
		document.getElementById("7").addEventListener("click", function() {Calculadora.ingresaNumero("7");});
		document.getElementById("8").addEventListener("click", function() {Calculadora.ingresaNumero("8");});
		document.getElementById("9").addEventListener("click", function() {Calculadora.ingresaNumero("9");});
		document.getElementById("on").addEventListener("click", function() {Calculadora.borrarPantalla();});
		document.getElementById("sign").addEventListener("click", function() {Calculadora.cambiarSigno();});
		document.getElementById("punto").addEventListener("click", function() {Calculadora.ingresaDecimal();});
		document.getElementById("igual").addEventListener("click", function() {Calculadora.verResultado();});
		document.getElementById("raiz").addEventListener("click", function() {Calculadora.ingresaOperacion("raiz");});
		document.getElementById("mas").addEventListener("click", function() {Calculadora.ingresaOperacion("+");});
		document.getElementById("menos").addEventListener("click", function() {Calculadora.ingresaOperacion("-");});
		document.getElementById("por").addEventListener("click", function() {Calculadora.ingresaOperacion("*");});
		document.getElementById("dividido").addEventListener("click", function() {Calculadora.ingresaOperacion("/");});
	},

	borrarPantalla: function(){ 

	    this.valorPantalla = "0";
		this.operacion = "";
		this.valor1 = 0;
		this.valor2 = 0;
		this.valor3 = 0;
		this.resultado = 0;
		this.Operación = "";
		this.enter = false;
		this.updatePantalla();
	},

	cambiarSigno: function(){
		if (this.valorPantalla !="0") {
			var aux;
			if (this.valorPantalla.charAt(0)=="-") {
				aux = this.valorPantalla.slice(1);
			}	else {
				aux = "-" + this.valorPantalla;
			}
		this.valorPantalla = "";
		this.valorPantalla = aux;
		this.updatePantalla();
		}
	},

	ingresaDecimal: function(){
		if (this.valorPantalla.indexOf(".")== -1) {
			if (this.valorPantalla == ""){
				this.valorPantalla = this.valorPantalla + "0.";
			} else {
				this.valorPantalla = this.valorPantalla + ".";
			}
			this.updatePantalla();
		}
	},
	
	ingresaNumero: function(valor){
		if (this.valorPantalla.length < 8) {
		
			if (this.valorPantalla=="0") {
				this.valorPantalla = "";
				this.valorPantalla = this.valorPantalla + valor;
			} else {
				this.valorPantalla = this.valorPantalla + valor;
			}
		this.updatePantalla();
		}
	},
	
	ingresaOperacion: function(oper){
		this.valor1 = parseFloat(this.valorPantalla);
		this.valorPantalla = "";
		this.operacion = oper;
		this.enter = false;
		this.updatePantalla();
	},
	
	verResultado: function(){ 

		if(!this.enter){ 
			this.valor2 = parseFloat(this.valorPantalla);
			this.valor3 = this.valor2;
		
			this.realizarOperacion(this.valor1, this.valor2, this.operacion);
		
		} else {
			this.realizarOperacion(this.valor1, this.valor3, this.operacion);
		}
	
		this.primerValor = this.resultado;
	 	this.valorPantalla = "";
	
		if (this.resultado.toString().length < 9){
			this.valorPantalla = this.resultado.toString();
		} else {
			this.valorPantalla = this.resultado.toString().slice(0,8) + "...";
		}
		
		this.enter = true;		
		this.updatePantalla();
	
	},
	
	realizarOperacion: function(valor1, valor2, operacion){
		switch(operacion){
			case "+": 
				this.resultado = eval(valor1 + valor2);
			break;
			case "-": 
				this.resultado = eval(valor1 - valor2);
			break;
			case "*": 
				this.resultado = eval(valor1 * valor2);
			break;
			case "/": 
				this.resultado = eval(valor1 / valor2);
			break;
			case "raiz":
				this.resultado = eval(Math.sqrt(valor1));
		}
	},
	
	updatePantalla: function(){
		this.pantalla.innerHTML = this.valorPantalla;
	}
	
};

Calculadora.init();

