var validator = require('validator');

function validateStudent(data) {
    var Data = {}
    Data.errors = []
    var departments = ["INFORMATION TECHNOLOGY", "COMPUTER SCIENCE", "ELECTRONICS AND COMMUNICATION", "ELECTRICAL AND ELECTRONICS"]
    Data.validData = true;
    // validating the first name
    if (data.firstName != undefined) {
        data.firstName = validator
            .trim(data.firstName)
            .toUpperCase()
        if (data.firstName.length > 0 && validator.isAlpha(data.firstName)) {
            Data.firstName = data.firstName
        } else {
            Data.validData = false;
            Data
                .errors
                .push("Invalid First Name")
        }
    }
    // validating the last name
    if (data.lastName != undefined) {
        data.lastName = validator
            .trim(data.lastName)
            .toUpperCase()
        if (data.lastName.length > 0 && validator.isAlpha(data.lastName)) {
            Data.lastName = data.lastName
        } else {
            Data.validData = false;
            Data
                .errors
                .push("Invalid Last Name")
        }
    }
    // validating the department
    if (data.department != undefined) {
        data.department = validator
            .trim(data.department)
            .toUpperCase()
        console.log(data.department);
        console.log(departments.indexOf(data.department));
        if (data.department.length > 0 && departments.indexOf(data.department) != -1) {
            Data.department = data.department
        } else {
            Data.validData = false;
            Data
                .errors
                .push("Invalid Department Name")
        }
    }
    // validating enrollment number
    if (data.enrollmentNo != undefined) {
        data.enrollmentNo = validator.trim(data.enrollmentNo)
        if (data.enrollmentNo.length == 11 && validator.isNumeric(data.enrollmentNo)) {
            Data.enrollmentNo = data.enrollmentNo;
        } else {
            Data.validData = false;
            Data
                .errors
                .push("Invalid Enrollment No.")
        }
    }
    // validating cgpa
    if (data.cgpa != undefined) {
        if (data.cgpa >= 0.0 && data.cgpa <= 10.0) {
            Data.cgpa = validator.toFloat(data.cgpa);
        } else {
            Data.validData = false;
            Data
                .errors
                .push("Invalid CGPA");
        }
    }
    // validating Mobile Number
    if (data.mobileNo != undefined) {
        data.mobileNo = validator.trim(data.mobileNo);
        if (data.mobileNo.length == 10 && validator.isNumeric(data.mobileNo)) {
            Data.mobileNo = data.mobileNo;
        } else {
            Data.validData = false;
            Data
                .errors
                .push("Invalid Mobile Number")
        }
    }
    // validating the address
    if (data.permanentAddress != undefined) {
        data.permanentAddress = validator.trim(data.permanentAddress);
        if (data.permanentAddress.length > 0) {
            Data.permanentAddress = data.permanentAddress;
        } else {
            Data.validData = false;
            Data
                .errors
                .push("Invalid Address")
        }
    }
    // validation of user email
    if (data.email != undefined) {
        data.email = validator.trim(data.email);
        if (data.email.length > 0 && validator.isEmail(data.email)) {
            Data.email = data.email;
        } else {
            Data.Data.validData = false;
            Data
                .errors
                .push("Invalid E-Mail");
        }
    }
    // console.log(data.password);
    return Data;
}

function validateCompany(data) {
    var Data = {}
    Data.errors = []
    Data.validData = true;
    // validating the company name
    if (data.name != undefined) {
        data.name = validator
            .trim(data.name)
            .toUpperCase()
        if (data.name.length > 0) {
            Data.name = data.name
        } else {
            Data.validData = false;
            Data
                .errors
                .push("Invalid CompanyName")
        }
    }
    // validating the jobDesignation
    if (data.jobDesignation != undefined) {
        data.jobDesignation = validator
            .trim(data.jobDesignation)
            .toUpperCase()
        if (data.jobDesignation.length > 0) {
            Data.jobDesignation = data.jobDesignation
        } else {
            Data.validData = false;
            Data
                .errors
                .push("Invalid Job Designation")
        }
    }
    // validating cgpa
    if (data.cutoff != undefined) {
        if (data.cutoff >= 0.0 && data.cutoff <= 10.0) {
            Data.cutoff = validator.toFloat(data.cutoff);
        } else {
            Data.validData = false;
            Data
                .errors
                .push("Invalid Cutoff");
        }
    }
    // validating contact
    if (data.contact != undefined) {
        data.contact = validator.trim(data.contact);
        if ((data.contact.length == 8 || data.contact.length == 10) && validator.isNumeric(data.contact)) {
            Data.contact = data.contact;
        } else {
            Data.validData = false;
            Data
                .errors
                .push("Invalid contact Number")
        }
    }
    // validating the address
    if (data.permanentAddress != undefined) {
        data.permanentAddress = validator.trim(data.permanentAddress);
        if (data.permanentAddress.length > 0) {
            Data.permanentAddress = data.permanentAddress;
        } else {
            Data.validData = false;
            Data
                .errors
                .push("Invalid Address")
        }
    }
    // validation of company's email
    if (data.email != undefined) {
        data.email = validator.trim(data.email);
        if (data.email.length > 0 && validator.isEmail(data.email)) {
            Data.email = data.email;
        } else {
            Data.Data.validData = false;
            Data
                .errors
                .push("Invalid E-Mail");
        }
    }
    return Data;
}

module.exports = {
    validateStudent,
    validateCompany
};