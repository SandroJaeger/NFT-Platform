const SLIDERCONTAINER = document.querySelector('.slider-outer-wrapper');
const SLIDER = document.querySelector('.slider-inner-wrapper');
const SLIDES = document.querySelectorAll('.slide');

SLIDER.style.width = `${SLIDES.length * 100}%`;

const HAMMER = new Hammer(SLIDER);
const SLIDERSIZE = 100;
const SENSITIVITY = 15;

let timer;
let panIsRunning = false;
let activeIndex = 1;

HAMMER.on('pan', ($event) => {
    panIsRunning = true;
    const panDistance = (SLIDERSIZE / SLIDES.length) * $event.deltaX / SLIDER.clientWidth;
    const panDistanceCalculated = panDistance - SLIDERSIZE / SLIDES.length * activeIndex;
    animateSlider(panDistanceCalculated);
    if ($event.isFinal) {
        if (panDistance <= -(SENSITIVITY / SLIDES.length)) {
            goToSlide(activeIndex + 1);
        } else if (panDistance >= (SENSITIVITY / SLIDES.length)) {
            goToSlide(activeIndex - 1);
        } else {
            goToSlide(activeIndex);
        }
    }
});


const generateBullets = (elements, target) => {
    const newNavigation = document.createElement('div');
    newNavigation.classList.add('navigation');
    elements.forEach((bullet, index) => {
        const newBullet = document.createElement('button');
        newBullet.classList.add('bullet');
        newBullet.dataset.active = index;
        if (index === activeIndex) {
            newBullet.classList.add('bullet-active');
        }
        newNavigation.appendChild(newBullet);
    });
    target.appendChild(newNavigation);
    document.querySelectorAll('.bullet').forEach(bullet => {
        bullet.addEventListener('click', bulletClick, false);
    });
}

const bulletClick = ($event) => {
    activeIndex = Number($event.target.dataset.active);
    goToSlide(activeIndex);
}

const setActiveBullet = () => {
    const activeBullet = document.querySelector('.bullet-active');
    if (activeBullet) {
        activeBullet.classList.remove('bullet-active');
    }
    document.querySelectorAll('.bullet').forEach(bullet => {
        if (bullet.dataset.active === activeIndex.toString()) {
            bullet.classList.add('bullet-active');
        }
    });
}

const goToSlide = (index) => {
    if (index < 0) {
        activeIndex = 0;
    } else if (index > (SLIDES.length - 1)) {
        activeIndex = (SLIDES.length - 1);
    } else {
        activeIndex = index;
    }
    SLIDER.classList.add('is-animating');
    const percentage = -(SLIDERSIZE/SLIDES.length) * activeIndex;
    animateSlider(percentage);
    setActiveBullet();
    setActiveSlide(activeIndex);
    addSmoothTransition();
    console.log(document.querySelector('#slide3 .reveal-box'));
    if(index == 1 && document.querySelector('#slide2 .reveal-box')){
      document.querySelectorAll('#slide2 .reveal-box').forEach(box => {
        box.style.display="none";
      });
      setTimeout(function(){
        document.querySelectorAll('#slide2 .reveal-box').forEach(box => {
          box.style.display="block";
        });
      },200);
    }
    if(index == 2 && document.querySelector('#slide3 .reveal-box')){
      document.querySelectorAll('#slide3 .reveal-box').forEach(box => {
        box.style.display="none";
      });
      setTimeout(function(){
        document.querySelectorAll('#slide3 .reveal-box').forEach(box => {
          box.style.display="block";
        });
      },100);
    }
}

const addSmoothTransition = () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
        SLIDER.classList.remove('is-animating');
        panIsRunning = false;
    }, 400);
}

const animateSlider = (percentage) => {
    const distance = (SLIDERSIZE / SLIDES.length) * (SLIDES.length - 1);
    if(percentage > 0) {
        percentage = 0;
    } else if (percentage < -distance) {
        percentage = -distance;
    }
    SLIDER.style.transform = 'translateX( ' + percentage + '% )';
}

const setActiveSlide = (index) => {
    const ELEMENT = document.querySelector('.active');
    if (ELEMENT) {
        ELEMENT.classList.remove('active');
    }
    SLIDES[index].classList.add('active');
    document.getElementById(`input_${index+1}`).checked = "true";
}

