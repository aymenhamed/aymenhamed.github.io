window.onload = () => {
  'use strict';

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('./sw.js');
  }
  var scopeProfile = {
    firstname: "Katie",
    name: "Simon",
    job: "Responsable Qualité",
    myprofile: "Mon profil 360",
    startyourday: "Mon Startyourday",
  };
  var botify = {
    lip: {
      user: {

        profile: {}
      },

      lang: {},
      kdata: {}
    }
  };
  window.kdata = 'lip_assistant';
  botify.lip.user.id = 'F-99998RP';
  botify.lip.user.profile = scopeProfile;
  botify.lip.lang = 'fr';
  window.profile = scopeProfile;
  window.userid = botify.lip.user.id;
  window.lang = botify.lip.lang;

  $.getScript("https://botify-chat-sopra-hr-lab-dev.apps.innershift.sodigital.io/index.js", function () {
    var checkScript = function () {
      if (window.ikbotSnippet && window.ikbotSnippet.context) {
        window.ikbotSnippet.context = ["profile", "kdata", "lang", "userid", "location"];
        window.ikbotSnippet.style = {
          firstColor: '#3e495b',
          secondColor: '#3c5171'
        };
      } else {
        setTimeout(checkScript, 50);
      }
    }
    checkScript();
  })



}