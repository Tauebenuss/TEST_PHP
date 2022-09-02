<?php 
    session_start();
    include('include/OBJECT.php'); 
    require_once ('droit.php');
    if($_SESSION["ID_USER"]!='') {
            $Utilisateur=new Utilisateur($_SESSION['ID_USER']);
            $Status=$Utilisateur->ID_GROUPE;
            $IsAdmin=$Utilisateur->ID_STATUS;
            $acces=$Utilisateur->ID_ACCES;
            
            if($acces == "1" && $AmbuTab)
            {
                $AmbuTab = false;
            }
            if($acces == "2" && $Pager)
            {
                $Pager = false;
            }
            
            $TempCentre=new centre();
            $_SESSION["GetOrdonner"]=$TempCentre->GetOrdonnerInit($Utilisateur->ID_GROUPE);
            $GetOrdonner=$_SESSION["GetOrdonner"];
            $_SESSION["GroupeDeDroit"]=$TempCentre->GetDroit();
            $GroupeDeDroit=$_SESSION["GroupeDeDroit"];	
    }
    

?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-16" />
    <title><?php echo nom_site .' - '.$LeTitre; ?></title>
    <meta content="" name="description" http-equiv="description" />
    <meta content="" http-equiv="keywords" name="keywords" />
    <link rel="stylesheet" type="text/css" href="./scripts/assets/page.css" media="screen" />
    <link rel="stylesheet" type="text/css" href="./scripts/assets/calendar-eightysix-v1.1-default.css" media="screen" />
    <link rel="stylesheet" type="text/css" href="./scripts/assets/calendar-eightysix-v1.1-vista.css" media="screen" />
    <link rel="stylesheet" type="text/css" href="./scripts/assets/calendar-eightysix-v1.1-osx-dashboard.css" media="screen" />
    <link href="style.css" rel="stylesheet" type="text/css" />
    <link rel="stylesheet" href="./scripts/assets/mBoxCore.css">
    <link rel="stylesheet" href="./scripts/assets/mBoxModal.css">
    <link rel="stylesheet" href="./scripts/assets/mBoxNotice.css">
    <link rel="stylesheet" href="./scripts/assets/mBoxTooltip.css">
    <link rel="stylesheet" href="./scripts/assets/themes/mBoxTooltip-Black.css">
    <link rel="stylesheet" href="./scripts/assets/themes/mBoxTooltip-BlackGradient.css">
    <link rel="stylesheet" href="cerabox/style/cerabox.css" media="screen" />
    <link href="./scripts/datepicker/datepicker_dashboard/datepicker_dashboard.css" rel="stylesheet">      
    <link rel="stylesheet" href="./scripts/css/MooDropMenu.css">
    <?php if(ACTIVGGM==1) { ?>      
        <script type="text/javascript"  src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCOlIur9hGh8g9hRfw5b9mU3oEWFKCPBR4">  </script>
    <?php } ?>
    <script>
        <?php
                $Centres=new centre();		
                $ListeCentre= $Centres->GetCarte(); 
                $Tab=array();
                for($i=0;$i<count($ListeCentre);$i++) { 
                        $Tab[]="'".$ListeCentre[$i]['ID']."'"; 
                }
                echo ' ListeCentreJS=new Array('.implode(",",$Tab).');';
                $TempListeCentre=$Centres->GetOrdonner($Utilisateur->ID_GROUPE);
                $Tab=array();
                for($i=0;$i<count($TempListeCentre);$i++) { 
                        $Tab[$TempListeCentre[$i]['ID']]=addslashes(utf8_encode($TempListeCentre[$i]['nom'])); 
                }
                echo var_to_js('ListeNomCentre',$Tab);
                $pagersTypes=new pagersTypes();
                $ListePagersTypes=$pagersTypes->GetAll();
                //on generer une liste JS des id des types pagers
                $Tab=array();
                for($i=0;$i<count($ListePagersTypes);$i++) { 
                        $Tab[]=$ListePagersTypes[$i]['ID'];
                }
                echo 'ListePagersTypesJS=new Array('.implode($Tab,',').');';
                $RecheDef=new centre();
                $RecheDef->CentreDefaut();                               
                $LongDef=$RecheDef->longitude;
                $LatDef=$RecheDef->latitude;
                if($LatDef=='')$LatDef=0;
                if($LongDef=='')$LongDef=0;		
                if(ACTIVGGM==1) { 
        ?>
            
            
            latitudeCentre=<?php echo $LatDef; ?>;
            longitudeCentre=<?php echo $LongDef; ?>;
            myLatLng=new Array();
            beachMarker=new Array();
            beachMarkerVille=new Array();
            var mymap;
            var image=new Array();
            var tabImg=new Array();
            function initialisation(){
                var optionsCarte = {
                   center: new google.maps.LatLng(longitudeCentre,latitudeCentre ),
                   zoom: 9,
                   scrollwheel: true,
                   draggable: true,
                   streetViewControl: false,
                   panControl: true,
                   mapTypeControl:false,
                   mapTypeId: google.maps.MapTypeId.ROADMAP            
                };
                
                mymap = new google.maps.Map(document.getElementById("maps"), optionsCarte);
                var styles = [ { "featureType": "poi", "stylers": [ { "visibility": "off" } ] },{ "featureType": "road", "stylers": [ { "visibility": "on" } ] },{ "featureType": "administrative", "elementType": "labels", "stylers": [ { "visibility": "on" } ] },{ "featureType": "administrative", "elementType": "geometry.stroke", "stylers": [ { "visibility": "on" }, { "weight": 1 }, { "color": "#3D007B" } ] },{ "featureType": "landscape.man_made", "stylers": [ { "visibility": "on" } ] } ];
                mymap.setOptions({styles: styles});
                <?php 
                $indice=0;
                for($i=0;$i<count($ListeCentre);$i++) 
                {
                    
                    $rc = $Centres->countElements($ListeCentre[$i]['ID']);  																	  
                   ?>
                    
                    <?php 
                    if( ($Pager &&  ($rc[0]['pager']>0 || $rc[0]['support']>0)) || ($AmbuTab && $rc[0]['tablette']>0))
                    {
                    ?>
                        // maisons
                        var ImagesCentre = {
                            url: "drawimages/centre.php?IDCENTRE=<?php echo $ListeCentre[$i]['ID']; ?>",
                            size: new google.maps.Size(40, 80),
                            origin: new google.maps.Point(0,0),
                            anchor: new google.maps.Point(20,30)
                        };
                        var optionsMarqueur = {
                                     position: new google.maps.LatLng(<?php echo number_format($ListeCentre[$i]['longitude'],6); ?>,<?php echo number_format($ListeCentre[$i]['latitude'],6); ?>),
                                     map: mymap,
                                     icon:ImagesCentre
                        };  
                        beachMarker[<?php echo $indice; ?>] = new google.maps.Marker(optionsMarqueur);
                        google.maps.event.addListener(beachMarker[<?php echo $indice; ?>], 'click', function() {FindAndDisplay(<?php echo $ListeCentre[$i]['ID']; ?>);});                                 
                        <?php $indice++;?>       
                    <?php } ?>
                    <?php if ($Pager) { ?>

                        // état des support
                        var ImagesCentreEtat = {
                            url: "drawimages/centre-etat.php?IDCENTRE=<?php echo $ListeCentre[$i]['ID']; ?>",
                            size: new google.maps.Size(40, 80),
                            origin: new google.maps.Point(0,0),
                            anchor: new google.maps.Point(20,30)
                        };
                        optionsMarqueur = {
                            position: new google.maps.LatLng(<?php echo number_format($ListeCentre[$i]['longitude'],6); ?>,<?php echo number_format($ListeCentre[$i]['latitude'],6); ?>),
                            map: mymap,
                            title:'<?php _ee(addslashes($ListeCentre[$i]['nom'])); ?>',
                            icon:ImagesCentreEtat
                        };   
                        image[<?php echo $indice; ?>]=ImagesCentreEtat;                   
                        beachMarker[<?php echo $indice; ?>] = new google.maps.Marker(optionsMarqueur);
                        google.maps.event.addListener(beachMarker[<?php echo $indice; ?>], 'click', function() { FindAndDisplay(<?php echo $ListeCentre[$i]['ID']; ?>);});                    
                        <?php $indice++;?>
                    <?php } ?>
    
                    <?php if ($AmbuTab) { ?>
                        // état des tablettes
                        var ImagesTabEtat = {
                            url: "drawimages/tab_etat.php?IDCENTRE=<?php echo $ListeCentre[$i]['ID']; ?>",
                            size: new google.maps.Size(40, 80),
                            origin: new google.maps.Point(0,0),
                            anchor: new google.maps.Point(-22,30)
                        };                
                        optionsMarqueur = {
                            position: new google.maps.LatLng(<?php echo number_format($ListeCentre[$i]['longitude'],6); ?>,<?php echo number_format($ListeCentre[$i]['latitude'],6); ?>),
                            map: mymap,                          
                            icon:ImagesTabEtat
                        };     
                        image[<?php echo $indice; ?>]=ImagesTabEtat;  
                        beachMarker[<?php echo $indice; ?>] = new google.maps.Marker(optionsMarqueur);
                        google.maps.event.addListener(beachMarker[<?php echo $indice; ?>], 'click', function() { FindAndDisplay(<?php echo $ListeCentre[$i]['ID']; ?>);});                   
                        <?php $indice++; ?>
                    <?php }?>
                <?php }?>
            }  

            google.maps.event.addDomListener(window, 'load', initialisation);
        <?php } ?>       
    </script>
    <?php 
        echo '<script src="lang/'.LANGUAGE.'/lang.js"></script>';  
    ?>

    <link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
    <script src="./scripts/jquery/jquery-1.12.1/jquery-1.12.1.js"></script>
    <script src="./scripts/jquery/jquery-1.12.1/jquery-ui.js"></script>
    <link rel="stylesheet" href="./scripts/jquery//jquery-1.12.1/jquery-ui.css"></link> 
    <link rel="stylesheet" href="./scripts/jquery//jquery-1.12.1/jquery-ui.min.css"></link> 
    <link rel="stylesheet" type="text/css" href="./scripts/jquery/DataTables/datatables.min.css"/>
    <script type="text/javascript" src="./scripts/jquery/DataTables/datatables.js"></script>
    <script type="text/javascript" src="./scripts/jquery/jquery-1.12.1/datapicker-<?php echo LANGUAGE; ?>.js"></script>
    <script>  jQuery.noConflict();</script>
    <script src="./scripts/mootools-core-1.4.5-full-nocompat-yc.js"></script>
    <script src="./scripts/MooDropMenu.js"></script>
    <script src="./scripts/more14compressed.js"></script>
    <script src="./scripts/mBox.Core.js"></script>
    <script src="./scripts/mBox.Modal.js"></script>
    <script src="./scripts/mBox.Modal.Confirm.js"></script>
    <script src="./scripts/mBox.Notice.js"></script>
    <script src="./scripts/mBox.Tooltip.js"></script>
    <script src="cerabox/cerabox.min.js"></script>
    <script type="text/javascript" src="script.js"></script>
    <script type="text/javascript" src="./scripts/masque.js"></script>
    <script src="./scripts/datepicker/Locale.fr-FR.DatePicker.js" type="text/javascript"></script>
    <script src="./scripts/datepicker/Picker.js" type="text/javascript"></script>
    <script src="./scripts/datepicker/Picker.Attach.js" type="text/javascript"></script>
    <script src="./scripts/datepicker/Picker.Date.js" type="text/javascript"></script>
    <!--
    <script src="./scripts/Scrollable.js" type="text/javascript"></script>
    -->
    <script src="./scripts/Request.File.js"></script>
    <script src="./scripts/Form.MultipleFileInput.js"></script>
    <script src="./scripts/Form.Upload.js"></script>
    

