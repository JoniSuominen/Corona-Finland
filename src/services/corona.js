import axios from "axios";
import formatter from "../utils/dataFormatter";
const baseUrl =
  "https://w3qa5ydb4l.execute-api.eu-west-1.amazonaws.com/prod/finnishCoronaData";

const getAllInfection = () => {
  const request = axios.get(baseUrl);
  return request.then(response => formatter.formatInfectionData(response.data));
};

const getAllByDate = () => {
  const request = axios.get(baseUrl);
  return request.then(response => formatter.getCountByDate(response.data));
};

const getSickByDate = () => {
  const request = axios.get(baseUrl);
  return request.then(response => formatter.getTotalSickByDate(response.data));
};

export default { getAllInfection, getAllByDate, getSickByDate };
