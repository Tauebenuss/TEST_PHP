        
     



KeyWordRecherche=LanguageEbirdy['taper_recherche'];

function Info(message) {
		var MyBox = new mBox.Notice({
			type: 'info',
			position: {
				x: 'center',
				y: 'top'
			},
			offset: { y:100 },
			delayClose: 1400,
			move:true,
			width:400,
			content: message
		});
		}

//Information ok 
function NoticeOK(message) {
		var MyBox = new mBox.Notice({
			type: 'ok',
			position: {
				x: 'center',
				y: 'top'
			},
			offset: { y:100 }, 
			delayClose: 1000,
			move:false,
			width:400,
			content: message
		});
		}
function NoticeKO(message,duree=2000) {
		var MyBoxEr = new mBox.Notice({
			type: 'error',
			position: {
				x: 'center',
				y: 'top'
			},
			offset: { y: 150 },
			delayClose: duree,
			width:400,
			move:true,
			content: message
		});
		}
function AffinageSuivi() {
	ChargeContenu('SuiviDeploiSoft','index-ajax.php?p=liste_suivi&serialNumber='+$('serialNumber').get('value')+'&refCentre='+$('refCentre').get('value')+'&date_debut='+$('date_debut').get('value')+'&date_fin='+$('date_fin').get('value')+'&pagerType='+$('pagerType').get('value')+'&userName='+$('userName').get('value'));
}
function AffinageSuiviTab() {   
	ChargeContenu('SuiviDeploiSoft','index-ajax.php?p=liste_suivi_tab&ident='+$('identification').get('value')+'&refCentre='+$('refCentre').get('value')+'&date_debut='+$('date_debut').get('value')+'&date_fin='+$('date_fin').get('value'));
}
function AffinageSuiviTicket() {  
 
	ChargeContenu('SuiviDeploiTicket','index-ajax.php?p=liste_suivi_ticket&ident='+$('identification').get('value')+'&refCentre='+$('refCentre').get('value')+'&date_debut='+$('date_debut').get('value')+'&date_fin='+$('date_fin').get('value')+'&avecupload='+$('avecupload').get('checked')+'&sansupload='+$('sansupload').get('checked')    );
}
function AffinageSuiviSupport() {
	ChargeContenu('SuiviDeploiSoft','index-ajax.php?p=liste_suivi_support&serialNumber='+$('serialNumber').get('value')+'&refCentre='+$('refCentre2').get('value')+'&date_debut='+$('date_debut').get('value')+'&date_fin='+$('date_fin').get('value'));
	
}
function AffinageSuiviPersos() {
	ChargeContenu('SuiviDeploiSoft','index-ajax.php?p=liste_suivi_persos&serialNumber='+$('serialNumber').get('value')+'&refCentre='+$('refCentre').get('value')+'&date_debut='+$('date_debut').value+'&date_fin='+$('date_fin').get('value')+'&pagerType='+$('pagerType').get('value')+'&userName='+$('userName').get('value'));	
}
function FindInTab(IDC,IDS) {
	var resultat=false;
	var TabCentreSelect=eval('TabCentreSelect'+IDC);
	if(TabCentreSelect.length>0) {
		if(TabCentreSelect.indexOf(parseFloat(IDS))!=-1) {
			 resultat=true;
		}else {
			for(var i=0;i<TabCentreSelect.length;i++) {
				//alert(TabCentreSelect[i]);
				resultat=FindInTab(TabCentreSelect[i],IDS);
				if(resultat==true) break;
			}
		}
	}
	return resultat;
}
function ValideSegement() {
	construc='';
	construcID='';
	ObjListe=$('ListeSoft');
	ObjListe.getElements('input').each(function (el) {
		if(el.checked==true) {
			construc+=' / '+el.get('value');
			construcID+='/'+el.get('id').substr(5,el.get('id').length);
		}
		type=el.getAttribute('data-type')
		typeText=el.getAttribute('data-type-text')
	});
	parent.$('SegSel').set('value',	construcID);
	parent.$('SegmentSel').set('html',	construc.substr(3,construc.length));
	parent.$('select_id_pager').set('html',typeText);
	
	parent.Search(parent.$('SelectType'+type),'ListePAgers');
	parent.CeraBoxWindow.close();
}
function isset (variable) {
  return (typeof variable != 'undefined');
}

var TabElementSearch=new Array();
var TabSearch=new Array();


// init du tableau
function Search_init()
{
    delete(TabSearch);
    TabSearch=new Array();
}
// modification FC
// liste est le'id de la liste à modifier

function Search (element,liste) {
    
    // element est la zone qui contient la valeur pour afficher dans la liste uniquement ces éléments
    // 
    // element.tagName = type de l'élément : input
    // recherche = element à afficher
    if(element.tagName=='SELECT' || element.tagName=='INPUT') {
        recherche=element.value.trim(); 
    } else { 
        recherche=element.getAttribute('data-select').trim();  
    }
        
    // name_element = versionFpager
    var name_element = element.get('id');
              
        
         // tableau = "nom du tableau|nom element|valeur element
        var trouve = false;
        
    
        for(n=0; n < TabSearch.length; n++)
        {
            dec = TabSearch[n].split("|");
            if(dec[0] == liste && dec[1] == name_element)
            {
                trouve = true;
                if (recherche == "")
                {
                    TabSearch.splice(n, 1);
                }else{
                    TabSearch[n] = dec[0]+"|"+dec[1]+"|"+recherche;   
                }
                break;
            }       
        }
        
        if(!trouve)
        {   
            //                              ListePAgers | VersionFPager | code
            TabSearch[TabSearch.length] = liste+"|"+name_element+"|"+recherche;   
        }
                
        if(!TabElementSearch[liste]) { 
            TabElementSearch[liste]=new Array(); 
        }          
       
        ListeS=liste;       // tableau à mettre à jour.        
        ElementSelect=element.get('id');                
        liste=$(liste).getElements('li');
        if (liste.length>0) {
            liste.each(function (el){
                titre= el.getAttribute('data-search'); // element recherchable separé par -
                groupe= el.getAttribute('data-groupe'); // ?  
                if(titre) {
                    titre=titre.toUpperCase();
                    recherche=recherche.toUpperCase()
                    el.setStyle('display','block');
                    for(n=0; n < TabSearch.length; n++)
                    {
                        dec = TabSearch[n].split("|");
                        dec[2] = dec[2].toUpperCase();
                        // dec[0] = tableau name
                        // dec[1] = type de paramétre
                        // dec[2] = valeur                                  
                        // alert(titre + " --- " + dec[2].toUpperCase() + " ///// " + titre.indexOf(dec[2])); 
                        if(dec[0] == ListeS && dec[2] != "")
                        {
                            arrayvaleur = dec[2].split(",");
                            if((dec[1].toUpperCase() == "LIST_ID_GROUPE" && arrayvaleur.indexOf(groupe) < 0)||(dec[1].toUpperCase() != "LIST_ID_GROUPE" && titre.indexOf(dec[2]) < 0))
                            {
                                el.setStyle('display','none');
                            }   
                        }                                                  
                    }                                                							
                }						
            });				
        }
}

function SearchCentre (element,liste) {
		if(!TabElementSearch[liste]) { TabElementSearch[liste]=new Array(); }
		
		ListeS=liste;
		ElementSelect=element.get('id');
		
		liste=$(liste).getElements('li');
        if (liste.length>0) {
                liste.each(function (el){
                        groupe= el.getAttribute('data-groupe');
                        ISCherchable =el.getAttribute('data-ischerchable');
						
						if(TabElementSearch[ListeS][el.get('id')]!=ElementSelect && TabElementSearch[ListeS][el.get('id')] &&  el.style.display=='none') { ISCherchable='none'; }
						else {TabElementSearch[ListeS][el.get('id')]=ElementSelect; }
						
                        if(ISCherchable!='none') {
                                recherche=element.getAttribute('data-select');
                                if(FindInTab(recherche,groupe)==true || groupe==recherche) {
                                         el.setStyle('display','block');
										
                                } else {
                                        el.setStyle('display','none');
                                }


                        }
                });
        }
}




function SearchTable (element,liste) {
    
                  
        if(element.tagName=='SELECT' || element.tagName=='INPUT') {     
            recherche=element.value 
          
        }
        else { recherche=element.getAttribute('data-select');  }
		
        if(!TabElementSearch[liste]) { TabElementSearch[liste]=new Array(); }
        ListeS=liste;
        ElementSelect=element.get('id');
		
		
        liste=$(liste).getElements('tr');
        if (liste.length>0) {
            
                liste.each(function (el){
                        titre= el.getAttribute('data-search');
                        groupe= el.getAttribute('data-groupe');
                        ISCherchable =el.getAttribute('data-ischerchable');
						
			
                  
                    
							if(TabElementSearch[ListeS][el.get('id')]!=ElementSelect && TabElementSearch[ListeS][el.get('id')] &&  el.style.display=='none') { ISCherchable='none'; }
							else {TabElementSearch[ListeS][el.get('id')]=ElementSelect; }
 	                       if(ISCherchable!='none') {

                                        if(titre) {
                                                titre=titre.toUpperCase();
                                                recherche=recherche.toUpperCase()
                                                if(element.tagName== 'SELECT') {
                                                        var reg1=new RegExp("("+recherche+")","i");
                                                        if(titre.match(reg1)) { el.setStyle('display',''); ;}
                                                        else { el.setStyle('display','none'); }
                                                }else {
                                                        var reg1=new RegExp("("+recherche+")","i");
                                                        if(titre.match(reg1)) { el.setStyle('display','');}
                                                        else { el.setStyle('display','none'); }
                                                }
												
                                        }
                                        if(recherche=='' || recherche==KeyWordRecherche.toUpperCase() ) {el.setStyle('display',''); }
                        }
						
                });
				
        }
}
function refuserToucheEntree(event)
{
    // Compatibilité IE / Firefox
    if(!event && window.event) {
        event = window.event;
    }
    // IE
    if(event.keyCode == 13) {
        event.returnValue = false;
        event.cancelBubble = true;
    }
    // DOM
    if(event.which == 13) {
        event.preventDefault();
        event.stopPropagation();
    }
}




function SearchTypePF (liste,element) {
	liste=$(liste).getElements('li');
	if (liste.length>0) { 
		liste.each(function (el){
			titre= element.get('value');
			recherche=el.get('data-search');
			
			titre=titre.toUpperCase();
			recherche=recherche.toUpperCase()
			var reg1=''+titre+'';
			
			if(recherche.match(reg1)) { el.set('data-ischerchable',''); el.setStyle('display','block'); }
			else { el.set('data-ischerchable','none'); el.setStyle('display','none');}	
		
		});
	}
}
function SelAllSearch(element,combo,liste,allOrNot) {
	listeBase=liste;
	liste=$(liste).getElements('li*[data-search]');
	if (liste.length>0) { 
		liste.each(function (el){
			//ISCherchable =el.get('Search');
			if(allOrNot==1) {
				el.set('data-ischerchable','on');
				el.setStyle('display','block');
			} else {
				el.set('data-ischerchable','none');
				el.setStyle('display','none');
			}
			
		});
	}
	if(allOrNot==1) {
		$('select_id_groupe').set('html','');
		//$('id_groupe').set('value','');
	} else {
		
		$('select_id_groupe').set('html',ListeNomCentre[$('id_groupe').get('value')]);
		
	}
	
}
function SearchListe (element,liste) {
	recherche=element.value
	liste=$(liste).getElements('li');
	
	if (liste.length>0) { 
		liste.each(function (el){
			titre= el.getAttribute('data-search');
			
			if(titre) {
				titre=titre.toUpperCase();
				
				recherche=recherche.toUpperCase()
				var reg1=new RegExp("("+recherche+")","i");
				
				if(titre.match(reg1)) { el.style.display='block'; }
				else { el.style.display='none';}
			}
			
			if(recherche=='') {el.style.display='block'; }
			
		});
	}
	
}
function SetSupportHorsSA(ID) { 
var myRequest= new Request({url: 'ajax/refresh_support.php',
			 method: 'get',
			 data: 'ID='+ID,
			  onSuccess:function(responseText){
eval(responseText);
}
			 }).send();		
}
function SetPersoDef(IDSOFT,IDGROUPE,IDTYPE) { 
var myRequest= new Request({url: 'ajax/SetPersoDef.php',
			 method: 'get',
			 data: 'IDPERSO='+IDSOFT+'&IDGROUPE='+IDGROUPE+'&IDTYPE='+IDTYPE,
			  onSuccess:function(responseText){
				  
NoticeOK(LanguageEbirdy['mise_a_jour_faite']);

}
			 }).send();		
}

function SetSoftDef(IDSOFT,IDGROUPE,IDTYPE) { 
    
var myRequest= new Request({url: 'ajax/SetSoftDef.php',
			 method: 'get',
			 data: 'IDSOFT='+IDSOFT+'&IDGROUPE='+IDGROUPE+'&IDTYPE='+IDTYPE,
			  onSuccess:function(responseText){
				  
NoticeOK(LanguageEbirdy['mise_a_jour_faite']);
}
			 }).send();		
}

function updateTabSoft(idSoft,mandatory) { 
    var myRequest= new Request({url: 'ajax/SetAmbuTabSoftDef.php',
        method: 'get',
        data: 'IDSOFT='+idSoft+'&VALUE='+mandatory,
        onSuccess:function(responseText){}
    });
    myRequest.send();
}


