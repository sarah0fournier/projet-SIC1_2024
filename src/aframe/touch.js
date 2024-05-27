/**
 * =======================================================================================
 * Composant A-Frame pour rendre un élément interactif aux interactions du rayon.
 * Ce composant touch est utiliser pour eliminer les ennemis au passage du rayon
 * SANS CLIC   
 * =======================================================================================
 */
// Import du son
import touchSoundSrc from "../sounds/touch.mp3" ;

AFRAME.registerComponent('touch', {
  schema: {
    paused: { type: 'boolean', default: 'false'}, // Par defaut jeu pas en pause
  },
  init: function () {
    this.onRaycasterIntersected = this.onRaycasterIntersected.bind(this);
    this.el.addEventListener('raycaster-intersected', this.onRaycasterIntersected);

    // Enregistrez le moment du dernier déclenchement de l'événement raycaster-intersected
    this.lastRaycasterEventTime = 0;
  },

  /**
   * Fonction appelée lorsqu'un rayon entre en intersection avec l'élément.
   * @param {Event} evt - Événement raycaster-intersected.
   */

  onRaycasterIntersected: function (evt) {
    // Récupérez le temps actuel
    var currentTime = performance.now(); 

    // Vérifiez si suffisamment de temps s'est écoulé depuis le dernier déclenchement 
    // (eviter de delete 2 fois le meme fantomes) (intervalle temps entre declenchement)
    if (currentTime - this.lastRaycasterEventTime < 1000) {
      // Si jeu en pause -> pas interaction de tuer des fantome 
      if (this.el.getAttribute('paused') === 'false') {
        // Faites disparaître la boîte en ajustant sa propriété `visible` à `false`
        this.el.setAttribute('visible', 'false');

        // Émettre un événement pour indiquer qu'un bloc a été supprimé (ajouter score,...)
        this.el.emit('block-removed');

        // Delete interaction clickable sur le fantome qui bougent
        let idElement = this.el.getAttribute('id');
        let monElement = document.querySelector(`#${idElement}`);
        monElement.removeAttribute('touch');

        // Stopper le son du fantome quand il est touché
        const soundComponent = this.el.components.sound;
        if (soundComponent) {
          soundComponent.stopSound();
        }

        // Jouer le son global de touch (clic lors de la suppression d'un fantôme)
        const touchSound = document.createElement('audio');
        touchSound.setAttribute('id', 'clic-sound');
        touchSound.setAttribute('src', touchSoundSrc);
        document.body.appendChild(touchSound);
        touchSound.play();
      }
    }

    this.lastRaycasterEventTime = currentTime;
  },

  /**
   * Fonction de suppression du composant.
   */
  remove: function () {
    this.el.removeEventListener('raycaster-intersected', this.onRaycasterIntersected);   
  },
});
