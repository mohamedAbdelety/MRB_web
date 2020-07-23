
function base64ToArrayBuffer(base64) {
    var binaryString = window.atob(base64);
    var binaryLen = binaryString.length;
    var bytes = new Uint8Array(binaryLen);
    for (var i = 0; i < binaryLen; i++) {
        var ascii = binaryString.charCodeAt(i);
        bytes[i] = ascii;
    }
    return bytes;
}




let send_request = () =>{  
    
    let theUrl = "http://127.0.0.1:5000/";
    let pdfUrl = "http://127.0.0.1:5000/pdf"; // base 64
    var file = document.getElementById("upload").files[0];
    if(file && (file.type == "image/jpeg" || file.type == "image/jpg" || file.type == "image/png")){
        var req = new XMLHttpRequest();
        var formdata = new FormData();
        formdata.append('media',file); 
        req.onreadystatechange = function() {
            if(req.readyState === 4){
                if(req.status == 200){
                    $('#upload-section').css('background-image',"url('images/slider-bg-1.jpg')");
                    $('.upload-box').html('<p aria-hidden="true"><div class="custom-upload"><input onchange="send_request()" type="file" id="upload"><span>Chosse Image or PDF</span></div></p>');
                    var image = new Image();
                    image.src = 'data:image/jpg;base64,'+req.responseText;
                    var w = window.open("","MRB Image",'height=650,width=840');
                    w.document.write(image.outerHTML);
                }
            }else{
                $('#upload-section').css('background-image',"url('images/3.gif')");
                $('#upload-section').css('background-size',"cover");
                $('#upload-section').css('background-position',"center");
                $('#upload-section').css("background-repeat","no-repeat");
                $('.upload-box').html('Please Wait (image translated).');
            }
        }
        req.open('POST',theUrl, true);
        req.send(formdata);
    }else if(file && file.type == "application/pdf"){
        var req = new XMLHttpRequest();
        var formdata = new FormData();
        formdata.append('media',file);
        req.onreadystatechange = function() {
            if(req.readyState === 4){
                if(req.status == 200){
                    $('#upload-section').css('background-image',"url('images/slider-bg-1.jpg')");
                    $('.upload-box').html('<p aria-hidden="true"><div class="custom-upload"><input onchange="send_request()" type="file" id="upload"><span>Chosse Image or PDF</span></div></p>');
                    var blob = new Blob([base64ToArrayBuffer(req.responseText)], {type: "application/pdf"});
                    var link = window.URL.createObjectURL(blob);
                    window.open(link,'MRB PDF', 'height=650,width=840');
                }
            }else{
                $('#upload-section').css('background-image',"url('images/2.gif')");
                $('#upload-section').css('background-size',"cover");
                $('#upload-section').css('background-position',"center");
                $('#upload-section').css("background-repeat","no-repeat");
                $('.upload-box').html('Please Wait (PDF translated).');
            }
        }
        req.open('POST',pdfUrl, true);
        req.send(formdata);      
    }else{
        alert("Not file uploaded.");
    }
}


var gifs = ['images/2.gif','images/3.gif','images/4.gif','images/1.gif'];
var i = 3;
setInterval(function(){
    document.getElementById('poster').setAttribute('src',gifs[i])
    if(i == 3){
        i = 0;
    }else{
        i++;
    }
},6000);














    

    
