class CustomerReward {
    /**
     * @param {number} id
     * @param {number} rewardID
     * @param {number} customerID
     * @param {Date} claimedAt
     * @param {boolean} used
     */
    constructor(id, rewardID, customerID, claimedAt, used) {
        this.setID(id);
        this.setRewardID(rewardID);
        this.setCustomerID(customerID);
        this.setClaimedAt(claimedAt);
        this.setUsed(used);
    }

    /**
     * @param {number} id
     */
    setID(id) {
        if (typeof id !== "number" || id <= 0) {
            throw new Error("CustomerReward ID must be a valid number.");
        }
        this.id = id;
    }

    /**
     * @param {number} rewardID
     */
    setRewardID(rewardID) {
        if (typeof rewardID !== "number" || rewardID <= 0) {
            throw new Error("Reward ID must be a valid number.");
        }
        this.rewardID = rewardID;
    }

    /**
     * @param {number} customerID
     */
    setCustomerID(customerID) {
        if (typeof customerID !== "number" || customerID <= 0) {
            throw new Error("Customer ID must be a valid number.");
        }
        this.customerID = customerID;
    }

    /**
     * @param {Date} claimedAt
     */
    setClaimedAt(claimedAt) {
        if (!(claimedAt instanceof Date)) {
            throw new Error("ClaimedAt must be a valid Date object.");
        }
        this.claimedAt = claimedAt;
    }

    /**
     * @param {boolean} used
     */
    setUsed(used) {
        if (typeof used !== "boolean") {
            throw new Error("Used must be a boolean.");
        }
        this.used = used;
    }

    toJSON() {
        return {
            id: this.id,
            rewardID: this.rewardID,
            customerID: this.customerID,
            claimedAt: this.claimedAt,
            used: this.used,
        };
    }
}

export default CustomerReward;
