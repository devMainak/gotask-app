const Tag = require("../models/tag.model");

// Function to add new tag
const addTags = async (newTag) => {
  try {
    const tagToSave = new Tag(newTag);
    const savedTag = await tagToSave.save();
    return savedTag;
  } catch (error) {
    throw error;
  }
};

exports.createTag = async (req, res) => {
  const { tag } = req.body;
  try {
    const savedTag = await addTags(tag);
    if (savedTag) {
      res.status(201).json({ message: "Tag added successfully", savedTag });
    } else {
      res.status(400).json({ message: "Failed to add tag" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add tag." });
  }
};

// Function to read all tags
const readAllTags = async () => {
  try {
    const tags = await Tag.find();
    return tags;
  } catch (error) {
    throw error;
  }
};

exports.getTags = async (req, res) => {
  try {
    const tags = await readAllTags();
    if (tags.length > 0) {
      res.status(200).json({ message: "Tags fetched successfully", tags });
    } else {
      res.status(404).json({ message: "Failed to get tags" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to get tags." });
  }
};
