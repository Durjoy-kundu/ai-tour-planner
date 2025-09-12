
import {v} from "convex/values";
import {mutation, query} from "./_generated/server"



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


export const GetUserTrips = query({
  args:{
    uid: v.id('UserTable'),
  },
  handler: async (ctx,args) => {
    const result = await ctx.db.query("TripDetailTable").filter(q => q.eq(q.field("uid"), args.uid)).order("desc").collect();
    
    return result;
  }
})



export const GetTripById = query({
  args:{
    uid: v.id('UserTable'),
    tripid: v.string(),
  },
  handler: async (ctx,args) => {
    const result = await ctx.db.query("TripDetailTable").filter(q =>q.and (
      q.eq(q.field("uid"), args.uid),
      q.eq(q.field("tripId"), args?.tripid)
    ))
    .collect();
  
    return result[0];
  }
})
