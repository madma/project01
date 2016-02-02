console.log("main_.js loaded!");

// MODEL

var $board = $(".board");
var bw = $board.width();
var bh = $board.height();
var side = bh/10;
var $img = $("<img>", {id:"eiffel", src:"assets/eiffel_tower.png"});


$img.css({width: side, height: 4*side});
$img.css({position: "relative", left: relX(bw/2, $img) , top: relY(bh/2, $img)});
$board.prepend($img);
$(document).on("keyup", leftRight);

function relX(x, el) {
  var w = el.width();
  return x - w/2;
}

function relY(y, el) {
  var h = el.height();
  return y - h/2;
}

function left(n) {
  return $img.css("left", n - side);
}

// VIEW
function leftRight(event) {
  switch (event.keyCode) {
    case 37:
      var old = $img.css("left");
      $img.css("left", "-="+side);
      break;
    case 39:
      var old = $img.css("left");
      $img.css("left", "+="+side);
      console.log(old);
      break;
    default:
      return;
  }
}

