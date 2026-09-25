import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  GalleryItem,
  Inquiry,
  Project,
  Review,
  Service,
  ShopSettings,
  ThemeMode,
} from '../types';
import { storageService } from '../services/storageService';
import { useToast } from './ToastContext';

interface ShopContextType {
  settings: ShopSettings;
  services: Service[];
  projects: Project[];
  gallery: GalleryItem[];
  reviews: Review[];
  inquiries: Inquiry[];
  theme: ThemeMode;
  // Public filtered subsets
  activeServices: Service[];
  featuredServices: Service[];
  approvedReviews: Review[];
  featuredProjects: Project[];
  
  // Settings
  updateSettings: (newSettings: Partial<ShopSettings>) => void;
  // Services
  addService: (data: Omit<Service, 'id' | 'createdAt' | 'updatedAt'>) => Service;
  updateService: (id: string, updates: Partial<Service>) => void;
  deleteService: (id: string) => void;
  // Projects
  addProject: (data: Omit<Project, 'id' | 'createdAt'>) => Project;
  updateProject: (id: string, updates: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  // Gallery
  addGalleryItem: (data: Omit<GalleryItem, 'id' | 'createdAt'>) => GalleryItem;
  updateGalleryItem: (id: string, updates: Partial<GalleryItem>) => void;
  deleteGalleryItem: (id: string) => void;
  // Reviews
  addReview: (data: Omit<Review, 'id'>) => Review;
  updateReview: (id: string, updates: Partial<Review>) => void;
  deleteReview: (id: string) => void;
  toggleReviewApproval: (id: string) => void;
  // Inquiries
  submitInquiry: (data: Omit<Inquiry, 'id' | 'createdAt'>) => Inquiry;
  updateInquiryStatus: (id: string, status: Inquiry['status']) => void;
  deleteInquiry: (id: string) => void;
  // Theme
  toggleTheme: () => void;
  // Data management
  resetDemoData: () => void;
  clearAllData: () => void;
  exportDataJson: () => string;
  importDataJson: (jsonString: string) => boolean;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { success, error, info } = useToast();

  const [settings, setSettings] = useState<ShopSettings>(() => storageService.getSettings());
  const [services, setServices] = useState<Service[]>(() => storageService.getServices());
  const [projects, setProjects] = useState<Project[]>(() => storageService.getProjects());
  const [gallery, setGallery] = useState<GalleryItem[]>(() => storageService.getGallery());
  const [reviews, setReviews] = useState<Review[]>(() => storageService.getReviews());
  const [inquiries, setInquiries] = useState<Inquiry[]>(() => storageService.getInquiries());
  const [theme, setThemeState] = useState<ThemeMode>(() => storageService.getTheme());

  // Synchronize theme on mount
  useEffect(() => {
    storageService.setTheme(theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    const nextTheme: ThemeMode = theme === 'dark' ? 'light' : 'dark';
    setThemeState(nextTheme);
    storageService.setTheme(nextTheme);
  }, [theme]);

  // Derived filtered views
  const activeServices = services.filter(s => s.active);
  const featuredServices = activeServices.filter(s => s.featured);
  const approvedReviews = reviews.filter(r => r.approved);
  const featuredProjects = projects.filter(p => p.featured);

  // Settings
  const updateSettings = useCallback((newSettings: Partial<ShopSettings>) => {
    const updated = storageService.updateSettings(newSettings);
    setSettings(updated);
    success('Shop settings updated successfully');
  }, [success]);

  // Services CRUD
  const addService = useCallback((data: Omit<Service, 'id' | 'createdAt' | 'updatedAt'>) => {
    const created = storageService.addService(data);
    setServices(storageService.getServices());
    success(`Service "${created.title}" added successfully`);
    return created;
  }, [success]);

  const updateService = useCallback((id: string, updates: Partial<Service>) => {
    const updated = storageService.updateService(id, updates);
    if (updated) {
      setServices(storageService.getServices());
      success(`Service "${updated.title}" updated`);
    }
  }, [success]);

  const deleteService = useCallback((id: string) => {
    const ok = storageService.deleteService(id);
    if (ok) {
      setServices(storageService.getServices());
      info('Service removed from records');
    }
  }, [info]);

  // Projects CRUD
  const addProject = useCallback((data: Omit<Project, 'id' | 'createdAt'>) => {
    const created = storageService.addProject(data);
    setProjects(storageService.getProjects());
    success(`Project "${created.title}" added`);
    return created;
  }, [success]);

  const updateProject = useCallback((id: string, updates: Partial<Project>) => {
    const updated = storageService.updateProject(id, updates);
    if (updated) {
      setProjects(storageService.getProjects());
      success(`Project "${updated.title}" updated`);
    }
  }, [success]);

  const deleteProject = useCallback((id: string) => {
    const ok = storageService.deleteProject(id);
    if (ok) {
      setProjects(storageService.getProjects());
      info('Project deleted');
    }
  }, [info]);

  // Gallery CRUD
  const addGalleryItem = useCallback((data: Omit<GalleryItem, 'id' | 'createdAt'>) => {
    const created = storageService.addGalleryItem(data);
    setGallery(storageService.getGallery());
    success(`Image item "${created.title}" added to gallery`);
    return created;
  }, [success]);

  const updateGalleryItem = useCallback((id: string, updates: Partial<GalleryItem>) => {
    const updated = storageService.updateGalleryItem(id, updates);
    if (updated) {
      setGallery(storageService.getGallery());
      success(`Gallery item "${updated.title}" updated`);
    }
  }, [success]);

  const deleteGalleryItem = useCallback((id: string) => {
    const ok = storageService.deleteGalleryItem(id);
    if (ok) {
      setGallery(storageService.getGallery());
      info('Gallery image removed');
    }
  }, [info]);

  // Reviews CRUD
  const addReview = useCallback((data: Omit<Review, 'id'>) => {
    const created = storageService.addReview(data);
    setReviews(storageService.getReviews());
    if (data.approved) {
      success('Review posted successfully');
    } else {
      info('Review submitted! It will appear once approved by the administrator.');
    }
    return created;
  }, [success, info]);

  const updateReview = useCallback((id: string, updates: Partial<Review>) => {
    const updated = storageService.updateReview(id, updates);
    if (updated) {
      setReviews(storageService.getReviews());
      success('Review record updated');
    }
  }, [success]);

  const deleteReview = useCallback((id: string) => {
    const ok = storageService.deleteReview(id);
    if (ok) {
      setReviews(storageService.getReviews());
      info('Review record deleted');
    }
  }, [info]);

  const toggleReviewApproval = useCallback((id: string) => {
    const target = reviews.find(r => r.id === id);
    if (target) {
      const nextApproved = !target.approved;
      storageService.updateReview(id, { approved: nextApproved });
      setReviews(storageService.getReviews());
      info(nextApproved ? 'Review approved for public display' : 'Review unapproved');
    }
  }, [reviews, info]);

  // Inquiries CRUD
  const submitInquiry = useCallback((data: Omit<Inquiry, 'id' | 'createdAt'>) => {
    const created = storageService.addInquiry(data);
    setInquiries(storageService.getInquiries());
    success('Inquiry submitted successfully! Our engineering team will contact you shortly.');
    return created;
  }, [success]);

  const updateInquiryStatus = useCallback((id: string, status: Inquiry['status']) => {
    const updated = storageService.updateInquiryStatus(id, status);
    if (updated) {
      setInquiries(storageService.getInquiries());
      info(`Inquiry status updated to "${status}"`);
    }
  }, [info]);

  const deleteInquiry = useCallback((id: string) => {
    const ok = storageService.deleteInquiry(id);
    if (ok) {
      setInquiries(storageService.getInquiries());
      info('Inquiry record deleted');
    }
  }, [info]);

  // System Data
  const resetDemoData = useCallback(() => {
    storageService.resetToDemoData();
    setSettings(storageService.getSettings());
    setServices(storageService.getServices());
    setProjects(storageService.getProjects());
    setGallery(storageService.getGallery());
    setReviews(storageService.getReviews());
    setInquiries(storageService.getInquiries());
    success('Demonstration dataset restored to factory defaults');
  }, [success]);

  const clearAllData = useCallback(() => {
    storageService.clearAppData();
    setServices([]);
    setProjects([]);
    setGallery([]);
    setReviews([]);
    setInquiries([]);
    info('All application records cleared');
  }, [info]);

  const exportDataJson = useCallback(() => {
    return storageService.exportData();
  }, []);

  const importDataJson = useCallback((jsonString: string) => {
    const result = storageService.importData(jsonString);
    if (result.success) {
      setSettings(storageService.getSettings());
      setServices(storageService.getServices());
      setProjects(storageService.getProjects());
      setGallery(storageService.getGallery());
      setReviews(storageService.getReviews());
      setInquiries(storageService.getInquiries());
      success(result.message);
      return true;
    } else {
      error(result.message);
      return false;
    }
  }, [success, error]);

  return (
    <ShopContext.Provider
      value={{
        settings,
        services,
        projects,
        gallery,
        reviews,
        inquiries,
        theme,
        activeServices,
        featuredServices,
        approvedReviews,
        featuredProjects,
        updateSettings,
        addService,
        updateService,
        deleteService,
        addProject,
        updateProject,
        deleteProject,
        addGalleryItem,
        updateGalleryItem,
        deleteGalleryItem,
        addReview,
        updateReview,
        deleteReview,
        toggleReviewApproval,
        submitInquiry,
        updateInquiryStatus,
        deleteInquiry,
        toggleTheme,
        resetDemoData,
        clearAllData,
        exportDataJson,
        importDataJson,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
