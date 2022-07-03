const mongoose = require("mongoose")

const isValid = function (value) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true;
}


const isValidRequestBody = function (requestBody) {
    return Object.keys(requestBody).length > 0
}


function isValidtitle(title) {
    return ["Mr", "Mrs", "Miss"].indexOf(title) !== -1
}

const validatePhone = function (phone) {
    var re = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$/;
    if (typeof (phone) == 'string') {
        return re.test(phone.trim())
    } else {
        return re.test(phone)
    }
};

function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const validatePassword = function (password) {
    var re = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,15}$/;
    return re.test(password.trim())
};

const validateISBN = function (ISBN) { 
    
    var re = /^(?:ISBN(?:-13)?:?\ )?(?=[0-9]{13}$|(?=(?:[0-9]+[-\ ]){4})[-\ 0-9]{17}$)97[89][-\ ]?[0-9]{1,5}[-\ ]?[0-9]+[-\ ]?[0-9]+[-\ ]?[0-9]$/;   
    return re.test(ISBN.trim())
};


const isValidObjectId = function (Id) { return mongoose.Types.ObjectId.isValid(Id) } 

const isValidRating = function (rating) {
    var re = /^[1-5](\[1-5][1-5]?)?$/;
    if (typeof (rating) == 'string') {
        return re.test(rating.trim())
    } else {
        return re.test(rating)
    }
};

module.exports = { isValid,isValidRequestBody, isValidtitle, validatePhone,isValidEmail, 
    validatePassword,validateISBN,isValidObjectId,isValidRating }