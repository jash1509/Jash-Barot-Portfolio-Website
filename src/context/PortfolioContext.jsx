import { createContext, useState, useEffect } from 'react';
import defaultProfileData from '../data/profileData';
import defaultSkillsData from '../data/skillsData';
import defaultProjectsData from '../data/projectsData';
import defaultExperienceData from '../data/experienceData';
import { db, dbActive } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export const PortfolioContext = createContext();

export const PortfolioProvider = ({ children }) => {
  const [profile, setProfile] = useState(defaultProfileData);
  const [experiences, setExperiences] = useState(defaultExperienceData);
  const [skills, setSkills] = useState(defaultSkillsData);
  const [projects, setProjects] = useState(defaultProjectsData);
  const [isLoading, setIsLoading] = useState(true);
  const [syncMode, setSyncMode] = useState('local'); // 'local' or 'firebase'

  // Load fallback local storage data
  const loadLocalFallback = () => {
    try {
      const savedProfile = localStorage.getItem('pf_profile');
      const savedExp = localStorage.getItem('pf_experiences');
      const savedSkills = localStorage.getItem('pf_skills');
      const savedProj = localStorage.getItem('pf_projects');

      if (savedProfile) setProfile(JSON.parse(savedProfile));
      if (savedExp) setExperiences(JSON.parse(savedExp));
      if (savedSkills) setSkills(JSON.parse(savedSkills));
      if (savedProj) setProjects(JSON.parse(savedProj));
      
      setSyncMode('local');
    } catch (e) {
      console.error("Failed to load from local storage:", e);
    }
  };

  // Sync to database or local storage on change
  const saveProfile = async (newProfile) => {
    setProfile(newProfile);
    localStorage.setItem('pf_profile', JSON.stringify(newProfile));
    if (dbActive) {
      try {
        await setDoc(doc(db, 'portfolio', 'profile'), newProfile);
      } catch (err) {
        console.error("Firebase save profile failed:", err);
      }
    }
  };

  const saveExperiences = async (newExp) => {
    setExperiences(newExp);
    localStorage.setItem('pf_experiences', JSON.stringify(newExp));
    if (dbActive) {
      try {
        await setDoc(doc(db, 'portfolio', 'experience'), { list: newExp });
      } catch (err) {
        console.error("Firebase save experience failed:", err);
      }
    }
  };

  const saveSkills = async (newSkills) => {
    setSkills(newSkills);
    localStorage.setItem('pf_skills', JSON.stringify(newSkills));
    if (dbActive) {
      try {
        await setDoc(doc(db, 'portfolio', 'skills'), { categories: newSkills });
      } catch (err) {
        console.error("Firebase save skills failed:", err);
      }
    }
  };

  const saveProjects = async (newProj) => {
    setProjects(newProj);
    localStorage.setItem('pf_projects', JSON.stringify(newProj));
    if (dbActive) {
      try {
        await setDoc(doc(db, 'portfolio', 'projects'), { list: newProj });
      } catch (err) {
        console.error("Firebase save projects failed:", err);
      }
    }
  };

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      if (dbActive) {
        try {
          // Profile doc
          const pDoc = await getDoc(doc(db, 'portfolio', 'profile'));
          let currentProfile = defaultProfileData;
          if (pDoc.exists()) {
            currentProfile = pDoc.data();
            setProfile(currentProfile);
          } else {
            await setDoc(doc(db, 'portfolio', 'profile'), defaultProfileData);
          }

          // Experiences doc
          const eDoc = await getDoc(doc(db, 'portfolio', 'experience'));
          let currentExp = defaultExperienceData;
          if (eDoc.exists()) {
            currentExp = eDoc.data().list || [];
            setExperiences(currentExp);
          } else {
            await setDoc(doc(db, 'portfolio', 'experience'), { list: defaultExperienceData });
          }

          // Skills doc
          const sDoc = await getDoc(doc(db, 'portfolio', 'skills'));
          let currentSkills = defaultSkillsData;
          if (sDoc.exists()) {
            currentSkills = sDoc.data().categories || [];
            setSkills(currentSkills);
          } else {
            await setDoc(doc(db, 'portfolio', 'skills'), { categories: defaultSkillsData });
          }

          // Projects doc
          const prDoc = await getDoc(doc(db, 'portfolio', 'projects'));
          let currentProj = defaultProjectsData;
          if (prDoc.exists()) {
            currentProj = prDoc.data().list || [];
            setProjects(currentProj);
          } else {
            await setDoc(doc(db, 'portfolio', 'projects'), { list: defaultProjectsData });
          }

          // Save local copy for offline caching
          localStorage.setItem('pf_profile', JSON.stringify(currentProfile));
          localStorage.setItem('pf_experiences', JSON.stringify(currentExp));
          localStorage.setItem('pf_skills', JSON.stringify(currentSkills));
          localStorage.setItem('pf_projects', JSON.stringify(currentProj));

          setSyncMode('firebase');
        } catch (error) {
          console.error("Firebase read error, using local fallback:", error);
          loadLocalFallback();
        }
      } else {
        loadLocalFallback();
      }
      setIsLoading(false);
    };

    fetchData();
  }, []);

  // Actions
  const updateProfile = (updatedProfile) => {
    saveProfile(updatedProfile);
  };

  const addExperience = (exp) => {
    const newExp = [...experiences, { ...exp, id: Date.now() }];
    saveExperiences(newExp);
  };

  const updateExperience = (id, updatedExp) => {
    const newExp = experiences.map((exp) => (exp.id === id ? { ...updatedExp, id } : exp));
    saveExperiences(newExp);
  };

  const deleteExperience = (id) => {
    const newExp = experiences.filter((exp) => exp.id !== id);
    saveExperiences(newExp);
  };

  const addSkill = (categoryName, skillItem) => {
    const newSkills = skills.map((cat) => {
      if (cat.category.toLowerCase() === categoryName.toLowerCase()) {
        return {
          ...cat,
          skills: [...cat.skills, skillItem]
        };
      }
      return cat;
    });
    saveSkills(newSkills);
  };

  const deleteSkill = (categoryName, skillName) => {
    const newSkills = skills.map((cat) => {
      if (cat.category.toLowerCase() === categoryName.toLowerCase()) {
        return {
          ...cat,
          skills: cat.skills.filter((s) => s.name !== skillName)
        };
      }
      return cat;
    });
    saveSkills(newSkills);
  };

  const addProject = (project) => {
    const newProj = [...projects, { ...project, id: Date.now() }];
    saveProjects(newProj);
  };

  const updateProject = (id, updatedProj) => {
    const newProj = projects.map((p) => (p.id === id ? { ...updatedProj, id } : p));
    saveProjects(newProj);
  };

  const deleteProject = (id) => {
    const newProj = projects.filter((p) => p.id !== id);
    saveProjects(newProj);
  };

  const resetToDefaults = () => {
    saveProfile(defaultProfileData);
    saveExperiences(defaultExperienceData);
    saveSkills(defaultSkillsData);
    saveProjects(defaultProjectsData);
  };

  return (
    <PortfolioContext.Provider
      value={{
        profile,
        experiences,
        skills,
        projects,
        isLoading,
        syncMode,
        updateProfile,
        addExperience,
        updateExperience,
        deleteExperience,
        addSkill,
        deleteSkill,
        addProject,
        updateProject,
        deleteProject,
        resetToDefaults
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};
