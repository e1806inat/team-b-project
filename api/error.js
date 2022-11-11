var errorHandler = (err, req, res, next) => {
    console.log('エラーハンドリング')
    if (res.headersSent) return next(err)
    if (!err.statusCode) err = boom.boomify(err)
  
    if (err.isServer) {
      // boom通した500番台のエラーはisServerでtrueが返るので
      // 500番台のみsentryみたいなエラー監視saasに送信したりできる
    }
    return err.isBoom
      ? res.status(err.output.statusCode).json(err.output.payload)
      : res.status(err.statusCode).json(err)
  }
  

  //export default errorHandler
  
  module.exports = {
    errorHandler,
  };