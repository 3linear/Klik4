/*
 * PerpetuumMobile SimpleTicker v2.0
 * http://www.perpetuum.hr/
 *
 * Copyright (c) 2011 Perpetuum Mobile
 *
 * Author:		Tomislav Mesic
 * Date:		2011-15-04 11:00
 * Revision:	0
 * 
 * HTML structure sample
 * ---------------------
 * .simpleticker-wrapper {
 * 		position: relative; 
 * 		overflow: hidden; 
 * 		height: 200px;
 * 		width: 200px;
 * }
 * 
 * <ul id="ticker">
 * 		<li><a href="#">Link content</li>
 * 		<li><a href="#">Link content</li>
 * 		<li><a href="#">Link content</li>
 * 		<li><a href="#">Link content</li>
 * </ul>
 * 
 * jQuery code sample
 * ------------------
 * $("#ticker").pmSimpleTicker();
 * 
 * or
 * 
 * $("#ticker").pmSimpleTicker({
 * 		slowdown: 2, //	1-fast to 10-slow
 * 		orientation: "vertical",
 * 		delay: 1000 // delay before each tick 
 * 		pause: true // enable or disable ticker pause on mouse over										  
 * });
 * 
 * HTML structure sample after plugin application
 * ----------------------------------------------
 * <div class="simpleticker-wrapper" style="height: 120px; width: 600px; overflow: hidden">
 * 		<ul id="ticker">
 * 			<li><a href="#">Link content</li>
 * 			<li><a href="#">Link content</li>
 * 			<li><a href="#">Link content</li>
 * 			<li><a href="#">Link content</li>
 * 		</ul>
 * </div>
*/

(function($){

	$.fn.pmSimpleTicker = function(options) {
	
		var opts = $.extend("", $.fn.pmSimpleTicker.defaults, options);
		
		return this.each(function(e){
			
			var $ticker = $(this);
			
			var o = $.meta ?  $.extend({}, opts, $this.data()) : opts;
			
			var tickerHeight = ($ticker.height() > $ticker[0].offsetHeight)? $ticker.height() : $ticker[0].offsetHeight;
			
			var tickerDuration = tickerHeight / 0.025 * o.slowdown;
			
			$ticker.wrap("<div class=\"simpleticker-wrapper\" style=\"overflow: hidden; width: " + $ticker.width() + "px; height: " + tickerHeight + "px\"></div>");
			
			function rotate() {
			
				var duration = (parseInt($ticker.css("marginTop")) < 0) ? tickerDuration / (tickerHeight / (tickerHeight + parseInt($ticker.css("marginTop")))) : tickerDuration;
				
				$ticker.delay(o.delay).animate({ marginTop: -tickerHeight }, duration, "linear", function() {
					$ticker.css("marginTop", 0);
				
					rotate();
				});
				
			};
			
			// Start ticker initialy
			if ((o.orientation == "vertical" && $ticker.parent().parent().height() < tickerHeight) || (o.orientation == "horizontal" && $ticker.parent().width() < tickersWidth)) {
				
				$ticker.children().clone().appendTo($ticker);
				
				if (o.pause) {
					$ticker.mouseenter(function() {
					  $(this).stop();
					});
					
					$ticker.mouseleave(function() {
					  rotate();
					});
				}
				
				//	start ticker for the first time
				rotate();
			};
			
		});
	
	};
	
	$.fn.pmSimpleTicker.defaults = {
		slowdown: 2.2,
		orientation: "vertical",
		delay: 0,
		pause: true
	};
	 
})(jQuery);