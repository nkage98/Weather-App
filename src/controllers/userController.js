import { getUsers, newUser, searchUserById, deleteUserById, usersCount} from '../models/userModel.js'; // import models for db manipulation

// render detailed user info page
export const infoPage = async (req, res) =>{
    res.render('usersInfo', { // render the page usersInfo.ejs
        titulo: 'Users Details',
        csrfToken: req.csrfToken() // csrfToken
    });
}

//list max 20 user
export const listUsers = async (req, res) => {
    try {
        const { name, email, page = 1, limit = 20 } = req.query; // request from query url /users?name=NAME&email=EMAIL&page=PAGE&limit=LIMIT

        const pageNumber = parseInt(page) || 1; // convert to int    page > 0 ? page : 1
        const limitNumber = parseInt(limit) || 20; // same

        const filters = { name, email }; 

        const users = await getUsers(filters, pageNumber, limitNumber); // get users by filters (name, email) and pageNumber max:20 per list
        const total = await usersCount(filters); // get total users number in DB
        res.json({ //send json response with the data 
            users,
            total,
            page: pageNumber,
            limit: limitNumber,
            totalPages: Math.ceil(total / limitNumber) // round up total page number
        });
    } catch (error) {
        console.error('Erro ao listar usuários:', error);
        res.status(500).json({ message: 'Erro ao buscar usuários' });
    }
};

// get user info and send back as a json response.
export const userInfo = async (req, res) => {
    const { id } = req.params; //get id param from route /users/:id

    try {
        const user = await searchUserById(id); // call model function to search in db for user by id

        if (!user) { // if user is null
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(user); // send back json with user information for in the case Vue app to use
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// just add user with name, email and phone. Paper test dind't especify if login and password was needed, 
// i interpreted as not, like a internal use app
export const addUser = async (req, res) => {
    const { name, email, phone } = req.body; // get post request form and fill the variables name, email and phone

    if (!name || !email || !phone) { // check if it's all there
        return res.status(400).json({ message: 'Name, email and phone are required' });
    }

    try {
        const user = await newUser({ name, email, phone}); // call newUser model to add to DB
        res.status(201).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error: cannot register user" }); // error response 
    }
};

// delete user by id / delete method
export const deleteUser = async (req, res) => {
    const { id } = req.params; // get the id from param from route /users/:id

    try {
        const deleted = await deleteUserById(id); // call delete model to delete user from DB

        if (!deleted) { // if it didn't work, problably it's because the user not exist
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({ message: 'User deleted successfully' }); // just send success message 

    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
