import React, { useState } from 'react'
// component
import Header from '../../layout/Header'
import TicketItem from '../../components/TicketItem'
import TwoFactorConfirm from '../home/TwoFactorConfirm'

import useBooking from '../../hooks/useBooking'
import { Modal, Button } from 'semantic-ui-react'
import { moneyFormatter } from '../../helper/format'
import { format } from 'date-fns'
import { caculateDateTime } from '../../helper/dateTime'
import { bookingApi } from '../../api'
import { bookingCode } from '../../enums/code'

import { addDate } from '../../helper/dateTime'

export default function TicketContainer() {
	const [open, setOpen] = useState(false)
	const [confirmStatus, setConfirmStatus] = useState(false)
	const bookings = useBooking()
	const [currentBooking, setCurrentBooking] = useState({})
	const [returnText, setReturnText] = useState('')

	// Xem chi tiết vé xe
	const showInfor = (item) => {
		setOpen(true)
		setCurrentBooking(item)
	}

	// Hủy vé
	const cancelBooking = async () => {
		const kq = await bookingApi.update(currentBooking.bookingId, { status: -1 })
		if (kq.statusCode === 200) {
			window.location.reload()
		}
	}

	const confirmCancel = () => {
		const bookingDate = currentBooking.startDate

		const addOneDay = addDate(1)

		const addThreeDay = addDate(3)

		const addWeek = addDate(7)

		if (bookingDate <= addOneDay) {
			setReturnText('Bạn sẽ không được hoàn tiền vì hủy vé trước 1 ngày')
		} else if (bookingDate <= addThreeDay && bookingDate > addOneDay) {
			setReturnText('Bạn sẽ được hoàn tiền 30% vì hủy vé trước 3 ngày')
		} else if (bookingDate <= addWeek && bookingDate > addThreeDay) {
			setReturnText('Bạn sẽ được hoàn tiền 50% vì hủy vé trước 1 tuần')
		} else setReturnText('Bạn sẽ được hoàn tiền 100%')

		setConfirmStatus(true)
	}

	const ReturnMessage = () => {
		return <p>{returnText}</p>
	}

	return (
		<div>
			<Header />
			<TwoFactorConfirm
				show={confirmStatus}
				onAgree={cancelBooking}
				onClose={() => setConfirmStatus(false)}
				returnText={<ReturnMessage />}
			>
				Bạn có chắc chắn muốn hủy vé ?
			</TwoFactorConfirm>
			<Modal onClose={() => setOpen(false)} onOpen={() => setOpen(true)} open={open} size='small'>
				<Modal.Header>Thông tin chi tiết vé #{currentBooking.bookingId}</Modal.Header>
				<Modal.Content className='modal-content'>
					<div className='modal-content-item'>
						Người đặt vé: <b>{currentBooking.fullName}</b>
					</div>
					<div className='modal-content-item'>
						Điểm đi: <b>{currentBooking.startPlace}</b>
					</div>
					<div className='modal-content-item'>
						Điểm đến: <b>{currentBooking.endPlace}</b>
					</div>
					<div className='modal-content-item'>
						Giá vé: <b>{moneyFormatter(currentBooking.price)} VNĐ</b>
					</div>
					<div className='modal-content-item'>
						Số vé đã đặt: <b>{currentBooking.quantity}</b>
					</div>
					<div className='modal-content-item'>
						Số tiền cần thanh toán: <b>{moneyFormatter(currentBooking.price * currentBooking.quantity)} VNĐ</b>
					</div>
					<div className='d-flex'>
						<div className='flex-1 mg-r-12'>
							Ngày khởi hành:{' '}
							<b>{currentBooking.startDate && format(new Date(currentBooking.startDate), 'dd/MM/yyyy')}</b>
						</div>

						<div className='flex-1'>
							Thời gian xe chạy: <b>{currentBooking.startTime}</b>
						</div>
					</div>
				</Modal.Content>

				<Modal.Actions>
					{currentBooking.status === bookingCode.ACCEPTED ? (
						<Button content='Hủy vé' icon='close' color='red' onClick={confirmCancel} />
					) : null}

					<Button color='green' onClick={() => setOpen(false)} icon='checkmark' content='OK' />
				</Modal.Actions>
			</Modal>
			<main className='ticket-container'>
				<div className='my-ticket'>
					<div className='ticket-choose d-flex'>
						<div className='title'>Vé của tôi</div>
						<div className='ticket-type active'>Tất cả</div>
						<div className='ticket-type'>Đã hoàn thành</div>
						<div className='ticket-type'>Bị hủy</div>
						<div className='ticket-type'>Đang thực hiện</div>
					</div>

					<div className='ticket-list'>
						{bookings &&
							bookings.map((item) => {
								return <TicketItem key={item.bookingId} infor={item} handleClick={() => showInfor(item)} />
							})}
					</div>
				</div>
			</main>
		</div>
	)
}
