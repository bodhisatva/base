function getHTTPObject() {
  var xhr;
  //check for support
  if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest();
    //for ie 8
  } else if (window.ActiveXObject) {
    xhr = new ActiveXObject("Msxml2.XMLHTTP");
  }
  return xhr;
}

function ajaxCall(dataUrl, outputElement, callback) {

  //use function to get the correct Ajax object
  var request = getHTTPObject();
  outputElement.innerHTML = "Loading...";

  request.onreadystatechange = function() {
    if (request.readyState === 4 && request.status === 200) {
      var contacts = JSON.parse(request.responseText);
      if (typeof callback === "function") {
        callback(contacts);
      }
    }
  }
  request.open("GET", dataUrl, true);
  request.send(null);
}

(function() {
  var searchForm = document.getElementById(""),
    searchField = document.getElementById(""),
    getAllButton = document.getElementById(""),
    target = document.getElementById(""),
    resetButton = document.getElementById("");

  /*define addressbook methods*/
  var addr = {

    search: function(event) {
      var output = document.getElementById("");
      ajaxCall('data/contacts.json', output, function(data) {

        var searchValue = searchField.value,
          addrBook = data.addressBook,
          count = addrBook.length,
          i;

        event.preventDefault();

        target.innerHTML = "";

        if (count > 0 && searchValue !== "") {
          for (i = 0; i < count; i++) {
            var obj = addrBook[i];
            isItFound = obj.name.indexOf(searchValue);
            if (isItFound !== -1) {
              target.innerHTML += '';
            }
          }
        }
      });
    },
    getAllContacts: function() {

      var output = document.getElementById("output");
      ajaxCall('data/contacts.json', output, function(data) {
        var addrBook = data.addressBook,
          count = addrBook.length,
          i;

        target.innerHTML = "";

        if (count > 0) {
          target.innerHTML += '';

          for (i = 0; i < count; i++) {
            var obj = addrBook[i];
            target.innerHTML += '';
          }
        }
      });
    },

    setActiveSection: function() {
      this.parentNode.setAttribute("class", "active");
    },
    removeActiveSection: function() {
      this.parentNode.removeAttribute("class");
    },
    addHoverClass: function() {
      searchForm.setAttribute("class", "hovering");
    },
    removeHoverClass: function() {
      searchForm.removeAttribute("class");
    },
    removeList: function() {
      target.innerHTML = "";
    }
  }

  //activate autocomplete on keyUp
  searchField.addEventListener("keyup", addr.search, false);
  //set active section on focus of the form field
  searchField.addEventListener("focus", addr.setActiveSection, false);
  //remove active section on blur of the form field
  searchField.addEventListener("blur", addr.removeActiveSection, false);
  //get all contacts when you click the button
  getAllButton.addEventListener("click", addr.getAllContacts, false);
  //add hover class on mouseover of the form field
  searchForm.addEventListener("mouseover", addr.addHoverClass, false);
  // remove hover class on mouseout of the form field
  searchForm.addEventListener("mouseout", addr.removeHoverClass, false);
  //activate search on form submit
  searchForm.addEventListener("submit", addr.search, false);
  resetButton.addEventListener("click", addr.removeList, false);

})();
