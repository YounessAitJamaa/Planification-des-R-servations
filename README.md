# Calendrier de Réservations – Front-End Project

## 1. Contexte du projet
Ce projet consiste à développer une application Front-End affichant un calendrier hebdomadaire avec les jours du lundi au dimanche. L’application permet à un utilisateur d’ajouter, modifier, supprimer et visualiser des réservations pour différents types d’événements (Standard, VIP, Anniversaire, etc.) de manière intuitive et responsive.

Le samedi et le dimanche sont grisés et inactifs.

---

## 2. Fonctionnalités

### Fonctionnalités principales
- Affichage du calendrier hebdomadaire (lundi → dimanche)  
- Ajout de réservations via un modal  
- Modification et suppression de réservations existantes  
- Système de couleurs selon le type de réservation (ex. rouge = VIP, vert = Standard, bleu = Groupe)  
- Validation du formulaire (nom, heure de début/fin, nombre de personnes)  
- Les réservations restent visibles après actualisation grâce à `localStorage`  
- Application responsive (desktop, tablette, mobile)  

---

## 3. Technologies utilisées
- **HTML5** – Structure de la page  
- **CSS3** – Styles de l’application  
- **Bootstrap 5** – Modals, boutons et responsive design  
- **JavaScript** – Logique du calendrier, gestion des événements, `localStorage`  

---

## 4. Planification

| Étape | Tâches | Statut |
|-------|-------|--------|
| Semaine 1 | Conception de la structure HTML & CSS, mise en place du calendrier | ✅ Terminé |
| Semaine 2 | Création du modal de réservation et validation du formulaire | ✅ Terminé |
| Semaine 3 | Gestion des réservations (ajout, modification, suppression) et sauvegarde dans `localStorage` | ✅ Terminé |
| Semaine 4 | Responsivité et ajustements UI/UX | ✅ Terminé |

---

## 5. Documentation et interface
- Les réservations sont affichées dans les créneaux horaires correspondants à chaque jour.  
- Les types de réservation sont différenciés par couleurs pour une meilleure lisibilité.  
- L’application est accessible et respecte les bonnes pratiques de navigation au clavier et ARIA pour le modal.  
- Les boutons et formulaires sont ergonomiques et faciles à utiliser.

---

## 6. Installation et usage
1. Cloner le dépôt :  
   ```bash
   https://github.com/YounessAitJamaa/Planification-des-R-servations.git
