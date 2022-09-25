// import { WSController, OnWSConnection, Inject, OnWSMessage } from "@midwayjs/decorator";
// import { Context } from "@midwayjs/socketio";
/**
 * 测试
//  */
// @WSController("/")
// export class HelloController {
// 	@Inject()
// 	ctx: Context;

// 	// 客户端连接
// 	@OnWSConnection()
// 	async onConnectionMethod() {
// 		console.log("on client connect", this.ctx.id);
// 		console.log("参数", this.ctx.handshake.query);
// 		this.ctx.emit("data", "连接成功");
// 	}

// 	// 消息事件
// 	@OnWSMessage("myEvent")
// 	async gotMessage(data) {
// 		console.log("on data got", this.ctx.id, data);
// 	}
// }