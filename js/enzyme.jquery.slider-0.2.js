/*
 * jQuery eSlider v0.2
 * 
 * Copyright (c) 2010 Tomislav Mesic (http://www.3linear.net)
 *
 * Version: 1.2.1 (04/11/2010)
 * Requires: jQuery v1.3+
 *
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 * HTML structure sample
 * ---------------------
 *	<div class="slider-container">
 *		<div>Slide 1</div>
 *		<div>Slide 2</div>
 *		<div>Slide 3</div>
 *	</div>
 *
 *	or
 *
 *	<ul class="slider-container">
 *		<li>Slide 1</li>
 *		<li>Slide 2</li>
 *		<li>Slide 3</li>
 *	</ul>
 * 
 * jQuery code sample
 * ------------------
 *	$("div.slider-container").eSlider();
 *
 *	or
 *
 *	$("div.slider-container").eSlider({
 *		pager: {
 *			enable: true
 *		},	
 *		switcher: {
 *	 		enable: true
 *	 	},
 *		delay: 2000,
 *		rotate: false,
 *		active: 0
 *	});
 */

(function($, window, document, undefined){

$.fn.eSlider = function(options) {

	var opts = $.extend("", $.fn.eSlider.defaults, options);
	
	var args = (arguments.length > 0) ? arguments[0] : null;
	
	return this.each(function(e){
							  
		var $slider = $(this);
		
		var o = $.meta ?  $.extend({}, opts, $this.data()) : opts;

		var $preloader = $("<span>", {
			"class": "slider-preloader",
			html: o.preloader.title
		});
		
		var sliderHeight = $slider.children().first().height();
		var sliderWidth = 0;
		
		$slider.children().each(function(i){
			$slide = $(this);
		
			if (o.efect == "slide") {
				if (o.switcher.orientation == "horizontal") {
					$slide.css({
						float: "left",
						width: $slider.width()
					});
				};
			}
			else {
				$slide.css({
					float: "left",
					position: "absolute",
					opacity: 0.0,
					"z-index": 0
				});	
				
				if (i == o.active) {
					$slide.css({
						opacity: 1.0, 
						"z-index": 1
					});
					
					$slider.data({
						currentSlide: $slide			 
					});
				};
			};
			
			sliderHeight = ($slide.height() > sliderHeight) ? $slide.height() : sliderHeight;
			sliderWidth += $slider.width();
			
			if (o.auto && $slider.children().length > 1 && o.pause) {
				$slide.hover(
					function(){
						clearTimeout(swapslides);
					}, 
					function(){
						autoSlide($slider);
					}
				);
			}
		});
		
		var $sliderWrapper = $("<div>", {
			"class": "slider-wrapper",
			css: {
				overflow: "hidden",
				position: "relative",
				'z-index': ($.browser.msie && $.browser.version < 8) ? "-1" : ""
			}
		});
		
		if (o.efect == "slide") {
			$sliderWrapper.css((o.switcher.orientation == "horizontal") ? {width: $slider.width()} : {height: $slider.height()});
		}
		
		$slider.wrap($sliderWrapper);
		
		if (o.preloader.enable) {
			$preloader.prependTo($slider.parent()).hide();		
		}
		
		if (o.efect == "slide") {
			if (o.switcher.orientation == "horizontal") {
				$slider.width(sliderWidth);
			}
		}
		
		function doSlide(slide, direction) {	
			$slider.data({
				currentSlide: slide			 
			});
			
			if (o.switcher.orientation == "horizontal") {
				if (direction == "left") {
					slide.animate({ marginLeft: -$slider.width() }, o.speed, function() {
						//	move current item to the bottom
						slide.appendTo(slide.parent()).css("marginLeft", 0);
						$preloader.hide();	
					});
				} else {
					slide = $slider.children().last();
					
					slide
						.prependTo($slider)
						.css("marginLeft", -$slider.width())
						.animate({ marginLeft: 0 }, o.speed, function(){
							$preloader.hide();											  
						});
				};
			};
			
		};
		
		function doFade(slide) {			
			$slider.data().currentSlide
				.animate(
					{opacity: 0.0}, 
					o.speed
				)
				.css("z-index", 0);
				
			slide
				.animate(
					{opacity: 1.0}, 
					o.speed
				)
				.css("z-index", 1);
		
			$slider.data({
				currentSlide: slide			 
			});
		
			$slider.parent().find(".slider-pager li").removeClass("selected").eq(slide.index()).addClass("selected");
		};
		
		function autoSlide(slider) {
			swapslides = setInterval(function() {
				var $currentSlide = (slider.data().currentSlide) ? slider.data().currentSlide : slider.children().first();
				
				if (o.efect == "fade") {
					doFade(($currentSlide.next().length > 0) ? $currentSlide.next() : slider.children().first());
				} else {
					doSlide(slider.children().first(), "left");
				};
			}, o.delay);
		};
		
		//	build pager functionality
		if (o.pager.enable && $slider.children().length > 1) {
			var $pager = $("<ul/>", {"class": "slider-pager"});
			
			$slider.children().each(function(i){
				var $li = $("<li>");
				
				var slideIndex = i+1;
				
				var $page = $("<a>", {
					"href": "#" + slideIndex,
					"html": slideIndex,
					click: function(event){
						event.preventDefault();
						doFade($slider.children().eq(i));
					}
				});
				
				if (i==o.active) {
					$li.addClass("selected");
				}
				
				$li.append($page).appendTo($pager);
			});
			
			$slider.parent().append($pager);
		}
		
		//	build switcher functionality
		if (o.switcher.enable && $slider.children().length > 1) {			
			var $leftSwitch = $("<a>", {
				"class": "slider-switch-left",
				"href": "#",
				"html": "<span>" + o.switcher.leftSwitcherTitle + "</span>",
				click: function(event){
					event.preventDefault();
					clearTimeout(swapslides);
					
					$preloader.show();
					
					doSlide($slider.children().first(), "left");
					
					if (o.auto) {
						autoSlide($slider);
					};
				}
			});
			
			$slider.parent().append($leftSwitch);
			
			var $rightSwitch = $("<a>", {
				"class": "slider-switch-right",
				"href": "#",
				"html": "<span>" + o.switcher.rightSwitcherTitle + "</span>",
				click: function(event){
					event.preventDefault();
					clearTimeout(swapslides);
					
					$preloader.show();
					
					doSlide($slider.children().first(), "right");
					
					if (o.auto) {
						autoSlide($slider);
					};
				}
			});
			
			$slider.parent().append($rightSwitch);
		}
		
		//	start ticker for the first time
		if ($slider.children().length > 1) {
			if (o.auto) {
				if (o.efect == "slide") {
					autoSlide($slider, "left");
				} else {
					autoSlide($slider);
				};
			};
		};
		
	});
};

$.fn.eSlider.defaults = {
	pager: {
		enable: false					//	show or not pager	
	},				
	switcher: {
		enable: false,					//	show or not switch arrows
		orientation: "horizontal",		//	rotate bottom/up or left/right dirrection
		leftSwitcherTitle: 'Previous',	//	left arrow title
		rightSwitcherTitle: 'Next',		//	right arrow title
		topSwitcherTitle: 'Up',			//	right arrow title
		bottomSwitcherTitle: 'Down'		//	right arrow title
	},			
	delay: 7000,						//	delay in ms before slide
	efect: "fade",						//	possible values slide or fade
	speed: 1500,						//	efect transition speed
	auto: true,							//	autorotate slider
	pause: false,						//	enable pause on mouse over
	active: 0,							//	initialy active slide
	preloader: {
		enable: true,
		title: "Loading ..."
	}
};

})(jQuery, window, document);