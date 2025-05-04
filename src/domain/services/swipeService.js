const Swipe = require('../models/Swipe');
const matchService = require('../services/matchService')

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

    createValidate: async (userId, likedUserId, swipe) => {
        
        await swipeService.createSwipe(userId, likedUserId, swipe);

        if (swipe != true ) {
            return {message: "Swipe registrado", match: false }
        }

        const reverSwipe = await Swipe.findOne({
            userId: likedUserId,
            likedUserId: userId,
            swipe: true
        });

        if (reverSwipe) {
            const data = {
                user1: userId,
                user2: likedUserId,
                swipe: true
            }
            await matchService.createMatch(data);
            return { message: "Es un match", match: true };
        }

        return { message: "Swipe registrado", match: false };

    },

    deleteSwipe: async (id) => {
        const swipe = await Swipe.findByIdAndDelete(id);
        if (!swipe) throw new Error('Swipe no encontrado');
        return swipe;
    }
 
}

module.exports = swipeService;