setActiveSlide(activeIndex);
//generateBullets(SLIDES, SLIDERCONTAINER);
document.getElementById("input_2").checked = true;


document.getElementById("input_1").addEventListener("click", function(){
    goToSlide(0);
});

document.getElementById("input_2").addEventListener("click", function(){
    goToSlide(1);
});

document.getElementById("input_3").addEventListener("click", function(){
    goToSlide(2);
});

goToSlide(activeIndex);











let revealBox = document.querySelector('.reveal-box');

let animate = function() {
  if (revealBox.classList.contains('enter')) {
    revealBox.classList.remove('enter');
    revealBox.classList.add('leave');
  } else {
    revealBox.classList.remove('leave');
    revealBox.classList.add('enter');
  }
}













var currentUser = null;
var place = 0;


// document.querySelector("#generate").addEventListener("click", function(){
//     createNFTcard(place);
//     place++;
//     ////
//     // var currentdate = Date.now();
//     // firebaseRef = firebase.database().ref("NFTs");
//     // firebaseRef.child("timestamp").set(currentdate);
// });

// document.querySelector("#delete").addEventListener("click", function(){
//     for(let i=0; i<place; i++){
//         var el = document.getElementById(i);
//         el.remove();
//         console.log(i);
//     };
//     place = 0;
// });

function createNFTcard (number,description,img,name,price,seller,time,e) {
    const newdiv = document.createElement('div');
    newdiv.id = `${e}`;
    newdiv.classList = `card`;
    newdiv.innerHTML = `
    <div class="reveal-box enter animate">
      <div class="reveal-box__inner">
        <img id="reveal-box__image" class="nft-img" src='${img}' /> <!-https://images.unsplash.com/photo-1597600159211-d6c104f408d1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=739&q=80->
      </div>
    </div>

    <div class='cardContent'>
      <h1>${name} #${e}</h1>
      <p>${description}</p>
      
      <div class='cardContentFooter'>
        <div>
          <svg width="11" height="18" xmlns="http://www.w3.org/2000/svg"><path d="M11 10.216 5.5 18 0 10.216l5.5 3.263 5.5-3.262ZM5.5 0l5.496 9.169L5.5 12.43 0 9.17 5.5 0Z" fill="#00FFF8"/></svg>
          <p class='eth'>${price} ETH</p>
        </div>
        <div>
          <svg width="17" height="17" xmlns="http://www.w3.org/2000/svg"><path d="M8.305 2.007a6.667 6.667 0 1 0 0 13.334 6.667 6.667 0 0 0 0-13.334Zm2.667 7.334H8.305a.667.667 0 0 1-.667-.667V6.007a.667.667 0 0 1 1.334 0v2h2a.667.667 0 0 1 0 1.334Z" fill="#8BACD9"/></svg>
          <p>${time} days ago</p>
        </div>
      </div>
    </div>
    <!--     <div class='line' /> -->
    `
    document.getElementById("slide3").appendChild(newdiv);
}



// Your web app's Firebase configuration

const firebaseConfig = {

  apiKey: "AIzaSyDttxxVrooFSbmMeqxC2QgrLP9keT45WT4",

  authDomain: "nft-project-b286f.firebaseapp.com",

  databaseURL: "https://nft-project-b286f-default-rtdb.firebaseio.com",

  projectId: "nft-project-b286f",

  storageBucket: "nft-project-b286f.appspot.com",

  messagingSenderId: "390564185484",

  appId: "1:390564185484:web:884a5f884258fb11efc2a9"

};


// Initialize Firebase

firebase.initializeApp(firebaseConfig);


const auth = firebase.auth();
const database = firebase.database();


var nftsarray = [];

firebaseRef = firebase.database().ref("NFTs");
firebaseRef.on("value", function(data){
    nftsarray = [];
    value = data.val();
    nftsarray = Object.keys(value);
    console.log(nftsarray);
    generateNFTs();
});


setTimeout(generateNFTs(),4000);

