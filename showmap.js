"use strict";

let currentsymbol = null;

let lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('output.map')
});

lineReader.on('line', function (line) {
  let symbolname = /^\ (\.[^ ]+).*$/;
  let symboladdr = /^.{16}(0x[0-9a-f]+).*$/;
  let symbolsize = /^.{34} +(.*0x[0-9a-f]+) (?!\(size before relaxing\)).*$/;
  let symbolfile = /^.{46}(.*).*$/;

  let match = symbolname.exec(line);
  if (match != null) {
    if (currentsymbol != null) {
      console.log(currentsymbol.size + " " + currentsymbol.name)
    }

    currentsymbol = {name: match[1]};
  }

  if (currentsymbol == null) {
    return;
  }

  match = symbolsize.exec(line);
  if (match != null) {
    currentsymbol.size = parseInt(match[1]);
  }
});
