// Import des sons
import finSoundSrc from "C:/Users/nonog/Documents/Lecon_HES-SO/S2/SIC1/99_Projet/projet-SIC1_2024/public/assets/fin.mp3" 
import clicSoundSrc from "C:/Users/nonog/Documents/Lecon_HES-SO/S2/SIC1/99_Projet/projet-SIC1_2024/public/assets/clickable.mp3"
import {getFoeIds} from 'C:/Users/nonog/Documents/Lecon_HES-SO/S2/SIC1/99_Projet/projet-SIC1_2024/src/aframe/foe.js';

AFRAME.registerComponent('clickable', {
  schema: {
    code: { type: 'int', default: 0 }, // Code associé à l'élément pour déclencher des actions spécifiques
    paused: { type: 'boolean', default: false }, // État du jeu (en pause ou non)
  },

  // Lier la fonction onClick à l'écouteur de clics
  init: function () {
    this.onClick = this.onClick.bind(this);
    this.el.addEventListener('click', this.onClick);
  },

  /**
   * Fonction appelée lorsque l'utilisateur clique sur l'élément.
   */
  onClick: function () {
    // Vérifier si le jeu n'est pas en pause
    if (!this.data.paused) {

      // Action spécifique pour le code 3 = boutons : Jouer un son et passer à la page suivante
      if (this.el.getAttribute('code') === '3') {
        // Jouer le son du clic
        const clicSound = document.createElement('audio');
        clicSound.setAttribute('id', 'clic-sound');
        clicSound.setAttribute('src', clicSoundSrc);
        document.body.appendChild(clicSound);
        clicSound.play();

        // Attendre 1 seconde avant d'émettre l'événement nextPage
        setTimeout(() => {
          this.el.emit('nextPage');
        }, 1000);
      }

      // Action spécifique pour le code 1: Jouer un son, émettre un événement win et nettoyer les interactions
      if (this.el.getAttribute('code') === '1') {

        const finSound = document.createElement('audio');
        finSound.setAttribute('id', 'fin-sound');
        finSound.setAttribute('src', finSoundSrc);
        document.body.appendChild(finSound);

        // Jouer le son
        finSound.play();

        // Émettre un événement pour ouvrir popup
        this.el.emit('win');

        // Permet d'enlever l'interaction sur la hit-box 
        this.el.removeAttribute('clickable');

        // Supprimer l'interaction touch / son / visibilité sur les ennemis qui bougent après réussite
        var foeIds = getFoeIds();
        foeIds.forEach(function(id) {
          let element = document.querySelector(`#${id}`);
          if (element) {
            element.removeAttribute('touch');
            element.setAttribute('visible', 'false');
            element.removeAttribute('sound');
          }
        });
      }
    }
  },

  /**
   * Fonction de nettoyage lorsque le composant est supprimé de l'élément.
   */
  onRemove: function () {
    this.el.removeEventListener('click', this.onClick);
  }
});
