const Swipe = require('../models/Swipe');

const swipeService = {
    getAllSwipe: async () => await Swipe.find(),

    createSwipe: async (userId, likedUserId, swipe) =>{
        const existing = await Swipe.findOne({ userId, likedUserId });
        if (existing) throw new Error('Ya existe un swipe');
        
        const newSwipe = new Swipe({ userId, likedUserId, swipe });
        return await newSwipe.save();
    },
    
    getUserSwipes: async (userId) => {
        return await Swipe.find({ userId });
    },

    getUsersWithLikeSwipe: async () => {
        return await Match.find({ swipe: 'like' }).populate('user1 user2');
    }

}

module.exports = swipeService;