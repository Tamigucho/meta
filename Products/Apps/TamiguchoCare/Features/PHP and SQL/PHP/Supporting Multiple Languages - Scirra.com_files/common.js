/*
* timeago: a jQuery plugin, version: 0.9.3 (2011-01-21)
* @requires jQuery v1.2.3 or later
*
* Timeago is a jQuery plugin that makes it easy to support automatically
* updating fuzzy timestamps (e.g. "4 minutes ago" or "about 1 day ago").
*
* For usage and examples, visit:
* http://timeago.yarp.com/
*
* Licensed under the MIT:
* http://www.opensource.org/licenses/mit-license.php
*
* Copyright (c) 2008-2011, Ryan McGeary (ryanonjavascript -[at]- mcgeary [*dot*] org)
*/
(function ($) {
    $.timeago = function (timestamp) {
        if (timestamp instanceof Date) {
            return inWords(timestamp);
        } else if (typeof timestamp === "string") {
            return inWords($.timeago.parse(timestamp));
        } else {
            return inWords($.timeago.datetime(timestamp));
        }
    };
    var $t = $.timeago;

    $.extend($.timeago, {
        settings: {
            refreshMillis: 60000,
            allowFuture: false,
            strings: {
                prefixAgo: null,
                prefixFromNow: null,
                suffixAgo: "ago",
                suffixFromNow: "from now",
                seconds: "less than a minute",
                minute: "about a minute",
                minutes: "%d minutes",
                hour: "about an hour",
                hours: "about %d hours",
                day: "a day",
                days: "%d days",
                month: "about a month",
                months: "%d months",
                year: "about a year",
                years: "%d years",
                numbers: []
            }
        },
        inWords: function (distanceMillis) {
            var $l = this.settings.strings;
            var prefix = $l.prefixAgo;
            var suffix = $l.suffixAgo;
            if (this.settings.allowFuture) {
                if (distanceMillis < 0) {
                    prefix = $l.prefixFromNow;
                    suffix = $l.suffixFromNow;
                }
                distanceMillis = Math.abs(distanceMillis);
            }

            var seconds = distanceMillis / 1000;
            var minutes = seconds / 60;
            var hours = minutes / 60;
            var days = hours / 24;
            var years = days / 365;

            function substitute(stringOrFunction, number) {
                var string = $.isFunction(stringOrFunction) ? stringOrFunction(number, distanceMillis) : stringOrFunction;
                var value = ($l.numbers && $l.numbers[number]) || number;
                return string.replace(/%d/i, value);
            }

            var words = seconds < 45 && substitute($l.seconds, Math.round(seconds)) ||
        seconds < 90 && substitute($l.minute, 1) ||
        minutes < 45 && substitute($l.minutes, Math.round(minutes)) ||
        minutes < 90 && substitute($l.hour, 1) ||
        hours < 24 && substitute($l.hours, Math.round(hours)) ||
        hours < 48 && substitute($l.day, 1) ||
        days < 30 && substitute($l.days, Math.floor(days)) ||
        days < 60 && substitute($l.month, 1) ||
        days < 365 && substitute($l.months, Math.floor(days / 30)) ||
        years < 2 && substitute($l.year, 1) ||
        substitute($l.years, Math.floor(years));

            return $.trim([prefix, words, suffix].join(" "));
        },
        parse: function (iso8601) {
            var s = $.trim(iso8601);
            s = s.replace(/\.\d\d\d+/, ""); // remove milliseconds
            s = s.replace(/-/, "/").replace(/-/, "/");
            s = s.replace(/T/, " ").replace(/Z/, " UTC");
            s = s.replace(/([\+\-]\d\d)\:?(\d\d)/, " $1$2"); // -04:00 -> -0400
            return new Date(s);
        },
        datetime: function (elem) {
            // jQuery's `is()` doesn't play well with HTML5 in IE
            var isTime = $(elem).get(0).tagName.toLowerCase() === "time"; // $(elem).is("time");
            var iso8601 = isTime ? $(elem).attr("datetime") : $(elem).attr("title");
            return $t.parse(iso8601);
        }
    });

    $.fn.timeago = function () {
        var self = this;
        self.each(refresh);

        var $s = $t.settings;
        if ($s.refreshMillis > 0) {
            setInterval(function () { self.each(refresh); }, $s.refreshMillis);
        }
        return self;
    };

    function refresh() {
        var data = prepareData(this);
        if (!isNaN(data.datetime)) {
            $(this).text(inWords(data.datetime));
        }
        return this;
    }

    function prepareData(element) {
        element = $(element);
        if (!element.data("timeago")) {
            element.data("timeago", { datetime: $t.datetime(element) });
            var text = $.trim(element.text());
            if (text.length > 0) {
                element.attr("title", text);
            }
        }
        return element.data("timeago");
    }

    function inWords(date) {
        return $t.inWords(distance(date));
    }

    function distance(date) {
        return (new Date().getTime() - date.getTime());
    }

    // fix for IE6 suckage
    document.createElement("abbr");
    document.createElement("time");
} (jQuery));


// Search box function
var DefaultSearchText = 'Search Scirra.com';

