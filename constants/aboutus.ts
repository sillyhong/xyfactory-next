import { BsHandThumbsUpFill } from 'react-icons/bs';
import { FaShippingFast, FaHandsHelping } from 'react-icons/fa';
import { RiTeamFill, } from 'react-icons/ri';


export const advantages = (t: any)=>{
    return [
        {
            IconComp: BsHandThumbsUpFill,
            title: t('about_us.about_us_advantages.title1'),
            desc: t('about_us.about_us_advantages.desc1')
        },
        {
            IconComp: RiTeamFill,
            title: t('about_us.about_us_advantages.title2'),
            desc: t('about_us.about_us_advantages.desc2')
        },
        {
            IconComp: FaShippingFast,
            title: t('about_us.about_us_advantages.title3'),
            desc: t('about_us.about_us_advantages.desc3')
        },
        {
            IconComp: FaHandsHelping,
            title: t('about_us.about_us_advantages.title4'),
            desc: t('about_us.about_us_advantages.desc4')
        },
    ]
}

