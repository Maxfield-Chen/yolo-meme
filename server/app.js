$(document).ready(function(){
  window.setInterval(function(){
    var posting = $.post('/status');
    
    posting.done(function(data){
      console.log(data);
      switch(data){ 
        case '35 A8 CC E3':
          $('div#rpiImage > img').removeClass("rpiImage-spin-card2");
          $('div#rpiImage > img').addClass("rpiImage-spin-card1");
          break;
        case 'C4 D0 45 BC':
          $('div#rpiImage > img').removeClass("rpiImage-spin-card1");
          $('div#rpiImage > img').addClass("rpiImage-spin-card2");
          break;
        default:
      }
    });
  }, 500);
});
