AFRAME.registerComponent('clickable', {
    schema: {
        color : {type : "color",
            default : "yellow"
        }
    },
    init: function () {
        this.onEnter = this.onEnter.bind(this);
        this.el.addEventListener('mouseenter', this.onEnter);
        this.onLeave = this.onLeave.bind(this);
        this.el.addEventListener('mouseleave', this.onLeave);
    },
    update: function (oldData) {},

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



