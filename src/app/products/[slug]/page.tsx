import { notFound } from 'next/navigation';
import { ProductDetailsView } from '@/components/products/ProductDetailsView';
import { INITIAL_PRODUCTS } from '@/lib/seedData';
import { Metadata } from 'next';

export async function generateStaticParams() {
  return INITIAL_PRODUCTS.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = INITIAL_PRODUCTS.find((p) => p.slug === slug);
  if (!product) return { title: 'Product Not Found' };

  return {
    title: `${product.name} — Rutuja Florals Studio`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [{ url: product.images[0] }],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = INITIAL_PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  const related = INITIAL_PRODUCTS.filter(
    (p) => p.category === product.category && p._id !== product._id
  );

  return (
    <ProductDetailsView
      product={product}
      relatedProducts={related.length > 0 ? related : INITIAL_PRODUCTS.filter(p => p._id !== product._id).slice(0, 3)}
    />
  );
}
