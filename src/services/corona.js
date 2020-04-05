import axios from "axios";
import formatter from "../utils/dataFormatter";
import { LocalStorage } from "ttl-localstorage";

LocalStorage.timeoutInSeconds = 1800;
const baseUrl =
  "https://w3qa5ydb4l.execute-api.eu-west-1.amazonaws.com/prod/finnishCoronaData/v2";

const getAllData = () => {
  return LocalStorage.get("data").then(data => {
    if (data === null) {
      const request = axios.get(baseUrl);
      return request.then(response => {
        return LocalStorage.put("data", response.data).then(r => {
          return response.data;
        });
      });
    } else {
      return data;
    }
  });
};

const getAllInfection = () => {
  return getAllData().then(r => formatter.formatInfectionData(r));
};

const getAllByDate = () => {
  return getAllData().then(r => formatter.getCountByDate(r));
};

const getSickByDate = () => {
  return getAllData().then(r => formatter.getTotalSickByDate(r))
};

const getAllByDistrict = () => {
  return getAllData().then(r => formatter.getTotalSickByDistrict(r))
};

const getTimeseriesByDistrict = districtName => {

  return getAllData().then(r => formatter.getTotalSickByDistrictTimeseries(r, districtName))
};
export default {
  getAllInfection,
  getAllByDate,
  getSickByDate,
  getAllByDistrict,
  getTimeseriesByDistrict
};
