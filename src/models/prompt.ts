import mongoose from "mongoose";

const promptShema = new mongoose.Schema({
  createor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  prompt: {
    type: String,
    required: [true, "propmt reqired"],
  },
  tag: {
    type: String,
    required: [true, "tag reqired"],
  },
});

const Prompt = mongoose.models.Prompt || mongoose.model("Prompt", promptShema);

export default Prompt;
