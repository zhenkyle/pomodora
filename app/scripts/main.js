function parse(accept) {
  if (accept === undefined) {
    accept = {}
  }

  return !isNaN(accept) ?
    parse(accept) :
    parse

  function parse (seconds) {
    var parsed = {
      years: 0,
      weeks: 0,
      days: 0,
      hours: 0,
      minutes: 0
    }

    // Years
    if (accept.years !== false) {
      parsed.years = ~~(seconds / 60 / 60 / 24 / 365)
      seconds -= parsed.years * 60 * 60 * 24 * 365
    }

    // Weeks
    if (accept.weeks !== false) {
      parsed.weeks = ~~(seconds / 60 / 60 / 24 / 7)
      seconds -= parsed.weeks * 60 * 60 * 24 * 7
    }

    // Days
    if (accept.days !== false) {
      parsed.days = ~~(seconds / 60 / 60 / 24)
      seconds -= parsed.days * 60 * 60 * 24
    }

    // Hours
    if (accept.hours !== false) {
      parsed.hours = ~~(seconds / 60 / 60)
      seconds -= parsed.hours * 60 * 60
    }

    // Minutes
    if (accept.minutes !== false) {
      parsed.minutes = ~~(seconds / 60)
      seconds -= parsed.minutes * 60
    }

    // Seconds
    parsed.seconds = seconds

    return parsed
  }
}

function checkTime(i) {
if (i<10)
  {i='0' + i}
  return i
}

function formated_seconds(seconds) {
  var parsed = parse({ hours: false })(seconds);
  return checkTime(parsed.minutes) + ':' + checkTime(parsed.seconds);
}

$(function(){
    var status = {
      kind: 'work', // 'work','rest'
      mode: 'stopped',  //'stopped','running','paused'
      elapse: 0, // elapse in seconds
    }

    function render() {
      var seconds = parseInt($("#" + status.kind).text()) * 60;
      if (status.mode ==="stopped") {
        $("#mycircle-text").text(seconds/60);
      } else if(status.mode ==="paused") {
        $("#mycircle-text").text("Paused");
      } else if(status.mode ==="running") {
        $("#mycircle-text").text(formated_seconds(status.elapse));
      }
      var myclass ="c100 big center";
      if (status.kind ==='rest') {
        myclass += " green";
      }
      myclass += " p" + Math.round(status.elapse*100/seconds);
      $("#mycircle").attr("class", myclass);
    }

    render();  // initial render;

    function run() {
      var seconds = parseInt($("#" + status.kind).text()) * 60;
      if(status.elapse<seconds) {
        status.elapse += 1;
      } else {
        status.elapse = 0;
        status.kind = status.kind === "work" ? "rest" : "work";
      }
      render();
      if (status.mode ==="running") {
        setTimeout(run,1000);
      }
    }

    $("#work-sub").click(function(){
      var val = $("#work").text();
      if (val === "1") {
        return;
      }
      $("#work").text(parseInt(val) -1);
      status.mode ="stopped";
      status.elapse = 0;
      render();
    });

    $("#work-add").click(function(){
      var val = $("#work").text();
      $("#work").text(parseInt(val) +1);
      status.mode ="stopped";
      status.elapse = 0;
      render();
    });

    $("#rest-sub").click(function(){
      var val = $("#rest").text();
      if (val === "1") {
        return;
      }
      $("#rest").text(parseInt(val) -1);
      status.mode ="stopped";
      status.elapse = 0;
      render();
    });

    $("#rest-add").click(function(){
      var val = $("#rest").text();
      $("#rest").text(parseInt(val) +1);
      status.mode ="stopped";
      status.elapse = 0;
      render();
    });

    $("#mycircle").click(function() {
      if (status.mode === "stopped" || status.mode ==="paused") {
        status.mode = "running";
        setTimeout(run,1000);
      } else if(status.mode ==="running") {
        status.mode = "paused";
      }
    });

});
