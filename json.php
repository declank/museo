<?php

include('php/config.php');
require_once('php/LastFmApi/lastfm.api.php');
require_once('php/PlaylistGenerator.php');
require_once('php/VideoDataRetriever.php');

class Museo {
	public static function getInstance(){
		if(!is_object(self::$_instance)){
			self::$_instance = new Museo();
		}

		return self::$_instance;
	}
	
	public function artistRequest() {
		// Get Inputs
		$artistName = filter_input(INPUT_GET, 'v', FILTER_SANITIZE_STRING, FILTER_FLAG_STRIP_LOW);
		$size = filter_input(INPUT_GET, 'size', FILTER_SANITIZE_NUMBER_INT);
		$size = max(0, $size);
		$initial = filter_input(INPUT_GET, 'initial', FILTER_SANITIZE_STRING);
		if($initial === 'false')
			$initial = false;
		else if(is_null($initial))
			$initial = true;
		else
			$initial = (bool)$initial;
			
		// Generate artists from input
		$results = $this->_playlistGenerator->generateRelatedArtists($artistName, $size, $initial);
				
		// Produce json array of objects with 'artist' and 'track' properties.
		return $this->jsonFromArtists($results);		
	}
	
	public function tagsRequest() {
		// Get Inputs
		$tags = $_GET['v'];
		for($i=0; $i<count($tags); $i++) {
			$tags[$i] = filter_var($tags[$i], FILTER_SANITIZE_STRING, FILTER_FLAG_STRIP_LOW);
		}
		$size = filter_input(INPUT_GET, 'size', FILTER_SANITIZE_NUMBER_INT);
		$size = max(0, $size);
			
		// Generate artists from input
		$results = $this->_playlistGenerator->generateArtistsFromTags($tags, $size);
		
		// Produce json array of objects with 'artist' and 'track' properties.
		return $this->jsonFromArtists($results);
	}
	
	public function usernameRequest() {
		// Get Inputs
		$username = filter_input(INPUT_GET, 'v', FILTER_SANITIZE_STRING, FILTER_FLAG_STRIP_LOW);
		$size = filter_input(INPUT_GET, 'size', FILTER_SANITIZE_NUMBER_INT);
		$size = max(0, $size);
			
		// Generate artists from input
		$results = $this->_playlistGenerator->generateArtistsFromUsername($username, $size);
		
		// Produce json array of objects with 'artist' and 'track' properties.
		return $this->jsonFromArtists($results);
	}
	
	/**
	 * Generates JSON from a list of artists, and associates a top track with each one.
	 * @param array $artists Array of Artist objects.
	 */
	public function jsonFromArtists($artists) {
		$jsonArray = array();
		foreach($artists as $result) {
			$track = $this->_playlistGenerator->getTopTrackFromArtist($result->getName(), 5);
			$item = array('artist' => $result->getName(), 'track' => $track->getName(), 'albumart' => $track->getImage(Track::IMAGE_SMALL), 'artistimg' => $result->getImage(Track::IMAGE_SMALL));
			array_push($jsonArray, $item);
		}
		
		// TODO: ERROR HANDLING
		
		return json_encode($jsonArray);
	}
	
	public function getYoutubeUrl() {
		// Get Inputs.
		$artist = filter_input(INPUT_GET, 'artist', FILTER_SANITIZE_STRING, FILTER_FLAG_STRIP_LOW);
		$track = filter_input(INPUT_GET, 'track', FILTER_SANITIZE_STRING, FILTER_FLAG_STRIP_LOW);
		$restrictLive = filter_input(INPUT_GET, 'restrictlive', FILTER_SANITIZE_STRING);
		if($restrictLive === 'false')
			$restrictLive = false;
		else if(is_null($restrictLive))
			$restrictLive = true;
		else
			$restrictLive = (bool)$restrictLive;
		$ipAddress = filter_input(INPUT_GET, 'ipaddress', FILTER_VALIDATE_IP, FILTER_FLAG_IPV4);
		if(!$ipAddress)
			$ipAddress = "0.0.0.0";
		return json_encode($this->_videoDataRetriever->getVideoUrl($artist, $track, $restrictLive, $ipAddress));
	}
	
	private function Museo() {
		$this->_playlistGenerator = new LastFmPlaylistGenerator(MUSEO_CONFIG_LASTFM_API_KEY, MUSEO_CONFIG_LASTFM_SECRET);
		$this->_videoDataRetriever = new YoutubeDataRetriever();
	}
	
	private static $_instance;
	private $_playlistGenerator;
	private $_videoDataRetriever;
}

$mode = filter_input(INPUT_GET, 'mode', FILTER_SANITIZE_STRING);
$museo = Museo::getInstance();

if($mode == 'artist') {	
	echo($museo->artistRequest());
}
else if($mode == 'tags') {
	echo($museo->tagsRequest());
}
else if($mode == 'username') {
	echo($museo->usernameRequest());
}
else if($mode == 'yturl') {
	echo($museo->getYoutubeUrl());
}
else {
	//TODO: It's an error, no mode specified or wrong mode name.

}