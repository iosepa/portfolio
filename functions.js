window.onload = function () {

  autoType("greeting", 95, "Hello. Would you like a beautiful website?");

  setTimeout(function () {
    document.getElementById('callToAction').style.opacity = "1";
  }, 4000);

  //in case website is refreshed not at top
  if (5 < window.scrollY) shrinkNav(window.scrollY);


  window.onscroll = function () { shrinkNav(window.scrollY); };


  //ajax for contact
  document.getElementById('contactForm').addEventListener('submit', (e) => {

    event.preventDefault();

    let elements = document.getElementById('contactForm').elements;
    let postData = "";
    let custName = '';

    for (let i = 0; i < elements.length; i++) {
      let field = elements.item(i);
      if (field.name == 'name') {
        custName = field.value;
      }
      postData += field.name + "=" + field.value + "&";
    }

    postData = postData.replace(/\s/g, '+');

    fetch('send_form_email.php', {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: postData,
      method: 'POST'
    })
      .then(function (response) { return response.text() })
      .then(text => document.getElementById('formResponse').innerHTML += text);

    document.getElementById('contactForm').reset();
    document.getElementById('formResponse').innerHTML = "Thank you, " + custName + ".";

  }, false);
}


//handle navbar transitions
function shrinkNav(scrollPos) {

  let headerEl = document.getElementById("nav");
  let menu = document.getElementById("menu");
  let toggle = document.getElementById("menu-toggle");

  if (document.getElementById("popout").classList.contains("popped")) menuToggle(); //pull the popout in

  if ((5 < scrollPos && !headerEl.classList.contains("smallNav")) ||
    (5 >= scrollPos && headerEl.classList.contains("smallNav"))) {
    toggleNav();
  }

  function toggleNav() {
    headerEl.classList.toggle("smallNav");
    if (480 > document.body.clientWidth) { return };
    menu.style.display = (window.getComputedStyle(menu).display == 'none' ? 'flex' : 'none');
    toggle.style.display = (window.getComputedStyle(toggle).display == 'none' ? 'inline-block' : 'none');
  }
}

function resizeFun() {
  let menu = document.getElementById("menu");
  let toggle = document.getElementById("menu-toggle");

  if (5 < window.scrollY) return;
  if (480 > document.body.clientWidth && window.getComputedStyle(menu).display == 'flex') {
    menu.style.display = 'none';
    toggle.style.display = 'inline-block';
  }
  else if (480 < document.body.clientWidth && window.getComputedStyle(menu).display == 'none') {
    menu.style.display = 'flex';
    toggle.style.display = 'none';
  }
}


//handles animation of hamburger menu
function menuToggle() {
  document.getElementById("menu-toggle").classList.toggle("change");
  modDis = document.getElementById("modal");
  popout = document.getElementById("popout").classList.toggle("popped");
  window.getComputedStyle(modDis).display == "none" ? modDis.style.display = "block" : modDis.style.display = "none";
}


//typing at top of page
function autoType(elementID, typingSpeed, text) {
  let thhis = document.getElementById(elementID);
  let amntOfChars = text.length;
  let newString = "";

  setTimeout(function () {
    thhis.style.opacity = "1";
    thhis.innerHTML = "";
    for (let i = 0; i < amntOfChars; i++) {
      (function (i, char) {
        setTimeout(function () {
          thhis.innerHTML += char;
        }, i * typingSpeed)
      })(i + 1, text[i]);
    }
  }, 200);
}
