//Const functions
const functions = require("firebase-functions");
//Const admin
const admin = require("firebase-admin");
//Const logger functions
const{logger}=functions;

//Exports.addMessage
exports.addMessage = functions.https.onCall(async (data, context)=> {
    try {
        logger.log("Recieved message request data: ", data);


        //Validate required fields
        if(!data.text||!data.userId) {
            logger.log("Required fields (test or userId) are missing");
            throw new functions.https.HttpsError(
                "invalid-argument",
                "Required fields (text or userId) are missing"
            );
        }
    const{text,userId} = data;


    //Construct message data
    const messageData = {
        text,
        userId,
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
    };
    //Add message to the user's message subcollection in firestore
    const messageRef = await admin
    .firestore()
    .collection("chats")
    .doc(userId)
    .collection("messages")
    .add(messageData);


    logger.log("Messages added successfully, message ID:", messageRef.id);


    //Return success status and message ID
    return { status: "success", messageId: messageRef.id};
}catch (error) {
        logger.error("Error adding messages:",error);
        throw new functions.https.HttpsError(
            "unknown",
            "An error occcured while adding the message",
            error.message
        );
    }
});
