import store from "store";
import { deepMerge, getBrowser } from "/@/cool/utils";
import { app } from "/@/config/env";
import { useEps } from "/@/cool";

const browser = getBrowser();

const state = {
	info: {
		...app
	},
	browser,
	collapse: browser.isMini ? true : false,
	loading: false,
	orgId:store.get("orgId")||'',
	orgName:store.get("orgName")||'',

};

const getters = {
	// 程序加载
	appLoading: (state: any) => state.loading,
	// 应用配置
	app: (state: any) => state.info,
	// 浏览器信息
	browser: (state: any) => state.browser,
	// 左侧菜单是否收起
	menuCollapse: (state: any) => state.collapse,
	// 组织ID
	orgId:(state:any) =>state.orgId,
	// 组织NAME
	orgName:(state:any) =>state.orgName,
};

const actions = {
	async appLoad({ getters, dispatch, commit }: any) {
		if (getters.token) {
			commit("SHOW_LOADING");

			// 读取Eps
			await useEps();

			// 读取菜单权限
			await dispatch("permMenu");

			// 获取用户信息
			dispatch("userInfo");

			commit("HIDE_LOADING");
		}
	},
	
    setOrgId({commit}:any, {org}:any) {
        return new Promise(resolve=> {
            commit('SET_ORG_ID', org);
        });
    }
};

const mutations = {
	SHOW_LOADING(state: any) {
		state.loading = true;
	},

	HIDE_LOADING(state: any) {
		state.loading = false;
	},

	// 设置浏览器信息
	SET_BROWSER(state: any) {
		state.browser = getBrowser();
	},

	// 收起左侧菜单
	COLLAPSE_MENU(state: any, val = false) {
		state.collapse = val;
	},

	// 更新应用配置
	UPDATE_APP(state: any, val: any) {
		deepMerge(state.info, val);
		store.set("__app__", state.info);
	},

	SET_ORG_ID: (state:any, org:any)=> {
		store.set("orgId",org.orgId);
		store.set("orgName",org.orgName);

        state.orgId = org.orgId;
		state.orgName = org.orgName;

    }
};

export default {
	state,
	getters,
	actions,
	mutations
};
