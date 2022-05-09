// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  const openid = wxContext.OPENID

  const {
    data
  } = await db.collection('user').where({
    _openid: openid
  }).get()

  if (data.length) return {
    openid
  }

  await db.collection('lab_user_list').add({
    data: {
      _openid: openid,
      create_time: Date.now(),
      signInDate: ''
    }
  })

  return {
    openid: wxContext.OPENID,
    unionid: wxContext.UNIONID
  }
}