const Van = require('../model/Van');

const createNewVan = async (req, res) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({ 'message': 'Name and Price names are required.'});
  }

  try {
    const result = await Van.create({
      name: req.body.name,
      description: req.body.description,
      imageUrl: req.body.imageUrl,
      price: req.body.price,
      type: req.body.type,
    })
    res.status(201).json(result);
  } catch (err) {
    console.log(err);
  }
}

const getAllVans = async (req, res) => {
  //current page
  const page = req.query.p - 1 || 0;
  const vansPerPage = 5;

  const vans = await Van.find()
  // .sort({ name: 1 })
  // .skip(page * vansPerPage)
  // .limit(vansPerPage);
  // console.log( vans, "21: vansCont...")
  
  if (!vans) return res.status(204).json({ 'message': 'No vans found.'});

  res.json(vans);  
}
 
const getVan = async (req, res) => {    
  if (!req?.params?.id) { 
    return res.status(400).json({ 'message': 'Van ID is required.'});
  }

  const van = await Van.findOne({ _id: req.params.id }).exec();  
  if (!van) {
    return res.status(400).json({ "message": `No van matches ID ${req.params.id}.`});
  }
  res.status(200).json(van);
} 

const updateVan = async (req, res) => {
  if (!req?.body?.id) {
    return res.status(400).json({ 'message': 'ID parameter is required.'});
  }

  const van = await Van.findOne({ _id: req.body.id }).exec();  
  if (!van) {
    return res.status(400).json({ "message": `No user matches ID ${req.body.id}.`});
  }
  if (req.body?.name) van.name = req.body.name;
  if (req.body?.description) van.description = req.body.description;
  if (req.body?.imageUrl) van.imageUrl = req.body.imageUrl;
  if (req.body?.price) van.price = req.body.price;
  if (req.body?.type) van.type = req.body.type;
  // if (req.body?.lastname) user.lastname = req.body.lastname;
  const result = await van.save();
  res.json(result);
}

const deleteVan = async (req, res) => {
  if (!req?.body?.id) {
    return res.status(400).json({ 'message': 'User ID is required.'});
  }
 
  const van = await Van.findOne({ _id: req.body.id }).exec();  
  if (!van) {
    return res.status(204).json({ "message": `No useer matches ID ${req.body.id}.`});
  } 
  const result = await van.deleteOne({ _id: req.body.id });   
  res.json(result);
}

const getUserVans = async (req, res) => {
  // console.log( req?.query, req?.query?.user)
  if (!req?.query?.user) {
    return res.status(400).json({ 'message': 'username is required.'});
  }

  const { user } = req.query
  
  //current page
  const page = req.query.p - 1 || 0;
  const vansPerPage = 5;

  const vans = await Van.find({ "users.name": { $in: [`${user}`] }})
  
  if (!vans) return res.status(204).json({ 'message': 'No vans found.'});

  res.json(vans); 
}

const addVanUser = async (req,res) => {
  // console.log(req?.body)
  if (!req?.body?.id) {
    return res.status(400).json({ 'message': 'ID parameter is required.'});
  }

  if (!req.body?.vanName || !req.body?.userName) res.status(400).json({ 'message': 'Van name and Username required.'});
  const { vanName, userName } = req.body

  const van = await Van.findOne({ _id: req.body.id }).exec();  
  if (!van) {
    return res.status(400).json({ "message": `No van matches ID ${req.body.id}.`});
  }
  
  const vanUsers = van.users.filter(item => item.name !== userName)
  
  console.log(vanName, userName, vanUsers, vanUsers.filter(item => item.name !== userName), 'vansCont.. 92' )
  
  if (req.body?.vanName && req.body?.userName) van.users = [...vanUsers, { name: userName } ];
  const result = await van.save();
  res.json(result);
  
}

const removeVanUser = async (req,res) => {
  // console.log(req?.body)
  if (!req?.body?.id) {
    return res.status(400).json({ 'message': 'ID parameter is required.'});
  }

  if (!req.body?.vanName || !req.body?.userName) res.status(400).json({ 'message': 'Van name and Username required.'});
  const { vanName, userName } = req.body

  const van = await Van.findOne({ _id: req.body.id }).exec();  
  if (!van) {
    return res.status(400).json({ "message": `No van matches ID ${req.body.id}.`});
  }
  
  const vanUsers = van.users.filter(item => item.name !== userName)
  
  console.log(vanName, userName, vanUsers, vanUsers.filter(item => item.name !== userName), 'vansCont.. 92' )
  
  if (req.body?.vanName && req.body?.userName) van.users = [...vanUsers];
  const result = await van.save();
  res.json(result);
  
} 


  
module.exports = {
  createNewVan,
  getAllVans,
  getVan,
  deleteVan,
  getUserVans,
  updateVan,
  addVanUser,
  removeVanUser, 
}