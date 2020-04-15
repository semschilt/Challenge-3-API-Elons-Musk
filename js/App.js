window.onload = function(){

    var knop = document.getElementsByClassName('verzoek')[0];

    knop.onclick = function(){

      // hier pak ik de inhoud van de input
      var resultaat = document.getElementById('resultaat').value;

      // hier pak ik de gehele container voor de afbeelding
      var houderAchtergrond = document.getElementsByClassName('houder')[0];

      //hier fetch ik de openweather API met als Query het resultaat van de input
      fetch('http://api.weatherstack.com/current?access_key=426f851fa99a31e6764b2d00ebc20797&query='+resultaat)
        .then(function(res){
          return res.json();
        })
        .then(function(data){

          //hieronder pak ik alle data van de API om later te tonen
          var temperatuur = data.current.temperature;
          var gevoel = data.current.feelslike;
          var wind = data.current.wind_speed;
          var locatieNaam =  data.location.name;
          var locatieStad = data.location.country;
          var locatieRegio = data.location.region;
          
          // Hier pak ik alle DOM elementen om die wanneer er op de knop is gedruk te laten tonen.
          var titelInhoud = document.getElementsByClassName('titelInhoud')[0];
          var locatieHouder = document.getElementsByClassName('locatie')[0];
          var temperatuurHouder = document.getElementsByClassName('temperatuur')[0];
          var windHouder = document.getElementsByClassName('wind')[0];

          var advies = document.getElementsByClassName('advies')[0];
          var temperatuurMeter = document.getElementsByClassName('adviesTemperatuur')[0];
          var windMeter = document.getElementsByClassName('adviesWind')[0];


          //Hier kijk ik of er een locatie is ingevoerd zo niet kijkt hij naar het land
          if(locatieRegio){
            locatieHouder.innerHTML = "De locatie die je hebt ingevuld: " + locatieNaam + ", " + locatieRegio + ", " + locatieStad + ". ";
          }else{
            locatieHouder.innerHTML = "De locatie die je hebt ingevuld: " + locatieNaam + ", " + LocatieStad + ". ";
          }

          temperatuurHouder.innerHTML = "Op dit moment is de temprature: " + temperatuur + "&#x2103; en het voelt aan als " + gevoel + "&#x2103; . ";
          windHouder.innerHTML = "De wind gaat: " + wind + " kilometer per uur. ";

          var temperatuurAdvies = true;
          var windAdvies = true;

          //Hieronder volgt een temperatuur check, om te kijken of de raket mag landen
          if(temperatuur > -100 && temperatuur < 0){
            //Extreem koud
            temperatuurMeter.innerHTML = "Het is veelste koud hier.";
            temperatuurAdvies = false;

          }if(temperatuur >= 0 && temperatuur < 11){
            //koud
            temperatuurMeter.innerHTML = "Het is koud hier.";

          }if(temperatuur >= 11 && temperatuur < 22){
            //Normaal
            temperatuurMeter.innerHTML = "Wat een lekker temperatuurtje.";

          }if(temperatuur >= 22 && temperatuur < 32){
            //Heet
            temperatuurMeter.innerHTML = "het is lekker warm hier!";
            temperatuurAdvies = false;

          }if(temperatuur >= 32){
            //Extreem heet
            temperatuurMeter.innerHTML = "Het is hier veelste heet!";
            temperatuurAdvies = false;
          }

          //wind advice
          if(wind <= 11 && wind >= 0){
            //Zacht
            windMeter.innerHTML = "Het is hier wind stil.";

          }if(wind >= 11 && wind < 28){
            //Normaal
            windMeter.innerHTML = "Het waait hier aleen wel een klein beetje.";

          }if(wind >= 28 && wind < 61){
            //Hard
            windMeter.innerHTML = "Wie heeft de deur open staan het toch hier.";
            windAdvies = false;

          }if(wind >= 62){
            //Storm
            windMeter.innerHTML = "De wind is veelste erg ik waai bijna weg hier.";
            windAdvies = false;
          }

          //Hier check ik of het advice goed is en als dat niet zo is dan zegt de applicatie dat de raket niet mag landen
          if(windAdvies && temperatuurAdvies){
            advies.innerHTML = "Je kunt hier veilig landen!";
          }else{
            advies.innerHTML = "Stijg als de wiede weer op het is hier niet veilig om te landen.";
          }

          //Hier fetch ik de Unsplash API
          fetch('https://api.unsplash.com/search/photos/?client_id=qreIVpbUQ7fXH9mFpMsCNFbUqq1AV28zlqMyDuzuG6U&query='+locatieNaam)
          .then(function(res){
            return res.json();
          }).then(function(data){

            //Hieronder pak ik alle data die ik nodig heb uit de API
            var weergaveResultaat = data.results[0].urls.full;
            var afbeeldingBreedte = data.results[0].width;
            var afbeeldingHoogte = data.results[0].height;

            document.getElementById('titel').style.display = "none";
            document.getElementsByClassName('invoer')[0].style.color = "#764EBE";

            titelInhoud.innerHTML = "De gegevens van je locatie";

            //Hier zorg ik ervoor dat alleen afbeeldingen worden getoond die verticaal zijn
            if(afbeeldingBreedte >= afbeeldingHoogte){
               houderAchtergrond.style.backgroundImage = "url(" + weergaveResultaat + ")";
             }else{
               for(i = 0; afbeeldingBreedte <= afbeeldingHoogte; i++){
                   weergaveResultaat = data.results[i].urls.full;
                   houderAchtergrond.style.backgroundImage = "url(" + weergaveResultaat + ")";
               }
            }

          //hieronder staan de errors van unsplash en de weather API
          }).catch(function(error){
            console.log('unsplash, er is iets fout gegaan', error);
          });
        })
        .catch(function(error){
          console.log('Weather, verzoek is gefaild', error);
        });
    }
}