function file(fichier){
     		var tab=fichier.split("?"); 
		var ResultaRequete;

		//var myHTMLRequest = new Request.HTML({url: tab[0]}).get( tab[1]);
		 myRequest = new Request({
			method: 'get',
			data: tab[1],
			url:tab[0],
			onSuccess:function (reponseXhr){ 
                         }
			});
        myRequest.send();
		
}
function MiseAJourDiv(fichier,element,obj){
     	
		$(element).set('html','<center style="margin-top:50px"><img src="images/loading.gif"></center>')
		var tab=fichier.split("?"); 
		
		var ResultaRequete;
		//var myHTMLRequest = new Request.HTML({url: tab[0]}).get( tab[1]);
		 myRequest = new Request({
			method: 'get',
			data: tab[1],
			url:tab[0],
			onSuccess:function (reponseXhr){
				
				$$('.OngletFichePopUp_hover').set('class','OngletFichePopUp');
				$$('.OngletFichePopUp').each ( function (el) {
					if(el.get('title')==obj.title) { el.set('class','OngletFichePopUp_hover'); }	
				});
				obj.className= "OngletFichePopUp_hover"; 
				$(element).set('html',reponseXhr);	
                                                                
                                if(typeof(initlstmaj) == "function"){
                                    initlstmaj();
                                }																
			}
			});
        myRequest.send();
		
}

// function d'appel ajax d'export des données
// element : n°serie produit
// type : type de données (0: evenement pager, 1: message pager ...)
function ExportCSV(element,type){
    location.href= "frontoffice/exportcsv.php?t="+type+"&e="+element
}

function formateTel(bloc) {
var txt=bloc.value;
txt=txt.replace(/ /g,"");
var rst=txt.replace(/(\d{2})(?!$)/g,"$1 ");
bloc.value=rst;
}

function VerifMail(ID)
{
	a = document.getElementById(ID).value;
	if(a!='') {
	valide1 = false;
	
	for(var j=1;j<(a.length);j++){
		if(a.charAt(j)=='@'){
			if(j<(a.length-4)){
				for(var k=j;k<(a.length-2);k++){
					if(a.charAt(k)=='.') valide1=true;
				}
			}
		}
	}
	if(valide1==false) alert(LanguageEbirdy['veuillez_adrresse_valide']);
	return valide1;
	}
}




var TabActiv= new Array();
var TabVal= new Array();
function ActiveClickEdit(div,maclass,chan,ID,size) {
		valeur= document.getElementById(div).innerHTML;
		blursup=document.getElementById(div).getAttribute('name');
		blurFin=document.getElementById(div).getAttribute('role');
		
		if(blursup=='') blursup=true;
		if (TabActiv[div]!=1) {
			document.getElementById(div).innerHTML='<input size="'+size+'" class="click_edit_input"  type="text" value="'+valeur+'" onblur="if('+blursup+'!=false) ValidClickEdit(\''+div+'\',\''+maclass+'\',\''+chan+'\',\''+ID+'\');'+blurFin+'" name="Mod'+div+'" id="Mod'+div+'"  onkeyup="if(event.keyCode==13){ if('+blursup+'!=false){ ValidClickEdit(\''+div+'\',\''+maclass+'\',\''+chan+'\',\''+ID+'\');'+blurFin+'}}" name="Mod'+div+'" id="Mod'+div+'" ><img style="float:left;cursor:pointer;" src="images/save.png">   ';
		TabActiv[div]=1;
		TabVal[div]=valeur;
		document.getElementById('Mod'+div).focus();
		}
}

function ValidClickEdit(div,maclass,chan,ID) {
	
		valeur=document.getElementById('Mod'+div).value;
	
		(file('ajax/ClickEdit.php?class='+escape(maclass)+'&chan='+escape(chan)+'&ID='+escape(ID)+'&valeur='+escape(valeur)));
		document.getElementById(div).innerHTML=(valeur);
		delete TabActiv[div];
		delete TabVal[div];
}
function SetValue(liste,maclass,chan,ID,alertok) {
	
		valeur=document.getElementById(liste).value;
	
		(file('ajax/ClickEdit.php?class='+escape(maclass)+'&chan='+escape(chan)+'&ID='+escape(ID)+'&valeur='+escape(valeur)));
		if(document.getElementById(liste+'_HL')) {
	//	new Effect.Highlight(document.getElementById(liste+'_HL'), { startcolor: '#4dff5a',endcolor: '#FFFFFF',duration: 3 });
		$(liste+'_HL').highlight('#77A423')
		} else {
			if(alertok!=1) {
				NoticeOK(LanguageEbirdy['mise_a_jour_effectue']);	
			}
		}
}
function SetParam(clef,chan) {
		valeur=chan.value;
		if(chan.get('title') != valeur) {

			(file('ajax/Varglobal.php?clef='+clef+'&valeur='+encodeURI(valeur)));
			if(document.getElementById(clef+'_HL')) {
		 	//new Effect.Highlight(document.getElementById(liste+'_HL'), { startcolor: '#4dff5a',endcolor: '#FFFFFF',duration: 3 });
			$(liste+'_HL').highlight('#77A423')
			} else {
				NoticeOK(LanguageEbirdy['mise_a_jour_faite']);	
			}
			chan.set('title',valeur);
		}
}
function SetValueTiny(liste,maclass,chan,ID) {
	tinyMCE.triggerSave(true, true);
		valeur=document.getElementById(liste).value;
	
		(file('ajax/ClickEdit.php?class='+escape(maclass)+'&chan='+escape(chan)+'&ID='+escape(ID)+'&valeur='+escape(valeur)));
		if(document.getElementById(liste+'_HL')) {
	//	new Effect.Highlight(document.getElementById(liste+'_HL'), { startcolor: '#4dff5a',endcolor: '#FFFFFF',duration: 3 });
		$(liste+'_HL').highlight('#77A423')
		}
}
function SetValuePerso(maclass,chan,ID,valeur) {

	(file('ajax/ClickEdit.php?class='+escape(maclass)+'&chan='+escape(chan)+'&ID='+escape(ID)+'&valeur='+escape(valeur)));
		
}

function SetDateNow(maclass,chan,ID) {
	
		
		(file('ajax/SetDateNow.php?class='+escape(maclass)+'&chan='+escape(chan)+'&ID='+escape(ID)));
		
}
function SetCheck(liste,maclass,chan,ID) {
	
	
		if (document.getElementById(liste).checked==true) {
			(file('ajax/ClickEdit.php?class='+escape(maclass)+'&chan='+escape(chan)+'&ID='+escape(ID)+'&valeur=1'));
		} else {
			(file('ajax/ClickEdit.php?class='+escape(maclass)+'&chan='+escape(chan)+'&ID='+escape(ID)+'&valeur=0'));
		}
		
}
function SetDefault(liste,maclass,chan) {
	
	ID=liste.value;
	(file('ajax/SetDefaut.php?class='+escape(maclass)+'&chan='+escape(chan)+'&ID='+escape(ID)));
	NoticeOK(LanguageEbirdy['informations_a_jour']);
		
}

function SetDefautParamGrp(id_group_admin,libelle,valeur) {
    

    
	(file('ajax/SetDefautParamGrp.php?id_group_admin='+escape(id_group_admin)+'&libelle='+escape(libelle)+'&valeur='+escape(valeur)));
        NoticeOK(LanguageEbirdy['informations_a_jour']);		
}


function SetFileDefault(ID)
     {
		if (document.getElementById('defaut'+ID).checked==true) {
			(file('ajax/ParDefault.php?valeur=1&ID='+ID));
		} else {
			(file('ajax/ParDefault.php?valeur=0&ID='+ID));
		}
	
     }
	 
	
	 var reducteur=0;

function Reducteur() {
		if(reducteur==0) {
			$('left-bloc').morph({width:6});
			$('right-bloc').morph({width:1529});
			$('maps').morph({width:1529});
			if(page==1) { $('menu_glissant').morph({width:1529}); }
			reducteur=1;
			
		} else {
			$('left-bloc').morph({width:350});
			$('right-bloc').morph({width:1185});
			$('maps').morph({width:1185});
                        
			if(page==1) { $('menu_glissant').morph({width:1185}); }
                       
			reducteur=0;	
		
		}
}

function ReducteurSimple() {
		if(reducteur==0) {
                    
			$('left-bloc').morph({width:0});
                        $('maps').hide();
			$('right-bloc').morph({width:1529});                       
                        $('right-bloc').morph({border:'0px'});	
                        $('maps').morph({width:1529});
			if(page==1) { $('menu_glissant').morph({width:1529}); }
			reducteur=1;
			
		} 
}

function CloseSimple() {
		if(reducteur==1) {
			$('left-bloc').morph({width:350});
			$('right-bloc').morph({width:1185});
			$('maps').morph({width:1185});
			if(page==1) { $('menu_glissant').morph({width:1185}); }
                        $('right-bloc').morph({border:'1px solid #3d007b'});	
                     
                         
			reducteur=0;
                        $('maps').show();
			
		} 
}
var page=0;
function OuvrePage() {
	if(page==0) {
		if(reducteur==0) { $('menu_glissant').morph({width:1185,marginLeft:0}); } 
		else { $('menu_glissant').morph({width:1529,marginLeft:0}); }
		
			
			page=1;
		} else {
			//$('menu_glissant').morph({width:0,marginLeft:-5});
			
		}
}
var ReloadOblig=0;
function FermePage() {
	
	if(ReloadOblig==1) {
		new mBox.Modal({
    title: LanguageEbirdy['actualisation_des_donnees'],
    content: LanguageEbirdy['suite_modif_rechargement'],
	overlay:true,
	overlayStyles: {
		color: 'black',
		opacity: 0.75
	},
	openOnInit: true,
    buttons: [
        { title: LanguageEbirdy['recharger'],
          event: function() {
             window.location.reload();
          },
		  addClass: 'button_green mBoxConfirmButtonSubmit'
        }
    ],
    attach: 'myModalDialog2'
});
		
	}
	CloseSimple()
	$('menu_glissant').set('html','');
	$('menu_glissant').morph({width:0,marginLeft:-5});
	
			page=0;	
}
function ChargePage (url) {
	/*
	var options = {url: url, method : 'get' , update: $('menu_glissant'), evalScripts: true};
    var monObjetAjax= new Request.HTML(options);
	
    monObjetAjax.send();	
	*/

    if(ReloadOblig==1) {
            new mBox.Modal({
        title: LanguageEbirdy['actualisation_des_donnees'],
        content: LanguageEbirdy['suite_modif_rechargement'],
            overlay:true,
            overlayStyles: {
                    color: 'black',
                    opacity: 0.75
            },
            openOnInit: true,
        buttons: [
            { title: LanguageEbirdy['recharger'],
              event: function() {
                 window.location.reload();
              },
                      addClass: 'button_green mBoxConfirmButtonSubmit'
            }
        ],
        attach: 'myModalDialog2'
        });
		
    }
    //$('menu_glissant').innerHTML=file(url);

    var options2 = {url: url,
     evalScripts :true,
     async:true,
     update : $('menu_glissant'),

     onSuccess: function(xhr) {
            //alert(xhr);
             //$('menu_glissant').set('html',xhr);;
            IniAll();
            DragList();
    } };
    var monObjetAjax2= new Request.HTML(options2);
    OuvrePage();
    $('menu_glissant').set('html','<center style="margin-top:100px"><img src="images/loading.gif"></center>');
    setTimeout(function() {
            monObjetAjax2.send();
    },500);
    	
	
}
 
function ChargeContenu(div,url) {
    var options2 = {
        url: url, 
        method : 'get' , 
        update: $(div), 
        evalScripts: true,
        onLoadstart: function() {
            $(div).set('html','<center style="margin-top:100px"><img src="images/loading.gif"></center>');
        },  
        onSuccess: function() {
            InitBase();
        } 
    };
    var monObjetAjax2= new Request.HTML(options2);
    monObjetAjax2.send();	


}
function ChargeContenuSuivi(div,url) {

	var options2 = {url: url, method : 'get' , update: $(div), evalScripts: true, onSuccess: function() {} };
    var monObjetAjax2= new Request.HTML(options2);
    monObjetAjax2.send();	


}

function SaveForm(form,fiche) {
    LsErr=LanguageEbirdy['liste_champ_non_renseigne'];
    IsErr=0;
    i=0;
    url=$(form).get('action')
    $(form).getElements('input').each(function (el){
            name=el.get('name');
            if($('title_'+name)) {
                    if(el.value=='') {

                            LsErr+=' <br> - '+ $('title_'+name).innerHTML;
                            el.style.border='1px solid red'	;
                            IsErr=1;
                    } else {
                            el.style.border=''	;
                    }
            }
    });


    $(form).getElements('select').each(function (el){
            name=el.get('name');
            if($('title_'+name)) {
                    if(el.value=='') {

                            LsErr+=' <br> - '+ $('title_'+name).innerHTML;
                            el.style.border='1px solid red'	;
                            IsErr=1;
                    } else {
                            el.style.border=''	;
                    }
            }
    });

    if(IsErr==1) { NoticeKO(LsErr);}else {
            myHTMLRequest3 = new Request.HTML({url: url, update: $(fiche),onSuccess: function() {
                    InitBase();
                }}).post($(form));
            myHTMLRequest3.send();
    }

}



function FindAndDisplay(IDC) {
	
    var indice=0;
    $$('.drop').each(function (el) {
            if(el.get('id')=='EnteteCentre'+IDC) {
                    myAccordionMenu.display(indice);
            }
            indice++;
    });
    var myFx = new Fx.Scroll($('ListeCEntreMenu')).toBottom().chain(function(){
            this.toElement($('EnteteCentre'+IDC));
    });
}

ObjEncInt='';
AncDivInterneObj='';

function InitStart() {
    if($('nav')) $('nav').MooDropMenu(); 
//	ResizeListeCentre();
     myAccordionMenu = new Fx.Accordion($$('.drop'), $$('.dropBloc'), {
            onActive: function(toggler) { 
                    ImgToggle=toggler.getElements('img');
                    ImgToggle[0].src='images/drop_down.png';
             },
            onBackground: function(toggler) { 
                    ImgToggle=toggler.getElements('img');
                    ImgToggle[0].src='images/drop_up.png';
            },
        display: false,
        alwaysHide: true
    });
}
var ListeCalendrier=new Array();

