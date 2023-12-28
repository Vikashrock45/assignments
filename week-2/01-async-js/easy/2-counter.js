let counting = 0;

function count() {

    function increaseCount() {
        if(counting < 10) {
            counting++;
            console.log(counting)
            setTimeout(function() {
                increaseCount();
            }, 1000)
        }
    }
    increaseCount()
}

count();
