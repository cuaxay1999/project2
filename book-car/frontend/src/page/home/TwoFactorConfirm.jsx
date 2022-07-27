import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import SettingApi from '../../api/setting.api'
import 'react-toastify/dist/ReactToastify.css'
import { CONFIRM_MODE } from '../../enums/code'

const TwoFactorConfirm = ({ show, onAgree, onClose, children, returnText }) => {
	const [otp, setOtp] = useState('')
	const [confirmMode, setConfirmMode] = useState(CONFIRM_MODE.OTP)

	const onOtpChange = (value) => {
		setOtp(value)
	}

	const confirmAuthentic = async () => {
		// check code empty
		if (!Boolean(otp.trim())) {
			toast.error('Mã OTP ko được để trông')
		} else {
			if (confirmMode === CONFIRM_MODE.OTP) {
				const kq = await SettingApi.verifyOTP(otp)
				if (kq.data) {
					toast.success(kq.userMessage)
					onAgree()
				} else toast.error(kq.devMessage)
			} else {
				const kq = await SettingApi.verifyBackupCode(otp)
				if (kq.data) {
					toast.success(kq.userMessage)
					onAgree()
				} else toast.error(kq.devMessage)
			}
		}
	}

	if (show) {
		return (
			<div className='confirm-container'>
				<div className='confirm'>
					<ToastContainer
						position='top-right'
						hideProgressBar={false}
						newestOnTop={false}
						closeOnClick
						rtl={false}
						pauseOnFocusLoss
						draggable
						pauseOnHover
						autoClose={4000}
					/>
					<div className='confirm-header'>{children}</div>
					{returnText ?? null}
					<div className='otp-enter'>
						{confirmMode === CONFIRM_MODE.OTP ? <p>Nhập vào mã xác nhận</p> : <p>Nhập vào Backup Code</p>}
						<div className='d-flex'>
							<input type='text' onChange={(e) => onOtpChange(e.target.value)} />
							<div className='btn btn--accept' onClick={confirmAuthentic}>
								Send
							</div>
						</div>

						{confirmMode === CONFIRM_MODE.OTP ? (
							<div className='change-confirm-method' onClick={() => setConfirmMode('backup-code')}>
								Sử dụng backup code
							</div>
						) : (
							<div className='change-confirm-method' onClick={() => setConfirmMode(CONFIRM_MODE.OTP)}>
								Sử dụng mã otp
							</div>
						)}

						<div onClick={onClose} className='btn btn--cancel'>
							Close
						</div>
					</div>
				</div>
			</div>
		)
	}
	return null
}

export default TwoFactorConfirm
