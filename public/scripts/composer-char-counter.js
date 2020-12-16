$(document).ready(function() {
  
    $("#tweet-text").on('keyup', function(){
      const charRemaining = 140 - $(this).val().length; //string

      const tweetChar = $(".counter").val(charRemaining).val();
      
      if (tweetChar < 0) {
        $(".counter").css('color', "red");
        console.log("hi") 
      } else {
       $(".counter").css('color', "grey");
      
    }
})
});

