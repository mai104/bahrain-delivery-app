import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';

const ProductDetailsPage = () => {
  const { id } = useParams();
  const { isArabic } = useLanguage();
  
  // حالة المنتج - ستأتي من API لاحقًا
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState([]);

  // النصوص حسب اللغة
  const texts = {
    loading: isArabic ? 'جاري التحميل...' : 'Loading...',
    notFound: isArabic ? 'المنتج غير موجود' : 'Product Not Found',
    notFoundDesc: isArabic ? 'عذراً، لم نتمكن من العثور على المنتج الذي تبحث عنه.' : 'Sorry, we could not find the product you are looking for.',
    backToProducts: isArabic ? 'العودة إلى المنتجات' : 'Back to Products',
    addToCart: isArabic ? 'أضف إلى السلة' : 'Add to Cart',
    quantity: isArabic ? 'الكمية:' : 'Quantity:',
    size: isArabic ? 'الحجم:' : 'Size:',
    description: isArabic ? 'الوصف' : 'Description',
    features: isArabic ? 'المميزات' : 'Features',
    relatedProducts: isArabic ? 'منتجات ذات صلة' : 'Related Products',
    sar: isArabic ? 'د.ب' : 'BHD',
  };

  // لمحاكاة API، سنفترض أن المنتج موجود
  const mockProduct = {
    id: 1,
    name: isArabic ? 'مياه معدنية - عبوة كبيرة' : 'Mineral Water - Large Bottle',
    description: isArabic ? 'مياه معدنية نقية، عبوة 18 لتر مناسبة للاستخدام المنزلي' : 'Pure mineral water, 18-liter bottle suitable for home use',
    price: 1.5,
    discount: 16,
    images: ['/images/water-large-1.jpg', '/images/water-large-2.jpg'],
    sizes: [
      { id: 1, name: isArabic ? '18 لتر' : '18 Liters', price: 1.5 },
      { id: 2, name: isArabic ? '12 لتر' : '12 Liters', price: 1.2 }
    ],
    features: [
      { name: isArabic ? 'مصفاة 100%' : '100% Filtered' },
      { name: isArabic ? 'معادن طبيعية' : 'Natural Minerals' }
    ]
  };

  // زيادة الكمية
  const increaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  // إنقاص الكمية
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  // تغيير الصورة المحددة
  const changeImage = (index) => {
    setSelectedImage(index);
  };

  // تغيير الحجم المحدد
  const changeSize = (sizeId) => {
    setSelectedSize(sizeId);
  };

  // إضافة إلى السلة
  const addToCart = () => {
    // سيتم تنفيذ هذه الوظيفة لاحقًا
    console.log('إضافة إلى السلة:', {
      productId: mockProduct.id,
      sizeId: selectedSize,
      quantity
    });
  };

  // في حالة التحميل
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p className="text-xl text-gray-600 dark:text-gray-400">{texts.loading}</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        {/* تفاصيل المنتج */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden mb-12">
          <div className="md:flex">
            {/* قسم الصور */}
            <div className="md:w-1/2 p-6">
              {/* الصورة الرئيسية */}
              <div className="mb-4 rounded-lg overflow-hidden">
                <img 
                  src={mockProduct.images[selectedImage]} 
                  alt={mockProduct.name} 
                  className="w-full h-auto object-cover"
                />
              </div>
              
              {/* الصور المصغرة */}
              <div className="flex space-x-2 rtl:space-x-reverse">
                {mockProduct.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => changeImage(index)}
                    className={`
                      w-20 h-20 rounded-md overflow-hidden border-2
                      ${selectedImage === index 
                        ? 'border-primary dark:border-primary-dark' 
                        : 'border-transparent'}
                    `}
                  >
                    <img 
                      src={image} 
                      alt={`${mockProduct.name} - ${index + 1}`} 
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
            
            {/* معلومات المنتج */}
            <div className="md:w-1/2 p-6">
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                {mockProduct.name}
              </h1>
              
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {mockProduct.description}
              </p>
              
              {/* السعر */}
              <div className="flex items-center mb-6">
                <span className="text-2xl font-bold text-primary dark:text-primary-dark">
                  {mockProduct.price} {texts.sar}
                </span>
                
                {mockProduct.discount > 0 && (
                  <span className="ms-3 px-2 py-1 bg-accent text-white text-sm rounded">
                    {mockProduct.discount}% {isArabic ? 'خصم' : 'OFF'}
                  </span>
                )}
              </div>
              
              {/* اختيار الحجم */}
              {mockProduct.sizes && mockProduct.sizes.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {texts.size}
                  </h3>
                  
                  <div className="flex flex-wrap gap-2">
                    {mockProduct.sizes.map(size => (
                      <button
                        key={size.id}
                        onClick={() => changeSize(size.id)}
                        className={`
                          px-4 py-2 border rounded-md transition-colors
                          ${selectedSize === size.id 
                            ? 'border-primary bg-primary/10 text-primary dark:border-primary-dark dark:bg-primary-dark/10 dark:text-primary-dark' 
                            : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300'}
                        `}
                      >
                        {size.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              {/* التحكم في الكمية */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {texts.quantity}
                </h3>
                
                <div className="flex items-center">
                  <button
                    onClick={decreaseQuantity}
                    className="w-10 h-10 flex items-center justify-center border border-gray-300 dark:border-gray-600 rounded-s-md bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                  >
                    <span className="text-xl">-</span>
                  </button>
                  
                  <div className="w-14 h-10 flex items-center justify-center border-t border-b border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                    {quantity}
                  </div>
                  
                  <button
                    onClick={increaseQuantity}
                    className="w-10 h-10 flex items-center justify-center border border-gray-300 dark:border-gray-600 rounded-e-md bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                  >
                    <span className="text-xl">+</span>
                  </button>
                </div>
              </div>
              
              {/* زر الإضافة إلى السلة */}
              <Button
                variant="primary"
                size="lg"
                fullWidth
                onClick={addToCart}
                className="mb-4"
              >
                {texts.addToCart}
              </Button>
              
              {/* المميزات */}
              {mockProduct.features && mockProduct.features.length > 0 && (
                <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-4">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
                    {texts.features}
                  </h3>
                  
                  <ul className="space-y-2">
                    {mockProduct.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-gray-600 dark:text-gray-400">
                        <svg className="h-5 w-5 text-primary dark:text-primary-dark mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        {feature.name}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
          
          {/* الوصف المفصل */}
          <div className="p-6 border-t border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
              {texts.description}
            </h2>
            
            <p className="text-gray-600 dark:text-gray-400">
              {mockProduct.description}
            </p>
          </div>
        </div>
        
        {/* المنتجات ذات الصلة - ستأتي من API */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
            {texts.relatedProducts}
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* هنا ستعرض المنتجات ذات الصلة من API */}
            <Card className="animate-pulse h-72" />
            <Card className="animate-pulse h-72" />
            <Card className="animate-pulse h-72" />
            <Card className="animate-pulse h-72" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
