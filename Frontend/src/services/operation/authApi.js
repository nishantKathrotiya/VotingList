import { toast } from "react-toastify";
// import { setLoading,setSignupData  } from "../../slices/auth";
import { apiConnector } from "../connector";
// import { setToken , setUser } from "../../slices/profile";
import { authEndPoins } from "../api";


export async function signUp(formData , setLoading){
 
    const toastId = toast.loading("Loading...")
    setLoading(true)
    try {
      const response = await apiConnector("POST", authEndPoins.SIGNUP_API, {formData})

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


// export  function login(email,password,navigate){
//   return async (dispatch) => {
//     const toastId = toast.loading("Loading...")
//     dispatch(setLoading(true))
//     try {
//       const response = await apiConnector("POST", 'http://localhost:4000/api/v1/auth/login', {email, password,})
//       console.log("LOGIN API RESPONSE............", response)

//       if(!response.data.success) {
//         throw new Error(response.data.message)
//       }
//       toast.success("Login Successful")
//       dispatch(setToken(response.data.token))
//       dispatch(setUser({ ...response.data.user}))
      
//       localStorage.setItem("token", JSON.stringify(response.data.token))
//       localStorage.setItem("user", JSON.stringify(response.data.user))
     
//     navigate('/dashboard')
//     }
//      catch (error) {
//       console.log("LOGIN API ERROR............", error)
//       toast.error(error.message)
//     }
//     dispatch(setLoading(false))
//     toast.dismiss(toastId)
//   }
// }

// export function logout(navigate) {
//   return (dispatch) => {
//     dispatch(setToken(null))
//     dispatch(setUser(null))
//     localStorage.removeItem("token")
//     localStorage.removeItem("user")
//     navigate("/dashboard")
//     toast.success("Logged Out")
//   }
// }