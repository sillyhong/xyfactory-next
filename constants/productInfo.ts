import { ProductCategoriesKey } from "./index";
import carousel1 from '@assets/images/carousel-1.jpg';
import doorhandles1 from '@assets/images/product/doorHandleknob/door-handles-and-knob-D033H-1.jpg';
import doorhandles2 from '@assets/images/product/doorHandleknob/door-handles-and-knob-D033H-2.jpg';
import doorhandles3 from '@assets/images/product/doorHandleknob/door-handles-and-knob-D033H-3.jpg';
import doorhandles4 from '@assets/images/product/doorHandleknob/door-handles-and-knob-D033H-4.jpg';




export const ProductInfos = (t: any) => {
  const product_name = t('product.product_labels.product_name')
  const product_no = t('product.product_labels.product_no')
  const product_material = t('product.product_labels.product_material')
  const product_finish = t('product.product_labels.product_diameter')
  const product_diameter = t('product.product_labels.product_brand_name')
  const product_brand_name = t('product.product_labels.place_of_origin')
  const place_of_origin = t('product.product_labels.place_of_origin')
  const product_size = t('product.product_labels.product_size')
  const product_glass_thinkness = t('product.product_labels.product_glass_thinkness')

  return {
    [ProductCategoriesKey.PRODUCT_DOOR_HANDLE]: [
      {
        homeNew: true,
        homeHot: true,
        src: doorhandles1,
        desc: t('product.product_categories.product_door_handle.0.desc'),
        srcArr: [
          {
            src: doorhandles1,
          },
          {
            src: doorhandles2,
          },
          {
            src: doorhandles3,
          },
          {
            src: doorhandles4,
          },
        ],
        profile: {
          [`${product_name}`]: t('product.product_categories.product_door_handle.0.profile.product_name'),
          [`${product_no}`]: t('product.product_categories.product_door_handle.0.profile.product_no'),
          [`${product_material}`]: t('product.product_categories.product_door_handle.0.profile.product_material'),
          [`${product_finish}`]: t('product.product_categories.product_door_handle.0.profile.product_finish'),
          [`${product_diameter}`]: t('product.product_categories.product_door_handle.0.profile.product_diameter'),
          [`${product_size}`]: t('product.product_categories.product_door_handle.0.profile.product_size'),
        },
        detail: {
          [`${product_brand_name}`]: t('product.product_categories.product_door_handle.0.detail.brand_name'),
          [`${place_of_origin}`]: t('product.product_categories.product_door_handle.0.detail.place_of_origin'),
          [`${product_name}`]: t('product.product_categories.product_door_handle.0.detail.product_name'),
          [`${product_no}`]: t('product.product_categories.product_door_handle.0.detail.product_no'),
          [`${product_material}`]: t('product.product_categories.product_door_handle.0.detail.product_material'),
          [`${product_finish}`]: t('product.product_categories.product_door_handle.0.detail.product_finish'),
          [`${product_diameter}`]: t('product.product_categories.product_door_handle.0.detail.product_diameter'),
          [`${product_size}`]: t('product.product_categories.product_door_handle.0.profile.product_size'),
        }
      },
      {
        homeNew: true,
        homeHot: true,
        src: doorhandles1,
        desc: t('product.product_categories.product_door_handle.1.desc'),
        srcArr: [
          {
            src: doorhandles1,
          },
          {
            src: doorhandles2,
          },
          {
            src: doorhandles3,
          },
          {
            src: doorhandles4,
          },
        ],
        profile: {
          [`${product_name}`]: t('product.product_categories.product_door_handle.1.profile.product_name'),
          [`${product_no}`]: t('product.product_categories.product_door_handle.1.profile.product_no'),
          [`${product_material}`]: t('product.product_categories.product_door_handle.1.profile.product_material'),
          [`${product_finish}`]: t('product.product_categories.product_door_handle.1.profile.product_finish'),
          [`${product_diameter}`]: t('product.product_categories.product_door_handle.1.profile.product_diameter'),
          [`${product_size}`]: t('product.product_categories.product_door_handle.1.profile.product_size'),
        },
        detail: {
          [`${product_brand_name}`]: t('product.product_categories.product_door_handle.1.detail.brand_name'),
          [`${place_of_origin}`]: t('product.product_categories.product_door_handle.1.detail.place_of_origin'),
          [`${product_name}`]: t('product.product_categories.product_door_handle.1.detail.product_name'),
          [`${product_no}`]: t('product.product_categories.product_door_handle.1.detail.product_no'),
          [`${product_material}`]: t('product.product_categories.product_door_handle.1.detail.product_material'),
          [`${product_finish}`]: t('product.product_categories.product_door_handle.1.detail.product_finish'),
          [`${product_diameter}`]: t('product.product_categories.product_door_handle.1.detail.product_diameter'),
          [`${product_size}`]: t('product.product_categories.product_door_handle.1.detail.product_size'),
        }
      },
      {
        homeNew: true,
        homeHot: true,
        src: doorhandles1,
        desc: t('product.product_categories.product_door_handle.2.desc'),
        srcArr: [
          {
            src: doorhandles1,
          },
          {
            src: doorhandles2,
          },
          {
            src: doorhandles3,
          },
          {
            src: doorhandles4,
          },
        ],
        profile: {
          [`${product_name}`]: t('product.product_categories.product_door_handle.2.profile.product_name'),
          [`${product_no}`]: t('product.product_categories.product_door_handle.2.profile.product_no'),
          [`${product_material}`]: t('product.product_categories.product_door_handle.2.profile.product_material'),
          [`${product_finish}`]: t('product.product_categories.product_door_handle.2.profile.product_finish'),
          [`${product_diameter}`]: t('product.product_categories.product_door_handle.2.profile.product_diameter'),
          [`${product_size}`]: t('product.product_categories.product_door_handle.2.profile.product_size'),
        },
        detail: {
          [`${product_brand_name}`]: t('product.product_categories.product_door_handle.2.detail.brand_name'),
          [`${place_of_origin}`]: t('product.product_categories.product_door_handle.2.detail.place_of_origin'),
          [`${product_name}`]: t('product.product_categories.product_door_handle.2.detail.product_name'),
          [`${product_no}`]: t('product.product_categories.product_door_handle.2.detail.product_no'),
          [`${product_material}`]: t('product.product_categories.product_door_handle.2.detail.product_material'),
          [`${product_finish}`]: t('product.product_categories.product_door_handle.2.detail.product_finish'),
          [`${product_diameter}`]: t('product.product_categories.product_door_handle.2.detail.product_diameter'),
          [`${product_size}`]: t('product.product_categories.product_door_handle.2.detail.product_size'),
        }
      },
      {
        homeNew: true,
        homeHot: true,
        src: doorhandles1,
        desc: t('product.product_categories.product_door_handle.3.desc'),
        srcArr: [
          {
            src: doorhandles1,
          },
          {
            src: doorhandles2,
          },
          {
            src: doorhandles3,
          },
          {
            src: doorhandles4,
          },
        ],
        profile: {
          [`${product_name}`]: t('product.product_categories.product_door_handle.3.profile.product_name'),
          [`${product_no}`]: t('product.product_categories.product_door_handle.3.profile.product_no'),
          [`${product_material}`]: t('product.product_categories.product_door_handle.3.profile.product_material'),
          [`${product_finish}`]: t('product.product_categories.product_door_handle.3.profile.product_finish'),
          [`${product_diameter}`]: t('product.product_categories.product_door_handle.3.profile.product_diameter'),
          [`${product_size}`]: t('product.product_categories.product_door_handle.3.profile.product_size'),
        },
        detail: {
          [`${product_brand_name}`]: t('product.product_categories.product_door_handle.3.detail.brand_name'),
          [`${place_of_origin}`]: t('product.product_categories.product_door_handle.3.detail.place_of_origin'),
          [`${product_name}`]: t('product.product_categories.product_door_handle.3.detail.product_name'),
          [`${product_no}`]: t('product.product_categories.product_door_handle.3.detail.product_no'),
          [`${product_material}`]: t('product.product_categories.product_door_handle.3.detail.product_material'),
          [`${product_finish}`]: t('product.product_categories.product_door_handle.3.detail.product_finish'),
          [`${product_diameter}`]: t('product.product_categories.product_door_handle.3.detail.product_diameter'),
          [`${product_size}`]: t('product.product_categories.product_door_handle.3.detail.product_size'),
        }
      },
      {
        homeNew: true,
        homeHot: true,
        src: doorhandles1,
        desc: t('product.product_categories.product_door_handle.4.desc'),
        srcArr: [
          {
            src: doorhandles1,
          },
          {
            src: doorhandles2,
          },
          {
            src: doorhandles3,
          },
          {
            src: doorhandles4,
          },
        ],
        profile: {
          [`${product_name}`]: t('product.product_categories.product_door_handle.4.profile.product_name'),
          [`${product_no}`]: t('product.product_categories.product_door_handle.4.profile.product_no'),
          [`${product_material}`]: t('product.product_categories.product_door_handle.4.profile.product_material'),
          [`${product_finish}`]: t('product.product_categories.product_door_handle.4.profile.product_finish'),
          [`${product_diameter}`]: t('product.product_categories.product_door_handle.4.profile.product_diameter'),
          [`${product_glass_thinkness}`]: t('product.product_categories.product_door_handle.4.profile.product_glass_thinkness'),
        },
        detail: {
          [`${product_brand_name}`]: t('product.product_categories.product_door_handle.4.detail.brand_name'),
          [`${place_of_origin}`]: t('product.product_categories.product_door_handle.4.detail.place_of_origin'),
          [`${product_name}`]: t('product.product_categories.product_door_handle.4.detail.product_name'),
          [`${product_no}`]: t('product.product_categories.product_door_handle.4.detail.product_no'),
          [`${product_material}`]: t('product.product_categories.product_door_handle.4.detail.product_material'),
          [`${product_finish}`]: t('product.product_categories.product_door_handle.4.detail.product_finish'),
          [`${product_diameter}`]: t('product.product_categories.product_door_handle.4.detail.product_diameter'),
          [`${product_glass_thinkness}`]: t('product.product_categories.product_door_handle.4.detail.product_glass_thinkness'),
        }
      },
    ],
    [ProductCategoriesKey.PRODUCT_SHOWER_HINGE]: [
      {
        src: doorhandles1,
        srcArr: [],
        desc: 'Frameless Shower Room Sliding Door System Bathroom Sliding Door Kits For Tempered Glass',
        productName: 'Patch fitting',
        profile: {
          model: 'HF-011',
          material: 'Stainless steel+aluminum body',
          headMaterial: 'Stainless steel cover+Aluminum body',
          finish: 'Satin; Polish; Black',
          package: '1pc/box 50 boxes/carton',
          application: 'hotel,apartment,office,household',
        }
      }
    ],
    [ProductCategoriesKey.PRODUCT_PIPE_CONNECTORS]: [
      {
        src: doorhandles1,
        srcArr: [],
        desc: 'Frameless Shower Room Sliding Door System Bathroom Sliding Door Kits For Tempered Glass',
        productName: 'Patch fitting',
        profile: {
          model: 'HF-011',
          material: 'Stainless steel+aluminum body',
          headMaterial: 'Stainless steel cover+Aluminum body',
          finish: 'Satin; Polish; Black',
          package: '1pc/box 50 boxes/carton',
          application: 'hotel,apartment,office,household',
        }
      }
    ],
    [ProductCategoriesKey.PRODUCT_HANGING_WHEEL]: [
      {
        src: doorhandles1,
        srcArr: [],
        desc: 'Frameless Shower Room Sliding Door System Bathroom Sliding Door Kits For Tempered Glass',
        productName: 'Patch fitting',
        profile: {
          model: 'HF-011',
          material: 'Stainless steel+aluminum body',
          headMaterial: 'Stainless steel cover+Aluminum body',
          finish: 'Satin; Polish; Black',
          package: '1pc/box 50 boxes/carton',
          application: 'hotel,apartment,office,household',
        }
      }
    ],
    [ProductCategoriesKey.PRODUCT_BATHROOM_SLIDING_DOOR_ACCESSORIES]: [
      {
        src: doorhandles1,
        srcArr: [],
        desc: 'Frameless Shower Room Sliding Door System Bathroom Sliding Door Kits For Tempered Glass',
        productName: 'Patch fitting',
        profile: {
          model: 'HF-011',
          material: 'Stainless steel+aluminum body',
          headMaterial: 'Stainless steel cover+Aluminum body',
          finish: 'Satin; Polish; Black',
          package: '1pc/box 50 boxes/carton',
          application: 'hotel,apartment,office,household',
        }
      }
    ],
    [ProductCategoriesKey.PRODUCT_GLASS_FLOOR_SPRING]: [
      {
        src: doorhandles1,
        srcArr: [],
        desc: 'Frameless Shower Room Sliding Door System Bathroom Sliding Door Kits For Tempered Glass',
        productName: 'Patch fitting',
        profile: {
          model: 'HF-011',
          material: 'Stainless steel+aluminum body',
          headMaterial: 'Stainless steel cover+Aluminum body',
          finish: 'Satin; Polish; Black',
          package: '1pc/box 50 boxes/carton',
          application: 'hotel,apartment,office,household',
        }
      }
    ],


  }

}
