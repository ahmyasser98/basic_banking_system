var transfers = require('../model/transferModel');
var customers = require('../model/customerModel');

exports.create = (req, res) => {
  if(!req.body){
    res.status(400).send({message: "Content cannot be empty!"});
    return;
  }
  const transfer = new transfers({
    from_name:req.body.from_name,
    to_name:req.body.to_name,
    amount:req.body.amount
  })
  var from_customer = req.body.from_name;
  var to_customer = req.body.to_name;
  var tr_amount = req.body.amount;
  transfer
    .save(transfer)
    .then(data =>{
      res.redirect('/transfer')
    })
    .catch(err =>{
      res.status(500).send({
        message:err.message||"Error occurred while executing a create operation"
      });
    });
  customers.findOneAndUpdate({name: from_customer}, {$inc:{balance:-tr_amount}}, {returnNewDocument:true})
    .then(data =>{
      if(!data){
        res.status(404).send({message:`Cannot find user with id ${id}.`})
      }
      else{
        res.redirect('/transfer')
      }
    })
    .catch(err =>{
      res.status(500).send({message:"Error while executing update operation"})
    })
  customers.findOneAndUpdate({name: to_customer}, {$inc:{balance:tr_amount}}, {returnNewDocument:true})
    .then(data =>{
      if(!data){
        res.status(404).send({message:`Cannot find user with id ${id}.`})
      }
      else{
        res.redirect('/transfer')
      }
    })
    .catch(err =>{
      res.status(500).send({message:"Error while executing update operation"})
    })
};

exports.find = (req, res) => {
  transfers.find()
  .then(user =>{
    res.send(user)
  })
  .catch(err =>{
    res.status(500).send({message:err.message||"Error occurred while executing transfer information"})
  })
};

exports.update = (req, res) => {
  if(!req.body){
    return res
      .status(400)
      .send({message:"Content cannot be empty!"})
  }
  const id = req.params.id;
  transfers.findByIdAndUpdate(id,req.body,{useFindAndModify:false})
    .then(data =>{
      if(!data){
        res.status(404).send({message:`Cannot find transfer with id ${id}.`})
      }
      else{
        res.send(data)
      }
    })
    .catch(err =>{
      res.status(500).send({message:"Error while executing update operation"})
    })
};

exports.delete = (req, res) => {
  const id = req.params.id;
  transfers.findByIdAndDelete(id)
    .then(data =>{
      if(!data){
        res.status(404).send({message:`Cannot find transfer with id ${id}.`})
      }
      else{
        res.send({message:"User was deleted successfully!"})
      }
    })
    .catch(err =>{
      res.status(500).send({message:"Cannot delete user with id="+id});
    });
};
