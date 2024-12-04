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
  const { productId } = req.body;
  const { userId } = req; // Assuming middleware sets this

  try {
    // Input validation
    if (!productId) {
      return res.status(400).json({ 
        success: false,
        error: "Product ID is required" 
      });
    }

    if (!userId) {
      return res.status(401).json({ 
        success: false,
        error: "User not authenticated" 
      });
    }

    // Find and delete the item
    const deletedItem = await Cart.findOneAndDelete({ 
      userId, 
      productId 
    });

    if (!deletedItem) {
      return res.status(404).json({
        success: false,
        error: "Item not found in cart"
      });
    }

    // Return success response
    return res.status(200).json({
      success: true,
      message: "Item removed from cart",
      data: deletedItem
    });

  } catch (error) {
    console.error("Error removing item from cart:", error);
    return res.status(500).json({
      success: false,
      error: "Internal server error"
    });
  }
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
