export const enum ProductCategoriesKey {
  PRODUCT_DOOR_HANDLE = 'doorhandle',
  PRODUCT_SHOWER_HINGE = 'showerhinge',
  PRODUCT_PIPE_CONNECTORS = 'pipeconnectors',
  PRODUCT_HANGING_WHEEL = 'hangingwheel',
  PRODUCT_BATHROOM_SLIDING_DOOR_ACCESSORIES = 'bathroomslidingdoor',
  PRODUCT_GLASS_FLOOR_SPRING = 'glassfloorspring',
}

export const ProductCategoriesLabel = (t:any): any => {
  return {
    'doorhandle': t('product.product_categories.product_door_handle.title'),
    'showerhinge': t('product.product_categories.product_shower_hinge.title'),
    'pipeconnectors': t('product.product_categories.product_pipe_connectors.title'),
    'hangingwheel': t('product.product_categories.product_hanging_wheel.title'),
    'bathroomslidingdoor': t('product.product_categories.product_bathroom_sliding_door_accessories.title'),
    'glassfloorspring': t('product.product_categories.product_glass_floor_spring.title'),
  }
  
}

export const ProductCategories = (t: any) => {
  return [
    {
      label: t('product.product_categories.product_door_handle.title'),
      key: ProductCategoriesKey.PRODUCT_DOOR_HANDLE,
      path: '/product#doorhandle',
    },
    {
      label: t('product.product_categories.product_shower_hinge.title'),
      key: ProductCategoriesKey.PRODUCT_SHOWER_HINGE,
      path: '/product#showerhinge',
    },
    {
      label: t('product.product_categories.product_pipe_connectors.title'),
      key: ProductCategoriesKey.PRODUCT_PIPE_CONNECTORS,
      path: '/product#pipeconnectors',
    },
    {
      label: t('product.product_categories.product_hanging_wheel.title'),
      key: ProductCategoriesKey.PRODUCT_HANGING_WHEEL,
      path: '/product#hangingwheel',
    },
    {
      label: t('product.product_categories.product_bathroom_sliding_door_accessories.title'),
      key: ProductCategoriesKey.PRODUCT_BATHROOM_SLIDING_DOOR_ACCESSORIES,
      path: '/product#bathroomslidingdoor',
    },
    {
      label: t('product.product_categories.product_glass_floor_spring.title'),
      key: ProductCategoriesKey.PRODUCT_GLASS_FLOOR_SPRING,
      path: '/product#glassfloorspring',
    },
  ];
}



