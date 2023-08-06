const packages = require('../../packages');
const io = require('../../socket');

const addPackage = async (req, res) => {
  const { packageId } = req.body;

  try {
    // Simulate adding a package to the storage (replace this with your actual logic)
    packages.push(packageId);

    // Notify connected clients about the new package
    // io.emit('packageAdded', { packageId, initialStatus });

    res.status(201).json({ success: true });
  } catch (error) {
    console.error('Error adding package:', error);
    res.status(500).json({ success: false, error: 'Failed to add package' });
  }
};

module.exports = addPackage;
