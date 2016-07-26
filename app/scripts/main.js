$(function(){
    $("#mycircle").percircle({
      text:$("#work").text(),
      percent: parseInt($("#work").text())
    });

    $("#work-sub").click(function(){
      var val = $("#work").text();
      if (val === "1") {
        return;
      }
      $("#work").text(parseInt(val) -1);
    });

    $("#work-add").click(function(){
      var val = $("#work").text();
      $("#work").text(parseInt(val) +1);
    });

    $("#rest-sub").click(function(){
      var val = $("#rest").text();
      if (val === "1") {
        return;
      }
      $("#rest").text(parseInt(val) -1);
    });

    $("#rest-add").click(function(){
      var val = $("#rest").text();
      $("#rest").text(parseInt(val) +1);
    });

});
