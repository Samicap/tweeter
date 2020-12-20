/*
* Client-side JS logic goes here
* jQuery is already loaded
* Reminder: Use (and do all your DOM work in) jQuery's document ready function
*/


$(document).ready(function () {

  getAndRenderTweets(); // needs to have the array response from the server

  const $form = $(".new-tweet");
  $form.on("submit", submitTweet);
  $("#error").hide();
});


const escape = function (str) { // converts user input into a string inside <div> tags
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const alertTweetInput = function () {
 
  const counter = $(".counter").val();
  
  if ($("#tweet-text").val() === "") {
    return errorElement("Write Something!");
  } else if (counter < 0) {
    return errorElement("Tweet too Long!");
  }
  return null;
};

const errorElement = function(errorText) {
  
  const errorMessage = 
    `
      <i class="fas fa-exclamation-triangle"></i>
      <span>${errorText}</span>
      <i class="fas fa-exclamation-triangle"></i>
    `
  return $(errorMessage);
}


const submitTweet = function (event) {
  event.preventDefault();
  const alertMessage = alertTweetInput();
  if (alertMessage !== null) {
    $("#error").html(alertMessage);
    $("#error").slideDown();
  } else {
    const formData = $(this).serialize();
    $.ajax("/tweets/", { method: "POST", data: formData })
    .then((response) => {
      $("#error").slideUp();
      $("#tweet-text").val("");
      $("#counter").val(140);
      getAndRenderTweets();
    });
  };
};

const getAndRenderTweets = function () {
  $.ajax("/tweets/", { method: "GET" })
  .then((response) => {
      renderTweets(response);
    });
};

const renderTweets = function (tweets) {
  for (tweet of tweets) {
    const tweetElement = createTweetElement(tweet);
    $("#tweet-container").prepend(tweetElement);
  }
};


const createTweetElement = function (tweet) {

  const tweetElement = `
  <article class="tweet">
          <header class="tweet-header">
            <div class="user-info">
              <div class="avatar-name">
                <div class="avatar">
                  <img src=${tweet.user.avatars}/>
                </div>
                ${tweet.user.name}
              </div>
              <div class="username">
                ${tweet.user.handle}
              </div>
            </div>
          </header>
          <div class="tweet-body">
            ${escape(tweet.content.text)}
          </div>
          <footer class="tweet-footer">
            <div class="footer-left">10 Days ago</div>
            <div class="footer-right">
              <i class="fas fa-flag"></i>
              <i class="fas fa-retweet"></i>
              <i class="fas fa-heart"></i>
            </div>  
          </footer>
        </article>
  `;
  return $(tweetElement);
};


