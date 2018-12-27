$( document ).ready(function() {
  var el = document.getElementById('myonoffswitch');
  el.addEventListener('click', function() {
    var switchurl='/api/refresh/switch';
    $.ajax({
      url: switchurl,
      type: "GET",
      success: function(result){
        location.reload(true);
      },
      error: function(error){alert('Error connecting URL: '+ switchurl)}
    });
  });
});
