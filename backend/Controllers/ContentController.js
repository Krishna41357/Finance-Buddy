import ContentBlock from  '../models/ContentBlock.js'  ;

export const getContent = async (req, res) => {
  try {
    const content = await ContentBlock.find();
    res.status(200).json(content);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch content' });
  }
};

export const updateContent = async (req, res) => {
  try {
    const updates = req.body; // [{ key, content, type }]
    const results = await Promise.all(
      updates.map(block =>
        ContentBlock.findOneAndUpdate(
          { key: block.key },
          {
            content: block.content,
            type: block.type  // ✅ include type
          },
          { new: true, upsert: true }
        )
      )
    );
    res.status(200).json({ message: 'Content updated successfully', data: results });
  } catch (err) {
    console.error('[PUT] updateContent error:', err);
    res.status(500).json({ message: 'Failed to update content' });
  }
};