</head>
<body style="background-color:<?php if($AmbuTab) {echo '#003F5A';}else{echo '#999';}?>;" >
<?php
    if($_GET['codeRetour']==4) {
            NoticeKO('Login error');
    } elseif($_GET['codeRetour']==1) {
            //NoticeOK('Identification reussi');
    }
?>
<?php if($Utilisateur) { ?>
    <div id="bar_menu_admin">
        <div id="header">  
            <a href="http://www.tplsystemes.com" target="blank" ><img style="margin-left:40px;" border=0 src="images/<?php echo $logo; ?>-blanc.png"  /></a>
            <?php if($AmbuTab) { ?>
                <div class="logo_petit" style="margin-left:40px;"  ><span>e</span> TMS</div>
            <?php }else{ ?>
                <div class="logo_petit" style="margin-left:40px;"  ><span>e</span> BIRDY</div>
            <?php } ?>					  
            <a href="unauth.php" class="bloc" style="width:40px;float:right;" ><img border=0  src="images/deconnexion.png"/></a>
            <div class="bloc" style="margin-left:10px;" > <strong><?php echo TradEbirdy('utilisateur'); ?> :</strong><br />
                <?php echo _e($Utilisateur->nom) .' '. _e(substr($Utilisateur->prenom,0,2).'.');?><br />
            </div>
            <?php 
                if(strpos(logo,'.')===false) {
                        echo '<img src="images/logo_defaut.png" border=0  id="MiniatureLogo"/>';
                } else {
                        echo '<img src="upload/thumb_'.logo.'"   border=0   id="MiniatureLogo" />';	
                }
            ?>
            <center>
            <ul id="nav">
            <?php if ($Pager) { ?>
                <li> <img border=0  src="images/cradle.png"/> <?php echo TradEbirdy('supports'); ?>
                    <ul>
                        <li  onclick="ReducteurSimple();ChargePage('index-ajax.php?p=gestion_support&onglet=liste');"><img src="images/liste.png"  /><?php echo TradEbirdy('liste'); ?></li>
                        <li  onclick="ReducteurSimple();ChargePage('index-ajax.php?p=gestion_support&onglet=standalone');"> <img src="images/standalone.png"  /><?php echo TradEbirdy('mode_standalone'); ?></li>
                        <li  onclick="ReducteurSimple();ChargePage('index-ajax.php?p=gestion_support&onglet=deploiement');"><img src="images/deploiement.png"  /><?php echo TradEbirdy('deploiement'); ?></li>            
                        <li  onclick="ReducteurSimple();ChargePage('index-ajax.php?p=gestion_support&onglet=suivi');"><img src="images/suivi.png"  /><?php echo TradEbirdy('suivi'); ?></li>
                     </ul>
                </li>        
                <li>
                    <img border=0  src="images/pagers.png"/><?php echo TradEbirdy('pagers'); ?>
                    <ul>
                        <li onclick="ReducteurSimple();ChargePage('index-ajax.php?p=gestion_pagers&onglet=liste');"><img src="images/liste.png"  /> <?php echo TradEbirdy('liste'); ?></li>
                        <li onclick="ReducteurSimple();ChargePage('index-ajax.php?p=gestion_pagers&onglet=import');"> <img src="images/import.png"  /><?php echo TradEbirdy('import'); ?></li>
                        <li>
                            <img border=0  src="images/deploiementPerso.png" /><?php echo TradEbirdy('personnalisation'); ?>
                            <ul>                
                                <li onclick="ReducteurSimple();ChargePage('index-ajax.php?p=deploiement_perso');"> <img src="images/deploiement.png"  /><?php echo TradEbirdy('deploiement'); ?></li>
                                <li onclick="ReducteurSimple();ChargePage('index-ajax.php?p=suivi_perso');"><img src="images/suivi.png"  /><?php echo TradEbirdy('suivi'); ?></li>
                            </ul>
                        </li>
                        <li>
                            <img border=0  src="images/deploiementSoft.png"  /><?php echo TradEbirdy('firmware'); ?>
                            <ul>
                                <li onclick="ReducteurSimple();ChargePage('index-ajax.php?p=deploiement');"> <img src="images/deploiement.png"  /><?php echo TradEbirdy('deploiement'); ?></li>
                                <li onclick="ReducteurSimple();ChargePage('index-ajax.php?p=suivi');"><img src="images/suivi.png"  /><?php echo TradEbirdy('suivi'); ?></li>
                            </ul>
                        </li>            
                    </ul>
                </li>
            <?php } ?>    
            <?php if ($AmbuTab) { ?>
                <li>
                    <img border=0  src="images/IcoAmbuTab.png"  >AmbuTab
                    <ul>
                        <li onclick="ReducteurSimple();ChargePage('index-ajax.php?p=gestion_ambutab&onglet=liste');"><img src="images/liste.png"  /> <?php echo TradEbirdy('liste'); ?></li>
                        <li onclick="ReducteurSimple();ChargePage('index-ajax.php?p=gestion_tab_update');"> <img src="images/deploiement.png"  /><?php echo TradEbirdy('deploiement'); ?></li>
                        <li onclick="ReducteurSimple();ChargePage('index-ajax.php?p=gestion_tab_suivi');"><img src="images/suivi.png"  /><?php echo TradEbirdy('suivi'); ?></li>
                        <li onclick="ReducteurSimple();ChargePage('index-ajax.php?p=fiche_tab_ticket');"><img src="images/ticket.png"  /><?php echo TradEbirdy('tickets'); ?></li>
                    </ul>
                </li>
            <?php } ?>
            <?php if ($IsAdmin==1) { ?>
                <li >
                <img border=0  src="images/reglage.png"/><?php echo TradEbirdy('parametres'); ?>
                <ul>
                    <li onclick="ReducteurSimple();ChargePage('index-ajax.php?p=reglage&onglet=groupe');"> <img src="images/menu/groupe.png"  /><?php echo TradEbirdy('groupes'); ?></li>
                    <li onclick="ReducteurSimple();ChargePage('index-ajax.php?p=reglage&onglet=profil');"> <img src="images/menu/profil.png"  /><?php echo TradEbirdy('profils'); ?></li>
                    <li onclick="ReducteurSimple();ChargePage('index-ajax.php?p=reglage&onglet=user');"> <img src="images/menu/utilisateur.png"  /><?php echo TradEbirdy('utilisateurs'); ?></li>
                    <li onclick="ReducteurSimple();ChargePage('index-ajax.php?p=reglage&onglet=dwld');"> <img src="images/menu/telechargement.png"  /><?php echo TradEbirdy('_upload'); ?></li>
                    <?php if ($Pager) { ?>
                        <li onclick="ReducteurSimple();ChargePage('index-ajax.php?p=reglage&onglet=defaut');"> <img src="images/menu/version_min.png"  /><?php echo TradEbirdy('version_min'); ?></li>    
                        <li onclick="ReducteurSimple();ChargePage('index-ajax.php?p=reglage&onglet=defautperso');"> <img src="images/menu/version_min.png"  /><?php echo TradEbirdy('version_min_perso'); ?></li>
                        <li onclick="ReducteurSimple();ChargePage('index-ajax.php?p=reglage&onglet=soft');"> <img src="images/miseajour.png"  /><?php echo TradEbirdy('gest_soft_pager'); ?></li>
                    <?php } ?>	
                    <?php if ($AmbuTab) { ?>
                        <li onclick="ReducteurSimple();ChargePage('index-ajax.php?p=reglage&onglet=softAmbuTab');"> <img src="images/AmbuTab.png"  /><?php echo TradEbirdy('gest_soft_ambutab'); ?></li>
                    <?php } ?>	
                    <?php if ($Pager) { ?>
                        <li onclick="ReducteurSimple();ChargePage('index-ajax.php?p=reglage&onglet=groupesoft');"> <img src="images/menu/groupe.png"  /><?php echo TradEbirdy('gest_group_soft_pager'); ?></li>
                        <li onclick="ReducteurSimple();ChargePage('index-ajax.php?p=reglage&onglet=perso');"> <img style="height:20px;" src="images/perso.png"  /><?php echo TradEbirdy('gest_perso_pager'); ?></li>      
                        <li onclick="ReducteurSimple();ChargePage('index-ajax.php?p=reglage&onglet=groupeperso');"> <img style="height:20px;" src="images/menu/groupe.png"  /><?php echo TradEbirdy('gest_group_perso_pager'); ?></li>      
                    <?php } ?>	                    
                    <li onclick="ReducteurSimple();ChargePage('index-ajax.php?p=stats_global');"> <img src="images/menu/stats.png"  /><?php echo TradEbirdy('stats'); ?></li>
                    <li onclick="ReducteurSimple();ChargePage('index-ajax.php?p=reglage&onglet=sys_alert');"><img style="height:20px; width:20px; margin-left:5px; margin-right: 20px; " src="images/Sign-Alert-icon.png" /><span <?php if($nbAS!=0) { echo 'style="color:red;"'; } ?> ><?php echo TradEbirdy('histo_sys'); ?></span></li>
                    <li onclick="ReducteurSimple();ChargePage('index-ajax.php?p=reglage&onglet=options');"> <img src="images/menu/reglage.png"  /><?php echo TradEbirdy('options'); ?></li>
                </ul>
                </li>
            <?php } ?>
            </ul>
            </center>
        </div>
    </div>
    <div id="content">
        <div id="main">
            <div id="left-bloc">
                <?php if(ACTIVGGM==1) { ?>
                    <div id="reducteur" onclick="Reducteur()">&bull;<br />
                        &bull;<br />
                        &bull;<br />
                        &bull;<br />
                        &bull;<br />
                    </div>
                <?php 
                } 
                $GroupeDefaut=new centre(1);
                ?>
                <h1>
                    <?php _ee($GroupeDefaut->nom);?>
                    <br />
                    <?php echo NOMDEP; ?>
                </h1>
                <div id="ListeCEntreMenu" >
                    <?php
                        $TAbDesStatusS=$GroupeDefaut->GetNbStatusGlobalCentre('msa');
                        $TAbDesStatusP=$GroupeDefaut->GetNbStatusGlobalCentre('prs');
                        $ListeCentre=$TempListeCentre;
                        for($i=0;$i<count($ListeCentre);$i++) {                
                            $rc = $Centres->countElements($ListeCentre[$i]['ID']);  																	  
                            $GroupeDefaut->ID = $ListeCentre[$i]['ID'];
                            $PersoEnc = $GroupeDefaut->GetResultEnc("prs");
                            $SoftEnc= $GroupeDefaut->GetResultEnc("msa");
                            $majtab= $GroupeDefaut->GetResultEnc("tab");
                            $ParamEnc= $GroupeDefaut->GetParamEnc();
                            if( ceil($i/2) != $i/2 ) $ClassBg='ligneFonce'; else $ClassBg='ligneClair';               
                            
                            if( ($Pager && ($rc[0]['pager']>0 || $rc[0]['support']>0)) || ($AmbuTab && $rc[0]['tablette']>0))
                            {
                                echo '<div class="EnTete  '.$ClassBg.' drop" id="EnteteCentre'._e($ListeCentre[$i]['ID']).'">';
                                echo '<table width="100%" border="0"><tr height="25px" ><td width="25" style="vertical-align:middle;"><img src="images/drop_up.png" style="width:25px; height:25px;" ></td>';
                                echo '<td width="100%" style="vertical-align:middle;"><p>'._e($ListeCentre[$i]['nom']).'</p></td>';
                                if($PersoEnc > 0 || $SoftEnc> 0 || $ParamEnc>0)
                                {
                                    echo '<td><img  height="26" width="26" border=0  src="images/encours.png"  ></td>';
                                    //echo '<img  class="plus" style="margin-right:100px;" height="26" width="26" border=0  src="images/encours.png"  >';
                                }                                                               
                                if($Pager && $rc[0]['pager']>0)
                                {
                                    echo '<td><img src="images/pagers.png"  width="35px" height="25px" border=0 onclick="ReducteurSimple();ChargePage(\'index-ajax.php?p=gestion_pagers&IDC='._e($ListeCentre[$i]['ID']).'&onglet=liste\');"></td>';
                                }else{
                                    //echo '<td><img src="images/vide.png"  width="35px" height="25px" border=0></td>';
                                }
                                if($Pager && $rc[0]['support']>0)
                                {
                                    echo '<td><img src="images/cradle.png"  width="35px" height="25px" border=0 onclick="ReducteurSimple();ChargePage(\'index-ajax.php?p=gestion_support&IDC='._e($ListeCentre[$i]['ID']).'&onglet=liste\');"></td>';		
                                }else{
                                    //echo '<td><img src="images/vide.png"  width="35px" height="25px" border=0></td>';
                                }
                                if ($AmbuTab && $rc[0]['tablette']>0)
                                {
                                    echo '<td><img src="images/IcoAmbuTab.png"  width="35px" height="25px" border=0 onclick="ReducteurSimple();ChargePage(\'index-ajax.php?p=gestion_ambutab&IDC='._e($ListeCentre[$i]['ID']).'&onglet=liste\');"></td>';
                                }else{
                                    //echo '<td><img src="images/vide.png"  width="35px" height="25px" border=0></td>';
                                }
                                echo '</tr></table>';
                                echo '</div>';
                               // echo '<img src="images/pagers.png" class="plus" style="margin-top:-42px;" height="35" border=0 onclick="ReducteurSimple();ChargePage(\'index-ajax.php?p=gestion_pagers&IDC='._e($ListeCentre[$i]['ID']).'&onglet=liste\');">';
                               // echo '<img src="images/cradle.png" class="plus" style="margin-right:50px;" height="35" border=0 onclick="ReducteurSimple();ChargePage(\'index-ajax.php?p=gestion_support&IDC='._e($ListeCentre[$i]['ID']).'&onglet=liste\');">';
                                // bloc
                                echo '<div class="dropBloc">';
                                echo '<div class="contentPicto xLink" onclick="ReducteurSimple();ChargePage(\'index-ajax.php?p=suivi_perso&IDC='.$ListeCentre[$i]['ID'].'\');">'.TradEbirdy('Perso en attente').' : '.$PersoEnc.'</div>';
                                echo '<div class="contentPicto xLink" onclick="ReducteurSimple();ChargePage(\'index-ajax.php?p=gestion_pagers&IDC='._e($ListeCentre[$i]['ID']).'&onglet=liste\');">'.TradEbirdy('Param en attente').' : '.$ParamEnc.'</div>';
                                echo '<div class="contentPicto xLink" onclick="ReducteurSimple();ChargePage(\'index-ajax.php?p=suivi&IDC='.$ListeCentre[$i]['ID'].'\');"><u>'.TradEbirdy('Soft en attente').' : '.$SoftEnc.'</u></div>';
                                echo '<div class="contentPicto xLink" onclick="ReducteurSimple();ChargePage(\'index-ajax.php?p=gestion_ambutab&onglet=liste&IDC='.$ListeCentre[$i]['ID'].'\');"><u>'.TradEbirdy('majtab').' : '.$majtab.'</u></div>';
                                echo '</div>';
                            }
                        }
                    ?>
                </div>
            </div>        
            <div id="right-bloc">
                <div id="maps" <?php if(ACTIVGGM==0) { ?> style="background-image:url('upload/fond_de_carte.jpg');"  <?php } ?>>
                <?php if(ACTIVGGM==0) {
                    $date = new DateTime();
                    for($i=0;$i<count($ListeCentre);$i++) { 
                            echo '<div data-indice="'.$i.'" data-IDC="'.$ListeCentre[$i]['ID'].'" class="WGGM_curs" 
                            style="background-image:url(\'drawimages/centre-etat.php?IDCENTRE='.$ListeCentre[$i]['ID'].'&date='.$date->getTimestamp().'\');top:'.($ListeCentre[$i]['pos_y']+15).'px;left:'.($ListeCentre[$i]['pos_x']-5).'px;" ><img src="drawimages/centre.php?IDCENTRE='.$ListeCentre[$i]['ID'].'"></div>'; 

                    } 
                }     
                ?>
                </div>
                <div id="CradleNonRef"> <a href="index-pop.php?p=affectation_cradles"  class="ceraBox"><?php echo TradEbirdy('cradles_non_affectes'); ?> </a> </div>
                <?php
                    $SysAlert=new histo();
                    $Tab=$SysAlert->GetAllEnc(2);
                    $Tab2=$SysAlert->GetAllEnc(3);
                    $nbAS=count($Tab)+count($Tab2);
                ?>
                <div id="menu_glissant">
                    <?php include($LaPage); ?>
                </div>
            </div>
        </div>
    </div>
    <div id="footer">
        <div id="alert">
            <div id="BouttonGlobalAlerteCP" style="background-color: <?php if($nbAS!=0) { echo '#A0141B'; } else { echo '#409640';}  ?>; border:1px black  dashed;margin-left:10px;margin-top:10px; " > 
                <img id="ImgGlobalAlerteCP" src="images/alert<?php if($nbAS!=0) { echo '-gros'; } else { echo '_ok';}  ?>.png" height="40" onclick="ChargePage('index-ajax.php?p=liste_global_alert');" style="cursor:pointer; margin-right:10px; margin-top:4px;" /> 
            </div>
        </div>    
        <?php
            $SysAlert=new histo();
            $Tab=$SysAlert->GetAllEnc(1);
            $nbAS=count($Tab);
        ?>
        <div id ="language">
               <a href="index.php?lang=fr"><img src="images/fr.png" class="drapeau" /></a> 
               <a href="index.php?lang=en"><img border=0  src="images/en.png" class="drapeau" /></a> 
               <a href="index.php?lang=es"><img border=0  src="images/es.png" class="drapeau" /></a>
               <a href="index.php?lang=de"><img border=0  src="images/de.png" class="drapeau" /></a> 
        </div>
        <div id="copyright">
            <span class="copyright" style="float:right;color:white;">eTMS V<?php echo $version_site; ?>&nbsp;&nbsp;</span>

        </div>
        <div id="CompteARebour"></div>
        <script>
            <?php if(ACTIVGGM==1) { ?>
                //initialize();
                window.setInterval(function () {RefrashMarker(); },10000);
            <?php } else {  ?>
                window.setInterval(function () {RefrashMarkerClassique(); },10000);
                $$('.WGGM_curs').addEvent('click', function(){
                        FindAndDisplay(this.get("data-IDC"));
                });
            <?php } ?>
            BoucleRecherche();
            //ScrollMenu();
        </script> 
    </div>
<?php } else { 
    include('login.php'); 
    PurgeSql();
} ?>
</body>
</html>
