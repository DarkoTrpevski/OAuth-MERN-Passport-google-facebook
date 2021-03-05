import axios from 'axios'

export const fetchUserAction = () => async (dispatch) => {
   try {
      axios.get('/api/current_user').then((res) => {
         console.log('Inside fetchUserAction, res is: ', res);
         dispatch({ type: 'GET_USER', payload: res.data })
      }).catch((err) => console.log('Inside fetchUserAction, error is: ', err));
   } catch (err) {
      console.log('Inside fetchUserAction, error is: ', err);
   }
}