function OuvreLigneCera() {
	var Compteur=1;
	var LesLignes=$$('.openSurClick');
	LesLignes.each( function(ligne) {	
		ligne.getElements('td').each( function(cellule) {				
				cellule.addEvent('click',function(){ 
				var positionCell=(ligne.getElements('td').indexOf(cellule));
				var Compteur=ligne.getElements('td').length-1;
				
					if(Compteur!=positionCell) {					
					//	cellule.setStyle('border','2px solid red');
						Lien=ligne.getElements('a[href*=?p=fiche_]');
						Lien[0].fireEvent('click');		
						
					}	
				});	
		});
	});
}



function InitBase() {
    OuvreLigneCera()
    ActivSelectPerso();
    Locale.use('fr-FR');
    $$('.calendrier').each(function (el){
	var indice=ListeCalendrier.length+1
 	ListeCalendrier[indice] = new Picker.Date(el, {
                        toggle: $$('.toggle'),
                  positionOffset: {x: 5, y: 0},
                  pickerClass: 'datepicker_dashboard',
                         useFadeInOut: !Browser.ie
        });	
	var picto = new Element('img', {
		src:'images/calendrier.png',
		height:20,
		width:20,
		styles: {
			position:'absolute',
			marginLeft:5
		}
	});
	
	el.grab(picto,'after');
	ListeCalendrier[indice].attach(picto)
	ListeCalendrier[indice].detach($$('.calendrier'))	
    });
    new mBox.Tooltip({
        setContent: 'data-myTooltip',
        attach: 'myTooltip'
    });
    new mBox.Tooltip({
        setContent: 'data-myTooltip',
        attach: 'infoPagers',
    theme: 'BlackGradient',
             width: 250,
        position: {
            x: 'left',
            y: 'center'
        },
    });
    new mBox.Tooltip({
        setContent: 'data-myTooltip',
        attach: 'infoSupports',
    theme: 'BlackGradient',
             width: 250,
        position: {
            x: 'center',
            y: 'bottom'
        },
    });
    new mBox.Tooltip({
        setContent: 'data-myTooltip',
        attach: 'infoPagersDetail',
    theme: 'BlackGradient',
             width: 250,
        position: {
            x: ['left', 'inside'],
            y: 'top'
        },
    });
    $$('a.ceraBox').cerabox({group: false});
    $$('.ligneSurvol').addEvent('mouseover',function(){ 
            this.set('class','ligneSurv '+this.get('class'));
            this.style.cursor='pointer';
    }); 
    $$('.ligneSurvol').addEvent('mouseout',function(){ 
            this.removeClass('ligneSurv');
    }); 
        $$('.ligneSurvol').addEvent('click',function(){ 
        if(this.onclick && this.get("onclick").toString().indexOf('SelectionPourSwitch')==-1) {
                $$('.ligneSurvol').setStyles({border: '0px',});
                        this.setStyles({borderLeft: '4px #3D007B solid',borderTop: '1px #3D007B solid',borderBottom: '1px #3D007B solid',borderRight: '1px #3D007B solid',});
        }						
    }); 
    $$('.recherche').each(function (el){		
        if(el.value=='') {
                el.set('value',KeyWordRecherche);
        }
    });
    $$('.recherche').addEvent('click',function(){ 
    if(this.value==KeyWordRecherche) {
            this.style.color='#000';
            this.style.fontWeight='normal';
            this.value='';
    }
    });
    $$('.recherche').addEvent('blur',function(){ 
        if(this.value=='') {
                this.style.color='#999';
                this.style.fontWeight='bold';
                this.value=KeyWordRecherche;
        }
    });
    IniConfirm();

    myAccordionSous = new Fx.Accordion($$('.SousOnglet'), $$('.SousBloc'), {
	display: 0,
        alwaysHide: true
    })
	
}


function IniAll() {
    InitBase();
    $$('.Onglet ').addEvent('click',function(){ 
            $$('.Onglet ').erase('class'); 
            $$('.Onglet ').set('class','OngletInterne');
            ObjEncInt=this;
            if(ObjEncInt!=AncDivInterneObj) {
            ObjEncInt.className='OngletInterne_hover';
            AncDivInterneObj.className='OngletInterne';
            AncDivInterneObj=ObjEncInt;
            }
    }); 
    NbZ=$$('.Onglet ').length
    $$('.Onglet ').each(function (el){
            el.style.zIndex=NbZ
            if(NbZ==$$('.Onglet ').length) {
            el.style.marginLeft='0px';
            el.style.paddingLeft='20px';
            }
            NbZ--;
    });	
    myAccordionPrinc = new Fx.Accordion($$('.Onglet'), $$('.OngletBloc'), {
        display: 0,
        alwaysHide: false
    });
}

var myAccordionPrinc;
var myAccordionSous;

window.addEvent('domready', function() {
	IniAll();
	InitStart();
});
   
   
function Upload() {
    var upload = new Request.File({
        url: 'frontoffice/ImportPagers.php',
        onLoadstart: function() {$('UploadResult').set('html','<center style="margin-top:50px"><img src="images/loading.gif"></center>');},	
        onComplete: function(response){
            $('UploadResult').set('html',response);
            //$('FinDL').style.display='block';
        }
    });
    files = $('fichier').files;
    upload.append('fichier' , files[0]);
    upload.send();
}

function PrepaUploadSoftPerso(type,lipourSel) {
    IDCREE='';
    //files = $('UploadSoftPerso').files
    $('SimulUpload').cerabox({
	animation: 'ease',
	displayTitle: false,
	group: false,
	clickToCloseOverlay: false,
	width:400,
	height:300,
	ajax: {
		data: 'IDUPLOAD='+IDCREE+'&type='+type
	}
    });
    $('SimulUpload').click();
    var myRequestAlt = new Request({url: 'frontoffice/prepa_upload.php',
        //data:'type='+type+'&fichier='+files[0].name,
        data:'type='+type,
        method: 'get',
        onSuccess:function(responseText){ 
            $('IDUPLOAD').set('value',responseText); 
            window.setTimeout(function(){
                RefreshUpload(lipourSel,type);
                UploadSoftPerso(type);
            },500);
        }
    }).send();	
    IDCREE=$('IDUPLOAD').get('value');
}

function PrepaUploadGlobal() {
    IDCREE='';
    NbFichier=inputFiles.getFiles().length;
    if(NbFichier>0) {
        var myRequestAlt = new Request({url: 'frontoffice/prepa_upload_global.php',data:'nombre='+NbFichier, method: 'get', onSuccess:function(responseText){   
            $('IDUPLOAD').set('value',responseText); 
            RefreshUploadGlobal();
            UploadSoftPersoGlobal();
            }
        }).send();	
    } else {
    	NoticeKO(LanguageEbirdy['aucun_fichier_select']); 
    }
}

	
function UploadSoftPersoGlobal() {
    var upload = new Request.File({
     method: 'get',	
    url: 'frontoffice/UploadSoftPersoGlobal.php?ID='+$('IDUPLOAD').get('value'),
    onComplete: function(response){
            inputFiles.resetAll();
    }
    });
    inputFiles.getFiles().each(function(file){
        upload.append('UploadSoftPerso[]' , file);
    });
    upload.send();
}


function ResetPositionnementCarte() {
    var resetC = new Request.File({
     method: 'get',	
    url: 'ajax/SetLatLonGroupe.php',

    });
    resetC.send();
}


function UploadSoftPerso(type) {
    var upload = new Request.File({
        method: 'get',	
        url: 'frontoffice/UploadSoftPerso.php?type='+type+'&ID='+$('IDUPLOAD').get('value'),
        onComplete: function(response){}
    });
    files = $('UploadSoftPerso').files;
    upload.append('UploadSoftPerso' , files[0]);
    upload.send();
}

var TimerScanUpload;

function RefreshUpload (lipourSel,type) {
	IDUP=$('IDUPLOAD').get('value');
	var myRequestAlt = new Request({url: 'frontoffice/RefreshUpload.php',
            data:'IDUP='+IDUP,
            method: 'get',
            onSuccess:function(responseText){ 
            var res = responseText.split("$"); 
            if($('ListingSuivi')) {
		  $('ListingSuivi').set('html',res[0]);
            }
            if(res.length==1) {
		   window.setTimeout(function(){RefreshUpload(lipourSel,type)},1000);
            } else {
                TabRs=res[1].split("-");
		if(TabRs[1]!='ko') {
                    if(lipourSel) {
                        var myRequestAlt = new Request({url: 'ajax/rechargeVersion.php',
                        data:'type='+type,
                        method: 'get',
                        onSuccess:function(responseText){ 
                                      $('list_'+lipourSel).set('html',responseText); 
                                      TabProdRs=TabRs[1].split(",");
                                       i=0;
                                        while(i<TabProdRs.length) {

                                              $('ChoixVersion'+TabProdRs[i]).setStyles({
                                                      backgroundColor: '#8EB4E3',
                                              });

                                              i++;
                                        }
                                        if(TabProdRs.length==1) {
                                              $(lipourSel).set('value',$('ChoixVersion'+TabRs[1]).getAttribute('data-select'));
                                              $('select_'+lipourSel).set('html',$('ChoixVersion'+TabRs[1]).get('html'));	
                                              $(lipourSel+'Pager').set('value',$('ChoixVersion'+TabRs[1]).get('data-sup'));
                                              Search($(lipourSel+'Pager'),'ListePAgers');
                                              ActivFleche();
                                        } else {
                                               $('select_VersionF').click(); 
                                        }
                                        CeraBoxWindow.close();
                        }
                    }).send();	
		}
            }
	}
    }
    }).send();	
}

// affiche les information d'état des uploads
function RefreshUploadGlobal() {
	
	IDUP=$('IDUPLOAD').get('value');
	 var myRequestAlt = new Request({url: 'frontoffice/RefreshUploadGlobal.php',
data:'IDUP='+IDUP,
 method: 'get',
  onSuccess:function(responseText){ 
	 var res = responseText.split("$"); 
	  if($('ListingSuivi')) {
		  $('ListingSuivi').set('html',res[0]);
	  }
	   if(res.length==1) {
		   window.setTimeout(function(){RefreshUploadGlobal()},500);
	  } else {
		inputFiles.resetAll();  
	  }
  }
 }).send();	


}
function TestFtp () {
	var myRequestAlt = new Request({url: 'frontoffice/test_ftp.php',
			data:'',
			 method: 'get',
			  onSuccess:function(responseText){Info(responseText); }
			 }).send();	
}

function TestLicences () {
	var myRequestAlt = new Request({url: 'frontoffice/test_licences.php',
			data:'',
			 method: 'get',
			  onSuccess:function(responseText){Info(responseText); }
			 }).send();	
}

function ForceLicences () {
	var myRequestAlt = new Request({url: 'frontoffice/force_licences.php',
			data:'',
			 method: 'get',
			  onSuccess:function(responseText){Info(responseText); }
			 }).send();	
}

function UploadCarte() {

var upload = new Request.File({
url: 'frontoffice/upload_carte.php',
onComplete: function(response){
	$('UploadLogoCarte').set('html',response);
}
});

files = $('fichierCarte').files;
upload.append('fichierCarte' , files[0]);
upload.send();
}



function UploadLogo() {


    var xupload = new Request.File({
        url: 'frontoffice/upload_logo.php',
        onComplete: function(response){
            
            
           var r = response.split("|");
            
            $('UploadLogo').set('html',r[0]);
            
            if (r[1] !== "")
            {
                $('MiniatureLogo').set('src','upload/thumb_'+r[1]);
            }
            
            if (r[2] !== "")
            {
                SetDefautParamGrp(r[2],'logo',r[1]);
            }
            
            
            
            /*
            var myRequest = new Request({
                url: 'ajax/Getlogo.php',
                method: 'get',
                onSuccess:function (reponseXhr){
                    
                    alert("2");
                    $('MiniatureLogo').set('src','upload/thumb_'+reponseXhr);
                }	 
                }
            );*/

        }
    });

    files = $('fichier').files;
    xupload.append('fichier' , files[0]);
    xupload.send();


}

function ActivFleche() {
	if($('VersionFPager').get('value')!= '') {
		$('AddSelectBout').set('src','images/drop_up.png');
		$('RmSelectBout').set('src','images/drop_left.png');
		$('RmAllBout').set('src','images/addall_left.png');
		$('AddAllBout').set('src','images/addall_right.png');
	} else  {
		$('AddSelectBout').set('src','images/drop_up_bleu_di.png');
		$('RmSelectBout').set('src','images/drop_left_bleu_di.png');
		$('RmAllBout').set('src','images/addall_left_di.png');
		$('AddAllBout').set('src','images/addall_right_di.png');
	}
}

function ResetShort() {
	if($('ListePAgersSel')) {
            if($('VersionFPager').get('value')!= '') {
                $('ListePAgersSel').getElements('li').each(function (el){
                    delete TabListeSelPourDep[TabListeSelPourDep.indexOf(el)];
                    delete ListeSelectionPourDeploi[ListeSelectionPourDeploi.indexOf(el.getAttribute('data-drag'))];
                    el.destroy();
                    if(el.getAttribute('data-drag').substr(0,1)=='p') {	
			$('LISTE-'+el.getAttribute('data-drag').substr(1,el.getAttribute('data-drag').length)).setStyles({
					borderLeft: '0px'
			});
                    }
                });
            } else {
		NoticeKO(LanguageEbirdy['veuillez_choisir_vers_a_deployer']);	
            }
	}
}

