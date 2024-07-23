require('dotenv').config()


const itblTrackEvent = (req, res) => {
    console.log(req.body)
    let logVar = "test log";
    console.log(`Let see if this print....${logVar}`);

    res.status(200).json({"success":true});
}
module.exports  = {
    itblTrackEvent
}