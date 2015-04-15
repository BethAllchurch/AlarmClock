function Weather() {

    this.view = new WeatherView();

    this.activitySuggestions = {
        'rain' : ['a pub lunch sounds very good to me?'],
        'sun' : ['get to the beach, while it\'s sunny!'],
        'clear' : ['go for a walk in the park'],
        'cloud' : ['go grab a coffee!']
    };

    this.findWeatherType = function(description, weatherType) {
        var description = description.toLowerCase();
        if (description.indexOf(weatherType) !== -1) {
            return weatherType;
        } else {
            return false;
        }
    }

    this.findActivity = function(description, weatherType) {
        var description = description.toLowerCase();
        if (description.indexOf(weatherType) === -1) {
            return false;
        }
        var activityIndex = Math.floor(Math.random() * this.activitySuggestions[weatherType].length);
        return this.activitySuggestions[weatherType][activityIndex];
    }

    this.checkForecast = function() {
        var city = 'Munich';
        var countryCode = 'de';
        $.getJSON('http://api.openweathermap.org/data/2.5/weather?q=' + city + ',' + countryCode, function(weatherData) {
            var temperature = Math.round(weatherData.main.temp - 273.15) || 16;
            var description = weatherData.weather[0].description || 'sky is clear';
            
            for (var weatherType in this.activitySuggestions) {
                if (this.activitySuggestions.hasOwnProperty(weatherType) && this.findActivity(description, weatherType)) {
                    var activitySuggestion = this.findActivity(description, weatherType).toUpperCase();    
                }
            }

            for (var i = 0; i < 4; i++) {
                if (this.findWeatherType(description, ['rain', 'sun', 'clear', 'cloud'][i])) {
                    weatherType = ['rain', 'sun', 'clear', 'cloud'][i];
                }
            }

            this.view.checkForecast(city.toUpperCase(), weatherType, description.toUpperCase(), temperature, activitySuggestion);
        }.bind(this));
    }

}



function WeatherView() {

    this.checkForecast = function(city, weatherType, description, temperature, activitySuggestion) {
        if (weatherType === 'clear') {
            weatherType = 'sun';
        }
        $('#homepage').addClass(weatherType);
        $('#homepage .description').text(description);
        $('#homepage .location').text(city);
        $('#homepage .temperature-number').text(temperature);
        $('#activity-suggestion').text(activitySuggestion);
    }

}