/**
 * =======================================================================================
 * Composant A-Frame pour changer la couleur du rayon en fonction de ce que l'on pointe
 * Dépend du code de l'objet pointé
 * =======================================================================================
 */

AFRAME.registerComponent('ray_color', {
  schema: {
    code: { type: 'int', default: 0 }, // Code pour identifier différents types d'interactions
    paused: { type: 'boolean', default: false }, // Indique si le jeu est en pause (non utilisé ici)
  },
  
  // Initialisation du composant
  init: function () {
    // Liaison des fonctions de gestion des événements à l'instance actuelle du composant
    this.onEnter = this.onEnter.bind(this);
    this.onLeave = this.onLeave.bind(this);
    
    // Ajout des écouteurs d'événements
    this.el.addEventListener('mouseenter', this.onEnter);
    this.el.addEventListener('mouseleave', this.onLeave);
  },

  // Fonction pour mapper les codes à leurs couleurs respectives.
  getColorFromCode: function (code) {
    switch (code) {
      case "1": 
        return 'yellow'; // Hit box à trouver
      case "3":
        return 'yellow'; //Bouton pour passer à la page d'après
      case "5": // Objets décoratifs (chat, feu)
        return 'purple';
    }
  },

  /**
   * Fonction appelée lorsque le curseur entre dans la zone de l'élément.
   * @param {Event} evt - Événement mouseenter.
   */
  onEnter: function (evt) {
    // Récupération l'élément du curseur
    const cursor = evt.detail.cursorEl;

    // Détermination la couleur en fonction du code
    const code_obj = this.el.getAttribute('code')
    const newColor = this.getColorFromCode(code_obj);

    // Vérification si le raycaster et le matériau existent avant de changer les propriétés
    const raycaster = cursor.getAttribute('raycaster');
    const material = cursor.getAttribute('material');
    
    if (raycaster && raycaster.showLine) {
      // Sauvegarde la couleur actuelle du rayon
      this.savedColor = raycaster.lineColor;
      // Changement de la couleur du rayon à celle définie
      cursor.setAttribute('raycaster', 'lineColor', newColor);
    } else if (material) {
      // Sauvegarde la couleur actuelle du matériau
      this.savedColor = material.color;
      // Changement la couleur du matériau
      cursor.setAttribute('material', 'color', newColor);
    }
  },

  /**
   * Fonction appelée lorsque le curseur quitte la zone de l'élément.
   * @param {Event} evt - Événement mouseleave.
   */
  onLeave: function (evt) {
    // Récupèration de l'élément du curseur
    const cursor = evt.detail.cursorEl;
    
    // Vérification si le raycaster et le matériau existent avant de changer les propriétés
    const raycaster = cursor.getAttribute('raycaster');
    const material = cursor.getAttribute('material');
    
    if (raycaster && raycaster.showLine) {
      // Restaurer la couleur originale du rayon
      cursor.setAttribute('raycaster', 'lineColor', this.savedColor);
    } else if (material) {
      // Restauration de la couleur originale du matériau
      cursor.setAttribute('material', 'color', this.savedColor);
    }
  },

  // Fonction de suppression du composant
  remove: function () {
    // Delete les écouteurs d'événements
    this.el.removeEventListener('mouseenter', this.onEnter);
    this.el.removeEventListener('mouseleave', this.onLeave);
  },
});
