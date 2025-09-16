const User = require("../model/users.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// creation, getAll, getALLBYID, delete, update

// REGISTER
const register = async (req, res) => {
    try {
        const {email, password} = req.body
        const exists = await User.findOne({ email })

        if(exists) return res.status(400).json({ message: "Erreur" })

        const salt = await bcrypt.genSalt(10) // genSalt: Differencie les mots de passe de 2 users, 10: securiasation mdp
        const hashPassword = await bcrypt.hash(password, salt);
        
        const saveUser = await User.create({
            ...req.body,
            password: hashPassword
        })

        const token = jwt.sign({ userId: saveUser.id, username: saveUser.username }, process.env.JWT_SECRET, { expiresIn: "10h" })
        return res.status(201).json({ token })
    } catch(err) {
        return res.status(500).json({ error: err.message })
    }
}

// LOGIN
const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        if(!user) return res.status(401).json({ message: "Adresse email incorrect" })

        const comparedPassword = await bcrypt.compare(password, user.password);
        if(!comparedPassword) return res.status(401).json({ message: "Mot de passe incorrect" })

        const token = jwt.sign({ userId: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: "10h" })
        return res.status(201).json({ token })
    } catch(err) {
        return res.status(500).json({ error: err.message })
    }
}

const createUser = async (req, res) => {
    try {
        let userData = { ...req.body };
        if(userData.password) {
            const salt = await bcrypt.genSalt(10);
            userData.password = await bcrypt.hash(userData.password, salt)
        }
        const saveUser = await User.create(userData) 
        // await res.save(saveUser)
        return res.status(201).json({ saveUser });
    } catch(err) {
        return res.status(500).json({ error: err.message })
    }
}

const getAllUser = async (req, res) => {
    try {
        const user = await User.find();
        return res.status(200).json({ user })
    } catch(err) {
        return res.status(500).json({ error: err.message })
    }
}

const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        return res.status(200).json({ user });
    } catch(err) {
        return res.status(500).json({ error: err.message })
    }
}

const updateUser = async (req, res) => {
    try {
        const id = req.params.id;
        const exists = await User.findById(id);
        if(!exists) return res.status(404).json({ message: "User not found" });

        const saveUser = await User.findByIdAndUpdate(id, 
            { ...req.body },
            { new: true } 
        )

        return res.status(200).json({ saveUser });
    } catch(err) {
        return res.status(500).json({ error: err.message })
    }
}

const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        const exists = await User.findById(id);
        if(!exists) return res.status(404).json({ message: "User not found" })

        const delUser = await User.findByIdAndDelete(id);
        return res.status(200).json({ delUser });
    } catch(err) {
        return res.status(500).json({ error: err.message })
    }
}

module.exports = {
    createUser, 
    getAllUser,
    getUserById,
    updateUser,
    deleteUser,
    register, 
    login
}