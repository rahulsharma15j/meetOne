const mongoose = require("mongoose");
const time = require("../libs/timeLib");
const shortId = require("shortid");
const response = require("../libs/responseLib");
const logger = require("../libs/loggerLib");
const check = require("../libs/checkLib");
const meetingLib = require("../libs/meetingLib");
const userLib = require("../libs/userLib");

let createMeeting = (req, res) => {
  let validateUserInput = () => {
    return new Promise((resolve, reject) => {
      if (
        check.isEmpty(req.body.subject) ||
        check.isEmpty(req.body.description) ||
        check.isEmpty(req.body.adminId) ||
        check.isEmpty(req.body.adminName) ||
        check.isEmpty(req.body.userId) ||
        check.isEmpty(req.body.userName) ||
        check.isEmpty(req.body.userEmail) ||
        check.isEmpty(req.body.location) ||
        check.isEmpty(req.body.startDate) ||
        check.isEmpty(req.body.endDate)
      ) {
        logger.info(
          "Parameter(s) is missing.",
          "meetingController: createMeeting()/validateUserInput()"
        );
        reject(
          response.generate(
            true,
            "One or more parameter(s) is missing.",
            400,
            null
          )
        );
      } else {
        resolve(req);
      }
    });
  };

  validateUserInput(req, res)
    .then(meetingLib.create)
    .then(resolve => {
      delete resolve.createdOn;
      delete resolve.modifiedOn;
      delete resolve._id;
      delete resolve.__v;
      res.send(
        response.generate(false, "Meeting created successfully.", 200, resolve)
      );
    })
    .catch(err => {
      res.send(err);
    });
};

let updateMeeting = (req, res) => {
  meetingLib
    .findMeeting(req, res)
    .then(meetingDetails => meetingLib.update(req, meetingDetails))
    .then(resolve => {
      res.send(
        response.generate(false, "Meeting updated successfully.", 200, null)
      );
    })
    .catch(err => {
      res.send(err);
    });
};

let deleteUserMeeting = (req, res) => {
  meetingLib
    .findMeeting(req, res)
    .then(meetingLib.deleteMeeting)
    .then(resolve => {
      res.send(
        response.generate(false, "Meeting deleted successfully.", 200, null)
      );
    })
    .catch(err => {
      res.send(err);
    });
};

let getAllMeetings = (req, res) => {
  let validateUserInput = () => {
    return new Promise((resolve, reject) => {
      if (check.isEmpty(req.params.userId)) {
        logger.info(
          "UserId is missing.",
          "meetingController: createMeeting()/validateUserInput()"
        );
        reject(response.generate(true, "Parameter(s) is missing.", 400, null));
      } else {
        resolve(req);
      }
    });
  };
  validateUserInput(req, res)
    .then(userLib.findUserById)
    .then(meetingLib.findAllMeetings)
    .then(resolve => {
      res.send(
        response.generate(false, "All Meetings found and listed.", 200, resolve)
      );
    })
    .catch(err => {
      res.send(err);
    });
};

let getSingleMeeting = (req, res) => {
  meetingLib
    .findMeeting(req, res)
    .then(resolve => {
      res.send(
        response.generate(false, "Meetings details found.", 200, resolve)
      );
    })
    .catch(err => {
      res.send(err);
    });
};

module.exports = {
  createMeeting: createMeeting,
  getSingleMeeting: getSingleMeeting,
  getAllMeetings: getAllMeetings,
  updateMeeting: updateMeeting,
  deleteUserMeeting: deleteUserMeeting
};
