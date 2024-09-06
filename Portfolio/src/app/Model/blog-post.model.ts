export interface BlogPost {
    id?: string;
    title: string;
    metaDescription: string;
    content: string; 
    featuredImageUrl: string;
    blogImages: { imageUrl: string; description: string }[]; 
    youtubeVideoLink?: string;
    }
  