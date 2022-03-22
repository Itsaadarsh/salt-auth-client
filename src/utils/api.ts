import Axios from 'axios';

export default Axios.create({
  baseURL: 'https://salt-auth.herokuapp.com/api/v1/' || 'http://localhost:8080/',
});
