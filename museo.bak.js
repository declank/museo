function AssertException(message) { this.message = message; }
function AssertException(message) { this.message = message; }
AssertException.prototype.toString = function () {
  return 'AssertException: ' + this.message;
}

function assert(exp, message) {
  if (!exp) {
    throw new AssertException(message);
  }
}

// assert = function(exp, message){}; // Comment out this line fully to re-enable assertions
// Following added just in case the browser does not define console.log() or console.error()
if (!window.console) {
    var names = ["log", "debug", "info", "warn", "error", "assert", "dir", "dirxml",
        "group", "groupEnd", "time", "timeEnd", "count", "trace", "profile", "profileEnd"];
    window.console = {};
    for (var i = 0; i < names.length; ++i)
        window.console[names[i]] = function() {};
}
 
// Array Remove - By John Resig (MIT Licensed)
// USED in Museo.PlayingModule.onGetPlaylist
Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};

try{

///////////////
// Museo Module 
///////////////

Museo = {};

Museo.constants = 
	{
		INITIAL_STATE: 0,
		PROMPT_STATE: 1,
		LOADING_STATE: 2,
		PLAYING_STATE: 3
	};

Museo.MainModule = function() {
	var currentState_ = Museo.constants.INITIAL_STATE;
	var registeredObservers_ = []; // Array of registered observer modules
	
	return {
		getCurrentState: function() {
			return currentState_;
		},
		setCurrentState: function(state){
			currentState_ = state;
		},
		registerModule: function(module) {
			registeredObservers_.push(module);
		},
		updateRegisteredModules: function() {
			for(var i = registeredObservers_.length - 1; i <= 0; i--) {
				registeredObservers_[i].updateState(currentState_);
			};
		}
	};
}();

////////////////
// Prompt Module
////////////////

Museo.PromptModule = function() {
	return {
		updateState: function(state) {
			//TODO
		},
		bindArtistDiv: function(){},
		bindTagsDiv: function(){},
		bindUsernameDiv: function(){},
		bindLinkToggle: function(){},
		bindBulletToggle: function(){},
		changeMode: function(modeName){},
		initMode: function(modeName){},
		loadPlaylist: function(mode, text, restrictLive) {},
		generatedByDiv: {
			artist: '<div id="generatedBy"><p>Generate by: <span class="artist">Artist</span> <a href="#" class="tags">Tags</a> <a href="#" class="username">Username</a></p></div>',
			tags: '<div id="generatedBy"><p>Generate by: <a href="#" class="artist">Artist</a> <span class="tags">Tags</span> <a href="#" class="username">Username</a></p></div>',
			username: '<div id="generatedBy"><p>Generate by: <a href="#" class="artist">Artist</a> <a href="#" class="tags">Tags</a> <span class="username">Username</span></p></div>'
		},
		calloutDiv: {
			artist: '<div id="callout"><span class="calloutText">Insert an <span class="blue">artist name</span> in the <span class="pink">text box</span> above and this app will play tracks of <span class="blue">similar taste,</span> or chose one of the <span class="pink">popular artists</span> below.</span><span class="calloutAfter">&nbsp;</span></div>',
			tags: '<div id="callout"><span class="calloutText">Generate a playlist based on <span class="blue">track tags</span> used on the <a target="_blank" href="http://www.last.fm/" class="pink">last.fm network</a>. <span class="blue">Type</span> them in above or add them by <span class="pink">clicking</span> on the ones provided below.</span><span class="calloutAfter">&nbsp;</span></div>',
			username: '<div id="callout"><span class="calloutText">If you know of anyone on <a target="_blank" href="http://www.last.fm/" class="blue">last.fm</a> simply enter their <span class="pink">username</span> above and this app will generate a <span class="blue">playlist</span> based on their <span class="pink">library</span>.</span><span class="calloutAfter">&nbsp;</span></div>'
		},
		mainDiv: {
			artist: '\
	  <div id="artist">\
		<h2>Popular Artists:</h2>\
		<ol>\
		<li class="artist1"><a href="#"><img src="http://userserve-ak.last.fm/serve/252/269753.jpg" alt="Click to play artists similar to Muse." width="200" height="140" /><br />Muse</a></li>\
		<li class="artist2"><a href="#"><img src="http://userserve-ak.last.fm/serve/252/61574.jpg" alt="Click to play artists similar to The Beatles." width="200" height="140" /><br />The Beatles</a></li>\
		<li class="artist3"><a href="#"><img src="http://userserve-ak.last.fm/serve/252/82971.jpg" alt="Click to play artists similar to Radiohead." width="200" height="140" /><br />Radiohead</a></li>\
		<li class="artist4"><a href="#"><img src="http://userserve-ak.last.fm/serve/252/39971359.png" alt="Click to play artists similar to Lady Gaga." width="200" height="140" /><br />Lady Gaga</a></li>\
		<li class="artist5"><a href="#"><img src="http://userserve-ak.last.fm/serve/252/17666215.jpg" alt="Click to play artists similar to Coldplay." width="200" height="140" /><br />Coldplay</a></li>\
		<li class="artist6"><a href="#"><img src="http://userserve-ak.last.fm/serve/252/3404895.jpg" alt="Click to play artists similar to Red Hot Chili Peppers." width="200" height="140" /><br />Red Hot Chili Peppers</a></li>\
		</ol>\
	  </div>',
			tags: '\
	  <div id="tags">\
		<h2>Popular Tags:</h2>\
		<ul>\
		  <li><a href="#">acoustic</a>,</li>\
		  <li><a href="#">ambient</a>,</li>\
		  <li><a href="#">blues</a>,</li>\
		  <li><a href="#">classical</a>,</li>\
		  <li><a href="#">country</a>,</li><br />\
		  <li><a href="#">electronic</a>,</li>\
		  <li><a href="#">emo</a>,</li>\
		  <li><a href="#">folk</a>,</li>\
		  <li><a href="#">hardcore</a>,</li>\
		  <li><a href="#">hip hop</a>,</li>\
		  <li><a href="#">indie</a>,</li>\
		  <li><a href="#">jazz</a>,</li>\
		  <li><a href="#">latin</a>,</li><br />\
		  <li><a href="#">metal</a>,</li>\
		  <li><a href="#">pop</a>,</li>\
		  <li><a href="#">pop punk</a>,</li>\
		  <li><a href="#">punk</a>,</li>\
		  <li><a href="#">reggae</a>,</li>\
		  <li><a href="#">rnb</a>,</li>\
		  <li><a href="#">rock</a>,</li>\
		  <li><a href="#">soul</a>,</li><br />\
		  <li><a href="#">world</a>,</li>\
		  <li><a href="#">60s</a>,</li>\
		  <li><a href="#">70s</a>,</li>\
		  <li><a href="#">80s</a>,</li>\
		  <li><a href="#">90s</a>.</li>\
		</ul>\
	  </div>',
			username: function() {
				var friends = [{"username":"69mario","profilePicMedium":"http:\/\/userserve-ak.last.fm\/serve\/64\/39753173.jpg"},{"username":"AndrewWentz","profilePicMedium":"http:\/\/userserve-ak.last.fm\/serve\/64\/28965117.jpg"},{"username":"ApolloSky","profilePicMedium":"http:\/\/userserve-ak.last.fm\/serve\/64\/33656055.jpg"},{"username":"BDKIAF","profilePicMedium":"http:\/\/userserve-ak.last.fm\/serve\/64\/38663591.jpg"},{"username":"Ballynageeha","profilePicMedium":"http:\/\/userserve-ak.last.fm\/serve\/64\/5031685.jpg"},{"username":"BrokenTelephone","profilePicMedium":"http:\/\/userserve-ak.last.fm\/serve\/64\/41074207.jpg"},{"username":"Confessions87","profilePicMedium":"http:\/\/userserve-ak.last.fm\/serve\/64\/41963653.jpg"},{"username":"Damian492","profilePicMedium":"http:\/\/userserve-ak.last.fm\/serve\/64\/40631779.png"},{"username":"DarrenMc54","profilePicMedium":"http:\/\/userserve-ak.last.fm\/serve\/64\/20168395.jpg"},{"username":"DrunkMichael","profilePicMedium":"http:\/\/userserve-ak.last.fm\/serve\/64\/39362681.jpg"},{"username":"Duplode","profilePicMedium":"http:\/\/userserve-ak.last.fm\/serve\/64\/25943523.gif"},{"username":"EndlessSandGirl","profilePicMedium":"http:\/\/userserve-ak.last.fm\/serve\/64\/23007181.jpg"},{"username":"Fiere","profilePicMedium":"http:\/\/userserve-ak.last.fm\/serve\/64\/1515349.png"},{"username":"FireBeaver","profilePicMedium":"http:\/\/userserve-ak.last.fm\/serve\/64\/42105071.jpg"},{"username":"GildedRubies","profilePicMedium":"http:\/\/userserve-ak.last.fm\/serve\/64\/1695355.jpg"},{"username":"Gretta_Pticina","profilePicMedium":"http:\/\/userserve-ak.last.fm\/serve\/64\/42134981.png"},{"username":"HubertBaxter","profilePicMedium":"http:\/\/userserve-ak.last.fm\/serve\/64\/38812577.jpg"},{"username":"IBRHN","profilePicMedium":"http:\/\/userserve-ak.last.fm\/serve\/64\/36303953.png"},{"username":"Imissmysky","profilePicMedium":"http:\/\/userserve-ak.last.fm\/serve\/64\/31468483.jpg"},{"username":"JMG88","profilePicMedium":"http:\/\/userserve-ak.last.fm\/serve\/64\/27244613.jpg"},{"username":"JamesAXD","profilePicMedium":"http:\/\/userserve-ak.last.fm\/serve\/64\/42462723.png"},{"username":"JamesPanda","profilePicMedium":"http:\/\/userserve-ak.last.fm\/serve\/64\/27631805.jpg"},{"username":"LiquidLemon","profilePicMedium":"http:\/\/userserve-ak.last.fm\/serve\/64\/38353759.jpg"},{"username":"Mrrow","profilePicMedium":"http:\/\/userserve-ak.last.fm\/serve\/64\/26042789.jpg"},{"username":"MurilloCezar","profilePicMedium":"http:\/\/userserve-ak.last.fm\/serve\/64\/36122615.jpg"},{"username":"NarcolepsyWeed","profilePicMedium":"http:\/\/userserve-ak.last.fm\/serve\/64\/42505845.jpg"},{"username":"NymphaeJulie","profilePicMedium":"http:\/\/userserve-ak.last.fm\/serve\/64\/5234456.jpg"},{"username":"OrangeKnickers","profilePicMedium":"http:\/\/userserve-ak.last.fm\/serve\/64\/36671813.jpg"},{"username":"Otterleo","profilePicMedium":"http:\/\/userserve-ak.last.fm\/serve\/64\/38815359.jpg"},{"username":"PityAleixo","profilePicMedium":"http:\/\/userserve-ak.last.fm\/serve\/64\/28354157.jpg"},{"username":"Ravanna","profilePicMedium":"http:\/\/userserve-ak.last.fm\/serve\/64\/42161135.png"},{"username":"RenoRobado","profilePicMedium":"http:\/\/userserve-ak.last.fm\/serve\/64\/3668950.jpg"},{"username":"Rictor1979","profilePicMedium":"http:\/\/userserve-ak.last.fm\/serve\/64\/5866964.jpg"},{"username":"Sidineia","profilePicMedium":"http:\/\/userserve-ak.last.fm\/serve\/64\/35984271.jpg"},{"username":"SimonX","profilePicMedium":"http:\/\/userserve-ak.last.fm\/serve\/64\/37031993.gif"},{"username":"Squishy_frog","profilePicMedium":""},{"username":"T0Mer94","profilePicMedium":"http:\/\/userserve-ak.last.fm\/serve\/64\/41298983.gif"},{"username":"TalentlessTrash","profilePicMedium":"http:\/\/userserve-ak.last.fm\/serve\/64\/42403633.png"},{"username":"Target-White","profilePicMedium":"http:\/\/userserve-ak.last.fm\/serve\/64\/42223473.jpg"},{"username":"TheDarkThrearah","profilePicMedium":"http:\/\/userserve-ak.last.fm\/serve\/64\/26116575.jpg"},{"username":"Thoron","profilePicMedium":"http:\/\/userserve-ak.last.fm\/serve\/64\/1430261.jpg"},{"username":"Uxorvalo","profilePicMedium":"http:\/\/userserve-ak.last.fm\/serve\/64\/2390423.jpg"},{"username":"VictorVienna","profilePicMedium":"http:\/\/userserve-ak.last.fm\/serve\/64\/41486165.jpg"},{"username":"XR-2","profilePicMedium":"http:\/\/userserve-ak.last.fm\/serve\/64\/41210451.png"},{"username":"achaia3","profilePicMedium":"http:\/\/userserve-ak.last.fm\/serve\/64\/25282367.jpg"},{"username":"aeroforce","profilePicMedium":"http:\/\/userserve-ak.last.fm\/serve\/64\/39366509.gif"},{"username":"alarmcall","profilePicMedium":"http:\/\/userserve-ak.last.fm\/serve\/64\/40775615.jpg"},{"username":"artymess","profilePicMedium":"http:\/\/userserve-ak.last.fm\/serve\/64\/5619840.jpg"},{"username":"ayyye-ye-think","profilePicMedium":"http:\/\/userserve-ak.last.fm\/serve\/64\/40599287.jpg"},{"username":"bananahammocks","profilePicMedium":"http:\/\/userserve-ak.last.fm\/serve\/64\/4124219.jpg"},{"username":"big_ideas47","profilePicMedium":"http:\/\/userserve-ak.last.fm\/serve\/64\/34012847.jpg"},{"username":"brunochip","profilePicMedium":"http:\/\/userserve-ak.last.fm\/serve\/64\/34503807.png"},{"username":"cartepostale","profilePicMedium":"http:\/\/userserve-ak.last.fm\/serve\/64\/42448145.jpg"},{"username":"coerie_","profilePicMedium":"http:\/\/userserve-ak.last.fm\/serve\/64\/23813155.jpg"},{"username":"conjureone","profilePicMedium":"http:\/\/userserve-ak.last.fm\/serve\/64\/1553238.jpg"},{"username":"danielbailess","profilePicMedium":"http:\/\/userserve-ak.last.fm\/serve\/64\/39172883.jpg"},{"username":"datura80","profilePicMedium":"http:\/\/userserve-ak.last.fm\/serve\/64\/23517969.jpg"},{"username":"datura800","profilePicMedium":"http:\/\/userserve-ak.last.fm\/serve\/64\/27729079.jpg"},{"username":"ebbybrett","profilePicMedium":"http:\/\/userserve-ak.last.fm\/serve\/64\/41638449.jpg"},{"username":"electron__blue","profilePicMedium":"http:\/\/userserve-ak.last.fm\/serve\/64\/42366907.jpg"},{"username":"envogue","profilePicMedium":"http:\/\/userserve-ak.last.fm\/serve\/64\/2745923.png"},{"username":"eriol_jp","profilePicMedium":"http:\/\/userserve-ak.last.fm\/serve\/64\/40100975.jpg"},{"username":"essplode","profilePicMedium":"http:\/\/userserve-ak.last.fm\/serve\/64\/41555257.jpg"},{"username":"ethancruz","profilePicMedium":"http:\/\/userserve-ak.last.fm\/serve\/64\/41586391.jpg"},{"username":"fiskarkatt","profilePicMedium":"http:\/\/userserve-ak.last.fm\/serve\/64\/2313409.jpg"},{"username":"fold007","profilePicMedium":"http:\/\/userserve-ak.last.fm\/serve\/64\/41700711.jpg"},{"username":"freakychicky","profilePicMedium":"http:\/\/userserve-ak.last.fm\/serve\/64\/37062861.jpg"},{"username":"freakymore","profilePicMedium":"http:\/\/userserve-ak.last.fm\/serve\/64\/40108995.jpg"},{"username":"gaaaaaame","profilePicMedium":"http:\/\/userserve-ak.last.fm\/serve\/64\/37070989.jpg"},{"username":"gunnai","profilePicMedium":""},{"username":"hiperek","profilePicMedium":"http:\/\/userserve-ak.last.fm\/serve\/64\/40195977.jpg"},{"username":"ivan_isaak","profilePicMedium":"http:\/\/userserve-ak.last.fm\/serve\/64\/1267043.jpg"},{"username":"jayw09","profilePicMedium":"http:\/\/userserve-ak.last.fm\/serve\/64\/41752483.jpg"},{"username":"jrydall","profilePicMedium":"http:\/\/userserve-ak.last.fm\/serve\/64\/41598779.jpg"},{"username":"kennyspice2000","profilePicMedium":"http:\/\/userserve-ak.last.fm\/serve\/64\/35083191.jpg"},{"username":"konraaad","profilePicMedium":"http:\/\/userserve-ak.last.fm\/serve\/64\/41520779.jpg"},{"username":"kristin_a","profilePicMedium":"http:\/\/userserve-ak.last.fm\/serve\/64\/6724627.jpg"},{"username":"kylebrylin","profilePicMedium":"http:\/\/userserve-ak.last.fm\/serve\/64\/40983823.jpg"},{"username":"loveissucide","profilePicMedium":"http:\/\/userserve-ak.last.fm\/serve\/64\/41671011.jpg"},{"username":"lukegjpotter","profilePicMedium":"http:\/\/userserve-ak.last.fm\/serve\/64\/23775859.jpg"},{"username":"manuxpop","profilePicMedium":"http:\/\/userserve-ak.last.fm\/serve\/64\/41208025.jpg"},{"username":"martin_timide","profilePicMedium":"http:\/\/userserve-ak.last.fm\/serve\/64\/40238517.jpg"},{"username":"matthewayne","profilePicMedium":"http:\/\/userserve-ak.last.fm\/serve\/64\/42452423.jpg"},{"username":"micheal_","profilePicMedium":"http:\/\/userserve-ak.last.fm\/serve\/64\/41292253.jpg"},{"username":"miralize","profilePicMedium":"http:\/\/userserve-ak.last.fm\/serve\/64\/34523293.jpg"},{"username":"mmaatman","profilePicMedium":"http:\/\/userserve-ak.last.fm\/serve\/64\/2052563.jpg"},{"username":"mudboy_101","profilePicMedium":"http:\/\/userserve-ak.last.fm\/serve\/64\/2261819.jpg"},{"username":"mumster","profilePicMedium":"http:\/\/userserve-ak.last.fm\/serve\/64\/29858201.jpg"},{"username":"mvgc","profilePicMedium":"http:\/\/userserve-ak.last.fm\/serve\/64\/13778635.jpg"},{"username":"not-david-bowie","profilePicMedium":"http:\/\/userserve-ak.last.fm\/serve\/64\/41034887.jpg"},{"username":"owgigi","profilePicMedium":"http:\/\/userserve-ak.last.fm\/serve\/64\/20463751.jpg"},{"username":"particle-boy","profilePicMedium":"http:\/\/userserve-ak.last.fm\/serve\/64\/2913810.jpg"},{"username":"philasts","profilePicMedium":"http:\/\/userserve-ak.last.fm\/serve\/64\/3685338.jpg"},{"username":"phunkyphinch","profilePicMedium":"http:\/\/userserve-ak.last.fm\/serve\/64\/38528741.jpg"},{"username":"pietrogregorini","profilePicMedium":"http:\/\/userserve-ak.last.fm\/serve\/64\/41639423.jpg"},{"username":"rainervinicius","profilePicMedium":"http:\/\/userserve-ak.last.fm\/serve\/64\/41299789.jpg"},{"username":"real_illusion","profilePicMedium":"http:\/\/userserve-ak.last.fm\/serve\/64\/29610353.jpg"},{"username":"repeattofade","profilePicMedium":"http:\/\/userserve-ak.last.fm\/serve\/64\/38170703.jpg"},{"username":"romain_ca","profilePicMedium":"http:\/\/userserve-ak.last.fm\/serve\/64\/17929999.jpg"},{"username":"rotricos","profilePicMedium":"http:\/\/userserve-ak.last.fm\/serve\/64\/38556819.jpg"},{"username":"rubinhu18","profilePicMedium":"http:\/\/userserve-ak.last.fm\/serve\/64\/33681453.jpg"},{"username":"rustedsyringe","profilePicMedium":"http:\/\/userserve-ak.last.fm\/serve\/64\/28149303.jpg"},{"username":"sergioateng","profilePicMedium":"http:\/\/userserve-ak.last.fm\/serve\/64\/8196775.jpg"},{"username":"seventheffect","profilePicMedium":"http:\/\/userserve-ak.last.fm\/serve\/64\/36533763.jpg"},{"username":"silentexpresser","profilePicMedium":""},{"username":"silkandskin","profilePicMedium":"http:\/\/userserve-ak.last.fm\/serve\/64\/39278669.jpg"},{"username":"simk79","profilePicMedium":""},{"username":"slave2thewage","profilePicMedium":"http:\/\/userserve-ak.last.fm\/serve\/64\/1484340.jpg"},{"username":"stevivor","profilePicMedium":"http:\/\/userserve-ak.last.fm\/serve\/64\/41546573.jpg"},{"username":"stuartwhite","profilePicMedium":"http:\/\/userserve-ak.last.fm\/serve\/64\/1768029.jpg"},{"username":"tfake","profilePicMedium":"http:\/\/userserve-ak.last.fm\/serve\/64\/34669035.jpg"},{"username":"themtc","profilePicMedium":"http:\/\/userserve-ak.last.fm\/serve\/64\/2993353.jpg"},{"username":"tom300990","profilePicMedium":"http:\/\/userserve-ak.last.fm\/serve\/64\/16245709.jpg"},{"username":"toutless","profilePicMedium":"http:\/\/userserve-ak.last.fm\/serve\/64\/6191527.jpg"},{"username":"vika-happy","profilePicMedium":"http:\/\/userserve-ak.last.fm\/serve\/64\/39123461.jpg"},{"username":"violetkid","profilePicMedium":"http:\/\/userserve-ak.last.fm\/serve\/64\/35905751.jpg"},{"username":"voltainic","profilePicMedium":"http:\/\/userserve-ak.last.fm\/serve\/64\/24428735.jpg"},{"username":"voytasss","profilePicMedium":"http:\/\/userserve-ak.last.fm\/serve\/64\/41419423.jpg"},{"username":"wanerness","profilePicMedium":"http:\/\/userserve-ak.last.fm\/serve\/64\/34891983.jpg"},{"username":"wrt54gs","profilePicMedium":"http:\/\/userserve-ak.last.fm\/serve\/64\/37133009.jpg"},{"username":"xolondon","profilePicMedium":"http:\/\/userserve-ak.last.fm\/serve\/64\/3411308.jpg"}];
				usernameArray = [];
				for(var i=0; i<15; i++) {
					var offset = Math.floor((Math.floor(friends.length / 15)+1) * Math.random());
					usernameArray[i] = friends[(i*(Math.floor(friends.length / 15))) + offset];
				}
				var rtrStr = '<div id="username">\
					<h2>Random Friends of dec142:</h2>\
					<ol>';
				for(var i=0; i<15; i++) {
					rtrStr += '<li class="user' + ((i%5)+1) + '"><a href="#" title="' + usernameArray[i].username + '"><img src="' + usernameArray[i].profilePicMedium + '" /><br />' + usernameArray[i].username + '</a></li>';
				}
				return rtrStr;
			}	
		}
	};
}();

////////////////
// Playing Module
////////////////

Museo.PlayingModule = function () {
    return {
        restrictLive: true,
        currentVideoRequest: null,
        ytPlayer: null,
        onGetPlaylist: function(jsonPlaylist) {},
        onChangeVideo: function(jcarouselItem) {},
        onytplayerStateChange: function(state) {},
		playNextItem: function() {},
        updateYouTubePlayer: function(player, videoUrl) {
            var videoId = videoUrl.replace(/http:\/\/(|www.)youtube.com\/v\//, '');
            player.loadVideoById(videoId);
        },
		YoutubeVideoState :
			{
				UNSTARTED: -1,
				ENDED: 0,
				PLAYING: 1,
				PAUSED: 2,
				BUFFERING: 3,
				VIDEO_CUED: 5
			}
    };
}();

////////////
// Youtube function called when Player object is created:
////////////

function onYouTubePlayerReady(playerId) {
	Museo.PlayingModule.ytPlayer = document.getElementById("video");
	Museo.PlayingModule.ytPlayer.addEventListener("onStateChange", "Museo.PlayingModule.onytplayerStateChange");
}

// Export symbol so that the function still exists as named after Google Closure Compliation
// Closure Compiler does not modify string literals
window['onYouTubePlayerReady'] = onYouTubePlayerReady;

////////////////////////
// jQuery events and DOM
////////////////////////

if(jQuery) {
$(document).ready(function() {
	
	Museo.PromptModule.bindArtistDiv = function(){
		$("#artist a").click( function() {
			$("input[type=text]").val($(this).text());
			$(".goButton").click();
		});
	};
	Museo.PromptModule.bindTagsDiv = function(){
		$("#tags a").click( function() {
			var tag = $(this).text();
			// Draw up a list of tags currently in the text box        
			var tagList = new Array();
			var textBoxContents = $("input[type=text]").attr("value");
			var textBoxContents2 = textBoxContents.replace(/[^a-zA-Z0-9-_,\s]/g, '');        
			var textBoxContents3 = textBoxContents2.replace(/^\s+/g, '');
			var textBoxContents4 = textBoxContents3.replace(/\s+$/g, ''); // Remove non-allowed characters and any whitespace chars at the start/end
			var textBoxContents5 = textBoxContents4.replace(/\s{2,}/g, ' '); // Replace excessive whitespace with only ONE space
			var textBoxContents6 = textBoxContents5.replace(/,\s/g, ','); // Remove spaces on either sides of commas
			var textBoxContents7 = textBoxContents6.replace(/\s,/g, ','); // Remove spaces on either sides of commas
			if(textBoxContents7.indexOf(',') > -1) {        
				tagList = textBoxContents7.split(',');
			} else if (textBoxContents7 == '')
			{}
			else { tagList[0] = textBoxContents7; }
			// Find instances of the tag in the textbox and remove them
			var tagFound = false;
			//var newTagList = tagList.filter( function(element, index, array) {            
			//    return(element != tag);
			//});
			var newTagList = $.grep(tagList, function(n, i) { return n!=tag; });
			tagFound = (tagList.length != newTagList.length);
				   
			// cleanup and format list as "rock, pop, stuff" etc., add the new tag if any, and place it back into the text box
			if(newTagList.length < 1){
				textBoxContents = '';            
				if (!tagFound)
					textBoxContents += tag;            
			}else {
				textBoxContents = newTagList[0];
				if(newTagList.length > 1) {
					for(var i=1; i<newTagList.length; i++) {
						textBoxContents += ', ' + newTagList[i];
					}
				}
				if (!tagFound)            
					textBoxContents += ', ' + tag;
			}
			$("input[type=text]").val(textBoxContents);
		});
	};
	Museo.PromptModule.bindUsernameDiv = function(){
		$("#username a").click( function() {
			$("input[type=text]").val($(this).text());
			$(".goButton").click();
		});
	};
	Museo.PromptModule.bindLinkToggle = function(){
		$("#generatedBy a").click( function(){
			if($(this).hasClass('artist'))
				Museo.PromptModule.changeMode('artist');
			if($(this).hasClass('tags'))
				Museo.PromptModule.changeMode('tags');
			if($(this).hasClass('username'))
				Museo.PromptModule.changeMode('username');
		});
	};
	Museo.PromptModule.bindBulletToggle = function(){
		$("#formArea input[type=radio]").click( function(){
			var rbnClicked = $(this).attr('value'); 
			if(rbnClicked == 'artist')
				Museo.PromptModule.changeMode('artist');
			if(rbnClicked == 'tags')
				Museo.PromptModule.changeMode('tags');
			if(rbnClicked == 'username')
				Museo.PromptModule.changeMode('username');
		});
	};
	Museo.PromptModule.initMode = function(modeName){
		// Clear text box
		clearTextBox();
		if(modeName == 'artist') {
			// Insert Divs
			$(Museo.PromptModule.generatedByDiv.artist + Museo.PromptModule.calloutDiv.artist).appendTo('#container2');
			$(Museo.PromptModule.mainDiv.artist).insertAfter('#container2');
			// Bind events to artists
			Museo.PromptModule.bindArtistDiv();
			// Ensure that the top bullet is set to artist
			$("#formArea input[value=artist]").click();
		};
		if(modeName == 'tags') {
			// Insert Divs
			$(Museo.PromptModule.generatedByDiv.tags + Museo.PromptModule.calloutDiv.tags).appendTo('#container2');
			$(Museo.PromptModule.mainDiv.tags).insertAfter('#container2');
			// Bind events to tags
			Museo.PromptModule.bindTagsDiv();
			// Ensure that the top bullet is set to tag
			$("#formArea input[value=tags]").click();
		};
		if(modeName == 'username') {
			// Insert Divs
			$(Museo.PromptModule.generatedByDiv.username + Museo.PromptModule.calloutDiv.username).appendTo('#container2');
			$(Museo.PromptModule.mainDiv.username()).insertAfter('#container2');
			// Bind events to usernames
			Museo.PromptModule.bindUsernameDiv();
			// Ensure that the top bullet is set to username
			$("#formArea input[value=username]").click();
		};
		
		// Bind Event to top bullet and link
		Museo.PromptModule.bindLinkToggle();
		Museo.PromptModule.bindBulletToggle();
	};
	Museo.PromptModule.changeMode = function(modeName){
		console.log('Change mode to ' + modeName);
		// Unbind Toggles and Disable
		// $("#generatedBy a").unbind();
        // $("#artist a").unbind();
        // $("#tags a").unbind();
		// $("#username a").unbind();
		$("#formArea input[type=radio]").unbind();
		// Remove mainDivs
		$("#generatedBy").remove();
		$("#callout").remove();
		$("#artist").remove();
		$("#tags").remove();
		$("#username").remove();
		// Start new Mode
		Museo.PromptModule.initMode(modeName);		
	};
	Museo.PromptModule.loadPlaylist = function(mode, text, restrictLive) {
        Museo.MainModule.setCurrentState(Museo.constants.LOADING_STATE);
        var loadingText;
        if(mode=='artist')
            loadingText = "You're into <b>" + text + "</b>, eh? Great choice!";
        else if(mode=='tags')
            loadingText = "Getting some <b>" + text + "</b> music ready for you...";
        else
            loadingText = "Generating a playlist based on <b>" + text + "'s</b> library.";		
		$("#formArea").unbind();
		$("#formArea").attr('disabled', 'disabled');
        $("#generatedBy").attr('disabled', 'disabled');
        $("#callout").attr('disabled', 'disabled');
        $("#artist").attr('disabled', 'disabled');
        $("#tags").attr('disabled', 'disabled');
        $("#username").attr('disabled', 'disabled');
        $("#footer").attr('disabled', 'disabled');
        $("#container2").after( '\
            <div id="lightbox-panel">\
            <p>' + loadingText + '</p>\
            <br /><img src="images/ajax-loader.gif" alt="Loading bar" />\
            </div>\
            <div id="lightbox"> </div>');
		$("#videoArea").remove();
        $("#lightbox, #lightbox-panel").fadeIn(500);
		requestUrl = 'json.php?mode=' + mode;
		if(mode == 'tags') {
			// Comma separated values
			var tags = text.split(',');
			var i;
			for(i=0; i<tags.length; i++) {
				requestUrl += '&v[' + i + ']=' + tags[i].replace(/\s*[^0-9A-Za-z-]\s*/g, '');
			}
			requestUrl += '&size=20';
		}
		else
			requestUrl += '&v=' + text + '&size=20';
		
		Museo.PlayingModule.restrictLive = restrictLive;
		
        // Load external JSON and pass it to Museo.PlayingModule.onGetPlaylist
		$.getJSON(requestUrl, Museo.PlayingModule.onGetPlaylist);
		
    };
    
    Museo.PlayingModule.onGetPlaylist = function(jsonPlaylist) {
        var to = setTimeout( '\
            $("#generatedBy").remove();\
            $("#callout").remove();\
            $("#artist").remove();\
            $("#tags").remove();\
            $("#username").remove();\
            $("#lightbox, #lightbox-panel").remove();\
            $("#formArea").removeAttr("disabled");\
            $("#formArea input[type=radio]").unbind();\
            $("#footer").remove();\
            Museo.MainModule.setCurrentState(Museo.constants.PLAYING_STATE);', 200);
        var i;
        var firstVideoUrl; // TODO: Error if unable to retrieve any videourl, beware that this request is synchronous. 
        // Find the first item in the playlist that returns a youtube video
        for (i=0; i<jsonPlaylist.length; i++) {
            firstVideoUrl = $.parseJSON($.ajax({url: "json.php?mode=yturl&artist=" + jsonPlaylist[0].artist + "&track=" + jsonPlaylist[0].track + '&restrictlive=' + Museo.PlayingModule.restrictLive, async: false, dataType: 'json'}).responseText);
            if(firstVideoUrl)
                break;
            else
                jsonPlaylist.remove(i);
        }
        // TODO: Perhaps throw an exception if no video has been found
        
        var str = '\
            <div id="videoArea">\
            <div id="video">You need Flash player 8+ and JavaScript enabled to view this video.</div>\
            <script type="text/javascript">\
            var params = { allowScriptAccess: "always" };\
            var atts = { id: "video" };\
            swfobject.embedSWF("'
            + firstVideoUrl +
            '?rel=0&autoplay=1&hd=1&fs=1&border=1&color1=0x777777&color2=0x999999&enablejsapi=1&playerapiid=ytplayer",\
            "video", "560", "340", "8", null, null, params, atts);\
            </script>\
            <ul id="mycarousel" class="jcarousel-skin-museo">';
        
        for (i=0; i<jsonPlaylist.length; i++) {
            var thumbnailUrl;
            // Use album art for thumbnail, if not found, try artist, otherwise use ImageNotAvailable placeholder.
            if(jsonPlaylist[i].albumart)
                thumbnailUrl = jsonPlaylist[i].albumart;
            else if(jsonPlaylist[i].artistimg)
                thumbnailUrl = jsonPlaylist[i].artistimg;
            else
                thumbnailUrl = 'imgUnavailable.gif'; // TODO: image unavailable thumbnail.
                str += '<li><img width="100" height="100" src="' + thumbnailUrl + '" alt="' + jsonPlaylist[i].artist + ' - ' + jsonPlaylist[i].track + '" /><br /><strong class="artist">' + jsonPlaylist[i].artist + '</strong><br /><span class="track">' + jsonPlaylist[i].track + '</span></li>';
        }
        str += '</ul></div>';
        $(str).insertAfter("#container2");
        $('#mycarousel').jcarousel({
            scroll: 4,
            visible: 4
        });
        
        // Bind first video url to first item in carousel and make item active
        $("li.jcarousel-item-1").data('yturl', firstVideoUrl);
        $("li.jcarousel-item-1").addClass('playlist-active');
        
        // Bind event so that the carousel items will change the currently playing video.
        $("li[class^=jcarousel-item]").click(Museo.PlayingModule.onChangeVideo);
    };
    
    Museo.PlayingModule.onChangeVideo = function(jcarouselItem) {
        toChangeItem = $(this);
        var artist = toChangeItem.find('.artist').text();
        var track = toChangeItem.find('.track').text();
        // If the item is unactive
        if(!toChangeItem.hasClass('playlist-active')) {
            var urlToVideo = toChangeItem.data("yturl");
            if(Museo.PlayingModule.currentVideoRequest)
                Museo.PlayingModule.currentVideoRequest.abort(); // Abort other ajax operation
            if(!urlToVideo) {
                // Retrieve new URL
                Museo.PlayingModule.currentVideoRequest = $.getJSON("json.php?mode=yturl&artist=" + artist + 
                                                "&track=" + track + '&restrictlive=' + Museo.PlayingModule.restrictLive,
                                                function(url){
                    toChangeItem.data("yturl", url);
                    // UPDATE YOUTUBE PLAYER
                    if(Museo.PlayingModule.ytPlayer && url) {
                        Museo.PlayingModule.updateYouTubePlayer(Museo.PlayingModule.ytPlayer, url);
                        $('.playlist-active').removeClass('playlist-active');
                        toChangeItem.addClass('playlist-active');
                    }
                    if(!url) {
                        // TODO:REMOVE ITEM FROM CAROUSEL
                    }
                });
            }
            else {
                // UPDATE YOUTUBE PLAYER
                if(Museo.PlayingModule.ytPlayer) {
                    Museo.PlayingModule.updateYouTubePlayer(Museo.PlayingModule.ytPlayer, urlToVideo);
                    $('.playlist-active').removeClass('playlist-active');
                    toChangeItem.addClass('playlist-active');
                }
            }
        }
    };
	
	Museo.PlayingModule.onytplayerStateChange = function(state) {
		if(state == Museo.PlayingModule.YoutubeVideoState.ENDED)
			Museo.PlayingModule.playNextItem();
	};
	
	Museo.PlayingModule.playNextItem = function() {
		// Is there another video that follows in the Carousel
		var classesOfFinishedItem = $(".playlist-active").attr('class');
		var currentItemNumber = classesOfFinishedItem.match(/jcarousel-item-\d+/);
		currentItemNumber = currentItemNumber[0];
		currentItemNumber = currentItemNumber.replace(/\D*/, '');
		// Retrieve the item
		var nextItemNo = (currentItemNumber * 1) + 1; // * 1 casts string to integer
		var nextItem = $(".jcarousel-item-" + nextItemNo);
		if(nextItem) {
			var carousel = $('#mycarousel').data('jcarousel');
			//carousel.scroll(nextItem, true);
			//If the next item is not visible, scroll to it.			
			//Is the nextItem before or after first
			// Direction = 1 for forward, -1 for backward, 0 for same			
			var direction = (carousel.first < nextItemNo) ? 1 : 0;
			direction = (carousel.first > nextItemNo) ? -1 : direction;
			if(direction > 0) {
			    if (carousel.tail !== null && !carousel.inTail) {
					carousel.scrollTail(false);
			    } else {
					carousel.scroll(((carousel.options.wrap == 'both' || carousel.options.wrap == 'last') && carousel.options.size !== null && carousel.last == carousel.options.size) ? 1 : nextItemNo /*carousel.first + carousel.options.scroll*/);
			    }
			}
			else if(direction < 0) {
				if (carousel.tail !== null && carousel.inTail) {
                	carousel.scrollTail(true);
            	} else {
                	carousel.scroll(((carousel.options.wrap == 'both' || carousel.options.wrap == 'first') && carousel.options.size !== null && carousel.first == 1) ? carousel.options.size : nextItemNo /*carousel.first - carousel.options.scroll*/);
            	}
			}
			nextItem.click();
			
		}
		
	};

	function onHashChange(e) {
		// In jQuery 1.4, use e.getState( "url" );
		var url = $.param.fragment();
		var mode = url.match(/^\w+/);
		mode = (!mode) ? [''] : mode;
		mode = mode[0].toLowerCase();
		url = url.replace(mode + '/', '');

		if(mode == 'artist' || mode == 'username') {
			url = url.replace(/\+/gi, ' ');
			Museo.PromptModule.loadPlaylist(mode, url, true );
		}
		else if (mode == 'tags') {
			var tags = url.split('/');
			tags = tags.join(', ');
			Museo.PromptModule.loadPlaylist(mode, tags, true );
		}
	}

	// TODO: Include functionality for URL fragments (e.g. http://www.declank.com/apps/museo/#artist/Tori+Amos)
	$(window).bind( "hashchange", onHashChange);

	$(window).trigger( 'hashchange' );
	
	Museo.PromptModule.initMode('artist');
	
	

	
	function clearTextBox() {
		$("input[type=text]").removeAttr("value");
	}
	function verifyTextBoxContents(currentMode, text){
		// TODO: Verify and sanitize results (e.g. give back correct artist spelling, warn if no artist/user exists)
		return true;
	}
	
	$(".goButton").click( function(){ 
        // Verify textbox contents and delete
        var text = $("input[type=text]").attr("value");
        var currentMode;        
            if($("input:checked[name=playlistBasis]").attr("value") == "artist")
                currentMode = "artist";
            else if($("input:checked[name=playlistBasis]").attr("value") == "tags")
                currentMode = "tags";
            else
                currentMode = "username";
        if(verifyTextBoxContents(currentMode, text)) {
            clearTextBox();
            Museo.PromptModule.loadPlaylist(currentMode, text, $("input[name=restrictLiveVideos]").is(':checked') );
        }
    });
	
	$('input[type=text]').keypress(function(e) {
        if(e.which == 13) {
            $(this).blur();
            $('.goButton').click();
        }
    });
	
});
}
else {
	var jQueryLoadFail = function (){
		var con1 = document.getElementById('container1');
		var message = document.createElement('p');
		message.id = "noJS";
		message.innerHTML = 'Unable to load jQuery. Please <a href="JavaScript:window.location.reload()">reload</a> the page later.';
		con1.insertBefore(message, document.getElementById('footer'));
	};
	if (document.addEventListener) 
		document.addEventListener("DOMContentLoaded", jQueryLoadFail, false);
}

} catch(e) {
console.error(e.toString());
}
