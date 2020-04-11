/* * * * * * * * * * * * * * * * * * *
 *
 *				DOM
 *
 * * * * * * * * * * * * * * * * * * */

const body = $('body');
const $alertList = [];




/* * * * * * * * * * * * * * * * * * *
 *
 *			Alert模态框
 *
 * * * * * * * * * * * * * * * * * * */

const $alert = (info, title) => {
	console.log('alert');
	//参数判断
	if (!info) {
		console.log('参数错误，"提示内容": [String,必需], "标题": [String,选用]');
		return;
	}
	//确保只有一例实例
	let instance = $('.marble_alert');
	if (instance.length) {
		//如果已有提示框，则后面提示框推入队列等待
		if (instance.css("display") === "block") {
			//推入队列
			$alertList[$alertList.length] = {
				info: info,
				title: title
			}
			return;
		}

		//判断是否有标题参数，有就添加或修改DOM的innerText值
		if (title) {
			let titleBox = instance.find('.marble_alert_title');
			if (titleBox.length) {
				titleBox.text(title)
			} else {
				titleBox = document.createElement('div');
				titleBox.className = 'marble_alert_title';
				titleBox.innerText = title;
				$(title).insertBefore(".marble_alert_info")
			}
		} else {
			//没有就删除标题DOM
			$('.marble_alert').remove('.marble_alert_title')
		}
		instance.find('.marble_alert_info').text(info)
		instance.fadeIn(150)
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
			//回调，判断队列是否为空
			if ($alertList.length) {
				let msg = $alertList.shift();
				$alert(msg.info, msg.title);
			}
		});
	}

	//绑定关闭窗口事件
	confirm.addEventListener('click', () => {
		close()
	})
	alertBox.appendChild(confirm);
	alertShadow.appendChild(alertBox);
	body.append(alertShadow);

	//初始化渐出
	$("div.marble_alert").fadeIn(150)
}

export default $alert;
