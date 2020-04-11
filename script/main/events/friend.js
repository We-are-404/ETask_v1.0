/* * * * * * * * * * * * * * * * * * *
 *
 *				DOM
 *
 * * * * * * * * * * * * * * * * * * */

const friend = $('.left_bottom_friend');

function getFriendListData() {
	return Promise((resolve, reject) => {
		axios.get('../../../static/userList.json').then(res) {
			resolve(res)
		}.catch(err) {
			reject(err)
		}
	})
}

const friendListPaint = async () => {
	try {
		let data = await getFriendListData();
	} catch (e) {
		console.log(e);
	}
}
