import Cart from "../model/cart.js";

export const addtocart = async (req, res) => {
  try {
    const { productId, quantity, price, itemName, desc } = req.body;
    const { userId } = req;

    // Find existing cart item using productId and userId
    const existingItem = await Cart.findOne({
      userId: userId,
      productId: productId,
    });

    if (existingItem) {
      // Update quantity if item exists
      console.log("existing item" , existingItem)
      existingItem.quantity += quantity;
      const updatedItem = await existingItem.save();
      return res.status(200).json({
        success: true,
        data: updatedItem,
      });
    }

    // Create new cart item if it doesn't exist
    const newItem = new Cart({
      userId,
      productId,
      itemName,
      price,
      quantity,
      desc,
    });

    const savedItem = await newItem.save();
    return res.status(201).json({
      success: true,
      data: savedItem,
    });
  } catch (error) {
     console.error("Cart operation error:", error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const getCart = async (req, res) => {
  const userId = req.userId;
  await Cart.find({ userId })
    .then((cart) => {
      return res.status(200).json({ cart });
    })
    .catch((err) => {
      return res.status(400).json({ error: "Something went wrong" });
    });
};

export const removeItem = async (req, res) => {
  const { itemId } = req.body;
  Cart.findOne
    .deleteOne({ itemId })
    .then(() => {
      return res.status(200).json({ message: "Item removed from cart" });
    })
    .catch((err) => {
      return res.status(400).json({ error: "Something went wrong" });
    });
};

export const updateItem = async (req, res) => {
  const { itemId, quantity } = req.body;
  Cart.findOneAndUpdate({ itemId }, { quantity })
    .then(() => {
      return res.status(200).json({ message: "Item updated" });
    })
    .catch((err) => {
      return res.status(400).json({ error: "Something went wrong" });
    });
};
