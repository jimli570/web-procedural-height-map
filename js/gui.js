document.addEventListener("DOMContentLoaded", function () {

  window.onload = function () {
    var gui = new dat.GUI({ autoPlace: false });
    var customContainer = document.getElementById('GUIContainer');
    customContainer.appendChild(gui.domElement);

    gui.add(inputValues, 'Frequency', 0.5, 3.0);
    gui.add(inputValues, 'PositionX', 0.0, 200.0);
    gui.add(inputValues, 'PositionY', 0.0, 200.0);
    gui.add(inputValues, 'Crumple', 0.0, 0.5);
    gui.add(inputValues, 'Octaves', 1, 10);
  };
});
