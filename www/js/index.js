// TODO : should this be a constructor function for consistency ??
var app = {

    alarm: new Alarm(),
    weather: new Weather(),
    bodyHammertime: new Hammer(document.getElementsByTagName('body')[0]),
    timeAndForecastHammertime: new Hammer(document.getElementById('time-and-forecast')),
    overlayHeaderHammertime: new Hammer(document.getElementById('overlay-header')),
    
    initialize: function() {
        this.bindEvents();
        this.alarm.updateTime();
    },

    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);        
    },

    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        app.weather.checkForecast();
        app.addEventListeners(app);
    },

    addEventListeners: function(that) {

        // swiping around
        that.bodyHammertime.get('swipe').set({ direction: Hammer.DIRECTION_ALL });
        that.bodyHammertime.on('swipedown', function(e) {
            $('.underlay').removeClass('show');
            $('#overlay-header').removeClass('dark');
            $('#alarm-time i').removeClass('dark');
        });
        that.bodyHammertime.on('swipeup', function(e) {
            $('.underlay').addClass('show');
            $('#overlay-header').addClass('dark');
            $('#alarm-time i').addClass('dark');
            if (that.alarm.isRinging) {
                that.alarm.stop();
            }
        });
        that.bodyHammertime.on('swipeleft', function(e) {
            $('.app').removeClass('show-set-alarm');
        });
        that.overlayHeaderHammertime.on('swiperight', function(e) {
            $('.app').addClass('show-set-alarm');
        });
        that.timeAndForecastHammertime.on('swiperight', function(e) {
            $('#time-and-forecast').removeClass('show-forecast');
            $('.fa-chevron-right').removeClass('show-forecast');
        });
        that.timeAndForecastHammertime.on('swipeleft', function(e) {
            $('#time-and-forecast').addClass('show-forecast');
            $('.fa-chevron-right').addClass('show-forecast');
        });
        
        // set alarm
        $('#set-alarm-button').click(function(e) {

            // get values
            var selectedDay = $('#select-day').val();
            var selectedHour = $('#select-hour').val();
            var selectedMinute = $('#select-minute').val();

            // set alarm
            that.alarm.set(selectedDay, selectedHour, selectedMinute);

            // return to home page
            $('.app').removeClass('show-set-alarm');
            
        });
    },

    receivedEvent: function(id) {
        console.log('Received Event: ' + id);
    }
};

// helper functions
function zeroPad(number) {
    var stringyNumber = number.toString();
    return stringyNumber.length === 1 ? '0' + stringyNumber : stringyNumber;
}
