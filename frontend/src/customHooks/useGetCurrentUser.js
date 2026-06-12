import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setUserData } from '../redux/userSlice'
import { serverUrl } from '../App'

const useGetCurrentUser = () => {
    const dispatch = useDispatch()


     useEffect(()=>{
      
        const fetchUser = async () => {
             try {
                 const {data} = await axios.get(`${serverUrl}/api/user/getcurrentuser`,
                    {withCredentials:true});
                    dispatch(setUserData(data.user));
             } catch (error) {
                console.log(error.message);
                dispatch(setUserData(null))
             }
        }

        fetchUser();
     },[dispatch])

}

export default useGetCurrentUser