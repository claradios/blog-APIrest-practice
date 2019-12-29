const ObjectId = require('mongodb').ObjectId;

module.exports = class OffensiveWords {
  constructor(conn) {
    this.conn = conn;
    this.collection = this.conn.db().collection('offensiveWods');
  }

  addOffensiveWord(offensiveWord) {   
    const newOffensiveWord = {
      word: offensiveWord.word,
      level: offensiveWord.level
    };
    await this.collection.insertOne(newOffensiveWord);
  }

  getAllOffensiveWords() {   
    return await this.collection.find({}).toArray();
  }

  getOffensiveWordById(id) { 
    return await this.collection.findOne({ _id: new ObjectId(id) }); 
  }

  deleteOffensiveWordById(id) { 
    return await this.collection.deleteOne({ _id: new ObjectId(id) });
  }

  modifyOffensiveWordById(id, newOffensiveWord) {
    return await this.collection.updateOne({ _id: new ObjectId(id) }, { $set: newOffensiveWord });
  }

}