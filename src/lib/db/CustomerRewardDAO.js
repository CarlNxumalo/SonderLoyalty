import { db, sql } from "./db.js";
import CustomerReward from "../models/CustomerReward.js";

class CustomerRewardDAO {
    /**
     * Get a CustomerReward by ID
     * @param {number} id
     * @returns {Promise<CustomerReward | null>}
     */
    static async getById(id) {
        const result = await db.request()
            .input("id", sql.Int, id)
            .query("SELECT * FROM CustomerRewards WHERE customerRewardsID = @id");

        if (result.recordset.length === 0) return null;

        const row = result.recordset[0];
        return new CustomerReward(row.customerRewardsID, row.rewardID, row.customerID, row.claimedAt, row.used);
    }

    /**
     * Create a new CustomerReward
     * @param {CustomerReward} customerReward
     * @returns {Promise<CustomerReward>}
     */
    static async create(customerReward) {
        const result = await db.request()
            .input("rewardID", sql.Int, customerReward.rewardID)
            .input("customerID", sql.Int, customerReward.customerID)
            .input("claimedAt", sql.DateTime, customerReward.claimedAt)
            .input("used", sql.Bit, customerReward.used)
            .query(`
                INSERT INTO CustomerRewards (rewardID, customerID, claimedAt, used)
                OUTPUT INSERTED.*
                VALUES (@rewardID, @customerID, @claimedAt, @used)
            `);

        const row = result.recordset[0];
        return new CustomerReward(row.customerRewardsID, row.rewardID, row.customerID, row.claimedAt, row.used);
    }

    /**
     * Update the 'used' status of a CustomerReward
     * @param {number} id
     * @param {boolean} used
     * @returns {Promise<boolean>}
     */
    static async updateUsedStatus(id, used) {
        const result = await db.request()
            .input("id", sql.Int, id)
            .input("used", sql.Bit, used)
            .query("UPDATE CustomerRewards SET used = @used WHERE customerRewardsID = @id");

        return result.rowsAffected[0] > 0;
    }

    /**
     * Delete a CustomerReward by ID
     * @param {number} id
     * @returns {Promise<boolean>}
     */
    static async delete(id) {
        const result = await db.request()
            .input("id", sql.Int, id)
            .query("DELETE FROM CustomerRewards WHERE customerRewardsID = @id");

        return result.rowsAffected[0] > 0;
    }
}

export default CustomerRewardDAO;
