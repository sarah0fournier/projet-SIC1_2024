AFRAME.registerComponent('touchSound', {
  schema: {
      color : {type : "color", default : "green"},
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
 
    // Vérifier si le jeu n'est pas en pause (Si en pause veut pas interaction de tuer des bloc, chercher lieu,...)
    // Si jeu en pause interaction changement couleur curseur fonctionne tjrs mais pas les autres actions 
    // Mettre paused aussi pour code 3 ??? Si met aussi pour code 3 alors vaut mettre paused dans les autres vue aussi --> faire popup qui est tranmis de vue en vue ?
    if (this.el.getAttribute('paused') === 'false') { 
 
      // Rayon emis par curseur entre en colision avec element de la scene (bloc creer auto) 
      if (this.el.getAttribute('code') === '2') {
        console.log('qqqqq')

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
