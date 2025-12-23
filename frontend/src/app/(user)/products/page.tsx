'use client';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import FilterSidebar from '@/components/products/FilterSidebar';
import SortDropdown from '@/components/products/SortDropdown';
import { RootState } from '@/store/store';
import useProduct from '@/hooks/useProduct';
import ProductList from '@/components/products/ProductList';

const ProductListingPage = () => {
  const { fetchProductsHandler, toggleSavingProductHandler, loading } = useProduct();
  const products = useSelector((state: RootState) => state.product.products);

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortOption, setSortOption] = useState<string>('price-asc');

  const categories = ['All', 'Clothing', 'Pottery', 'Jewelry', 'Home Decor'];

  useEffect(() => {
    if (products.length === 0) {
      fetchProductsHandler();
    }
  }, [fetchProductsHandler, products.length]);

  const filteredProducts = products.filter(
    (product) => selectedCategory === 'All' || product.category === selectedCategory
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === 'price-asc') return a.price - b.price;
    if (sortOption === 'price-desc') return b.price - a.price;
    return 0;
  });

  return (
    <div className="flex flex-col md:flex-row">
      {/* Sidebar for larger screens */}
      <div className="hidden md:block w-1/5">
        <FilterSidebar
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6">Product Listings</h1>

        {/* Sort Dropdown */}
        <SortDropdown sortOption={sortOption} onSortChange={setSortOption} />

        {/* Categories Dropdown for small screens */}
        <div className="md:hidden mt-4">
          <FilterSidebar
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </div>

        {/* Product Grid */}

        <ProductList 
        products={sortedProducts} 
        toggleSaveProduct={toggleSavingProductHandler}
        onClear={setSelectedCategory}
        loading={loading} />
      </div>
    </div>
  );
};


export default ProductListingPage;