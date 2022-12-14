import Header from '../../layout/Header';
import React, { useEffect, useState } from 'react';
import { useLoader } from '../../hooks';
import { Switch, Route, NavLink, useRouteMatch } from 'react-router-dom';
import SettingApi from '../../api/setting.api';
import { localStorageHelper } from '../../helper';
import { ToastContainer, toast } from 'react-toastify';
const ProtectAccount = React.lazy(() => import('./ProtectAccount'));
const UserInfor = React.lazy(() => import('./UserInfor'));
const F2A = React.lazy(() => import('./F2A'));

export default function Setting() {
    const match = useRouteMatch();
    const user = localStorageHelper.getItemByName('user');

    const [userInfor, setUserInfor] = useState('');

    const [loader, openLoader, closeLoader] = useLoader();

    const [isConfirmPassword, setIsConfirmPassword] = useState(false);

    const [password, setPassword] = useState('');

    useEffect(() => {
        getSettingInfor();
    }, []);

    const getSettingInfor = async () => {
        const kq = await SettingApi.getSettingInfors();
        if (kq.statusCode == 200) {
            setUserInfor(kq.data);
        }
    };

    const onPasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const confirmPassword = async () => {
        const kq = await SettingApi.confirmPassword(password);
        console.log(kq);
        if (kq.statusCode === 2000) {
            setIsConfirmPassword(true);
        } else toast.error(kq.userMessage);
    };

    if (isConfirmPassword === false) {
        return (
            <div className='home-container'>
                <Header />
                {loader}
                <ToastContainer
                    position='top-right'
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    autoClose={2000}
                />
                <div className='re-pass-swapper'>
                    <div className='re-pass-main'>
                        <div className='re-pass-header'>Vui l??ng nh???p m???t kh???u ????? ti???p t???c</div>
                        <div className='re-pass-content'>
                            <div className='user-name'>{user.fullName}</div>
                            <div className='re-pass-text'>
                                Trang b???n ??ang c??? ????ng nh???p y??u c???u nh???p m???t kh???u ????? ti???p t???c
                            </div>
                            <input
                                className='re-pass-input'
                                onChange={onPasswordChange}
                                type='password'
                                placeholder='Type your password'
                            />
                        </div>
                        <div className='re-pass-next' onClick={confirmPassword}>
                            Ti???p t???c
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className='home-container'>
            <Header />
            {loader}
            <div className='swapper'>
                <div className='setting-container'>
                    <nav className='setting-navigation'>
                        <ul className='nav-list'>
                            {/* <li className='nav-list-item'>
                                <NavLink exact to={`${match.path}`} activeClassName='active'>
                                    Th??ng tin c?? nh??n
                                </NavLink>
                            </li> */}
                            {/* <li className='nav-list-item'>
                                <NavLink
                                    exact
                                    to={`${match.path}/change-password`}
                                    activeClassName='active'
                                >
                                    Thay ?????i m???t kh???u
                                </NavLink>
                            </li> */}

                            <li className='nav-list-item'>
                                <NavLink exact to={`${match.path}`} activeClassName='active'>
                                    Two Factor Authentication
                                </NavLink>
                            </li>
                        </ul>
                    </nav>

                    <div className='setting-content'>
                        <Switch>
                            {/* <Route
                                exact
                                path={`${match.path}`}
                                render={() => (
                                    <UserInfor
                                        openLoader={openLoader}
                                        closeLoader={closeLoader}
                                        backupCodes
                                    />
                                )}
                            /> */}
                            {/* <Route
                                exact
                                path={`${match.path}/change-password`}
                                component={ProtectAccount}
                            /> */}
                            <Route
                                exact
                                path={`${match.path}`}
                                render={() => (
                                    <F2A
                                        openLoader={openLoader}
                                        closeLoader={closeLoader}
                                        backupCodes={userInfor.backupCodes}
                                    />
                                )}
                            />
                        </Switch>
                    </div>
                </div>
            </div>
        </div>
    );
}
