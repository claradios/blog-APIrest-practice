const ObjectId = require('mongodb').ObjectId;
const defaultWords = require('../defOffensiveWords');
module.exports = class OffensiveWords {
  constructor(conn) {
    this.conn = conn;
    this.collection = this.conn.db().collection('offensiveWords');
  }

  addOffensiveWord(offensiveWord) {
    const newOffensiveWord = {
      word: offensiveWord.word,
      level: offensiveWord.level
    };
    this.collection.insertOne(newOffensiveWord);
  }

  getAllOffensiveWords() {
    return this.collection.find({}).toArray();
  }

  getOffensiveWordById(id) {
    return this.collection.findOne({ _id: new ObjectId(id) });
  }

  deleteOffensiveWordById(id) {
    return this.collection.deleteOne({ _id: new ObjectId(id) });
  }

  modifyOffensiveWordById(id, offensiveWordReq) {
    const newOffensiveWord = {
      word: offensiveWordReq.word,
      level: offensiveWordReq.level
    };
    return this.collection.updateOne({ _id: new ObjectId(id) }, { $set: newOffensiveWord });
  }

  insertDefaultWords(array) {
    array.forEach(async (item) => {
      const { word, level } = item;
      if (typeof word != 'string' || typeof level != 'number') {
        console.log('there is a problem with the defaul offensive word array');
      } else {
        this.collection.insertOne(item);        
      }
    });
  }

}