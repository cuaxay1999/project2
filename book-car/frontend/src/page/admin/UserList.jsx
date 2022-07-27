import React from 'react'
import Header from '../../layout/admin/Header'
import { Button } from 'semantic-ui-react'
import { userStatusCode } from '../../enums/code'
import { useUser } from '../../hooks'
import { moneyFormatter } from '../../helper/format'
import { userApi } from '../../api'
import { useHistory } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function UserList() {
	const [users, fetchUser] = useUser()

	return (
		<>
			<ToastContainer
				position='top-right'
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				autoClose={false}
			/>
			<Header title='Quản lý người dùng' />
			<div className='main-content'>
				<div className='row'>
					<div className='col-12'>
						<div className='box'>
							<div className='box-header'>Danh sách khách hàng</div>
							<div className='box-body overflow-scroll'>
								<table>
									<thead>
										<tr>
											<th>Số điện thoại</th>
											<th>Tên khách hàng</th>
											<th>Tổng số chuyến</th>
											<th>Trạng thái</th>
											<th>Tổng số tiền</th>
											<th>Hành động</th>
										</tr>
									</thead>
									<tbody>
										{users &&
											users.map((user) => {
												return <UserColumeItem user={user} key={user.userId} />
											})}
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

const UserColumeItem = ({ user }) => {
	const history = useHistory()
	const { userId } = user
	const block = async () => {
		const kq = await userApi.update(userId, { status: 0 })
		if (kq.statusCode === 200) {
			history.go(0)
		} else toast.error('Đã có lỗi xảy ra. Vui lòng reload lại trang')
	}

	const active = async () => {
		const kq = await userApi.update(userId, { status: 1 })
		if (kq.statusCode === 200) {
			history.go(0)
		} else toast.error('Đã có lỗi xảy ra. Vui lòng reload lại trang')
	}
	return (
		<tr>
			<td>{user.phoneNumber}</td>
			<td>
				<div className='order-owner'>
					<span>{user.fullName}</span>
				</div>
			</td>
			<td>{user.totalBooking}</td>
			<td>
				{userStatusCode.ACTIVE.code === user.status ? (
					<span className='order-status user-active'>{userStatusCode.ACTIVE.message}</span>
				) : (
					<span className='order-status user-blocked'>{userStatusCode.BLOCK.message}</span>
				)}
			</td>
			<td>{moneyFormatter(user.totalMoney) || 0} VNĐ</td>
			<td>
				{userStatusCode.ACTIVE.code === user.status ? (
					<Button color='red' size='mini' onClick={() => block()}>
						Block
					</Button>
				) : (
					<Button position size='mini' onClick={() => active()}>
						Active
					</Button>
				)}
			</td>
		</tr>
	)
}
