'use strict';

$(document).ready(initialize);

function initialize(){
  $(document).foundation();

  try {
    console.log(x); // remaining code does not run when Javascript finds an uncaught error.
  } catch(e) {
    console.log('you just received the error:' + e);
  }
}
