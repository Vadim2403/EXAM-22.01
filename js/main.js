var url = "https://poloniex.com/public?command=returnCurrencies";

var data;
var keys;
var result;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

var btn = $('#button');

$(window).scroll(function() {
  if ($(window).scrollTop() > 300) {
    btn.addClass('show');
  } else {
    btn.removeClass('show');
  }
});

btn.on('click', function(e) {
  e.preventDefault();
  $('html, body').animate({scrollTop:0}, '300');
});


function update(element,i){
    var dp;
    if(element.depositAddress == null){
        dp = element.depositAddress;
    }
    else{
        dp = element.depositAddress.substr(0,6);
    }
    $("#bodyT").append(
        `<tr id="${i}"> 
    <td> ${element.id} </td>
    <td> ${element.name} </td>
    <td>  ${element.humanType}</td>
   <td>  ${element.currencyType}</td>
     <td>  ${element.txFee}</td> 
    <td>  ${element.minConf}</td>   
    <td>  ${dp}</td> 
    <td> <button onclick="delElement(${i})" class="toCount btn btn-dark">Delete</button>
      </td></tr>`);
}

async function start() {
    document.getElementById("dot").style.display = "block";
    document.getElementById("mainLoader").style.display = "block";
    var res = await fetch(url);
    if (res.ok) {
        data = await res.json();
        result = Object.keys(data).map(function (key) {
            return data[key];

        });

        document.getElementById("dot").style.display = "none";
        document.getElementById("mainLoader").style.display = "none";
        for (var i = 0; i < result.length; i++) {
           update(result[i],i);
        }

    }
    else {
        console.log(error);
    }
}

start();

async function searching(){
    document.getElementById("bodyT").innerHTML = "";
    document.getElementById("dot").style.display = "block";
    document.getElementById("mainLoader").style.display = "block";
     str = document.getElementById("inpt").value;
     str = str.toLowerCase();
     await sleep(2000);
     document.getElementById("dot").style.display = "none";
     document.getElementById("mainLoader").style.display = "none";
     for(var i = 0; i < result.length; i++){
        if((result[i].name).toLowerCase().includes(str)){
            update(result[i],i);
        }
     }
}


async function delElement(idE){
    try{
        var str = "#"+idE;
        result.splice(idE, 1);

        document.getElementById("bodyT").innerHTML = "";
        document.getElementById("dot").style.display = "block";
        document.getElementById("mainLoader").style.display = "block";
        str = document.getElementById("inpt").value;
        str = str.toLowerCase();
        await sleep(1500);
        document.getElementById("dot").style.display = "none";
        document.getElementById("mainLoader").style.display = "none";
        for(var i = 0; i < result.length; i++){

            if((result[i].name).toLowerCase().includes(str)){
            update(result[i],i);
            }
        }
 
     
    }
    catch{

    }
}
