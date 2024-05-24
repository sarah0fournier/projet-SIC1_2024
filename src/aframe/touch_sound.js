/**
 * =======================================================================================
 * Composant A-Frame pour utiliser du sons. 
 * =======================================================================================
 */

AFRAME.registerComponent('touch_sound', {
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
    // console.log('touchSound update', oldData, this.data);
  },

  onRaycasterIntersected: function (evt) {
    // Rayon emis par curseur entre en colision avec element de la scene (bloc creer auto)

    // A NG : Sert a quoi le code ici (dans clikable il y avait un code car il y avait differente interaction dans meme file) Si les primitves qui ont touch doivent automatiquement faire ce qui est dessous code 2 sert a rien a mon avis. 
    if (this.el.getAttribute('code') === '5') {
      var sound = this.el.components.sound;
      if (sound) {
        sound.playSound();
      } else {
        console.warn('Sound component not found');
      }
    }
    
    // if (this.el.getAttribute('code') === '1') {
    //   var finSound = this.el.components.sound;
    //   console.log(finSound)
    //   if ( finSound) {
    //     finSound.playSound();
    //   } else {
    //     console.warn('Sound component not found');
    //   }

    // }
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

