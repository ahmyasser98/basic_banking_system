const express = require('express');
const axios = require('axios');
const route = express.Router();

const customerController = require('../controller/customerController');
const transferController = require('../controller/transferController');

route.get('/', (req, res) => {
  res.render('home');
});

route.get('/home', (req, res) => {
  res.render('home');
});

route.get('/customers', (req, res) => {
  axios.get('http://localhost:3000/api/customers')
    .then(function(response){
      res.render('customers',{customers:response.data});
    })
    .catch(err =>{
      res.send(err);
    })
});


route.get('/view_customer/:id', (req, res) => {
  const id = req.params.id;
  console.log(id);
  axios.get('http://localhost:3000/api/customers/?id='+id)
    .then(function(response){
      console.log(response.data);
      res.render('viewCustomer',{customer:response.data});
    })
    .catch(err =>{
      res.send(err);
    })
});

route.get('/transfer', (req, res) => {
  console.log(req.data);
  axios.get('http://localhost:3000/api/customers')
    .then(function(response){
      res.render('transfer',{customers:response.data});
    })
    .catch(err =>{
      res.send(err);
    })
});

route.get('/history', (req, res) => {
  axios.get('http://localhost:3000/api/transfers')
    .then(function(response){
      res.render('history',{transfers:response.data});
    })
    .catch(err =>{
      res.send(err);
    })
});

route.get('/about', (req, res) => {
  res.render('about');
});

route.get('/view_customer', (req, res) => {
  res.render('viewCustomer');
});

route.post('/api/customers', customerController.create);
route.get('/api/customers', customerController.find);
route.put('/api/customers/:id', customerController.update);
route.delete('/api/customers/:id', customerController.delete);

route.post('/api/transfers', transferController.create);
route.get('/api/transfers', transferController.find);
route.put('/api/transfers/:id', transferController.update);
route.delete('/api/transfers/:id', transferController.delete);

module.exports = route;
