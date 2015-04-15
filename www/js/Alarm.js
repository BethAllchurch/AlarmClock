function Alarm() {

    this.view = new AlarmView();
    this.timeNow = {};
    this.alarmTime = {};
    this.isRinging = false;
    this.days = [
        'SUNDAY',
        'MONDAY',
        'TUESDAY',
        'WEDNESDAY',
        'THURSDAY',
        'FRIDAY',
        'SATURDAY'
    ];
    this.sound = new Audio("../sounds/honk.wav");
  
    this.setMinute = function(minute) {
        this.alarmTime.minute = Number(minute);
    }

    this.setHour = function(hour) {
        this.alarmTime.hour = Number(hour);
    }

    this.setDay = function(day) {
        var numberOfDay = this.days.indexOf(day);
        this.alarmTime.day = numberOfDay;
    }

    // set alarm time
    this.set = function(day, hour, minute) {

        // set alarm
        this.setDay(day);
        this.setHour(hour);
        this.setMinute(minute);

        // start checking time
        this.checkTime();

        // update view
        this.view.set(day, hour, minute);
    }

    // start / stop alarm ringing
    this.start = function() {
        this.isRinging = true;
        this.sound.loop = true;
        this.sound.play();
    }

    this.stop = function() {
        this.isRinging = false;
        this.sound.loop = false;
        this.sound.stop();
    }

    // check whether current time is the time alarm is set for
    this.checkTime = function() {
        this.checkTimeId = setInterval(function() {
            if (this.timeNow.day === this.alarmTime.day &&
                this.timeNow.hour === this.alarmTime.hour &&
                this.timeNow.minute === this.alarmTime.minute) {
                clearInterval(this.checkTimeId);
                this.start();
            }
        // check every second

        }.bind(this), 1000);
    }

    // update the current time
    this.updateTime = function() {
        setInterval(function() {
            var dateReference = new Date();
            this.timeNow.day = dateReference.getDay();
            this.timeNow.hour = dateReference.getHours();
            this.timeNow.minute = dateReference.getMinutes();
            this.view.updateTime(this.days[this.timeNow.day].toUpperCase(), zeroPad(this.timeNow.hour), zeroPad(this.timeNow.minute));
        }.bind(this), 500);
    }
}


function AlarmView() {

    this.updateTime = function(day, hour, minute) {
        $('#day-now').text(day);
        $('#hour-now-ten').text(hour.charAt(0));
        $('#hour-now-unit').text(hour.charAt(1));
        $('#minute-now-ten').text(minute.charAt(0));
        $('#minute-now-unit').text(minute.charAt(1));
    }

    this.set = function(day, hour, minute) {
        $('#alarm-time').text('ALARM SET FOR ' + day + ' ' + hour + ':' + minute)
                        .prepend('<i class="fa fa-clock-o"></i>');

    }

}