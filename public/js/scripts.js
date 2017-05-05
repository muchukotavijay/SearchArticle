// Get all variables
var pickimg = document.getElementById('pickimg');
var result = document.getElementById('res');
var img = document.getElementById('tableBanner');
var imgForm = document.getElementById('imgForm');

// 
pickimg.addEventListener('change', function() {
    var file = this.files[0];
    if (file.type.indexOf('image') < 0) {
        res.innerHTML = 'invalid type';
        return;
    }
    var fReader = new FileReader();
    fReader.onload = function() {
        img.src = fReader.result;
        localStorage.setItem("imgData", getBase64Image(img));
    };
    
    fReader.readAsDataURL(file);
    console.log('try to submit form');
    imgForm.submit();
});

function getBase64Image(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    
    var dataURL = canvas.toDataURL("image/png");
    
    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}

function fetchimage () {
    var dataImage = localStorage.getItem('imgData');
    img.src = "data:image/png;base64," + dataImage;
}

// Call fetch to get image from localStorage.
fetchimage();


popFileSelector = function() {
    var el = pickimg;
    if (el) {
        el.click();  
    }
};

window.popRightAway = function() {
    popFileSelector();
};

function cancelBubble(e) {
 var evt = e ? e:window.event;
 if (evt.stopPropagation)    evt.stopPropagation();
 if (evt.cancelBubble!=null) evt.cancelBubble = true;
}






(function() {
  var getQuote, totalQuotes;

  var quotes = [
    ["You will know (the good from the bad) when you are calm, at peace. Passive. A Jedi uses the Force for knowledge and defense, never for attack."],
    ["Feel the force!"],
    ["You must unlearn what you have learned."]
  ];

  totalQuotes = quotes.length;

  getQuote = function() {
    var activeQuotes;
    activeQuotes = quotes[Math.floor(Math.random() * totalQuotes)];
    return $('#quoteDisplay').text(activeQuotes);
  };

  getQuote();

}).call(this);
