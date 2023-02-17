//your code here
let h3 = document.createElement('h3');
h3.setAttribute('id','h');
h3.innerHTML = "Please click on the identical tiles to verify that you are not a robot.";
document.body.prepend(h3);

let btns = ["reset" , "verify"];
for(let b of btns){
    let btn = document.createElement('button');
    btn.setAttribute('id',b);
    btn.innerHTML = b.toUpperCase();
    btn.style.display = "none";
    document.body.append(btn);
}

let imgClass = ['img1','img2','img3','img4','img5'];
let randomIndex = Math.floor(Math.random() * imgClass.length);
let randomImg = imgClass[randomIndex];
imgClass.push(randomImg);

// shuffling the array - so that img will generate randomly at each position after reload
let arr1 = []
let img = 0;
while(img < imgClass.length){
    let randomIndex1 = Math.floor(Math.random() * imgClass.length);
    if(arr1[randomIndex1] == undefined){
        arr1[randomIndex1] = imgClass[img++]; 
    }
    else if(randomIndex1 != undefined){
        continue;
    }
}

let images = document.querySelectorAll('img');
let k = 0;
for(let i of arr1){
    images[k].setAttribute('class',i);
    images[k].setAttribute('id',k);
    k++;
}

for(let image of images){
    image.addEventListener('click',userOrRobot);
}


let resetBtn = document.getElementById('reset');
let verifyBtn = document.getElementById('verify');

let prevImgId = "";
let count = 0;
function userOrRobot(e){
    resetBtn.style.display = "inline";
    let currentImgId = e.target.id;
    // change border of image after clicked
    if(currentImgId != prevImgId){
        images[currentImgId].classList.add('selected')
        prevImgId = currentImgId;
        count++;
        if(count == 2){
            verifyBtn.style.display = "inline";
        }
        else if(count > 2){
            verifyBtn.style.display = "none";
        }
    }
}

resetBtn.addEventListener('click', () =>{
    verifyBtn.style.display = "none";
    resetBtn.style.display = "none";
    count = 0;
    let selectedImages = document.querySelectorAll('.selected');
    for(let t of selectedImages){
        t.classList.remove('selected');
    }
});

verifyBtn.addEventListener('click', ()=>{
    let selectedImages = document.querySelectorAll('.selected');
    let img1 = selectedImages[0].className;
    let img2 = selectedImages[1].className;

    let p = document.createElement('p');

    if(img1 == img2){ 
        p.innerHTML = "You are a human. Congratulations!";
    }
    else{
        p.innerHTML = "We can't verify you as a human. You selected the non-identical tiles."
    }
    verifyBtn.style.display = "none"; 
    document.body.append(p);
});
