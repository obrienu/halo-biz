import axios from 'axios';
import { NotificationManager } from "react-notifications";
import {
   LOGIN_USER_SUCCESS,
 

} from 'Actions/types';

export default
   axios.create({
      baseURL: 'https://reactify.theironnetwork.org/data/',
      timeout: 2000
   });

export const  updateUserProfile = (data) => (dispatch) => {
  return  axios.put("http://auth-server.eastus.azurecontainer.io/api/v1/staff/update", data)
   .then(response => {
      let {data:{data: userData}} = response;

      if(! userData){
         throw new Error(response.message);
      }

      localStorage.setItem("user_id", userData.id);
      localStorage.setItem("user-info", JSON.stringify(userData));
      dispatch({ type: LOGIN_USER_SUCCESS, payload: userData});

      
      NotificationManager.success(`Hi ${userData.firstName}!`);
      return true;

   }).catch(err =>{ 
      NotificationManager.error(err.message);
      return false
   })
}