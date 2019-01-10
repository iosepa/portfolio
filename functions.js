window.onload = function(){

  document.getElementById('contactForm').addEventListener('submit', (e) => {

    event.preventDefault();

    //const formData = new FormData(e.target);
    fetch('send_form_email.php', {
      headers: {'Content-Type':'application/x-www-form-urlencoded'}, // this line is important, if this content-type is not set it wont work
      body: "tel=234&email=jo@gm.com&name=adf&comment=adafdf",
      method: 'POST'
    })
    .then(res=>console.log(res));

  }, false);
}

function ajaxMail(){
  console.log("here3");

  let contactData = new FormData(document.querySelector('#contactForm'));
  console.log(contactData);


  fetch('send_form_email.php', {
    method: 'POST',
    headers: {'Content-Type':'application/x-www-form-urlencoded'}, // this line is important, if this content-type is not set it wont work
    body: 'contactData'
  });

}

function shrinkNav(scrollPos) {

  let headerEl = document.getElementById("nav");
  let menu = document.getElementById("menu");
  let toggle = document.getElementById("menu-toggle");

  if (document.getElementById("popout").classList.contains("popped")) menuToggle(); //pull the popout in

  if ((5 < scrollPos && !headerEl.classList.contains("smallNav")) || 
      (5 > scrollPos && headerEl.classList.contains("smallNav"))){ 
    toggleNav();
  }

  function toggleNav(){
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
  if (480 > document.body.clientWidth && window.getComputedStyle(menu).display == 'flex'){
    menu.style.display = 'none';
    toggle.style.display = 'inline-block';
  }
  else if (480 < document.body.clientWidth && window.getComputedStyle(menu).display == 'none') {
    menu.style.display = 'flex';
    toggle.style.display = 'none';
  }
}

(function() {
    var supportOffset = window.pageYOffset !== undefined,
      lastKnownPos = 0,
      ticking = false,
      scrollDir,
      currYPos;

    window.addEventListener('wheel', function(e) {
      currYPos = supportOffset ? window.pageYOffset : document.body.scrollTop;
      scrollDir = lastKnownPos > currYPos ? 'up' : 'down';
      lastKnownPos = currYPos;
  
      if (!ticking) {
        window.requestAnimationFrame(function() {
          shrinkNav(lastKnownPos);
          ticking = false;
        });
      }
      ticking = true;
    });
  })();//Jesse Dupuy - https://stackoverflow.com/questions/8189840/get-mouse-wheel-events-in-jquery/22518932#2251893

var loaded = false;

function menuToggle() {
    document.getElementById("menu-toggle").classList.toggle( "change" ); //css to animate hamburger
    modDis = document.getElementById("modal");
    popout = document.getElementById("popout").classList.toggle("popped");
    window.getComputedStyle(modDis).display == "none" ? modDis.style.display = "block" : modDis.style.display = "none";
}


