import { db, sql } from "./db.js";
import Transaction from "../models/Transaction.js";

class TransactionDAO {
    /**
     * Create a new transaction record
     * @param {Transaction} transaction
     * @returns {Promise<Transaction>}
     */
    static async createTransaction(transaction) {
        const result = await db.request()
            .input("customerID", sql.Int, transaction.customerID)
            .input("type", sql.VarChar, transaction.type)
            .input("timestamp", sql.DateTime, transaction.timestamp)
            .input("points", sql.Int, transaction.points)
            .query(`
                INSERT INTO Transactions (customerID, type, timestamp, points)
                OUTPUT INSERTED.*
                VALUES (@customerID, @type, @timestamp, @points)
            `);

        return new Transaction(
            result.recordset[0].id,
            result.recordset[0].customerID,
            result.recordset[0].type,
            result.recordset[0].timestamp,
            result.recordset[0].points
        );
    }

    /**
     * Get a transaction by ID
     * @param {number} transactionID
     * @returns {Promise<Transaction | null>}
     */
    static async getTransactionByID(transactionID) {
        const result = await db.request()
            .input("transactionID", sql.Int, transactionID)
            .query("SELECT * FROM Transactions WHERE id = @transactionID");

        if (result.recordset.length === 0) return null;
        const row = result.recordset[0];
        return new Transaction(row.id, row.customerID, row.type, row.timestamp, row.points);
    }

    /**
     * Get all transactions for a customer
     * @param {number} customerID
     * @returns {Promise<Transaction[]>}
     */
    static async getTransactionsByCustomer(customerID) {
        const result = await db.request()
            .input("customerID", sql.Int, customerID)
            .query("SELECT * FROM Transactions WHERE customerID = @customerID ORDER BY timestamp DESC");

        return result.recordset.map(row => new Transaction(row.id, row.customerID, row.type, row.timestamp, row.points));
    }

    /**
     * Delete a transaction by ID
     * @param {number} transactionID
     * @returns {Promise<boolean>}
     */
    static async deleteTransaction(transactionID) {
        const result = await db.request()
            .input("transactionID", sql.Int, transactionID)
            .query("DELETE FROM Transactions WHERE id = @transactionID");

        return result.rowsAffected[0] > 0;
    }
}

export default TransactionDAO;
