const mongoose = require("mongoose")


async function dropLegacyUserNameIndex() {
    const usersCollection = mongoose.connection.db.collection("users")
    const indexes = await usersCollection.indexes()
    const hasLegacyIndex = indexes.some((index) => index.name === "userName_1")

    if (hasLegacyIndex) {
        await usersCollection.dropIndex("userName_1")
        console.log("Dropped legacy users.userName_1 index")
    }
}

async function connectToDB() {

    try {
        await mongoose.connect(process.env.MONGO_URI)
        await dropLegacyUserNameIndex()

        console.log("Connected to Database")
    }
    catch (err) {
        console.log(err)
    }
}

module.exports = connectToDB
