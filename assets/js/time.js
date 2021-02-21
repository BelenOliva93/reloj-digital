window.onload = function() {
	setInterval(getTime, 1000);
	setInterval(newTime, 1000);
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
};

function newTime(){
  
	let date = new Date();

	let hours    = date.getHours();
	let seconds  = date.getSeconds();
	let minutes  = date.getMinutes();
	
	let dateString = ( hours < 10 ? '0' : '' ) + hours + ' : ' + ( minutes < 10 ? '0' : '' ) + minutes + ' : ' + ( seconds < 10 ? '0' : '' ) + seconds;

	document.querySelector('#watch').innerHTML = dateString;			

}





