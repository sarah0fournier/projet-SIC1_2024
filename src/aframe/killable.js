AFRAME.registerComponent('killable', {
    schema: {

    },
    // Lier la fonction onClick à l'écouteur de clics
    init: function () {
        this.onClick = this.onClick.bind(this);
        this.el.addEventListener('click', this.onClick);
    },
    // Faire quelque chose quand l'utilisateur clic
    onClick: function () {
        // Par exemple, l'entité sur laquelle est attaché le composant killable est supprimée de la scène
        this.el.sceneEl.removeChild(this.el);
        // ...
    },

    onRemove: function () {
        this.el.removeEventListener('click', this.onClick);
    }
})