function AddSelect() {
if($('VersionFPager').get('value')!= '') {
	
var DejaPresent=new Array();
$('ListePAgersSel').getElements('li').each(function (el){
DejaPresent.push(el.getAttribute('data-drag'));
 });


$('ListePAgers').getElements('li').each(function (el){

ID=el.getAttribute('data-drag');
if(DejaPresent.indexOf(ID)==-1) {
		
			if(TabListeSelPourDep.indexOf(el)>-1) {
				delete TabListeSelPourDep[TabListeSelPourDep.indexOf(el)];
				el.setStyles({
					borderLeft: '4px solid red',
				});
				double=el.clone().inject($('ListePAgersSel'));
				double.removeClass('ligneSurv');
				double.setStyle('border-left','0px');
				ListeSelectionPourDeploi[ListeSelectionPourDeploi.indexOf(el.getAttribute('data-drag'))];	
			}

}
	});
} else {
		NoticeKO(LanguageEbirdy['veuillez_choisir_vers_a_deployer']);
		
	}
}
function ResetSelect() {
$('ListePAgersSel').getElements('li').each(function (el){
		if(TabListeSelPourDep.indexOf(el)>-1) {
		 	delete TabListeSelPourDep[TabListeSelPourDep.indexOf(el)];
			delete ListeSelectionPourDeploi[ListeSelectionPourDeploi.indexOf(el.getAttribute('data-drag'))];
			 el.destroy();
		
			if(el.getAttribute('data-drag').substr(0,1)=='p') {	
			$('LISTE-'+el.getAttribute('data-drag').substr(1,el.getAttribute('data-drag').length)).setStyles({
					borderLeft: '0px',
				});
			}
		}
});

}
function inArray(array, p_val) {
    var l = array.length;
    for(var i = 0; i < l; i++) {
        if(array[i] == p_val) {
            return true;
        }
    }
    return false;
}
var TabListeSelPourDep=new Array();
function SelectionPourSwitch(obj) {
	if($('VersionFPager').get('value')!= '') {
		if(inArray(TabListeSelPourDep,obj)) {
			delete TabListeSelPourDep[TabListeSelPourDep.indexOf(obj)];
			delete ListeSelectionPourDeploi[ListeSelectionPourDeploi.indexOf(obj.getAttribute('data-drag'))];
			obj.setStyle('border-left','0px');	
			
		}
		else {
			TabListeSelPourDep[TabListeSelPourDep.length]=obj;
			obj.setStyle('border-left','5px #3d007b solid');
		}
	} else {
		NoticeKO(LanguageEbirdy['veuillez_choisir_vers_a_deployer']);
		
	}
}

function SwitchList(obj) {

	if($('VersionFPager').get('value')!= '') {
	parentSw=obj.getParent();
	if(parentSw.get('id')=='ListePAgersSel') {
	

delete ListeSelectionPourDeploi[ListeSelectionPourDeploi.indexOf(obj.getAttribute('data-drag'))];
		obj.destroy();
		$('LISTE-'+obj.getAttribute('data-drag')).setStyles({
					borderLeft: '0px',
				});
		
	} else {
ID=obj.getAttribute('data-drag');
var DejaPresent=new Array();
			
$('ListePAgersSel').getElements('li').each(function (el){
DejaPresent.push(el.getAttribute('data-drag'));
 });

	if(DejaPresent.indexOf(ID)==-1) {
		 double=obj.clone().inject($('ListePAgersSel'));
		//alert(double.get('class'));
		obj.setStyles({
				borderLeft: '4px solid red',
		});
		double.removeClass('ligneSurv');
}}
		
	} else {
		NoticeKO(LanguageEbirdy['veuillez_choisir_vers_a_deployer']);
		
	}
}
function AddAllShort() {
	if($('VersionFPager').get('value')!= '') {

var DejaPresent=new Array();
$('ListePAgersSel').getElements('li').each(function (el){
DejaPresent.push(el.getAttribute('data-drag'));
 });


$('ListePAgers').getElements('li').each(function (el){

ID=el.getAttribute('data-drag');
if(DejaPresent.indexOf(ID)==-1) {
	 

		if(el.style.display!='none') {
			double=el.clone().inject($('ListePAgersSel'));
			double.removeClass('ligneSurv');
			
			ListeSelectionPourDeploi[ListeSelectionPourDeploi.indexOf(el.getAttribute('data-drag'))];		
		}
	
		delete TabListeSelPourDep[TabListeSelPourDep.indexOf(el)];
			el.setStyle('border-left','0px');
		el.setStyles({
				borderLeft: '4px solid red',
			});	

}	
});

} else {
		NoticeKO(LanguageEbirdy['veuillez_choisir_vers_a_deployer']);
		
	}
}
var ListeSelectionPourDeploi= new Array();
function DragList() {
  $$('.DraggableItem').addEvent('mousedown', function(event){
    event.stop();

    // `this` refers to the element with the .item class
     var shirt = this;

    var clone = shirt.clone().setStyles(shirt.getCoordinates()).setStyles({
      opacity: 0.7,
      position: 'absolute'
    }).inject(document.body);

    var drag = new Drag.Move(clone, {
 clone: true,
    revert: true,
      droppables: $('ListePAgersSel'),
onStart : function(dragging, cart){
	
			if($('VersionFPager').get('value')!= '') {
			dragging.setStyle('z-index',9000);
			dragging.setStyle('border','2px solid red');
			dragging.setStyle('background','red'); 
			} else {
				NoticeKO(LanguageEbirdy['veuillez_choisir_vers_a_deployer']);
				this.stop();
			}
		
},
onComplete : function(dragging, cart){

},
      onDrop: function(dragging, cart){

        dragging.destroy();

        if (cart != null){
		present=ListeSelectionPourDeploi.indexOf(dragging.getAttribute('data-drag'));
		
		ID=dragging.getAttribute('data-drag');
		var DejaPresent=new Array();					
		$('ListePAgersSel').getElements('li').each(function (el){
		DejaPresent.push(el.getAttribute('data-drag'));
		 });
		
		if(DejaPresent.indexOf(ID)==-1) {
				if(present==-1) {
				  double=shirt.clone().inject(cart);	
				  datasup=double.getAttribute('data-select');	
				 
				 if(double.getAttribute('data-drag').substr(0,1)=='c') {
					 if(double.getAttribute('data-parent')=='') { groupeparent='<span>'+LanguageEbirdy['groupe_principal']+'</span>'} 
					 else {groupeparent='<span>'+double.getAttribute('data-parent')+'</span>' }
					if(datasup!='') {
						double.removeClass('DraggableItem');
						double.addClass('ListePagers ligneSurvol ListePagersSel');
						
						double.set('html','<img src="images/groupe.png" height=30>'+ListeNomCentre[double.getAttribute('data-select')]+groupeparent);
					}
					double.set('onclick','');
					double.set('ondblclick','SwitchList(this);');
					
				 }
				  if(double.getAttribute('data-drag').substr(0,1)=='t') {
					 groupeparent='<span>Type de pager</span>'
					if(datasup!='') {
						double.removeClass('DraggableItem');
						double.addClass('ListePagers ligneSurvol ListePagersSel');					
						double.set('html','<img src="images/pagers.png" height=30  width=30>'+double.getAttribute('data-select')+groupeparent);
						double.set('onclick','');
						double.set('ondblclick','SwitchList(this);');
					}
				 }
				 if(double.getAttribute('data-drag').substr(0,1)=='p') {
					 shirt.setStyles({
							borderLeft: '4px solid red',
					});
				 }
				  ListeSelectionPourDeploi[ListeSelectionPourDeploi.length]=double.getAttribute('data-drag')
				}
				cart.highlight('#D8D8D8', '#FFF');
			}
		}
      },
      onEnter: function(dragging, cart){
        cart.tween('background-color', '#E4E4E4');
      },
      onLeave: function(dragging, cart){
        cart.tween('background-color', '#FFF');
      },
      onCancel: function(dragging){
        dragging.destroy();
      }
    });
    drag.start(event);
  });

}
incre=0;
function AppliquerSelSupport() { 
var result='' ;
$('ListePAgersSel').getElements('li').each(function (el){
	result=result+el.getAttribute('data-drag')+'/'
});
var maDate = new Date();
DateCamp=maDate.getDate()+'/'+((maDate.getMonth())+1)+'/'+maDate.getFullYear();

if(result.length>0) {
	if($('VersionF').value!=0) {
	var ion = new mBox.Modal({
    title: '&nbsp;',
    content: ''+LanguageEbirdy['confirmation_deploiement']+'<br><input type="text" value="'+LanguageEbirdy['deploiement_du']+' '+DateCamp+'" id="NomCamp'+incre+'">',
	overlay:true,
	overlayStyles: {
		color: 'black',
		opacity: 0.75
	},
width:300,
    buttons: [
       
        { title: LanguageEbirdy['oui'],
		id: 'ValiderForm'+incre,
		addClass: 'button_green mBoxConfirmButtonSubmit',
          event: function() {
			   ResetShort();
				this.close();
				/*
				$('ValiderForm'+incre).set('href','index-ajax.php?p=confirmation_deploiement_support');
				$('ValiderForm'+incre).cerabox({
					animation: 'ease',
					displayTitle: false,
					group: false,
					width:800,
					height:500,
					ajax: {
						data: 'nomCampagne='+$('NomCamp'+incre).value+'&ID='+$('VersionF').value+'&liste='+result
					}
				 });*/
				  var myRequest= new Request({url: 'index-ajax.php?p=confirmation_deploiement_support',
						 method: 'post',						 
						data: 'nomCampagne='+$('NomCamp'+incre).value+'&ID='+$('VersionF').value+'&liste='+result,
			  			onSuccess:function(responseText){
							parent.NoticeOK(responseText);
                                                        
						}
			 	 }).send();
				incre++;
				
          }
        },
		
 { title: LanguageEbirdy['non'],addClass: 'mBoxConfirmButtonCancel' }
    ],
    openOnInit: true
});
} else { NoticeKO(LanguageEbirdy['aucune_vers_choisi']);}
} else { NoticeKO(LanguageEbirdy['aucun_support_choisi']);}	

}

function SupFichier(ID,type) { 
var myRequestMSA = new Request({url: 'ajax/supFichier.php',
			data:'type='+type+'&ID='+ID,
			 method: 'get'
			 }).send();	

	parent=$('ChoixVersion'+ID).getParent();
sel=parent.get('id').split('_');		 
$('select_'+sel[1]).set('html','-- '+LanguageEbirdy['aucun_support_choisi']+' --');
$(sel[1]).set('value','');
$('ChoixVersion'+ID).destroy(); 
}


function SupFichierGeneral(Liste,ID,type) { 
    
    
    if(ID == "")
        return;
    
    var myRequestMSA = new Request({url: 'ajax/supFichier.php',
    data:'type='+type+'&ID='+ID,
    method: 'get',
    onSuccess:function(responseText){
        parent.NoticeOK(responseText);
     }
     }).send();	
     if(type == 'ps')
     {
        var els = ID.split(",");
        for(var n=0; n< els.length; n++)
        {
            $(Liste+'-'+els[n]).destroy(); 
        }        
     }else{
        $(Liste+'-'+ID).destroy(); 
    }
}



function remove_item (tab,valeur){
    for(b in tab ){
        if(tab[b] == valeur){
            tab.splice(b,1);
            break;
        }
    }
    return tab;
}
function DeleteSupportChoix(indice,id) {
	$('NumSerie_'+indice).destroy();
	var TableExist =$('ListeIdSupports').get('value').split(',');
	TableExist=remove_item(TableExist,id);
	$('ListeIdSupports').set('value',TableExist.join(','))
}


function SelectSupport() { 
var result=new Array ;

i=0;
w=0;
var TableExist =parent.$('ListeIdSupports').get('value').split(',');
var DataType =parent.$('ListeSupportsType').get('value').split(',');

if($('ListePAgersSel').getElements('li').length>0) {
	$('ListePAgersSel').getElements('li').each(function (el){
	Type=el.getAttribute('data-type').split(',');
	
	for(z=0;z<Type.length;z++) {
		if(DataType.indexOf(Type[z])==-1) { DataType[w]=Type[z];w++; }
	}
	if(TableExist.indexOf(el.getAttribute('data-drag'))==-1) { 
		result[i]=el.getAttribute('data-drag');
		var BlocSerie = new Element('div', {
			'class': 'num_serie_choix',
			id: 'NumSerie_'+i,
			html: el.getAttribute('data-serie')+' <img height=10 onclick="DeleteSupportChoix('+i+','+result[i]+')" src="images/delete.png">',
			
		});
		parent.$('ListeSupports').grab(BlocSerie, 'top');
	}
	i++;
	
});
var TabFinal=new Array;
if(result.length>0 && TableExist.length>1) { TabFinal=TableExist.join(',')+','+result.join(',');}
else if(result.length>0 ) { TabFinal=result.join(',');}
else if(TableExist.length>0 ) { TabFinal=TableExist.join(',');}


parent.$('ListeIdSupports').set('value',TabFinal);
parent.$('ListeSupportsType').set('value',DataType.join(','));
parent.CeraBoxWindow.close();
} else { NoticeKO(LanguageEbirdy['aucun_support_choisi']);}	

}




function AppliquerSel(mode = '0') {     
    var result='' ;
    $('ListePAgersSel').getElements('li').each(function (el){
	result=result+el.getAttribute('data-drag')+'/'
    });
    var maDate = new Date();
    DateCamp=maDate.getDate()+'/'+((maDate.getMonth())+1)+'/'+maDate.getFullYear();
    var taboptions = "";
    if (mode == '1')
    {
       taboptions = $('actau').value + "⌂"+ $('message').value + "⌂" + $('force').checked + "⌂" + $('scan').checked;
    }
    if(result.length>0) {
	if($('VersionF').value!=0) {
            var creation = new mBox.Modal({
                title: '&nbsp;',
                content: ''+LanguageEbirdy['confirmation_deploiement']+'<br><input type="text" value="'+LanguageEbirdy['deploiement_du']+' '+DateCamp+'" id="NomCamp'+incre+'">',
                overlay:true,
                overlayStyles: {
                    color: 'black',
                    opacity: 0.75
                },
                width:300,
                buttons: [
                    { title: LanguageEbirdy['oui'],id: 'ValiderForm'+incre,addClass: 'button_green mBoxConfirmButtonSubmit',event: function() {			   
                        
                            ResetShort();
                            
                            this.close();

                        var myRequest= new Request({url: 'index-ajax.php?p=confirmation_deploiement',
                            method: 'post',						 
                            data: 'mode='+mode+'&nomCampagne='+$('NomCamp'+incre).value+'&ID='+$('VersionF').value+'&liste='+result+'&taboptions='+taboptions,
                            onSuccess:function(responseText){
                                
                                parent.NoticeOK(responseText);
                               
                            }
                        }).send();
                        incre++;
                        }
                    },
                    { title: LanguageEbirdy['non'],addClass: 'mBoxConfirmButtonCancel' }
                ],
                openOnInit: true
            });
        } else { 
            NoticeKO(LanguageEbirdy['aucune_vers_choisi']);
        }
    } else { 
        if(mode == '0')
        {
            NoticeKO(LanguageEbirdy['aucune_pager_choisi']);
        }else{
            NoticeKO(LanguageEbirdy['aucune_ambutab']);
        }
    }	
}



