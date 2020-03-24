const formatInfectionData = data => {
  var newData = {};
  data.confirmed.map(infection => {
    if (newData[infection["healthCareDistrict"]]) {
      var count = newData[infection["healthCareDistrict"]].infections;
      var newCount = parseInt(count);
      newCount++;
      newData[infection["healthCareDistrict"]].infections = newCount;
    } else {
      const newDistrict = {
        infections: 1,
        deaths: 0,
        recovered: 0
      };
      newData[infection["healthCareDistrict"]] = newDistrict;
    }
  });

  data.deaths.map(infection => {
    if (newData[infection["healthCareDistrict"]]) {
      var count = newData[infection["healthCareDistrict"]].deaths;
      var newCount = parseInt(count);
      newCount++;
      newData[infection["healthCareDistrict"]].deaths = newCount;
    } else {
      const newDistrict = {
        infections: 0,
        deaths: 1,
        recovered: 0
      };
      newData[infection["healthCareDistrict"]] = newDistrict;
    }
  });

  data.recovered.map(infection => {
    if (newData[infection["healthCareDistrict"]]) {
      var count = newData[infection["healthCareDistrict"]].recovered;
      var newCount = parseInt(count);
      newCount++;
      newData[infection["healthCareDistrict"]].recovered = newCount;
    } else {
      const newDistrict = {
        infections: 0,
        deaths: 0,
        recovered: 1
      };
      newData[infection["healthCareDistrict"]] = newDistrict;
    }
  });

  return newData;
};

const getCountByDate = data => {
  var dateCount = [];
  data.confirmed.map(confirmed => {
      const date = new Date(confirmed.date);
    const idx = dateCount.findIndex(x => (new Date(x.date).toString().split(" ").slice(0, 4).join(" ") === date.toString().split(" ").slice(0, 4).join(" ")))
    if (idx !== -1) {
      var count = dateCount[idx].count;
      count++;
      dateCount[idx].count = count;
    } else {
      const newDate = {
        date: date.toString().split(" ").slice(0, 4).join(" "),
        count: 1
      };
      dateCount.push(newDate);
    }
  });
  dateCount.sort(function(a, b) {
    // Turn your strings into dates, and then subtract them
    // to get a value that is either negative, positive, or zero.
    return new Date(a.date) - new Date(b.date);
  });

  return dateCount;
};

const getTotalSickByDate = data => {
    var arr = getCountByDate(data);
    var total = 0;
    arr.forEach(idx => {
        total += idx.count;
        idx.count = total;
    })

    return arr;
}


const getTotalSickByDistrict = data => {
    var arr = []
    var total = 0;
    data.confirmed.map(confirmed => {
        const districtName = confirmed['healthCareDistrict']
      const idx = arr.findIndex(x => x.district === districtName)
      if (idx !== -1) {
        var count = arr[idx].count;
        count++;
        arr[idx].count = count;
      } else {
        const newDistrict = {
          district: districtName,
          count: 1
        };
        arr.push(newDistrict);
      }
    });

    return arr;
}

const filterDataArrayByDistrict = (dataArray, districtName) => {
  let filteredArray = dataArray.filter(obs => obs["healthCareDistrict"] === districtName);

  return filteredArray;
}

const aggregateByDay = dataArray => {
  let dateMapping = new Map();
  for (const elem of dataArray) {
    const date = new Date(elem["date"]);

    const dateStr = ""+date.getFullYear()+"-"+ (date.getMonth() + 1)+"-"+date.getDate();
    let data = dateMapping.get(dateStr)

    if(data === undefined) {
      dateMapping.set(dateStr, 1);
    }
    else {
      dateMapping.set(dateStr, data+1);
    }
  };

  let outputArr = []
  for (const [key, value] of dateMapping.entries()) {
    outputArr.push({date:key, count:value})
  }
  return outputArr.sort((a,b) => Date.parse(a.date)>Date.parse(b.date) ?1:-1);
}

const getTotalSickByDistrictTimeseries = (data, districtName) => {
  let confirmed = []
  let deaths = []
  let recovered = []

  confirmed = aggregateByDay(filterDataArrayByDistrict(data.confirmed, districtName))
  deaths = aggregateByDay(filterDataArrayByDistrict(data.deaths, districtName))
  recovered = aggregateByDay(filterDataArrayByDistrict(data.recovered, districtName))
  return {confirmed:confirmed, deaths:deaths, recovered:recovered};
}

// Takes data in the format returned by aggregateByDay function
const cumulativeSum = dataArray => {

  let cumSum = JSON.parse(JSON.stringify(dataArray))
  
  dataArray.reduce((acc, cur, ind) => {
    return cumSum[ind].count = acc + cur.count;
  },0);
  return cumSum;
}
export default { formatInfectionData, getCountByDate, getTotalSickByDate, getTotalSickByDistrict, getTotalSickByDistrictTimeseries, cumulativeSum };
