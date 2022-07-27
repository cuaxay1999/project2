import React, { useState } from 'react';
import Header from '../../layout/admin/Header';
import { useRoute, usePlace } from '../../hooks';
import { Button, Modal, Form } from 'semantic-ui-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { routeApi } from '../../api';

const RouteList = () => {
    const [routes, fetchRoute] = useRoute();
    const [open, setOpen] = useState(false);
    const [startPlace, setStartPlace] = usePlace('province', 'Hà Nội');
    const [endPlace, setEndPlace] = usePlace('province', 'Bắc Giang');
    const [modalMode, setModalMode] = useState(1);
    var endOptions = [];
    var startOptions = [];

    // eslint-disable-next-line array-callback-return
    endPlace.map((item) => {
        endOptions.push({
            key: item.placeId,
            value: item.placeId,
            text: item.placeName,
        });
    });

    const [currentId, setCurrentId] = useState('');

    // eslint-disable-next-line array-callback-return
    startPlace.map((item) => {
        startOptions.push({
            key: item.placeId,
            value: item.placeId,
            text: item.placeName,
        });
    });

    // Tuyến xe chạy mới
    const [newRoute, setNewRoute] = useState({
        startPlaceId: undefined,
        endPlaceId: undefined,
        startTime: undefined,
        availableSeat: undefined,
        price: 0,
        distance: undefined,
    });

    const createNewRoute = async () => {
        try {
            if (modalMode === 1) {
                const kq = await routeApi.createNew(newRoute);
                if (kq.statusCode === 201) {
                    toast.success('Thêm tuyến xe mới thành công');
                    setOpen(false);
                    fetchRoute();
                }
            }
            if (modalMode === 2) {
                const kq = await routeApi.update(currentId, newRoute);
                console.log(kq);
                if (kq.statusCode === 200) {
                    toast.success('Sửa thông tin thành công');
                    setOpen(false);
                    fetchRoute();
                }
            }
        } catch (error) {
            toast.error('Đã có lỗi xảy ra');
        }
    };

    const onInputChange = (e, { name, value }) => {
        setNewRoute({
            ...newRoute,
            [name]: value,
        });
    };

    const editRoute = ({
        routeId,
        startPlaceId,
        endPlaceId,
        startTime,
        availableSeat,
        price,
        distance,
    }) => {
        setCurrentId(routeId);
        setModalMode(2);
        setNewRoute({ startPlaceId, endPlaceId, startTime, availableSeat, price, distance });
        setOpen(true);
    };

    const onCloseModal = () => {
        setModalMode(1);
        setOpen(false);
    };

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
            <Header title='Quản lý tuyến xe' />
            <div className='main-content'>
                <div className='row'>
                    <div className='col-12'>
                        <div className='box'>
                            <div className='d-center-flex flex-sp-bt'>
                                <div className='box-header'>Danh sách tuyến xe</div>

                                <Modal
                                    onClose={() => setOpen(false)}
                                    onOpen={() => setOpen(true)}
                                    open={open}
                                    trigger={
                                        <Button content='Thêm mới' color='green' icon='plus' />
                                    }
                                >
                                    {modalMode === 1 ? (
                                        <Modal.Header>Thêm tuyến xe mới</Modal.Header>
                                    ) : (
                                        <Modal.Header>Thông tin tuyến xe</Modal.Header>
                                    )}

                                    <Modal.Content>
                                        <Form widths='equal' onSubmit={createNewRoute}>
                                            <Form.Dropdown
                                                placeholder='Chọn điểm bắt đầu'
                                                fluid
                                                search
                                                selection
                                                options={startOptions}
                                                value={newRoute.startPlaceId}
                                                name='startPlaceId'
                                                onChange={onInputChange}
                                                label='Địa điểm xuất phát'
                                            />

                                            <Form.Dropdown
                                                placeholder='Chọn điểm đến'
                                                label='Địa điểm đến'
                                                fluid
                                                search
                                                selection
                                                options={endOptions}
                                                value={newRoute.endPlaceId}
                                                name='endPlaceId'
                                                onChange={onInputChange}
                                            />

                                            <div className='d-flex'>
                                                <Form.Input
                                                    name='distance'
                                                    width='16'
                                                    fluid
                                                    label='Khoảng cách'
                                                    onChange={onInputChange}
                                                    className='mg-r-12'
                                                    value={newRoute.distance}
                                                />
                                                <Form.Input
                                                    name='startTime'
                                                    width='16'
                                                    fluid
                                                    label='Thời gian xe chạy'
                                                    onChange={onInputChange}
                                                    type='time'
                                                    value={newRoute.startTime}
                                                />
                                            </div>
                                            <div className='d-flex'>
                                                <Form.Input
                                                    name='price'
                                                    width='16'
                                                    fluid
                                                    label='Giá vé'
                                                    onChange={onInputChange}
                                                    className='mg-r-12'
                                                    value={newRoute.price}
                                                />
                                                <Form.Input
                                                    name='availableSeat'
                                                    width='16'
                                                    fluid
                                                    label='Số vé tối đa'
                                                    onChange={onInputChange}
                                                    value={newRoute.availableSeat}
                                                />
                                            </div>
                                        </Form>
                                    </Modal.Content>

                                    <Modal.Actions>
                                        <Button color='black' onClick={onCloseModal}>
                                            Hủy
                                        </Button>
                                        <Button
                                            content='Lưu lại'
                                            labelPosition='right'
                                            icon='checkmark'
                                            positive
                                            onClick={createNewRoute}
                                        />
                                    </Modal.Actions>
                                </Modal>
                            </div>
                            <div className='box-body overflow-scroll'>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Địa điểm đi</th>
                                            <th>Địa điểm đến</th>
                                            <th>Khoảng cách</th>
                                            <th>Tiền vé</th>
                                            <th className='text-center'>Số vé</th>
                                            <th className='text-center'>Thời gian xe chạy</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {routes &&
                                            routes.map((route) => {
                                                return (
                                                    <tr
                                                        onDoubleClick={() => editRoute(route)}
                                                        key={route.routeId}
                                                    >
                                                        <td>{route.startPlace}</td>
                                                        <td>
                                                            <div className='order-owner'>
                                                                <span>{route.endPlace}</span>
                                                            </div>
                                                        </td>
                                                        <td className='text-center'>
                                                            {route.distance} Km
                                                        </td>
                                                        <td>{route.price} VNĐ</td>
                                                        <td className='text-center'>
                                                            {route.availableSeat}
                                                        </td>
                                                        <td className='text-center'>
                                                            {route.startTime}
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default RouteList;
