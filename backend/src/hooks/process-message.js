// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    const { data } = context;

    // Throw an error if we didn't get a text
    if(!data.text) {
      throw new Error('A message must have a text');
    }

    // The logged in user
    const { user } = context.params;
    // The actual message text
    // Make sure that messages are no longer than 400 characters
    const text = data.text.substring(0, 400);
    // should check to see if user has this room later
    const room = data.room;

    // Update the original data (so that people can't submit additional stuff)
    context.data = {
      text,
      room,
      // Set the user id
      userId: user._id,
      // Add the current date
      createdAt: new Date().getTime()
    };
    
    return context;
  };
};
