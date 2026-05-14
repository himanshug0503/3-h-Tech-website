import { homeContent, projectsContent } from "../data/content.js";

export const getHomeContent = (req, res) => {
  res.json(homeContent);
};

export const getProjectsContent = (req, res) => {
  res.json(projectsContent);
};
