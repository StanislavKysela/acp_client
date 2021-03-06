export const getTimeIfIsCorrect = function(time, stringLength){
    let reg = new RegExp(/^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/);
    let timeWithColon = "";
    if(stringLength === 3){  //ak je cas v tvare 855
      timeWithColon = time.slice(0, 1) + ":" + time.slice(1);
      timeWithColon = timeWithColon.replace(/\./g, "");
    }else{ //ak je cas v tvare 14 22 - cize vacsia dlzka
      timeWithColon = time.replace(/ /g, ":");
      timeWithColon = timeWithColon.replace(/\./g, "");
      let arrOfTimeParts = timeWithColon.split(":");
      if(arrOfTimeParts.length === 3){  //v pripade ze je cas vo forme 0 0 1 spojim posledne 2
          timeWithColon = arrOfTimeParts[0] + ":" + arrOfTimeParts[1] + arrOfTimeParts[2];
      }
    }
    if(reg.test(timeWithColon)){
      return(timeWithColon);
    }else{
      console.log("Not correct form of time!")
      return("");
    }
}

export const getDateIfIsCorrect = function(date){    
    let reg = new RegExp(/^(?=\d)(?:(?!(?:(?:0?[5-9]|1[0-4])(?:\.|-|\/)10(?:\.|-|\/)(?:1582))|(?:(?:0?[3-9]|1[0-3])(?:\.|-|\/)0?9(?:\.|-|\/)(?:1752)))(31(?!(?:\.|-|\/)(?:0?[2469]|11))|30(?!(?:\.|-|\/)0?2)|(?:29(?:(?!(?:\.|-|\/)0?2(?:\.|-|\/))|(?=\D0?2\D(?:(?!000[04]|(?:(?:1[^0-6]|[2468][^048]|[3579][^26])00))(?:(?:(?:\d\d)(?:[02468][048]|[13579][26])(?!\x20BC))|(?:00(?:42|3[0369]|2[147]|1[258]|09)\x20BC))))))|2[0-8]|1\d|0?[1-9])([-.\/])(1[012]|(?:0?[1-9]))\2((?=(?:00(?:4[0-5]|[0-3]?\d)\x20BC)|(?:\d{4}(?:$|(?=\x20\d)\x20)))\d{4}(?:\x20BC)?)(?:$|(?=\x20\d)\x20))?((?:(?:0?[1-9]|1[012])(?::[0-5]\d){0,2}(?:\x20[aApP][mM]))|(?:[01]\d|2[0-3])(?::[0-5]\d){1,2})?$/);
    if(date === "zajtra"){
      let tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      let tomorrowDateToReturn = (tomorrow.toLocaleDateString().replace(/\s+/g, ''));
      if(reg.test(tomorrowDateToReturn)){
        return(tomorrowDateToReturn);
      }
    }
    if(date === "pozajtra" || date === "po zajtra"){
      let tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 2);
      let tomorrowDateToReturn = (tomorrow.toLocaleDateString().replace(/\s+/g, ''));
      if(reg.test(tomorrowDateToReturn)){
        return(tomorrowDateToReturn);
      }
    }
    let dateWithDot = date.replace(/\./g, "");
    dateWithDot = dateWithDot.replace(/ /g, ".");
    let arrOfDateParts = dateWithDot.split(".");
    if(arrOfDateParts.length === 1){  //v pripade ze su 3 casti poslem mesiac na kontrolu ci nieje slovom
      dateWithDot = arrOfDateParts[0].slice(0, 1) + "." + arrOfDateParts[0].slice(1) + "." + new Date().getFullYear();
    }
    if(arrOfDateParts.length === 3){  //v pripade ze su 3 casti poslem mesiac na kontrolu ci nieje slovom
      arrOfDateParts[1] = changeMonthToNumericIfPossible(arrOfDateParts[1]);
      dateWithDot = arrOfDateParts[0] + "." + arrOfDateParts[1] + "." + arrOfDateParts[2];
    }
    if(arrOfDateParts.length === 2){   //v pripade ze spojilo dni a mesiace dokopy alebo clovek nepovedal rok
        arrOfDateParts[1] = changeMonthToNumericIfPossible(arrOfDateParts[1]);
        if(arrOfDateParts[1].length === 4){  //v pripade ze povedal rok rozdelim mesiace a dni
          dateWithDot = dateWithDot.slice(0, 1) + "." + dateWithDot.slice(1);
        }else{    //inak zmenim mesiac na cislo a dopisem aktualny rok
          dateWithDot = arrOfDateParts[0] + "." + arrOfDateParts[1] + "." + new Date().getFullYear();
        }
        
    }
    if(reg.test(dateWithDot)){
      return(dateWithDot);
    }else{
      console.log("Not correct form of date!");
      return ("");
    }
}

