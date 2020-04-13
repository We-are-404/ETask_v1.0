/* * * * * * * * * * * * * * * * * * *
 *		Produced By Hokori
 * * * * * * * * * * * * * * * * * * */

const left = () => {
	searchInit();
	toTask()
}


//当前页面位置
//0:Friend, 1:Task, 2:Personal
let location = 1;




/* * * * * * * * * * * * * * * * * * *
 *
 *			Search
 *
 * * * * * * * * * * * * * * * * * * */

/* * * * * * * * * * * * * * * * * * *
 *				初始化				
 * * * * * * * * * * * * * * * * * * */
let searchInit;
(() => {
	searchInit = function() {
		clearButtonToggle();
		clearButtonEvent();
		searchIconToggle();
	}
	/* * * * * * * * * * * * * * * * * * *
	 *				DOM				
	 * * * * * * * * * * * * * * * * * * */
	const input = $('.left_header_search_input');
	//初始化自定义PlaceHolder
	input.html('')



	/* * * * * * * * * * * * * * * * * * *
	 *		清除按钮Toggle绑定事件				
	 * * * * * * * * * * * * * * * * * * */

	function clearButtonToggle() {
		//防抖计时器
		let timer = null;
		let clearButton = input.siblings('.icon-clear');
		input.keyup((e) => {
			if (timer !== null) {
				clearTimeout(timer)
			}
			timer = setTimeout(() => {
				if (e.target.innerText) {
					clearButton.fadeIn(120)
				} else {
					clearButton.fadeOut(150)
				}
			}, 300)
		})
	};



	/* * * * * * * * * * * * * * * * * * *
	 *		搜索图标样式绑定事件
	 * * * * * * * * * * * * * * * * * * */

	function searchIconToggle() {
		let search = input.parent();
		input.focus(() => {
			search.addClass('left_header_search-active')
		})
		input.blur(() => {
			search.removeClass('left_header_search-active')
		})
	}



	/* * * * * * * * * * * * * * * * * * *
	 *			清除搜索框事件
	 * * * * * * * * * * * * * * * * * * */

	function clearButtonEvent() {
		input.siblings('.icon-clear').click(() => {
			input.html('')
			input.siblings('.icon-clear').fadeOut(150)
			input.focus()
		})
	}
})();




/* * * * * * * * * * * * * * * * * * *
 *
 *			Friend
 *
 * * * * * * * * * * * * * * * * * * */
(() => {
	/* * * * * * * * * * * * * * * * * * *
	 *				DOM
	 * * * * * * * * * * * * * * * * * * */

	const friendDOM = $('.left_bottom_friend');
	const left_main = $('.left_main');


	/* * * * * * * * * * * * * * * * * * *
	 *				事件绑定
	 * * * * * * * * * * * * * * * * * * */
	friendDOM.click(() => {
		toFriend()
	})



	/* * * * * * * * * * * * * * * * * * *
	 *				菜单跳转
	 * * * * * * * * * * * * * * * * * * */
	function toFriend () {
		console.log('toFriend');
		location = 0;
		$('.left_bottom>div').removeClass('left_bottom-active')
		friendDOM.addClass('left_bottom-active');
		friendListPaint();
	}



	/* * * * * * * * * * * * * * * * * * *
	 *				获取数据
	 * * * * * * * * * * * * * * * * * * */

	function getFriendListData() {
		return new Promise((resolve, reject) => {
			axios.get('/friendList.json').then((res) => {
				resolve(res.data)
			}).catch((err) => {
				reject(err)
			})
		})
	}



	/* * * * * * * * * * * * * * * * * * *
	 *				渲染数据
	 * * * * * * * * * * * * * * * * * * */

	async function friendListPaint() {
		try {
			let res = await getFriendListData();
			let html = '';
			for (let i = 0; i < res.data.length; i++) {
				html +=
					`
					<div class='left_main_friend'>
						<div class='left_main_friend_user'>
							<img class='left_main_friend_user_avatar' src="${res.data[i].avatar}"/>
							<div class='left_main_friend_user_name'>${res.data[i].name}</div>
						</div>
						<div class='left_main_friend_time'>${res.data[i].time}</div>
					</div>
				`
			}
			left_main.html(html)
		} catch (e) {
			console.log(e);
		}
	}
})();




