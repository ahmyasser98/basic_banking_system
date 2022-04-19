var customers = require('../model/customerModel');

exports.create = (req, res) => {
  if(!req.body){
    res.status(400).send({message: "Content cannot be empty!"});
    return;
  }
  const customer = new customers({
    name:req.body.name,
    email:req.body.email,
    phone:req.body.phone,
    balance:req.body.balance
  })
  customer
    .save(customer)
    .then(data =>{
      res.send(data)
    })
    .catch(err =>{
      res.status(500).send({
        message:err.message||"Error occurred while executing a create operation"
      });
    });
};

exports.find = (req, res) => {
  if(req.query.id){
    const id = req.query.id;
    customers.findById(id)
      .then(data =>{
        if(!data){
          res.status(404).send({message:"Not found user with id "+id})
        }
        else{
          res.send(data)
        }
      })
      .catch(err =>{
        res.status(500).send({message:"Error in retrieving customer with id"+id})
      })
  }
  else{
    customers.find()
      .then(user =>{
        res.send(user)
      })
      .catch(err =>{
        res.status(500).send({message:err.message||"Error occurred while executing user information"})
      })
  }
};

exports.update = (req, res) => {
  if(!req.body){
    return res
      .status(400)
      .send({message:"Content cannot be empty!"})
  }
  const id = req.params.id;
  customers.findByIdAndUpdate(id,req.body,{useFindAndModify:false})
    .then(data =>{
      if(!data){
        res.status(404).send({message:`Cannot find user with id ${id}.`})
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
  customers.findByIdAndDelete(id)
    .then(data =>{
      if(!data){
        res.status(404).send({message:`Cannot find user with id ${id}.`})
      }
      else{
        res.send({message:"User was deleted successfully!"})
      }
    })
    .catch(err =>{
      res.status(500).send({message:"Cannot delete user with id="+id});
    });
};
