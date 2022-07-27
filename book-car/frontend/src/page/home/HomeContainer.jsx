import React, { useState, useEffect } from 'react';
import Header from '../../layout/Header';
import { Dropdown, Button, Icon } from 'semantic-ui-react';
import revertIcon from '../../assets/img/revert.png';
import usePlace from '../../hooks/usePlace';
import useRoute from '../../hooks/useRoute';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import InforPopup from './InforPopup';
import DateFnsUtils from '@date-io/date-fns';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import routeApi from '../../api/route.api';
import RouteItem from './RouteItem';
import noResult from '../../assets/img/no-result.png';

function HomeContainer({ history }) {
    let { path } = useRouteMatch();

    const [startPlace, setStartPlace] = usePlace('province', 'Hà Nội');
    const [endPlace, setEndPlace] = usePlace('province', 'Bắc Giang');
    // eslint-disable-next-line no-unused-vars
    const [routes, fetchRoute] = useRoute();
    const [inforModal, setInforModal] = useState({ modalStatus: false, data: {} });
    const [selectedPlace, setSelectedPlace] = useState({
        start: '',
        end: '',
    });

    const [searchResult, setSearchResult] = useState();

    var startOptions = [];
    var endOptions = [];

    // eslint-disable-next-line array-callback-return
    endPlace.map((item) => {
        endOptions.push({
            key: item.placeId,
            value: item.placeId,
            text: item.placeName,
        });
    });

    // eslint-disable-next-line array-callback-return
    startPlace.map((item) => {
        startOptions.push({
            key: item.placeId,
            value: item.placeId,
            text: item.placeName,
        });
    });

    // Đổi địa điểm đến và đi
    const revertPlace = () => {
        const swappedPlace = endPlace;
        setEndPlace(startPlace);
        setStartPlace(swappedPlace);
        var swapped = selectedPlace.start;
        setSelectedPlace({
            start: selectedPlace.end,
            end: swapped,
        });
    };

    // Xem chi tiết tuyến đường đi
    const handleRouteClick = (item) => {
        setInforModal({
            modalStatus: true,
            data: item,
        });
    };

    // Lựa chọn địa điểm đến và đi (thanh dropdown)
    const handleDropDownChange = (e, { name, value }) => {
        setSelectedPlace({ ...selectedPlace, [name]: value });
    };

    // Hàm tìm kiếm đường đi
    const searchRoute = async () => {
        const kq = await routeApi.search(selectedPlace.start, selectedPlace.end);
        setSearchResult(kq.data);
        history.push('/home/search');
    };
    return (
        <div className='home-container'>
            <Header />
            <InforPopup route={{ inforModal, setInforModal }} />
            <main>
                <div className='book-ticket d-center-flex'>
                    <div className='start w-30per book-ticket-item'>
                        <p>Điểm đi</p>
                        <Dropdown
                            placeholder='Chọn điểm bắt đầu'
                            fluid
                            search
                            selection
                            options={startOptions}
                            value={selectedPlace.start}
                            name='start'
                            onChange={handleDropDownChange}
                        />
                    </div>
                    <img
                        className='revert-icon'
                        src={revertIcon}
                        alt='changing icon'
                        onClick={revertPlace}
                    ></img>
                    <div className='destination w-30per book-ticket-item'>
                        <p>Điểm đến</p>
                        <Dropdown
                            placeholder='Chọn điểm đến'
                            fluid
                            search
                            selection
                            options={endOptions}
                            value={selectedPlace.end}
                            name='end'
                            onChange={handleDropDownChange}
                        />
                    </div>
                    <div className='time w-30per book-ticket-item'>
                        <p>Ngày đi</p>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                disableToolbar
                                disablePast
                                variant='inline'
                                format='dd/MM/yyyy'
                                margin='normal'
                                id='date-picker-inline'
                                value={new Date()}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </MuiPickersUtilsProvider>
                    </div>

                    <div className='btn--search' onClick={searchRoute}>
                        <Button content='Tìm kiếm' color='teal' icon='search' />
                    </div>
                </div>

                <Switch>
                    <Route exact path={path}>
                        <div className='popular'>
                            <div className='popular-title'>Tuyến xe phổ biến</div>

                            <div className='popular-list d-flex'>
                                {routes &&
                                    routes.map((item) => (
                                        <RouteItem
                                            key={item.routeId}
                                            item={item}
                                            handleClick={handleRouteClick}
                                        />
                                    ))}
                            </div>
                        </div>
                    </Route>
                    <Route path='/home/search'>
                        {searchResult && searchResult.length > 0 ? (
                            searchResult.map((item) => (
                                <RouteItem
                                    key={item.routeId}
                                    item={item}
                                    handleClick={handleRouteClick}
                                />
                            ))
                        ) : (
                            <div style={{ textAlign: 'center' }}>
                                <img src={noResult} alt='no result' />
                            </div>
                        )}
                    </Route>
                </Switch>
            </main>
        </div>
    );
}

export default HomeContainer;
