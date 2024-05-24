/**
 * =======================================================================================
 * Composant A-Frame pour rendre un élément cliquable et réagir aux interactions utilisateur.
 * Ce composant clikacble est utiliser pour passer a une autre page.
 * =======================================================================================
 */


/**
 * Composant A-Frame pour rendre un élément cliquable et réagir aux interactions utilisateur.
 * @module clickable
 * @param {object} schema - Schéma du composant.
 * @param {string} schema.color - Couleur par défaut du curseur lorsqu'il survole l'élément.
 * @param {number} schema.code - Code associé à l'élément pour déclencher des actions spécifiques.
 *                               code = 3 : Curseur passer sur un bouton pour aller a une prochaine page
 *                               code = 1 : Curseur passer sur le lieu a trouver
 * @param {boolean} schema.paused - État du jeu (en pause ou non).
 */

import {getFoeIds} from './foe.js';

AFRAME.registerComponent('clickable', {
  schema: {
      color : {type : "color", default : "green"},
      code: { type: 'int', default: '0'}, 
      paused: { type: 'boolean', default: 'false'}, // Jeu par defaut pas en pause
  },

  /**
   * Fonction d'initialisation du composant.
  */
  init: function () {
    this.onRaycasterIntersected = this.onRaycasterIntersected.bind(this);
    this.el.addEventListener('raycaster-intersected', this.onRaycasterIntersected);
    this.onEnter = this.onEnter.bind(this);
    this.el.addEventListener('mouseenter', this.onEnter);
    this.onLeave = this.onLeave.bind(this);
    this.el.addEventListener('mouseleave', this.onLeave);
  },


  /**
   * Fonction appelée lorsqu'un rayon entre en intersection avec l'élément.
   * @param {Event} evt - Événement raycaster-intersected.
   */
  onRaycasterIntersected: function (evt) {

    // Aller dans une prochaine vue via la methode nextPage
    if (this.el.getAttribute('code') === '3') {
      const globalSound = document.querySelector('#clickable-sound');
      if (globalSound) {
        // Jouer le son
        globalSound.components.sound.playSound();
      }
      
      // Attendre 1 seconde avant d'émettre l'événement nextPage
      setTimeout(() => {
        this.el.emit('nextPage');
        // console.log('Passage dans une prochaine scène / vue');
      }, 100); // 
    }

    // Vérifier si le jeu n'est pas en pause (isPaused is 'true' => interaction en pause pour rechercher lieu,...)
    if (this.el.getAttribute('paused') === 'false') { 

      if(this.el.getAttribute('code') === '1'){
        // console.log('Bravo vous avez trouver le lieu indiquer')

        const finSound = document.querySelector('#fin-sound');
        if (finSound) {
          // Jouer le son
          finSound.components.sound.playSound();
        }
        // Emettre un evenement pour ouvrir popup
        this.el.emit('win');

        // Delete interaction clickable - Utiliser l'ID pour sélectionner l'élément dans le DOM
<<<<<<< HEAD
        // A NG : Permet enelver interaction sur le hit-box Si oui adapter les comm car c'est pas coeherent la (attention avec les copier coller entre file js)??????        let idElement = this.el.getAttribute('id');
=======
        // A NG : Permet enelver interaction sur le hit-box Si oui adapter les comm car c'est pas coeherent la (attention avec les copier coller entre file js)??????
>>>>>>> 2021a4d52c0ece96cafa80cc9c99bf0a5df7ddf5
        let idElement = this.el.getAttribute('id');
        let monElement = document.querySelector(`#${idElement}`);
        monElement.removeAttribute('clickable');
        // console.log('Suppression interaction sur bloc : ', idElement)

        // Delete interaction touch / son / visibilite sur le fantome qui bougent apres reussite    
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
   * Fonction appelée lorsque le curseur entre dans la zone de l'élément.
   * @param {Event} evt - Événement mouseenter.
   */
  onEnter : function (evt) {
    const cursor = evt.detail.cursorEl;
    if (cursor.getAttribute('raycaster').showLine) {
      this.savedColor = cursor.getAttribute('raycaster').lineColor;
      cursor.setAttribute('raycaster', 'lineColor', this.data.color);
    } else {
      this.savedColor = cursor.getAttribute('material').color;
      cursor.setAttribute('material', 'color', this.data.color);
    }
  },

  /**
   * Fonction appelée lorsque le curseur quitte la zone de l'élément.
   * @param {Event} evt - Événement mouseleave.
   */
  onLeave : function(evt){
    const cursor = evt.detail.cursorEl;
    if (cursor.getAttribute('raycaster').showLine) {
      cursor.setAttribute('raycaster', 'lineColor', this.savedColor);
    } else {
      cursor.setAttribute('material', 'color', this.savedColor);
    }
  },

  /**
   * Fonction de suppression du composant.
   */
  remove: function () {
    this.el.removeEventListener('mouseenter', this.onEnter);
    this.el.removeEventListener('mouseleave', this.onLeave);
  },
})

