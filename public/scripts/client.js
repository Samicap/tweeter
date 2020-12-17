/*
* Client-side JS logic goes here
* jQuery is already loaded
* Reminder: Use (and do all your DOM work in) jQuery's document ready function
*/
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

$(document).ready(function(){

  renderTweets(data);

  const $form = $(".new-tweet");

  $form.on("submit", submitTweet)


});



const submitTweet = function(event) {
  event.preventDefault();
  console.log($(this).serialize());
  const formData = $(this).serialize();
  $.ajax("/tweets/", { method: "POST", data: formData })
    .then((response) => {
      getAndRenderTweets()
    })

};

const getAndRenderTweets = function() {
  $.ajax("/tweets/", {method: "GET"})
    .then((response) => {
      renderTweets(response);
    });
}

const renderTweets = function(tweets) {
  for (tweet of tweets) {
    const tweetElement = createTweetElement(tweet);
    $("#tweet-container").prepend(tweetElement);
  }
};


const createTweetElement = function(tweet){

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
            ${tweet.content.text}
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


  