import * as mongoose from 'mongoose';

/**
 * Counters are used to create the ids of the entities.
 */
export class counters{
    /**
     * Get the next sequence number and increments the sequence number by one
     * @param sequenceName Name of the sequence that needs the number. For Example "offerId" for offers.
     * @returns The sequence number
     */
    public static async getNextSquenceValue(sequenceName : string): Promise<number>{
        const db = mongoose.connection.db;
        var returnValue = null;

        try{
            const collection = db.collection("counters");
            var test = await collection.findOneAndUpdate(
                {'id': sequenceName},
                {
                    $inc: {"sequence_value": 1}
                }
            );
            var sequenceDocument = await collection.findOne({
                'id':sequenceName
            });
            returnValue = sequenceDocument.sequence_value;
        }
        catch(err){
            console.log(err);
        }
        return returnValue;
    }
}