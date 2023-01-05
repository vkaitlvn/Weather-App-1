let weather = {
        apiKey:"b15bc012624d0ffcf1bc1dde53b967fe",
        //api from openweathermap.org
   
        fetchWeather: function (city) {
          fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" +
              city +
              "&units=imperial&appid=" +
              this.apiKey
          )
            .then((response) => {
              if (!response.ok) {
                alert("No weather found.");
                throw new Error("No weather found.");
              }
              return response.json();
            })
            .then((data) => this.displayWeather(data));
        },
        displayWeather: function (data) {
          const { name } = data;
          const { icon, description } = data.weather[0];
          const { temp, humidity, feels_like, temp_min, temp_max, pressure } = data.main;
          const { speed } = data.wind;
        
          document.querySelector(".city").innerText = "Weather in " + name;
          document.querySelector(".icon").src =
            "https://openweathermap.org/img/wn/" + icon + ".png";
          document.querySelector(".description").innerText = description;
          document.querySelector(".low").innerText = "Low: " + temp_min + "°F";
          document.querySelector(".high").innerText = "High: " + temp_max + "°F"
          document.querySelector(".temp").innerText = temp + "°F";
          document.querySelector(".humidity").innerText =
            "Humidity: " + humidity + "%";
          document.querySelector(".feelslike").innerText =
            "Feels Like: " + feels_like + "°F";
          document.querySelector(".wind").innerText =
            "Wind speed: " + speed + " m/h";
          document.querySelector(".pressure").innerText = "Pressure: " + pressure + " Pa";
          
          
          document.querySelector(".weather").classList.remove("loading");
          document.body.style.backgroundImage =
            "url('https://source.unsplash.com/1600x900/?" + description + ")";
        },
        search: function () {
          this.fetchWeather(document.querySelector(".search-bar").value);
        },
      };
      
      document.querySelector(".search button").addEventListener("click", function () {
        weather.search();
      });
      
      document
        .querySelector(".search-bar")
        .addEventListener("keyup", function (event) {
          if (event.key == "Enter") {
            weather.search();
          }
        });
      
      weather.fetchWeather("Denver");