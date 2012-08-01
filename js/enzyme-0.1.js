/*
 * Enzyme JavaScript Library v0.1
 *
 * Copyright (c) 2010 3linear Concept
 *
 * Author:		Tomislav Mesic
 * Date:		2011-15-01
 * Revision:	3
 */

//	define namespace
var enzyme = {};

(function(e$){

e$.utils = {};
e$.page = {};

e$.web = {};
e$.web.article = {};
e$.web.link = {};

/*************************************/
/********** utils functions **********/
/*************************************/
/*	
*	purpose:	Call page initialization functions	
*
*	usage:	
*				enzyme.page.init(homePageInitailization);
*/
e$.page.init = function(opt) {
	return (opt) ? opt.apply() : null;
};


/*	
*	purpose:	A lightweight wrapper for console.log by Paul Irish
*	based on:	http://paulirish.com/2009/log-a-lightweight-wrapper-for-consolelog/	
*
*	usage:		enzyme.utils.log('inside coolFunc',this,arguments);
*				enzyme.utils.log(enzyme.utils.dateTime().isoDateTime, "Application start");
*/
e$.utils.log = function(){
	e$.utils.log.history = e$.utils.log.history || [];   // store logs to an array for reference
	e$.utils.log.history.push(arguments);
	
	if(window.console){
		console.log( Array.prototype.slice.call(arguments) );
	};
};

/*	
*	purpose:	Croatian OIB format checker
*	based on:	http://www.dizzy.hr/oib/
*
*	usage:		enzyme.utils.checkOIB(12344532653);
*/
e$.utils.checkOIB = function(oib) {
	oib = oib.toString();
	if (oib.length != 11) return false;
	
	var b = parseInt(oib, 10);
	
	if (isNaN(b)) return false;
	
	var i = 10;
	for (var j = 0; j < 10; j++) {
		i = i + parseInt(oib.substr(j, 1), 10);
		i = i % 10;

		if (i == 0) a = 10;
			i *= 2;
			i = a % 11;
		}
	
	var cn = 11 - i;
	
	if (cn == 10) kontrolni = 0;
	
	return cn == parseInt(oib.substr(10, 1));
};

/*	
*	purpose:	Regular expressions helper function
*
*	usage:		enzyme.utils.regex(/(.+\.[a-z]{2,4})/ig, "http://www.3linear.net");
*/
e$.utils.regexp = function (regex, string) {
	var myregexp = regex;
	var match = myregexp.exec(string);
	
	return (match != null) ? match[1] : "";
};

/*	
*	purpose:	DateTime helper hunction to get commom date and time current data
*
*	usage:		var currentMonth = enzyme.utils.dateTime().month;
*/
e$.utils.dateTime = function () {
	var date = new Date();
	
	var oDateTime = {
		year: date.getFullYear(),
		month: date.getMonth() + 1,
		monthDay: date.getDate(),
		weekDay: date.getDay(),
		
		hours: date.getHours(),
		minutes: date.getMinutes(),
		seconds: date.getSeconds(),
		
		isoDateTime: date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + "T" + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
	};
	
	return oDateTime;
};


/*	
*	purpose: 	Strip query string into 4 basic components
*
*	usage:	
*				var l = e$.utils.stripQueryString('http://www.3linear.net?key=value#hash');
*				alert(l.hash()); 		// http://www.3linear.net
*				alert(l.protocol()); 	// http:
*/
e$.utils.stripQueryString = function (url) {
	return {
		search : function() {
			return url.match(/\?(.+)/i)[1];
		},
		hash : function() {
			return url.match(/#(.+)/i)[1];
		},
		protocol : function() {
			return url.match(/(ht|f)tps?:/)[0];
		},
		href : function() {
			return url.match(/(.+\.[a-z]{2,4})/ig);
		}
	};
};

/*	
*	purpose: 	Parse and decode query strings
*	based on:	http://safalra.com/web-design/javascript/parsing-query-strings/
*
*	usage:	
*				var queryData = e$.utils.parseQueryString();
*				var queryData = e$.utils.parseQueryString(location.search);
*				var queryData = e$.utils.parseQueryString('a=b+c');
*				var queryData = e$.utils.parseQueryString('?a=b+c');
*				var queryData = e$.utils.parseQueryString('a=b%20c');
*				var queryData = e$.utils.parseQueryString('?a=b%20c');
*				
*				alert(queryData.key[0]);
*				alert(queryData['key'][0]);
*
*				var key = 'key';
*				alert(queryData[key][0]);
*/
e$.utils.parseQueryString = function (queryString){

	var result = {};

	//	if a query string wasn't specified, use the query string from the URI
	if (queryString == undefined){
		queryString = location.search ? location.search : '';
	}
	
	//	remove the leading question mark from the query string if it is present
	if (queryString.charAt(0) == '?') {
		queryString = queryString.substring(1);
	};
	
	//	replace plus signs in the query string with spaces
	queryString = queryString.replace(/\+/g, ' ');
	
	//	split the query string around ampersands and semicolons
	var queryComponents = queryString.split(/[&;]/g);
	
	//	loop over the query string components
	for (var i = 0; i < queryComponents.length; i++) {
	
		//	extract this component's key-value pair
		var keyValuePair = queryComponents[i].split('=');
		var key = decodeURIComponent(keyValuePair[0]);
		var value = decodeURIComponent(keyValuePair[1]);
		
		//	update the parsed query data with this component's key-value pair
		if (!result[key]) {
			result[key] = [];
		};
		
		result[key].push((keyValuePair.length == 1) ? '' : value);
	};
	
	return result;
};


/*	
*	purpose:	Enable google analytics 	
*
*	usage:	
*				enzyme.page.googleAnalytics("XX-XXXXXX-X");
*/
e$.page.googleAnalytics = function(code){
	if (e$.page.scriptsFolder && code.length > 0) {
		$.getScript(e$.page.scriptsFolder + "/enzyme.gatracker.js", function() {			
			$.gaTracker(code);
		});
	};
};


/*	
*	purpose:	Enable smooth anchors page scrolling	
*
*	usage:	
*				usage: enzyme.page.smoothAnchors();
*/
e$.page.smoothAnchors = function() {
	$("a[href^=#][href!=#]").live("click",function(e) {
		e.preventDefault();
    	$("html,body").animate({"scrollTop": $($(this).attr("href")).offset().top+"px"}); 
	});
};

/********************************************/
/********** common iSite functions **********/
/********************************************/

/********** article functionalities **********/

//	usage: enzyme.web.article.handlePrintButton(".article-print");
e$.web.article.handlePrintButton = function () {
	
	var $printButtons = (arguments.length > 0) ? $(arguments[0]) : $(".article-print");
	
	$printButtons.bind("click", function(event){
		event.preventDefault();
		window.print();	
	});
};

/*	
*	purpose:	Share artcile by mail 	
*
*	usage:		
*				enzyme.web.article.handleSendMailButton();
*				or
*				enzyme.web.article.handleSendMailButton(".article-mail", "article.article-full-view header h1");
*/
e$.web.article.handleSendMailButton = function () {
	
	var $mailButtons = (arguments.length > 0) ? $(arguments[0]) : $(".article-mail");
	var $articleTitles = (arguments.length > 0) ? $(arguments[1]) : $(".article-title");
	
	$mailButtons.each(function(e){
		var $mailButton = $(this);
		
		var subject = document.title + " - " + $articleTitles.eq(e).text(); 
		
		$mailButton.attr("href", "mailto:?subject=" + subject + "&body=" + encodeURIComponent(window.location.href));
	});
};

/*	
*	purpose:	Share article on Facebook 	
*
*	usage:		
*				enzyme.web.article.shareOnFacebook();
*				or
*				enzyme.web.article.shareOnFacebook(".article-facebook", "article.article-full-view header h1");
*/
e$.web.article.shareOnFacebook = function () {
	
	var $facebookButtons = (arguments.length > 0) ? $(arguments[0]) : $(".article-facebook");
	var $articleTitles = (arguments.length > 0) ? $(arguments[1]) : $(".article-title");
	
	$facebookButtons.each(function(e){
		var $facebookButton = $(this);
		
		var subject = document.title + " - " + $articleTitles.eq(e).text(); 
		
		$facebookButton.attr("target", "_blank").attr("href", "http://www.facebook.com/sharer.php?t=" + encodeURIComponent(subject) + "&u=" + encodeURIComponent(window.location.href));
	});
};

/*	
*	purpose:	Share article on Twitter 	
*
*	usage:		
*				enzyme.web.article.shareOnTwitter();
*				or
*				enzyme.web.article.shareOnTwitter(".article-twitter", "article.article-full-view header h1");
*/
e$.web.article.shareOnTwitter = function () {
	
	var $twitterButtons = (arguments.length > 0) ? $(arguments[0]) : $(".article-twitter");
	var $articleTitles = (arguments.length > 0) ? $(arguments[1]) : $(".article-title");
	
	$twitterButtons.each(function(e){
		var $twitterButton = $(this);
		
		var subject = document.title + " - " + $articleTitles.eq(e).text(); 
		
		$twitterButton.attr("target", "_blank").attr("href", "http://twitter.com/home?status=" + encodeURIComponent(subject) + encodeURIComponent(" ") + escape(window.location.href));
	});
};


/********** links functionalities **********/

/*	description: set links target attribute depending on css class
*
*	usage:	
*	e$.web.link.handleLinkTarget({
*		selector: "a.new-window, .new-window a",
*		target: "_blank"
*	});
*
*	e$.web.link.handleLinkTarget();
*/
e$.web.link.handleLinkTarget = function(){
	var args = (arguments.length > 0) ? arguments[0] : null;
	
	var target = (args && args.target) ? args.target : "_blank";
	var selector = (args && args.selector) ? args.selector : ".new-window, .new-window a";
	
	$(selector).attr("target", target);
}

})(enzyme);
