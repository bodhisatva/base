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
    var searchForm = document.getElementById("searchForm"),
        searchField = document.getElementById("q"),
        getAllButton = document.getElementById("getAll"),
        target = document.getElementById("output"),
        resetButton = document.getElementById("resetAll");



    /*define addressbook methods*/
    var addr = {

        search: function(event) {
            var output = document.getElementById("output");
            ajaxCall('data/contacts.json', output, function(data) {

                //save the input value, contacts length and i to variables
                var searchValue = searchField.value,
                    addrBook = data.addressBook,
                    count = addrBook.length,
                    i;

                event.preventDefault();

                //clear the content
                target.innerHTML = "";

                if (count > 0 && searchValue !== "") {
                    for (i = 0; i < count; i++) {
                        var obj = addrBook[i];
                        isItFound = obj.name.indexOf(searchValue);
                        if (isItFound !== -1) {
                            target.innerHTML += '<div class="wrap">' + '<div class="wrap-for-photo">' + '<div class="photo-box">' + '<img src="photos/budha.jpg" alt="face">' +
                                '</div>' + '</div>' + '<div class="wrap-for-information">' + '<p class="title">Name: ' + obj.name + '</p>' + '<p class="title">email: ' + '<a href="mailto:' + obj.email + '">' + obj.email + '</a>' + '</p>' + '<p>Phone: ' + obj.phone + '</p>' + '</div>' + '</div>';
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
                    target.innerHTML += '<div class="wrap">' + '<h2>My contacts:</h2>' + '</div>';

                    for (i = 0; i < count; i++) {
                        var obj = addrBook[i];
                        target.innerHTML += '<p>' + obj.name + ', <a href="mailto:' + obj.email + '">' + obj.email + '</a><p>';

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
