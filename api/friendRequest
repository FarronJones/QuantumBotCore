//Const functions
const functions = require("firebase-functions");
//Const admin
const admin = require("firebase-admin");
//Const logger
const{logger}=functions;
//const db equals admin.firestore
const db = admin.firestore();

//Exports.friendRequest
exports.friendRequest=functions.https.onRequest(async (req,res)=> {
    const{senderId, receiverId} = req.body.data;
    //If senderId or receiver id is not recieved, message is sent to user
    if(!senderId||!receiverId) {
        return res.status(400).send('Sender ID and Receiver ID are required.');
    }
    //Get variables
    try {
        const requestRef = db.collection('friendRequests').doc();
        await requestRef.set({
            senderId,
            receiverId,
            status:'pending',
            timestamp: admin.firestore.FieldValue.serverTimestamp()
        });
        res.status(200).send('Friend request sent.');
//catch error
} catch(error) {
        console.error('Error sending friend request: ',error);
        res.status(500).send('Internal Server Error.');
}
});
