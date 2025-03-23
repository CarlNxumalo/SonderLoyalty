import { db, sql } from "./db.js";
import Owner from "../models/Owner.js";

class OwnerDAO {
    /**
     * Get an Owner by ID
     * @param {number} id
     * @returns {Promise<Owner | null>}
     */
    static async getById(id) {
        try {
            const result = await db.request()
                .input("id", sql.Int, id)
                .query("SELECT * FROM Owners WHERE ownerID = @id");

            if (result.recordset.length === 0) return null;

            const row = result.recordset[0];
            return new Owner(row.ownerID, row.name, row.surname, row.email, row.password, row.phone);
        } catch (error) {
            console.error("Error fetching Owner by ID:", error);
            throw error;
        }
    }

    /**
     * Get an Owner by Email
     * @param {string} email
     * @returns {Promise<Owner | null>}
     */
    static async getByEmail(email) {
        try {
            const result = await db.request()
                .input("email", sql.NVarChar, email)
                .query("SELECT * FROM Owners WHERE email = @email");

            if (result.recordset.length === 0) return null;

            const row = result.recordset[0];
            return new Owner(row.ownerID, row.name, row.surname, row.email, row.password, row.phone);
        } catch (error) {
            console.error("Error fetching Owner by email:", error);
            throw error;
        }
    }

    /**
     * Create a new Owner
     * @param {Owner} owner
     * @returns {Promise<Owner>}
     */
    static async create(owner) {
        try {
            const result = await db.request()
                .input("name", sql.NVarChar, owner.name)
                .input("surname", sql.NVarChar, owner.surname)
                .input("email", sql.NVarChar, owner.email)
                .input("password", sql.NVarChar, owner.password)
                .input("phone", sql.NVarChar, owner.phone)
                .query(`
                    INSERT INTO Owners (name, surname, email, password, phone)
                    OUTPUT INSERTED.*
                    VALUES (@name, @surname, @email, @password, @phone)
                `);

            const row = result.recordset[0];
            return new Owner(row.ownerID, row.name, row.surname, row.email, row.password, row.phone);
        } catch (error) {
            console.error("Error creating Owner:", error);
            throw error;
        }
    }

    /**
     * Update Owner details
     * @param {Owner} owner
     * @returns {Promise<boolean>}
     */
    static async update(owner) {
        try {
            const result = await db.request()
                .input("id", sql.Int, owner.id)
                .input("name", sql.NVarChar, owner.name)
                .input("surname", sql.NVarChar, owner.surname)
                .input("email", sql.NVarChar, owner.email)
                .input("password", sql.NVarChar, owner.password)
                .input("phone", sql.NVarChar, owner.phone)
                .query(`
                    UPDATE Owners 
                    SET name = @name, surname = @surname, email = @email, password = @password, phone = @phone
                    WHERE ownerID = @id
                `);

            return result.rowsAffected[0] > 0;
        } catch (error) {
            console.error("Error updating Owner:", error);
            throw error;
        }
    }

    /**
     * Delete an Owner by ID
     * @param {number} id
     * @returns {Promise<boolean>}
     */
    static async delete(id) {
        try {
            const result = await db.request()
                .input("id", sql.Int, id)
                .query("DELETE FROM Owners WHERE ownerID = @id");

            return result.rowsAffected[0] > 0;
        } catch (error) {
            console.error("Error deleting Owner:", error);
            throw error;
        }
    }
}

export default OwnerDAO;
