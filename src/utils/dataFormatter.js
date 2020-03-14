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
    const idx = dateCount.findIndex(x => (x.date == confirmed.date));
    console.log(idx)
    if (idx !== -1) {
      var count = dateCount[idx].count;
      count++;
      dateCount[idx].count = count;
    } else {
      const newDate = {
        date: confirmed.date,
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

export default { formatInfectionData, getCountByDate };
