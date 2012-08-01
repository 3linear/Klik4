var klik4 = (function($, window, document, undefined) {
	var $navBarProductsItem = $("#nav-item-products"),
		$navBarProductsWrapper = $("#nav-products"),
		$navBarProductsCategories = $("#nav-categories > li"),
		$navBarProductsListWrapper = $("#nav-category-products"),
		$productsFilter = $("#products-filter"),
		menuInitialized = false,
		navTimer;
	
	var _getPromoProducts = function(){
		$.ajax({
			dataType: "json",
			url: "content/services/promotional_products.js",
			success: function(data){
				var $productsList = $("#promotional-products-list"),
					$productTmpl = $.template("#tmpl-promotional-product");
				
				$.tmpl($productTmpl, data.products).appendTo($productsList);
				
				$productsList
					.jcarousel()
					.delegate("li", "click", function(){
					//p$.space.init($.tmplItem(this).data.id);
				});
			},
			error:  function(jqXHR, textStatus, errorThrown){
				enzyme.utils.log(enzyme.utils.dateTime().isoDateTime, errorThrown);	
			}
		});
	};
	
	var _getRecentlyProducts = function(){
		$.ajax({
			dataType: "json",
			url: "content/services/promotional_products.js",
			success: function(data){
				var $productsList = $("#recently-products-list"),
					$productTmpl = $.template("#tmpl-promotional-product");
				
				$.tmpl($productTmpl, data.products).appendTo($productsList);
				
				$productsList
					.jcarousel()
					.delegate("li", "click", function(){
					//p$.space.init($.tmplItem(this).data.id);
				});
			},
			error:  function(jqXHR, textStatus, errorThrown){
				enzyme.utils.log(enzyme.utils.dateTime().isoDateTime, errorThrown);	
			}
		});
	};
	
	var _getPromoCategoriesList = function(){
		$.ajax({
			dataType: "json",
			url: "content/services/promotional_categories.js",
			success: function(data){
				var $listContainer = $("#promo-categories-list"),
					$itemTmpl = $.template("#tmpl-promo-category-simple");
		
				$.tmpl($itemTmpl, data.categories).appendTo($listContainer);
			},
			error:  function(jqXHR, textStatus, errorThrown){
				enzyme.utils.log(enzyme.utils.dateTime().isoDateTime, errorThrown);	
			}
		});
	};
	
	var _getPromoProductsList = function(){
		$.ajax({
			dataType: "json",
			url: "content/services/promotional_products.js",
			success: function(data){
				var $listContainer = $("#promo-products-list"),
					$itemTmpl = $.template("#tmpl-promo-product-simple");
				
				$.tmpl($itemTmpl, data).appendTo($listContainer);
			},
			error:  function(jqXHR, textStatus, errorThrown){
				enzyme.utils.log(enzyme.utils.dateTime().isoDateTime, errorThrown);	
			}
		});
	};
	
	var _navigationSetup = function() {	
		
		$navBarProductsItem.bind({
			mouseenter: function(){
				if (!menuInitialized) {
					if ($navBarProductsCategories.length < 12) {
						$navBarProductsCategories.parent().height(270);
					};
					
					$navBarProductsListWrapper.height($navBarProductsCategories.parent().height()-20);
					
					menuInitialized = true;
					
					$navBarProductsListWrapper.data().currentCategoryIndex = 0;
					
					_setNavigationProducts(0);
				}
			}
		});
		
		$navBarProductsCategories.live("hover", function(){
			var $listItem = $(this),
				listItemIndex = $listItem.index();
			
			if ($listItem.index() != $navBarProductsListWrapper.data().currentCategoryIndex) {
				clearInterval(navTimer);
				
				$listItem
					.addClass("current-category")
					.siblings().removeClass("current-category");
				
				$navBarProductsListWrapper.empty();
				
				$navBarProductsListWrapper.data().currentCategoryIndex = listItemIndex;
				
				navTimer = setTimeout ( function(){
					_getNavigationProducts(listItemIndex);
				}, 2000 );
			}
		});
	};
	
	var _productsFilterSetup = function() {
		if ($productsFilter.length != 0) {
			$("#products-filter dt").bind("click", function(){
				var $dt = $(this),
					$dd = $dt.next();
					
				$dt.toggleClass("expanded");
				$dd.toggle();
			}); 
			
			$("#products-filter a.products-filter-close").bind("click", function(event){
				event.preventDefault();
				
				var $link = $(this),
					$dt = $("#products-filter dt"),
					$dd = $("#products-filter dd");
				
				$link.toggleClass("products-filter-all-colapsed");
				
				if ($link.hasClass("products-filter-all-colapsed")) {
					$dt.removeClass("expanded");
					$dd.hide();
				}
				else {
					$dt.addClass("expanded");
					$dd.show();
					
				};
			});   
		}; 
	};
	
	var _setNavigationProducts = function(categoryId) {
		navTimer = setTimeout ( function(){
			_getNavigationProducts(categoryId);
		}, 2000 );
	};
	
	var _getNavigationProducts = function(categoryId) {		
		$.ajax({
			dataType: "json",
			url: "content/services/navigation_products.js",
			success: function(data){
				var $productsListWrapper = $navBarProductsListWrapper,
					$productTmpl = $.template("#tmpl-navigation-product"),
					$productsList = $("<div class='nav-category-products-list'></div>");
				
				$.tmpl($productTmpl, data.products).appendTo($productsList);
			
				$productsList
					.appendTo($productsListWrapper)
					.height($productsList.parent().height())
					.jScrollPane();
			},
			complete: function(){
				clearInterval(navTimer);
			},
			error:  function(jqXHR, textStatus, errorThrown){
				enzyme.utils.log(enzyme.utils.dateTime().isoDateTime, errorThrown);	
			}
		});
	};
	
	var _productFirstStepInit = function() {
		_pageInit();
		
		var $productImage = $("#product-image");		
	
		$("#product-quantity-range").slider({
			range: "min",
			value: 100,
			min: 1,
			max: 1000,
			slide: function( event, ui ) {
				$( "#txt-product-quantity" ).val(ui.value);
			}
		});
		
		//	Hadle product quantity
		$("#btn-product-quantity").on("click", function(){
			console.log($("#txt-product-quantity").val())
			$("#product-quantity-range").slider("value", $("#txt-product-quantity").val());
		});
		
		$("#txt-product-quantity").val($( "#product-quantity-range" ).slider( "value" ));
		
		//	Handle product images
		$("#mnu-product-decoration, #mnu-product-color").selectBox();
		
		$("#product-image-colors ul, #product-image-views ul").jcarousel();
	
		$("#product-image-colors a").on("click", function(event){
			event.preventDefault();
			
			var $color = $(this);
			
			$productImage[0].src = $color.attr("href");
			
			$color.parent().addClass("current-color").siblings().removeClass("current-color");
		});
		
		$("#product-image-views a").on("click", function(event){
			event.preventDefault();
			
			var $view = $(this);
			
			$productImage[0].src = $view.attr("href");
			
			$view.parent().addClass("current-view").siblings().removeClass("current-view");
		});
		
		//	Handle product tabs
		var $tabContentWrappers = $(".product-additional-data section");
		
		$("#product-additional-data-tabs a").on("click", function(event){
			event.preventDefault();
			
			var $tab = $(this).parent();
				$tabContainer = $tabContentWrappers.eq($tab.index());
					
			$tabContentWrappers.hide();
			
			$tabContainer.show();
			
			$tab.addClass("current").siblings().removeClass("current");
		});
		
		// Handle product share functions
		$(".share-print").fancybox({
			width			: 710,
			height			: 600,
			padding			: 0,
			type			: "iframe",
			centerOnScroll	: true,
			overlayColor	: "#000",
			autoScale		: false,
			overlayOpacity	: 0.7,
			showCloseButton	: true
		});
		
		// Handle product actions
		$("#btn-quote").click(function(){
			var quoteUrl = "product_quote.htm?productid=" + $(this).data("productid");
			
			$.fancybox({
				width			: 710,
				height			: 980,
				padding			: 0,
				type			: "iframe",
				centerOnScroll	: false,
				overlayColor	: "#000",
				autoScale		: false,
				overlayOpacity	: 0.7,
				showCloseButton	: true,
				href			: quoteUrl
			});
		}); 
	};
	
	var _productCustomizationInit = function() {
		_pageInit();
		
		var customizer = {
			step: $("section.customizer-step").first(),
			progressPonder: 100 / $("section.customizer-step").length,
			item: {
				color: "",
				decoration: {
					type: "none",
					id: ""
				}
			}
			
		};
		
		var $imprintCustom = $("#item-decoration-location-custom"),
			$imprintSizes = $("#item-decoration-location-size"),
			$artworkText = $("#item-decoration-artwork-text"),
			$artworField = $("#item-decoration-artwork-file"),
			$progressBar = $("#progress-bar > div");
		
		//	Hadle customizer steps
		$progressBar.css("width", customizer.progressPonder + "%");
		
		$(".customizer-step").first().show();
		
		$("button.btn-continue").live("click", function(){
			switchStep(customizer.step.next());
		});
		
		$("button.btn-back").live("click", function(){
			switchStep(customizer.step.prev());
		});
		
		function switchStep(step) {
			
			if (currentStepIsValid()) {
	
				var progressWidth = ((step.index() * customizer.progressPonder) > 100) ? 100 : (step.index() * customizer.progressPonder);
				
				customizer.step.hide();
				step.fadeIn();
				
				$progressBar.css("width", progressWidth + "%");	
				
				customizer.step = step;
			};
		};
		
		function currentStepIsValid() {
			
			// TODO
			
			return true;
		}
		
		$("#related-products-list").jcarousel();
		
		$("a.modal").fancybox({
			padding			: 20,
			type			: "inline",
			centerOnScroll	: true,
			overlayColor	: "#000",
			overlayOpacity	: 0.5,
			showCloseButton	: true
		});
		
		$("#item-decoration-locations input").change(function(){
			var $imprintlocation = $(this),
				decorationType = $imprintlocation.data("decorationlocation");
				
			$imprintCustom.hide();
			$imprintSizes.hide();
			
			switch (decorationType) {
				case "standard":
					$imprintSizes.show();
				break;
				case "custom":
					$imprintCustom.show();
				break;
				default:
					
			}
		});
		
		$("#item-artwork-type input").change(function(){
			var $artwork = $(this),
				artworkType = $artwork.data("artworktype");
				
			$artworkText.hide();
			$artworField.hide();
			
			switch (artworkType) {
				case "text":
					$artworkText.show();
				break;
				case "file":
					$artworField.show();
				break;
				default:
					
			}
		});
		
		$("#item-color-palete li").live("click", function(){
			$item = $(this);
			
			$item.addClass("current").siblings().removeClass("current");
		});
	};
	
	var _pageInit = function(){
		enzyme.utils.log(enzyme.utils.dateTime().isoDateTime, "App start");
		
		_navigationSetup();
		_productsFilterSetup();
		_getRecentlyProducts();
		
		$("#about-and-compare .products-compare-list").jScrollPane();
	};
	
	var _homeInit = function(){
		_pageInit();
		_getPromoProducts();
		_getPromoCategoriesList();
		_getPromoProductsList();
		
		//	Handle teaser news on homepage
		$("#left-teaser").eSlider({
			pager: {
				enable: true
			},
			delay: 10000,
			rotate: true,
			pause: true,
			efect: "fade",
			speed: 2500,
			active: 0
		});
		
		$("#right-teaser").eSlider({
			pager: {
				enable: true
			},
			delay: 6000,
			rotate: true,
			pause: true,
			efect: "fade",
			speed: 1000,
			active: 0
		});
		
		// Set partners ticker
		$("div.partners ul").pmTicker({
			orientation: "horizontal",
			width: 319,
			speed: 1,
			delay: 4000,
			pause: true
		});
	};
	
	return {
		pageInit: _pageInit,
		homeInit: _homeInit,
		product: {
			firstStepInit: _productFirstStepInit,
			customizationInit: _productCustomizationInit
		}
	};
	
})(jQuery, this, this.document);




