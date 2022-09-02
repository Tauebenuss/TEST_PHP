<?php



	$TempPage=new Page();
	if($_GET['p']){
            $TempPage->FindMe($_GET['p']);
	}
	else {
            $TempPage->FindMe("accueil");
	}
	
	$LaPage=$TempPage->chemin;
	$LeTitre=$TempPage->titre;

        
        /* controle des droit d'accés	*/
	if($TempPage->niveau!=0) {	
		/*if($Utilisateur->ID!=0) {	
			//$TempStatus=new Status($Utilisateur->ID_STATUS);
			if($TempStatus->priorite<$TempPage->niveau){
				exit;	
			}
		} else  exit;*/
	}
	

	
	
?>