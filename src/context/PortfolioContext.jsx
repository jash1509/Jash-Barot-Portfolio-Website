import { createContext, useState, useEffect } from 'react';
import defaultProfileData from '../data/profileData';
import defaultSkillsData from '../data/skillsData';
import defaultProjectsData from '../data/projectsData';
import defaultExperienceData from '../data/experienceData';
import { db, dbActive } from '../firebase';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';

export const PortfolioContext = createContext();

// ── Normalizers ─────────────────────────────────────────────────────────────
// Admin panel saves: { title, company, points, tags, type, duration, description }
// Portfolio reads:   { role, company, highlights, technologies, type, typeLabel, duration, description }
const normalizeExperience = (raw) => ({
  id:           raw.id          ?? raw.id,
  role:         raw.role        ?? raw.title       ?? '',   // admin saves "title"
  company:      raw.company     ?? '',
  duration:     raw.duration    ?? '',
  type:         (raw.type       ?? 'internship').toLowerCase(),
  typeLabel:    raw.typeLabel   ?? raw.type        ?? 'Internship',
  description:  raw.description ?? '',
  highlights:   raw.highlights  ?? raw.points      ?? [],   // admin saves "points"
  technologies: raw.technologies?? raw.tags        ?? [],   // admin saves "tags"
});

// Admin panel saves: { title, description, tags, github, live, featured, imageUrl }
// Portfolio reads:   { id, title, description, technologies, github, liveDemo, featured, imageUrl }
const normalizeProject = (raw) => ({
  id:           raw.id          ?? Date.now(),
  title:        raw.title       ?? '',
  description:  raw.description ?? '',
  technologies: raw.technologies?? raw.tags        ?? [],   // admin saves "tags"
  github:       raw.github      ?? null,
  liveDemo:     raw.liveDemo    ?? raw.live        ?? null, // admin saves "live"
  featured:     raw.featured    ?? false,
  imageUrl:     raw.imageUrl    ?? '',
});

// Admin panel saves flat profile fields; portfolio reads nested { education, stats, titles[] }
const normalizeProfile = (raw) => {
  // If it already has the nested shape (old format), return as-is
  if (raw.education && raw.stats && Array.isArray(raw.titles)) return raw;

  // New flat format saved by admin panel
  return {
    ...defaultProfileData,
    name:     raw.name     ?? defaultProfileData.name,
    fullName: raw.fullName ?? defaultProfileData.fullName,
    bio:      raw.bio      ?? defaultProfileData.bio,
    email:    raw.email    ?? defaultProfileData.email,
    phone:    raw.phone    ?? defaultProfileData.phone,
    github:   raw.github   ?? defaultProfileData.github,
    linkedin: raw.linkedin ?? defaultProfileData.linkedin,
    titles:   raw.titles   ?? [raw.tagline ?? defaultProfileData.titles[0]],
    education: {
      degree:   raw.education ?? defaultProfileData.education.degree,
      college:  raw.institution ?? defaultProfileData.education.college,
      duration: raw.year       ?? defaultProfileData.education.duration,
      location: defaultProfileData.education.location,
    },
    stats: {
      projectsCount: raw.statsProjects ?? defaultProfileData.stats.projectsCount,
      techCount:     raw.statsTech     ?? defaultProfileData.stats.techCount,
      gptsCount:     raw.statsGPT      ?? defaultProfileData.stats.gptsCount,
    },
  };
};
// ────────────────────────────────────────────────────────────────────────────

