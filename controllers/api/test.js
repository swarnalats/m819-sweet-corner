module.exports = (req,res,next) => {
    res.send({
        message:"This is a test message",
        currentTime: new Date().toLocaleString()
    });
}