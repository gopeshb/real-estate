import Listing from "../models/listing.model.js";

export const createListing = async (req, res, next) => {
    try {
      const listing = await Listing.create(req.body);
      return res.status(201).json(listing);
    } catch (error) {
        console.log('listing ke route me error h kya');
      next(error);
    }
  };
  export const deleteListing = async (req, res, next) => {
    const listing = await Listing.findById(req.params.id);
  
    if (!listing) {
      return res.status(404).send('Listing not found');
    }
  
    if (req.user.id !== listing.userRef) {
      return res.status(401).send('You are not verified to delete this listing');
    }
  
    try {
      await Listing.findByIdAndDelete(req.params.id);
      res.status(200).json('Listing has been deleted!');
    } catch (error) {
      next(error);
    }
  };
  export const updateListing = async (req, res, next) => {
    try {
      const listing = await Listing.findById(req.params.id);
  
      if (!listing) {
        return res.status(404).send('Listing not found');
      }
  
      if (req.user.id !== listing.userRef) {
        return res.status(401).send('You are not verified to update this listing');
      }
      const updatedListing = await Listing.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.status(200).json(updatedListing);
    } catch (error) {
        console.log(error);
      res.status(500).send('Error while updating list');
    }
  };
  