export const PortfolioProvider = ({ children }) => {
  const [profile, setProfile] = useState(defaultProfileData);
  const [experiences, setExperiences] = useState(defaultExperienceData);
  const [skills, setSkills] = useState(defaultSkillsData);
  const [projects, setProjects] = useState(defaultProjectsData);
  const [isLoading, setIsLoading] = useState(true);
  const [syncMode, setSyncMode] = useState('local');

  // Load fallback local storage data
  const loadLocalFallback = () => {
    try {
      const savedProfile = localStorage.getItem('pf_profile');
      const savedExp = localStorage.getItem('pf_experiences');
      const savedSkills = localStorage.getItem('pf_skills');
      const savedProj = localStorage.getItem('pf_projects');

      if (savedProfile) setProfile(normalizeProfile(JSON.parse(savedProfile)));
      if (savedExp) setExperiences(JSON.parse(savedExp).map(normalizeExperience));
      if (savedSkills) setSkills(JSON.parse(savedSkills));
      if (savedProj) setProjects(JSON.parse(savedProj).map(normalizeProject));

      setSyncMode('local');
    } catch (e) {
      console.error('Failed to load from local storage:', e);
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
        console.error('Firebase save profile failed:', err);
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
        console.error('Firebase save experience failed:', err);
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
        console.error('Firebase save skills failed:', err);
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
        console.error('Firebase save projects failed:', err);
      }
    }
  };

  // Set up real-time listener for database changes
  useEffect(() => {
    if (!dbActive) {
      loadLocalFallback();
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    const loadedDocs = new Set();

    const markLoaded = (key) => {
      loadedDocs.add(key);
      if (loadedDocs.size === 4) {
        setIsLoading(false);
        setSyncMode('firebase');
      }
    };

    // 1. Profile
    const unsubProfile = onSnapshot(doc(db, 'portfolio', 'profile'), async (snapshot) => {
      if (snapshot.exists()) {
        const data = normalizeProfile(snapshot.data());
        setProfile(data);
        localStorage.setItem('pf_profile', JSON.stringify(data));
      } else {
        setProfile(defaultProfileData);
        localStorage.setItem('pf_profile', JSON.stringify(defaultProfileData));
        try {
          await setDoc(doc(db, 'portfolio', 'profile'), defaultProfileData);
        } catch (err) {
          console.error('Error creating default profile doc:', err);
        }
      }
      markLoaded('profile');
    }, (error) => {
      console.error('Firebase read profile error, using local/default fallback:', error);
      const saved = localStorage.getItem('pf_profile');
      if (saved) setProfile(normalizeProfile(JSON.parse(saved)));
      markLoaded('profile');
    });

    // 2. Experience
    const unsubExperience = onSnapshot(doc(db, 'portfolio', 'experience'), async (snapshot) => {
      if (snapshot.exists()) {
        const data = (snapshot.data().list || []).map(normalizeExperience);
        setExperiences(data);
        localStorage.setItem('pf_experiences', JSON.stringify(data));
      } else {
        setExperiences(defaultExperienceData);
        localStorage.setItem('pf_experiences', JSON.stringify(defaultExperienceData));
        try {
          await setDoc(doc(db, 'portfolio', 'experience'), { list: defaultExperienceData });
        } catch (err) {
          console.error('Error creating default experience doc:', err);
        }
      }
      markLoaded('experience');
    }, (error) => {
      console.error('Firebase read experience error:', error);
      const saved = localStorage.getItem('pf_experiences');
      if (saved) setExperiences(JSON.parse(saved).map(normalizeExperience));
      markLoaded('experience');
    });

    // 3. Skills
    const unsubSkills = onSnapshot(doc(db, 'portfolio', 'skills'), async (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data().categories || [];
        setSkills(data);
        localStorage.setItem('pf_skills', JSON.stringify(data));
      } else {
        setSkills(defaultSkillsData);
        localStorage.setItem('pf_skills', JSON.stringify(defaultSkillsData));
        try {
          await setDoc(doc(db, 'portfolio', 'skills'), { categories: defaultSkillsData });
        } catch (err) {
          console.error('Error creating default skills doc:', err);
        }
      }
      markLoaded('skills');
    }, (error) => {
      console.error('Firebase read skills error:', error);
      const saved = localStorage.getItem('pf_skills');
      if (saved) setSkills(JSON.parse(saved));
      markLoaded('skills');
    });

    // 4. Projects
    const unsubProjects = onSnapshot(doc(db, 'portfolio', 'projects'), async (snapshot) => {
      if (snapshot.exists()) {
        const data = (snapshot.data().list || []).map(normalizeProject);
        setProjects(data);
        localStorage.setItem('pf_projects', JSON.stringify(data));
      } else {
        setProjects(defaultProjectsData);
        localStorage.setItem('pf_projects', JSON.stringify(defaultProjectsData));
        try {
          await setDoc(doc(db, 'portfolio', 'projects'), { list: defaultProjectsData });
        } catch (err) {
          console.error('Error creating default projects doc:', err);
        }
      }
      markLoaded('projects');
    }, (error) => {
      console.error('Firebase read projects error:', error);
      const saved = localStorage.getItem('pf_projects');
      if (saved) setProjects(JSON.parse(saved).map(normalizeProject));
      markLoaded('projects');
    });

    return () => {
      unsubProfile();
      unsubExperience();
      unsubSkills();
      unsubProjects();
    };
  }, []);

  // Actions
  const updateProfile = (updatedProfile) => saveProfile(updatedProfile);

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
