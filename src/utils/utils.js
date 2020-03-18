const sortByDistrictCount = (data) => {
    data.sort(function(a, b) {
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return b.count - a.count
      });
    return data
}

export default { sortByDistrictCount}