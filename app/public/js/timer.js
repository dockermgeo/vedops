function timeRefresh() {
    var timersecs = document.getElementById('timeoutPeriod').value;
    if (timersecs > 0) {
      var timermillisecs = (timersecs*1000);
      setTimeout("location.reload(true);", timermillisecs);
    }
    //console.log("Refresh Page in  "+timersecs, timermillisecs)
}
