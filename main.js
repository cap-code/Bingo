const shuffleButton=document.querySelector('.shuffle');
let nameId;
const canva=document.getElementById("bingo-panel")
const hostPage=document.querySelector('.host-page');
const homePage=document.querySelector('.home-page');
const hostButton=document.getElementById("host-button");
shuffleButton.style.display="none";
hostPage.style.display="none";
canva.style.display="none";
function host_setup_page(){
    homePage.style.display="none";
    hostPage.style.display="";
    canva.style.display="none";
    nameId=document.getElementById('name-id').value;
}
function playArea(){
    homePage.style.display="none";
    canva.style.display="";
    hostPage.style.display="none";
    shuffleButton.style.display="";
    nameId=document.getElementById('name-id').value;
    document.getElementById('globalName').innerHTML=nameId;
}