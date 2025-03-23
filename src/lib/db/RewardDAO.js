import { db, sql } from "./db.js";
import Reward from "../models/Reward.js";

class RewardDAO {
    /**
     * Create a new reward in the database.
     * @param {Reward} reward
     * @returns {Promise<number>} The ID of the newly created reward.
     */
    static async create(reward) {
        const result = await db
            .request()
            .input("carwashID", sql.Int, reward.carwashID)
            .input("pointsRequired", sql.Int, reward.pointsRequired)
            .input("title", sql.Text, reward.title)
            .input("description", sql.Text, reward.description)
            .query(`
                INSERT INTO Rewards (carwashID, pointsRequired, title, description)
                OUTPUT INSERTED.rewardID
                VALUES (@carwashID, @pointsRequired, @title, @description)
            `);
        return result.recordset[0].rewardID;
    }

    /**
     * Retrieve a reward by its ID.
     * @param {number} id
     * @returns {Promise<Reward | null>}
     */
    static async getById(id) {
        const result = await db
            .request()
            .input("id", sql.Int, id)
            .query("SELECT * FROM Rewards WHERE rewardID = @id");

        if (result.recordset.length === 0) {
            return null;
        }

        const row = result.recordset[0];
        return new Reward(row.rewardID, row.carwashID, row.pointsRequired, row.title, row.description);
    }

    /**
     * Retrieve all rewards.
     * @returns {Promise<Reward[]>}
     */
    static async getAll() {
        const result = await db.query("SELECT * FROM Rewards");

        return result.recordset.map(
            row => new Reward(row.rewardID, row.carwashID, row.pointsRequired, row.title, row.description)
        );
    }

    /**
     * Update a reward in the database.
     * @param {Reward} reward
     * @returns {Promise<boolean>} True if updated, false if not found.
     */
    static async update(reward) {
        const result = await db
            .request()
            .input("id", sql.Int, reward.id)
            .input("carwashID", sql.Int, reward.carwashID)
            .input("pointsRequired", sql.Int, reward.pointsRequired)
            .input("title", sql.Text, reward.title)
            .input("description", sql.Text, reward.description)
            .query(`
                UPDATE Rewards
                SET carwashID = @carwashID,
                    pointsRequired = @pointsRequired,
                    title = @title,
                    description = @description
                WHERE rewardID = @id
            `);

        return result.rowsAffected[0] > 0;
    }

    /**
     * Delete a reward by ID.
     * @param {number} id
     * @returns {Promise<boolean>} True if deleted, false if not found.
     */
    static async delete(id) {
        const result = await db
            .request()
            .input("id", sql.Int, id)
            .query("DELETE FROM Rewards WHERE rewardID = @id");

        return result.rowsAffected[0] > 0;
    }
}

export default RewardDAO;
