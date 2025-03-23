import { db, sql } from "./db.js"; // Adjust the path as necessary
import Carwash from "../models/Carwash.js";

class CarwashDAO {
    /**
     * @param {{ ownerID: any; name: any; phone: any; whatsappAPIKey: any; whatsappPhoneNumber: any; }} carwash
     */
    static async create(carwash) {
        const query = `INSERT INTO Carwashes (ownerID, name, phone, whatsappAPIKey, whatsappPhoneNumber) 
                       OUTPUT INSERTED.id VALUES (@ownerID, @name, @phone, @whatsappAPIKey, @whatsappPhoneNumber)`;
        const request = db.request()
            .input("ownerID", sql.Int, carwash.ownerID)
            .input("name", sql.NVarChar, carwash.name)
            .input("phone", sql.NVarChar, carwash.phone)
            .input("whatsappAPIKey", sql.NVarChar, carwash.whatsappAPIKey)
            .input("whatsappPhoneNumber", sql.NVarChar, carwash.whatsappPhoneNumber);
        
        const result = await request.query(query);
        return result.recordset[0].id;
    }

    /**
     * @param {any} id
     */
    static async getById(id) {
        const query = `SELECT * FROM Carwashes WHERE id = @id`;
        const request = db.request().input("id", sql.Int, id);
        const result = await request.query(query);
        if (result.recordset.length === 0) return null;
        return new Carwash(
            result.recordset[0].id,
            result.recordset[0].ownerID,
            result.recordset[0].name,
            result.recordset[0].phone,
            result.recordset[0].whatsappAPIKey,
            result.recordset[0].whatsappPhoneNumber
        );
    }

    static async getAll() {
        const query = `SELECT * FROM Carwashes`;
        const result = await db.request().query(query);
        return result.recordset.map(row => new Carwash(
            row.id, row.ownerID, row.name, row.phone, row.whatsappAPIKey, row.whatsappPhoneNumber
        ));
    }

    /**
     * @param {{ id: any; ownerID: any; name: any; phone: any; whatsappAPIKey: any; whatsappPhoneNumber: any; }} carwash
     */
    static async update(carwash) {
        const query = `UPDATE Carwashes SET ownerID = @ownerID, name = @name, phone = @phone, 
                       whatsappAPIKey = @whatsappAPIKey, whatsappPhoneNumber = @whatsappPhoneNumber 
                       WHERE id = @id`;
        const request = db.request()
            .input("id", sql.Int, carwash.id)
            .input("ownerID", sql.Int, carwash.ownerID)
            .input("name", sql.NVarChar, carwash.name)
            .input("phone", sql.NVarChar, carwash.phone)
            .input("whatsappAPIKey", sql.NVarChar, carwash.whatsappAPIKey)
            .input("whatsappPhoneNumber", sql.NVarChar, carwash.whatsappPhoneNumber);
        
        await request.query(query);
    }

    /**
     * @param {any} id
     */
    static async delete(id) {
        const query = `DELETE FROM Carwashes WHERE id = @id`;
        const request = db.request().input("id", sql.Int, id);
        await request.query(query);
    }
}

export default CarwashDAO;