function generateNFTs(){

  document.querySelector(".loader-img").style.display = "flex";
  if(document.querySelector(".card")){
    [...document.getElementsByClassName("card")].forEach(function(e){
      e.remove();
    });
  }
  


  nftsarray.forEach(function(e){
    console.log("working");
    var description = "";
    var img = "";
    var name = "";
    var price = "";
    var seller = "";
    var time = "";
  
    firebaseRef = firebase.database().ref("NFTs/"+e);
    firebaseRef.child("description").once("value", function(data){
      description = data.val();
    });
    firebaseRef = firebase.database().ref("NFTs/"+e);
    firebaseRef.child("img").once("value", function(data){
      firebase.storage().ref(data.val()).getDownloadURL().then(imgUrl => {
        img = imgUrl;
      });
    });
    firebaseRef = firebase.database().ref("NFTs/"+e);
    firebaseRef.child("name").once("value", function(data){
      name = data.val();
    });
    firebaseRef = firebase.database().ref("NFTs/"+e);
    firebaseRef.child("price").once("value", function(data){
      price = data.val();
    });
    firebaseRef = firebase.database().ref("NFTs/"+e);
    firebaseRef.child("seller").once("value", function(data){
      seller = data.val();
    });
    firebaseRef = firebase.database().ref("NFTs/"+e);
    firebaseRef.child("time").once("value", function(data){
      time = Math.trunc((new Date().getTime() - data.val())*1.1574E-8);
    });
    setTimeout(function(){
      if (img.indexOf("http://") == 0 || img.indexOf("https://") == 0) {
      }
      else{
        //Standard Image
        img = "https://dummyimage.com/739x581/000/00ffff&text=Error:+Image+not+found";
      }
      createNFTcard(place,description,img,name,price,seller,time,e);
      place++;
      console.log(description);
      console.log(img);
      console.log(name);
      console.log(price);
      console.log(seller);
      console.log(time);
      document.querySelectorAll(".card").forEach((card) => {
        card.addEventListener("mousedown", buybuttonclicked);
      });
      document.querySelectorAll(".card .nft-img").forEach((img) => {
        img.addEventListener("mousedown", showbuttonclicked);
      });      
    },2000)
  });
  setTimeout(function(){
    document.querySelector(".loader-img").style.display = "none";
  },2000);
}




//selecting all required elements
const dropArea = document.querySelector(".drag-area"),
dragText = dropArea.querySelector("header"),
button = dropArea.querySelector("button"),
input = dropArea.querySelector("input");
let file; //this is a global variable and we'll use it inside multiple functions

button.onclick = ()=>{
  input.click(); //if user click on the button then the input also clicked
}

input.addEventListener("change", function(){
  //getting user select file and [0] this means if user select multiple files then we'll select only the first one
  file = this.files[0];
  dropArea.classList.add("active");
  showFile(); //calling function
});


//If user Drag File Over DropArea
dropArea.addEventListener("dragover", (event)=>{
  event.preventDefault(); //preventing from default behaviour
  dropArea.classList.add("active");
  dragText.textContent = "Release to Upload File";
});

//If user leave dragged File from DropArea
dropArea.addEventListener("dragleave", ()=>{
  dropArea.classList.remove("active");
  dragText.textContent = "Drag & Drop to Upload File";
});

//If user drop File on DropArea
dropArea.addEventListener("drop", (event)=>{
  event.preventDefault(); //preventing from default behaviour
  //getting user select file and [0] this means if user select multiple files then we'll select only the first one
  file = event.dataTransfer.files[0];
  showFile(); //calling function
});

function showFile(){
  let fileType = file.type; //getting selected file type
  let validExtensions = ["image/jpeg", "image/jpg", "image/png","image/gif"]; //adding some valid image extensions in array
  if(validExtensions.includes(fileType)){ //if user selected file is an image file
    let fileReader = new FileReader(); //creating new FileReader object
    fileReader.onload = ()=>{
      let fileURL = fileReader.result; //passing user file source in fileURL variable
        // UNCOMMENT THIS BELOW LINE. I GOT AN ERROR WHILE UPLOADING THIS POST SO I COMMENTED IT
      let imgTag = `<img src="${fileURL}" alt="image">`; //creating an img tag and passing user selected file source inside src attribute
      dropArea.innerHTML = imgTag; //adding that created img tag inside dropArea container
    }
    fileReader.readAsDataURL(file);
  }else{
    alert("This is not an Image File!");
    dropArea.classList.remove("active");
    dragText.textContent = "Drag & Drop to Upload File";
  }
}



