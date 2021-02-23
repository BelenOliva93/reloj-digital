window.onload = function() {
	setInterval(getTime, 1000);
	setInterval(newTime, 1000);
	visor=document.getElementById("reloj");
	document.cron.empieza.onclick = empezar; 
	document.cron.para.onclick = parar;
	document.cron.continua.onclick = continuar;
	document.cron.reinicia.onclick = reiniciar;
	const cvs = document.querySelector('#canvas');
	const ctx = cvs.getContext('2d');
	ctx.lineWidth = 16; //change here circles line-width
	ctx.textAlign = 'center';
	ctx.textBaseline = 'middle';
	ctx.font = '30px sans-serif'; //you can put the font outside canvas if you prefer
	ctx.fillStyle = 'gray';

	function getTime(){
		let date = new Date();
		let h    = date.getHours();
		let s  = date.getSeconds();
		let m  = date.getMinutes();		
	
		// Calculate percentage to be drawn
		var hp = 100 / 12 * (h % 12);
		var mp = 100 / 60 * m;
		var sp = 100 / 60 * s;
		
		// Ensure double digits
		let dateString = ( h < 10 ? '0' : '' ) + h + ' : ' + ( m < 10 ? '0' : '' ) + m + ' : ' + ( s < 10 ? '0' : '' ) + s;
	
		ctx.clearRect(0, 0, 400, 400);
		ctx.fillText(dateString, 175, 175);
		draw(95, hp, '#8ac4d0'); //change here circles radius y color
		draw(115, mp, '#f4d160');
		draw(135, sp, '#28527a');			
	}
	
	/**
	 * Draw circles
	*/
	var draw = (function () {
		var start = 1.5 * Math.PI; // Start circle from top
		var end = (2 * Math.PI) / 100; // One percent of circle
	
		/**
		 * Draw percentage of a circle
		 *
		 * @param {number} r Radius
		 * @param {number} p Percentage of circle
		 * @param {string} c Stroke color
		 * @return void
		 */
		return function (r, p, c) {
			p = p || 100; // When time is '00' we show full circle
			ctx.strokeStyle = c;
			ctx.beginPath();
			ctx.arc(175, 175, r, start, p * end + start, false);
			ctx.stroke();
		};
	}());

	function newTime(){
  
		let date = new Date();
	
		let hours    = date.getHours();
		let seconds  = date.getSeconds();
		let minutes  = date.getMinutes();
		
		let dateString = ( hours < 10 ? '0' : '' ) + hours + ' : ' + ( minutes < 10 ? '0' : '' ) + minutes + ' : ' + ( seconds < 10 ? '0' : '' ) + seconds;
	
		document.querySelector('#watch').innerHTML = dateString;			
	
	}

	var marcha=0; 
	var cro=0;
	function empezar() {
		if (marcha==0) { //solo si el cronómetro esta parado
		   emp=new Date() //fecha actual
		   elcrono=setInterval(tiempo,10); //función del temporizador.
		   marcha=1 //indicamos que se ha puesto en marcha.
		   }
		}
	function tiempo() { //función del temporizador
         actual=new Date() //fecha en el instante
         cro=actual-emp //tiempo transcurrido en milisegundos
         cr=new Date() //fecha donde guardamos el tiempo transcurrido
         cr.setTime(cro) 
         cs=cr.getMilliseconds() //milisegundos del cronómetro
         cs=cs/10; //paso a centésimas de segundo.
         cs=Math.round(cs)
         sg=cr.getSeconds(); //segundos del cronómetro
         mn=cr.getMinutes(); //minutos del cronómetro
         ho=cr.getHours()-1; //horas del cronómetro
         if (cs<10) {cs="0"+cs;}  //poner siempre 2 cifras en los números
         if (sg<10) {sg="0"+sg;} 
         if (mn<10) {mn="0"+mn;} 
         visor.innerHTML=ho+" : "+mn+" : "+sg+" : "+cs; //pasar a pantalla.
         }

	//parar el cronómetro
	function parar() { 
		if (marcha==1) { //sólo si está en funcionamiento ...
		clearInterval(elcrono); //parar el crono
		marcha=0; //indicar que está parado.
		}		
		}

	//Continuar una cuenta empezada y parada.
	function continuar() {
		if (marcha==0) { //sólo si el crono está parado
		emp2=new Date() //fecha actual
		emp2=emp2.getTime() //pasar a tiempo Unix
		emp3=emp2-cro //restar tiempo anterior
		emp=new Date() //nueva fecha inicial para pasar al temporizador 
		emp.setTime(emp3) //datos para nueva fecha inicial.
		elcrono=setInterval(tiempo,10); //activar temporizador
		marcha=1;
		}		
		}

		//Volver al estado inicial
	function reiniciar() {
		if (marcha==1) { //si el cronómetro está en marcha:
		clearInterval(elcrono); //parar el crono
		marcha=0;	//indicar que está parado
		}
		cro=0; //tiempo transcurrido a cero
		visor.innerHTML = "0 : 00 : 00 : 00"; //visor a cero
		}
};







