import { useEffect, useRef, useState } from 'react';
import { $adminProductsApi } from '@/services';

import { TableColumn, DataItem, PageData, ProductItem } from '@/types/common';
import { UpdateType, ToastType } from '@/types/enum';
import { UPDATE_STATE_LOADING, REMOVE_STATE_LOADING } from '@/constants/constants';
import { useLoadingState } from '@/hooks/useLoadingState';
import { useToastMessage } from '@/hooks/useToastMessage';
import { formatCurrency } from '@/utils/helpers';

import Pagination from '@/components/common/Pagination';
import Table from '@/components/common/Table';
import Icon from '@/components/common/Icon';
import Modal from '@/components/common/Modal';
import ProductEditor from '@/components/features/ProductEditor';
import Button from '@/components/common/Button';

const tableColumns: TableColumn[] = [
    {
        title: 'Category',
        column: 'category'
    },
    {
        title: 'Name',
        column: 'title'
    },
    {
        title: 'Price',
        column: 'price',
    },
    {
        title: 'State',
        column: 'is_enabled',
        align: 'center'
    },
    {
        title: 'Options',
        column: 'option',
        align: 'center'
    },
];

function AdminProducts() {

    const [productList, setProductList] = useState<DataItem[]>([]);
    const [pageData, setPageData] = useState<PageData | null>(null);

    const { getIsLoadingRef, getUiLoadingState, updateUiLoadingState } = useLoadingState();
    const { updateToastMessage } = useToastMessage();

    const getProductList = async(page: number = 1) => {
        if (!getIsLoadingRef()) {
            try {
                updateUiLoadingState(true);
                const result = await $adminProductsApi.getProducts(page);
                setProductList(result.data.products);
                const { current_page, total_pages } = result.data.pagination;
                setPageData({
                    currentPage: current_page,
                    totalPage: total_pages,
                })
            } catch (error) {
                console.debug(error);
                updateToastMessage(ToastType.Error, '資料取得失敗');
            } finally {
                updateUiLoadingState(false);
            }
        }
    };

    useEffect(() => {
        getProductList(1);
    }, []);

    const updatePage = (page: number) => {
        getProductList(page);
    };

    // create/edit modal state
    const modalState = useRef(UpdateType.Create);

    const updateProductHandler = (productData: ProductItem) => {
        if (modalState.current === UpdateType.Create) {
            createNewProduct(productData);
        } else if (modalState.current === UpdateType.Edit && productData.id) {
            const {id, ...requestBody } = productData;
            updateProduct(id, requestBody);
        }
    };

    // create product
    const defaultProductData = {
        title: '',
        category: '',
        origin_price: 0,
        price: 0,
        unit: '',
        description: '',
        content: '',
        is_enabled: 1,
        imageUrl: '',
        imagesUrl: []
    };
    const [productData, setProductData] = useState<ProductItem>(defaultProductData);

    const [isShowUpdateModal, setIsShowUpdateModal] = useState<boolean>(false);
    const showCreateModal = () => {
        modalState.current = UpdateType.Create;
        setIsShowUpdateModal(true);
    };
    const closeUpdateModal = () => {
        setIsShowUpdateModal(false);
        setProductData(defaultProductData);
    };
    const createNewProduct = async(productData: ProductItem) => {
        try {
            updateUiLoadingState(true, UPDATE_STATE_LOADING);
            const result = await $adminProductsApi.createProduct(productData);
            if (result.data.success) {
                updateToastMessage(ToastType.Success, '資料新增成功');
            } else {
                updateToastMessage(ToastType.Error, '資料新增失敗');
            }
        } catch (error) {
            console.debug(error);
            updateToastMessage(ToastType.Error, '資料新增失敗');
        } finally {
            updateUiLoadingState(false, UPDATE_STATE_LOADING);
            closeUpdateModal();
        }
        updatePage(pageData?.currentPage || 1);
    };

    // edit product
    const showEditModal = (data: DataItem) => {
        modalState.current = UpdateType.Edit;
        setProductData(data as unknown as ProductItem);
        setIsShowUpdateModal(true);
    };
    const updateProduct = async(id: string, requestBody: ProductItem) => {
        try {
            updateUiLoadingState(true, UPDATE_STATE_LOADING);
            const result = await $adminProductsApi.updateProduct(id, requestBody);
            if (result.data.success) {
                updateToastMessage(ToastType.Success, '資料更新成功');
            } else {
                updateToastMessage(ToastType.Error, '資料更新失敗');
            }
        } catch (error) {
            console.debug(error);
            updateToastMessage(ToastType.Error, '資料更新失敗');
        } finally {
            updateUiLoadingState(false, UPDATE_STATE_LOADING);
            closeUpdateModal();
        }
        updatePage(pageData?.currentPage || 1);
    };

    // remove product
    const [isShowRemoveModal, setIsShowRemoveModal] = useState<boolean>(false);
    const [temporaryRemoveData, setTemporaryRemoveData] = useState<DataItem | null>(null);

    const removeProduct = async() => {
        if (temporaryRemoveData && !getIsLoadingRef(REMOVE_STATE_LOADING)) {
            try {
                updateUiLoadingState(true, REMOVE_STATE_LOADING);
                const result = await $adminProductsApi.removeProduct(temporaryRemoveData.id.toString());
                if (result.data.success) {
                    updateToastMessage(ToastType.Success, '資料刪除成功');
                } else {
                    updateToastMessage(ToastType.Error, '資料刪除失敗');
                }
            } catch (error) {
                console.debug(error);
                updateToastMessage(ToastType.Error, '資料刪除失敗');
            }
            finally {
                updateUiLoadingState(false, REMOVE_STATE_LOADING);
                closeRemoveModal();
            }
            updatePage(pageData?.currentPage || 1);
        }
    };

    const showRemoveModal = (data: DataItem) => {
        setTemporaryRemoveData(data);
        setIsShowRemoveModal(true)
    };
    const closeRemoveModal = () => {
        setIsShowRemoveModal(false);
        setTemporaryRemoveData(null);
    };

    return (<>
        <div className="py-5">
            <div className="text-right mb-5">
                <Button
                    theme="outline-primary"
                    clickHandler={showCreateModal}
                >
                    Create
                </Button>
            </div>
            <Table
                tableColumns={tableColumns}
                dataList={productList}
                isLoading={getUiLoadingState()}
                renderChild={(bodyItem, key) => {
                    if (key === 'option') {
                        return (
                            <>
                                <span
                                    className="text-rps-primary-light hover:text-rps-primary/50 cursor-pointer mr-3.5"
                                    onClick={() => showEditModal(bodyItem)}
                                >
                                    <Icon type="pen" />
                                </span>
                                <span
                                    className="text-rps-danger hover:text-rps-danger/50 cursor-pointer"
                                    onClick={() => showRemoveModal(bodyItem)}
                                >
                                    <Icon type="trash" />
                                </span>
                            </>
                        )
                    } else if (key === 'is_enabled') {
                        return (
                            <>
                                {
                                    Number(bodyItem.is_enabled) ?
                                    <span className="text-rps-success">Enable</span>
                                    :
                                    <span className="text-rps-danger">Disable</span>
                                }
                            </>
                        )
                    } else if (key === 'price') {
                        return (
                            <span>{formatCurrency(+bodyItem.price)}</span>
                        )
                    }
                    return null
                }}
            />
            {
                pageData &&
                <Pagination
                    totalPage={pageData.totalPage}
                    currentPage={pageData.currentPage}
                    updatePage={updatePage}
                />
            }
            <Modal
                isOpen={isShowRemoveModal}
                closeHandler={closeRemoveModal}
                header="Confirm to remove"
            >
                <div>
                    <p className="px-12 pb-10 pt-5">{ `Confirm deletion of ${temporaryRemoveData?.title} ?` }</p>
                    <div className="text-center">
                        <Button clickHandler={closeRemoveModal}>
                            Close
                        </Button>
                        <Button
                            customClassName="ml-3"
                            theme="secondary"
                            hasLoading
                            isLoading={getUiLoadingState(REMOVE_STATE_LOADING)}
                            clickHandler={() => removeProduct()}
                        >
                            Confirm
                        </Button>
                    </div>
                </div>
            </Modal>
            <ProductEditor
                defaultProductData={productData}
                isOpen={isShowUpdateModal}
                isLoading={getUiLoadingState(UPDATE_STATE_LOADING)}
                closeHandler={closeUpdateModal}
                submitHandler={updateProductHandler}
                type={modalState.current}
            />
        </div>
    </>)
};

export default AdminProducts