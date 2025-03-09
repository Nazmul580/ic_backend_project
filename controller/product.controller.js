const { closeDB, connectDB } = require("../db");
const Product = require("../models/product.model");

exports.getProducts = async (req, res) => {
  await connectDB();
  try {
    const {
      page = 1,
      limit = 2,
      category,
      minPrice,
      maxPrice,
      sortBy,
      sortOrder = "asc",
    } = req.query;
    const skip = (page - 1) * limit;
    const filter = {};
    if (category) filter.category = category;
    if (minPrice) filter.price = { ...filter.price, $gte: minPrice };
    if (maxPrice) filter.price = { ...filter.price, $lte: maxPrice };
    const sortOption = {};
    if (sortBy) sortOption[sortBy] = sortOrder === "desc" ? -1 : 1;

    const product = await Product.find(filter)
      .sort(sortOption)
      .skip(skip)
      .limit(Number(limit));

    const totalProduct = await Product.countDocuments(filter);

    res.status(200).json({
      product,
      totalPages: Math.ceil(totalProduct / limit),
      currentPage: Number(page),
    });
  } catch (error) {
    res.status(500).json({ message: "server error" });
  } finally {
    await closeDB();
  }
};

exports.getProduct = async (req, res) => {
  try {
    await connectDB();
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  } finally {
    await closeDB();
  }
};
exports.createProduct = async (req, res) => {
  try {
    const { name, price, description, category, stock } = req.body;
    await connectDB();
    const newProduct = new Porduct({
      name,
      price,
      description,
      category,
      stock,
    });
    await newProduct.save();
    res.status(201).json({ newProduct });
  } catch (err) {
    res.status(500).json({ message: err.message });
  } finally {
    await closeDB();
  }
};
exports.updateProduct = async (req, res) => {
  try {
    await connectDB();
    const { id } = req.params;
    const { name, price, description, category, stock } = req.body;
    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    const updatedProduct = {
      name: name || product.name,
      price: price || product.price,
      description: description || product.description,
      category: category || product.category,
      stock: stock || product.stock,
    };
    await Product.findByIdAndUpdate(id, updatedProduct);
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.deleteProduct = async (req, res) => {
  try {
    await connectDB();
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  } finally {
    await closeDB();
  }
};
