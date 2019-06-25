<?php
header("Content-Type: text/plain");
function curl_post( $curl, $url) {
    curl_setopt($curl, CURLOPT_URL, $url);
    curl_setopt($curl, CURLOPT_POST, 1);
    curl_setopt($curl, CURLOPT_POSTFIELDS,"");
    curl_setopt($curl, CURLOPT_FOLLOWLOCATION, false);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($curl, CURLOPT_USERAGENT,"Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.8.1.1) Gecko/20061204 Firefox/2.0.0.1" );
    curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
    $data = curl_exec($curl);
    return $data;
}	
$url = $_GET['url'];
$curl = curl_init( );
//$html = curl_post( $curl, "https://www.nseindia.com/live_market/dynaContent/live_watch/option_chain/optionKeys.jsp?symbol=NIFTY&expiry=29DEC2016");
$html = curl_post( $curl, $url);
//echo $data;
libxml_use_internal_errors(true);
$dom = new DOMDocument();
$dom->loadHTML($html);
$xpath = new DOMXPath($dom);
$data = [];
// targets any <td> with a <style> element and only selects odd elements
// (XPath counting starts at 1)
foreach($xpath->query("//td") as $node) {
    //replace superflous whitespace in the string
    //$data[] = preg_replace('/\s+/', '', $node->nodeValue);
    $data[] = preg_replace('/[^a-zA-Z0-9_ %\[\]\.\(\)\:%&-]/s', '',  trim($node->nodeValue));
}
// print_r ($data);
// echo sizeof($data) . "\xA";
echo $data[1] . "/\n";
$counter = 2;
for(; $counter < (sizeof($data) - 11); $counter++) {
    echo $data[++$counter] . "?\t" . $data[++$counter] . "?\t" . $data[++$counter] . "?\t" . $data[++$counter] . "?\t" . $data[++$counter] . "?\t"
        . $data[++$counter] . "?\t" . $data[++$counter] . "?\t" . $data[++$counter] . "?\t" . $data[++$counter] . "?\t" . $data[++$counter] . "?\t"
        . $data[++$counter] . "?\t" . $data[++$counter] . "?\t" . $data[++$counter] . "?\t" . $data[++$counter] . "?\t" . $data[++$counter] . "?\t"
        . $data[++$counter] . "?\t" . $data[++$counter] . "?\t" . $data[++$counter] . "?\t" . $data[++$counter] . "?\t" . $data[++$counter] . "?\t"
        . $data[++$counter] . "?\t" . $data[++$counter] . "/\n";
}
// print_r (explode(" ",$data[1]));
// echo $counter . "\xA";
// echo $data[++$counter] . "?\t" . $data[++$counter] . "?\t" . $data[++$counter] . "?\t" . $data[++$counter] . "?\t" . $data[++$counter]	. "?\t?\t?\t?\t?\t?\t?\t?\t?\t?\t?\t?\t?\t?\t?\t?\t" . $data[++$counter] . "?\t" . $data[++$counter] . "?\t" . $data[++$counter] . "?\t" . $data[++$counter];
?>
