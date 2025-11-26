import Footer from '../components/Home/footer';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-black text-white pt-24">
      <div className="max-w-4xl mx-auto px-6 md:px-8 pb-16">
        {/* Title */}
        <h1 
          className="text-center text-3xl md:text-5xl lg:text-7xl mb-8 md:mb-16 uppercase"
          style={{
            fontFamily: 'Bebas Neue',
            background: 'linear-gradient(100.06deg, #FFFFFF 1.37%, #999999 57.42%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}
        >
          PRIVACY POLICY
        </h1>

        {/* Content Sections */}
        <div className="space-y-8 md:space-y-12">
          {/* Section 1 */}
          <div>
            <h2 
              className="text-2xl md:text-3xl mb-4 md:mb-6"
              style={{
                fontFamily: 'DM Sans',
                color: '#02FF00',
                fontWeight: 400
              }}
            >
              Conclusion
            </h2>
            <div className="space-y-4 text-white" style={{ fontFamily: 'DM Sans', fontSize: '14px', lineHeight: '1.8' }}>
              <p>
                Morbi sed imperdiet in ipsum, adipiscing elit dui lectus. Tellus id scelerisque est ultricies ultricies. Duis est sit sed leo nisl, blandit elit sagittis. Quisque tristique consequat quam sed. Nisl at scelerisque amet nulla purus habitasse.
              </p>
              <p>
                Nunc sed faucibus bibendum feugiat sed interdum. Ipsum egestas condimentum mi massa. In tincidunt pharetra consectetur sed duis facilisis metus. Etiam egestas in nec sed et. Quis lobortis at sit dictum eget nibh tortor commodo cursus.
              </p>
              <p>
                Odio felis sagittis, morbi feugiat tortor vitae feugiat fusce aliquet. Nam elementum urna nisi aliquet erat dolor enim. Ornare id morbi eget ipsum. Aliquam senectus neque ut id eget consectetur dictum. Donec posuere pharetra odio consequat scelerisque et, nunc tortor.Nulla adipiscing erat a erat. Condimentum lorem posuere gravida enim posuere cursus diam.
              </p>
            </div>
          </div>

          {/* Section 2 */}
          <div>
            <h2 
              className="text-2xl md:text-3xl mb-4 md:mb-6"
              style={{
                fontFamily: 'DM Sans',
                color: '#02FF00',
                fontWeight: 400
              }}
            >
              Conclusion
            </h2>
            <div className="space-y-4 text-white" style={{ fontFamily: 'DM Sans', fontSize: '14px', lineHeight: '1.8' }}>
              <p>
                Morbi sed imperdiet in ipsum, adipiscing elit dui lectus. Tellus id scelerisque est ultricies ultricies. Duis est sit sed leo nisl, blandit elit sagittis. Quisque tristique consequat quam sed. Nisl at scelerisque amet nulla purus habitasse.
              </p>
              <p>
                Nunc sed faucibus bibendum feugiat sed interdum. Ipsum egestas condimentum mi massa. In tincidunt pharetra consectetur sed duis facilisis metus. Etiam egestas in nec sed et. Quis lobortis at sit dictum eget nibh tortor commodo cursus.
              </p>
              <p>
                Odio felis sagittis, morbi feugiat tortor vitae feugiat fusce aliquet. Nam elementum urna nisi aliquet erat dolor enim. Ornare id morbi eget ipsum. Aliquam senectus neque ut id eget consectetur dictum. Donec posuere pharetra odio consequat scelerisque et, nunc tortor.Nulla adipiscing erat a erat. Condimentum lorem posuere gravida enim posuere cursus diam.
              </p>
            </div>
          </div>

          {/* Section 3 */}
          <div>
            <h2 
              className="text-2xl md:text-3xl mb-4 md:mb-6"
              style={{
                fontFamily: 'DM Sans',
                color: '#02FF00',
                fontWeight: 400
              }}
            >
              Conclusion
            </h2>
            <div className="space-y-4 text-white" style={{ fontFamily: 'DM Sans', fontSize: '14px', lineHeight: '1.8' }}>
              <p>
                Morbi sed imperdiet in ipsum, adipiscing elit dui lectus. Tellus id scelerisque est ultricies ultricies. Duis est sit sed leo nisl, blandit elit sagittis. Quisque tristique consequat quam sed. Nisl at scelerisque amet nulla purus habitasse.
              </p>
              <p>
                Nunc sed faucibus bibendum feugiat sed interdum. Ipsum egestas condimentum mi massa. In tincidunt pharetra consectetur sed duis facilisis metus. Etiam egestas in nec sed et. Quis lobortis at sit dictum eget nibh tortor commodo cursus.
              </p>
              <p>
                Odio felis sagittis, morbi feugiat tortor vitae feugiat fusce aliquet. Nam elementum urna nisi aliquet erat dolor enim. Ornare id morbi eget ipsum. Aliquam senectus neque ut id eget consectetur dictum. Donec posuere pharetra odio consequat scelerisque et, nunc tortor.Nulla adipiscing erat a erat. Condimentum lorem posuere gravida enim posuere cursus diam.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
