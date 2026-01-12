import React from 'react';
import { Helmet } from 'react-helmet-async';
export default function SEOHead({
  title,
  description,
  image,
  url,
  type = 'website'
}) {
  const siteTitle = "Devise Latam";
  const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  const siteDescription = description || "Agencia de diseño especializada en identidad visual, contenido audiovisual, fotografía y estampado de remeras. Transformamos tus ideas en impacto visual.";
  const siteUrl = url || "https://deviselatam.com.ar";
  const siteImage = image || "/og-image.jpg";
  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={siteDescription} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={siteDescription} />
      <meta property="og:image" content={siteImage} />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteTitle} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={siteDescription} />
      <meta name="twitter:image" content={siteImage} />

      {/* Canonical URL */}
      <link rel="canonical" href={siteUrl} />

      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />

      {/* Schema.org structured data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          "name": siteTitle,
          "description": siteDescription,
          "url": siteUrl,
          "logo": `${siteUrl}/logo.png`,
          "serviceType": "Marketing & Design Services",
          "areaServed": "Worldwide"
        })}
      </script>
    </Helmet>
  );
}