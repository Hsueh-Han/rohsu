import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

// 定義圖標選項
type IconOptions = 'spinner' | 'gem' | 'google' | 'facebookF' | 'facebookS' | 'xTwitter' | 'instagram' | 'chevronLeft' | 'chevronRight'
    | 'pen' | 'trash' | 'truckFast' | 'box' | 'handshake' | 'cartShopping';

// 映射每個圖標名稱對應的動態導入函式
const iconLoader: Record<IconOptions, () => Promise<IconProp>> = {
    spinner: () => import('@fortawesome/free-solid-svg-icons').then((mod) => mod.faSpinner),
    gem: () => import('@fortawesome/free-solid-svg-icons').then((mod) => mod.faGem),
    google: () => import('@fortawesome/free-brands-svg-icons').then((mod) => mod.faGoogle),
    facebookF: () => import('@fortawesome/free-brands-svg-icons').then((mod) => mod.faFacebookF),
    facebookS: () => import('@fortawesome/free-brands-svg-icons').then((mod) => mod.faSquareFacebook),
    xTwitter: () => import('@fortawesome/free-brands-svg-icons').then((mod) => mod.faXTwitter),
    instagram: () => import('@fortawesome/free-brands-svg-icons').then((mod) => mod.faSquareInstagram),
    chevronLeft: () => import('@fortawesome/free-solid-svg-icons').then((mod) => mod.faChevronLeft),
    chevronRight: () => import('@fortawesome/free-solid-svg-icons').then((mod) => mod.faChevronRight),
    pen: () => import('@fortawesome/free-solid-svg-icons').then((mod) => mod.faPen),
    trash: () => import('@fortawesome/free-solid-svg-icons').then((mod) => mod.faTrash),
    truckFast: () => import('@fortawesome/free-solid-svg-icons').then((mod) => mod.faTruckFast),
    box: () => import('@fortawesome/free-solid-svg-icons').then((mod) => mod.faBox),
    handshake: () => import('@fortawesome/free-solid-svg-icons').then((mod) => mod.faHandshake),
    cartShopping: () => import('@fortawesome/free-solid-svg-icons').then((mod) => mod.faCartShopping),
};

function Icon ({type}: {type: IconOptions}) {
    const [icon, setIcon] = useState<IconProp | null>(null);

    useEffect(() => {
        (async () => {
            try {
                const icon = await iconLoader[type]();  // 根據 type 來動態加載對應的圖標
                setIcon(icon);
            } catch (error) {
                console.debug('Error loading icon:', error);
                setIcon(null);
            }
        })();
    }, [type]);

    return icon ? <FontAwesomeIcon icon={icon} /> : null;
};

export default Icon