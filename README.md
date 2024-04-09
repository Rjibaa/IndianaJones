# Projet Indiana Jones

Ce dépôt GitHub contient le code source du projet de test technique "IndianaJones". L'objectif était de mettre en œuvre une solution pour trouver 
les trains que Indiana Jones doit prendre pour qu'il puisse atteindre la ville d'arrivée au plus tôt possible, tout en fournissant une interface 
utilisateur permettant de gérer et d'ajouter des trains, ainsi que de trouver des trajets optimaux.

# Implémentation Backend et Frontend

## Technologies utilisées

### Backend:
Pour la partie backend, j'ai choisi d'utiliser **NestJS**, un framework Node.js qui permet une structure propre et organisée du code. 
Cela facilite le développement et la maintenance de l'application. J'ai également utilisé **MySQL** comme base de données pour enregistrer 
les informations sur les trains. Étant donné que les données sont statiques et nécessitent peu de modifications, 
MySQL offre une solution efficace pour stocker et gérer ces données. De plus, j'ai utilisé **Docker** pour créer une image de MySQL 
ainsi qu'une image de phpMyAdmin, ce qui simplifie le déploiement et la gestion de la base de données.

### Frontend:
Pour la partie frontend, j'ai opté pour **Angular**, un framework qui offre une approche basée sur les composants pour la construction 
d'interfaces utilisateur riches et interactives. J'ai choisi Angular car je suis familier avec son fonctionnement et sa structure, 
ce qui m'a permis de développer rapidement l'interface utilisateur. De plus, j'ai utilisé **Bootstrap** comme framework CSS pour assurer 
un design responsive et moderne de l'application frontend. 

## Approches algorithmique (Algorithme de Dijikstra)

Pour résoudre le problème du trajet optimal pour Indiana Jones lors de son voyage, j'ai choisi d'implémenter l'algorithme de **Dijkstra**. Cet algorithme est particulièrement adapté pour trouver le chemin le plus court entre deux nœuds dans un graphe pondéré.. Ce graphe est représenté par les villes de départ et d'arrivée, 
avec le temps d'arrivée du train à chaque station comme poids.
L'implémentation commence par la création d'un graphe basé sur les données des trains dont les heures de départ sont postérieures à l'heure de départ 
d'Indiana Jones. Chaque nœud représente une ville et chaque arête un trajet de train entre deux villes. L'algorithme explore ensuite ce graphe à partir 
de la ville de départ, utilisant une file de priorité pour sélectionner les nœuds voisins et mettre à jour les coûts de trajet les plus courts jusqu'à atteindre la ville d'arrivée.
Durant cette exploration, les horaires de départ des trains sont pris en compte pour garantir que les trajets sélectionnés respectent les contraintes de temps.
Une fois la ville d'arrivée atteinte, l'algorithme reconstruit le trajet optimal en remontant le chemin le plus court jusqu'à la ville de départ. 
Enfin, il retourne les détails du trajet optimal, incluant les trains à prendre et les heures de départ et d'arrivée. 
Cette approche permet à Indiana Jones de trouver efficacement le meilleur itinéraire pour atteindre sa destination tout en tenant compte des horaires de train
disponibles.


## Setup

1. Clonez ce dépôt sur votre machine:
   ```bash
    $ git clone https://github.com/votre-nom-utilisateur/IndianaJones.git
   ```
2. Install dependencies:
   ```bash
    # Accédez au dossier frontend
    $ cd IndianaJones/indiana_frontend
    # Installez les dépendances du frontend
    $ npm install
    
    # Accédez au dossier backend
    $ cd ../indiana_backend
    # Installez les dépendances du backend
    $ npm install
   ``` 
3. Start the project:
   ```bash
    # Lancez les conteneurs MySQL et phpMyAdmin
    $ docker compose up
  
    # Une fois que les conteneurs sont en cours d'exécution, ouvrez un nouveau terminal et accédez au dossier backend
    $ cd ../indiana_backend
    # Démarrez le backend
    $ npm run start
    
    # Dans un autre terminal, accédez au dossier frontend
    $ cd ../indiana_frontend
    # Démarrez le frontend
    $ ng serve
   ```
5. Access the application at http://localhost:4200 in your web browser.

