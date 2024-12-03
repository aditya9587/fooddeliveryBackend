import { location } from "../model/location.js";

export const userLocation = async (req,res) => {
  try {
    const { state, city, pincode, phoneNumber ,fullAddress} = req.body;
    const { userId } = req;

    if (!userId) {
      return res
        .status(401)
        .json({ success: false, message: "User not authenticated" });
    }

    const newAddress = new location({
      userId,
      state,
      city,
      pincode,
      phoneNumber,
      fullAddress,
    });

    await newAddress.save();

    res
      .status(201)
      .json({
        success: true,
        message: "Address added successfully",
        address: newAddress,
      });
  } catch (error) {
    console.error("Error adding address:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getUserAddresses = async (req, res) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ success: false, message: "User not authenticated" });
    }

    const addresses = await location.find({ userId });
    res.status(200).json({ success: true, addresses });
  } catch (error) {
    console.error("Error fetching addresses:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
