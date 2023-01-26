$('button').hover(function(){
    var $this = $(this);
    var $prevAll = $(this).prevAll();
    
    var className = $this.attr("class") + "-hover";
    
    $this.addClass(className);
    $prevAll.addClass(className);
 }, function() {
    var $this = $(this);
    var $prevAll = $(this).prevAll();
    
    $('.heading').text("Welcome");
    // $('.widget-sm').css('background','#000000');
    $this.removeClass("detractor-hover passive-hover promoter-hover");
    $prevAll.removeClass("detractor-hover passive-hover promoter-hover");
 });
 // $('.heading').text("sdfasdf");
 // $('.message').text("sdsfsadfdffasdf");
 // $('.container').css("display","block");
 
 $("button").click(function() {
       var fired_button = $(this).val();
       alert(fired_button);
   });