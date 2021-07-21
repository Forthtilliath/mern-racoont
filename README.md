# Introduction

Ce projet est un gros projet MERN (MongoDB, Express, React et Nodejs) afin de créer un réseau social. Le projet est découpé en 2 parties : [Partie Back-end](https://www.youtube.com/watch?v=SUPDFHuvhRc) et [Partie Front-end](https://www.youtube.com/watch?v=ghdRD3pt8rg). Le style du projet est inclus dans les fichiers de base.

# Intérêts du projet

## Faire un site fullstack

L'intérêt premier est de réaliser un site fullstack afin de voir l'ensemble des intéractions entre le front et le back.

Dans les projets précédents fait à partir d'Openclassrooms, je ne m'occupais que du front ou du back, l'autre partie étant déjà faite. Ici, je vais pouvoir voir quoi demander, quoi renvoyer et comment le traiter. Je vais pouvoir voir le cheminement qui se fait entre la demande et la réception des données.

## Projet MERN

Après quelques petits projets pour prendre en main Réact, ce projet va me permettre de voir les possibilités qu'offre ce framework et la façon dont Réact intéragit avec un Back, car jusqu'à présent, tous les projets que j'ai réalisé avec n'avaient pas de back-end.

## Redux

Ce projet utilise Redux. Je ne sais pas du tout ce qu'il fait et à quoi il sert. J'en ai pas mal entendu parler. Ca sera donc l'occasion de découvrir tout ca.

# Problèmes rencontrés

Malgré l'envergure du projet, je n'ai pas rencontré de réels problèmes. Les problèmes que j'ai mis le plus de temps à corriger étaient dûs à des erreurs des plus idiotes (par exemple, un reducer qui n'avait pas le bon nom lors de la combinaison des reducers).

J'ai aussi rencontré des difficultés lorsque je modifiais le code afin de l'optimiser ou le mettre à jour.

# Ce que m'a apporté ce projet

Ce projet m'a énormement apporté. J'ai pu réellement découvrir Réact au sein d'un projet intéressant et de grosse envergure. Redux apporte tellement dès le moment où l'on a besoin de partager des données entre les pages. 

L'intérêt de ce projet était de développer un site fullstack. Comme nous avons commencé par le back, il était nécessaire de tester ce que nous développions. Pour cela, nous utilisions Postman. J'avais déjà eu l'occasion de m'en servir, mais plus en survol qu'autre chose. Ici, j'ai eu l'occassion d'apprendre à m'en servir correctement pour tester chacune des routes ainsi que les erreurs possibles pour vérifier les retours fait par le back.

Travailler sur un projet comme celui ci m'a aussi aidé à mieux structurer mes fichiers, sinon cela aurait été rapidement la pagaille pour s'y retrouver, que ce soit pour retrouver un fichier ou retrouver un bout de code dans un fichier si tout était mal structuré.

Sachant qu'il ne faut pas oublier que lors du développement d'un site, on risque de ne pas être le seul développeur à travailler dessus tout au long de sa durée de vie. Il est donc essentiel d'être bien ordonné.

# Améliorations possibles

## Mode sombre

Les sites ont de plus en plus de mode sombre à disposition. En avoir un, serait un plus.

Lors de projets précédents, j'ai pu apprendre à mettre en place un mode sombre avec ou sans réact. Il serait l'occasion de mettre en pratique ce que j'ai appris.

## Gestion optimale des images

Lors du développement du projet, plusieurs éléments m'ont interpellé.

Le premier était de ne pas compresser les images que les utilisateurs uploadent. Certes, les fichiers autorisés ont une taille limite, mais mettre en place un système de compression d'image pourrait permettre d'économiser énormement de place.<br/>
Autant si des petits sites cela pourrait être acceptable, mais sur un réseau social, où les utilisateurs peuvent poster des posts sans limite, il est essentiel de compresser les images dès que possible.

Le second élément à m'avoir interpellé est la maintenance des images, je parle du fait de supprimer une image qui ne sert plus.<br/>
L'image du profil utilise l'id de l'utilisateur et son format est automatiquement replacé par jpg. Cela a pour avantage de faire que chaque utilisateur ne peut avoir qu'une seule image. Dès que celui ci en upload un avantar, l'ancienne image est remplacée par la nouvelle.<br/>
Toutefois, les images des posts utilisent le pseudo, suivie du timestamp, avec pour extension jpg. Si l'utilisateur remplace l'image de son post, l'ancienne n'est ni remplacée par la nouvelle, ni supprimée. De même si l'utilisateur supprime son post. Les images sont conservées. Tant de place occupée inutilement.

Il serait donc essentiel, de supprimer l'image du post lorsque celle-ci est remplacée ou le post supprimé. 

