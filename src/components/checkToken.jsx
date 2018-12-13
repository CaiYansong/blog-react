import React from "react";

class nu extends React.Component {
	render() {
		return ""
	}
}


function check(component) {
	var token = "";
	var arr = document.cookie.split(';');
	for (var i = 0; i < arr.length; i++) {
		var key = arr[i].split("=")[0];
		var value = arr[i].split("=")[1];
		if (key === "token") {
			token = value;
		}
	}
	if (token) {
		return component;
	} else {
		return nu;
	}
}
// function delToken() {
// 	//获取当前时间
// 	var date = new Date();
// 	//将date设置为过去的时间
// 	date.setTime(date.getTime() - 10000);
// 	//cookie删除
// 	document.cookie = "token=''; expires=" + date.toGMTString() + ";path:/";
// }

export default check;