import axios from "axios";

class ApiService {
  constructor() {
    this.service = axios.create({
      baseURL: "https://module3-backend.herokuapp.com/",
      withCredentials: true,
    });
  }

  login = (username, password) => {
    return this.service
      .post("auth/login", { username, password })
      .then((response) => response.data);
  };

  signup = (name, email, password) => {
    return this.service
      .post("user/signup", { name, email, password })
      .then((response) => response.data);
  };

  restaurants = () => {
    return this.service.get("restaurants").then((response) => response.data);
  };

  restaurant = (id) => {
    return this.service.get("restaurants/"+id).then((response) => response.data);
  };

  user = () => {
    return this.service.get("users").then((response) => response.data);
  };

  makeReservation = (data) => {
    return this.service.post("reservations",data).then((response) => response.data);
  };

  deleteReservation = (id) => {
    return this.service.delete("reservations/"+id).then((response) => response.data);
  };

  addAchievement = (id) => {
    return this.service
      .post("achievement/" + id)
      .then((response) => response.data);
  };

  status = () => {
    return this.service
      .get("auth/status")
      .then((response) => response.data);
  };

}

const apiService = new ApiService();

export default apiService;
