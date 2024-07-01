const { Users_Schema } = require("../models/Users_Model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Controller function for user signup
const signup_controller = async (req, res, next) => {

  console.log('request coming....!')
  try {
    const body = req.body;

    const salt = bcrypt.genSaltSync(10);
    const password_hash = bcrypt.hashSync(body.password, salt);

    const new_user = await Users_Schema.create({
      ...body,
      password: password_hash,
    });

    return res.json({ success: true, data: new_user });
  } catch (error) {
    return next({message: error.message || "Internal server error!" })
  }
};

// Controller function for user login
const login_controller = async (req, res) => {
  try {
    const body = req.body;
    const find_user = await Users_Schema.findOne({ email: body.email });

    if (find_user === null) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials!" });
    }
    

    const compare_password = bcrypt.compareSync(
      body.password,
      find_user.password
    );

    // if(!compare_password){
    if (compare_password === false) {
      return next({status:402, message: "Invalid credentials!" });
    }

    const payload = {
      user_id: find_user._id,
    };

    const jwt_token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });

    // Increment the login_count field of the user document by 1
    find_user.$inc('login_count', 1)

    // Save the updated user document back to the database
    await find_user.save();


    // Set a cookie named "auth_token" in the response
    // This cookie will be sent only over HTTP(s) protocols for security
    // and will expire 24 hours from the current time
    // res.cookie("auth_token", jwt_token, {
    //   http:true,
    //   expires:new Date(Date.now() + (1 * 1 * 60 * 60 * 1000)) 
      
    // });

    return res.json({ success: true, message: "Loggedin Successfully!", access_token:jwt_token });
  } catch (error) {
    return next({ message: error.message || "Internal server error!" })
  }
};

// Controller function for checking authentication status
const check_auth_controller = async (req, res) => {
  try {
    // --------- Previous code before middleware
    // const auth_token = req.cookies.auth_token;
    // const verify_token = jwt.verify(auth_token, process.env.JWT_SECRET_KEY);
    // if (!verify_token) {
    //   return res
    //     .status(402)
    //     .json({ success: false, message: "Unauthorized user" });
    // }
    // const user_id = verify_token.user_id;
    // const find_user = await Users_Schema.findById(user_id);

    // ------------ xxx ------------ xxx -----------

    // --------- New code after applying middleware
    // Retrieving user details from the req object, which is set by the middleware
    const user = req.user;

    // Returning the user details in the response
    return res.json({ success: true, data: user });
  } catch (error) {
    // Handling any errors that occur during the controller execution
    res.status(500).json({ success: false, message: "Internal server error!" });
  }
};


// Exporting controller functions
module.exports = {
  signup_controller,
  login_controller,
  check_auth_controller,
};
