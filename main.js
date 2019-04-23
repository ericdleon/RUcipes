$(document).ready(function() {
  
  var main = $('main');
  main.addClass('cards');

  $('.content').text('loading . . .');

  $.ajax({
    type: 'GET',
    url: 'https://www.reddit.com/r/recipes/search.json',
    data: {
      q: 'dinner',
      restrict_sr: true
    },
    success: function(response) {
      var posts = $(response.data.children);
      
      $('.content').text('');
      
      posts.each(function(i, post) {
        if (post.data.thumbnail !== 'self' && post.data.thumbnail !== 'default') {
          $('.content').append(`<div class="post">
              <h2>${post.data.title}</h2>
              <img class="padded" src="${post.data.thumbnail}" />
              <a href='https://www.reddit.com${post.data.permalink} 'class="button">Recipe Post</a>
          </div>`);
        }
      });
    },
    error: function(response) {
      $('.content').text('There was a problem getting data.');
      console.log(response.statusCode());
    }
  });

  $(function() {
    var body = $('body');
    $('#branding').on('click', function(event) {
      var currentlyClicked = $(this);
      body.not(this).removeClass('show');
      body.toggleClass('dark-theme');
     });
   
   });

});