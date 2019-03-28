const express = require('express');
const router = express.Router();
const appConfig = require('../../config/appConfig');
const meetingController = require('./../controllers/meetingController');
const auth = require('./../middlewares/auth');

module.exports.setRouter = (app)=>{
   let baseUrl = `${appConfig.apiVersion}/meetings`;
  
   app.post(`${baseUrl}/create`,auth.isAuthorized, meetingController.createMeeting);
   app.post(`${baseUrl}/delete`,auth.isAuthorized, meetingController.deleteUserMeeting);

   app.put(`${baseUrl}/update/`,auth.isAuthorized,meetingController.updateMeeting);
 
   app.get(`${baseUrl}/view/all/:userId`, auth.isAuthorized, meetingController.getAllMeetings);
   app.get(`${baseUrl}/details/:meetingId`, auth.isAuthorized, meetingController.getSingleMeeting);
    
};