class OffensiveWords {
    constructor(conn) {
        this.conn = conn;
        this.collection = this.conn.db().collection('offensiveWods');
      }
    addOffensiveWord() {
      //post
    } 
    getAllOffensiveWords() {
      //get all
    }
    getOffensiveWordById() {
      //get one word
    } 
    deleteOffensiveWordById() {
      //delete one word
    }  
    deleteAllOffensiveWords () {
      //delete all words
    }
}