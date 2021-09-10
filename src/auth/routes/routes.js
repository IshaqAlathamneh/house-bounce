'use strict';

const express = require('express');
const bearerAuth = require('../middleware/bearer.js');
const permissions = require('../middleware/acl.js');
const router = express.Router();
const House = require('../models/model');
const myHouse = require('../models/house');
const houseInstance = new House(myHouse);

// add my RESTFUL APIs declarations
router.get('/requests',bearerAuth, handleGetAll);
router.post('/:model',bearerAuth,permissions('create'), handleCreate);
router.put('/:model/:id',bearerAuth,permissions('update'), handleUpdate);
router.delete('/:model/:id',bearerAuth,permissions('delete'), handleDelete);

async function handleGetAll(req, res) {
    try{

        let allRequests = await houseInstance.get();
        res.status(200).json(allRequests);
    } catch(err){console.log(err);}
}

async function handleCreate(req, res) {
  let obj = req.body;
  let newRecord = await houseInstance.create(obj);
  res.status(201).json(newRecord);
}

async function handleUpdate(req, res) {
  const id = req.params.id;
  const obj = req.body;
  let updatedRecord = await req.model.update(id, obj)
  res.status(200).json(updatedRecord);
}

async function handleDelete(req, res) {
  let id = req.params.id;
  let deletedRecord = await req.model.delete(id);
  res.status(200).json(deletedRecord);
}


module.exports = router;