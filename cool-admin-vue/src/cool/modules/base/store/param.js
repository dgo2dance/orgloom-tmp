import {setSession,getSession} from '../utils/session_stroage'; // get token from cookie

const state = {
    orgId:getSession("orgId")||"",
};


const mutations = {
 
    setOrgId: (state, detailId)=> {
        setSession("orgId",detailId);
        state.orgId = orgId;
    },
};

const actions = {

};

export default {
    namespaced: true,
    state,
    mutations,
    actions
};

