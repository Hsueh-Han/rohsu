import { useEffect, useLayoutEffect, useState, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { $shopProductsApi } from '@/services';

import { ProductItem } from '@/types/common';
import { NEW_COLLECTION, RECOMMENDED, EXPLORE_SECTION, ABOUT_SECTION } from '@/constants/constants';
import { useLoadingState } from '@/hooks/useLoadingState';

import Icon from '@/components/common/Icon';
import ProductCard from '@/components/features/ProductCard';

import indexBg from '@/assets/images/index_bg.jpg';
import chatBg from '@/assets/images/chat_bg.jpg';
import '@/assets/scss/pages/shop/home.scss';

function Home () {

    const { getUiLoadingState, updateUiLoadingState } = useLoadingState();

    const [newCollectionList, setNewCollectionList] = useState<ProductItem[]>([]);
    const [recommendedList, setRecommendedList] = useState<ProductItem[]>([]);
    const [productList, setProductList] = useState<ProductItem[]>([]);

    const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

    const handleScroll = (key: string) => {
        sectionRefs.current[key]?.scrollIntoView({ behavior: 'smooth' });
    };

    const getNewCollectionList = async(page: number = 1) => {
        try {
            updateUiLoadingState(true, NEW_COLLECTION);
            const result = await $shopProductsApi.getProducts(page, NEW_COLLECTION);
            setNewCollectionList(result.data.products);
        } catch (error) {
            console.debug(error);
        } finally {
            updateUiLoadingState(false, NEW_COLLECTION);
        }
    };

    const getRecommendedList = async(page: number = 1) => {
        try {
            updateUiLoadingState(true, RECOMMENDED);
            const result = await $shopProductsApi.getProducts(page, RECOMMENDED);
            setRecommendedList(result.data.products);
        } catch (error) {
            console.debug(error);
        } finally {
            updateUiLoadingState(false, RECOMMENDED);
        }
    };

    const getProductList = async(page: number = 1) => {
        try {
            updateUiLoadingState(true);
            const result = await $shopProductsApi.getProducts(page);
            setProductList(result.data.products);
        } catch (error) {
            console.debug(error);
        } finally {
            updateUiLoadingState(false);
        }
    };

    useLayoutEffect(() => {
        getNewCollectionList();
        getRecommendedList();
    }, []);

    useEffect(() => {
        getProductList();
    }, []);

    return (<>
        <div className="home-wrap">
            <div className="nav-bar">
                <NavLink
                    className="home"
                    to="/"
                >
                    <Icon type="gem" />
                    <span className="ml-2">ROHSU</span>
                </NavLink>
                <div>
                    <NavLink
                        className="mr-7"
                        to="/"
                    >
                        FAQ
                    </NavLink>
                    <NavLink
                        to="/"
                    >
                        CONTACT
                    </NavLink>
                </div>
            </div>
            <div
                className="index-banner"
                style={{
                    backgroundImage: `url(${indexBg})`
                }}
            >
                <div className="title-block">
                    <p className="title">
                        <span>FASHION FOR </span>
                        <span className="text-cyan-300">NOW </span>
                        <span>AND FOREVER WITH</span>
                        <br />
                        <span
                            className="brand"
                            data-text="ROHSU."
                        >
                            ROHSU.
                        </span>
                    </p>
                    <div className="collection-block">
                        <p className="collection-title">
                            NEW COLLECTION
                        </p>
                        <div className="collection-list">
                            {
                                !getUiLoadingState(NEW_COLLECTION) ?
                                <div className="collection-item-wrap">
                                    {
                                        newCollectionList.map(item => (
                                            <div
                                                className="collection-item"
                                                key={item.id}
                                            >
                                                <img src={item.imageUrl}/>
                                            </div>
                                        ))
                                    }
                                </div>
                                :
                                <div className="loading-skeleton">
                                    {
                                        [...Array(3)].map((_, index) => (
                                            <div
                                                className="skeleton-item"
                                                key={index}
                                            >
                                                <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                                    <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
                                                </svg>
                                            </div>
                                        ))
                                    }
                                </div>
                            }
                            <p className="collection-text">
                                <span>Discover the Future of Fashion,</span>
                                <br />
                                <span>Your Next Favorite Piece Awaits.</span>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="absolute left-1/2 -translate-x-1/2 md:left-[70px] md:translate-x-0 bottom-[10%] flex">
                    <button
                        className="explore-btn"
                        onClick={() => handleScroll(EXPLORE_SECTION)}
                    >
                        Explore Collection ↘
                    </button>
                    <button
                        className="about-btn"
                        onClick={() => handleScroll(ABOUT_SECTION)}
                    >
                        About Us
                    </button>
                </div>
            </div>
            <div className="intro-block">
                <p className="title">Find Your Perfect Fit, Every Time</p>
                <p>
                    Explore our carefully curated collections, from fashion to home decor and accessories.
                     There's always something perfect for you. Let us help you find the best fit for every moment and stay stylish all year round.
                </p>
            </div>
            <div className="divider" />
            <div
                className="py-20 px-2 md:px-10"
                ref={(el) => (sectionRefs.current[EXPLORE_SECTION] = el)}
            >
                <p className="font-orbitron mb-8 text-xl font-bold text-white">Most Recommended</p>
                <div className="grid md:grid-cols-3 gap-4">
                    {
                        !getUiLoadingState(RECOMMENDED) ?
                        recommendedList.map((item) => (
                            <ProductCard
                                productData={item}
                                key={item.id}
                            />
                        ))
                        :
                        [...Array(3)].map((_, index) => (
                            <ProductCard
                                key={index}
                                isLoading
                            />
                        ))
                    }
                </div>
            </div>
            <div className="divider" />
            <div className="py-20 px-2 md:px-10">
                <div className="flex justify-between items-center mb-8">
                    <p className="font-orbitron text-xl font-bold text-white">Clothing Collection</p>
                    <NavLink
                        className="explore-btn"
                        to="/"
                    >
                        View All ↗
                    </NavLink>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {
                        !getUiLoadingState() ?
                        productList.map((item) => (
                            <ProductCard
                                productData={item}
                                key={item.id}
                            />
                        ))
                        :
                        [...Array(10)].map((_, index) => (
                            <ProductCard
                                key={index}
                                isLoading
                            />
                        ))
                    }
                </div>
            </div>
            <div className="divider" />
            <div
                className="intro-block"
                ref={(el) => (sectionRefs.current[ABOUT_SECTION] = el)}
            >
                <p className="title">Crafted with purpose. Worn with attitude.</p>
                <p>We believe every piece you wear should say something — about your story, your confidence, and your edge. At our core, we're not just creating clothes; we're building a space where boldness meets authenticity.</p>
                <p>Thank you for being part of this movement — your style, your way.</p>
            </div>
            <div className="store-info-block">
                <div
                    className="second-banner"
                    style={{
                        backgroundImage: `url(${chatBg})`
                    }}
                >
                    <div className="clip-wrap">
                        <p
                            className="clip-title"
                            style={{
                                backgroundImage: `url(${chatBg})`
                            }}
                        >
                            <span>STAND OUT,</span>
                            <br />
                            <span>STAY RELEVANT.</span>
                        </p>
                    </div>
                </div>
                <div className="info-list">
                    <div className="info-item">
                        <Icon type="box" />
                        <p className="text-base">Made to Order</p>
                        <p className="text-xs">All pieces made to order for you</p>
                    </div>
                    <div className="info-item">
                        <Icon type="truckFast" />
                        <p className="text-base">Free Deliver</p>
                        <p className="text-xs">Free deliver for order world-wide</p>
                    </div>
                    <div className="info-item">
                        <Icon type="handshake" />
                        <p className="text-base">Free Exchange</p>
                        <p className="text-xs">Free exchange on all products</p>
                    </div>
                </div>
            </div>
        </div>
        <div className="footer">
            <div className="footer-list">
                <div>
                    <p className="font-bold text-xl mb-5">Products</p>
                    <ul className="pl-2">
                        <li>
                            <NavLink to="/">
                                Clothing
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/">
                                Accessories
                            </NavLink>
                        </li>
                    </ul>
                </div>
                <div>
                    <p className="font-bold text-xl mb-5">Category</p>
                    <ul className="pl-2">
                        <li>
                            <NavLink to="/">
                                Men
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/">
                                Women
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/">
                                Kids
                            </NavLink>
                        </li>
                    </ul>
                </div>
                <div>
                    <p className="font-bold text-xl mb-5">Company Info</p>
                    <ul className="pl-2">
                        <li>
                            <NavLink to="/">
                                About Us
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/">
                                Contact Us
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/">
                                Support
                            </NavLink>
                        </li>
                    </ul>
                </div>
                <div>
                    <p className="font-bold text-xl mb-5">Follow Us</p>
                    <div className="flex pl-2">
                        <NavLink
                            className="media-btn"
                            to="/"
                        >
                            <Icon type="facebookS"></Icon>
                        </NavLink>
                        <NavLink
                            className="media-btn"
                            to="/"
                        >
                            <Icon type="xTwitter"></Icon>
                        </NavLink>
                        <NavLink
                            className="media-btn"
                            to="/"
                        >
                            <Icon type="instagram"></Icon>
                        </NavLink>
                    </div>
                </div>
            </div>
            <p className="text-xs text-right">
                Copyright &copy; 2025 HSUEH. All rights reserved.
            </p>
        </div>
    </>)
};
export default Home