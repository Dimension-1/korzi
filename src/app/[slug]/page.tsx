import { notFound } from "next/navigation";
import Image from "next/image";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { getBlogs } from "@/services/Api/hypgraph";
import type { Metadata } from "next";

// Add metadata for better SEO and performance
export async function generateMetadata({ params }: { params: Promise<PageParams> }): Promise<Metadata> {
  const { slug } = await params;
  const blogs = await getCachedBlogs();
  const journal = blogs.find((blog: any) => blog.id === slug);
  
  if (!journal) {
    return {
      title: 'Journal Not Found',
    };
  }

  return {
    title: journal.title,
    description: journal.shortdes,
    openGraph: {
      title: journal.title,
      description: journal.shortdes,
      images: journal.img?.url ? [journal.img.url] : [],
    },
  };
}

interface PageParams {
  slug: string;
}

// Cache the blogs data to avoid multiple API calls
let cachedBlogs: any[] | null = null;

async function getCachedBlogs() {
  if (!cachedBlogs) {
    const { blogs } = await getBlogs();
    cachedBlogs = blogs;
  }
  return cachedBlogs;
}

export async function generateStaticParams() {
  try {
    const blogs = await getCachedBlogs();
    return blogs.map((blog: any) => ({
      slug: blog.id, // Using id as slug to match main page links
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

export default async function JournalDetailPage({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const { slug } = await params;

  // Get the journal from cached data by id
  const blogs = await getCachedBlogs();
  const journal = blogs.find((blog: any) => blog.id === slug);
  
  if (!journal) {
    notFound();
  }

  const { title, shortdes, content1, content2, content3, img, createdAt } = journal;

  // Format date as "Month, Year"
  const formattedDate = createdAt ? new Date(createdAt).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  }) : "";

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[var(--background)]">
        <div className="mx-auto px-6 md:px-24 py-16 md:py-24">
          {/* Header Image */}
          <div className="w-full h-[406px] md:h-[530px] mb-6 rounded-none bg-[#C8C8D0] flex items-center justify-center">
            {img?.url && (
              <Image
                src={img.url}
                alt={title}
                width={800}
                height={530}
                className="w-full h-full object-fit"
                priority
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
              />
            )}
          </div>

          {/* Date in right corner */}
          <div className="flex justify-end mb-2">
            <p className="text-base text-gray-400">
              {formattedDate.replace(" ", ", ")}
            </p>
          </div>

          {/* Title */}
          <h1 className="text-xl md:text-[40px] font-heading leading-tight mb-8 text-[var(--foreground)] max-w-4xl">
            {title}
          </h1>

          {/* Content Layout: Left 1 = content1, Right 1 = content2, Right 2 = content3, Left 2 = shortdes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
            {/* Left Column 1 - content1 */}
            <div className="max-w-[350px] md:max-w-[620px]">
              <p className="text-sm md:text-lg text-[var(--foreground)] leading-loose">
                {content1 || ""}
              </p>
              <div className="hidden md:block border-b border-[var(--border)] pt-20 max-w-xl"></div>
            </div>
            
            {/* Right Column 1 - content2 */}
            <div className="max-w-[350px] md:max-w-[620px]">
              <p className="text-sm md:text-lg text-[var(--foreground)] leading-loose">
                {content2 || ""}
              </p>
              <div className="md:hidden border-b border-[var(--border)] pt-10 max-w-xl"></div>
            </div>
          </div>

          {/* Second Row: Right 2 = content3, Left 2 = shortdes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
            {/* Left Column 2 - shortdes */}
            <div className="max-w-[360px] md:max-w-xl">
              <h2 className="text-2xl md:text-[32px] font-heading text-[var(--accent)] md:leading-[43px] md:tracking-[-1px]">
                {shortdes}
              </h2>
            </div>

            {/* Right Column 2 - content3 */}
            <div className="space-y-6 max-w-[340px] md:max-w-[550px]">
              <div>
                <p className="text-sm md:text-base text-[var(--foreground)] leading-relaxed">
                  {content3 || ""}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}