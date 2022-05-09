// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const openid = wxContext.OPENID
  const res = await db.collection('lab_notice_list').doc(event._id).remove({})

  return {
    res,
    openid,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}