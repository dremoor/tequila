/**
 * myInterface.js
 */

// -------------------------------------------------------------------------------------------------------------------
// Library exposed through myInterface
// -------------------------------------------------------------------------------------------------------------------
myInterface = {};
myInterface.panelHandlers = [];
myInterface.eleCount = 0;

// -------------------------------------------------------------------------------------------------------------------
// Define Commands for App Interface
// -------------------------------------------------------------------------------------------------------------------
myInterface.COMMAND = {};
myInterface.COMMAND.HOME = 'home';
myInterface.COMMAND.OPTIONS = 'options';

// -------------------------------------------------------------------------------------------------------------------
// Entry point when document ready
// -------------------------------------------------------------------------------------------------------------------
$(document).ready(function () {

  // Create html elements for framework
  myInterface.renderFramework();

  // Remover loading panel
  try {
    var loadingPanel = document.getElementById("loadingPanel");
    loadingPanel.parentNode.removeChild(loadingPanel);
  } catch (e) {
  }

  // Change background from white in loader
  document.body.style.backgroundColor="#e0e0e0";

});

// -------------------------------------------------------------------------------------------------------------------
// Render Framework
// -------------------------------------------------------------------------------------------------------------------
myInterface.renderFramework = function () {
  myInterface.renderNavBar();
  myInterface.homePanel();
  myInterface.renderPageFooter();
//  myInterface.renderPanel({label:'Eat'});
//  myInterface.renderPanel({label:'More'});
//  myInterface.renderPanel({label:'Chiken'});
};

// -------------------------------------------------------------------------------------------------------------------
// Render Debug Footer
// -------------------------------------------------------------------------------------------------------------------
myInterface.renderPageFooter = function () {
  myInterface.debugFooter = document.createElement("footer");
  myInterface.debugFooter.id = "pageFooter";
  myInterface.debugFooter.className = "container";
  myInterface.debugFooter.setAttribute('draggable', 'true'); // so you can't select text
  myInterface.debugFooter.setAttribute('role', 'banner');
  myInterface.debugFooter.innerHTML = '<a href="https://github.com/dremoor/tequila"><p class="text-muted text-center"><i class="fa fa-github"> tequila.js</p></a>';
  document.body.appendChild(myInterface.debugFooter);
};