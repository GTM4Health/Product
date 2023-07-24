// backend/routes/projects.js
const express = require('express');
const router = express.Router();
const Project = require('../models/project');

// Route to create a new project
router.post('/', async (req, res) => {
  const { startupName, projectName, startDate, endDate } = req.body;

  try {
    // Create a new project instance
    const newProject = new Project({
      startupName,
      projectName,
      startDate,
      endDate,
    });

    // Save the project to the database
    await newProject.save();

    res.status(201).json({ message: 'Project successfully added!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add project. Please try again.' });
  }
});

// Fetch all projects
router.get('/projects-portal', async (req, res) => {
    try {
      const projects = await Project.find();
      res.json(projects);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

// Get the progress of a specific project by ID
router.get('/:projectId', async (req, res) => {
  const { projectId } = req.params;

  try {
    // Find the project by ID
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.json({ progress: project.progress });
  } catch (error) {
    console.error('Error fetching project progress:', error);
    res.status(500).json({ error: 'Failed to fetch project progress' });
  }
});



  // Update the progress of a project
router.put('/:projectId', async (req, res) => {
  const { projectId } = req.params;
  const { progress } = req.body;

  try {
    // Find the project by ID
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    // Update the progress field of the project
    project.progress = progress;
    await project.save();

    res.json({ message: 'Project progress updated successfully' });
  } catch (error) {
    console.error('Error updating project progress:', error);
    res.status(500).json({ error: 'Failed to update project progress' });
  }
});

module.exports = router;
