const Profile = document.getElementById("Profile");
const Yes = document.getElementById("yes");
const No = document.getElementById("no");
var allPost =  new Array("Is google good to use?", "Why don't people use Edge?", "I love Bing!!!", "Firefox is so cool!");

async function getPosts() {
  const response = await fetch("/api/post/create", {
    method: "POST",
    body: JSON.stringify({ newPost }),
    headers: { "Content-type": "application/json" },
  });

  if (response.ok) {
    console.log('response : ' + response)
  } else {
    console.log('Error : ' + response)
  }
}

function chooseQ() {
  var myPix = allPost;
     var randomNum = Math.floor(Math.random() * myPix.length);
     document.getElementById("homeQuestion").innerHTML = myPix[randomNum];
}

// take user to their profile page
Profile.addEventListener("click", async function () {
  console.log("here is the button");
  document.location.replace("/profilepage");
});
Yes.addEventListener("click", async function () {
  // const response = await fetch("/api/pics/vote", {
  //   method: "POST",
  //   body: JSON.stringify({ pictId }),
  //   headers: { "Content-type": "application/json" },
  // });
  // pictId++;
  chooseQ()
});
No.addEventListener("click", async function () {
  // console.log("NOT");
  // pictId++;
  chooseQ()
});

window.onload = chooseQ;
