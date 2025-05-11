import { useForm } from 'react-hook-form';
import { useEffect, useRef } from 'react';

import { ProductItem } from '@/types/common';
import { UpdateType } from '@/types/enum';
import { uploadImage } from '@/utils/helpers';
import { useLoadingState } from '@/hooks/useLoadingState';

import Modal from '@/components/common/Modal';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import Checkbox from '@/components/common/Checkbox';

interface Props {
    closeHandler: () => void
    submitHandler: (value: ProductItem) => void
    isOpen: boolean
    isLoading: boolean
    defaultProductData: ProductItem
    type: UpdateType
};

function ProductEditor ({isOpen, isLoading, defaultProductData, closeHandler, submitHandler, type}: Props) {

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
        watch,
    } = useForm({
        defaultValues: defaultProductData
    });

    useEffect(() => {
        if (defaultProductData) {
            reset(defaultProductData); // 更新表單值
        }
    }, [defaultProductData, reset]);

    const { getIsLoadingRef, getUiLoadingState, updateUiLoadingState } = useLoadingState();

    const uploadInputRef = useRef<HTMLInputElement>(null);
    const triggerUploadInput = () => {
        if (uploadInputRef.current) {
            uploadInputRef.current.click();
        }
    };
    const uploadProductImage = async(e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && !getIsLoadingRef()) {
            try {
                updateUiLoadingState(true);
                const res = await uploadImage(e.target.files[0]);
                setValue('imageUrl', res?.data.imageUrl);
            } catch (error) {
                console.debug(error);
            } finally {
                e.target.value = '';
                updateUiLoadingState(false);
            }
        }
    };
    const imageUrl = watch('imageUrl');

    const submitForm = (value: ProductItem) => {
        if (!getIsLoadingRef()) {
            submitHandler(value)
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            closeHandler={closeHandler}
            isStatic
            header={`${type === UpdateType.Create ? 'Create' : 'Edit'} product`}
            footer={
                <div className="text-center">
                    <Button clickHandler={closeHandler}>
                        Close
                    </Button>
                    <Button
                        customClassName="ml-3"
                        theme="secondary"
                        clickHandler={handleSubmit(submitForm)}
                        isLoading={isLoading}
                        hasLoading
                    >
                        Submit
                    </Button>
                </div>
            }
        >
            <>
                <div className="grid grid-cols-4 gap-4 border-b mb-8">
                    <div className="border-r pr-4">
                        <Input
                            id="imageUrl"
                            labelText="Img Url"
                            register={register}
                            rules={{required: {
                                value: true,
                                message: 'Image Url is required.'
                            }}}
                            errors={errors}
                        />
                        <Button
                            customClassName="mt-2 mb-5"
                            hasLoading
                            isLoading={getUiLoadingState()}
                            clickHandler={triggerUploadInput}
                        >
                            Upload Image
                        </Button>
                        <input
                            className="hidden"
                            ref={uploadInputRef}
                            type="file"
                            id="uploader"
                            accept=".jpg, .jpeg, .png"
                            onChange={(e) => uploadProductImage(e)}
                        />
                        {
                            imageUrl && <img src={imageUrl} alt="product-image" />
                        }
                    </div>
                    <div className="col-span-3">
                        <Input
                            id="title"
                            labelText="Product Name"
                            register={register}
                            rules={{required: {
                                value: true,
                                message: 'Product Name is required.'
                            }}}
                            errors={errors}
                        />
                        <div className="grid grid-cols-2 gap-4 mb-5">
                            <Input
                                id="category"
                                labelText="Category"
                                register={register}
                                rules={{required: {
                                    value: true,
                                    message: 'Category is required.'
                                }}}
                                errors={errors}
                            />
                            <Input
                                id="unit"
                                labelText="Unit"
                                register={register}
                                rules={{required: {
                                    value: true,
                                    message: 'Unit is required.'
                                }}}
                                errors={errors}
                            />
                            <Input
                                id="origin_price"
                                labelText="Original Price"
                                register={register}
                                rules={{
                                    required: {
                                        value: true,
                                        message: 'Original Price is required.'
                                    },
                                    validate: {
                                        isNumber: (value) => !isNaN(Number(value)) || 'Original Price must be a valid number.', // 檢查是否是有效的數字
                                        minValue: (value) => Number(value) >= 0 || 'Original Price must be greater than or equal to 0.', // 檢查最小值
                                    },
                                    setValueAs: (v) => v === '' ? undefined : Number(v),
                                }}
                                errors={errors}
                                hasNumberFormat
                            />
                            <Input
                                id="price"
                                labelText="Selling Price"
                                register={register}
                                rules={{
                                    required: {
                                        value: true,
                                        message: 'Selling Price is required.'
                                    },
                                    validate: {
                                        isNumber: (value) => !isNaN(Number(value)) || 'Selling Price must be a valid number.', // 檢查是否是有效的數字
                                        minValue: (value) => Number(value) >= 0 || 'Selling Price must be greater than or equal to 0.', // 檢查最小值
                                    },
                                    setValueAs: (v) => v === '' ? undefined : Number(v),
                                }}
                                errors={errors}
                                hasNumberFormat
                            />
                            <Input
                                id="description"
                                labelText="Description"
                                register={register}
                            />
                            <Input
                                id="content"
                                labelText="Product Content"
                                register={register}
                            />
                        </div>
                        <Checkbox
                            id="is_enabled"
                            labelText="Is Enable Product"
                            register={register}
                            rules={{
                                setValueAs: (v) => Number(v),
                            }}
                        />
                    </div>
                </div>
            </>
        </Modal>
    );
}

export default ProductEditor