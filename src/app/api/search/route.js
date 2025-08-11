import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const query = searchParams.get('q');
        const type = searchParams.get('type') || 'all'; // all, categories, products, auctions
        const token_ = request.headers.get('authorization')?.replace('Token ', '');

        if (!query || query.trim().length < 2) {
            return NextResponse.json({ 
                data: { 
                    results: [],
                    total: 0,
                    query: query 
                }, 
                status: 200 
            });
        }

        const searchQuery = query.toLowerCase().trim();
        const results = [];
        const cacheBuster = `cache=${Date.now()}`;

        // Search Categories and Subcategories
        if (type === 'all' || type === 'categories') {
            try {
                const categoriesRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/commerce/categories_and_subcategories/?${cacheBuster}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    }
                });

                if (categoriesRes.ok) {
                    const categoriesData = await categoriesRes.json();
                    
                    categoriesData?.data?.forEach((category) => {
                        // Search in category name
                        if (category.category.toLowerCase().includes(searchQuery)) {
                            results.push({
                                id: category.id,
                                name: category.category,
                                type: 'category',
                                url: `/categories/${category.category}`,
                                description: `Category: ${category.category}`,
                                image: null
                            });
                        }

                        // Search in subcategories
                        category.subcategories?.forEach((subcategory) => {
                            if (typeof subcategory === 'string' && subcategory.toLowerCase().includes(searchQuery)) {
                                results.push({
                                    id: `${category.id}-${subcategory}`,
                                    name: subcategory,
                                    type: 'subcategory',
                                    url: `/categories/${category.category}?sub=${subcategory}`,
                                    description: `Subcategory of ${category.category}`,
                                    image: null
                                });
                            }
                        });
                    });
                }
            } catch (error) {
                console.error('Error searching categories:', error);
            }
        }

        // Search Products (Featured, Top Deals, etc.)
        if (type === 'all' || type === 'products') {
            const productEndpoints = [
                '/commerce/featured_products/',
                '/commerce/top_deals_products/',
                '/commerce/top_week_products/'
            ];

            for (const endpoint of productEndpoints) {
                try {
                    const productsRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${endpoint}?${cacheBuster}`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        }
                    });

                    if (productsRes.ok) {
                        const productsData = await productsRes.json();
                        
                        productsData?.data?.forEach((product) => {
                            if (product.name && product.name.toLowerCase().includes(searchQuery)) {
                                results.push({
                                    id: product.id,
                                    name: product.name,
                                    type: 'product',
                                    url: `/categories/productdetails/${product.id}`,
                                    description: `Product - ${product.price ? `₦${product.price}` : 'Price not available'}`,
                                    image: product.images && product.images.length > 0 ? product.images[0].image : null,
                                    price: product.price,
                                    category: product.category
                                });
                            }
                        });
                    }
                } catch (error) {
                    console.error(`Error searching products from ${endpoint}:`, error);
                }
            }
        }

        // Search Auctions
        if (type === 'all' || type === 'auctions') {
            try {
                const auctionsRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auction/auctions/?${cacheBuster}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    }
                });

                if (auctionsRes.ok) {
                    const auctionsData = await auctionsRes.json();
                    
                    auctionsData?.data?.forEach((auction) => {
                        if (auction.name && auction.name.toLowerCase().includes(searchQuery)) {
                            results.push({
                                id: auction.id,
                                name: auction.name,
                                type: 'auction',
                                url: `/auction/productdetails/${auction.id}`,
                                description: `Auction - ${auction.ticket_price ? `₦${auction.ticket_price} per ticket` : 'Ticket price not available'}`,
                                image: auction.images && auction.images.length > 0 ? auction.images[0].image : null,
                                price: auction.ticket_price,
                                category: auction.category
                            });
                        }
                    });
                }
            } catch (error) {
                console.error('Error searching auctions:', error);
            }
        }

        // Search Community Posts (if user is authenticated)
        if ((type === 'all' || type === 'posts') && token_) {
            try {
                const postsRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/user/trending_posts/?${cacheBuster}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': `Token ${token_}`
                    }
                });

                if (postsRes.ok) {
                    const postsData = await postsRes.json();
                    
                    postsData?.data?.forEach((post) => {
                        if (post.content && post.content.toLowerCase().includes(searchQuery)) {
                            results.push({
                                id: post.id,
                                name: post.content.substring(0, 50) + (post.content.length > 50 ? '...' : ''),
                                type: 'post',
                                url: `/community`,
                                description: `Community post by ${post.user?.username || 'User'}`,
                                image: null,
                                author: post.user?.username
                            });
                        }
                    });
                }
            } catch (error) {
                console.error('Error searching posts:', error);
            }
        }

        // Remove duplicates based on id and type
        const uniqueResults = results.filter((result, index, self) => 
            index === self.findIndex(r => r.id === result.id && r.type === result.type)
        );

        // Sort results by relevance (exact matches first, then partial matches)
        const sortedResults = uniqueResults.sort((a, b) => {
            const aExact = a.name.toLowerCase() === searchQuery;
            const bExact = b.name.toLowerCase() === searchQuery;
            
            if (aExact && !bExact) return -1;
            if (!aExact && bExact) return 1;
            
            // Then sort by type priority: categories > products > auctions > posts
            const typePriority = { category: 4, subcategory: 3, product: 2, auction: 1, post: 0 };
            return typePriority[b.type] - typePriority[a.type];
        });

        return NextResponse.json({ 
            data: { 
                results: sortedResults.slice(0, 20), // Limit to 20 results
                total: sortedResults.length,
                query: query,
                type: type
            }, 
            status: 200 
        });

    } catch (error) {
        console.error('Error processing search request:', error.message);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
} 