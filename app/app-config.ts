import{invertColor}from'./utils/colors';export interface SiteConfig{themeName?:string;appName:string;appAuthor?:string;appDescription?:string;tagline:string;menuItems:Array<{href:string;label:string}>;heroTitle:string;heroSubtitle?:string;heroDescription:string;heroBadge?:string;heroCTA?:string;heroCTALink?:string;heroStats?:Array<{label:string;value:string}>;enableHeroAnimation?:boolean;heroBackgroundImage?:string;heroImageUrl?:string;heroVideoUrl?:string;footerText:string;primaryColor:string;secondaryColor?:string;ogImage?:string;favicon?:string;seoTitle?:string;seoDescription?:string;seoKeywords?:string;projectPhase?:'planning'|'development'|'testing'|'staging'|'production'|'maintenance';appCategory?:string;industry?:string;projectTags?:string[];expectedLaunchDate?:string;actualLaunchDate?:string;maintenanceMode?:boolean;maintenanceMessage?:string;sitemapEnabled?:boolean;robotsTxtCustom?:string;redirectRules?:Array<{from:string;to:string;status:number}>;canonicalDomain?:string;cookieConsentEnabled?:boolean;gdprBannerEnabled?:boolean;privacyPolicyUrl?:string;termsOfServiceUrl?:string;notifyOnDeployFailure?:boolean;notifyOnDeploySuccess?:boolean;notificationEmail?:string;contentLanguage?:string;socialMediaLinks?:Array<{platform:string;url:string}>;pages:{[pageName:string]:{page_name:string;page_title:string;page_description:string;sections:Array<{id:string;content:string}>;is_published:boolean;meta_title?:string;meta_description?:string;page_slug?:string;meta_keywords?:string;og_title?:string;og_description?:string;og_image?:string;canonical_url?:string;is_featured?:boolean;sitemap_priority?:number;sitemap_changefreq?:string;noindex?:boolean;nofollow?:boolean;is_hidden?:boolean;requires_auth?:boolean;allowed_roles?:string[]}}}const siteConfig:SiteConfig={
  "themeName": "Glassmorphism",
  "appName": "Gagaqwfw123",
  "appAuthor": "GreenTech Team",
  "appDescription": "Sustainable technology solutions for a better tomorrow",
  "tagline": "Technology meets sustainability",
  "menuItems": [
    {
      "href": "/",
      "label": "Home"
    },
    {
      "href": "/solutions",
      "label": "Solutions"
    },
    {
      "href": "/technology",
      "label": "Technology"
    },
    {
      "href": "/impact",
      "label": "Impact"
    },
    {
      "href": "/about",
      "label": "About"
    },
    {
      "href": "/contact",
      "label": "Contact"
    }
  ],
  "heroTitle": "Building a Sustainable Future",
  "heroSubtitle": "Clean energy solutions that make a difference",
  "heroDescription": "Join us in revolutionizing the way we power our world. Our innovative green technology solutions help businesses reduce their carbon footprint while maintaining peak performance and efficiency.",
  "heroBadge": "🌱 Carbon Neutral",
  "heroCTA": "Start Your Journey",
  "heroCTALink": "/get-started",
  "heroStats": [
    {
      "label": "CO2 Saved",
      "value": "5M tons"
    },
    {
      "label": "Solar Panels",
      "value": "100K+"
    },
    {
      "label": "Green Jobs",
      "value": "10,000+"
    }
  ],
  "enableHeroAnimation": true,
  "heroImageUrl": "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&h=600&fit=crop",
  "footerText": "© 2025 GreenTech Innovations. Carbon neutral since 2020.",
  "primaryColor": "#10b981",
  "ogImage": "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?w=1200&h=630&fit=crop",
  "favicon": "https://api.dicebear.com/7.x/shapes/svg?seed=greentech",
  "seoTitle": "GreenTech Innovations | Sustainable Technology Solutions",
  "seoDescription": "Leading provider of sustainable technology and clean energy solutions. Helping businesses transition to renewable energy with cutting-edge green technology.",
  "seoKeywords": "green technology, sustainable energy, renewable solutions, clean tech, carbon neutral, solar power, environmental technology",
  "projectPhase": "development",
  "appCategory": "SaaS",
  "industry": "Technology",
  "projectTags": [
    "react",
    "typescript",
    "remix",
    "tailwind"
  ],
  "expectedLaunchDate": "2025-12-31T00:00:00+00:00",
  "maintenanceMode": false,
  "sitemapEnabled": true,
  "redirectRules": [],
  "canonicalDomain": "https://example.com",
  "cookieConsentEnabled": true,
  "gdprBannerEnabled": true,
  "privacyPolicyUrl": "https://example.com/privacy",
  "termsOfServiceUrl": "https://example.com/terms",
  "notifyOnDeployFailure": true,
  "notificationEmail": "dev@example.com",
  "secondaryColor":undefined,"pages": {
    "home": {
      "page_name": "home",
      "page_title": "Home",
      "page_description": "Welcome to your new App",
      "sections": [
        {
          "id": "welcome-section",
          "content": "<div class=\"container mx-auto px-4 py-16\"><div class=\"max-w-4xl mx-auto text-center\"><h1 class=\"text-5xl font-bold mb-6\">Welcome</h1><p class=\"text-xl text-gray-600 mb-8\">This is your home page. Edit this content in the Page Layout Editor to customize your app.</p></div></div>"
        }
      ],
      "is_published": false,
      "sitemap_priority": 0.5,
      "sitemap_changefreq": "monthly",
      "allowed_roles": []
    }
  }
};siteConfig.secondaryColor=undefined;Object.defineProperty(siteConfig,'secondaryColor',{get(){return invertColor(this.primaryColor)}});export default siteConfig;