// Prevent overwrite if type started
var SearchBox = $('#SearchBox');
if (SearchBox.val() == '') {
    SearchBox.val(DefaultSearchText);
}
SearchBox.focus(function () {
	if($(this).val() == DefaultSearchText){
		$(this).val('');
	}

});
SearchBox.blur(function () {
	$(this).val($.trim($(this).val()));	
	if($(this).val() == ''){
		$(this).val(DefaultSearchText);
	}
});
// Search performed
SearchBox.keyup(function (event) {
    if (event.keyCode == 13) {
        window.location.replace(Domainroot + "/search");
    }
});
// Temporary measure
SearchBox.click(function (event) {
    SearchBox.attr('disabled', 'disabled');
    SearchBox.css("background", "#efefef");
    window.location.replace(Domainroot + "/search");
});

// Each menu styling
$.each($('.main-item-selected'), function() { 
	var linkText = $(this).html();   
	$(this).html('<div class="s mainSelLPan mainSelPos"></div><div class="mainSelTxt mainSelPos">' + linkText + '</div><div class="s mainSelRPan mainSelPos"></div>');
});
$.each($('.sub-item-selected'), function() { 
	var linkText = $(this).html();   
	$(this).html('<div class="s underSelLPan underSelPos"></div><div class="underSelTxt underSelPos">' + linkText + '</div><div class="s underSelRPan underSelPos"></div>');
});

// Time ago rendering
jQuery("abbr.timeago").timeago();
 
// Add this
var addthis_config = {
    data_ga_property: 'UA-21804850-2',
    data_track_clickback: true
};

// Functions make textboxes error/not error
function MakeRed(ElementID) {
    $('#' + ElementID).css("border", "2px solid #ff5555");
}
function MakeOK(ElementID) {
    $('#' + ElementID).css("border", "1px solid #c0c0c0");
}

function pad(n) { return n < 10 ? '0' + n : n }


/**
* jQuery.ScrollTo - Easy element scrolling using jQuery.
* Copyright (c) 2007-2009 Ariel Flesler - aflesler(at)gmail(dot)com | http://flesler.blogspot.com
* Dual licensed under MIT and GPL.
* Date: 5/25/2009
* @author Ariel Flesler
* @version 1.4.2
*
* http://flesler.blogspot.com/2007/10/jqueryscrollto.html
*/
; (function (d) { var k = d.scrollTo = function (a, i, e) { d(window).scrollTo(a, i, e) }; k.defaults = { axis: 'xy', duration: parseFloat(d.fn.jquery) >= 1.3 ? 0 : 1 }; k.window = function (a) { return d(window)._scrollable() }; d.fn._scrollable = function () { return this.map(function () { var a = this, i = !a.nodeName || d.inArray(a.nodeName.toLowerCase(), ['iframe', '#document', 'html', 'body']) != -1; if (!i) return a; var e = (a.contentWindow || a).document || a.ownerDocument || a; return d.browser.safari || e.compatMode == 'BackCompat' ? e.body : e.documentElement }) }; d.fn.scrollTo = function (n, j, b) { if (typeof j == 'object') { b = j; j = 0 } if (typeof b == 'function') b = { onAfter: b }; if (n == 'max') n = 9e9; b = d.extend({}, k.defaults, b); j = j || b.speed || b.duration; b.queue = b.queue && b.axis.length > 1; if (b.queue) j /= 2; b.offset = p(b.offset); b.over = p(b.over); return this._scrollable().each(function () { var q = this, r = d(q), f = n, s, g = {}, u = r.is('html,body'); switch (typeof f) { case 'number': case 'string': if (/^([+-]=)?\d+(\.\d+)?(px|%)?$/.test(f)) { f = p(f); break } f = d(f, this); case 'object': if (f.is || f.style) s = (f = d(f)).offset() } d.each(b.axis.split(''), function (a, i) { var e = i == 'x' ? 'Left' : 'Top', h = e.toLowerCase(), c = 'scroll' + e, l = q[c], m = k.max(q, i); if (s) { g[c] = s[h] + (u ? 0 : l - r.offset()[h]); if (b.margin) { g[c] -= parseInt(f.css('margin' + e)) || 0; g[c] -= parseInt(f.css('border' + e + 'Width')) || 0 } g[c] += b.offset[h] || 0; if (b.over[h]) g[c] += f[i == 'x' ? 'width' : 'height']() * b.over[h] } else { var o = f[h]; g[c] = o.slice && o.slice(-1) == '%' ? parseFloat(o) / 100 * m : o } if (/^\d+$/.test(g[c])) g[c] = g[c] <= 0 ? 0 : Math.min(g[c], m); if (!a && b.queue) { if (l != g[c]) t(b.onAfterFirst); delete g[c] } }); t(b.onAfter); function t(a) { r.animate(g, j, b.easing, a && function () { a.call(this, n, b) }) } }).end() }; k.max = function (a, i) { var e = i == 'x' ? 'Width' : 'Height', h = 'scroll' + e; if (!d(a).is('html,body')) return a[h] - d(a)[e.toLowerCase()](); var c = 'client' + e, l = a.ownerDocument.documentElement, m = a.ownerDocument.body; return Math.max(l[h], m[h]) - Math.min(l[c], m[c]) }; function p(a) { return typeof a == 'object' ? a : { top: a, left: a} } })(jQuery);