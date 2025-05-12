import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import Card, { CardTitle } from '../../components/common/cards/Card';
import Button from '../../components/common/buttons/Button';
import useProduct from '../../hooks/useProduct';
import useCart from '../../hooks/useCart';
import ProductPrice from '../../components/features/product/ProductPrice';
import ProductSizeSelector from '../../components/features/product/ProductSizeSelector';
import ProductQuantitySelector from '../../components/features/product/ProductQuantitySelector';
import ProductFeatures from '../../components/features/product/ProductFeatures';
import ProductGallery from '../../components/features/product/ProductGallery';
import AddToCartButton from '../../components/features/product/AddToCartButton';

/**
 * ProductDetailsPage
 * 
 * Displays detailed information about a product and allows the user to add it to cart.
 */
const ProductDetailsPage = () => {
  const { id } = useParams();
  const { isArabic } = useLanguage();
  const { 
    product, 
    loading, 
    error, 
    relatedProducts,
    relatedLoading,
    selectedImage,
    selectedSize,
    quantity,
    incrementQuantity,
    decrementQuantity,
    changeImage,
    changeSize
  } = useProduct(id);
  const { addItem } = useCart();
  
  // Texts based on language
  const texts = {
    loading: isArabic ? 'جاري التحميل...' : 'Loading...',
    notFound: isArabic ? 'المنتج غير موجود' : 'Product Not Found',
    notFoundDesc: isArabic ? 'عذراً، لم نتمكن من العثور على المنتج الذي تبحث عنه.' : 'Sorry, we could not find the product you are looking for.',
    backToProducts: isArabic ? 'العودة إلى المنتجات' : 'Back to Products',
    description: isArabic ? 'الوصف' : 'Description',
    relatedProducts: isArabic ? 'منتجات ذات صلة' : 'Related Products',
    error: isArabic ? 'حدث خطأ أثناء تحميل المنتج' : 'Error loading product',
    tryAgain: isArabic ? 'حاول مرة أخرى' : 'Try Again',
  };

  // Get localized product data
  const getLocalizedData = (product) => {
    if (!product) return {};
    
    return {
      ...product,
      name: isArabic ? product.name : (product.nameEn || product.name),
      description: isArabic ? product.description : (product.descriptionEn || product.description),
    };
  };

  // Get selected size object and price
  const getSelectedSizeAndPrice = () => {
    if (!product || !selectedSize) return { size: null, price: product?.price || 0 };
    
    const sizeObj = product.sizes.find(s => s.id === selectedSize);
    return {
      size: sizeObj,
      price: sizeObj?.price || product.price
    };
  };

  // Add to cart handler
  const handleAddToCart = async () => {
    if (!product || !selectedSize) return;
    
    const { size, price } = getSelectedSizeAndPrice();
    
    const item = {
      productId: product.id,
      name: getLocalizedData(product).name,
      price,
      quantity,
      sizeId: size.id,
      sizeName: isArabic ? size.name : (size.nameEn || size.name),
      image: product.images[0] || product.image,
    };
    
    await addItem(item);
  };

  // Loading state
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-10 w-40 bg-gray-300 dark:bg-gray-700 rounded mb-4"></div>
          <div className="h-4 w-1/4 bg-gray-300 dark:bg-gray-700 rounded mb-8"></div>
          <div className="h-64 w-64 bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
        </div>
        <p className="text-xl text-gray-600 dark:text-gray-400 mt-6">{texts.loading}</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="bg-red-100 dark:bg-red-900/20 p-8 rounded-lg">
          <svg className="w-16 h-16 text-red-500 dark:text-red-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">{texts.error}</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">{error}</p>
          <Link to="/products">
            <Button variant="outline">
              {texts.backToProducts}
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // Not found state
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="bg-yellow-100 dark:bg-yellow-900/20 p-8 rounded-lg">
          <svg className="w-16 h-16 text-yellow-500 dark:text-yellow-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">{texts.notFound}</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">{texts.notFoundDesc}</p>
          <Link to="/products">
            <Button variant="outline">
              {texts.backToProducts}
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // When product is loaded
  const localizedProduct = getLocalizedData(product);
  const { size, price } = getSelectedSizeAndPrice();

  return (
    <div className="bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        {/* Product Details */}
        <Card className="mb-12">
          <div className="md:flex">
            {/* Product Images */}
            <div className="md:w-1/2 p-6">
              <ProductGallery
                images={product.images}
                alt={localizedProduct.name}
                selectedImage={selectedImage}
                onImageChange={changeImage}
              />
            </div>
            
            {/* Product Info */}
            <div className="md:w-1/2 p-6">
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                {localizedProduct.name}
              </h1>
              
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {localizedProduct.description}
              </p>
              
              {/* Price */}
              <ProductPrice
                price={price}
                oldPrice={product.oldPrice}
                discount={product.discount}
                size="large"
              />
              
              {/* Size Selector */}
              <ProductSizeSelector
                sizes={product.sizes}
                selectedSizeId={selectedSize}
                onChange={changeSize}
              />
              
              {/* Quantity Selector */}
              <ProductQuantitySelector
                quantity={quantity}
                onIncrement={incrementQuantity}
                onDecrement={decrementQuantity}
              />
              
              {/* Add to Cart Button */}
              <AddToCartButton
                onClick={handleAddToCart}
                disabled={!selectedSize}
                className="mb-4"
              />
              
              {/* Features */}
              <ProductFeatures features={product.features} />
            </div>
          </div>
          
          {/* Detailed Description */}
          <div className="p-6 border-t border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
              {texts.description}
            </h2>
            
            <p className="text-gray-600 dark:text-gray-400">
              {localizedProduct.description}
            </p>
          </div>
        </Card>
        
        {/* Related Products */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
            {texts.relatedProducts}
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedLoading ? (
              // Related products loading skeleton
              [...Array(4)].map((_, i) => (
                <Card key={i} className="animate-pulse h-72" />
              ))
            ) : relatedProducts.length > 0 ? (
              // Related products loaded
              relatedProducts.map(relatedProduct => {
                const localizedRelated = getLocalizedData(relatedProduct);
                return (
                  <Link key={relatedProduct.id} to={`/products/${relatedProduct.id}`}>
                    <Card className="h-full flex flex-col">
                      <div className="h-48 rounded-lg overflow-hidden mb-3">
                        <img 
                          src={relatedProduct.image} 
                          alt={localizedRelated.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardTitle>{localizedRelated.name}</CardTitle>
                      <ProductPrice 
                        price={relatedProduct.price}
                        oldPrice={relatedProduct.oldPrice}
                        discount={relatedProduct.discount}
                        size="small"
                      />
                    </Card>
                  </Link>
                );
              })
            ) : (
              // No related products
              <div className="col-span-4 text-center py-8 text-gray-500 dark:text-gray-400">
                {isArabic ? 'لا توجد منتجات ذات صلة' : 'No related products found'}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
