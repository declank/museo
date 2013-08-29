<?php

/**
 * Abstract class used for playlist generation.
 */
abstract class PlaylistGenerator
{

	/**
	 * Generates an array of artists from a given artist name.
	 * @param string $artist Name of the artist which will be used to generate the array.
	 * @param int $limit Maximum number of artists.
	 * @param bool $includeInitialArtist If true, includes the artist given within the returned artist array.
	 */
	abstract public function generateRelatedArtists($artist, $limit = 20, $includeInitialArtist = true);
} 

/**
 * Class used to generate data from last.fm
 */
class LastFmPlaylistGenerator extends PlaylistGenerator 
{
	public function LastFmPlaylistGenerator($apiKey, $secret) {
		$this->_lastFmApiKey = $apiKey;
		$this->_lastFmSecret = $secret;
		
		$this->_caller = CallerFactory::getCurlCaller();
		$this->_caller->setApiKey($apiKey);
		$this->_caller->setApiSecret($secret);
	}

	/**
	 * Generates an array of artists (Artist objects) from a given artist name.
	 * @param string $artist Name of the artist which will be used to generate the array.
	 * @param int $limit Maximum number of artists.
	 * @param bool $includeInitialArtist If true, includes the artist given within the returned artist array.
	 */
	public function generateRelatedArtists($artist, $limit = 20, $includeInitialArtist = true) {
		$artists = array();
		if($includeInitialArtist) {
			$artists = array_merge(array(Artist::getInfo($artist)), Artist::getSimilar($artist, $limit));
			array_pop($artists); 
		}
		else
			$artists = Artist::getSimilar($artist, $limit);
		return $artists;
	}
	
	/**
	 * Generates an array of artist names from an array of tags or a single tag.
	 * @param array $tags Array of tags or a single tag
	 * @param int $limit Maximum number of artists.
	 **/
	public function generateArtistsFromTags($tags, $limit = 20) {
		$artists = array();
		foreach((array)$tags as $tag) {
			// Add top artists for each tag, with the number being the ceiling of (limit/tags)
			$topArtistsForTag = Tag::getTopArtists($tag);
			$limitForTag = ceil($limit / count($tags));
			if(count($topArtistsForTag) > $limitForTag)
				$topArtistsForTag = array_slice($topArtistsForTag, 0, $limitForTag);
			$artists = array_merge($artists, $topArtistsForTag);
			
		}
		shuffle($artists);
		if(count($artists) > $limit)
			$artists = array_slice($artists, 0, $limit);
			
		return $artists;
	}
	
	/**
	 * Generates an array of artist names from a given artist name.
	 * @param string $artist Name of the artist which will be used to generate the array.
	 * @param int $limit Maximum number of artists.
	 */
	public function generateArtistsFromUsername($username, $limit = 20) {
		return User::getTopArtists($username, User::PERIOD_6MONTHS);
	}
	
	/**
	 * Grabs one of the top tracks from the specified artist.
	 * @param Artist|string The artist.
	 */
	public function getTopTrackFromArtist($artist, $pos = 1) {
		if(is_object($artist))
			$artist = $artist->getName();
		$topTracks = Artist::getTopTracks($artist);
		if($pos <= count($topTracks))
			$index = rand(0, $pos - 1);
		else
			$index = rand(0, count($pos)-1);
		return $topTracks[$index];
	}
	
	private $_lastFmApiKey;
	private $_lastFmSecret;
	private $_caller;
	
}
/*
$pg = new LastFmPlaylistGenerator(MUSEO_CONFIG_LASTFM_API_KEY, MUSEO_CONFIG_LASTFM_SECRET);
echo '<pre>';
try {
print_r($pg->getTopTrackFromArtist("IAMX", 3));
}
catch(Error $e) {
echo $e->getMessage();
}
catch(Exception $e) {
echo $e->getMessage();
}
echo '</pre>';*/
