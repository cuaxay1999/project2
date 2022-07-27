import React, { useState, useEffect } from 'react'
import { carIcon } from '../../assets/img'
import { Icon, Input, Modal, Button } from 'semantic-ui-react'
import DateFnsUtils from '@date-io/date-fns'
import { moneyFormatter } from '../../helper/format'
import { bookingApi } from '../../api'
import authService from '../../services/auth.service'
import { useHistory } from 'react-router-dom'
import { localStorageHelper } from '../../helper'
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import { format } from 'date-fns'
import { statusCode } from '../../enums/code'
import { useLoader } from '../../hooks'
import { Link } from 'react-router-dom'
import TwoFactorConfirm from './TwoFactorConfirm'
import SettingApi from '../../api/setting.api'

const InforPopup = ({ route }) => {
	const { inforModal, setInforModal } = route
	const { data, modalStatus } = inforModal
	const [bookingInfor, setBookingInfor] = useState({})
	const [confirmStatus, setConfirmStatus] = useState(false)
	const [successStatus, setSuccessStatus] = useState(false)
	const [loader, openLoader, closeLoader] = useLoader()
	const history = useHistory()

	const closeModal = () => {
		setInforModal({
			...inforModal,
			modalStatus: false
		})
	}

	useEffect(() => {
		setBookingInfor({
			startPlace: data.startPlace,
			endPlace: data.endPlace,
			startTime: data.startTime,
			quantity: 1,
			startDate: new Date(),
			price: data.price,
			total: data.price
		})
	}, [data])

	const onNumberChange = (e, { name, value }) => {
		if (value > 0) {
			setBookingInfor({
				...bookingInfor,
				[name]: value,
				total: value * data.price
			})
		}
	}

	// Thay đổi ngày xuất phát
	const onDateChange = (date) => {
		setBookingInfor({
			...bookingInfor,
			startDate: date
		})
	}

	const checkAuthentication = async () => {
		// Get access token in Local storage
		// Call server xác thực token
		const isAuthen = await authService.checkAuthentication()
		if (!isAuthen) {
			localStorageHelper.logout()
			return history.push('/auths/login')
		}

		// Kiểm tra xem người dùng bật bảo mật 2 lớp không
		const kq = await SettingApi.getSettingInfors()
		console.log(kq)
		if (kq.statusCode === statusCode.OK && kq.data.userInfors.hasTwoFactorAuth) {
			setConfirmStatus(true)
		}
		if (kq.statusCode === statusCode.OK && !kq.data.userInfors.hasTwoFactorAuth) {
			await bookingTicket()
		}
	}

	// Đặt vé
	const bookingTicket = async () => {
		try {
			openLoader()
			var kq = await bookingApi.createNew({
				...bookingInfor,
				startDate: format(bookingInfor.startDate, 'yy/MM/dd')
			})
			if (kq.statusCode === statusCode.CREATED) {
				closeLoader()
				setConfirmStatus(false)
				setSuccessStatus(true)
			}
		} catch (e) {
			closeLoader()
			console.log(e.message)
		}
	}

	const closeAll = () => {
		setInforModal({
			...inforModal,
			modalStatus: false
		})
		setSuccessStatus(false)
	}

	if (inforModal && modalStatus) {
		return (
			<div className='popup-container'>
				{loader}
				<TwoFactorConfirm show={confirmStatus} onAgree={bookingTicket} onClose={() => setConfirmStatus(false)}>
					Bạn có chắc chắn muốn đặt vé
				</TwoFactorConfirm>

				<Modal
					open={successStatus}
					onClose={() => setSuccessStatus(false)}
					onOpen={() => setSuccessStatus(true)}
					size='small'
				>
					<Modal.Header>Cảm ơn bạn đã đặt vé xe của chúng tôi !!</Modal.Header>
					<Modal.Content>
						<Modal.Description>
							Đặt vé thành công! Vào phần{' '}
							<Link to='/bookings'>
								{' '}
								<b>vé của tôi</b>
							</Link>{' '}
							để kiếm tra thông tin
						</Modal.Description>
					</Modal.Content>
					<Modal.Actions>
						<Button onClick={closeAll}>OK</Button>
					</Modal.Actions>
				</Modal>

				<div className='popup-main'>
					<header className='d-flex'>
						<p className='title'>Thông tin chuyến xe</p>
						<div className='btn--close'></div>
					</header>

					<div className='infor-title sub-title'>Thông tin chi tiết</div>

					<div className='infor'>
						<section className='d-center-flex place-infor'>
							<div className='start infor-text'>{data.startPlace}</div>
							<div className='icon--car'>
								{' '}
								<img src={carIcon} alt='car icon' />
							</div>
							<div className='end infor-text'>{data.endPlace}</div>
						</section>

						<section className='route-infor'>
							<p className='infor-detail'>Điểm đón: {data.startAddress}</p>
							<p className='infor-detail'>Điểm đến: {data.endAddress}</p>
							<p className='infor-detail'>Khoảng cách: {data.distance} km</p>
							<p className='infor-detail'>Thời gian xuất phát: {data.startTime}</p>
							<p className='infor-detail'>Giá vé: {moneyFormatter(data.price)}</p>
						</section>
					</div>
					<section className='booking'>
						<div className='booking-title sub-title'>Đặt vé ngay</div>
						<div className='d-flex booking-infor'>
							<div className='mg-r-auto'>
								<div className='mg-bt-4'>Số lượng vé</div>
								<Input
									type='number'
									className='input-number'
									name='quantity'
									onChange={onNumberChange}
									value={bookingInfor.quantity}
								/>
							</div>

							<div>
								<div className='mg-bt-4'>Ngày đặt vé</div>
								<MuiPickersUtilsProvider utils={DateFnsUtils}>
									<KeyboardDatePicker
										disableToolbar
										autoOk
										disablePast
										variant='inline'
										format='dd/MM/yyyy'
										margin='normal'
										id='date-picker-popup'
										value={bookingInfor.startDate}
										onChange={onDateChange}
										KeyboardButtonProps={{
											'aria-label': 'change date'
										}}
									/>
								</MuiPickersUtilsProvider>
							</div>
						</div>
						<div class='total-money'>Tổng tiền thanh toán: {moneyFormatter(bookingInfor.total)} VNĐ</div>
					</section>

					<footer className='footer'>
						<div className='d-flex'>
							<div className='c-btn btn--cancel' onClick={closeModal}>
								<Icon name='cancel' />
								Hủy
							</div>
							<div className='c-btn btn--save' onClick={checkAuthentication}>
								Next <Icon name='chevron circle right' />
							</div>
						</div>
					</footer>
				</div>
			</div>
		)
	}

	return null
}

export default InforPopup
