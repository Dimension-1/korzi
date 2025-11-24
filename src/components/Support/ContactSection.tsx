import { ArrowUpRight } from 'lucide-react';

export default function ContactSection() {
  return (
    <section className="bg-black text-white py-20 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto" style={{ position: 'relative', zIndex: 10 }}>
        <div className="border border-white/30 px-12 py-16 bg-[#0F0F0F]">
          <div className="mb-12">
            <h2 className="text-[48px] leading-[48px] uppercase mb-6" style={{ 
              fontFamily: 'Bebas Neue',
              background: 'linear-gradient(100.06deg, #FFFFFF 1.37%, #999999 57.42%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              CONTACT KORZI SUPPORT
            </h2>
          </div>

          <div className="flex justify-between items-start">
            <div>
              <p className="text-white text-[16px] leading-[24px] mb-2">
                Machines need care. We're here to keep yours moving.
              </p>
              <p className="text-white text-[16px] leading-[24px] mb-8">
                If you're stuck, confused, or unsure message us. We'll handle the rest.
              </p>
              
              <div className="flex gap-8">
              <div>
                <span className="text-[#02FF00] text-[14px]">Email: </span>
                <span className="text-white text-[14px]">support@korzi.toys</span>
              </div>
              <div>
                <span className="text-[#02FF00] text-[14px]">Workshop: </span>
                <span className="text-white text-[14px]">JP Nagar, Bangalore</span>
              </div>
              <div>
                <span className="text-[#02FF00] text-[14px]">Response Time: </span>
                <span className="text-white text-[14px]">12–24 hours</span>
              </div>
              </div>
            </div>

            <div>
              <p className="text-white text-[16px] leading-[24px] mb-2">
                Real humans.
              </p>
              <p className="text-white text-[16px] leading-[24px] mb-8">
                Available 10am – 6pm, Monday – Friday.
              </p>
              
              <button className="bg-[#393737] text-white flex items-center justify-center gap-2 border-l-[4px] border-[#02FF00] group relative overflow-hidden cursor-pointer" style={{ width: '160px', height: '46px' }}>
                <span className="absolute inset-0 bg-[#02FF00] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></span>
                <span className="relative z-10 group-hover:text-black transition-colors duration-300 text-[13px] leading-[16px] uppercase font-medium">
                  CONTACT US
                </span>
                <ArrowUpRight className="relative z-10 w-3.5 h-3.5 text-[#02FF00] group-hover:text-black transition-colors duration-300" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
