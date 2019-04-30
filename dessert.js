$(document).ready(function() {
  
  if (localStorage.getItem('dark-theme') && localStorage.getItem('dark-theme') === 'true') {
    $('body').addClass('dark-theme');
  }

  var main = $('main');
  main.addClass('cards');

  $('.content').text('loading . . .');

  $.ajax({
    type: 'GET',
    url: 'https://www.reddit.com/r/recipes/search.json',
    data: {
      q: 'dessert',
      restrict_sr: true
    },
    success: function(response) {
      var posts = $(response.data.children);
      
      $('.content').text('');
      
      posts.each(function(i, post) {
        if(post.data.link_flair_css_class == "recipe" || post.data.link_flair_css_class == "pasta" || post.data.link_flair_css_class == "poultry" || post.data.link_flair_css_class == null) {
        if (post.data.thumbnail !== 'self' && post.data.thumbnail !== 'default') {
          $('.content').append(`<div class="post">
              <h2>${post.data.title}</h2>
              <img class="padded" src="${post.data.thumbnail}" />
              <a href='https://www.reddit.com${post.data.permalink} 'class="button" target="_blank">Recipe Post</a>
          </div>`);
        }
        }
      });
    },
    error: function(response) {
      $('.content').text('There was a problem getting data.');
      console.log(response.statusCode());
    }
    
    });

    var body = $('body');
    $('#branding').on('click', function(event) {
      var currentlyClicked = $(this);
      body.not(this).removeClass('active');
      body.toggleClass('dark-theme');
      if (body.hasClass('dark-theme')) {
        localStorage.setItem('dark-theme', 'true');
      } else {
        localStorage.removeItem('dark-theme');
      }
     });

});