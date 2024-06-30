const Post_Schema = require("../models/Post_Model");



const get_all_posts_controller = async (req, res, next) => {

  try {
    const find_posts = await Post_Schema.find().populate('user_id', {password:0})



    return res.json({ success: true, data: find_posts });



  } catch (error) {
    // Handling any errors that occur during the controller execution
    return next({message: error.message || "Internal server error!" })
  }

}




const create_post_controller = async (req, res, next) => {
  try {
    // Retrieving the authenticated user from the req object, set by the middleware
    const user = req.user;

    // Extracting the post data from the request body
    const body = req.body;

    // Creating a new post with the user's ID attached
    const create_post = await Post_Schema.create({
      ...body,
      user_id: user._id,
    });

    // Returning success response with the newly created post data
    return res.json({ success: true, data: create_post });
  } catch (error) {
    // Handling any errors that occur during the controller execution
    return next({message: error.message || "Internal server error!" })
  }
};



const edit_post_controller = async (req, res, next) => {
  try {
    // Retrieving the authenticated user from the req object, set by the middleware
    const user = req.user;
    const post_id = req.params.id;

    // Extracting the post data from the request body
    const body = req.body;

    // Creating a new post with the user's ID attached
    const find_post = await Post_Schema.findById(post_id);

    if(!find_post){
      return next({status:404, message: "Post not found!" })
    }

    if(find_post.user_id.toString()!== user._id.toString()){
      return next({status:403, message: "You're not authorize to edit this post!" })
    }

    const update_post = await Post_Schema.findByIdAndUpdate(post_id, {...body}, {new: true});

    // Returning success response with the newly created post data
    return res.json({ success: true, data: update_post, message: 'Post has been updated successfully'});
  } catch (error) {
    // Handling any errors that occur during the controller execution
    return next({message: error.message || "Internal server error!" })
  }
};





const delete_post_controller = async (req, res, next) => {
  try {
    // Retrieving the authenticated user from the req object, set by the middleware
    const user = req.user;
    const post_id = req.params.id;

    // Extracting the post data from the request body
    const body = req.body;

    // Creating a new post with the user's ID attached
    const find_post = await Post_Schema.findById(post_id);

    if(!find_post){
      return next({status:404, message: "Post not found!" })
    }

    if(find_post.user_id.toString()!== user._id.toString()){
      return next({status:403, message: "You're not authorize to delete this post!" })
    }

    await Post_Schema.findByIdAndDelete(post_id);

    // Returning success response with the newly created post data
    return res.json({ success: true, message: 'Post has been deleted successfully'});
  } catch (error) {
    // Handling any errors that occur during the controller execution
    return next({message: error.message || "Internal server error!" })
  }
};





module.exports = { get_all_posts_controller, create_post_controller, edit_post_controller, delete_post_controller};
