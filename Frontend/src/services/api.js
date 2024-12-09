// const BASE_URL = "http://localhost:4000"
const BASE_URL = "https://votinglist.onrender.com"

export const authEndPoins = {
    SIGNUP_API: BASE_URL + "/api/v1/auth/create",
    LOGIN_API: BASE_URL + "/api/v1/auth/login",
}

export const baseUserEndPoitns = {
  GET_List: BASE_URL + "/api/v1/baseuser/list",
  UPDATE_MEMBER : BASE_URL + "/api/v1/baseuser/edit",
}

export const adminEndPoints = {
  GET_STATS: BASE_URL + "/api/v1/admin/statistic",
  SEND_VOTE : BASE_URL + "/api/v1/admin/vote",
  GET_MEMBER_VOTE : BASE_URL + "/api/v1/admin/getmembervote",
  UNVOTE : BASE_URL + "/api/v1/admin/unvote",
  NEW_POLL : BASE_URL + "/api/v1/admin/newpoll",
   GET_C : BASE_URL + "/api/v1/admin/c"
}