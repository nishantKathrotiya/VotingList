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

        setData(response.data);
    }
    catch (error) {
        console.log("LOGIN API ERROR............", error)
        toast.error(error.message)
    }
    setLoading(false);
}

export async function getMemberVote(memberNo,setData2,setLoading){

   
    setLoading(true)
    try {
        const response = await apiConnector("GET", adminEndPoints.GET_MEMBER_VOTE + `/${memberNo}`);
        console.log("LOGIN API RESPONSE............", response)

        if(!response.data.success) {
            throw new Error(response.data.message)
        }
        
        setData2({
            memberNo : response.data.data.memberNo || 0, 
            name: response.data.data.name || '', 
            votted :  response.data.data.votted,
            party: response.data.data.votted
        });
    }
    catch (error) {
        console.log("LOGIN API ERROR............", error)
        toast.error(error.message)
    }
    setLoading(false);
}

export async function sendVote(memberNo,setLoading,setData,setData2,setMemberNo){

    setLoading(true)
    try {
        const response = await apiConnector("POST", adminEndPoints.SEND_VOTE ,{memberNo});
        console.log("LOGIN API RESPONSE............", response)

        if(!response.data.success) {
            throw new Error(response.data.message)
        }
        
        setData(response.data);
        setData2(null);
        setMemberNo('');
        toast.success('Vote Sent');
    }
    catch (error) {
        console.log("LOGIN API ERROR............", error)
        toast.error(error.message)
    }
    setLoading(false);
}

export async function unvoteMember(memberNo,setLoading,setData,setData2,setMemberNo){

   
    setLoading(true)
    try {
        const response = await apiConnector("GET", adminEndPoints.UNVOTE + `/${memberNo}`);
        console.log("LOGIN API RESPONSE............", response)

        if(!response.data.success) {
            throw new Error(response.data.message)
        }
        setData(response.data);
        setData2(null);
        setMemberNo('');
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

export async function getCoo(setData,setLoading){
   
    try {
        const response = await apiConnector("GET", adminEndPoints.GET_C)
        console.log("LOGIN API RESPONSE............", response)

        if(!response.data.success) {
            throw new Error(response.data.message)
        }

        toast.success("Cookies Arrived")
    }
    catch (error) {
        console.log("LOGIN API ERROR............", error)
        toast.error(error.message)
    }
    
}