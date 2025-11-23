export default function TroubleshootingSection() {
  return (
    <section className="bg-black text-white py-20 px-6 lg:px-12 relative" style={{ zIndex: 1 }}>
      {/* Green Bloom Effect */}
      <img 
        src="/assets/homepage/Ellipse80.png" 
        alt="" 
        className="absolute left-0 bottom-0 w-[800px] h-[800px] pointer-events-none"
        style={{
          transform: 'translate(-30%, 50%)',
          zIndex: -1
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-36">
          {/* Left Column */}
          <div className="lg:w-[400px] flex-shrink-0">
          <h1 
            className="uppercase text-3xl text-left mb-4 md:text-4xl lg:text-5xl"
            style={{
              fontFamily: 'Bebas Neue',
              lineHeight: '1',
              background: 'linear-gradient(100.06deg, #FFFFFF 1.37%, #999999 57.42%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
            >
              MACHINE NOT WORKING?
            </h1>
            <p className="text-white text-base mb-1">Try our troubleshooting guide :</p>
            <p className="text-white text-base">Most issues take under 3 minutes to fix.</p>
          </div>

          {/* Right Column - Issues Grid */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
            {/* Controller Not Responding */}
            <div>
              <div className="flex items-start gap-3 mb-3">
                <div className="w-1 h-6 bg-[#02FF00] flex-shrink-0 mt-0.5"></div>
                <h3 className="text-[#02FF00] text-base font-semibold whitespace-nowrap">CONTROLLER NOT RESPONDING?</h3>
              </div>
              <ul className="text-white text-sm space-y-1.5">
                <li>Pair the remote again.</li>
                <li>Check the battery terminals.</li>
                <li>Make sure the car battery is fully charged.</li>
              </ul>
            </div>

            {/* Steering Drifting */}
            <div>
              <div className="flex items-start gap-3 mb-3">
                <div className="w-1 h-6 bg-[#02FF00] flex-shrink-0 mt-0.5"></div>
                <h3 className="text-[#02FF00] text-base font-semibold whitespace-nowrap">STEERING DRIFTING OR PULLING?</h3>
              </div>
              <ul className="text-white text-sm space-y-1.5">
                <li>Adjust trim on the base of car.</li>
                <li>Check suspension arms for dust buildup.</li>
              </ul>
            </div>

            {/* Car Moving Slow */}
            <div>
              <div className="flex items-start gap-3 mb-3">
                <div className="w-1 h-6 bg-[#02FF00] flex-shrink-0 mt-0.5"></div>
                <h3 className="text-[#02FF00] text-base font-semibold whitespace-nowrap">CAR MOVING SLOW?</h3>
              </div>
              <ul className="text-white text-sm space-y-1.5">
                <li>Battery not fully charged.</li>
                <li>Check for debris around wheels or axles.</li>
                <li>Reset ESC ( Youtube channel button).</li>
              </ul>
            </div>

            {/* No Power */}
            <div>
              <div className="flex items-start gap-3 mb-3">
                <div className="w-1 h-6 bg-[#02FF00] flex-shrink-0 mt-0.5"></div>
                <h3 className="text-[#02FF00] text-base font-semibold whitespace-nowrap">NO POWER?</h3>
              </div>
              <ul className="text-white text-sm space-y-1.5">
                <li>Reconnect battery firmly.</li>
                <li>Try another cable.</li>
                <li>Ensure USB charger is compliant.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
