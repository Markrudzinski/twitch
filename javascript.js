var twitchUrl = 'https://wind-bow.glitch.me/twitch-api';
var twitchUsers = ['ESL_SC2', 'OgamingSC2', 'Nl_kripp', 'freecodecamp', 'storbeck', 'habathcx', 'RobotCaleb', 'noobs2ninjas'];
var allUsers = {};
var allChannels = {};
$(document).ready(function(){
  for (var i in twitchUsers) {
    (function (i) {
      $.ajax( {
        dataType: "jsonp",
        url:  twitchUrl + '/streams/' + twitchUsers[i],
        success: function(data) {
          allChannels[twitchUsers[i]] = data;
        }
      } );
      $.ajax( {
        dataType: "jsonp",
        url:  twitchUrl + '/users/' + twitchUsers[i],
        success: function(data) {
          allUsers[twitchUsers[i]] = data;
        }
      } );
    })(i);
  }
  $('#allBtn').click();
} );
// three all/online/offine menu buttons
$( function clicked() {
  $('button').click( function() {
    $('.status-clicked').removeClass('status-clicked');
    $(this).addClass('status-clicked');
    $('#resultTabs').html('');
    for (var j in allChannels) {
      if (event.target.id == 'allBtn') {
        if (allChannels[j].stream == null) {
          offlineUsersTab(j);
        } else {
          onlineUsersTab(j)
        }
      } else if (event.target.id == 'onlineBtn' && allChannels[j].stream !== null) {
        onlineUsersTab(j);
      } else if (event.target.id == 'offlineBtn' && allChannels[j].stream == null) {
        offlineUsersTab(j);
      }
    }
  } );
} );
// adds result wells for three status buttons
function onlineUsersTab(j) {
  $('#resultTabs').append(
    '<div class="well result-well online" >' + 
        '<img class="logo" src="' + allChannels[j].stream.channel.logo + '">' +
        '<a target="_blank" href="' + allChannels[j].stream.channel.url + '">'+ j +'</a>' +
        '<p class="status-text" >' + allChannels[j].stream.channel.status + '</p>' +
    '</div>'
  );
}
function offlineUsersTab(j) {
  $('#resultTabs').append(
    '<div class="well result-well offline" >' +
      '<img class="logo" src="' + allUsers[j].logo + '">' + j +
      '<p class="status-text" > Offline </p>' +
    '</div>'
  );
}