const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');

form.addEventListener('submit', e => {
	e.preventDefault();
	checkInputs();
	console.log(username.value, email.value, password.value);
});

function checkInputs() {
	// trim to remove the whitespaces
	const usernameValue = username.value.trim();
	const emailValue = email.value.trim();
	const passwordValue = password.value.trim();
	
	if(usernameValue === '') {
		setErrorFor(username, 'NFT-Name cannot be blank');
	} else {
		setSuccessFor(username);
	}
	
	if(emailValue === '') {
		setErrorFor(email, 'Description cannot be blank');
	} else {
		setSuccessFor(email);
	}
	
	if(passwordValue === '') {
		setErrorFor(password, 'Price cannot be blank');
	} else {
		setSuccessFor(password);
	}



    if(accountID == null){
      console.log("Du musst dein Wallet erst connecten");
    }
    else if(usernameValue != '' && emailValue != '' && passwordValue != '' && file){
        alert("Your NFT was successfully created !");
        $(form).find('button').prop('disabled', true);
        var yourPrivateKey = generateId();
        var currentdate = Date.now();
        firebaseRef = firebase.database().ref("NFTs");
        firebaseRef.child(yourPrivateKey).set({
            description: emailValue,
            img: file.name,
            name: usernameValue,
            price: passwordValue,
            seller: accountID,
            time: currentdate,
        });
        firebase.storage().ref(file.name).put(file).then(function(snapshot) {
          console.log('Uploaded a file!');
        });

    }
	
}

function setErrorFor(input, message) {
	const formControl = input.parentElement;
	const small = formControl.querySelector('small');
	formControl.className = 'form-control error';
	small.innerText = message;
}

function setSuccessFor(input) {
	const formControl = input.parentElement;
	formControl.className = 'form-control success';
}
	

password.addEventListener("change", function(){
    getapi(api_url);
});


// api url
const api_url = 
      "https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=BTC,USD,EUR";
  
// Defining async function
async function getapi(url) {
    
    // Storing response
    const response = await fetch(url);
    // Storing data in form of JSON
    var data = await response.json();
    console.log(data);
    show(data);
}

  
// Function to define innerHTML for HTML table
function show(data) {
    
    document.getElementById("price").textContent = "Price " + "(" + Object.values(data)[2] * password.value + "€" + ")";
    console.log(Object.values(data)[2]);
}





function generateId() {
    var possibleChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var gameId = "";
    for (var j = 0; j < 8; j++) gameId += possibleChars.charAt(Math.floor(Math.random() * possibleChars.length));
    return gameId;
}


function generateId2() {
  var possibleChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var gameId = "";
  for (var j = 0; j < 4; j++) gameId += possibleChars.charAt(Math.floor(Math.random() * possibleChars.length));
  return gameId;
}


$('.save-btn').on('click', function(e){
  e.preventDefault();
});

$('#btn2').on('click', function(e){
  e.preventDefault();
  document.querySelector(".contact-wrapper").style.display = "block";
});

document.getElementById("slide2").addEventListener('mousedown', function(event){
  isClickInsideElement = document.querySelector(".contact-wrapper").contains(event.target);
  if(!isClickInsideElement){
    document.querySelector(".contact-wrapper").style.display = "none";
  }
},false);

var accountID;


