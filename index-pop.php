<?php 

session_start();
include('include/OBJECT.php');
require_once ('droit.php');
if($_SESSION["ID_USER"]!='') {
	$Utilisateur=new Utilisateur($_SESSION['ID_USER']);
	$TempCentre=new centre();
	$Status=$Utilisateur->ID_GROUPE;	
	$IsAdmin=$Utilisateur->ID_STATUS;
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
	
}
$Status=1;

?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml"><head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title><?php echo nom_site .' - '.$LeTitre; ?></title>
<meta content="" name="description" http-equiv="description" />
<meta content="" http-equiv="keywords" name="keywords" />

<link href="style.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" href="./scripts/assets/mBoxCore.css">
<link rel="stylesheet" href="./scripts/assets/mBoxModal.css">
<link rel="stylesheet" href="./scripts/assets/mBoxNotice.css">
<link rel="stylesheet" href="./scripts/assets/mBoxTooltip.css">
<link rel="stylesheet" href="./scripts/assets/themes/mBoxTooltip-Black.css">
<link rel="stylesheet" href="./scripts/assets/themes/mBoxTooltip-BlackGradient.css">
<link rel="stylesheet" href="cerabox/style/cerabox.css" media="screen" />
 <?php 

  echo '<script src="lang/'.LANGUAGE.'/lang.js"></script>';
  ?>
<script type="text/javascript"  src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCOlIur9hGh8g9hRfw5b9mU3oEWFKCPBR4&sensor=true">  </script>

<script src="./scripts/mootools-core-1.4.5-full-nocompat-yc.js"></script>
<script src="./scripts/more14compressed.js"></script>
<script src="./scripts/mBox.Core.js"></script>
<script src="./scripts/mBox.Modal.js"></script>
<script src="./scripts/mBox.Modal.Confirm.js"></script>
<script src="./scripts/mBox.Notice.js"></script>
<script src="./scripts/mBox.Tooltip.js"></script>

<script src="cerabox/cerabox.min.js"></script>
<script type="text/javascript" src="script.js"></script>
<script type="text/javascript" src="./scripts/masque.js"></script>
 
   
<link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
<script src="./scripts/jquery/jquery-1.12.1/jquery-1.12.1.js"></script>
<script src="./scripts/jquery/jquery-1.12.1/jquery-ui.js"></script>

<link rel="stylesheet" href="./scripts/jquery//jquery-1.12.1/jquery-ui.css"></link> 
<link rel="stylesheet" href="./scripts/jquery//jquery-1.12.1/jquery-ui.min.css"></link> 
<link rel="stylesheet" type="text/css" href="./scripts/jquery/DataTables/datatables.min.css"/>
<script type="text/javascript" src="./scripts/jquery/DataTables/datatables.js"></script>
<script>  jQuery.noConflict();</script>


<script>
<?php
                $Centres=new centre();
                $ListeCentre=$Centres->GetCarte();
                //unset($ListeCentre[0]);
                //$ListeCentre=array_values($ListeCentre);
                //$ListeCentre=$Centres->Standardise($ListeCentre);
                //on generer une liste JS des id des centres
                $Tab=array();
                for($i=0;$i<count($ListeCentre);$i++) {
                        if($ListeCentre[$i]['ID']!=2) { $Tab[]=$ListeCentre[$i]['ID']; }
                }
                echo ' ListeCentreJS=new Array('.implode($Tab,',').');';
               	$TempListeCentre=$Centres->GetOrdonner($Utilisateur->ID_GROUPE);
				$Tab=array();
				for($i=0;$i<count($TempListeCentre);$i++) { 
					$Tab[$TempListeCentre[$i]['ID']]=utf8_encode($TempListeCentre[$i]['nom']); 
				}
				
				echo var_to_js('ListeNomCentre',$Tab);
                $pagersTypes=new pagersTypes();
                $ListePagersTypes=$pagersTypes->GetAll();
                //on generer une liste JS des id des types pagers
                $Tab=array();
                for($i=0;$i<count($ListePagersTypes);$i++) {
                        $Tab[]=$ListePagersTypes[$i]['ID'];
                }
                echo '
                 ListePagersTypesJS=new Array('.implode($Tab,',').');
                ';
                $RecheDef=new centre();
                $RecheDef->CentreDefaut();
                $LongDef=$RecheDef->longitude;
                $LatDef=$RecheDef->latitude;
if($LatDef=='')$LatDef=0;
if($LongDef=='')$LongDef=0;
        ?>

function initialize() {
}
latitudeCentre=<?php echo $LatDef; ?>;
longitudeCentre=<?php echo $LongDef; ?>;
</script>


</head>

<body class="padding" style="background:#FFF;width:600px;">
<?php
		 
			include($LaPage);
		  
	?>
</body>
</html>