function AppliquerSelSupportUnique() { 
var result='' ;
result=$('IDSUPPORTSEL').getAttribute('value')
var maDate = new Date();
DateCamp=maDate.getDate()+'/'+((maDate.getMonth())+1)+'/'+maDate.getFullYear();

if(result.length>0) {
	if($('VersionF').value!=0) {
	var creation = new mBox.Modal({
    title: '&nbsp;',
    content: ''+LanguageEbirdy['confirmation_deploiement']+'<br><input type="text" value="'+LanguageEbirdy['deploiement_unique_du']+' '+DateCamp+'" id="NomCamp'+incre+'">',
	overlay:true,
	overlayStyles: {
		color: 'black',
		opacity: 0.75
	},
width:300,
    buttons: [
       
        { title: LanguageEbirdy['oui'],
		id: 'ValiderForm'+incre,
		addClass: 'button_green mBoxConfirmButtonSubmit',
          event: function() {
			   
				this.close();
				
				 var myRequest= new Request({url: 'index-ajax.php?p=confirmation_deploiement_support',
						 method: 'post',						 
						data: 'nomCampagne='+$('NomCamp'+incre).value+'&ID='+$('VersionF').value+'&liste='+result,
			  			onSuccess:function(responseText){
							parent.CeraBoxWindow.close();
							parent.NoticeOK(responseText);
							parent.ReloadListeSupport();
							}
			 	 }).send();
				incre++;
				
          }
        },
		
 { title: LanguageEbirdy['non'],addClass: 'mBoxConfirmButtonCancel' }
    ],
    openOnInit: true
});
} else { NoticeKO(LanguageEbirdy['aucune_vers_choisi']);}
} else { NoticeKO(LanguageEbirdy['aucun_support_choisi']);}	

}



function AppliquerSelUnique() { 
    var result='' ;
    result=$('IDPAGERSEL').getAttribute('value');
    var maDate = new Date();
    DateCamp=maDate.getDate()+'/'+((maDate.getMonth())+1)+'/'+maDate.getFullYear();
    if(result.length>0) {
	if($('VersionF').value!=0) {
            var creation = new mBox.Modal({
                title: '&nbsp;',
                content: ''+LanguageEbirdy['confirmation_deploiement']+'<br><input type="text" value="'+LanguageEbirdy['deploiement_unique_du']+' '+DateCamp+'" id="NomCamp'+incre+'">',
                overlay:true,
                overlayStyles: {
                    color: 'black',
                    opacity: 0.75
                },
                width:300,
                buttons: [
                    { title: LanguageEbirdy['oui'],
                	id: 'ValiderForm'+incre,
                        addClass: 'button_green mBoxConfirmButtonSubmit',
                        event: function() {			  
                            this.close();
                            var myRequest= new Request({url: 'index-ajax.php?p=confirmation_deploiement&stand=0',
                                method: 'post',						 
				data: 'mode=0&nomCampagne='+$('NomCamp'+incre).value+'&ID='+$('VersionF').value+'&liste='+result,
			  	onSuccess:function(responseText){
                                    parent.CeraBoxWindow.close();
                                    parent.NoticeOK(responseText);
                                    parent.ReloadListePager();
				}
                            }).send();
			 
                            incre++;
                        }
                    },
                    { title: LanguageEbirdy['non'],addClass: 'mBoxConfirmButtonCancel' }
                ],
                openOnInit: true
            });
        } else { 
            NoticeKO(LanguageEbirdy['aucune_vers_choisi']);
        }
    } else { 
        NoticeKO(LanguageEbirdy['aucune_pager_choisi']);
    }	
}

function setallticket(list,action){
    var lid = '';
    var sep = '';   
    $$('#'+list+' tr').each(function (el){
        if(el.id != "")
        {
            lid = lid + sep + el.id;
            sep = ",";
        }
    })
   
    var myRequestMSA = new Request({url: 'ajax/traitTicket.php',
    data:'action='+action+'&IDs='+lid,
    method: 'get',
    onSuccess:function(responseText){
        
        var r =  responseText.trim().split('|');
         if(r[0] === "2")
        {
            parent.NoticeOK(r[1]);
        }
        else if (r[0] === "1")
        {
            parent.NoticeOK(r[1]);
            window.open(r[2]);
           
        }
        else if (r[0] === "3")
        {
            parent.NoticeKO(r[1]);
        }
        AffinageSuiviTicket();
     }
     }).send();	
}
     
        
function updateMaintdb(id_file,_mode,id_tab)
{
    var myRequestAlt = new Request({url: 'ajax/updateMaintenance.php',
            data:'id='+id_file+"&mode="+_mode+"",
            method: 'get',              
            onSuccess:function(responseText){  
            }         

        }).send();	

}

function ResetSupport(ID) {
	var myRequest= new Request({url: 'ajax/ResetSupport.php',
						 method: 'post',						 
						data: 'IDS='+ID,
			  			onSuccess:function(responseText){
							NoticeOK(LanguageEbirdy['request_reset_cradle']);
							}
                                               }).send();
}
function RecupPerso(ID) {
	var myRequest= new Request({url: 'ajax/RecupPerso.php',
						method: 'post',						 
						data: 'IDP='+ID,
                                                
			  			onSuccess:function(responseText){
							
							parent.NoticeOK(LanguageEbirdy['request_read_custom']);
                                                        
                                                        
							}
			 	 }).send();
}

function RequestKey(ID) {
	var myRequest= new Request({url: 'ajax/RequestKey.php',
						method: 'post',						 
						data: 'IDP='+ID,
                                                
			  			onSuccess:function(responseText){
							
                                                        
                                                       
                                                        
							parent.NoticeOK(LanguageEbirdy['request_read_key']);
                                                        
                                                        
							}
			 	 }).send();
}



function AppliquerSelPersoUnique() { 
var result='' ;
result=$('IDPAGERSEL').getAttribute('value');
var maDate = new Date();
DateCamp=maDate.getDate()+'/'+((maDate.getMonth())+1)+'/'+maDate.getFullYear();

if(result.length>0) {
	if($('VersionF').value!=0) {
	var creation = new mBox.Modal({
    title: '&nbsp;',
    content: ''+LanguageEbirdy['confirmation_deploiement']+'<br><input type="text" value="'+LanguageEbirdy['deploiement_unique_du']+' '+DateCamp+'" id="NomCamp'+incre+'">',
	overlay:true,
	overlayStyles: {
		color: 'black',
		opacity: 0.75
	},
width:300,
    buttons: [
       
        { title: LanguageEbirdy['oui'],
		id: 'ValiderForm'+incre,
		addClass: 'button_green mBoxConfirmButtonSubmit',
          event: function() {
			   
				this.close();
				
				 var myRequest= new Request({url: 'index-ajax.php?p=confirmation_deploiement_perso',
						 method: 'post',						 
						data: 'nomCampagne='+$('NomCamp'+incre).value+'&persos='+$('VersionF').value+'&liste='+result,
			  			onSuccess:function(responseText){
							parent.CeraBoxWindow.close();
							parent.NoticeOK(responseText);
							parent.ReloadListePager();
							}
			 	 }).send();
				incre++;
				
          }
        },
 { title: LanguageEbirdy['non'],addClass: 'mBoxConfirmButtonCancel' }
    ],
    openOnInit: true
});
} else { NoticeKO(LanguageEbirdy['aucune_perso_choisi']);}
} else { NoticeKO(LanguageEbirdy['aucune_pager_choisi']);}	

}


function AppliquerSelPerso() { 
var result='' ;
$('ListePAgersSel').getElements('li').each(function (el){
	result=result+el.getAttribute('data-drag')+'/'
});
var maDate = new Date();
DateCamp=maDate.getDate()+'/'+((maDate.getMonth())+1)+'/'+maDate.getFullYear();

if(result.length>0) {
	if($('VersionF').value!=0) {
	var creation = new mBox.Modal({
    title: '&nbsp;',
    content: ''+LanguageEbirdy['confirmation_deploiement']+'<br><input type="text" value="'+LanguageEbirdy['deploiement_du']+' '+DateCamp+'" id="NomCamp'+incre+'">',
	overlay:true,
	overlayStyles: {
		color: 'black',
		opacity: 0.75
	},
width:300,
    buttons: [
       
        { title: LanguageEbirdy['oui'],
		id: 'ValiderForm'+incre,
		addClass: 'button_green mBoxConfirmButtonSubmit',
          event: function() {
			   
				this.close();
				/*
				$('ValiderForm'+incre).set('href','index-ajax.php?p=confirmation_deploiement_perso');
				$('ValiderForm'+incre).cerabox({
					animation: 'ease',
					displayTitle: false,
					group: false,
					width:1000,
					height:500,					
					ajax: {						
						data: 'nomCampagne='+$('NomCamp'+incre).value+'&persos='+$('VersionF').value+'&liste='+result
					}
				 });*/
				 
				  var myRequest= new Request({url: 'index-ajax.php?p=confirmation_deploiement_perso',
						 method: 'post',						 
						data: 'nomCampagne='+$('NomCamp'+incre).value+'&persos='+$('VersionF').value+'&liste='+result,
			  			onSuccess:function(responseText){
							parent.NoticeOK(responseText);
							}
			 	 }).send();
				incre++;
				
          }
        },
 { title: LanguageEbirdy['non'],addClass: 'mBoxConfirmButtonCancel' }
    ],
    openOnInit: true
});
} else { NoticeKO(LanguageEbirdy['aucune_perso_choisi']);}
} else { NoticeKO(LanguageEbirdy['aucune_pager_choisi']);}	

}

LargeurTuile=170;
MargeAlert=120;
ListeAlert=new Array;
function AddTuile(ID,Couleur,IDC,centre,tooltip,createB,numtuile){

	if(ListeAlert.length>18) {
		removeTuile();
	}
	var NTuile = new Element('div',{
		styles: {backgroundColor:Couleur,marginLeft:-200},
		html:centre,
		id:ID
	});	
	if(IDC!=0) {
	//NTuile.addEventListener('click',function (el) { ChargePage('index-ajax.php?p=tableau_centre&IDC='+IDC); });
	}
	NTuile.addEventListener('dblclick',function (el) { 
            IDA=ID;	
            ValideAlert(IDA);
	});	
	$('alert').grab(NTuile);
	NTuile.set('morph', {duration: 800, transition: 'linear'});	
	NTuile.morph({marginLeft:6});
	
	
	ListeAlert[ListeAlert.length]=NTuile;
	new mBox.Tooltip({
		theme: 'BlackGradient',
		content: tooltip,
		 width: 180,
		 transition: 'fly',
		attach: NTuile,
                position: {
                x: 'auto',
                y: 'top'
                }
	});
	$$('a.ceraBox').cerabox({group: false});
}

NbTuileRemove=0;
function removeTuile() {
	NbAretirer=ListeAlert.length-18
	i=0;
	var TempVar=new Array();
	while(i<NbAretirer) {
		if(i==NbTuileRemove) {
			element=ListeAlert[i]
			 var myEffects = new Fx.Morph(element, {duration: 300, transition: Fx.Transitions.Sine.easeOut, onComplete: function() {element.destroy();}});
 
			myEffects.start({'width': 0,border:0});
			//window.setTimeout(function (){element.remove();},2000);
		} 		
		i++;
	}
	NbTuileRemove++;
}
function ValideAllAlert(Type,Niveau) {
	
var myRequest = new Request(
	{url: 'ajax/ValideAllAllert.php',
	data:'type='+Type+'&niveau='+Niveau,
	 method: 'get',
	 onSuccess:function (reponseXhr){
		
		 }
	 }
	).send();		
$$('.ValidationAlert').each(function (el) {
	ID=el.get('data-ID');
	Dtype=el.get('data-type');
	Dniveau=el.get('data-niveau');
	if(Dniveau==Niveau && Type==Dtype) {
		if($(ID)) {	$(ID).morph({backgroundColor:'#47A938'});	}
		if($('ENC'+ID)) {$('ENC'+ID).set('html','<img src="images/valide.png">');	}
	}
	});
}
function ValideAlert(ID) {
	
	(SetValuePerso('histo','acquittement',ID,1));
		if($(ID)) {
			
			$(ID).morph({backgroundColor:'#47A938'});
		}
		if($('ENC'+ID)) {
			
			$('ENC'+ID).set('html','<img src="images/valide.png">');
		}
	
}
TabATraiter= new Array();
function CheckAlert() {

var myRequest = new Request(
	{url: 'ajax/checkalert.php',
	 method: 'get',
	 onSuccess:function (reponseXhr){
             if(reponseXhr)
		 eval(reponseXhr);
		 }
	 }
	).send();
	
}
function VerifCradle() {
	
	var myRequest = new Request(
	{url: 'ajax/VerifCradle.php',
	 method: 'get',
	 onSuccess:function (reponseXhr){
		 	if(reponseXhr>0) {
				$('CradleNonRef').morph({height:30});
			} else {
				$('CradleNonRef').morph({height:0});
			}
		 }
	 }
	).send();
	
	
}
function RefrashMarker() {
	for(i=0;i<beachMarker.length;i++) {
		if(image[i]) {
		image[i].url=image[i].url+'&date='+Date()
if(beachMarker[i]) beachMarker[i].setIcon(image[i]);
		}
	}

	
}
function RefrashMarkerClassique() {

	$$('.WGGM_curs').each( function(el) { 
	IDC=el.get("data-IDC");
	url='drawimages/centre-etat.php?IDCENTRE='+IDC+'&date='+Date();
	el.setStyle('background-image','');
	el.setStyle('background-image','url(\''+url+'\')');
	});
	
}


