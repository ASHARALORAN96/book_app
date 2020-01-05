'use strict';
    // $("#selectBook").click(function() {
    //   $("<%=book.id%>").show();
    //   $('.div').hide();
    // });
    $('#<%= book.etag %>').click(showForm);
    function showForm(){
      $('#<%= book.id %>').show() ;
      $('.div').hide();
    }