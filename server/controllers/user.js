import userModel from '../models/user.js';

class controller {
    static getAllUsers = async (req, res) => {
        // const userId=req.params.id;
        const fetchAllusers = await userModel.find({});
        return res.status(200).json(fetchAllusers);
    };

    static getUserById = async (req, res) => {
        const fetchAllusers = await userModel.findById(req.params.id);
        return res.status(200).json(fetchAllusers);
    };

    static createNewsUser = async (req, res) => {
        const { name, email, gender, city } = req.body;
        try {

            if (name && email && gender && city) {
                const isEmail = await userModel.findOne({ email: email });
                if (!isEmail) {
                    const newUser = userModel({
                        name,
                        email,
                        gender,
                        city,
                        profile: req.file.filename
                    });
                    const response = await newUser.save();
                    if (response) {
                        return res.status(200).json({ message: "successesfully resjistered" });
                    }
                }
                else {
                    return res.status(400).json({ message: "user already exist" });
                }
            }
            else {
                return res.status(400).json({ message: "All fiels are required" });
            }
        } catch (error) {
            return res.status(400).json({ message: error.message })
        }
    };

    static editUser = async (req, res) => {
        const { name, email, gender, city } = req.body;
        let profile = req.file ? req.file.filename : undefined;
        try {
            let updatedUser = {};
            if (name) updatedUser.name = name;
            if (email) updatedUser.email = email;
            if (gender) updatedUser.gender = gender;
            if (city) updatedUser.city = city;
            if (profile) updatedUser.profile = profile;

            let user = await userModel.findById(req.params.id);

            if (!user) return res.status(404).json({ message: 'User not found' });

            user = await userModel.findByIdAndUpdate(req.params.id, { $set: updatedUser }, { new: true });
            return res.status(200).json({ user });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "An error occurred" });
        }
    };

    static deleteUser = async (req, res) => {
        try {
            let user = await userModel.findById(req.params.id);

            if (!user) return res.status(404).json({ message: 'User not found' });

            await userModel.findByIdAndDelete(req.params.id);
            return res.status(200).json({ message: 'User deleted successfully' });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "An error occurred" });
        }
    };

}

export default controller;