function RefreshInfo() {
	CheckAlert();
	//VerifCradle();
	
}
//BoucleRecherche
function BoucleRecherche() {
   
setTimeToRefresh=10;	
TimeToRefresh=setTimeToRefresh;	
window.setInterval(function () {
   /* $('CompteARebour').set('html',''+LanguageEbirdy['actualisation']+' : '+TimeToRefresh+LanguageEbirdy['sec_restante']);*/
    TimeToRefresh--;
    
    if(TimeToRefresh<=0 ){
        TimeToRefresh=setTimeToRefresh;
        //RefreshInfo()
        //RefreshStats();	
        //RefreshStatsCentre();
        //RefreshStatsSys();
        RefreshStatsAutre();
        /*
         if($('ListeGestionPagers')){
           
            ReloadListePager();
        } */
    }
},1000);



}
/*
cacheStats=1;
function AffectBg(liste) {
	var i=0;
	$(liste).getElements('li').each(
		function (el) {
			
			if(el.hasClass('ligneFonce') || el.hasClass('ligneClair')) {
				el.removeClass('ligneFonce');
					el.removeClass('ligneClair');
				if(Odd(i)) {el.addClass('ligneFonce');}
				else el.addClass('ligneClair');
				i++;
			}
		});
    
    
}*/
function AffectBgTable(liste) {
	var i=0;
	$(liste).getElements('tr').each(
		function (el) {
			
			if(el.hasClass('ligneFonce') || el.hasClass('ligneClair')) {
				el.removeClass('ligneFonce');
					el.removeClass('ligneClair');
				if(Odd(i)) {el.addClass('ligneFonce');}
				else el.addClass('ligneClair');
				i++;
			}
		});
}
function Odd(value) {
    return (value & 1)==1;
} 
function CacheStats() {
	if(cacheStats==0) {
		$('stats').morph({height:0})
		
		window.setTimeout(function(){$('stats').morph({width:410});},460);
			cacheStats=1
	}
	else {
		
		$('stats').morph({width:760});
		//$('stats').morph({height:80});
	
		window.setTimeout(function(){$('stats').morph({height:600})},460);
		 cacheStats=0
	}
}


function ActChan(obj) {
	chan=obj.getAttribute('name').toLowerCase();
	chan=chan.substr(2,chan.length);
	if(obj.checked==true) {
		$(chan).set('disabled','');
		$('Save'+obj.getAttribute('name')).setStyle('visibility','');
	}else {
		$(chan).set('disabled','disabled');
		$('Save'+obj.getAttribute('name')).setStyle('visibility','hidden');
	}
}
/*
function ScrollMenu () {
var myScrollables = new Scrollable( $('ListeCEntreMenu') );
}*/

function RefreshStatsSys() {
	var myRequest= new Request({url: 'ajax/refresh_info_sys.php',
			 method: 'get',
			  onSuccess:function(responseText){
				 if(responseText==0) { $('LienNbAlertSys').setStyle('color','#FFF'); }
				  else { $('LienNbAlertSys').setStyle('color','red'); }
				   }
			 }).send();	
}
/* couleur du logo alerte */
function RefreshStatsAutre() {
	var myRequest= new Request({
                            url: 'ajax/refresh_info_autre.php',
                            method: 'get',
                            onSuccess:function(responseText){
				 if(responseText==0) { 
                                     $('BouttonGlobalAlerteCP').setStyle('background-color','#409640'); 
                                     document.getElementById('ImgGlobalAlerteCP').src="images/alert_ok.png";
                                 } else { 
                                     $('BouttonGlobalAlerteCP').setStyle('background-color','#A0141B'); 
                                     document.getElementById('ImgGlobalAlerteCP').src="images/alert-gros.png";                                     
                                 }
                            }
			 }).send();	
}
function ChangeListeVersionDefaut(IDC) {
	var myRequest= new Request({url: 'ajax/ChangeListeVersionDefaut.php',
			 method: 'get',
			 data: 'IDC='+IDC,
			  onSuccess:function(responseText){
							 $('ListingSuivi').set('html',responseText);
						 }	 
			 }).send();	
}


function CheckallParam(checked){
    
    alert(checked)
}

function resetParams(IDS){   
    var myRequest= new Request({url: 'ajax/resetParamPager.php',
			 method: 'get',
			 data: 'IDS='+IDS,
			  onSuccess:function(responseText){
                              
                                parent.CeraBoxWindow.close();
                                parent.NoticeOK(responseText);
                                parent.ReloadListePager();
                              
                          }	 
			 }).send();	
}

function copierParams(IDS){   
    var myRequest= new Request({url: 'ajax/copiercollerparams.php',
			 method: 'get',
			 data: 'IDS='+IDS+'&mode=copier',
			  onSuccess:function(responseText){
                                parent.NoticeOK(responseText);
                                parent.ReloadListePager();
                                MiseAJourDiv('index-pop.php?p=liste_param_pager&IDC='+IDS+'&pop=1&type=p','PagePrincipal',this);                               
                          }	 
			 }).send();	
}

function collerParams(IDS,mMES1,mMES2){   
     
    var ion = new mBox.Modal({
	title: mMES1,
        content: mMES2,
	overlay:true,
	overlayStyles: {color: 'black',opacity: 0.75},
	//width:200,
        buttons: [
            { title: 'oui',
		addClass: 'button_green mBoxConfirmButtonSubmit',
                event: function() {	   
				this.close();
                                var myRequest= new Request({url: 'ajax/copiercollerparams.php',
                                method: 'get',
                                data: 'IDS='+IDS+'&mode=coller',
                                onSuccess:function(responseText){                                       
                                    var s = responseText.split("|");                                                                                                           
                                    if(s[0].trim() === "1"){
                                        parent.NoticeOK(s[1]);
                                        MiseAJourDiv('index-pop.php?p=liste_param_pager&IDC='+IDS+'&pop=1&type=p','PagePrincipal',this);            
                                    }else{
                                        parent.NoticeKO(s[1]);
                                    }	 
                                }
			 }).send();	
                }
            },
		
            { title: 'non',
		addClass: 'mBoxConfirmButtonCancel',
                event: function() {	   
			this.close();
		}
            }
	],
        openOnInit: true
    });
    
    
    /*
    
   
    */
}



function Changetypepager(IDS,MODE) {

        spnbp.hidden=true;
	var myRequest= new Request({url: 'ajax/Changetypepager.php',
			 method: 'get',
			 data: 'IDS='+IDS+"&MODE="+MODE,
			 onSuccess:function(responseText){                             
                            $('ListingSuivi').set('html',responseText);	
                            if(responseText != "")
                                spnbp.hidden=false;
                        }	 
			 }).send();	
}



function ChangeListeGroupSoft(IDS,IDG) {
	var myRequest= new Request({url: 'ajax/ChangeListeGroupSoft.php',
			 method: 'get',
			 data: 'IDS='+IDS+'&IDG='+IDG,
			  onSuccess:function(responseText){
							 $('ListingSuivi').set('html',responseText);
						 }	 
			 }).send();	
}

function SetListeGroupSoft(IDSOFT,IDGROUPE,CHECK) {
    
    var VISIBLE = 0;
    if (CHECK)
        VISIBLE = 1;
    var myRequest= new Request({url: 'ajax/setGroupSoft.php',method: 'get',data:'IDSOFT='+IDSOFT+'&IDGROUPE='+IDGROUPE+'&VISIBLE='+VISIBLE,
			  onSuccess:function(responseText){                             
                          }	 
			 }).send();	
}

function ChangeListeGroupPerso(IDP,IDG) {
	var myRequest= new Request({url: 'ajax/ChangeListeGroupPerso.php',
			 method: 'get',
			 data: 'IDP='+IDP+'&IDG='+IDG,
			  onSuccess:function(responseText){
							 $('ListingSuivi').set('html',responseText);
						 }	 
			 }).send();	
}

function SetListeGroupPerso(IDPERSO,IDGROUPE,CHECK) {
    
    var VISIBLE = 0;
    if (CHECK)
        VISIBLE = 1;
    var myRequest= new Request({url: 'ajax/setGroupPerso.php',method: 'get',data:'IDPERSO='+IDPERSO+'&IDGROUPE='+IDGROUPE+'&VISIBLE='+VISIBLE,
			  onSuccess:function(responseText){                             
                          }	 
			 }).send();	
}


function RefreshStats() {

	for(i=0;i<ListePagersTypesJS.length;i++) {
		IDPT=ListePagersTypesJS[i]
		if($('stats-PT-msa-'+IDPT) && $('stats-PT-prs-'+IDPT) ) {
		
		var myRequestMSA = new Request({url: 'ajax/refresh_info.php',
			data:'action=msa&IDPT='+IDPT,
			 method: 'get',
			  onSuccess:function(responseText){eval(responseText);$$('a.ceraBox').cerabox({group: false}); }
			 }).send();			
			var myRequestPRS = new Request({url: 'ajax/refresh_info.php',
			data:'action=prs&IDPT='+IDPT,
			 method: 'get',
			  onSuccess:function(responseText){eval(responseText);$$('a.ceraBox').cerabox({group: false}); }
			 }).send();
			
				
		}
	}

/*	*/
var myRequestMSA = new Request({url: 'ajax/refresh_info.php',
			data:'action=msa',
			 method: 'get',
			  onSuccess:function(responseText){eval(responseText);$$('a.ceraBox').cerabox({group: false}); }
			 }).send();		
	var myRequestPRS = new Request({url: 'ajax/refresh_info.php',
			data:'action=prs',
			 method: 'get',
			  onSuccess:function(responseText){eval(responseText);$$('a.ceraBox').cerabox({group: false}); }
			 }).send();	
	
}
function RefreshStatsCentre() {

	/*for(i=0;i<ListeCentreJS.length;i++) {
		IDC=ListeCentreJS[i]
		
		if($('stats-CT-msa-'+IDC) && $('stats-CT-prs-'+IDC) ) {*/
			ResultPrs='';
			ResultMsa='';
			var myRequestMSA = new Request({url: 'ajax/refresh_info.php',
			data:'action=msa&type=centre',
			 method: 'get',
			  onSuccess:function(responseText){eval(responseText); }
			 }).send();
			
				var myRequestPRS = new Request({url: 'ajax/refresh_info.php',
			data:'action=prs&type=centre',
			 method: 'get',
			  onSuccess:function(responseText){eval(responseText); }
			 }).send();
			
			
	//	}
	//}
	
}
var ListeDesTri=new Array();
function OrderBy(indice,liste,Entete) {
		
		if(!ListeDesTri[liste]){	ListeDesTri[liste]=new Array();}
		listeLi=$(liste).getElements('li');
		TabTri = new Array();
		
		for(i=0;i<listeLi.length;i++) {
			
			SousListe=listeLi[i].getElements('span');
			
			TabTri[i]=new Array();
			TabTri[i]['obj']=listeLi[i]
			TabTri[i]['colonne']=SousListe[indice].get('html').toString();
		}
		
		if(ListeDesTri[liste][indice]=='desc') {
			TabTri.sort(sortByTexte);
			ListeDesTri[liste][indice]='asc'
		} else {
			TabTri.sort(reverseByTexte);
			ListeDesTri[liste][indice]='desc';
		}
		$(liste).set('html','');
		for(i=0;i<TabTri.length;i++) {
		
			TabTri[i]['obj'].inject($(liste));
		}
		
}
function CreateLignePager(ID,tableau) {
	var myTable = new HtmlTable($('ListeGestionPAgers'));
	chainesearch='add ';
	for(i=0;i<tableau.length;i++) {
		chainesearch=chainesearch+' - '+tableau[i];
	}
	for(i=6;i<tableau.length;i++) {
		delete(tableau[i]);
	}
        

        tableau[4] = '';
        tableau[6] = '';
	tableau[5] = '<img id="ImgPagerSoft-'+ID+'" src="images/vide.png">';
        tableau[7] = '<img id="ImgPagerPerso-'+ID+'" src="images/vide.png">';
	tableau[8] = '<a title="Détails" href="index-pop.php?p=fiche_pagers&IDC='+ID+'" class="ceraBox"><img src="images/loupe.png"></a>  	<a title="Evenement" href="index-pop.php?p=liste_event&IDC='+ID+'" class="ceraBox"><img src="images/histo.png" ></a><img style="width:14px;"  src="images/vide.png" ><a title="Historique" href="index-pop.php?p=liste_histo_mess&IDC='+ID+'" class="ceraBox"><img src="images/event.png" ></a> <span id="ListePagerBtSoft-'+ID+'" style="visibility: visible;"  ><a title="Déployer un soft" href="index-pop.php?p=deploiement_soft_single&IDP='+ID+'" class="ceraBox"><img src="images/deploiementSoft.png"></a></span>     <span id="ListePagerBtSoft-'+ID+'" style="visibility: visible;"  ><a title="Déployer une perso"  href="index-pop.php?p=deploiement_perso_single&IDP='+ID+'" class="ceraBox"><img src="images/deploiementPerso.png"></a></span>';
	myTable.push(tableau,{
		'id':'LISTE-PAGERS-'+ID,
		'class':'ListePagers ligneSurvol ligneClair openSurClick',
		'data-search':chainesearch
		});	
		AffectBgTable('ListeGestionPAgers');
	$$('a.ceraBox').cerabox({group: false});	
	OuvreLigneCera();

}

// création d'une ligne dans la liste des supports

