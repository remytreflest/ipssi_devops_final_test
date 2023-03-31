# ipssi_devops

<div align="center">
  <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.templatemonster.com%2Fblog%2Fwp-content%2Fuploads%2F2021%2F05%2Frest-api-database.jpg&f=1&nofb=1&ipt=3f6bf3f1d92daa23b47c0cb6cd9e320076fefe5b21ed9c444901d8abec069834&ipo=images">
</div>

# Installation de l'environnement

## 📕 Ressources

**Spécification REST : https://standards.rest/**

## 🛠️ Installation / lancement en environnement local (Windows)

- Télécharger la dernière version LTS de Node.js en vous rendant sur ce lien : https://nodejs.org/en/
- Ouvrir un terminal et exécuter les commandes suivantes :
    - ```cd [emplacement_où_vous_comptez_installer_le_projet]```
    - ```git init``` [^1]
    - ```git clone https://github.com/remytreflest/ipssi_devops_final_test.git``` [^2]
    - ```cd [nom_du_projet]``` [^3]
    - ```npm install``` [^4]
- Installer docker desktop : https://docs.docker.com/desktop/install/windows-install/
- Ouvrir un terminal et exécuter les commandes suivantes :
    - ```docker build -t devops-test-image``` [^5]
    - ```docker compose up``` [^6]
- Ouvrir un client HTTP pour pouvoir requêter à l'address suivante : http://127.0.0.1:3000 (port par défaut)
- Pour éxecuter les tests en local :
    - ```npm run test```

[^1]: *Initialise Git dans le dossier, permet d'utiliser les commandes GIT*

[^2]: *Télécharger le projet sur votre poste*

[^3]: *Se déplacer dans le dossier du projet*

[^4]: *Installe les package depuis npm*

[^5]: *Construit l'image Docker de l'application*

[^6]: *Déploie l'application dans une stack Docker*

## 🎮 Fonctionnalités

### Insertion d'un utilisateur

Permet d'insérer un utilisateur dans la base de données Redis

### Récupération d'un utilisateur

Permet de visualiser un utilisateur par rapport à son identifiant

### Insertions de plusieurs utilisateurs générés aléatoirement

Permet d'insérer des utilisateurs générés aléatoirement dans la base de données Redis

## 👦🏻 Authors

**remytreflest : https://github.com/remytreflest**

**CorentinMaille : https://github.com/CorentinMaille**
