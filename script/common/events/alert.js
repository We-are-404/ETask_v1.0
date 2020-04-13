/* * * * * * * * * * * * * * * * * * *
 *		Produced By Hokori
 * * * * * * * * * * * * * * * * * * */

/* * * * * * * * * * * * * * * * * * *
 *
 *			DOM和数据
 *
 * * * * * * * * * * * * * * * * * * */

const body = $('body');
const $alertList = [];




/* * * * * * * * * * * * * * * * * * *
 *
 *			Alert模态框
 *
 * * * * * * * * * * * * * * * * * * */

// option = {
//	overlay:boolean	默认: true	打开对话框时是否显示遮罩。
// 	modal:boolean 默认: true		是否模态化对话框。为 false 时点击对话框外面的区域时关闭对话框，否则不关闭。
// }

const $alert = (info, title, option) => {
	option = Object.assign({
		overlay: true,
		modal: true
	}, option)
	//参数判断
	if (!info) {
		console.log('参数错误，"提示内容": [String,必需], "标题": [String,选用]');
		return;
	}
	//确保同时只有一个实例
	let instance = $('.marble_alert');
	if (instance.length) {
		//推入队列
		$alertList[$alertList.length] = {
			info: info,
			title: title
		}
		return;
	}

	let alertShadow = document.createElement('div');
	alertShadow.className = 'marble_alert';

	let alertBox = document.createElement('div');
	alertBox.className = 'marble_alert_box';



	/* * * * * * *生成模态框* * * * * * */

	//提示标题
	if (title) {
		let titleBox = document.createElement('div');
		titleBox.className = 'marble_alert_title';
		titleBox.innerText = title;
		alertBox.appendChild(titleBox)
	}

	//提示内容
	let infoBox = document.createElement('div');
	infoBox.className = 'marble_alert_info';
	infoBox.innerText = info;
	alertBox.appendChild(infoBox);

	//确定按钮
	let confirm = document.createElement('div');
	confirm.className = 'marble_alert_confirm';
	confirm.innerText = '确定';

	//关闭窗口事件
	function close() {
		$("div.marble_alert").fadeOut(150, () => {
			//销毁DOM
			$("div.marble_alert").remove();
			//判断队列是否为空
			if ($alertList.length) {
				let msg = $alertList.shift();
				$alert(msg.info, msg.title);
			}
		});
	}


	//打开对话框时是否显示遮罩。
	if (option.overlay) {
		alertShadow.style.backgroundColor = "rgba(0, 0, 0, .2)"
	}

	//绑定关闭窗口事件
	confirm.addEventListener('click', (e) => {
		close();
		e.stopPropagation();
	})
	//是否模态化对话框
	if (option.modal) {
		alertBox.addEventListener('click', (e) => {
			e.stopPropagation()
		})
		alertShadow.addEventListener('click', (e) => {
			close();
			e.stopPropagation();
		})
	}


	alertBox.appendChild(confirm);
	alertShadow.appendChild(alertBox);
	body.append(alertShadow);

	//初始化渐出
	$("div.marble_alert").fadeIn(150)
}

export default $alert;