$('.login-wallet-btn').on('click', function(e){
  e.preventDefault();
  // Get all our input fields
	var username = document.getElementById("login-wallet-input-username").value; 
	var password = document.getElementById("login-wallet-input-password").value;
  var email;
	firebaseRef = firebase.database().ref("Users");

	var userarr = [];

	firebaseRef.once("value",function(data){
		vl = data.val();
		userarr = Object.keys(vl);

		userarr.forEach(function(e){
			var usernamesearch;
			firebaseRef = firebase.database().ref("Users/"+e);
			firebaseRef.child("username").once("value",function(data){
				vl = data.val();
				usernamesearch = vl;
				if(username == usernamesearch) {
					firebaseRef = firebase.database().ref("Users/"+e);
					firebaseRef.child("password").once("value",function(data){
						hah = data.val();
						if(password == hah){
              currentUser = username;
							accountID = e;
							firebaseRef = firebase.database().ref("Users/"+e);
							firebaseRef.child("email").once("value",function(data){
							email = data.val();
							});
						}
					});
				}
			});
		});
	});


	setTimeout(function() {
		auth.signInWithEmailAndPassword(email, password)
		.then(function() {
			// Declare user variable
			var user = auth.currentUser

			// Add this user to Firebase Database
			var database_ref = database.ref()

			// Create User data
			var user_data = {
				last_login : Date.now()
			}

			// Push to Firebase Database
			database_ref.child('Users/' + user.uid).update(user_data)

			// DOne
			console.log("User Logged In "+"||||"+Date(Date.now()))
			alert('User Logged In!!')
      $('#btn2').find('.confirm-message').addClass('animate2');
      $('#btn2').find('.checkmark').addClass('animate2');
      $('.save-btn').find('.message').addClass('animate');
      $('.save-btn').find('.loader').addClass('animate');
      document.querySelector(".contact-wrapper").style.display = "none";
      setTimeout(function(){
        document.querySelector(".save-btn").style="background-color: #3bbc75";
        showpropertynfts();
      },1700);

			

		})
		.catch(function(error) {
			// Firebase will use this to alert of its errors
			var error_code = error.code
			var error_message = error.message

			alert(error_message)
		})
	},500);
});



$(".fa-xmark").click(function(){
  $(".popup").removeClass("active");
});
  







var currentprice;
var currentbalance = 0;
var nftid;


function buybuttonclicked(event) {
  nftid = null;
  currentprice = 0;
  currentbalance = 0;
  console.log(currentprice);
  if(accountID == null){
    console.log("Du musst dein Wallet erst connecten");
  }
  else if(event.target.className == "nft-img"){
    
  }
  else{
    nftid = event.currentTarget.id;
    console.log(event.currentTarget.id);
    firebaseRef = firebase.database().ref("NFTs/"+event.currentTarget.id);
    firebaseRef.child("price").once("value",function(data){
      currentprice = data.val();
    });
    firebaseRef = firebase.database().ref("Users/"+accountID+"/transactions");
    firebaseRef.once("value",function(data){
      vl = data.val();
      console.log(accountID);
      var transactionsobjects = Object.keys(vl);
      console.log(transactionsobjects)
      transactionsobjects.forEach(function(e){
        firebaseRef = firebase.database().ref("Users/"+accountID+"/transactions/"+e);
        firebaseRef.child("amount").once("value",function(data){
          vl = data.val();
          currentbalance = currentbalance+Number(vl);
          console.log(currentbalance);
        });
      });
    });
    document.querySelector(".popup").classList.add("active");
  }
}




document.querySelector(".dismiss-popup-btn").addEventListener("click", function(){
  document.querySelector(".popup").classList.remove("active");
  if(currentbalance >= currentprice){
    console.log("kann gekauft werden");
    var mytransactionid = generateId2();
    var yourtransactionid = generateId2();
    var sellerid = null;
    firebaseRef = firebase.database().ref("Users/"+accountID+"/transactions");
    firebaseRef.child(mytransactionid).set({
      ID: mytransactionid,
      amount: "-"+currentprice,
      date: new Date().toLocaleDateString("en-GB"),
      name: currentUser,
      type: "debit",
    });
    firebaseRef = firebase.database().ref("NFTs/"+nftid);
    firebaseRef.child("seller").once("value",function(data){
      sellerid = data.val();
    });
    firebaseRef = firebase.database().ref("Users/"+sellerid+"/transactions");
    firebaseRef.child(yourtransactionid).set({
      ID: yourtransactionid,
      amount: "+"+currentprice,
      date: new Date().toLocaleDateString("en-GB"),
      name: currentUser,
      type: "credit",
    });
    firebaseRef = firebase.database().ref("NFTs/"+nftid);
    firebaseRef.once("value",function(data){
      nftobject = data.val();
      if(nftobject != null){
        console.log(nftobject);
        firebaseRef = firebase.database().ref("Users/"+accountID+"/NFTs/"+nftid);
        firebaseRef.set(nftobject);
        firebaseRef = firebase.database().ref("NFTs/"+nftid);
        firebaseRef.remove();
      }
    });
  }
  else{
    console.log("kann nicht gekauft werden");
  }
});









