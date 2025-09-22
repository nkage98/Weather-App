import  {validateEmail, validatePassword} from '../utils/utils.js';
import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


const registerController = async (req, res) => {
    const user = req.body;
    
    if (!user.email || !user.password) {
        return res.status(400).json({message: 'Email and password are required'});
    }

    if(!validateEmail(user.email)) {
        return res.status(400).json({message: 'Invalid email format'});
    }

    if(!validatePassword(user.password)) {
        return res.status(400).json({message: 'Password does not meet criteria'});
    }

    try {
        const userExists = await User.findOne({email: user.email});

        if (userExists) {
            return res.status(400).json({message:"User already exists."});
        }

        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(user.password, salt);

        const newUser =  new User({
            name: user.name,
            email: user.email,
            password: hashedPassword,
        });

        console.log(newUser);

        await newUser.save()
            .then(user => console.log('User created successfully:', user))
            .catch(err => {
                console.error('Error creating user:', err);
                return res.status(500).json({message: 'Error creating user'}, err);
            });

        return res.status(201).json({message: 'User registered successfully', user: newUser});
    }
    catch (error) {
        return res.status(500).json({message: 'Internal server error'}, error);
    }
}

const loginController = async (req, res) => {

    const user = req.body;

    if(!user.email||!user.password) {
        return res.status(400).json({message: 'Email and password are required'});
    }

    try {
        const findUser = await User.findOne({email: user.email});

        if (!findUser) {
            return res.status(404).json({message: 'Email or Password incorrect.'});
        }
        
        const isPasswordValid = bcrypt.compare(user.password, findUser.password);
        
        if (!isPasswordValid){
            console.log(isPasswordValid);
            return res.status(401).json({message: 'Incorrect password.'});
        }

        const token = jwt.sign( 
            { id: findUser._id, favoriteCity: findUser.favoriteCities[0]},
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        console.log("login:", token, findUser.id, findUser.favoriteCities[0]);

        return res.status(200).json({message: 'Login successful', token: token});
            

  }
    catch (err) {
        return res.status(500).json({message: 'Internal server error'}, err);
    }
}

const getUserController = async (req, res) => {
    const id = req.userId;

    if (!id){
        return res.status(401).json({message: 'Unauthorized'});
    }

    try {
        const user = await User.findById(id).select('-password');
        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }
        console.log(user);
        return res.status(200).json(user);
    }
    catch (err){
        return res.status(500).json({message: 'Internal server error'}, err);
    }
}

const updateUserController = async (req, res) => {
    const id = req.userId;
    const {name} = req.body;

    console.log(id);

    if (!id){
        return res.status(401).json({message: 'Unauthorized'});
    }

    try {
        const user = await User.findByIdAndUpdate(
            id,
            { $set: { 
                name: name
            }},
            { runValidators: true }, 
            { new: true }
        );

        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }

        return res.status(200).json({message: 'User updated succesfully'}, user);
    }
    catch (err){
        return res.status(500).json({message: 'Internal server error'}, err);
    }
}

const deleteUserController = async (req, res) => {
    const id = req.userId;

    try {
        await User.findByIdAndDelete(id);

        return res.status(200).json({message:"User Deleted"});
    }
    catch(err){
        return res.status(500).json({message:"Internal Server Error"}, err);
    }
}



export {
    registerController, loginController, getUserController, updateUserController, deleteUserController
};