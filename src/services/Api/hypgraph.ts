import { gql, GraphQLClient } from "graphql-request";

const hygraphUrl = process.env.NEXT_PUBLIC_HYPGRAPH_URL!;
const hygraphClient = new GraphQLClient(hygraphUrl);

type Blog = {
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
};

export const getBlogs = async () => {
  const data = await hygraphClient.request(gql`
    query GetBlogs {
      demos {
        id
        title
        shortdes
        content1
        content2
        content3
        img {
          url
          fileName
        }
        category
        createdAt
      }
    }
  `);

  const blogs: Blog[] = (data as any).demos || [];

  // sort newest → oldest
  blogs.sort(
    (a, b) =>
      Date.parse(String(b.createdAt ?? 0)) -
      Date.parse(String(a.createdAt ?? 0))
  );

  // group
  const plays: Blog[] = [];
  const builds: Blog[] = [];
  const learns: Blog[] = [];
  const guides: Blog[] = [];

  blogs.forEach((b) => {
    switch (b.category) {
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
        guides.push(b);
        break;
    }
  });

  return { blogs, plays, builds, learns, guides };
};