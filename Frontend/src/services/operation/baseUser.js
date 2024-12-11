import { toast } from "react-toastify";
import { apiConnector } from "../connector";
import { baseUserEndPoitns } from "../api";
import Cookies from 'js-cookie'


export async function getBaseUserList(setData,setLoading){

   
    setLoading(true)
    try {
        const response = await apiConnector("GET", baseUserEndPoitns.GET_List,Cookies.get('token'))
        console.log("LOGIN API RESPONSE............", response)

        if(!response.data.success) {
            throw new Error(response.data.message)
        }
        setData(response.data.data)
    }
    catch (error) {
        console.log("LOGIN API ERROR............", error)
        toast.error(error.message)
    }
    setLoading(false);
}

export async function getBaseUserListByMemberNo(memberNo,setData,setLoading){

  
    setLoading(true)
    try {
        const response = await apiConnector("GET", baseUserEndPoitns.GET_List+`/${memberNo}`,Cookies.get('token'))
        console.log("LOGIN API RESPONSE............", response)

        if(!response.data.success) {
            throw new Error(response.data.message)
        }
        setData({
            name: response.data.data.name || '', 
            address: response.data.data.address || '',  
            feeRecipt: response.data.data.feeRecipt || 0, 
            mobileNo: response.data.data.mobileNo || '0000000000', 
            ref: response.data.data.ref || '',  
            party: response.data.data.party || '', 
          });
    }
    catch (error) {
        console.log("LOGIN API ERROR............", error)
        toast.error(error.message)
    }
    setLoading(false);
    

}

export async function baseUserUpdate(memberNo,data,setData,setLoading){

    const toastId = toast.loading("Loading...")
    setLoading(true)
    try {
        const response = await apiConnector("POST", baseUserEndPoitns.UPDATE_MEMBER+`/${memberNo}` ,Cookies.get('token'), {memberNo,data})
        console.log("LOGIN API RESPONSE............", response)

        if(!response.data.success) {
            throw new Error(response.data.message)
        }
        setData({
            name: response.data.data.name || '', 
            address: response.data.data.address || '',  
            feeRecipt: response.data.data.feeRecipt || 0, 
            mobileNo: response.data.data.mobileNo || '0000000000', 
            ref: response.data.data.ref || '',  
            party: response.data.data.party || '', 
          });
          toast.success("Updated")
    }
    catch (error) {
        console.log("LOGIN API ERROR............", error)
        toast.error(error.message)
    }
    setLoading(false);
    toast.dismiss(toastId)
    

}