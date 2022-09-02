<?php
session_start();
require('include/OBJECT.php');

if($_POST) {
	
    // ajoute la langue si nécéssaire
    if(trim($_REQUEST['langFromLogin']) != "") {
        $urllang = "&lang=".trim($_REQUEST['langFromLogin']);
    }
    
    $tempLog= new Utilisateur();
    $ID_USER=$tempLog->Login($_POST['email'],md5($_POST['mdp']));	
    if($ID_USER==false){
            header('Location: '.$_POST['URL'].$_POST['page'].'&codeRetour=4'.$urllang);		
    }
    else {	
            $_SESSION['ID_USER']=$ID_USER;
            header('Location: '.$_POST['URL'].$_POST['page'].'&codeRetour=1'.$urllang);
    }
}


?>