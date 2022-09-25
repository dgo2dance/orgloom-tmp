import {login, logout, getInfo} from '@/api/user';
import {getToken, setToken, removeToken} from '@/utils/auth';
import {resetRouter} from '@/router';
import {setSession,getSession} from '@/utils/session_stroage'; // get token from cookie

const state = {
    detailId:getSession("detailId")||"",
    nodeData:'',
};


const mutations = {
 
    setDetailId: (state, detailId)=> {
        setSession("detailId",detailId);
        state.detailId = detailId;
    },
    
    setNodeData:(state, nodeData)=> {
        state.nodeData = nodeData;
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

