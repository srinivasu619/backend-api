var router = require('express').Router;
var Company = require('../models/Company');
var Student = require('../models/Student');
var mongoose = require('mongoose')
var logger = require('../winston_config');
var validateStudent = require('../utils/utils').validateStudent;
var validateCompany = require('../utils/utils').validateCompany;
var route = router();

route.get('/students', function (req, res) {
    Student
        .find({}, function (err, students) {
            if (err) {
                logger.error("Internal Server Error" + " : " + err.name + " : " + err.message);
                return res.status(500).send("Internal Server Error" + " : " + err.name + " : " + err.message);
            } else {
                logger.info("Students Details Sent");
                return res
                    .status(200)
                    .send(students);
            }
        })
})
route.get('/companies', function (req, res) {
    Company
        .find({}, function (err, companies) {
            if (err) {
                logger.error("Internal Server Error" + " : " + err.name + " : " + err.message);
                return res.status(500).send("Internal Server Error" + " : " + err.name + " : " + err.message);
            } else {
                logger.info("Companies Details Sent");
                return res
                    .status(200)
                    .send(companies);
            }
        })
})
// adding student to the portal
route.post('/student/new', function (req, res) {
    // console.log("+++++++++++++++++++\n"+req.body);
    var result = validateStudent(req.body);
    if (!result.validData) {
        logger.error('User pass Invalid Data');
        return res
            .status(406)
            .send(result.errors);
    }
    if (result.enrollmentNo != undefined && result.firstName != undefined) {

        Student
            .find({
                enrollmentNo: result.enrollmentNo
            }, function (err, students) {
                if (err) {
                    logger.error("Internal Server Error" + " : " + err.name + " : " + err.message);
                    return res.status(500).send("Internal Server Error" + " : " + err.name + " : " + err.message);
                }
                if (students.length != 0) {
                    logger.error("Student Already Registered to the portal");
                    return res
                        .status(406)
                        .send({"message":"Student Already Registered to the portal"});
                } else {
                    var student = new Student();
                    student.firstName = result.firstName;
                    student.lastName = result.lastName;
                    student.department = result.department;
                    student.enrollmentNo = result.enrollmentNo;
                    student.contact = result.contact;
                    student.cgpa = result.cgpa;
                    student.permanentAddress = result.permanentAddress;
                    student.email = result.email;
                    student.save(function (err) {
                        if (err) {
                            logger.error("Internal Server Error" + " : " + err.name + " : " + err.message);
                            return res.status(500).send("Internal Server Error" + " : " + err.name + " : " + err.message);
                        } else {
                            logger.info("New Student Registered");
                            return res
                                .status(200)
                                .send({"message":"Successfully Registered"});
                        }
                    })
                }
            })
    } else {
        logger.error("Enrollment No and FirstName is required");
        return res.status(406).send("Enrollment No and FirstName is required");
    }
});

// editing the student details
route.put('/student/edit/:id', function (req, res) {
    var result = validateStudent(req.body);
    if (!result.validData) {
        logger.error('User pass Invalid Data');
        return res
            .status(406)
            .send(result.errors);
    }
    Student
        .findByIdAndUpdate(req.params.id, result, {
            new: true
        }, function (err, student) {
            if (err) {
                logger.error("Internal Server Error" + " : " + err.name + " : " + err.message);
                return res.status(500).send("Internal Server Error" + " : " + err.name + " : " + err.message);
            } else {
                logger.info("Details Successfully Edited");
                return res
                    .status(200)
                    .send(student);
            }
        })
})

// removing a student from portal
route.delete('/student/remove/:id', function (req, res) {
    Student.findByIdAndRemove(req.params.id, (err, student) => {
        if (err) {
            logger.error("Internal Server Error" + " : " + err.name + " : " + err.message);
            return res.status(500).send("Internal Server Error" + " : " + err.name + " : " + err.message);
        }
        const response = {
            message: "Student successfully deleted",
            id: student._id
        };
        logger.info("Student Successfully Deleted");
        return res
            .status(200)
            .send(response);
    });
});
// registering company to the portal
route.post('/company/register', function (req, res) {
    var result = validateCompany(req.body);
    console.log(result);
    if (!result.validData) {
        return res
            .status(406)
            .send(result.errors);
    }
    if (result.name != undefined) {
        Company.find({
            name: result.name
        }, function (err, companies) {
            if (err) {
                logger.error("Internal Server Error" + " : " + err.name + " : " + err.message);
                return res.status(500).send("Internal Server Error" + " : " + err.name + " : " + err.message);
            }
            if (companies.length != 0) {
                logger.error("Company was already Registered");
                return res.status(406).send("Company is already Registered");
            }
            var company = new Company();
            company.name = result.name;
            company.jobDesignation = result.jobDesignation;
            company.cutoff = result.cutoff;
            company.contact = result.contact;
            company.permanentAddress = result.permanentAddress;
            company.email = result.email;
            company.save(function (err) {
                if (err) {
                    logger.error("Internal Server Error");
                    return res
                        .status(500)
                        .send("Internal Server Error");
                } else {
                    logger.info("Company Successfully Registered");
                    return res
                        .status(200)
                        .send("Successfully Registered");
                }
            })
        })
    } else {
        logger.error("Company's Name Field Missing");
        return res.status(406).send("Company's Name Field Missing");
    }
})