var propertynfts = [];


function showpropertynfts(){

  firebaseRef = firebase.database().ref("Users/"+accountID+"/NFTs");
  firebaseRef.on("value", function(data){
      value = data.val();
      propertynfts = Object.keys(value);
      console.log(propertynfts);
      generatemynfts();
  });

  setTimeout(generatemynfts(),3000);

}



function generatemynfts(){

  document.querySelector(".loader-img2").style.display = "block";
  if(document.querySelector(".card2")){
    [...document.getElementsByClassName("card2")].forEach(function(e){
      e.remove();
    });
  }

  propertynfts.forEach(function(e){
    console.log("working");
    var description = "";
    var img = "";
    var name = "";
    var price = "";
    var seller = "";
    var time = "";
  
    firebaseRef = firebase.database().ref("Users/"+accountID+"/NFTs/"+e);
    firebaseRef.child("description").once("value", function(data){
      description = data.val();
    });
    firebaseRef = firebase.database().ref("Users/"+accountID+"/NFTs/"+e);
    firebaseRef.child("img").once("value", function(data){
      firebase.storage().ref(data.val()).getDownloadURL().then(imgUrl => {
        img = imgUrl;
      });
    });
    firebaseRef = firebase.database().ref("Users/"+accountID+"/NFTs/"+e);
    firebaseRef.child("name").once("value", function(data){
      name = data.val();
    });
    firebaseRef = firebase.database().ref("Users/"+accountID+"/NFTs/"+e);
    firebaseRef.child("price").once("value", function(data){
      price = data.val();
    });
    firebaseRef = firebase.database().ref("Users/"+accountID+"/NFTs/"+e);
    firebaseRef.child("seller").once("value", function(data){
      seller = data.val();
    });
    firebaseRef = firebase.database().ref("Users/"+accountID+"/NFTs/"+e);
    firebaseRef.child("time").once("value", function(data){
      time = Math.trunc((new Date().getTime() - data.val())*1.1574E-8);
    });
    setTimeout(function(){
      if (img.indexOf("http://") == 0 || img.indexOf("https://") == 0) {
      }
      else{
        //Standard Image
        img = "https://dummyimage.com/739x581/000/00ffff&text=Error:+Image+not+found";
      }
      createNFTcard2(description,img,name,price,seller,time,e);
      console.log(description);
      console.log(img);
      console.log(name);
      console.log(price);
      console.log(seller);
      console.log(time);
      // document.querySelectorAll(".card").forEach((card) => {
      //   card.addEventListener("mousedown", buybuttonclicked);
      // });
      document.querySelectorAll(".card2 .nft-img").forEach((img) => {
        img.addEventListener("mousedown", showbuttonclicked2);
      });
    
      $('.card2').click(function(e){
        e.stopImmediatePropagation();
        $(this).toggleClass("active");
      });

      $('.sell-btn').click(function(e){
        e.stopImmediatePropagation();
        document.querySelector("#popup-sell").classList.add("active");
        currentnftidforsell = $(this).parent().parent().parent().attr("id");
        $(this).parent().parent().parent().toggleClass("active");
      });


      $('.qrcode-btn').click(function(e){
        e.stopImmediatePropagation();
        document.querySelector("#popup-qrcode").classList.add("active");
        document.getElementById("qrcode").innerHTML = "";
        new QRCode(document.getElementById("qrcode"), {
          text: $(this).parent().parent().parent().attr("id"),
          width: 178,
          height: 178,
        });
        $(this).parent().parent().parent().toggleClass("active");
      });


      $('.sell-popup-btn').click(function(e){
        e.stopImmediatePropagation();
        document.querySelector("#popup-sell").classList.remove("active");
        sellNFT();
      });
      

    },2000);
    setTimeout(function(){
      document.querySelector(".loader-img2").style.display = "none";
    },2000);
  });
}


