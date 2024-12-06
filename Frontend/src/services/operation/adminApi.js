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
       
        setData(response.data)
    }
    catch (error) {
        console.log("LOGIN API ERROR............", error)
        toast.error(error.message)
    }
    setLoading(false);
}

export async function getMemberVote(memberNo,setData,setLoading){

   
    setLoading(true)
    try {
        const response = await apiConnector("GET", adminEndPoints.GET_MEMBER_VOTE + `/${memberNo}`);
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
            pannel: response.data.data.pannel || '', 
            currentPollVote:response.data.data.currentPollVote || 'n'
        });
    }
    catch (error) {
        console.log("LOGIN API ERROR............", error)
        toast.error(error.message)
    }
    setLoading(false);
}

export async function sendVote(memberNo,vote,setLoading,setData){

    setLoading(true)
    try {
        const response = await apiConnector("POST", adminEndPoints.SEND_VOTE ,{memberNo,vote});
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
            pannel: response.data.data.pannel || '', 
            currentPollVote:response.data.data.currentPollVote || 'n'
        });
        toast.success('Vote Sent')
    }
    catch (error) {
        console.log("LOGIN API ERROR............", error)
        toast.error(error.message)
    }
    setLoading(false);
}

export async function unvoteMember(memberNo,setLoading,setData){

   
    setLoading(true)
    try {
        const response = await apiConnector("GET", adminEndPoints.UNVOTE + `/${memberNo}`);
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
            pannel: response.data.data.pannel || '', 
            currentPollVote:response.data.data.currentPollVote || 'n'
        });
        toast.success('Unvote successfull')
    }
    catch (error) {
        console.log("LOGIN API ERROR............", error)
        toast.error(error.message)
    }
    setLoading(false);
}

export async function startNewPoll(setData,setLoading){

   
    setLoading(true)
    try {
        const response = await apiConnector("GET", adminEndPoints.NEW_POLL);
        console.log("New Poll API RESPONSE............", response)

        if(!response.data.success) {
            throw new Error(response.data.message)
        }
        await getStats(setData,setLoading);
        toast.success('New Poll Started')
    }
    catch (error) {
        console.log("LOGIN API ERROR............", error)
        toast.error(error.message)
    }
    setLoading(false);
}