/* * * * * * * * * * * * * * * * * * *
 *
 *			Task
 *
 * * * * * * * * * * * * * * * * * * */

/* * * * * * * * * * * * * * * * * * *
 *				初始化				
 * * * * * * * * * * * * * * * * * * */
let toTask;
(() => {
	/* * * * * * * * * * * * * * * * * * *
	 *				DOM
	 * * * * * * * * * * * * * * * * * * */

	const taskDOM = $('.left_bottom_task');
	const left_main = $('.left_main');


	/* * * * * * * * * * * * * * * * * * *
	 *				事件绑定
	 * * * * * * * * * * * * * * * * * * */
	taskDOM.click(() => {
		toTask()
	})



	/* * * * * * * * * * * * * * * * * * *
	 *				菜单跳转
	 * * * * * * * * * * * * * * * * * * */
	toTask = function() {
		console.log('toTask');
		location = 1;
		$('.left_bottom>div').removeClass('left_bottom-active')
		taskDOM.addClass('left_bottom-active');
		taskListPaint();
	}



	/* * * * * * * * * * * * * * * * * * *
	 *				获取数据
	 * * * * * * * * * * * * * * * * * * */

	function getTaskListData() {
		return new Promise((resolve, reject) => {
			axios.get('/friendList.json').then((res) => {
				resolve(res.data)
			}).catch((err) => {
				reject(err)
			})
		})
	}



	/* * * * * * * * * * * * * * * * * * *
	 *				渲染数据
	 * * * * * * * * * * * * * * * * * * */

	async function taskListPaint() {
		try {
			let res = await getTaskListData();
			let html = '';
			for (let i = 0; i < res.data.length; i++) {
				html +=
					`
					<div class='left_main_friend'>
						<div class='left_main_friend_user'>
							<img class='left_main_friend_user_avatar' src="${res.data[i].avatar}"/>
							<div class='left_main_friend_user_name'>${res.data[i].name}</div>
						</div>
						<div class='left_main_friend_time'>${res.data[i].time}</div>
					</div>
				`
			}
			left_main.html(html)
		} catch (e) {
			console.log(e);
		}
	}
})();




/* * * * * * * * * * * * * * * * * * *
 *
 *			Personal
 *
 * * * * * * * * * * * * * * * * * * */
(() => {
	/* * * * * * * * * * * * * * * * * * *
	 *				DOM
	 * * * * * * * * * * * * * * * * * * */

	const personalDOM = $('.left_bottom_personal');
	const left_main = $('.left_main');


	/* * * * * * * * * * * * * * * * * * *
	 *				事件绑定
	 * * * * * * * * * * * * * * * * * * */
	personalDOM.click(() => {
		toPersonal()
	})



	/* * * * * * * * * * * * * * * * * * *
	 *				菜单跳转
	 * * * * * * * * * * * * * * * * * * */
	function toPersonal() {
		console.log('toPersonal');
		location = 2;
		$('.left_bottom>div').removeClass('left_bottom-active')
		personalDOM.addClass('left_bottom-active');
		personalListPaint();
	}



	/* * * * * * * * * * * * * * * * * * *
	 *				获取数据
	 * * * * * * * * * * * * * * * * * * */

	function getPersonalListData() {
		return new Promise((resolve, reject) => {
			axios.get('/friendList.json').then((res) => {
				resolve(res.data)
			}).catch((err) => {
				reject(err)
			})
		})
	}



	/* * * * * * * * * * * * * * * * * * *
	 *				渲染数据
	 * * * * * * * * * * * * * * * * * * */

	async function personalListPaint() {
		try {
			let res = await getPersonalListData();
			let html = '';
			for (let i = 0; i < res.data.length; i++) {
				html +=
					`
					<div class='left_main_friend'>
						<div class='left_main_friend_user'>
							<img class='left_main_friend_user_avatar' src="${res.data[i].avatar}"/>
							<div class='left_main_friend_user_name'>${res.data[i].name}</div>
						</div>
						<div class='left_main_friend_time'>${res.data[i].time}</div>
					</div>
				`
			}
			left_main.html(html)
		} catch (e) {
			console.log(e);
		}
	}
})();

export default left
