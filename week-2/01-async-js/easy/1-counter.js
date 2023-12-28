let count = 0;
let counter = setInterval(function(){
    count++;
    console.log(count);
    if(count >= 10) {
        clearInterval(counter);
    }
}, 1000)
