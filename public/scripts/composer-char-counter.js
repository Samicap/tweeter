$(document).ready(function() {
  
    $(".new-tweet .tweet-input textarea").on('input', function(){
      const tweetCharLength = $("#tweet-text").val(); //strings
      const tweetLength = tweetCharLength.length;
      const charRemaining = 140 - tweetLength;
      console.log(charRemaining)
    })

    // $("counter")
});

