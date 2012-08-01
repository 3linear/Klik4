/*
 * PerpetuumMobile Ticker v2.0
 * http://www.perpetuum.hr/
 *
 * Copyright (c) 2011 Perpetuum Mobile
 *
 * Author:		Tomislav Mesic
 * Date:		2011-26-04 11:00
 * Revision:	2
 * 
 * HTML structure sample
 * ---------------------
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
 * $("#ticker").pmTicker();
 * 
 * or
 * 
 * $("#ticker").pmTicker({
 *		orientation: "vertical",
 *		height: 200,
 *		width: 200,
 *		speed: 1.5,
 * 		delay: 1000,
 * 		pause: true									  
 * });
 * 
 * HTML structure sample after plugin application
 * ----------------------------------------------
 * <div class="pm-ticker-wrapper" style="overflow: hidden; height: 200px;">
 * 		<ul id="ticker">
 * 			...
 * 		</ul>
 * </div>
*/

(function($){

	$.fn.pmTicker = function(options) {
	
		var opts = $.extend("", $.fn.pmTicker.defaults, options);
		
		return this.each(function(e){
			
			var $ticker = $(this);
			
			var o = $.meta ?  $.extend({}, opts, $this.data()) : opts;
					
			var tickerItemsWidth = 0,
				tickerItemsHeight = 0,
				tickerWidth = $ticker.outerWidth() * $ticker.children().length,
				tickerHeight = $ticker.outerHeight(),
				tickerWrapper = (o.orientation == "vertical") ? "<div class=\"pm-ticker-wrapper\" style=\"overflow: hidden; height: " + o.height + "px\"></div>" : "<div class=\"pm-ticker-wrapper\" style=\"overflow: hidden; width: " + o.width + "px\"></div>";
	
			$ticker
				.wrap(tickerWrapper)
				.data({
					width: tickerWidth,
					height: tickerHeight,
					items : $ticker.children().length,
					duration: (o.orientation == "vertical") ? (tickerHeight / 0.025 * o.speed) : (tickerWidth / 0.04 * o.speed)
				});
			
			if (o.delay > 0) {
				$ticker.children().each(function(i, index){
					var $tickerChild = $(this),
						tickerChildHeight = ($tickerChild.height() > $tickerChild[0].offsetHeight) ? $tickerChild.height() : $tickerChild[0].offsetHeight,
						tickerChildWidth = $tickerChild.outerWidth(),
						tickerChildDuration = (o.orientation == "vertical") ? (tickerChildHeight / 0.025 * o.speed) : (tickerChildWidth / 0.04 * o.speed);
					
					$tickerChild.data({
						height : tickerChildHeight,
						width : tickerChildWidth,
						duration : tickerChildDuration
					});	
				});
			}
			
			function rotateTickerVertical() {
				var tickerMarginTop = parseInt($ticker.css("marginTop")),
					duration = (tickerMarginTop < 0) ? $ticker.data().duration / (tickerHeight / (tickerHeight + parseInt($ticker.css("marginTop")))) : $ticker.data().duration,
					delay = (tickerMarginTop < 0) ? 0 : o.delay;
				
				$ticker.delay(delay).animate({ marginTop: -tickerHeight }, duration, "linear", function() {
					$ticker.css("marginTop", 0);
				
					rotateTickerVertical();
				});
			};
			
			function rotateTickerHorizontal() {
				var tickerMarginLeft = parseInt($ticker.css("marginLeft")),
					duration = (tickerMarginLeft < 0) ? $ticker.data().duration / ($ticker.data().width / ($ticker.data().width + parseInt($ticker.css("marginLeft")))) : $ticker.data().duration,
					delay = (tickerMarginLeft < 0) ? 0 : o.delay;
				
				$ticker.delay(delay).animate({ marginLeft: -$ticker.data().width }, duration, "linear", function() {
					$ticker.css("marginLeft", 0);
				
					rotateTickerHorizontal();
				});
			};
			
			function rotateTickerItemVertical() {
				var $tickerChild = $ticker.children().first(),
					tickerChildMarginTop = parseInt($tickerChild.css("marginTop")),
					tickerChildDuration = (tickerChildMarginTop < 0) ? $tickerChild.data().duration / ($tickerChild.data().height / ($tickerChild.data().height + parseInt($tickerChild.css("marginTop")))) : $tickerChild.data().duration;
					tickerChildDelay = (tickerChildMarginTop < 0) ? 0 : o.delay;
					
				$tickerChild.delay(tickerChildDelay).animate({ marginTop: -$tickerChild.data().height }, tickerChildDuration, "linear", function() {
					$tickerChild.appendTo($ticker).css("marginTop", 0);
					
					rotateTickerItemVertical();
				});
			};
			
			function rotateTickerItemHorizontal() {
				var $tickerChild = $ticker.children().first(),
					tickerChildMarginLeft = parseInt($tickerChild.css("marginLeft")),
					tickerChildDuration = (tickerChildMarginLeft < 0) ? $tickerChild.data().duration / ($tickerChild.data().width / ($tickerChild.data().width + parseInt($tickerChild.css("marginLeft")))) : $tickerChild.data().duration;
					tickerChildDelay = (tickerChildMarginLeft < 0) ? 0 : o.delay;
					
				$tickerChild.delay(tickerChildDelay).animate({ marginLeft: -$tickerChild.data().width }, tickerChildDuration, "linear", function() {
					$tickerChild.appendTo($ticker).css("marginLeft", 0);
					
					rotateTickerItemHorizontal();
				});
			};
			
			if ((o.orientation == "vertical" && o.height < tickerHeight) || (o.orientation == "horizontal" && o.width < tickerWidth)) {
				
				if (o.pause) {
					$ticker.hover(
						function() {  
						  if (o.delay > 0) {
								$ticker.children().stop();
							} else {
								$ticker.stop();
							}
						},
						function() {
							if (o.delay > 0) {
								(o.orientation == "vertical") ? rotateTickerItemVertical() : rotateTickerItemHorizontal();
							} else {
								(o.orientation == "vertical") ? rotateTickerVertical() : rotateTickerHorizontal();	
							}
						}
					);
					/*
					$ticker.mouseenter(function() {  
					  if (o.delay > 0) {
						  	console.log("ticker item - stop");
							$ticker.children().stop();
						} else {
							console.log("ticker - stop");
							$ticker.stop();
						}
					});
					
					$ticker.mouseleave(function() {
						if (o.delay > 0) {
							(o.orientation == "vertical") ? rotateTickerItemVertical() : rotateTickerItemHorizontal();
						} else {
							(o.orientation == "vertical") ? rotateTickerVertical() : rotateTickerHorizontal();	
						}
					});
					*/
				}
				
				//	This is because of ticker item calculating width problem
				if (o.orientation == "horizontal") {
					$ticker.width(tickerWidth*3);
				}
				
				if (o.delay > 0) {
					if (o.orientation == "vertical") { 
						rotateTickerItemVertical();
					} 
					else {
						$ticker.children().clone(true).appendTo($ticker);
						
						$ticker.children().each(function(i){
							$(this).data().width = $(this).outerWidth();
						})
							
						rotateTickerItemHorizontal();
					}
				} else {
					$ticker.children().clone(true).appendTo($ticker);
					
					if (o.orientation == "vertical") {
						rotateTickerVertical()
					}
					else {
						tickerWidth = 0;
						
						$ticker.children().each(function(i){
							tickerWidth = tickerWidth + $(this).outerWidth();
						})
						
						$ticker.width(tickerWidth);
						$ticker.data().width = tickerWidth / 2;
						
						rotateTickerHorizontal();
					}
				}
				
			};
			
		});
	
	};
	
	$.fn.pmTicker.defaults = {
		orientation: "vertical",
		height: 200,
		width: 200,
		speed: 1.5, // 1 fast to 10 slow
		delay: 1000, // delay in miliseconds before each tick per list item
		pause: true // enable or disable ticker pause on mouse over	
	};
	 
})(jQuery);