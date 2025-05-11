import { useEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';

import { useLoadingState } from '@/hooks/useLoadingState';
import { $adminAuthApi } from '@/services';
import { LoginRequest } from '@/types/api';
import { getAuthToken, saveAuthToken } from '@/utils/helpers';

import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import Icon from '@/components/common/Icon';

function Login() {

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm({
        reValidateMode: 'onSubmit'
    });

    const {
        getIsLoadingRef,
        getUiLoadingState,
        updateUiLoadingState,
    } = useLoadingState();

    const navigate = useNavigate();

    useEffect(() => {
        // already login
        const token = getAuthToken();
        if (token) {
            navigate('/admin/products');
        }
    }, [navigate]);

    const login: SubmitHandler<FieldValues> = async (formData) => {
        const formDataTyped = formData as LoginRequest;
        if (!getIsLoadingRef()) {
            try {
                updateUiLoadingState(true);
                const result = await $adminAuthApi.login(formDataTyped);
                const { token, expired } = result.data;
                saveAuthToken(token, expired);

                if (result.data.success) {
                    navigate('/admin/products');
                }
            } catch (error) {
                setError('username', {
                    type: 'manual',
                });
                setError('password', {
                    type: 'manual',
                    message: 'Incorrect username or password.', // 錯誤訊息
                });
                console.debug(error);
            } finally {
                updateUiLoadingState(false);
            }
        }
    };

    return (
        <div className="h-screen bg-gradient-to-br from-violet-900 to-pink-900 flex items-center justify-center px-2">
            <div className="w-96">
                <NavLink
                    className="block w-16 h-8 text-center text-rps-warnning text-2xl mx-auto"
                    to="/"
                >
                    <Icon type="gem" />
                </NavLink>
                <p className="text-center mb-5 text-2xl font-audiowide text-rps-warnning">Log in to ROHSU</p>
                <div className="border-[1px] border-rps-secondary rounded-lg bg-white/90 py-10 px-7">
                    <Input
                        id="username"
                        labelText="Username"
                        register={register}
                        rules={
                            {
                                required: {
                                    value: true,
                                    message: 'Username is required.'
                                },
                                pattern: {
                                    value: /^\S+@\S+$/i,
                                    message: 'The email address is badly formatted.'
                                }
                            }
                        }
                        errors={errors}
                        enterHandler={handleSubmit(login)}
                    />
                    <Input
                        id="password"
                        customClassName="mb-5"
                        labelText="Password"
                        type="password"
                        register={register}
                        rules={{required: {
                            value: true,
                            message: 'Password is required.'
                        }}}
                        errors={errors}
                        enterHandler={handleSubmit(login)}
                    />
                    <Button
                        customClassName="w-full mb-10"
                        theme="secondary"
                        clickHandler={handleSubmit(login)}
                        isLoading={getUiLoadingState()}
                        hasLoading
                    >
                        <span>Login</span>
                    </Button>
                    <div className="border-b-[1px] border-rps-primary-light mb-10" />
                    <div className="flex">
                        <Button
                            customClassName="w-1/2 mr-3"
                            theme="outline-primary"
                            size="sm"
                        >
                            <Icon type="google" />
                        </Button>
                        <Button
                            customClassName="w-1/2"
                            theme="outline-primary"
                            size="sm"
                        >
                            <Icon type="facebookF" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
};
export default Login