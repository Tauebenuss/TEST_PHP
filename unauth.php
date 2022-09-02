<?php
	session_start();
	$_SESSION['ID_USER']=0;
	unset($_SESSION["GetOrdonner"]);
unset($_SESSION["GroupeDeDroit"]);
	header('Location: index.php');
	
?>