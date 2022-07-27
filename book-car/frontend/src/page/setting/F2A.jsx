import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'semantic-ui-react';
import SettingApi from '../../api/setting.api';
import { statusCode } from '../../enums/code';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const F2A = ({ openLoader, closeLoader, backupCodes }) => {
    useEffect(() => {});

    const [twoFactor, setTwoFactor] = useState({
        qrCodeModal: false,
        qrCodeBase64: '',
        twoFactorStatus: backupCodes && backupCodes.length > 0,
        backupCode: backupCodes,
    });

    /**
     * To hide or show QR modal
     * @param {*} modalStatus
     */
    const changeQrModalStatus = (modalStatus) => {
        setTwoFactor({
            ...twoFactor,
            qrCodeModal: modalStatus,
        });
    };

    /**
     * Kích hoạt bảo mật 2 lớp
     */
    const activateF2A = async () => {
        openLoader();
        const kq = await SettingApi.activateF2A();
        closeLoader();
        if (kq.statusCode == statusCode.OK) {
            toast.success('Kích hoạt xác thực 2 bước thành công');
            setTwoFactor({
                qrCodeModal: true,
                qrCodeBase64: kq.data.qrCode,
                twoFactorStatus: true,
                backupCode: kq.data.backupCodes,
            });
        } else {
            toast.error('Kích hoạt thất bại');
        }
    };

    const deactiveF2A = async () => {
        openLoader();
        const kq = await SettingApi.deactiveF2A();
        closeLoader();
        if (kq.statusCode == statusCode.OK) {
            toast.success('Bạn đã ngừng kích hoạt dịch vụ xác thực 2 bước');
            setTwoFactor({
                ...twoFactor,
                qrCodeBase64: null,
                backupCode: [],
                twoFactorStatus: false,
            });
        }
    };

    return (
        <div>
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

            <div className='feature'>
                <p className='feature-label'>Bảo mật 2 lớp</p>
                <div className='feature-main d-center-flex'>
                    <p>Trạng thái hoạt động</p>
                    {twoFactor.twoFactorStatus ? (
                        <div className='c-btn btn--turn-on' onClick={deactiveF2A}>
                            Đang bật
                        </div>
                    ) : (
                        <div className='c-btn btn--turn-off' onClick={activateF2A}>
                            Đang tắt
                        </div>
                    )}
                </div>

                <Modal
                    onClose={() => changeQrModalStatus(false)}
                    onOpen={() => changeQrModalStatus(true)}
                    open={twoFactor.qrCodeModal}
                    size='mini'
                >
                    <Modal.Header>Quét mã QR code để thêm thiết bị</Modal.Header>

                    <Modal.Content>
                        <div style={{ textAlign: 'center' }}>
                            <img src={twoFactor.qrCodeBase64} alt='' />
                        </div>
                    </Modal.Content>

                    <Modal.Actions>
                        <div style={{ textAlign: 'center' }}>
                            <Button color='black' onClick={() => changeQrModalStatus(false)}>
                                Đóng
                            </Button>
                        </div>
                    </Modal.Actions>
                </Modal>

                <div className='feature-explain'>
                    Chúng tôi sẽ yêu cầu bạn cung cấp mã xác OTP mỗi khi bạn đặt chuyến xe mới
                </div>
            </div>

            <div className='feature'>
                <p className='feature-label'>Backup Code</p>
                <div className='feature-main d-center-flex'>
                    <ul className='code-list'>
                        {twoFactor.backupCode &&
                            twoFactor.backupCode.map((item) => {
                                return (
                                    <li className='code-list-item' key={item.code}>
                                        <p className='code-text'>{item.code}</p>
                                        {item.hasUsed ? (
                                            <p className='code-status code-used'>Used</p>
                                        ) : (
                                            <p className='code-status code-active'>Active</p>
                                        )}
                                    </li>
                                );
                            })}
                    </ul>
                </div>

                <div className='feature-explain'>
                    Chỉ được sử dụng khi chế độ bảo mật 2 lớp được kích hoạt
                </div>
            </div>
        </div>
    );
};

export default F2A;
