AFRAME.registerComponent('clickable', {
  schema: {
      color : {type : "color", default : "red"},
      code: { type: 'int', default: '0'}, 
      paused: { type: 'boolean', default: 'false'}, // Jeu par defaut pas en pause
    },
  init: function () {
      this.onRaycasterIntersected = this.onRaycasterIntersected.bind(this);
      this.el.addEventListener('raycaster-intersected', this.onRaycasterIntersected);
      this.onEnter = this.onEnter.bind(this);
      this.el.addEventListener('mouseenter', this.onEnter);
      this.onLeave = this.onLeave.bind(this);
      this.el.addEventListener('mouseleave', this.onLeave);
  },

  update: function (oldData) {

  },

  onRaycasterIntersected: function (evt) {

    // Aller dans une prochaine vue via la methode nextPage
    if(this.el.getAttribute('code') === '3'){
      this.el.emit('nextPage');
      console.log('Passage dans une prochaine scene / vue')
    }

    // Vérifier si le jeu n'est pas en pause (Si en pause veut pas interaction de tuer des bloc, chercher lieu,...)
    // Si jeu en pause interaction changement couleur curseur fonctionne tjrs mais pas les autres actions 
    // Mettre paused aussi pour code 3 ??? Si met aussi pour code 3 alors vaut mettre paused dans les autres vue aussi --> faire popup qui est tranmis de vue en vue ?
    if (this.el.getAttribute('paused') === 'false') { 

      if(this.el.getAttribute('code') === '1'){
        console.log('Bravo vous avez trouver le lieu indiquer')

        // Emettre un evenement pour ouvrir popup
        this.el.emit('win');
        console.log('etat pause ', this.el.getAttribute('paused'))
        // Delete interaction clickable - Utiliser l'ID pour sélectionner l'élément dans le DOM
        let idElement = this.el.getAttribute('id');
        let monElement = document.querySelector(`#${idElement}`);
        monElement.removeAttribute('clickable');
        console.log('Suppression interaction sur bloc : ', idElement)
      }

      // Rayon emis par curseur entre en colision avec element de la scene (bloc creer auto) 
      else if (this.el.getAttribute('code') === '2') {
        console.log('Bravo vous supprimer des blocs')

        // Faites disparaître la boîte en ajustant sa propriété `visible` à `false`
        this.el.setAttribute('visible', 'false');

        // Émettre un événement pour indiquer qu'un bloc a été supprimé (ajouter score,...)
        this.el.emit('block-removed');

        // Delete interaction clickable sur bloc qui bougent
        let idElement = this.el.getAttribute('id');
        let monElement = document.querySelector(`#${idElement}`);
        monElement.removeAttribute('clickable');
        console.log('Suppression interaction sur bloc : ', idElement)
      }     
    }
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
      
  },
})


AFRAME.registerComponent('cube-generator', {
    init: function() {
      var cubeContainer = document.querySelector('#cube-container');

      setInterval(function() {
        if (cubeContainer.childElementCount >= 10) return; // Limit to 10 cubes

        var cube = document.createElement('a-box');
        cube.setAttribute('class', 'cube');
        cube.setAttribute('color', 'green');
        cube.setAttribute('scale', '0.5 0.5 0.5');
        cube.setAttribute('position', getRandomPosition());
        cubeContainer.appendChild(cube);

        // Animate cube towards player
        cube.setAttribute('animation', {
          property: 'position',
          to: '0 1 -3',
          dur: 3000
        });
      }, 5000); // Create a new cube every 5 seconds

      function getRandomPosition() {
        var x = Math.random() * 10 - 5; // Random X position
        var y = Math.random() * 2 + 1;  // Random Y position (above ground)
        var z = Math.random() * -10;    // Random Z position (behind player)
        return x + ' ' + y + ' ' + z;
      }
    }
  });

  AFRAME.registerComponent('shoot', {
    init: function() {
      var el = this.el;
      var scene = document.querySelector('a-scene');
      var cubes = document.querySelectorAll('.cube');

      el.addEventListener('triggerdown', function() {
        var pointer = document.querySelector('#pointer');
        var raycaster = pointer.components.raycaster;
        var intersects = raycaster.intersectObjects(cubes);

        if (intersects.length > 0) {
          // Remove the first intersected cube
          intersects[0].object.parentNode.removeChild(intersects[0].object);
        }
      });
    }
  });



