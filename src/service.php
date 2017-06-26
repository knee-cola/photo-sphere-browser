<?php

	$queryPath = $_GET['path'];
	
	if (strpos($queryPath, '..') !== FALSE) {
		echo '[]';
		exit;
	}
	
	$dirPath = "./images/$queryPath";
	$dir = opendir($dirPath);
	header('Content-type: application/json');

	$glue = ''; 
	echo '[';
	
	while ($file = readdir($dir)) {
		if ($file == '.' || $file == '..') {
			continue;
		}
		
		$filePath = "$dirPath/$file";
		$fileDate = date("Y.m.d. H:i:s",filemtime($filePath));

		$fileType =  'file';

		if(is_dir($filePath)) {
			$fileType =  'folder';
		} else {
			$fileType =  'file';

			// skipping files which are not JPEG
			$ext = pathinfo($filePath, PATHINFO_EXTENSION);

			if($ext != 'jpg' && $ext != 'jpeg') {
				continue;
			}
		}
		
		echo "$glue{\"name\":\"$file\",\"type\":\"$fileType\",\"date\":\"$fileDate\"}";
		$glue = ',';
	}
	
	echo ']';
?>