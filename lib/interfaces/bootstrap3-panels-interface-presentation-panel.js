/**
 * tequila
 * bootstrap3-panels-interface-presentation-panel
 */

// -------------------------------------------------------------------------------------------------------------------
// Panel Handler: presentation
// -------------------------------------------------------------------------------------------------------------------
Bootstrap3PanelInterface.prototype.registerPresentationPanel = function (self, panel, action) {

  var i, j;
  var panelBody = panel.panelBody;

  // Get the presentation contents
  var contents = action.request.command.contents.get('contents');
  var panelWell, panelForm, buttonDiv;

  panelWell = document.createElement("div");
  panelWell.className = 'well-panel';
  panelBody.appendChild(panelWell);

  panelForm = document.createElement("form");
  panelForm.className = 'form-horizontal';
  panelWell.appendChild(panelForm);

  for (i = 0; i < contents.length; i++) {

    // String markdown or separator '-'
    if (typeof contents[i] == 'string') {
      if (contents[i] == '-') {
        panelForm.appendChild(document.createElement("hr"));
      } else {
        var txtDiv = document.createElement("div");
        txtDiv.innerHTML = markdown.toHTML(contents[i]);
        panelForm.appendChild(txtDiv);
      }
    }
    if (contents[i] instanceof Attribute) renderAttribute(contents[i]);
    if (contents[i] instanceof Command) renderCommand(contents[i]);
  }

  // function to render Attribute
  function renderAttribute(attribute) {

    var formGroup, label, inputDiv, input, helpTextDiv, sz, button, select, textNode;
    var inputGroupDiv, inputGroupSpan, inputGroupButton, inputGroupDropDownMenu;
    var initSwitchery, items;

    // Set with of input based on size of field
    sz = '1';
    if (attribute.size > 2) sz = '2';
    if (attribute.size > 5) sz = '3';
    if (attribute.size > 10) sz = '4';
    if (attribute.size > 20) sz = '5';
    if (attribute.size > 25) sz = '6';
    if (attribute.size > 30) sz = '7';
    if (attribute.size > 40) sz = '8';
    if (attribute.size > 50) sz = '9';
    if (attribute.type == 'Number') sz = '3';
    if (attribute.type == 'Date') sz = '3';
    if (attribute.type == 'Boolean') sz = '3';

    formGroup = document.createElement("div");
    formGroup.className = 'form-group';
    panelForm.appendChild(formGroup);

    label = document.createElement("label");
    label.className = 'col-sm-3 control-label';
    formGroup.appendChild(label);
    label.innerHTML = attribute.label;

    inputDiv = document.createElement("div");
    inputDiv.className = 'col-sm-' + sz;
    formGroup.appendChild(inputDiv);

    // Render based on type and other factors
    if (true && attribute.quickPick) {
      inputGroupDiv = document.createElement("div");
      inputGroupDiv.className = 'input-group';
      inputDiv.appendChild(inputGroupDiv);

      input = document.createElement("input");
      input.className = 'form-control';
      //      input.readOnly = true; // TODO when needed this is how we do it
      if (attribute.placeHolder)
        input.setAttribute("placeHolder", attribute.placeHolder);
      input.setAttribute("type", attribute.hint.password ? "password" : "text");
      input.setAttribute("maxlength", attribute.size);
      if (attribute.value)
        input.setAttribute("value", attribute.value);
      inputGroupDiv.appendChild(input);

      inputGroupSpan = document.createElement("span");
      inputGroupSpan.className = 'input-group-btn';
      inputGroupDiv.appendChild(inputGroupSpan);

      inputGroupButton = document.createElement("button");
      inputGroupButton.type = 'button';
      inputGroupButton.className = 'btn btn-default dropdown-toggle';
      inputGroupButton.setAttribute('data-toggle', 'dropdown');
      inputGroupButton.innerHTML = '<span class="caret"></span>';
      inputGroupSpan.appendChild(inputGroupButton);

      var daItems = attribute.quickPick;
      inputGroupDropDownMenu = document.createElement("ul");
      inputGroupDropDownMenu.className = 'dropdown-menu pull-right';
      var daList = '';
      for (j = 0; j < daItems.length; j++) {
        daList += '<li><a href="#">' + daItems[j] + '</a></li>';
      }
      inputGroupDropDownMenu.innerHTML = daList;
      inputGroupSpan.appendChild(inputGroupDropDownMenu);
      inputGroupDropDownMenu.onclick = function (ele) {
        input.setAttribute("value", ele.srcElement.innerText);
      };

    } else if (false && attribute.quickPick) {

      inputDiv.innerHTML = '<select class="form-control">' +
        '<option>Tequila</option>' +
        '<option>Milk</option>' +
        '<option>Coffee</option>' +
        '</select>';

    } else if (false && attribute.quickPick) {

      select = document.createElement("select");
      select.className = 'form-control';
      inputDiv.appendChild(select);

      items = '';
      for (j = 0; j < attribute.quickPick.length; j++) {
        items += '<option>' + attribute.quickPick[j] + '</option>';
      }
      select.innerHTML = items;


    } else if (attribute.type == 'Boolean') {

      input = document.createElement("input");
      input.setAttribute("type", "checkbox");
      if (attribute.value)
        input.setAttribute("checked", "true");
      input.className = 'js-switch';
      inputDiv.appendChild(input);
      initSwitchery = new Switchery(input, {
        color: '#5bc0de' // todo based on panel theme
        , secondaryColor: '#dfdfdf', className: 'switchery', disabled: false, disabledOpacity: 0.5, speed: '0.1s'
      });

    } else if (attribute.type == 'Booleanzz') {

      input = document.createElement("input");
      input.setAttribute("type", "checkbox");
      if (attribute.value)
        input.setAttribute("checked", "true");
      input.className = 'js-switch';
      inputDiv.appendChild(input);

      textNode = document.createTextNode(attribute.value ? ' YES' : ' NO');
      inputDiv.appendChild(textNode);

    } else if (attribute.type == 'Booleanz') {

      inputDiv.innerHTML = '<div class="checkbox">' +
        '  <label>' +
        '    <input type="checkbox" value=""> YES' +
        ' </label>' +
        '</div>'

    } else if (attribute.type == 'Date') {

      inputGroupDiv = document.createElement("div");
      inputGroupDiv.className = 'input-group date';
      inputDiv.appendChild(inputGroupDiv);

      input = document.createElement("input");
      input.className = 'form-control';
      //      input.readOnly = true; // TODO when needed this is how we do it
      if (attribute.placeHolder)
        input.setAttribute("placeHolder", attribute.placeHolder);
      input.setAttribute("type", attribute.hint.password ? "password" : "text");
      input.setAttribute("maxlength", attribute.size);
      if (attribute.value)
        input.value = (1 + attribute.value.getMonth()) + '/' + attribute.value.getDate() + '/' + attribute.value.getFullYear();
      inputGroupDiv.appendChild(input);

      inputGroupSpan = document.createElement("span");
      inputGroupSpan.className = 'input-group-addon';
      inputGroupSpan.innerHTML = '<i class="fa fa-calendar"></i>';
      inputGroupDiv.appendChild(inputGroupSpan);

      $(inputGroupDiv).datepicker({autoclose: true});

    } else if (attribute.type == 'Datez') {

      input = document.createElement("input");
      input.className = 'form-control';
      //      input.readOnly = true; // TODO when needed this is how we do it
//      if (attribute.placeHolder)
//        input.setAttribute("placeHolder", attribute.placeHolder);
      input.setAttribute("type", "date");
      if (attribute.value)
        input.setAttribute("value", attribute.value);
      inputDiv.appendChild(input);

    } else if (attribute.type == 'Number') {

      input = document.createElement("input");
      input.className = 'form-control';
      //      input.readOnly = true; // TODO when needed this is how we do it
      if (attribute.placeHolder)
        input.setAttribute("placeHolder", attribute.placeHolder);
      input.setAttribute("type", "number");
      input.setAttribute("maxlength", attribute.size);
      if (attribute.value)
        input.setAttribute("value", attribute.value);
      inputDiv.appendChild(input);

    } else {

      input = document.createElement("input");
      input.className = 'form-control';
      //      input.readOnly = true; // TODO when needed this is how we do it
      if (attribute.placeHolder)
        input.setAttribute("placeHolder", attribute.placeHolder);
      input.setAttribute("type", attribute.hint.password ? "password" : "text");
      input.setAttribute("maxlength", attribute.size);
      if (attribute.value)
        input.setAttribute("value", attribute.value);
      inputDiv.appendChild(input);

    }

    // Event Handlers
    $(input).on('focusout', function (event) {
//      console.log('blur ' + input.value);
      switch (attribute.type) {
        case 'Date':
//          attribute.value = (input.value === '') ? null : attribute.coerce(input.value);
//          attribute.clearError('invalidDate');
//          if (Object.prototype.toString.call(attribute.value) !== "[object Date]" || isNaN(attribute.value.getTime())) {
//            console.log('bad date');
//            if (attribute.value != null)
//              attribute.setError('invalidDate', 'invalid date entered');
//          } else {
//            input.value = (1 + attribute.value.getMonth()) + '/' + attribute.value.getDate() + '/' + attribute.value.getFullYear();
//          }

          attribute.value = (input.value === '') ? null : attribute.coerce(input.value);
          if (attribute.value != null) {
            var mm = attribute.value.getMonth() + 1;
            var dd = attribute.value.getDate() + 1;
            var yyyy = attribute.value.getFullYear();
            if (mm < 10) mm = '0' + mm;
            if (dd < 10) dd = '0' + dd;
            input.value = yyyy + '-' + mm + '-' + dd;
          } else
            input.value = '';

          break;
        default:
          attribute.value = (input.value === '') ? null : attribute.coerce(input.value);
          if (attribute.value != null)
            input.value = attribute.value;
          break;
      }
      attribute.validate(function () {
//        console.log('validate ' + attribute.name + ' ' + attribute.validationMessage);
      });
    });
    attribute.onEvent('StateChange', function () {
//      console.log('StateChange ' + attribute.name + ': ' + attribute.value + (attribute.validationMessage ? ' (' + attribute.validationMessage + ')' : ''));
      renderHelpText(attribute.validationMessage);
    });

// ERROR CONDITION
    function renderHelpText(text) {
      if (text) {
        if (!helpTextDiv) {
          helpTextDiv = document.createElement("div");
          helpTextDiv.className = 'col-sm-9 col-sm-offset-3 has-error';
          formGroup.appendChild(helpTextDiv);
        }
        helpTextDiv.innerHTML = '<span style="display: block;" class="help-block">' + text + '</span>';
        $(formGroup).addClass('has-error');
        if (inputGroupButton)
          $(inputGroupButton).addClass('btn-danger');
      } else {
        setTimeout(function () {
          if (helpTextDiv) {
            $(helpTextDiv).remove();
            helpTextDiv = null;
          }
        }, 250);
        $(formGroup).removeClass('has-error');
        if (inputGroupButton)
          $(inputGroupButton).removeClass('btn-danger');
      }
    }
  }

// function to render Command
  function renderCommand(command) {
    var formGroup, button;
    if (!buttonDiv) {
      formGroup = document.createElement("div");
      formGroup.className = 'form-group';
      panelForm.appendChild(formGroup);
      buttonDiv = document.createElement("div");
      buttonDiv.className = 'col-sm-offset-3 col-sm-9';
      formGroup.appendChild(buttonDiv);
    }
    var cmdTheme = command.theme || 'default';
    button = document.createElement("a");
    button.className = 'btn btn-' + cmdTheme + ' btn-presentation';
    if (command.icon)
      button.innerHTML = '<i class="fa ' + command.icon + ' "></i> ' + command.name;
    else
      button.innerHTML = command.name;

    buttonDiv.appendChild(button);
    $(button).on('click', function (event) {
      event.preventDefault();
      self.dispatch(new Request({type: 'Command', command: command}));
    });
  }

  return true;
};