function createNFTcard2 (description,img,name,price,seller,time,e) {
  const newdiv = document.createElement('div');
  newdiv.id = `${e}`;
  newdiv.classList = `card2`;
  newdiv.innerHTML = `
  <div class="menu">
        <div class="toggle">
          <i class="fas fa-ellipsis-h"></i>
        </div>
        <div class="list">
          <div class="item qrcode-btn"><i class="fa-solid fa-qrcode"></i></div>
          <div class="item"></div>
          <div class="item"></div>
          <div class="item"></div>
          <div class="item"></div>
          <div class="item sell-btn"><i class="fa-solid fa-tag"></i></div>
        </div>
  </div>

  <div class="reveal-box enter animate">
      <div class="reveal-box__inner">
        <img id="reveal-box__image" class="nft-img" src='${img}' /> <!-https://images.unsplash.com/photo-1597600159211-d6c104f408d1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=739&q=80->
      </div>
  </div>
  
  <div class='cardContent'>
    <h1>${name} #${e}</h1>
    <p>${description}</p>
    
    <div class='cardContentFooter'>
      <div>
        <svg width="11" height="18" xmlns="http://www.w3.org/2000/svg"><path d="M11 10.216 5.5 18 0 10.216l5.5 3.263 5.5-3.262ZM5.5 0l5.496 9.169L5.5 12.43 0 9.17 5.5 0Z" fill="#00FFF8"/></svg>
        <p class='eth'>${price} ETH</p>
      </div>
      <div>
        <svg width="17" height="17" xmlns="http://www.w3.org/2000/svg"><path d="M8.305 2.007a6.667 6.667 0 1 0 0 13.334 6.667 6.667 0 0 0 0-13.334Zm2.667 7.334H8.305a.667.667 0 0 1-.667-.667V6.007a.667.667 0 0 1 1.334 0v2h2a.667.667 0 0 1 0 1.334Z" fill="#8BACD9"/></svg>
        <p>${time} days ago</p>
      </div>
    </div>
  </div>
  <!--     <div class='line' /> -->
  `
  document.getElementById("slide2").appendChild(newdiv);
}



function showbuttonclicked(event){
  console.log(event.currentTarget.src);
  const lightbox = document.createElement('div');
  lightbox.classList = `lightbox`;
  document.getElementById("slide3").appendChild(lightbox);
  const enlargedimg = document.createElement('img');
  enlargedimg.src = event.currentTarget.src;
  lightbox.appendChild(enlargedimg);
  lightbox.addEventListener("mousedown", function(){
    lightbox.remove();
  });
}


function showbuttonclicked2(event){
  console.log(event.currentTarget.src);
  const lightbox2 = document.createElement('div');
  lightbox2.classList = `lightbox`;
  document.getElementById("slide2").appendChild(lightbox2);
  const enlargedimg2 = document.createElement('img');
  enlargedimg2.src = event.currentTarget.src;
  lightbox2.appendChild(enlargedimg2);
  lightbox2.addEventListener("mousedown", function(){
    lightbox2.remove();
  });
}

var currentnftidforsell;

function sellNFT(){
  const newpriceinput = document.getElementById('newprice');
  const newpriceinputvalue = newpriceinput.value.trim();
  if(newpriceinputvalue === '') {
		setErrorFor(newpriceinput, 'Price cannot be blank');
	} else {
		setSuccessFor(newpriceinput);
    var forsellnftobj;
    alert("Your NFT was successfully sold !");
    firebaseRef = firebase.database().ref("Users/"+accountID+"/NFTs/"+currentnftidforsell);
    firebaseRef.once("value", function(data){
      forsellnftobj = data.val();
    });
    forsellnftobj.seller = accountID;
    forsellnftobj.price = document.getElementById("newprice").value;
    forsellnftobj.time = Date.now();
    console.log(forsellnftobj);
    firebaseRef = firebase.database().ref("NFTs");
    firebaseRef.child(currentnftidforsell).set(forsellnftobj);
    firebaseRef = firebase.database().ref("Users/"+accountID+"/NFTs/"+currentnftidforsell);
    firebaseRef.remove();
	}
}