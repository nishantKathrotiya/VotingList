import { toast } from "react-toastify";
import { apiConnector } from "../connector";
import { setToken , setRole , setLoading } from "../../slices/profile";
import { authEndPoins } from "../api";
import Cookies from 'js-cookie';



export async function signUp(formData , setLoading){
 
    const toastId = toast.loading("Loading...")
    setLoading(true)
    try {
      const response = await apiConnector("POST", authEndPoins.SIGNUP_API,null, {formData})

        if(!response.data.success){
          throw new Error(response.data.msg)
        }

        toast.success("Signup Success");
    }
     catch (error) {
      console.log("SignUp API ERROR............", error)
      toast.error(error.response.data.error)
    }
    setLoading(false);
    toast.dismiss(toastId);
  }


  export  function login(userId,password,navigate){
    return async (dispatch)=>{
      const toastId = toast.loading("Loading...")
      dispatch(setLoading(true))
      try {
        const response = await apiConnector("POST", authEndPoins.LOGIN_API,null, {userId, password,})
        console.log("LOGIN API RESPONSE............", response)
  
        if(!response.data.success) {
          throw new Error(response.data.message)
        }
  
        toast.success("Login Successful")
        dispatch(setToken(response.data.token));
        dispatch(setRole(response.data.role));
        
        localStorage.setItem("token", JSON.stringify(response.data.token));
        localStorage.setItem("role", JSON.stringify(response.data.role));
  
        Cookies.set('token', response.data.token, { expires: 1, path: '' }); 
       
      navigate(`/${response.data.role}`)
      }
       catch (error) {
        console.log("LOGIN API ERROR............", error)
        toast.error(error.message)
      }
      dispatch(setLoading(false))
      toast.dismiss(toastId)
    }
  }


export function logout(navigate) {
  return (dispatch) => {
    dispatch(setRole(null))
    dispatch(setToken(null))
    Cookies.remove('token'); 
    localStorage.removeItem("role")
    localStorage.removeItem("token")
    navigate("/")
    toast.success("Logged Out")
  }
}