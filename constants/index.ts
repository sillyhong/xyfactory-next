export const enum ProductCategoriesKey {
  PRODUCT_DOOR_HANDLE = 'product-door-handle',
  PRODUCT_SHOWER_HINGE = 'product-shower-hinge',
  PRODUCT_PIPE_CONNECTORS = 'product-pipe-connectors',
  PRODUCT_HANGING_WHEEL = 'product-hanging-wheel',
  PRODUCT_BATHROOM_SLIDING_DOOR_ACCESSORIES = 'product-bathroom-sliding-door-accessories',
  PRODUCT_GLASS_FLOOR_SPRING = 'product-glass-floor-spring',
}

export const ProductCategoriesLabel = (t:any): any => {
  return {
    'product-door-handle': t('product.product_categories.product_door_handle.title'),
    'product-shower-hinge': t('product.product_categories.product_shower_hinge.title'),
    'product-pipe-connectors': t('product.product_categories.product_pipe_connectors.title'),
    'product-hanging-wheel': t('product.product_categories.product_hanging_wheel.title'),
    'product-bathroom-sliding-door-accessories': t('product.product_categories.product_bathroom_sliding_door_accessories.title'),
    'product-glass-floor-spring': t('product.product_categories.product_glass_floor_spring.title'),
  }
  
}

export const ProductCategories = (t: any) => {
  return [
    {
      label: t('product.product_categories.product_door_handle.title'),
      key: ProductCategoriesKey.PRODUCT_DOOR_HANDLE,
      path: '/product#product-door-handle',
    },
    {
      label: t('product.product_categories.product_shower_hinge.title'),
      key: ProductCategoriesKey.PRODUCT_SHOWER_HINGE,
      path: '/product#product-shower-hinge',
    },
    {
      label: t('product.product_categories.product_pipe_connectors.title'),
      key: ProductCategoriesKey.PRODUCT_PIPE_CONNECTORS,
      path: '/product#product-pipe-connectors',
    },
    {
      label: t('product.product_categories.product_hanging_wheel.title'),
      key: ProductCategoriesKey.PRODUCT_HANGING_WHEEL,
      path: '/product#product-hanging-wheel',
    },
    {
      label: t('product.product_categories.product_bathroom_sliding_door_accessories.title'),
      key: ProductCategoriesKey.PRODUCT_BATHROOM_SLIDING_DOOR_ACCESSORIES,
      path: '/product#product-bathroom-sliding-door-accessories',
    },
    {
      label: t('product.product_categories.product_glass_floor_spring.title'),
      key: ProductCategoriesKey.PRODUCT_GLASS_FLOOR_SPRING,
      path: '/product#product-glass-floor-spring',
    },
  ];
}



