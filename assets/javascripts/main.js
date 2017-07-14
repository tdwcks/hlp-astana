// =================================================================
// 	Hello Lamp Post
// 	Global Javascript
// =================================================================

jQuery.fn.extend({
    toggleText: function (a, b){
        var that = this;
            if (that.text() != a && that.text() != b){
                that.text(a);
            }
            else
            if (that.text() == a){
                that.text(b);
            }
            else
            if (that.text() == b){
                that.text(a);
            }
        return this;
    }
});

// Lazy Load The Image 
$("img.lazy").lazyload({
	threshold : 500,
	effect : "fadeIn"
});

$( ".js-to-top" ).on( "click", function() {
	$('html, body').animate({
    	scrollTop: $(".hero").offset().top
	}, 600);
	return false;
});

$( ".js-scroll-down-button" ).on( "click", function() {
	$('html, body').animate({
    	scrollTop: $(".process").offset().top
	}, 600);
	return false;
});

$( ".js-learn-more" ).on( "click", function() {
	$(this).toggleClass("active");
	$(this).toggleText('Show More', 'Show Less');
	$(".how-to-play").toggleClass("active");
	$(".what-to-expect").toggleClass("active");
	$('html, body').animate({
    	scrollTop: $(".how-to-play").offset().top
	}, 600);
	return false;
});

// $(".depot-video").vimeo("play").vimeo("pause");

// $(".js-video-play").click(function() {
// 	$(".hero").addClass('video-active');
// 	$("header").addClass('video-active');
// 	$('.depot-video').vimeo("play");
// });

// $(".js-video-pause").click(function() {
// 	$(".hero").removeClass('video-active');
// 	$("header").removeClass('video-active');
// 	$('.depot-video').vimeo("pause");
// });