// removing a company from the portal
route.delete('/company/remove/:id', function (req, res) {
    Company.findByIdAndRemove(req.params.id, (err, company) => {
        if (err) {
            logger.error("Internal Server Error" + " : " + err.name + " : " + err.message);
            return res.status(500).send("Internal Server Error" + " : " + err.name + " : " + err.message);
        }
        const response = {
            message: "Company successfully deleted",
            id: company._id
        };
        logger.info("Company Successfully UN-Registered");
        return res
            .status(200)
            .send(response);
    });
});

// registering for a company
route.post('/student/:id/register', function (req, res) {

    Student
        .findById(req.params.id, function (err, student) {
            Company
                .find({
                    _id: req.query.companyId,
                    students: {
                        $elemMatch: {
                            enrollmentNo: student.enrollmentNo
                        }
                    }
                }, function (err, result) {
                    if (err) {
                        logger.error("Internal Server Error" + " : " + err.name + " : " + err.message);
                        return res.status(500).send("Internal Server Error" + " : " + err.name + " : " + err.message);
                    }
                    if (result.length != 0) {
                        logger.error("Registered Student trying to Register Again")
                        return res
                            .status(409)
                            .send("YOU HAVE ALREADY REGISTERED");
                    } else {
                        Company
                            .update({
                                _id: req.query.companyId,
                                cutoff: {
                                    $lte: student.cgpa
                                }
                            }, {
                                $push: {
                                    students: student
                                }
                            }, function (err, affected) {
                                if (err) {
                                    logger.error("Internal Server Error");
                                    return res
                                        .status(500)
                                        .send("Internal Server Error");
                                }
                                if (affected.nModified == 0) {
                                    logger.error("user's cgpa was less than cutoff of the company");
                                    return res
                                        .status(406)
                                        .send("Your CGPA is less than the required cutoff");
                                }
                                logger.info("Student Successfully Registered for Company");
                                return res
                                    .status(200)
                                    .send("Successfully registered to the company");
                            })
                    }
                })
        })
})

// unregister student from the company placement program
route.delete('/student/:id/unregister', function (req, res) {
    Student
        .findById(req.params.id, function (err, student) {
            Company
                .update({
                    _id: mongoose
                        .mongo
                        .ObjectId(req.query.companyId)
                }, {
                    $pull: {
                        'students': {
                            _id: mongoose
                                .mongo
                                .ObjectId(req.params.id)
                        }
                    }
                }, function (err, affected) {
                    if (err) {
                        logger.error("Internal Server Error"+" : "+err.name+" : "+err.message);
                        return res.status(500).send("Internal Server Error"+" : "+err.name+" : "+err.message);
                    }
                    console.log(affected);
                    if (affected.nModified == 0) {
                        logger.error("user has not registered for the company placement program")
                        return res
                            .status(406)
                            .send("You are not registered for the company placement program");
                    }
                    logger.info("Student Successfully Unregistered for Company");
                    return res
                        .status(200)
                        .send("Successfully un-registered to the company");
                })
        })
})

// bypass post method
route.post('/student/remove/:id', function (req, res) {
    Student.findByIdAndRemove(req.params.id, (err, student) => {
        if (err) {
            logger.error("Internal Server Error" + " : " + err.name + " : " + err.message);
            return res.status(500).send("Internal Server Error" + " : " + err.name + " : " + err.message);
        }
        const response = {
            message: "Student successfully deleted",
            id: student._id
        };
        logger.info("Student Successfully Deleted");
        return res
            .status(200)
            .send(response);
    });
});
route.post('/company/remove/:id', function (req, res) {
    Company.findByIdAndRemove(req.params.id, (err, company) => {
        if (err) {
            logger.error("Internal Server Error" + " : " + err.name + " : " + err.message);
            return res.status(500).send("Internal Server Error" + " : " + err.name + " : " + err.message);
        }
        const response = {
            message: "Company successfully deleted",
            id: company._id
        };
        logger.info("Company Successfully UN-Registered");
        return res
            .status(200)
            .send(response);
    });
});

route.post('/student/:id',function(req,res){
    Student.findById(req.params.id, (err,student)=>{
        return res.send(student);
    })
})
module.exports = route;