## Rendre possible le partage via widgets

Ce projet a permis de développer un réseau social, mais seul l'icone pour le partage a été mise en place. Il serait donc bien d'ajouter la possibilité de réellement pouvoir partager un post.

Il est possible de partager sur différents sites comme Facebook, Google Plus, Twitter.

J'ai trouvé plusieurs sites pour m'aider à mettre ca en place :<br/>
https://youtu.be/EUrmQkd8RsM<br/>
https://www.youtube.com/watch?v=yg-YY8HYzT8<br/>
https://www.youtube.com/watch?v=hLRINjGq04M<br/>
https://greglobinski.github.io/react-custom-share/share-button/<br/>
https://openbase.com/js/react-facebook


## Ajouter une page : Voir ses posts

Ce projet utilise énormement de Hooks, donc pouvoir ajouter une page serait l'occasion de mettre en pratique ces Hooks et voir si j'ai bien assimilé ce que j'ai découvert.

Pour cela, avoir une page qui post uniquement les posts de l'utilisateur connecté afin de pouvoir les modérer plus facilement.

## Optimiser le thread

J'ai constaté que durant le développement du thread, on faisait un premier hook pour afficher un certain nombre de posts sur le thread. Un système de scroll infini permet d'augmenter ce nombre de post en allant à nouveau chercher dans la db les posts de 0 à ce nouveau montant de post.

Par la suite, un hook pour afficher les posts ayant le plus de j'aime a été ajouter. Pour ce faire, un reducer permettant de récupérer tous les posts a été requis.

Pour optimiser notre premier hook, il serait préférable d'utiliser le second pour générer le premier. Cela permettrait de réduire le nombre d'appels à la db.

## Rechercher un utilisateur et afficher son profil

Nous sommes sur un réseau social, donc pouvoir afficher rechercher d'autres utilisateurs et afficher leur profil serait un plus. Afficher leur profil utilisera le même principe que d'afficher le profil de l'utilisateur connecté.

Le petit plus sera d'ajouter un champ de recherche dans la navbar et de rendre la recherche dynamique.


## Améliorer la sécurité et optimiser le front via des middlewares

Lors de projets précédents, j'ai découvert des librairies pour améliorer la sécurité back, tel que Helmet ou un moyen de limiter le nombre de connexion.

J'avais aussi utilisé deux middlewares qui permettaient de ne pas conserver de cache. Etant une application one-page, l'utilisateur n'aura qu'un chargement au cours de sa navigation, donc autant s'assurer que l'utilisateur ait une version à jour du site.<br/>
De plus, il est possible de compresser les données afin que cela soit plus rapide à charger. Un bon moyen de contre-balancer le fait de ne pas avoir de cache.

Il est aussi possible d'encoder l'email afin que dans le cas où celui ci est récupéré par des personnes mal intentionnées, l'email ne leur soit pas montré en clair.

https://www.npmjs.com/package/react-helmet

## Changement de l'image du profil plus transparente

En effet, je trouve que le changement de l'image du profil manque de transparence. Qu'est-ce que j'entends par cela ?<br/>
J'entends par là, que lorsque l'utilisateur change d'image, rien ne lui indique que la nouvelle image a été accepter jusqu'au moment où il valide son choix. Il serait donc bien de modifier l'image affichée par la nouvelle afin de montrer une prévisualisation de ce que cela donnera et surtout avertir l'utilisateur que son choix est bien pris en compte.

# Améliorations apportées

## Ajout de middlewares

Dans le but d'améliorer la sécurité et optimiser les performances, j'ai mis en place 3 middlewares, helmet, nocache et compression.

J'ai aussi légèrement augmenté le salt pour l'encodage du mot de passe car plus les années passent, plus les ordinateurs/serveurs sont puissants, et plus il est rapide de générer un mot de passe encodé, ainsi que de tenter de les crackers. 

Afin d'optimiser la place occupée par les images que les utilisateurs uploads, j'ai installé un middleware pour les compresser. J'utilise sharp pour faire ceci. J'ai configuré pour que les images du profil soient redimmentionnée à maximum 180px en hauteur et largeur (la taille la plus grosse affichée sur le site sur le profil), et soit compressé de 50%.<br/>
Les images des posts sont quant à elle réduite à 2000px et compressées de 50%.

Ces réglages sont facilement modifiables via le fichier env.

# Screenshots du projet

## Screens à la fin de la video
### Thread
![thread](/screenshots/thread.png)

### Profil
![profil](/screenshots/profil.png)
![abonnements](/screenshots/abonnements.png)

### Trending
![trending](/screenshots/trending.png)

## Screen suite aux modifications apportées