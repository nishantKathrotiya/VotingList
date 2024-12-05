import { toast } from "react-toastify";
import { apiConnector } from "../connector";
import { adminEndPoints, baseUserEndPoitns } from "../api";



export async function getStats(setData,setLoading){

   
    setLoading(true)
    try {
        const response = await apiConnector("GET", adminEndPoints.GET_STATS)
        console.log("LOGIN API RESPONSE............", response)

        if(!response.data.success) {
            throw new Error(response.data.message)
        }
        console.log(response.data)
        setData(response.data)
    }
    catch (error) {
        console.log("LOGIN API ERROR............", error)
        toast.error(error.message)
    }
    setLoading(false);
}