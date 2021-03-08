"use strict";

const { Op, Model, DataTypes } = require("sequelize");

module.exports = {
    /**
     *
     * @param { typeof Model } model
     * @param { Object } query
     */
    validateQueryFields: function (model, query) {
        let where = {};
        if (query.where) query = query.where;
        for (const field in query) {
            if (model.rawAttributes[field]) {
                let isJson = this.isJson(query[field]);
                if (!isJson) {
                    if (model.rawAttributes[field].type.key === DataTypes.STRING.key) {
                        where[field] = { [Op.like]: `%${query[field].toLowerCase()}%` };
                    } else {
                        if (query[field] === "true") where[field] = true;
                        else if (query[field === "false"]) where[field] = false;
                        else where[field] = query[field];
                    }
                } else {
                    let obj = JSON.parse(query[field]);
                    if (Array.isArray(obj)) {
                        let array = [];
                        for (let param of obj) {
                            array.push({ [Op[param.op]]: param.value });
                        }
                        where[field] = { [Op.and]: array };
                    } else {
                        where[field] = { [Op[obj.op]]: obj.value };
                    }
                }
            }
        }
        return where;
    },
    isJson: function (str) {
        if (typeof str !== "string") return false;
        try {
            const result = JSON.parse(str);
            const type = Object.prototype.toString.call(result);
            return type === "[object Object]" || type === "[object Array]";
        } catch (err) {
            return false;
        }
    },
};