export const getNumberOfTransfersIfIsCorrect = function(transfers){
    let reg = new RegExp(/^(?:[1-9]|10)$/);
    let transfersModified = changeNumberToNumericIfPossible(transfers); //zmena jedna dva prvy na cislo
    if(reg.test(transfersModified)){
        return(transfersModified);
    }else{
        console.log("Not correct form of number of transfers!");
        return ("");
    }
}

export const getVehicleTypeIfIsCorrect = function (vehicle){
    let reg = new RegExp(/(?:vlak)/i);   
    let strToReturn = "";
    if(reg.test(vehicle)){                     //pridanie vlak do vysledku
        strToReturn = strToReturn + "vlak";
    }
    reg = new RegExp(/(?:bus)/i);    //pridanie bus do vysledku
    if(reg.test(vehicle)){
        strToReturn = strToReturn + "bus";
    }
    reg = new RegExp(/(?:mhd)/i);
    if(reg.test(vehicle) && strToReturn==="vlakbus"){   //pridanie mhd do vysledku - 
                                                         //iba ak tam je vlakbus - nemoze byt MHD samo alebo iba s vlakom alebo busom
        strToReturn = strToReturn + "mhd";
    }
    reg = new RegExp(/(?:v??etko|vsetko)/i);  //pridanie vsetkeho
    if(reg.test(vehicle)){
        strToReturn = "vlakbusmhd";
    }

    if(strToReturn.length === 0){   //v pripade ze tam sme mali iba slovo mhd + mesto alebo iba mesto
        let inputArr = vehicle.split(" ");
        for(let i = 0; i < inputArr.length; i++){
            if(inputArr[i] !== "mhd" && inputArr[i] !== "Mhd" && inputArr[i] !== "MHD"){  //odstranenie mhd
                strToReturn = strToReturn + " " + inputArr[i];
            }
        }
        
        strToReturn = changeCityName(strToReturn);
    }
    return strToReturn;
}

export const getMHDCityIfIsCorrect = function (city){
  let regVlak = new RegExp(/(?:vlak)/i); 
  let regBus = new RegExp(/(?:bus)/i); 
  let regMHD = new RegExp(/(?:mhd)/i); 
  let regAll = new RegExp(/(?:v??etko|vsetko)/i);
  let strToReturn = "";

  let inputArr = city.split(" ");
  for(let i = 0; i < inputArr.length; i++){
    if(!regVlak.test(inputArr[i]) && !regBus.test(inputArr[i]) && !regMHD.test(inputArr[i]) && !regAll.test(inputArr[i])){  //odstranenie mhd
        strToReturn = strToReturn + " " + inputArr[i];
    }
  }
  strToReturn = changeCityName(strToReturn);
  return strToReturn;
}

export const changeNumberToNumericIfPossible = function(number){
    switch(number){
      case "jeden": case "prv??ho": case "prv??": case "jedna": case "jedn??ho":
        return "1";
      case "dva": case "druh??ho": case "druh??": case "dvoch":
        return "2";
      case "tri": case "tretieho": case "tret??": case "troch":
        return "3";
      case "??tyri": case "??tvrt??ho": case "??tvrty": case "??tyroch":
        return "4";
      case "p????": case "pateho": case "piaty": case "piatich":
        return "5";
      case "??es??": case "??iesteho": case "??iesty": case "??iestich":
        return "6";
      case "sedem": case "siedmeho": case "siedmy": case "siedmich":
        return "7";
      case "osem": case "??smeho": case "??smy": case "??smich":
        return "8";
      case "dev????": case "deviateho": case "deviaty": case "deviatich":
        return "9";
      case "desa??": case "desiateho": case "desiaty": case "desiatich":
        return "10";
      default:
        return number;
    }
}

export const changeMonthToNumericIfPossible = function(month){
  switch(month){
    case "janu??ra": case "Janu??ra": case "janu??r": case "Janu??r":
      return "1";
    case "febru??ra": case "Febru??ra": case "febru??r": case "Febru??r":
      return "2";
    case "marca": case "Marca": case "marec": case "Marec":
      return "3";
    case "apr??la": case "Apr??la": case "apr??l": case "Apr??l":
      return "4";
    case "m??ja": case "M??ja": case "m??j": case "M??j":
      return "5";
    case "j??na": case "J??na": case "j??n": case "J??n":
      return "6";
    case "j??la": case "J??la": case "j??l": case "J??l":
      return "7";
    case "augusta": case "Augusta": case "august": case "August":
      return "8";
    case "septembra": case "Septembra": case "september": case "September":
      return "9";
    case "okt??bra": case "Okt??bra": case "okt??ber": case "Okt??ber":
      return "10";
    case "novembra": case "Novembra": case "november": case "November":
      return "11";
    case "decembra": case "Decembra": case "december": case "December":
      return "12";
    default:
      return month;
  }
}

