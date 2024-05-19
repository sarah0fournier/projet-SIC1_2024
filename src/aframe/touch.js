/**
 * =======================================================================================
 * Composant A-Frame pour rendre un élément cliquable et réagir aux interactions utilisateur.
 * Ce composant touch est utiliser pour eliminer les fantomes au passage du rayon  
 * =======================================================================================
 */


AFRAME.registerComponent('touch', {
  schema: {
    code: { type: 'int', default: '0'}, 
    paused: { type: 'boolean', default: 'false'}, // Jeu par defaut pas en pause
    },
  init: function () {
    // console.log('initialisation touch')
    this.onRaycasterIntersected = this.onRaycasterIntersected.bind(this);
    this.el.addEventListener('raycaster-intersected', this.onRaycasterIntersected);
    this.onEnter = this.onEnter.bind(this);
    this.el.addEventListener('mouseenter', this.onEnter);
    this.onLeave = this.onLeave.bind(this);
    this.el.addEventListener('mouseleave', this.onLeave);

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
    // console.log('currentTime ', currentTime)

    // Vérifiez si suffisamment de temps s'est écoulé depuis le dernier déclenchement (eviter de delete 2 fois le meme fantomes) (intervalle temps entre declenchement)
    if (currentTime - this.lastRaycasterEventTime < 1000) { // 1000 milliseconds = 1 secondes
      
      // Vérifier si le jeu n'est pas en pause (Si en pause veut pas interaction de tuer des bloc, chercher lieu,...)
      // Si jeu en pause interaction changement couleur curseur fonctionne tjrs mais pas les autres actions 
      // Mettre paused aussi pour code 3 ??? Si met aussi pour code 3 alors vaut mettre paused dans les autres vue aussi --> faire popup qui est tranmis de vue en vue ?
      if (this.el.getAttribute('paused') === 'false') { 

        // Rayon emis par curseur entre en colision avec element de la scene (bloc creer auto) 
        if (this.el.getAttribute('code') === '2') {
          console.log('Bravo vous supprimez des blocs')

          // Faites disparaître la boîte en ajustant sa propriété `visible` à `false`
          this.el.setAttribute('visible', 'false');

          // Émettre un événement pour indiquer qu'un bloc a été supprimé (ajouter score,...)
          this.el.emit('block-removed');

          // Delete interaction clickable sur le fantome qui bougent
          let idElement = this.el.getAttribute('id');
          let monElement = document.querySelector(`#${idElement}`);
          monElement.removeAttribute('touch');
          console.log('Suppression interaction sur ennemi : ', idElement)

          // Stopper le son du fantome 
          const soundComponent = this.el.components.sound;
            if (soundComponent) {
              soundComponent.stopSound();
          }

          const globalSound = document.querySelector('#touch-sound');
            if (globalSound) {
              globalSound.components.sound.playSound();
          }
        }     
      }
    }

    this.lastRaycasterEventTime = currentTime;
  },

  /**
   * Fonction appelée lorsque le curseur entre dans la zone de l'élément.
   * @param {Event} evt - Événement mouseenter.
   */
  onEnter : function (evt) {
      
  },

  /**
   * Fonction appelée lorsque le curseur quitte la zone de l'élément.
   * @param {Event} evt - Événement mouseleave.
   */
  onLeave : function(evt){
      
  },

  /**
   * Fonction de suppression du composant.
   */
  remove: function () {
      this.el.removeEventListener('mouseenter', this.onEnter);
      this.el.removeEventListener('mouseleave', this.onLeave);  
      this.el.removeEventListener('raycaster-intersected', this.onLeave);   
  },
})

