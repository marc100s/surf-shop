const Post = require("../models/post");
const cloudinary = require("cloudinary").v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

module.exports = {
  // Posts Index
  async postIndex(req, res, next) {
    try {
      const posts = await Post.find({});
      res.render("posts/index", { posts });
    } catch (err) {
      next(err);
    }
  },

  // Posts New
  postNew(req, res) {
    res.render("posts/new");
  },

  // Posts Create
  async postCreate(req, res, next) {
    try {
      const images = [];
      for (const file of req.files || []) {
        const image = await cloudinary.uploader.upload(file.path);
        images.push({
          url: image.secure_url,
          public_id: image.public_id,
        });
      }

      const postData = {
        ...req.body.post,
        images,
      };

      const post = await Post.create(postData);
      res.redirect(`/posts/${post.id}`);
    } catch (err) {
      next(err);
    }
  },

  // Posts Show
  async postShow(req, res, next) {
    try {
      const post = await Post.findById(req.params.id);
      if (!post) return next(); // Or 404
      res.render("posts/show", { post });
    } catch (err) {
      next(err);
    }
  },

  // Posts Edit
  async postEdit(req, res, next) {
    try {
      const post = await Post.findById(req.params.id);
      if (!post) return next();
      res.render("posts/edit", { post });
    } catch (err) {
      next(err);
    }
  },

  // Posts Update
  async postUpdate(req, res, next) {
    try {
      const post = await Post.findById(req.params.id);
      if (!post) return next();

      // Handle deletions
      if (Array.isArray(req.body.deleteImages)) {
        for (const public_id of req.body.deleteImages) {
          await cloudinary.uploader.destroy(public_id);
          post.images = post.images.filter(
            (img) => img.public_id !== public_id
          );
        }
      }

      // Handle new uploads
      for (const file of req.files || []) {
        const image = await cloudinary.uploader.upload(file.path);
        post.images.push({
          url: image.secure_url,
          public_id: image.public_id,
        });
      }

      // Update fields
      const { title, description, price, location } = req.body.post;
      Object.assign(post, { title, description, price, location });

      await post.save();
      res.redirect(`/posts/${post.id}`);
    } catch (err) {
      next(err);
    }
  },

  // Posts Destroy
  async postDestroy(req, res, next) {
    try {
      const post = await Post.findById(req.params.id);
      if (!post) return next();

      // Delete Cloudinary images
      for (const image of post.images || []) {
        await cloudinary.uploader.destroy(image.public_id);
      }

      // Now delete the post
      await post.deleteOne();

      res.redirect("/posts");
    } catch (err) {
      next(err);
    }
  },
};
