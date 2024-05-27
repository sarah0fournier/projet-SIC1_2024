/**
 * =======================================================================================
 * Composant A-Frame pour lancer le son d'une entité pointée par le rayon
 * Si en pause on peut quand même pointé les objets décoratifs.
 * =======================================================================================
 */
AFRAME.registerComponent('ray_sound', {
  schema: {
  },
  
  init: function () {
    // Fonction de gestion de l'événement 'raycaster-intersected'
    this.onRaycasterIntersected = this.onRaycasterIntersected.bind(this);   
    // Ajout d'un écouteur d'événements 'raycaster-intersected'
    this.el.addEventListener('raycaster-intersected', this.onRaycasterIntersected);
  },


  // Fonction appelée lorsque l'événement 'raycaster-intersected' est déclenché
  onRaycasterIntersected: function (evt) {
    // Récupération du composant sound attaché à l'entité
    var sound = this.el.components.sound;
    if (sound) {
      // Si le composant sound est trouvé, jouer le son associé à l'entité
      sound.playSound();
    } else {
      // Si le composant sound n'est pas trouvé, afficher un avertissement dans la console
      console.warn('Sound component not found');
    }
  },

  // Méthode de nettoyage lorsque le composant est supprimé
  remove: function () {
    this.el.removeEventListener('raycaster-intersected', this.onRaycasterIntersected);
  },
});
