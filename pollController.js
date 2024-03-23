const Poll = require("./models/poll");

const createPollGet = (req, res) => {
  res.render("createPoll");
};

const createPoll = async (req, res) => {
  let { title, description, options } = req.body;

  options = options.map((opt) => {
    return {
      name: opt,
      vote: 0,
    };
  });
  console.log(options);

  const poll = new Poll({
    title,
    description,
    options,
  });

  try {
    await poll.save();
    res.redirect("/polls");
  } catch (error) {
    console.log(error);
  }
};

const getAllPolls = async (req, res) => {
  try {
    const polls = await Poll.find();
    res.render("polls", { polls });
  } catch (error) {
    console.log(error);
  }
};
const getViewPoll = async (req, res) => {
  try {
    const id = req.params.id;
    const poll = await Poll.findById(id);
    const options = poll.options;

    let results = [];
    options.forEach((option) => {
      let percentage = (option.vote * 100) / poll.totalVote;
      results.push({
        // note doc i learn new things here
        ...option._doc,
        percentage: percentage ? percentage.toFixed(0, 0) : 0,
      });
    });

    res.render("viewPoll", { poll, results });
  } catch (error) {
    console.log(error);
  }
};

const createOpinionViewPoll = async (req, res) => {
  try {
    const id = req.params.id;
    const optionId = req.body.option;

    const poll = await Poll.findById(id);
    const options = poll.options;

    const index = options.findIndex((option) => option.id === optionId);

    options[index].vote = options[index].vote + 1;
    const totalVote = poll.totalVote + 1;

    console.log(options);
    console.log(totalVote);
    console.log("riomfndsfdsffdsfsd");

    await Poll.findByIdAndUpdate(
      { _id: poll._id },
      { $set: { options, totalVote } }
    );
    res.redirect(`/polls/${id}`);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createPollGet,
  createPoll,
  getAllPolls,
  getViewPoll,
  createOpinionViewPoll,
};
