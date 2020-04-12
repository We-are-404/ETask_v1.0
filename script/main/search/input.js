/* * * * * * * * * * * * * * * * * * *
 *
 *				DOM
 *
 * * * * * * * * * * * * * * * * * * */

const input = $('.left_header_search_input');






/* * * * * * * * * * * * * * * * * * *
 *
 *		清除按钮Toggle绑定事件
 *
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
 *
 *		搜索图标样式绑定事件
 *
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
 *
 *			清除搜索框事件
 *
 * * * * * * * * * * * * * * * * * * */

function clearButtonEvent() {
	input.siblings('.icon-clear').click(() => {
		input.html('')
		input.siblings('.icon-clear').fadeOut(150)
		input.focus()
	})
}






/* * * * * * * * * * * * * * * * * * *
 *
 *			初始化
 *
 * * * * * * * * * * * * * * * * * * */

const inputInit = () => {
	clearButtonToggle();
	clearButtonEvent();
	searchIconToggle();
};



export default inputInit;
