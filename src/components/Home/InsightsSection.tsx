import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { getBlogs, Blog } from '../../services/hygraph';

export default function InsightsSection() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { blogs } = await getBlogs();
        setBlogs(blogs.slice(0, 4));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching blogs:', error);
        setLoading(false);
      }
    })();
  }, []);

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  if (loading) {
    return null;
  }

  return (
    <section className="bg-black py-16 px-8 -mt-32">
      <div className="max-w-[95%] 2xl:max-w-[90%] mx-auto">
        <h2 
          className="text-center uppercase text-white mb-12"
          style={{
            fontFamily: 'Bebas Neue',
            fontSize: '64px',
            lineHeight: '72px',
            letterSpacing: '0.1em'
          }}
        >
          INSIGHTS, PRESS & MORE
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {blogs.map((blog) => (
            <Link 
              key={blog.id} 
              to={`/logs/${blog.id}`}
              state={{ journal: blog }}
              className="border border-gray-700 bg-black overflow-hidden hover:border-[#02FF00] transition-colors group z-30"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img 
                  src={blog.img?.url || '/placeholder.jpg'} 
                  alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6 space-y-3">
                <h3 
                  className="text-[#02FF00] uppercase line-clamp-2"
                  style={{ fontFamily: 'Bebas Neue', fontSize: '20px', lineHeight: '24px' }}
                >
                  {blog.title}
                </h3>
                <p 
                  className="text-gray-400 line-clamp-2"
                  style={{ fontFamily: 'DM Sans', fontSize: '14px', lineHeight: '20px' }}
                >
                  {blog.shortdes}
                </p>
                <p 
                  className="text-gray-500 text-sm"
                  style={{ fontFamily: 'DM Sans' }}
                >
                  {formatDate(blog.createdAt)}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="flex justify-center">
          <Link 
            to="/logs"
            className="bg-[#3A3A3A] text-white px-8 py-4 flex items-center gap-3 border-l-4 border-[#02FF00] group relative overflow-hidden"
          >
            <span className="absolute inset-0 bg-[#02FF00] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></span>
            <span className="relative z-10 group-hover:text-black transition-colors duration-300" style={{ fontFamily: 'DM Sans', fontSize: '16px', letterSpacing: '0.1em' }}>EXPLORE MORE</span>
            <ArrowUpRight className="relative z-10 w-5 h-5 text-[#02FF00] group-hover:text-black transition-colors duration-300" />
          </Link>
        </div>
      </div>
    </section>
  );
}
