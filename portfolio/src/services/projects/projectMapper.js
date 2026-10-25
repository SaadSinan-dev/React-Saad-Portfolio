const safeArray = (value) => (Array.isArray(value) ? value.filter(Boolean) : []);

export function legacyProjectToStoredProject(project) {
  return {
    title: project.titleEn,
    titleAr: project.titleAr || '',
    shortDescription: project.descShortEn || '',
    shortDescriptionAr: project.descShortAr || '',
    description: project.descLongEn || project.descShortEn || '',
    descriptionAr: project.descLongAr || project.descShortAr || '',
    focus: project.focusEn || '',
    focusAr: project.focusAr || '',
    features: safeArray(project.featuresEn),
    featuresAr: safeArray(project.featuresAr),
    technologies: safeArray(project.stack),
    liveUrl: project.demoUrl || '',
    githubUrl: project.codeUrl || '',
    category: project.category === 'web' ? 'web' : 'mobile',
    featured: Boolean(project.featured),
    order: Number.isFinite(Number(project.order)) ? Number(project.order) : Number(project.index) || 0,
    imageUrl: project.imageUrl || '',
    imageKeys: safeArray(project.imageKeys),
  };
}

export function storedProjectToPortfolioProject(id, project) {
  const technologies = safeArray(project.technologies ?? project.stack);
  const features = safeArray(project.features ?? project.featuresEn);
  const featuresAr = safeArray(project.featuresAr);

  return {
    id,
    firestoreId: id,
    category: project.category === 'web' ? 'web' : 'mobile',
    order: Number.isFinite(Number(project.order)) ? Number(project.order) : 0,
    featured: Boolean(project.featured),
    titleEn: project.title ?? project.titleEn ?? 'Untitled project',
    titleAr: project.titleAr || project.title || project.titleEn || 'Untitled project',
    descShortEn: project.shortDescription ?? project.descShortEn ?? project.description ?? '',
    descShortAr:
      project.shortDescriptionAr ||
      project.descShortAr ||
      project.shortDescription ||
      project.descShortEn ||
      project.description ||
      '',
    descLongEn: project.description ?? project.descLongEn ?? project.shortDescription ?? '',
    descLongAr:
      project.descriptionAr ||
      project.descLongAr ||
      project.description ||
      project.descLongEn ||
      project.shortDescription ||
      '',
    focusEn: project.focus ?? project.focusEn ?? '',
    focusAr: project.focusAr || project.focus || project.focusEn || '',
    featuresEn: features,
    featuresAr: featuresAr.length ? featuresAr : features,
    stack: technologies,
    demoUrl: project.liveUrl ?? project.demoUrl ?? '',
    codeUrl: project.githubUrl ?? project.codeUrl ?? '',
    imageUrl: project.imageUrl || '',
    imageUrls: safeArray(project.imageUrls),
    imageKeys: safeArray(project.imageKeys),
    createdAt: project.createdAt ?? null,
    updatedAt: project.updatedAt ?? null,
  };
}
