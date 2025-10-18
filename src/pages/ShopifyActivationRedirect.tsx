import { useEffect } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

export default function ShopifyActivationRedirect() {
  const navigate = useNavigate();
  const { customerId, activationToken } = useParams();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    // Construct the full activation URL from the Shopify format
    let activationUrl = `https://korzi.toys/account/activate/${customerId}/${activationToken}`;
    
    // Add any additional query parameters (like syclid)
    const additionalParams = searchParams.toString();
    if (additionalParams) {
      activationUrl += `?${additionalParams}`;
    }
    
    // Redirect to our custom activation page with the URL as a parameter
    navigate(`/activate?url=${encodeURIComponent(activationUrl)}`);
  }, [customerId, activationToken, navigate, searchParams]);

  return (
    <div className="h-auto bg-[var(--background)] flex items-center justify-center px-4 sm:px-6 md:px-8 pt-10 sm:pt-12 md:pt-14 lg:pt-16">
      <div className="max-w-md w-full">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-[var(--foreground)] mb-2">
            Redirecting...
          </h1>
          <p className="text-[var(--text-secondary)]">
            Please wait while we redirect you to the activation page.
          </p>
        </div>
      </div>
    </div>
  );
}
