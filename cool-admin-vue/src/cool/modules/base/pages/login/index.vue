<template>
	<div class="page-login">

  
                  <el-row :gutter="16" class='el-row'>
                      <el-col :span="8">
                        <div class="leftBac">
						<div class="logoContainer">
							<a href="#" target="_blank" rel="noopener noreferrer" class="LogoContainer"><img :src="Logo" alt="Logo" class="Logo"></a>
						</div>

						<div class="initial-side-bar-header" style="max-width: fit-content;">轻盈</div>
						
						<div class="initial-side-bar-subheader" style="max-width: fit-content;">快速的轻量化后台开发框架

						</div>



						</div>
                        </el-col>
					<el-col :span="16">

						<div class="box">
		<!--	<img class="logo" src="../../static/images/logo.png" alt="" /> -->
		 <!--	<p class="desc">{{ app.name }}是一款快速开发后台权限管理系统</p> -->

			<el-form 
			label-position="left" 
			label-width="60px"
			class="form" size="medium" :disabled="saving">
				<el-form-item label="用户名">
					<el-input
						v-model="form.username"
						placeholder="请输入用户名"
						maxlength="20"
						auto-complete="off"
					/>
				</el-form-item>

				<el-form-item label="密码">
					<el-input
						v-model="form.password"
						type="password"
						placeholder="请输入密码"
						maxlength="20"
						auto-complete="off"
					/>
				</el-form-item>

				<el-form-item label="验证码" class="captcha">
					<el-input
						v-model="form.verifyCode"
						placeholder="请输入图片验证码"
						maxlength="4"
						auto-complete="off"
						@keyup.enter="toLogin"
					/>

					<captcha
						:ref="setRefs('captcha')"
						v-model="form.captchaId"
						class="value"
						@change="
							() => {
								form.verifyCode = '';
							}
						"
					/>
				</el-form-item>
			</el-form>

			<el-button round size="middle" class="submit-btn" :loading="saving" @click="toLogin"
				>登录</el-button
			>
		</div>

					
					</el-col>
					
                      </el-row>

		
	</div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { ElMessage } from "element-plus";
import Captcha from "./components/captcha.vue";
import { useEps, useCool } from "/@/cool";
import Logo from "/@/assets/icon/logo/lightness.png";

export default defineComponent({
	cool: {
		route: {
			path: "/login"
		}
	},

	components: {
		Captcha
	},

	setup() {
		const { refs, setRefs, store, router, app }: any = useCool();

		const saving = ref<boolean>(false);

		// 登录表单数据
		const form = reactive({
			username: "",
			password: "",
			captchaId: "",
			verifyCode: ""
		});

		// 登录
		async function toLogin() {
			if (!form.username) {
				return ElMessage.warning("用户名不能为空");
			}

			if (!form.password) {
				return ElMessage.warning("密码不能为空");
			}

			if (!form.verifyCode) {
				return ElMessage.warning("图片验证码不能为空");
			}

			saving.value = true;

			try {
				// 登录
				await store.dispatch("userLogin", form);

				// 用户信息
				await store.dispatch("userInfo");

				// 读取Eps
				await useEps();

				// 权限菜单
				const [first] = await store.dispatch("permMenu");

				if (!first) {
					ElMessage.error("该账号没有权限");
				} else {
					router.push("/");
				}
			} catch (err: any) {
				ElMessage.error(err);
				refs.value.captcha.refresh();
			}

			saving.value = false;
		}

		return {
			refs,
			setRefs,
			form,
			saving,
			toLogin,
			app,
			Logo
		};
	}
});
</script>

<style lang="scss">



.page-login {
	height: 100%;
	width: 100%;
	background-color: #ffffff;

	.el-row{
    height:100%;
  }	
  	.initial-side-bar-header {
		font-family: Lato;
		font-size: 48px;
		font-weight: 700;
		color: #fff;
		padding-bottom: 15px;
		line-height: 55px;
		margin-top: 140px;
		padding-left:60px; 
		text-align: center
	}
	.initial-side-bar-subheader {
    font-family: Lato;
    font-size: 20px;
    font-style: italic;
    color: #fff;
	margin-top: 20px;
	padding-left:60px; 
	text-align: center

}

  .LogoContainer{
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;


}
	.Logo{
		margin-top: 60px;
		width: 20%;
    max-width: 150px;
    height: auto;
	}
	.leftBac{

	background: #3fa0ff;
	height: 100%;
}	
	.box {
		 display: flex;
		 flex-direction: column;
		 justify-content: center;
		 align-items: center;
		// height: 500px;
		// width: 500px;
		// position: absolute;
		// left: calc(50% - 250px);
		// top: calc(50% - 250px);
		   height: 100%;
		   text-align: center;
		   margin-top: -60px;

		.logo {
			height: 50px;
			margin-bottom: 20px;
		}

		.desc {
			color: rgb(7, 7, 7);
			font-size: 12px;
			margin-bottom: 60px;
			letter-spacing: 1px;
		}

		.el-form {
			width: 300px;
			border-radius: 3px;

			.el-form-item {
				margin-bottom: 30px;

				&__label {
					color: rgb(39, 39, 39);
				}
			}

			.el-input {
				.el-input__inner {
					border: 0.5px solid #aaa;
					// border-bottom: 0.5px solid #999;
					border-radius: 5px;
					padding: 0 5px;
					background-color: transparent;
					color: rgb(0, 0, 0);
					transition: border-color 0.3s;
					position: relative;

					&:focus {
						border-color: rgb(94, 93, 93);
						color: rgb(0, 0, 0);
					}

					&:-webkit-autofill {
						-webkit-text-fill-color: #fff !important;
						-webkit-box-shadow: 0 0 0px 1000px transparent inset !important;
						transition: background-color 50000s ease-in-out 0s;
					}
				}
			}

			.captcha {
				position: relative;

				.value {
					position: absolute;
					bottom: 1px;
					right: 1px;
					top:1px;
				}
			}
		}

		.submit-btn {
			margin-top: 10px;
			padding: 9px 40px;
			color: #000;
			width: 300px;
		}
	}
}
</style>