function CreateLigneSupport(ID,tableau) {
	var myTable = new HtmlTable($('ListeGestionSUPPORT'));
	chainesearch='add ';
  
	for(i=0;i<tableau.length;i++) {
		chainesearch=chainesearch+' - '+tableau[i];
	}
	
        tableau[7] = '<a title="'+LanguageEbirdy['detailCradle']+'" href="index-pop.php?p=fiche_support&IDC='+ID+'" class="ceraBox" ><img src="images/loupe.png"></a>'+'<a title="'+LanguageEbirdy['deployCradle']+'" href="index-pop.php?p=deploiement_support_single&IDP='+ID+'" class="ceraBox"><img src="images/deploiementSoft.png"></a> '+'<img src="images/reset.png" title="'+LanguageEbirdy['restartcradle']+'" onclick="ResetSupport('+ID+');" style="cursor:pointer;" > ';

	myTable.push(tableau,{
		'id':'LISTE-SUPPORT-'+ID,
		'class':'ListePagers ligneSurvol ligneClair ',
		'data-search':chainesearch
		});	
		AffectBgTable('ListeGestionSUPPORT');
	$$('a.ceraBox').cerabox({group: false});
	OuvreLigneCera();

 }

function AnnulDeploiTab(ids)
{
     var myRequestMSA = new Request({url: 'ajax/DeleteSoftTab.php',
        method: 'get',
        data:'ids='+ids,
        onSuccess:function(responseText){
            
            $('LigneSuiviDetail'+ids).destroy();
            NoticeOK(LanguageEbirdy['annulation_confirmee']);
            
        }
     }).send();	
    
    
}

function DeleteLignePerso(TABLE,ID) {

    var myRequestMSA = new Request({url: 'ajax/DeleteLignePerso.php',
                                    method: 'get',
                                    data:'class='+TABLE+'&ID='+ID,
                                    onSuccess:function(responseText){
                                    }
                            }).send();	
}



function ReloadListeUser(ID) {
	$('ListeUser').getElements('tr.ListePagers');
	
	var myRequestMSA = new Request({url: 'ajax/ReloadListeUser.php',
			 method: 'get',
			  onSuccess:function(responseText){
			
				eval(responseText)
				for (var clef in TabRetour){
					
					index=0;					
					id=parseInt(clef);
					if($('LISTE-USER-'+id)) {
						chainesearch='upt ';
						$('LISTE-USER-'+id).getElements('td').each(function (el){
							if(index<5) {
								el.set('html',TabRetour[clef][index]);
								chainesearch=chainesearch+' - '+TabRetour[clef][index];
								index++;
							}
							$('LISTE-USER-'+id).set('data-search',chainesearch);
						});
					} else if(clef>0) { CreateLigneUser(clef,TabRetour[clef]); }
					
				}
				
				}
			 }).send();	
}

function ReloadListePager() {
	
    ReducteurSimple();
    ChargePage('index-ajax.php?p=gestion_pagers&onglet=liste')
                    
}

function ReloadListeTab() {	
    ReducteurSimple();
    ChargePage('index-ajax.php?p=gestion_ambutab&onglet=liste')
                   
}							



function CreateLigneCentre(ID,tableau) {
	var myTable = new HtmlTable($('ListeCentre'));
	chainesearch='add ';
	for(i=0;i<tableau.length;i++) {
		chainesearch=chainesearch+' - '+tableau[i];
	}
	ElBefore=$('LISTECENTRE-'+tableau[2])
	tableau[2] = '<a title="Détails" href="index-pop.php?p=fiche_centre&IDC='+ID+'" class="ceraBox"><img src="images/loupe.png"></a>';
	myTable.push(tableau,{
		'id':'LISTECENTRE-'+ID,
		'class':'ListePagers ligneSurvol ligneClair openSurClick',
		'data-search':chainesearch
		},ElBefore,'td','after');	
		$('LISTECENTRE-'+ID).getElements('td')[0].setStyle('text-align','left');
		AffectBgTable('ListeCentre');
	$$('a.ceraBox').cerabox({group: false});
	OuvreLigneCera();
	


}
function CreateLigneUser(ID,tableau) {
	var myTable = new HtmlTable($('ListeUser'));
	chainesearch='add ';
	for(i=0;i<tableau.length;i++) {
		chainesearch=chainesearch+' - '+tableau[i];
	}
	tableau[6] = '<a title="Détails" href="index-pop.php?p=fiche_utilisateur&IDC='+ID+'" class="ceraBox"><img src="images/loupe.png"></a>';
	myTable.push(tableau,{
		'id':'LISTE-USER-'+ID,
		'class':'ListePagers ligneSurvol ligneClair openSurClick',
		'data-search':chainesearch
		});	
	
		AffectBgTable('ListeUser');
	$$('a.ceraBox').cerabox({group: false});
	OuvreLigneCera();
}
function ReloadListeCentre() {
	
	$('ListeCentre').getElements('tr.ListePagers');
	
	var myRequestMSA = new Request({url: 'ajax/ReloadListeCentre.php',
			 method: 'get',
			  onSuccess:function(responseText){
			
				eval(responseText)
				for (var clef in TabRetour){
					
					index=0;					
					id=parseInt(clef);
					if($('LISTECENTRE-'+id)) {
						chainesearch='upt ';
						$('LISTECENTRE-'+id).getElements('td').each(function (el){
							if(index<2) {
								el.set('html',TabRetour[clef][index]);
								chainesearch=chainesearch+' - '+TabRetour[clef][index];
								index++;
							}
							$('LISTECENTRE-'+id).set('data-search',chainesearch);
						});
					} else if(clef>0) { CreateLigneCentre(clef,TabRetour[clef]); }
					
				}
				
				}
			 }).send();	
}

/**
 * Fonction de rechargement de la liste des supports 
 * 
 * 
 */
function ReloadListeSupport() {
	
	$('ListeGestionSUPPORT').getElements('tr.ListePagers');
	var myRequestMSA = new Request({url: 'ajax/ReloadListeSupport.php',
			 method: 'get',
			 data: 'IDC='+$('IDC').get('value'),
			  onSuccess:function(responseText){
				eval(responseText)
				for (var clef in TabRetour){
					
					index=0;					
					id=parseInt(clef);
					if($('LISTE-SUPPORT-'+id)) {
						$('LISTE-SUPPORT-'+id).getElements('td').each(function (el){
							if(index<6) {
								el.set('html',TabRetour[clef][index]);
								index++;
							}
						});
					} else if(clef>0) { CreateLigneSupport(clef,TabRetour[clef]); }
					
				}
				
				}
			 }).send();	
}

/**
 * Fonction de trie du tableau
 * @param {type} indice
 * @param {type} liste
 * @param {type} Entete
 * @returns {undefined}
 */
function OrderByTable(indice,liste,Entete) {
		if(!ListeDesTri[liste]){	ListeDesTri[liste]=new Array();}
		listeLi=$(liste).getElements('tr.ListePagers');
		listeLiComplete=$(liste).getElements('tr');
		TabTri = new Array();
		
		for(i=0;i<listeLi.length;i++) {
			
			SousListe=listeLi[i].getElements('td');
			
			TabTri[i]=new Array();
			TabTri[i]['obj']=listeLi[i]
			TabTri[i]['colonne']=SousListe[indice].get('html').toString();
		}
		
		if(ListeDesTri[liste][indice]=='desc') {
			TabTri.sort(sortByTexte);
			ListeDesTri[liste][indice]='asc'
			typeFleche='drop_top';
		} else {
			TabTri.sort(reverseByTexte);
			ListeDesTri[liste][indice]='desc';			
			typeFleche='drop_down';
		}
		$(liste).set('html','');
		listeLiComplete[0].inject($(liste));
		listeLiComplete[1].inject($(liste));
		for(i=0;i<TabTri.length;i++) {
		
			TabTri[i]['obj'].inject($(liste));
		}
		$$('.Trieur').set('style','background:url(\'images/no_drop.png\') no-repeat right top;background-size: 15px 18px; background-position: right center;');
		$(Entete).set('style','background:url(\'images/'+typeFleche+'.png\') no-repeat right top;background-size: 15px 18px; background-position: right center;');
		AffectBgTable(liste);
		
}
ListeDesTriCentre='';
function OrderByCentre(Trieur) {
		liste='ListeCEntreMenu';
		
		listeLi=$(liste).getElements('div.drop');
		TabTri = new Array();
		
		for(i=0;i<listeLi.length;i++) {
			
			SousListe=listeLi[i].getElements('span');
			
			TabTri[i]=new Array();
			TabTri[i]['obj']=listeLi[i]
			TabTri[i]['colonne']=SousListe[0].get('html').toString();
		}
		
		if(ListeDesTriCentre=='desc') {
			TabTri.sort(sortByTexte);
			ListeDesTriCentre='asc'
			Trieur.set('html','<img src="images/drop_top.png" />');
			
		} else {
			TabTri.sort(reverseByTexte);
			ListeDesTriCentre='desc';
			Trieur.set('html','<img src="images/drop_down.png" />');
		}
		$(liste).set('html','');
		for(i=0;i<TabTri.length;i++) {
		
			TabTri[i]['obj'].inject($(liste));
		}
		
}
	
	
function sortByTexte( a, b )
{
var x = a.colonne.toLowerCase(); //changez "texte" par le nom de votre champs
var y = b.colonne.toLowerCase(); //idem
return ((x < y) ? -1 : ((x > y) ? 1 : 0));
}
function reverseByTexte( a, b )
{
var x = a.colonne.toLowerCase(); //changez "texte" par le nom de votre champs
var y = b.colonne.toLowerCase(); //idem
return ((x > y) ? -1 : ((x < y) ? 1 : 0));
}


function initMapsPosititonement(longitudeCentre,latitudeCentre) {
	
	 mapOptions = {
	 center: new google.maps.LatLng(longitudeCentre,latitudeCentre ),
	  zoom: 9,
	   disableDefaultUI: true,

	  mapTypeId: google.maps.MapTypeId.ROADMAP
	};
     var map = new google.maps.Map(document.getElementById("MapPlacement"),mapOptions);
     var styles = [ { "featureType": "poi", "stylers": [ { "visibility": "off" } ] },{ "featureType": "road", "stylers": [ { "visibility": "on" } ] },{ "featureType": "administrative", "elementType": "labels", "stylers": [ { "visibility": "on" } ] },{ "featureType": "administrative", "elementType": "geometry.stroke", "stylers": [ { "visibility": "on" }, { "weight": 2 }, { "color": "#3d007b" } ] },{ "featureType": "landscape.man_made", "stylers": [ { "visibility": "off" } ] } ];
	 map.setOptions({styles: styles});

  
  Origine = new google.maps.LatLng(longitudeCentre, latitudeCentre);
   Point = new google.maps.Marker({
      position: Origine,
	  title:LanguageEbirdy['localisation'],
      map: map,
	 draggable : true
    });
	

	 google.maps.event.addListener(Point, 'dragend', function() {
			 long=this.getPosition().lng();
			 lat=this.getPosition().lat();
			SetValuePerso('centre','latitude',ID,long.toFixed(6));
			SetValuePerso('centre','longitude',ID,lat.toFixed(6));
			
			
});


parent.ReloadOblig=1;
 } ;
 
 
 function codeAddress(address,IDC) { 
geocoder = new google.maps.Geocoder();
geocoder.geocode( { 'address': address}, function(results, status) {
if (status == google.maps.GeocoderStatus.OK) {	
     lat = results[0].geometry.location.lat();
    lng = results[0].geometry.location.lng();
	SetValuePerso('centre','latitude',IDC,lng);
    SetValuePerso('centre','longitude',IDC,lat);
		var TempmBox = new mBox.Notice({
			type: 'info',
			delayClose: 800,
			delayOpen: 500,
			position:{ x:'center',y:'top'},
			width:400,
			offset: {
				y: 180,
			},
			content: LanguageEbirdy['geoloc_auto_faite']
		});
	}
    });
}
function AnnulDeploi(IDP) {
	DeleteLignePerso('deploi_soft',IDP);
	$('LigneSuiviDetail'+IDP).destroy();
	NoticeOK(LanguageEbirdy['annulation_confirmee']);
}

function AnnulDeploiSupport(IDP) {
	DeleteLignePerso('deploi_support',IDP);
	$('LigneSuiviDetail'+IDP).destroy();
	NoticeOK(LanguageEbirdy['annulation_confirmee']);
}

function AnnulDeploiPerso(IDP) {
	DeleteLignePerso('deploi_perso',IDP );
	$('LigneSuiviDetail'+IDP).destroy();
	NoticeOK(LanguageEbirdy['annulation_perso_conf']);
}

function AnnulDeploiCampagne(IDP,type=0) {        
	var myRequestMSA = new Request({url: 'ajax/AnnulCampagne.php',
			data:'st=0&ID='+IDP+'&type='+type,
			method: 'get',
			onSuccess:function(responseText){                            
				  NoticeOK(LanguageEbirdy['annulation_confirmee']);
				  $('LigneSuivi'+IDP).destroy();
			}
		}).send();
	
	//$('ImgStatutDeploi'+IDP).set('src','images/echec.png');
	//$('CancelStatut'+IDP).set('style','display:none;');
	//$('ActivStatut'+IDP).set('style','');
	

}
/*
function ActivDeploiCampagne(IDP) {
	
	var myRequestMSA = new Request({url: 'ajax/AnnulCampagne.php',
			data:'st=1&ID='+IDP,
			 method: 'get',
			  onSuccess:function(responseText){ }
			 }).send();
	
	$('ImgStatutDeploi'+IDP).set('src','images/encours.png');
		$('CancelStatut'+IDP).set('style','');
	$('ActivStatut'+IDP).set('style','display:none;');
	NoticeOK(LanguageEbirdy['redeploiement_conf']);
}*/
function ActivSelectPerso() {

	window.onclick = function(eleclick) {
		if(eleclick.target.hasClass('selectBox')==false) {
			$$('.selectList').setStyle('display','none');
		}
		
	}
			
	$$('.selectBox').each(function (el){
		
		chan=el.get('id');
		chan=chan.substr(7,chan.length);
		var i= $$('.selectBox').indexOf(el);
		el.removeEvents('click');
		el.addEvent('click', function(){
			
			$$('.selectList')[i].setStyle('width',el.getStyle('width'));
			Position=el.getPosition();
			if($('content')) {
				PositionPrinc=$('content').getPosition();
				margeX=parseInt(Position.x)-parseInt(PositionPrinc.x)-30;
			} else {
				
				margeX=parseInt(Position.x)+5;

			}
			
			$$('.selectList')[i].setPosition({x:margeX});
			if($$('.selectList')[i].getStyle('display')!='block') {
				$$('.selectList').setStyle('display','none');
				$$('.selectList')[i].setStyle('display','block');}else{
				$$('.selectList')[i].setStyle('display','none');	
			}
			$$('.selectList')[i].getElements('li').each(function (divel){
				divel.addEvent('click', function(myevent){
					
					chan=el.get('id');
					chan=chan.substr(7,chan.length);
					
					$(chan).set('value',divel.getAttribute('data-select'))
					
					$$('.selectList')[i].setStyle('display','none');	
					el.set('html',divel.get('html'));
					el.getElements('img').each(function (divelimg){divelimg.destroy();});
				});
			});
			
			
		});
	});
	
}



