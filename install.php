<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>Installation</title>
</head>
<body>
<?php
if($_POST) {
	echo '<table cellpadding="5" cellspacing="0" width="50%" align="center">';
$lines = file ('include/sql.php');
$lines[13] = '		private $db_login="'.$_POST['LOGINSERVEUR'].'";
';
$lines[14] = '		private	$db_pass="'.$_POST['PASSSERVEUR'].'";
';
$lines[15] = '		private	$db_server="'.$_POST['URLSERVEUR'].'";
';
file_put_contents('include/sql.php', implode('', $lines));	
echo '<tr><td><img src="images/valide.png"></td><td>Modification des fichiers sources faites</td></tr>';	
	
require('include/sql.php');
$REQUETAGE=new SQL();
echo '<tr><td><img src="images/valide.png"></td><td>Préparation pour insertion</td></tr>';	
 
$sql ='
CREATE TABLE [dbo].[VisuAlert](
	[ID] [bigint] IDENTITY(1,1) NOT NULL,
	[refLigneAlerte] [bigint] NULL,
	[ID_UTILISATEUR] [int] NULL,
	[type] [varchar](1) NULL
);';
$REQUETAGE->EXECSQL($sql);
echo '<tr><td><img src="images/valide.png"></td><td>Création des controles alertes</td></tr>';	

$sql ='
CREATE TABLE [variable_global](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[clef] [varchar](50) NOT NULL,
	[valeur] [varchar](500) NULL,
) ;';
$REQUETAGE->EXECSQL($sql);
echo '<tr><td><img src="images/valide.png"></td><td>Création de constante</td></tr>';	
$sql ='
CREATE TABLE [status](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[libelle] [nvarchar](50) NULL,
	[level] [int] NULL
) ;';
$REQUETAGE->EXECSQL($sql);
echo '<tr><td><img src="images/valide.png"></td><td>Création systèmes</td></tr>';	
$sql ='
CREATE TABLE [declancheAlert](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[ID_UTILISATEUR] [int] NOT NULL,
	[ID_ALERT] [int] NULL,
	[okMobile] [int] NULL,
	[okMail] [int] NULL,
	[horraireDebut] [varchar](15) NULL,
	[horraireFin] [varchar](15) NULL,
	[mobile] [varchar](15) NULL,
	[mail] [varchar](500) NULL,
	[active] [int] NULL,
	[okLundi] [int] NULL,
	[okMardi] [int] NULL,
	[okMercredi] [int] NULL,
	[okJeudi] [int] NULL,
	[okVendredi] [int] NULL,
	[okSamedi] [int] NULL,
	[okDimanche] [int] NULL
	);
ALTER TABLE [declancheAlert] ADD  CONSTRAINT [DF_declancheAlert_sms]  DEFAULT ((0)) FOR [okMobile];

ALTER TABLE [declancheAlert] ADD  CONSTRAINT [DF_declancheAlert_mail]  DEFAULT ((0)) FOR [okMail];


ALTER TABLE [declancheAlert] ADD  CONSTRAINT [DF_declancheAlert_active]  DEFAULT ((1)) FOR [active];';
$REQUETAGE->EXECSQL($sql);
echo '<tr><td><img src="images/valide.png"></td><td>Création déclencheur</td></tr>';	
$sql ='
CREATE TABLE [page](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[titre] [nvarchar](50) NOT NULL,
	[url] [nvarchar](50) NOT NULL,
	[chemin] [nvarchar](50) NOT NULL,
	[niveau] [nvarchar](10) NOT NULL
	);
';
$REQUETAGE->EXECSQL($sql);
echo '<tr><td><img src="images/valide.png"></td><td>Création arborecence</td></tr>';	
$sql="INSERT INTO utilisateur ( [identifiant], [password], [clef], [nom], [prenom], [ID_STATUS], [date_add], [date_update], [mail], [mobile])
VALUES 
  ( 'admin', '21232f297a57a5a743894a0e4a801fc3', null, null, null, 1, '2013-05-10 00:00:00.0000000', '2013-05-28 16:01:56.0000000', null, null);
";
$REQUETAGE->EXECSQL($sql);
echo '<tr><td><img src="images/valide.png"></td><td>Insertion des donnée utilisateur<td>';
$sql="

INSERT INTO [page] ( [titre], [url], [chemin], [niveau])
VALUES 
  ( 'suivi', 'suivi_msa', 'suivi_msa.php', '5');

INSERT INTO [page] ( [titre], [url], [chemin], [niveau])
VALUES 
  ( 'accueil', 'accueil', 'accueil.php', '0');

INSERT INTO [page] ( [titre], [url], [chemin], [niveau])
VALUES 
  ( 'reglage', 'reglage', 'reglage.php', '5');

INSERT INTO [page] ( [titre], [url], [chemin], [niveau])
VALUES 
  ( 'Fiche des centres', 'fiche_centre', 'fiche_centre.php', '5');

INSERT INTO [page] ( [titre], [url], [chemin], [niveau])
VALUES 
  ( 'Localisation des centres', 'placement_centre', 'placement_centre.php', '5');

INSERT INTO [page] ( [titre], [url], [chemin], [niveau])
VALUES 
  ('Fiche des utilisateurs', 'fiche_utilisateur', 'fiche_utilisateur.php', '5');

INSERT INTO [page] ( [titre], [url], [chemin], [niveau])
VALUES 
  ( 'Gestion pagers', 'gestion_pagers', 'gestion_pagers.php', '5');

INSERT INTO [page] ( [titre], [url], [chemin], [niveau])
VALUES 
  ( 'Fiche pagers', 'fiche_pagers', 'fiche_pagers.php', '5');

INSERT INTO [page] ( [titre], [url], [chemin], [niveau])
VALUES 
  ( 'Import pagers', 'ImportPagers', 'ImportPagers.php', '5');

INSERT INTO [page] ( [titre], [url], [chemin], [niveau])
VALUES 
  ( 'Déploiement', 'deploiement', 'deploiement.php', '5');

INSERT INTO [page] ( [titre], [url], [chemin], [niveau])
VALUES 
  ( 'Suivi', 'suivi', 'suivi.php', '5');

INSERT INTO [page] ( [titre], [url], [chemin], [niveau])
VALUES 
  ( 'Confirmation de déploiement', 'confirmation_deploiement', 'confirmation_deploiement.php', '5');

INSERT INTO [page] ( [titre], [url], [chemin], [niveau])
VALUES 
  ( 'Listes des suivis', 'liste_suivi', 'liste_suivi.php', '5');

INSERT INTO [page] ( [titre], [url], [chemin], [niveau])
VALUES 
  ( 'Listes lot', 'liste_lot', 'liste_lot.php', '5');

INSERT INTO [page] ( [titre], [url], [chemin], [niveau])
VALUES 
  ( 'Tableau de bord des centres', 'tableau_centre', 'tableau_centre.php', '5');

INSERT INTO [page] ( [titre], [url], [chemin], [niveau])
VALUES 
  ( 'Parametrage des alerts', 'ParamAlert', 'ParamAlert.php', '5');

INSERT INTO [page] ( [titre], [url], [chemin], [niveau])
VALUES 
  ( 'Suivi des persos', 'suivi_perso', 'suivi_perso.php', '5');

INSERT INTO [page] ( [titre], [url], [chemin], [niveau])
VALUES 
  ( 'Listes des suivis de persos', 'liste_suivi_persos', 'liste_suivi_persos.php', '5');

INSERT INTO [page] ( [titre], [url], [chemin], [niveau])
VALUES 
  ( 'Affectations des cradles', 'affectation_cradles', 'affectation_cradles.php', '5');

INSERT INTO [page] ( [titre], [url], [chemin], [niveau])
VALUES 
  ( 'Historique cradles', 'cradleHisto', 'cradleHisto.php', '5');

INSERT INTO [page] ( [titre], [url], [chemin], [niveau])
VALUES 
  ( 'Historique Pagers', 'pagerHisto', 'pagerHisto.php', '5');

INSERT INTO [page] ( [titre], [url], [chemin], [niveau])
VALUES 
  ( 'Historique systeme', 'sysHisto', 'sysHisto.php', '5');

INSERT INTO [page] ( [titre], [url], [chemin], [niveau])
VALUES 
  ( 'Stats global', 'stats_global', 'stats_global.php', '5');

INSERT INTO [page] ( [titre], [url], [chemin], [niveau])
VALUES 
  ( 'Upload du logo', 'upload_logo', 'upload_logo.php', '5');

INSERT INTO [page] ( [titre], [url], [chemin], [niveau])
VALUES 
  ( 'Alerte Systèmes', 'sys_alert', 'sys_alert.php', '5');

INSERT INTO [page] ( [titre], [url], [chemin], [niveau])
VALUES 
  ( 'Historique systèemes', 'sys_histo', 'sys_histo.php', '5');

INSERT INTO [page] ( [titre], [url], [chemin], [niveau])
VALUES 
  ( 'Listes des echecs', 'ListeEchec', 'ListeEchec.php', '5');



INSERT INTO [status] ( [libelle], [level])
VALUES 
  ( 'ADMIN', 10);

INSERT INTO [status] ([libelle], [level])
VALUES 
  ( 'VIEWER', 5);


INSERT INTO [variable_global] ([clef], [valeur])
VALUES 
  ( 'VersExcel', '0');

INSERT INTO [variable_global] ([clef], [valeur])
VALUES 
  ( 'LastPerso', '0');

INSERT INTO [variable_global] ([clef], [valeur])
VALUES 
  ( 'LastSoft', '1');

INSERT INTO [variable_global] ([clef], [valeur])
VALUES 
  ( 'DureeNouveaute', '5');

INSERT INTO [variable_global] ([clef], [valeur])
VALUES 
  ( 'DateLastPerso', '19000101');

INSERT INTO [variable_global] ([clef], [valeur])
VALUES 
  ( 'DateLastSoft', '19000101');

INSERT INTO [variable_global] ([clef], [valeur])
VALUES 
  ( 'NOMDEP', 'Dordogne');

INSERT INTO [variable_global] ([clef], [valeur])
VALUES 
  ( 'SMTP', 'ns0.ovh.net');

INSERT INTO [variable_global] ([clef], [valeur])
VALUES 
  ( 'loginSMTP', 'ebirdy@tplsystemes.com');

INSERT INTO [variable_global] ([clef], [valeur])
VALUES 
  ( 'passeSMTP', 'ebirdy');

INSERT INTO [variable_global] ([clef], [valeur])
VALUES 
  ('mailEnvoie', 'ebirdy@tplsystemes.com');

INSERT INTO [variable_global] ([clef], [valeur])
VALUES 
  ( 'pays', 'france');

INSERT INTO [variable_global] ([clef], [valeur])
VALUES 
  ( 'logo', '');


";
$REQUETAGE->EXECSQL($sql);
echo '<tr><td><img src="images/valide.png"></td><td>Insertion des donnée global </td></tr>';	
	
}

?>
<?php if(!$_POST) { ?>
<center>
<em>Merci de lancer eBirdy_server.exe avant cette installation</em><br>
<br>

<form action="" method="post">
Adresse du serveur : <input type="text" name="URLSERVEUR"><br>
Login : <input type="text" name="LOGINSERVEUR"><br>
Mot de passe : <input type="text" name="PASSSERVEUR"><br>

<input type="submit" value="Instalation">
</form>
</center>
<?php } ?>
</body>
</html>