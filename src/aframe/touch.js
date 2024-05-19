// Tue les fantomes

AFRAME.registerComponent('touch', {
  schema: {
      color : {type : "color", default : "red"},
      code: { type: 'int', default: '0'}, 
      paused: { type: 'boolean', default: 'false'}, // Jeu par defaut pas en pause
    },
  init: function () {
    console.log('initialisation touch')
    this.onRaycasterIntersected = this.onRaycasterIntersected.bind(this);
    this.el.addEventListener('raycaster-intersected', this.onRaycasterIntersected);
    this.onEnter = this.onEnter.bind(this);
    this.el.addEventListener('mouseenter', this.onEnter);
    this.onLeave = this.onLeave.bind(this);
    this.el.addEventListener('mouseleave', this.onLeave);

    // Enregistrez le moment du dernier déclenchement de l'événement raycaster-intersected
    this.lastRaycasterEventTime = 0;
    
  },
  


  update: function (oldData) {

  },

  onRaycasterIntersected: function (evt) {

    // Récupérez le temps actuel
    var currentTime = performance.now(); // Temps general pas propre a entiter donc peut pas deleter 2 fantomes en moins de 1 sec ?? 1 sec bon entre deux va pas reussir a tuer 2 fantome en ce temps de toute facon ?
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

          // Delete interaction clickable sur bloc qui bougent
          let idElement = this.el.getAttribute('id');
          let monElement = document.querySelector(`#${idElement}`);
          monElement.removeAttribute('touch');
          console.log('Suppression interaction sur ennemi : ', idElement)
        }     
      }
    }

    this.lastRaycasterEventTime = currentTime;

  },

  onEnter : function (evt) {
      const cursor = evt.detail.cursorEl;
      if (cursor.getAttribute('raycaster').showLine) {
      this.savedColor = cursor.getAttribute('raycaster').lineColor;
      cursor.setAttribute('raycaster', 'lineColor', this.data.color);
      } else {
      this.savedColor = cursor.getAttribute('material').color;
      cursor.setAttribute('material', 'color', this.data.color);
      }
      console.log('Curseur a changer de couleur')
  },

  onLeave : function(evt){
      const cursor = evt.detail.cursorEl;
      if (cursor.getAttribute('raycaster').showLine) {
      cursor.setAttribute('raycaster', 'lineColor', this.savedColor);
      } else {
      cursor.setAttribute('material', 'color', this.savedColor);
      }
  },

  remove: function () {
      this.el.removeEventListener('mouseenter', this.onEnter);
      this.el.removeEventListener('mouseleave', this.onLeave);
      clearInterval(this.raycasterInterval);
      
  },
})

