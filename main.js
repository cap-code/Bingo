const P2PT = p2pt;
var p2pt;
var peers = {};
var room;
var lastgot =0;
var enable = false;
const shuffleButton = document.querySelector('.shuffle');
let nameId;
const namepanel = document.getElementById("idk");
const canva = document.getElementById("bingo-panel")
const hostPage = document.querySelector('.host-page');
const homePage = document.querySelector('.home-page');
const hostButton = document.getElementById("host-button");
const loader = document.querySelector('.loading');
loader.style.display = "none";
shuffleButton.style.display = "none";
hostPage.style.display = "none";
canva.style.display = "none";
namepanel.style.display="none";
function host_setup_page() {
    homePage.style.display = "none";
    hostPage.style.display = "";
    canva.style.display = "none";
    namepanel.style.display="none";
    nameId = document.getElementById('name-id').value;
}

function playArea() {
    homePage.style.display = "none";
    nameId = document.getElementById('name-id').value;
    room = document.getElementById("hostroom-id").value;
    document.getElementById('globalName').innerHTML = nameId;
    if (room == "") {
        alert("please type a room id");
    } else {
        // enable = true;
        // canva.style.display="";
        loader.style.display = "";
        hostPage.style.display = "none";
        shuffleButton.style.display = "";
        init();
        listen();
    }
}

function playjoin() {
    homePage.style.display = "none";
    nameId = document.getElementById('name-id').value;
    room = document.getElementById("join-is").value;
    document.getElementById('globalName').innerHTML = nameId;
    if (room == "") {
        alert("please type a room id");
    } else {
        loader.style.display = "";
        hostPage.style.display = "none";
        shuffleButton.style.display = "";
        init();
        listen();
    }

}

function init() {
    var announceURLs = [
        "wss://tracker.openwebtorrent.com",
        "wss://tracker.sloppyta.co:443/announce",
        "wss://tracker.novage.com.ua:443/announce",
        "wss://tracker.btorrent.xyz:443/announce"
    ];
    p2pt = new P2PT(announceURLs, room);
    p2pt.on('trackerconnect', (tracker, stats) => {
        console.log("connected to tracker :", tracker);
        console.log("status :", JSON.stringify(stats));
        loader.style.display = "none";
        enable = true;
        canva.style.display = "";
        namepanel.style.display="";

    });
}

function listen() {
    p2pt.on('peerconnect', peer => {
        peers[peer.id] = peer;
        console.log("new peer connnected :", peer);
        console.log("secrest inside the peers :",peers);
        document.getElementById("players").innerHTML="number of players :" +Object.keys(peers).length;
    });
    p2pt.on('peerclose', peer => {
        console.log("peer disconnnected :", peer.id);
        delete peers[peer.id];
        document.getElementById("players").innerHTML="number of players :" +Object.keys(peers).length;

    });
    //get msg from client
    p2pt.on('msg', (peer, msg) => {
        var text = JSON.parse(msg);
        console.log(text);
        if (text.type == "play") {
            lastgot = text.bvalue;
            document.getElementById("emitted-value").innerHTML = text.name + " : " + text.bvalue;
        } else if (text.type == "won") {
            document.getElementById("won").innerHTML = text.nameId + " won ";
            canva.style.display = "none";
        }
    });
    p2pt.start();
}

function broadcast(peers, data) {
    console.log("data sent to peer :", data);
    for (var key in peers) {
        console.log("key: ",key);
        p2pt.send(peers[key], JSON.stringify(data));
    }
}

