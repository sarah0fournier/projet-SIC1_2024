/**
 * =======================================================================================
 * Composant A-Frame pour utiliser des sons sur des éléments interactifs (Chat, feu).
 * Le son assigné à l'objet se déclenche au passage du rayon.
 * Le rayon change de couleur en vert au passage du rayon sur un élément interactif.
 * =======================================================================================
 */

AFRAME.registerComponent('touch_sound', {
  schema: {
    color: { type: "color", default: "green" }, // Couleur du rayon lorsqu'il survole l'élément
    code: { type: 'int', default: '0' }, // Code pour identifier différents types d'interactions (non utilisé ici)
    paused: { type: 'boolean', default: 'false' }, // Indique si le jeu est en pause (non utilisé ici)
  },
  
  // Initialisation du composant
  init: function () {
    // Liaison des fonctions de gestion des événements à l'instance actuelle du composant
    this.onRaycasterIntersected = this.onRaycasterIntersected.bind(this);
    this.onEnter = this.onEnter.bind(this);
    this.onLeave = this.onLeave.bind(this);
    
    // Ajout des écouteurs d'événements
    this.el.addEventListener('raycaster-intersected', this.onRaycasterIntersected);
    this.el.addEventListener('mouseenter', this.onEnter);
    this.el.addEventListener('mouseleave', this.onLeave);
  },

  // Fonction appelée lorsque les données du composant changent
  update: function (oldData) {
    // Peut être utilisé pour réagir aux changements de données (non utilisé ici)
  },

  /**
   * Fonction appelée lorsqu'un rayon entre en intersection avec l'élément.
   * @param {Event} evt - Événement raycaster-intersected.
   */
  onRaycasterIntersected: function (evt) {
    // Récupère le composant de son attaché à l'élément
    var sound = this.el.components.sound;
    
    // Si le composant de son est présent, jouer le son
    if (sound) {
      sound.playSound();
    } else {
      // Affiche un avertissement si le composant de son est introuvable
      console.warn('Sound component not found');
    }
  },

  /**
   * Fonction appelée lorsque le curseur entre dans la zone de l'élément.
   * @param {Event} evt - Événement mouseenter.
   */
  onEnter: function (evt) {
    // Récupère l'élément du curseur
    const cursor = evt.detail.cursorEl;
    
    // Si le rayon est visible, changer la couleur du rayon
    if (cursor.getAttribute('raycaster').showLine) {
      // Sauvegarde la couleur actuelle du rayon
      this.savedColor = cursor.getAttribute('raycaster').lineColor;
      // Change la couleur du rayon à celle définie dans les données du composant
      cursor.setAttribute('raycaster', 'lineColor', this.data.color);
    } else {
      // Si le rayon n'est pas visible, changer la couleur du matériau du curseur
      this.savedColor = cursor.getAttribute('material').color;
      cursor.setAttribute('material', 'color', this.data.color);
    }
  },

  /**
   * Fonction appelée lorsque le curseur quitte la zone de l'élément.
   * @param {Event} evt - Événement mouseleave.
   */
  onLeave: function (evt) {
    // Récupère l'élément du curseur
    const cursor = evt.detail.cursorEl;
    
    // Si le rayon est visible, restaurer la couleur originale du rayon
    if (cursor.getAttribute('raycaster').showLine) {
      cursor.setAttribute('raycaster', 'lineColor', this.savedColor);
    } else {
      // Si le rayon n'est pas visible, restaurer la couleur originale du matériau du curseur
      cursor.setAttribute('material', 'color', this.savedColor);
    }
  },

  // Fonction de suppression du composant
  remove: function () {
    // Supprime les écouteurs d'événements
    this.el.removeEventListener('mouseenter', this.onEnter);
    this.el.removeEventListener('mouseleave', this.onLeave);
    this.el.removeEventListener('raycaster-intersected', this.onRaycasterIntersected);
  },
});
