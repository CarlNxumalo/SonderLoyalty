import { db, sql } from "./db.js";
import Customer from "../models/Customer.js";

class CustomerDAO {
    /**
     * Creates a new customer in the database.
     * @param {Customer} customer
     * @returns {Promise<number>} Returns the new customer ID.
     */
    static async createCustomer(customer) {
        const result = await db.request()
            .input("name", sql.NVarChar(50), customer.name)
            .input("surname", sql.NVarChar(50), customer.surname)
            .input("email", sql.NVarChar(50), customer.email)
            .input("password", sql.NVarChar(255), customer.password) // Store hashed password
            .input("phone", sql.Char(10), customer.phone)
            .input("carwashID", sql.Int, customer.carwashID)
            .input("totalPoints", sql.Int, customer.totalPoints)
            .query(`
                INSERT INTO Customers (name, surname, email, password, phone, carwashID, totalPoints)
                OUTPUT INSERTED.customerID
                VALUES (@name, @surname, @email, @password, @phone, @carwashID, @totalPoints)
            `);
        return result.recordset[0].customerID;
    }

    /**
     * Fetches a customer by their ID.
     * @param {number} customerID
     * @returns {Promise<Customer | null>}
     */
    static async getCustomerById(customerID) {
        const result = await db.request()
            .input("customerID", sql.Int, customerID)
            .query("SELECT * FROM Customers WHERE customerID = @customerID");

        if (result.recordset.length === 0) return null;

        const data = result.recordset[0];
        return new Customer(data.customerID, data.name, data.surname, data.email, data.password, data.phone, data.carwashID, data.totalPoints);
    }

    /**
     * Fetches a customer by their phone number.
     * @param {string} phone
     * @returns {Promise<Customer | null>}
     */
    static async getCustomerByPhone(phone) {
        const result = await db.request()
            .input("phone", sql.Char(10), phone)
            .query("SELECT * FROM Customers WHERE phone = @phone");

        if (result.recordset.length === 0) return null;

        const data = result.recordset[0];
        return new Customer(data.customerID, data.name, data.surname, data.email, data.password, data.phone, data.carwashID, data.totalPoints);
    }

    /**
     * Updates a customer's total points.
     * @param {number} customerID
     * @param {number} points
     * @returns {Promise<boolean>}
     */
    static async updateCustomerPoints(customerID, points) {
        const result = await db.request()
            .input("customerID", sql.Int, customerID)
            .input("points", sql.Int, points)
            .query("UPDATE Customers SET totalPoints = @points WHERE customerID = @customerID");

        return result.rowsAffected[0] > 0;
    }

    /**
     * Deletes a customer from the database.
     * @param {number} customerID
     * @returns {Promise<boolean>}
     */
    static async deleteCustomer(customerID) {
        const result = await db.request()
            .input("customerID", sql.Int, customerID)
            .query("DELETE FROM Customers WHERE customerID = @customerID");

        return result.rowsAffected[0] > 0;
    }
}

export default CustomerDAO;
