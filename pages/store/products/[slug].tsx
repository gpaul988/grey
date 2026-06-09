'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import StoreShell from '@/components/store/StoreShell';
import ProductCard from '@/components/store/ProductCard';
import { useStore } from '@/components/store/StoreContext';
import { api, displayUnit, formatPrice, type StoreProduct } from '@/components/store/lib';
import { FiHeart, FiGitMerge, FiStar, FiCheck, FiTruck, FiShield, FiMinus, FiPlus } from 'react-icons/fi';

interface Review { id: number; reviewer_name: string; rating: number; comment: string | null; created_at: string; }

export default function ProductDetail() {
    const router = useRouter();
    const { slug } = router.query as { slug: string };
    return (
        <StoreShell>
            {slug ? <Detail slug={slug} /> : null}
        </StoreShell>
    );
}

function Detail({ slug }: { slug: string }) {
    const { addToCart, toggleCompare, compare, currency, usdRate, toggleWishlist, isWishlisted } = useStore();
    const [product, setProduct] = useState<StoreProduct | null>(null);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [rating, setRating] = useState(0);
    const [related, setRelated] = useState<StoreProduct[]>([]);
    const [qty, setQty] = useState(1);
    const [activeImg, setActiveImg] = useState(0);
    const [tab, setTab] = useState<'specs' | 'reviews'>('specs');
    const [loading, setLoading] = useState(true);
    const [reviewForm, setReviewForm] = useState({ reviewer_name: '', rating: 5, comment: '' });
    const [reviewMsg, setReviewMsg] = useState('');

    useEffect(() => {
        setLoading(true);
        api<{ product: StoreProduct; reviews: Review[]; rating: number; related: StoreProduct[] }>(`/api/store/products/${slug}`)
            .then((d) => { setProduct(d.product); setReviews(d.reviews); setRating(d.rating); setRelated(d.related); })
            .catch(() => setProduct(null))
            .finally(() => setLoading(false));
    }, [slug]);

    if (loading) return <div className="st-card h-96 animate-pulse" />;
    if (!product) return <div className="st-card p-16 text-center text-[var(--st-muted)]">Product not found. <Link href="/store/products" className="text-[var(--st-teal)]">Back to shop</Link></div>;

    const inCompare = compare.some((p) => p.id === product.id);
    const wished = isWishlisted(product.id);
    const images = product.images?.length ? product.images : [product.thumbnail || ''];
    const off = product.compare_price && product.compare_price > product.price ? Math.round((1 - product.price / product.compare_price) * 100) : 0;

    const submitReview = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api(`/api/store/products/${slug}`, { method: 'POST', body: JSON.stringify(reviewForm) });
            setReviewMsg('Thanks! Your review is pending approval.');
            setReviewForm({ reviewer_name: '', rating: 5, comment: '' });
        } catch (err) { setReviewMsg((err as Error).message); }
    };

    return (
        <>
            <nav className="text-xs text-[var(--st-muted)] mb-5">
                <Link href="/store" className="st-link">Home</Link> / <Link href="/store/products" className="st-link">Products</Link> / <span className="text-[var(--st-text)]">{product.name}</span>
            </nav>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div>
                    <div className="st-card overflow-hidden aspect-square bg-[var(--st-surface-2)]">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={images[activeImg]} alt={product.name} className="w-full h-full object-cover" />
                    </div>
                    {images.length > 1 && (
                        <div className="flex gap-2 mt-3">
                            {images.map((im, i) => (
                                <button key={i} onClick={() => setActiveImg(i)} className={`w-16 h-16 rounded-lg overflow-hidden border-2 ${i === activeImg ? 'border-[var(--st-teal)]' : 'border-transparent'}`}>
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={im} alt="" className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <div>
                    <p className="text-sm uppercase tracking-wide text-[var(--st-muted)]">{product.brand_name} · {product.category_name}</p>
                    <h1 className="text-3xl font-extrabold mt-1">{product.name}</h1>
                    {rating > 0 && (
                        <div className="flex items-center gap-1 mt-2 text-amber-400 text-sm">
                            {Array.from({ length: 5 }).map((_, i) => <FiStar key={i} fill={i < Math.round(rating) ? 'currentColor' : 'none'} />)}
                            <span className="text-[var(--st-muted)] ml-1">{rating} ({reviews.length} reviews)</span>
                        </div>
                    )}
                    <div className="flex items-end gap-3 mt-4">
                        <span className="text-3xl font-extrabold text-[var(--st-teal)]">{displayUnit(product, currency, usdRate)}</span>
                        {off > 0 && <><span className="text-lg text-[var(--st-muted)] line-through">{formatPrice(product.compare_price!, currency, usdRate)}</span><span className="st-badge" style={{ background: 'rgba(239,68,68,.15)', color: '#f87171' }}>-{off}%</span></>}
                    </div>
                    <p className="text-[var(--st-muted)] mt-4 leading-relaxed">{product.description}</p>

                    <p className={`mt-4 text-sm flex items-center gap-2 ${product.stock > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                        <FiCheck /> {product.stock > 0 ? `In stock — ${product.stock} available` : 'Out of stock'}
                    </p>

                    <div className="flex items-center gap-3 mt-6">
                        <div className="flex items-center st-card">
                            <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-3 py-3 st-link"><FiMinus /></button>
                            <span className="w-10 text-center font-semibold">{qty}</span>
                            <button onClick={() => setQty(Math.min(product.stock, qty + 1))} className="px-3 py-3 st-link"><FiPlus /></button>
                        </div>
                        <button disabled={product.stock <= 0} onClick={() => addToCart(product, qty)} className="st-btn flex-1 py-3.5">Add to Cart</button>
                    </div>
                    <div className="flex gap-3 mt-3">
                        <button onClick={() => toggleCompare(product)} className={`st-btn-ghost flex-1 py-2.5 text-sm flex items-center justify-center gap-2 ${inCompare ? 'text-[var(--st-teal)] border-[var(--st-teal)]' : ''}`}><FiGitMerge /> {inCompare ? 'In Compare' : 'Compare'}</button>
                        <button onClick={() => toggleWishlist(product.id)} className={`st-btn-ghost flex-1 py-2.5 text-sm flex items-center justify-center gap-2 ${wished ? 'text-red-400 border-red-400' : ''}`}><FiHeart fill={wished ? 'currentColor' : 'none'} /> {wished ? 'Saved' : 'Wishlist'}</button>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mt-6">
                        <div className="st-card p-3 flex items-center gap-2 text-sm"><FiTruck className="text-[var(--st-teal)]" /> Nationwide delivery</div>
                        <div className="st-card p-3 flex items-center gap-2 text-sm"><FiShield className="text-[var(--st-teal)]" /> Warranty backed</div>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="mb-12">
                <div className="flex gap-6 border-b border-[var(--st-border)] mb-6">
                    <button onClick={() => setTab('specs')} className={`pb-3 font-semibold ${tab === 'specs' ? 'text-[var(--st-teal)] border-b-2 border-[var(--st-teal)]' : 'text-[var(--st-muted)]'}`}>Specifications</button>
                    <button onClick={() => setTab('reviews')} className={`pb-3 font-semibold ${tab === 'reviews' ? 'text-[var(--st-teal)] border-b-2 border-[var(--st-teal)]' : 'text-[var(--st-muted)]'}`}>Reviews ({reviews.length})</button>
                </div>

                {tab === 'specs' && (
                    <div className="st-card p-6">
                        {product.specs && Object.keys(product.specs).length > 0 ? (
                            <dl className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
                                {Object.entries(product.specs).map(([k, v]) => (
                                    <div key={k} className="flex justify-between border-b border-[var(--st-border)] pb-2">
                                        <dt className="text-[var(--st-muted)]">{k}</dt><dd className="font-medium text-right">{v}</dd>
                                    </div>
                                ))}
                            </dl>
                        ) : <p className="text-[var(--st-muted)]">No specifications listed.</p>}
                    </div>
                )}

                {tab === 'reviews' && (
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            {reviews.length === 0 && <p className="text-[var(--st-muted)]">No reviews yet. Be the first!</p>}
                            {reviews.map((r) => (
                                <div key={r.id} className="st-card p-4">
                                    <div className="flex justify-between items-center">
                                        <p className="font-semibold">{r.reviewer_name}</p>
                                        <div className="flex text-amber-400 text-sm">{Array.from({ length: 5 }).map((_, i) => <FiStar key={i} fill={i < r.rating ? 'currentColor' : 'none'} />)}</div>
                                    </div>
                                    {r.comment && <p className="text-[var(--st-muted)] text-sm mt-2">{r.comment}</p>}
                                </div>
                            ))}
                        </div>
                        <form onSubmit={submitReview} className="st-card p-6 h-fit space-y-3">
                            <p className="font-semibold">Write a Review</p>
                            <input required value={reviewForm.reviewer_name} onChange={(e) => setReviewForm({ ...reviewForm, reviewer_name: e.target.value })} placeholder="Your name" className="st-input" />
                            <div className="flex gap-1">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <button key={i} type="button" onClick={() => setReviewForm({ ...reviewForm, rating: i + 1 })} className="text-2xl text-amber-400"><FiStar fill={i < reviewForm.rating ? 'currentColor' : 'none'} /></button>
                                ))}
                            </div>
                            <textarea value={reviewForm.comment} onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })} placeholder="Share your experience…" rows={3} className="st-input" />
                            <button className="st-btn px-5 py-2.5 text-sm">Submit Review</button>
                            {reviewMsg && <p className="text-sm text-[var(--st-teal)]">{reviewMsg}</p>}
                        </form>
                    </div>
                )}
            </div>

            {related.length > 0 && (
                <div>
                    <h2 className="text-2xl font-bold mb-5">Related Products</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {related.map((p) => <ProductCard key={p.id} product={p} />)}
                    </div>
                </div>
            )}
        </>
    );
}
