
import {v} from "convex/values";
import {mutation} from "./_generated/server"



export const CreateTripDetail = mutation({
  args:{
    tripId: v.string(),
    tripDetail: v.any(),
    uid: v.id('UserTable'),
  },

  handler: async (ctx,args) => {
   // const { tripId, tripDetail, uid } = args;
    // Your logic to create a trip detail goes here

    const result = await ctx.db.insert("TripDetailTable", {
        tripDetail: args.tripDetail,
        tripId: args.tripId,
        uid: args.uid,
      });
  }
});

