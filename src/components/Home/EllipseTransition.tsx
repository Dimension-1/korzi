import { getCloudinaryUrl } from '../../utils/cloudinary';

export default function EllipseTransition() {
  return (
    <div className="hidden xl:block absolute -right-32 w-1/3 h-screen pointer-events-none z-0" style={{ top: '50%', transform: 'translateY(-50%)' }}>
      <img src={getCloudinaryUrl('/assets/homepage/Ellipse 81.png')} alt="" className="w-[1600px] h-[1600px] object-contain opacity-100" />
    </div>
  );
}