function showTime() {
    setInterval(() => {
        const currentDate = new Date();
        let hour = ("0" + (currentDate.getHours())).slice(-2);
        const minute = ("0" + (currentDate.getMinutes())).slice(-2);
        const second = ("0" + (currentDate.getSeconds())).slice(-2);
        let phase = "AM"
        if(hour > 12) {
            hour -= 12;
            hour = ("0" + hour).slice(-2);
            phase = "PM"
        }
        console.clear();
        console.log(hour + ':' + minute + ':' + second + " " + phase)
    }, 1000)
}
showTime();