<?php 
session_start();
include('include/OBJECT.php');  
require_once ('droit.php');




if($_SESSION["ID_USER"]!='') {
	$Utilisateur=new Utilisateur($_SESSION['ID_USER']);
	$IsAdmin=$Utilisateur->ID_STATUS;
	$TempCentre=new centre();
	$Status=$Utilisateur->ID_GROUPE;
	if(!isset($_SESSION["GetOrdonner"]) or !isset($_SESSION["GroupeDeDroit"])) {
		$_SESSION["GetOrdonner"]=$TempCentre->GetOrdonnerInit($Utilisateur->ID_GROUPE);
		$GetOrdonner=$_SESSION["GetOrdonner"];
		$_SESSION["GroupeDeDroit"]=$TempCentre->GetDroit();
		$GroupeDeDroit=$_SESSION["GroupeDeDroit"];
	//	$_SESSION["GroupeDeParent"]=$TempCentre->GetTabParent($Utilisateur->ID_GROUPE);
	//	$GroupeDeParent=$_SESSION["GroupeDeParent"];
	} else {
		$GetOrdonner=$_SESSION["GetOrdonner"];
		$GroupeDeDroit=$_SESSION["GroupeDeDroit"];
	//	$GroupeDeParent=$_SESSION["GroupeDeParent"];
	}
}else{
    $LaPage = "login.php";
}

 
 
$Status=1;
include($LaPage);
?>