function AddSoft(element) {
	if($('ListeIdSupports').get('value')!='') {
		libelle=element.get('data-desc');
		dataID=element.get('data-ID');
		type=element.get('data-ID').substr(0,1);
		ID=element.get('data-ID').substr(1);
		TypeOK=element.get('data-type');
		
		
		var TableType=$('ListeSupportsType').get('value').split(',');
		
		if(TableType.indexOf(TypeOK)!==-1) {
			//ListeIdPersos=$('ListeIdPersos').get('value').split(',');
			ListeIdSofts=$('ListeIdSofts').get('value').split(',');
			/*if(type=='P') {
				if(ListeIdPersos.indexOf(ID)==-1) {
					ListeIdPersos.push(ID);
					$('Img'+dataID).set('src','images/drop_left.png');
					NewElement=element.clone();
					NewElement.set('html',SinDLign(libelle,12));
					$('CasePerso'+NBPersoSelSA).set('html','<img src="images/delete.png" class="RemoveSoftPerso" onclick="AddSoft($(\''+element.get('ID')+'\'));"><img src="images/perso.png" height="30">');
					NewElement.setStyles({
						width: '100px',
						border: '0px'
					});
					NewElement.set('class','ListePagers infoPagers');
					$('CasePerso'+NBPersoSelSA).grab(NewElement);
					TabPersoSelSA[NBPersoSelSA]=ID;
					new mBox.Tooltip({
						setContent: 'data-myTooltip',
						attach: 'infoPagers',
					theme: 'BlackGradient',
						 width: 200,
						position: {
							x: 'left',
							y: 'center'
						},
					});
					
					NBPersoSelSA++;
				} else {
					ListeIdPersos=remove_item(ListeIdPersos,ID);
					$('Img'+dataID).set('src','images/drop_up_bleu.png');
					$('CasePerso'+TabPersoSelSA.indexOf(ID)).set('html','Vide');
					NBPersoSelSA--;
				}
			} else {*/
			
			
					if(ListeIdSofts.indexOf(ID)==-1) {
						if(TypeSelSoft.indexOf(TypeOK)==-1) {
							ListeIdSofts.push(ID);
							TypeSelSoft.push(TypeOK);
							$('Img'+dataID).set('src','images/drop_left.png');
							var NewElement=element.clone();
							NewElement.set('html',libelle);
							
							$('CaseSoft'+NBSoftSelSA).set('html','<img src="images/delete.png" class="RemoveSoftPerso" onclick="AddSoft($(\''+element.get('ID')+'\'));"><img src="images/miseajour.png" height="30">');
							NewElement.setStyles({
								width: '100px',
								border: '0px'
							});
							NewElement.set('class','ListePagers infoPagers');
							$('CaseSoft'+NBSoftSelSA).grab(NewElement);
							TabSoftSelSA[NBSoftSelSA]=ID;
							
							new mBox.Tooltip({
								setContent: 'data-myTooltip',
								attach: 'infoPagers',
							theme: 'BlackGradient',
								 width: 200,
								position: {
									x: 'left',
									y: 'center'
								},
							});
							
							NBSoftSelSA++;
						} else NoticeKO (LanguageEbirdy['un_type_pager_ne_peu_associer_deux']);
					} else {
						ListeIdSofts=remove_item(ListeIdSofts,ID);							
						TypeSelSoft=remove_item(TypeSelSoft,TypeOK);	
						$('Img'+dataID).set('src','images/drop_up_bleu.png');				
						$('CaseSoft'+TabSoftSelSA.indexOf(ID)).set('html','Vide');
						NBSoftSelSA--;
						
					}
				
			//}
			//$('ListeIdPersos').set('value',ListeIdPersos.join(','))
			$('ListeIdSofts').set('value',ListeIdSofts.join(','))
			RempilSoftPersoSA();
		} else {
			NoticeKO (LanguageEbirdy['type_pager_incompatible']);	
		}
	
	}	else NoticeKO (LanguageEbirdy['aucun_support_choisi']);		
}


function ClearSoftPersoSA() {
        for(i=1;i<4;i++) {
                if($('CaseSoft'+i)) {
                      $('CaseSoft'+(i)).set('html',LanguageEbirdy['vide']);
                }
        }
		 $('ListeIdSofts').set('value','');
}

function RempilSoftPersoSA() {
	for(i=1;i<4;i++) {
		if($('CaseSoft'+i)) {
			if($('CaseSoft'+i).get('html')=='Vide') {
				if((i+1)<4) {
					 $('CaseSoft'+i).set('html',$('CaseSoft'+(i+1)).get('html')); 
					 TabSoftSelSA[i]= TabSoftSelSA[i+1];
					 $('CaseSoft'+(i+1)).set('html','Vide');
				}
				
			}
			
			//if($('CasePerso'+i).get('html')=='Vide') {
				//if((i+1)<4) {
					// $('CasePerso'+i).set('html',$('CasePerso'+(i+1)).get('html'));  
					 //TabPersoSelSA[i]= TabPersoSelSA[i+1];
					 //$('CasePerso'+(i+1)).set('html','Vide');
				//}
			//}
		}
	}
	
}
function SinDLign(str,ln) {
	
	var caracRest=str.length;
	var result='';
	while(caracRest>0) {
		
		result=result+str.substr(str.length-caracRest,ln)+'<br>';
		
		caracRest=caracRest-ln;
	}
	return result;
}


function DeploiementStandAlone() { 
ListeIdPersos=$('ListeIdPersos').get('value');
ListeIdSofts=$('ListeIdSofts').get('value');
ListeIdSupports=$('ListeIdSupports').get('value');
if(ListeIdSupports.length>0) {
if(ListeIdSofts.length>0 || ListeIdPersos.length>0 ) {
		var creation = new mBox.Modal({
		title: '&nbsp;',
		content: LanguageEbirdy['confirmation_standalone'],
		overlay:true,
		overlayStyles: {
			color: 'black',
			opacity: 0.75
		},
	width:300,
		buttons: [
		   
			{ title: LanguageEbirdy['oui'],
			id: 'ValiderForm'+incre,
			addClass: 'button_green mBoxConfirmButtonSubmit',
			  event: function() {
				   
					this.close();
					
					$('ValiderForm'+incre).set('href','index-ajax.php?p=confirmation_deploiement_standalone');
					$('ValiderForm'+incre).cerabox({
						animation: 'ease',
						displayTitle: false,
						group: false,
						width:800,
						height:500,
						ajax: {
							data: 'ListeIdPersos='+ListeIdPersos+'&ListeIdSofts='+ListeIdSofts+'&ListeIdSupports='+ListeIdSupports
						}
					 });
					incre++;
					
			  }
			},
			
	 { title: LanguageEbirdy['non'],addClass: 'mBoxConfirmButtonCancel' }
		],
		openOnInit: true
	});
	
		} else NoticeKO(LanguageEbirdy['aucun_firm_ou_perso_choisi']);
	} else NoticeKO(LanguageEbirdy['aucun_support_choisi']);
}
function SwitchPageOnglet(page,onglet) {
	ChargePage(page);
	
	window.setTimeout(function () {myAccordionPrinc.display(onglet);},1000);
}
function ClosePopCera() {
parent.CeraBoxWindow.close();	
}

function verif_integer(champb){
   var chiffresb = new RegExp("[0-9]");
   var verifb;
   for(x = 0; x < champb.value.length; x++){
      verifb = chiffresb.test(champb.value.charAt(x));
      if(verifb == false){
         champb.value = champb.value.substr(0,x) + champb.value.substr(x+1,champb.value.length-x+1); x--;
      }
   }
}

function setfocus (idelement)
{
    document.getElementById(idelement).focus();
}

function dupliquer(idPagerSource,lngserial)
{
    var newSerial = "";
    var box = new mBox.Modal({
    title: LanguageEbirdy['Dupliquerpager'],
    content: ''+LanguageEbirdy['newserial']+'<br><br><input id="nsdestination", name ="nsdestination" type="text" value="" >',
	overlay:true,
	overlayStyles: {
		color: 'black',
		opacity: 0.75
	},
        width:300,
        buttons: [
        { title: LanguageEbirdy['valier'],
		addClass: 'button_green mBoxConfirmButtonSubmit',
                id: 'buttonOk',
                event: function() {
                    
                                newSerial = document.getElementById("nsdestination").value;
                                box.setContent(LanguageEbirdy['Creationpager'] );
                                document.getElementById("buttonOk").style.visibility = "hidden"; 
                                document.getElementById("buttonKo").style.visibility = "hidden"; 
                                var myRequest= new Request({url: 'ajax/dupliquerpager.php',
                                    method: 'post',						 
                                    data: 'idsource='+idPagerSource+'&nsdestination='+newSerial+'&confirm=false',
                                    onSuccess:function(responseText){
                                        result = responseText.split("|");
                                        if(parseInt(result[0],10) == 0) // OK
                                        {
                                            if(result[1] == "1")
                                                parent.NoticeOK(LanguageEbirdy['Creationresult2'],4000);
                                            else
                                                parent.NoticeOK(LanguageEbirdy['Creationresult1'],4000);
                                            box.close();
                                            box.destroy();
                                            parent.CeraBoxWindow.close();
                                            parent.ReloadListePager();
                                        }
                                        else if (parseInt(result[0],10) == 1)   // pager déjà existant besoin de confirmation
                                        {
                                            box.close();
                                            box.destroy();
                                            var box2 = new mBox.Modal({
                                                title: LanguageEbirdy['DupliqueConf'],
                                                content: '<br>'+LanguageEbirdy['ConfReplace']+' ('+newSerial+')<br><br>',
                                                overlay:true,
                                                overlayStyles: {
                                                        color: 'black',
                                                        opacity: 0.75
                                                },
                                                width:300,   
                                                buttons: [
                                                    { title: LanguageEbirdy['valier'], 
                                                        id: 'buttonOk2',
                                                        addClass: 'button_green mBoxConfirmButtonSubmit',
                                                        event: function() {   
                                                            box2.setContent(LanguageEbirdy['Creationpager'] );
                                                            document.getElementById("buttonOk2").style.visibility = "hidden"; 
                                                            document.getElementById("buttonKo2").style.visibility = "hidden"; 
                                                            var myRequest= new Request({url: 'ajax/dupliquerpager.php',
                                                                method: 'post',						 
                                                                data: 'idsource='+idPagerSource+'&nsdestination='+newSerial+'&confirm=true',
                                                                onSuccess:function(responseText){
                                                                    result = responseText.split("|");
                                                                    if(parseInt(result[0],10) == 0) 
                                                                    {   // OK
                                                                        parent.NoticeOK(result[1]);
                                                                        parent.CeraBoxWindow.close();
                                                                        parent.ReloadListePager();
                                                                       
                                                                    }
                                                                     else
                                                                    {   // defaut
                                                                        parent.NoticeKO(result[1],4000);
                                                                    }
                                                                    box2.close();
                                                                    box2.destroy();
                                                                }
                                                            }).send();
                                                        }
                                                    },    
                                                    { title: LanguageEbirdy['annuler'],
                                                        addClass: 'mBoxConfirmButtonCancel',
                                                        id: 'buttonKo2',
                                                        event: function() {
                                                           box2.close();
                                                           box2.destroy();                                                        
                                                        }
                                                    }
                                                ],
                                                 openOnInit: true
                                            });
                                        }
                                        else
                                        { // defaut
                                           
                                            box.close();
                                            box.destroy();
                                            parent.NoticeKO(result[1],4000);
                                                                               }
                                     }
			 	 }).send();	                               
                }
        },
		
        { title: LanguageEbirdy['annuler'],
                addClass: 'mBoxConfirmButtonCancel',
                  id: 'buttonKo',
                event: function() {
                    box.close();
                    box.destroy();
                }
        }
            
        ],
        openOnInit: true
    });
 
    setfocus("nsdestination");   
}

// Les valeurs de type bit (1) peuvent avoir plusieurs éléments à mettre à jour.
// ces éléments sont dans la page web sous forme input type hidden avec un label VRICx_y
// cette fonction recherche tous les labels VRICx et enregistre la valeur.
function updBit(checked,label)
{
    var valeur = "off";
    if(checked)
        valeur = "on";   
    // check if label content _ ?
    var pos = label.indexOf("_");
    var source = label.substring(0,pos);   
    
    // parcour toutes les check box avec ce début de label
    if(pos != -1)
    {
        $$('.cic').each(function (el){
		
                var n = el.get('name');
                var pos = n.indexOf("_");
                var lab = n.substring(0,pos);
                if(lab == source)
                {  
                    el.set('value',valeur);
                }
        });
    } else{
         $$('.cic').each(function (el){
                var lab = el.get('name');
                if(lab == label)
                {  
                    el.set('value',valeur);
                    exit();
                }
        });      
    }  
}