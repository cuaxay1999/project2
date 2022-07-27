import React, { useState } from 'react';
import firebase from '../../firebase';
import localStorageHelper from '../../helper/localStorage';

const Confirm = ({ show, onAgree, onClose }) => {
    const [otp, setOtp] = useState('');
    const [recap, setRecap] = useState(false);

    const onOtpChange = (value) => {
        setOtp(value);
    };

    const captchaVerifier = () => {
        try {
            window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');

            var phoneNumber = localStorageHelper.getPhoneNumber();
            const sendPhone = '+84' + phoneNumber.slice(1);
            const appVerifier = window.recaptchaVerifier;
            setRecap(true);
            firebase
                .auth()
                .signInWithPhoneNumber(sendPhone, appVerifier)
                .then((confirmationResult) => {
                    window.confirmationResult = confirmationResult;
                })
                .catch((err) => {
                    console.log(err);
                });
        } catch (e) {
            console.log(e);
        }
    };

    const verifyOtp = () => {
        const code = otp;
        window.confirmationResult
            .confirm(code)
            .then((result) => {
                // User signed in successfully.
                const user = result.user;
                console.log(user);
                onAgree();
            })
            .catch((error) => {
                console.log(error);
            });
    };

    if (show) {
        return (
            <div className='confirm-container'>
                <div className='confirm'>
                    <div className='confirm-header'>Bạn có chắc chắn muốn đặt vé</div>
                    <div id='recaptcha-container'></div>
                    {!recap ? (
                        <div className='btn-group'>
                            <div onClick={captchaVerifier} className='btn--accept btn'>
                                Đồng ý
                            </div>
                            <div onClick={onClose} className='btn--cancel btn'>
                                Hủy
                            </div>
                        </div>
                    ) : (
                        <div className='otp-enter'>
                            <p>Nhập vào mã xác nhận</p>
                            <input type='text' onChange={(e) => onOtpChange(e.target.value)} />
                            <button onClick={verifyOtp} className='btn btn--accept'>
                                Send
                            </button>
                            <br />
                            <div onClick={onClose} className='btn btn--cancel'>
                                Close
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }
    return null;
};

export default Confirm;
