const express = require('express');
const axios = require('axios');
const router = express.Router();

const API_URL = 'https://jsonplaceholder.typicode.com/todos';

/**
 * afficher la liste des todos
 */
router.get('/', async (req, res) => {
  try {
    const response = await axios.get(API_URL);
    res.json(response.data);
  } catch (error) {
    res.status(500).send('EErreur d affichage des todos');
    
  }
});

//afficher un seul todo
router.get('/:id', async(req,res)=>{

    try{
        const response = await axios.get(`${API_URL}/${req.params.id}`);
        res.json(response.data);

    }catch(error){
        res.status(500).send('Erreur d affichage du todo')
    }
});

// pour ajouter un todo 
router.post('/', async (req, res) => {
    try {
      const response = await axios.post(API_URL, {
        userId: req.body.userId,
        title: req.body.title,
        completed: req.body.completed,
      });
      res.status(201).json(response.data);
    } catch (error) {
        res.status(500).send('Error creating todo');
    }
  });
   // PUT (update) a todo by ID
    router.put('/:id', async (req, res) => {
     try {
         const response = await axios.put(`${API_URL}/${req.params.id}`, req.body);
         res.json(response.data);
        } catch (error) {
          res.status(500).send('Error updating todo');
     } 
  });
  

// DELETE a todo
router.delete('/:id', async (req, res) => {
  const todoId = req.params.id;
  try {
    const response = await axios.delete(`${API_URL}/${todoId}`);
    res.status(200).json({ message: 'Todo deleted successfully', data: response.data });
  } catch (error) {
    res.status(500).send('Error deleting todo');
  }
});

module.exports = router;

module.exports = router;
