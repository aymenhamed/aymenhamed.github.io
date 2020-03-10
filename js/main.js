(function(window) {
  'use strict';
  Notification.requestPermission(function(status) {
    console.log('Notification permission status:', status);
});
$('#installApp').on('click',function (params) {
   // Hide the app provided install promotion
   hideMyInstallPromotion();
   // Show the install prompt
   deferredPrompt.prompt();
   // Wait for the user to respond to the prompt
   deferredPrompt.userChoice.then((choiceResult) => {
     if (choiceResult.outcome === 'accepted') {
       console.log('User accepted the install prompt');
     } else {
       console.log('User dismissed the install prompt');
     }
   })
})
  $("#menu-toggle").click(function (e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
});
function displayNotification(notii) {
  {
    if (Notification.permission == 'granted') {
      navigator.serviceWorker.getRegistration().then(function(reg) {
        var options = {
          body: notii.titile,
          icon: notii.icon,
          vibrate: [100, 50, 100],
          data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
          }
        };
        reg.showNotification(notii.content, options);
      });
    }
  }

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


var addNotif= function(notif,isNew){
   var itisnew ='';
   if(isNew)
   {
     itisnew = 'blink';
   }
        // 4 years ago

    var noti = '<li class="Notification" style="display:none"> <div class="Notification__Container "> <div class="Notification__Header"> <div class="Notification__App"> <div class="Notification__Icon"> <img src="'+notif.icon+'"> </div> <div class="Notification__Name">'+notif.name+'</div> </div> <div class="Notification__Time '+itisnew+'">'+
    moment(notif.time).fromNow()+'</div> </div> <div class="Notification__Body"> <div class="Notification__Title">'+notif.title+'</div> <div class="Notification__Content">'+notif.content+'</div> </div> </div> </li>';
    $('.Notifications__List').prepend(noti);
    $('.Notification').fadeIn('slow');
    if(isNew)
    { 
      displayNotification(notif);
      $(".Notifications__List").animate({ scrollTop: "0" });
      setTimeout(() => {
        $(".blink").removeClass("blink");

      }, 3000);
    } 

};
  $.ajax({
    url:'https://bot.hr4youlive.com/nodered/news',
    success: function (response) {
      for(var i=0;i<response.length;i++)
      {
        addNotif(response[i],false);
      }
    },
    error: function () {
        // $('#output').html('Bummer: there was an error!');
    },
  })

var message = document.getElementById("message"),
    output = document.getElementById("output");

var websocket = new WebSocket("wss://bot.hr4youlive.com/nodered/4you-pocket/news");
websocket.onopen = function() { 
    // output.innerHTML += "<p>&gt; CONNECTED</p>"; 
};

websocket.onmessage = function(e) { 
addNotif(JSON.parse(e.data),true)
    output.innerHTML += "<p style='color: blue;'>&gt; RESPONSE: " + e.data + "</p>"; 
};



websocket.onerror = function(e) {
    //output.innerHTML += "<p style='color: red;'>&gt; ERROR: " + e.data + "</p>";
};
            
function sendMessage(message) {
    output.innerHTML += "<p>&gt; SENT: " + message + "</p>";
    websocket.send(message);

}


////////////////////////////////

	var support = { transitions: Modernizr.csstransitions },
		// transition end event name
		transEndEventNames = { 'WebkitTransition': 'webkitTransitionEnd', 'MozTransition': 'transitionend', 'OTransition': 'oTransitionEnd', 'msTransition': 'MSTransitionEnd', 'transition': 'transitionend' },
		transEndEventName = transEndEventNames[ Modernizr.prefixed( 'transition' ) ],
		onEndTransition = function( el, callback ) {
			var onEndCallbackFn = function( ev ) {
				if( support.transitions ) {
					if( ev.target != this ) return;
					this.removeEventListener( transEndEventName, onEndCallbackFn );
				}
				if( callback && typeof callback === 'function' ) { callback.call(this); }
			};
			if( support.transitions ) {
				el.addEventListener( transEndEventName, onEndCallbackFn );
			}
			else {
				onEndCallbackFn();
			}
		},
		// the pages wrapper
		stack = document.querySelector('.pages-stack'),
		// the page elements
		pages = [].slice.call(stack.children),
		// total number of page elements
		pagesTotal = pages.length,
		// index of current page
		current = 0,
		// menu button
		menuCtrl = document.querySelector('button.menu-button'),
		// the navigation wrapper
		nav = document.querySelector('.pages-nav'),
		// the menu nav items
		navItems = [].slice.call(nav.querySelectorAll('.link--page')),
		// check if menu is open
		isMenuOpen = false;

	function init() {
		buildStack();
		initEvents();
	}

	function buildStack() {
		var stackPagesIdxs = getStackPagesIdxs();

		// set z-index, opacity, initial transforms to pages and add class page--inactive to all except the current one
		for(var i = 0; i < pagesTotal; ++i) {
			var page = pages[i],
				posIdx = stackPagesIdxs.indexOf(i);

			if( current !== i ) {
				classie.add(page, 'page--inactive');

				if( posIdx !== -1 ) {
					// visible pages in the stack
					page.style.WebkitTransform = 'translate3d(0,100%,0)';
					page.style.transform = 'translate3d(0,100%,0)';
				}
				else {
					// invisible pages in the stack
					page.style.WebkitTransform = 'translate3d(0,75%,-300px)';
					page.style.transform = 'translate3d(0,75%,-300px)';		
				}
			}
			else {
				classie.remove(page, 'page--inactive');
			}

			page.style.zIndex = i < current ? parseInt(current - i) : parseInt(pagesTotal + current - i);
			
			if( posIdx !== -1 ) {
				page.style.opacity = parseFloat(1 - 0.1 * posIdx);
			}
			else {
				page.style.opacity = 0;
			}
		}
	}

	// event binding
	function initEvents() {
		// menu button click
		menuCtrl.addEventListener('click', toggleMenu);

		// navigation menu clicks
		navItems.forEach(function(item) {
			// which page to open?
			var pageid = item.getAttribute('href').slice(1);
			item.addEventListener('click', function(ev) {
				ev.preventDefault();
				openPage(pageid);
			});
		});

		// clicking on a page when the menu is open triggers the menu to close again and open the clicked page
		pages.forEach(function(page) {
			var pageid = page.getAttribute('id');
			page.addEventListener('click', function(ev) {
				if( isMenuOpen ) {
					ev.preventDefault();
					openPage(pageid);
				}
			});
		});

		// keyboard navigation events
		document.addEventListener( 'keydown', function( ev ) {
			if( !isMenuOpen ) return; 
			var keyCode = ev.keyCode || ev.which;
			if( keyCode === 27 ) {
				closeMenu();
			}
		} );
	}

	// toggle menu fn
	function toggleMenu() {
		if( isMenuOpen ) {
			closeMenu();
		}
		else {
			openMenu();
			isMenuOpen = true;
		}
	}

	// opens the menu
	function openMenu() {
		// toggle the menu button
		classie.add(menuCtrl, 'menu-button--open')
		// stack gets the class "pages-stack--open" to add the transitions
		classie.add(stack, 'pages-stack--open');
		// reveal the menu
		classie.add(nav, 'pages-nav--open');

		// now set the page transforms
		var stackPagesIdxs = getStackPagesIdxs();
		for(var i = 0, len = stackPagesIdxs.length; i < len; ++i) {
			var page = pages[stackPagesIdxs[i]];
			page.style.WebkitTransform = 'translate3d(0, 75%, ' + parseInt(-1 * 200 - 50*i) + 'px)'; // -200px, -230px, -260px
			page.style.transform = 'translate3d(0, 75%, ' + parseInt(-1 * 200 - 50*i) + 'px)';
		}
	}

	// closes the menu
	function closeMenu() {
		// same as opening the current page again
		openPage();
	}

	// opens a page
	function openPage(id) {
		var futurePage = id ? document.getElementById(id) : pages[current],
			futureCurrent = pages.indexOf(futurePage),
			stackPagesIdxs = getStackPagesIdxs(futureCurrent);

		// set transforms for the new current page
		futurePage.style.WebkitTransform = 'translate3d(0, 0, 0)';
		futurePage.style.transform = 'translate3d(0, 0, 0)';
		futurePage.style.opacity = 1;

		// set transforms for the other items in the stack
		for(var i = 0, len = stackPagesIdxs.length; i < len; ++i) {
			var page = pages[stackPagesIdxs[i]];
			page.style.WebkitTransform = 'translate3d(0,100%,0)';
			page.style.transform = 'translate3d(0,100%,0)';
		}

		// set current
		if( id ) {
			current = futureCurrent;
		}
		
		// close menu..
		classie.remove(menuCtrl, 'menu-button--open');
		classie.remove(nav, 'pages-nav--open');
		onEndTransition(futurePage, function() {
			classie.remove(stack, 'pages-stack--open');
			// reorganize stack
			buildStack();
			isMenuOpen = false;
		});
	}

	// gets the current stack pages indexes. If any of them is the excludePage then this one is not part of the returned array
	function getStackPagesIdxs(excludePageIdx) {
		var nextStackPageIdx = current + 1 < pagesTotal ? current + 1 : 0,
			nextStackPageIdx_2 = current + 2 < pagesTotal ? current + 2 : 1,
			idxs = [],

			excludeIdx = excludePageIdx || -1;

		if( excludePageIdx != current ) {
			idxs.push(current);
		}
		if( excludePageIdx != nextStackPageIdx ) {
			idxs.push(nextStackPageIdx);
		}
		if( excludePageIdx != nextStackPageIdx_2 ) {
			idxs.push(nextStackPageIdx_2);
		}

		return idxs;
	}

	init();

})(window);
 