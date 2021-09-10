'use strict';

const express = require('express');
const bearerAuth = require('../middleware/bearer.js');
const permissions = require('../middleware/acl.js');
const router = express.Router();
const House = require('../models/model');
const myHouse = require('../models/house');
const houseInstance = new House(myHouse);

// add my RESTFUL APIs declarations
router.get('/all-requests',bearerAuth, permissions('readRequests'), handleGetAll);
router.get('/my-requests',bearerAuth, handleGetMine);
router.post('/create-request',bearerAuth,permissions('createRequest'), handleCreate);
router.put('/update-status',bearerAuth,permissions('updateStatus'), handleUpdate);

async function handleGetAll(req, res) {
    try{
        let allRequests = await houseInstance.get();
        let pending = allRequests.filter(oneReq => oneReq.reqStatus == 'pending');
        let approved = allRequests.filter(oneReq => oneReq.reqStatus == 'approved');
        let rejected = allRequests.filter(oneReq => oneReq.reqStatus == 'rejected');
        res.status(200).json({allRequests, pending, approved, rejected});
    } catch(err){console.log(err);}
}

async function handleGetMine(req, res) {
    try {
        let allRequests = await houseInstance.get();
        let myRequests = allRequests.filter(oneReq => oneReq.ownerName === req.user.username);
        res.status(200).json(myRequests);
    } catch (err) {
        console.log(err);
    }
}

async function handleCreate(req, res) {
    try {
        let newRecord = await houseInstance.create({...req.body, ownerName: req.user.username});
        res.status(201).json(newRecord);
    } catch (err) {
        console.log(err);
    }
}

async function handleUpdate(req, res) {
    try {
        let reqStatus = req.body.status;
        let id = req.body.id;
        let updated = await houseInstance.update(id, {reqStatus});
        res.status(200).json(updated);
    } catch (err) {
        console.log(err);
    }
}


module.exports = router;