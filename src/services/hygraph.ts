import { GraphQLClient } from "graphql-request";

const hygraphUrl = import.meta.env.VITE_HYPGRAPH_URL;
const hygraphToken = import.meta.env.VITE_HYPGRAPH_TOKEN;

const hygraphClient = hygraphUrl ? new GraphQLClient(hygraphUrl, {
  headers: {
    Authorization: `Bearer ${hygraphToken || ''}`,
  },
}) : null;


export interface Blog {
  id: string;
  title: string;
  shortdes: string;
  content1: any;
  content2: any;
  content3: any;
  img: {
    url: string;
    fileName: string;
  };
  category: string;
  createdAt?: string;
}

export const getBlogs = async (): Promise<{
  blogs: Blog[];
  plays: Blog[];
  builds: Blog[];
  learns: Blog[];
  guides: Blog[];
}> => {
  try {
    if (!hygraphClient) {
      console.error("Hygraph client is not initialized. Please set VITE_HYGRAPH_URL and VITE_HYGRAPH_TOKEN in your environment variables.");
      return { blogs: [], plays: [], builds: [], learns: [], guides: [] };
    }

    const data = await hygraphClient.request(`
      query GetBlogs {
        blogs {
          id
          title
          shortdes
          richtext {
            html
          }
          richtext2 {
            html
          }
          img {
            url
            fileName
          }
          category
          createdAt
        }
      }
    `);

    const blogs: Blog[] = ((data as any).blogs || []).map((blog: any) => ({
      id: blog.id,
      title: blog.title,
      shortdes: blog.shortdes,
      content1: blog.richtext,
      content2: blog.richtext2,
      content3: null,
      img: blog.img,
      category: blog.category,
      createdAt: blog.createdAt
    }));

    // Sort newest → oldest
    blogs.sort(
      (a, b) =>
        Date.parse(String(b.createdAt ?? 0)) -
        Date.parse(String(a.createdAt ?? 0))
    );

    // Group by category
    const plays: Blog[] = [];
    const builds: Blog[] = [];
    const learns: Blog[] = [];
    const guides: Blog[] = [];

    blogs.forEach((b) => {
      const cat = b.category?.toLowerCase().trim();
      console.log('Blog category:', cat); // Debug
      switch (cat) {
        case "play":
          plays.push(b);
          break;
        case "build":
          builds.push(b);
          break;
        case "learn":
          learns.push(b);
          break;
        case "guide":
        case "guides":
          guides.push(b);
          break;
      }
    });
    
    console.log('Category counts:', { plays: plays.length, builds: builds.length, learns: learns.length, guides: guides.length });
    

    return { blogs, plays, builds, learns, guides };
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return { blogs: [], plays: [], builds: [], learns: [], guides: [] };
  }
};