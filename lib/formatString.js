var dotp = require("dot-prop");

var openkey = "{{";
var closekey = "}}";

var openkeyLength = openkey.length;
var closekeyLength = closekey.length;

const formatString = function(format, data) {
  var pieces = [];

  if (typeof data !== "object" || data === null) {
    data = Array.prototype.slice.call(arguments, 1);
  }

  var before;
  var value;
  var key;
  var start;
  var end;
  var position = 0;
  var trail;

  while (true) {
    start = format.indexOf(openkey, position);
    end = format.indexOf(closekey, position);

    if (start === -1 || end === -1) {
      // Insert trail piece.
      trail = format.substr(position);
      if (trail !== "") {
        pieces.push(trail);
      }
      break;
    }

    key = format.substring(start + openkeyLength, end);
    if (key.indexOf(".") !== -1) {
      value = dotp.get(data, key);
    } else {
      value = String(data[key]);
    }

    before = format.substring(position, start);
    pieces.push(before);

    pieces.push(value);

    position = end + closekey.length;
  }

  var result = pieces.join("");
  return result;
};
module.exports = formatString;