export const changeCityName = function(cityName){
    switch(cityName){
        case " B??novce nad Bebravou": case " b??novce nad bebravou": case " B??novce Nad Bebravou":
          return "banovcenadbebravou";
        case " Bansk?? Bystrica": case " bansk?? bystrica": 
          return "banskabystrica";
        case " Bardejov": case " bardejov": 
          return "bardejov";
        case " Bratislava": case " bratislava": 
          return "bratislava";
        case " Brezno": case " brezno": 
          return "brezno";
        case " ??adca": case " ??adca":
          return "cadca";
        case " Doln?? Kub??n": case " doln?? kub??n":
            return "dolnykubin";
        case " Dunajsk?? Streda": case " dunajsk?? streda":
          return "dunajskastreda";
        case " Galanta": case " galanta": 
          return "galanta";
        case " Handlov??": case " handlov??": 
          return "handlova";
        case " Hlohovec": case " hlohovec": 
          return "hlohovec";
        case " Ke??marok": case " ke??marok": 
          return "kezmarok";
        case " Kom??rno": case " kom??rno": 
          return "komarno";
        case " Ko??ice": case " ko??ice":
          return "kosice";
        case " Kysuck?? Nov?? Mesto": case " kysuck?? nov?? mesto": 
          return "kysuckenovemesto";
        case " Levice": case " levice":
          return "levice";
        case " Levo??a": case " levo??a":
            return "levoca";
        case " Liptovsk?? Mikul????": case " liptovsk?? mikul????":
          return "liptovskymikulas";
        case " Lu??enec": case " lu??enec": 
          return "lucenec";
        case " Martin": case " martin": 
          return "martin";
        case " Nitra": case " nitra": 
          return "nitra";
        case " Michalovce": case " michalovce": 
            return "michalovce";
        case " Nov?? Mesto nad V??hom": case " Nov?? Mesto Nad V??hom": case " nov?? mesto nad v??hom": case " Nov?? mesto nad V??hom": 
            return "novemestonadvahom";
        case " Nov?? Z??mky": case " nov?? z??mky": 
            return "novezamky";
        case " Partiz??nske": case " partiz??nske": 
            return "partizanske";
        case " Pie????any": case " pie????any": 
            return "piestany";
        case " Poprad": case " poprad":
            return "poprad";
        case " Pova??sk?? Bystrica": case " pova??sk?? bystrica":
              return "povazskabystrica";
        case " Pre??ov": case " pre??ov":
            return "presov";
        case " Prievidza": case " prievidza": 
            return "prievidza";
        case " Rimavsk?? Sobota": case " rimavsk?? sobota": 
            return "rimavskasobota";
        case " Ro????ava": case " ro????ava": 
            return "roznava";
        case " Ru??omberok": case " ru??omberok": 
            return "ruzomberok";
        case " Senica": case " senica": 
            return "senica";
        case " Sere??": case " sere??": 
            return "sered";
        case " Skalica": case " skalica": 
            return "skalica";
        case " Spi??sk?? Nov?? Ves": case " Spi??sk?? nov?? Ves": case " spi??sk?? nov?? ves":
            return "spisskanovaves";
        case " Svit": case " svit":
              return "svit";
        case " ??ahy": case " ??ahy":
            return "sahy";
        case " ??a??a": case " ??a??a": 
            return "sala";
        case " ??t??rovo": case " ??t??rovo": 
            return "sturovo";
        case " ??urany": case " ??urany": 
            return "surany";
        case " Topo????any": case " topo????any": 
            return "topolcany";
        case " Trebi??ov": case " trebi??ov": 
            return "trebisov";
        case " Tren????n": case " tren????n": 
            return "trencin";
        case " Trnava": case " trnava": 
            return "trnava";
        case " Vranov nad Top??ou": case " vranov nad top??ou": case " Vranou Nad Top??ou":
            return "vranovnadtoplou";
        case " Zvolen": case " zvolen":
              return "zvolen";
        case " ??iar nad Hronom": case " ??iar nad hronom": case " ??iar Nad Hronom":
            return "ziarnadhronom";
        case " ??ilina": case " ??ilina": 
            return "zilina";

        default:
          return "";
      }
}