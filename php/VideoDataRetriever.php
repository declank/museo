<?php

/**
 * Abstract class used for retrieving video data in relation to an artist/track specified.
 */
abstract class VideoDataRetriever
{
	/**
	 * Obtains the URL to the video source of track specified. 
	 * @param string $artist Artist name.
	 * @param string $track Track name.
	 * @param bool $restrictLiveVideos Flag. If set to true, it restricts live videos from the search. 
	 */
	abstract public function getVideoUrl($artist, $track, $restrictLiveVideos = false);
}

/**
 * Class used to gather video data from Youtube.
 */
class YoutubeDataRetriever extends VideoDataRetriever
{
	
	/**
	 * Obtains the URL to the video source on Youtube of track specified. 
	 * @param string $artist Artist name.
	 * @param string $track Track name.
	 * @param bool $restrictLiveVideos Flag. If set to true, it restricts live videos from the search.
	 * @param string $userIPAddress The user's IP Address. Useful for filtering out restricted videos in certain countries. Set to 0.0.0.0 if none provided.
	 * @return string|false URL of the video from Youtube in the form "http://(www.)youtube.com/v/XXXXXXXXXX"
	 */
	public function getVideoUrl($artist, $track, $restrictLiveVideos = false, $userIPAddress = "0.0.0.0") {
		$url = "http://gdata.youtube.com/feeds/api/videos?q=";
		$url .= htmlentities(urlencode($artist . ' '. $track));
		if(!preg_match('/live/', $artist . ' ' . $track) && $restrictLiveVideos)
			$url .= "+-live";
		$url .= "&orderby=relevance&max-results=1&format=5&v=2";
		if($userIPAddress != "0.0.0.0" && filter_var($userIPAddress, FILTER_VALIDATE_IP, FILTER_FLAG_IPV4))
			$url .= "&restriction=" . $userIPAddress;
		
		$crl = curl_init();
        $timeout = 15;
        curl_setopt ($crl, CURLOPT_URL, filter_var($url, FILTER_SANITIZE_URL));
        curl_setopt ($crl, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt ($crl, CURLOPT_CONNECTTIMEOUT, $timeout);
		curl_setopt($crl, CURLOPT_PROXY, MUSEO_CONFIG_PROXY);
        $xmlstr = curl_exec($crl);
        curl_close($crl);
		$xml = simplexml_load_string($xmlstr);
		$arr = $xml->entry->content;
		if(isset($arr['src'])) 
			$url = (string)$arr['src'];
		else
			$url = false;
		
		// Only have the url up until the query (i.e. until you find a ?)
		$url = explode('?', $url);
		
		return $url[0];
		//TODO
	}
}

