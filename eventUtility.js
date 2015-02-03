var eventUtility = {

  addEvent: function(element, type, fn) {

    if (typeof addEventListener !== "undefined") { //ie9 ->
      element.addEventListener(type, fn, false); //tapahtumakuuntelija
    } else if (typeof attachEvent !== "undefined") { //ie8
      element.attachEvent("on" + type, fn);
    } else {
      el["on" + type] = fn; //muut, jos ei toimi, 0-DOM -tason funktio
    };

  },
  // ei käytössä
  buttonClick: function(event) {
    var target = eventUtility.getTarget(event),
      className = target.innerHTML.toLowerCase();

    eventUtility.preventDefault(event);

    document.body.className = className;
  },

  removeEvent: function(element, type, fn) {

    if (typeof removeEventListener !== "undefined") { //ie9 ->
      element.removeEventListener(type, fn, false);
    } else if (typeof detachEvent !== "undefined") { //ie8
      element.detachEvent("on" + type, fn);
    } else {
      element["on" + type] = null; //muut, jos ei toimi, 0-DOM -tason funktio
    };

  },

  getTarget: function(event) {
    if (typeof event.target !== "undefined") {
      return event.target;
    } else {
      return event.srcElement;
    };
  },

  preventDefault: function(event) {

    if (typeof event.preventDefault !== "undefined") {
      event.preventDefault();
    } else {
      event.returnValue = false;
    };
  },

  getCharCode: function(event) {
    if (typeof event.charCode === "number") {
      return event.charCode;
    } else {
      return event.keyCode;
    };
  }

};
