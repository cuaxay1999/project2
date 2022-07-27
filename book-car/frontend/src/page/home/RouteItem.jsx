import React from 'react';
import demoImage from '../../assets/img/HBT.jpg';
import { Icon } from 'semantic-ui-react';
import { moneyFormatter } from '../../helper/format';

const RouteItem = ({ item, handleClick }) => {
    return (
        <div className='list-item d-flex' onClick={() => handleClick(item)}>
            <img src={demoImage} alt='ảnh' className='detail-img' />
            <div className='detail-content'>
                <div className='road-map'>
                    <Icon name='map'></Icon>
                    {item.startPlace} - {item.endPlace}
                </div>
                <p>
                    <Icon name='map marker alternate'></Icon>
                    {item.startAddress}
                </p>
                <p>
                    <Icon name='location arrow' color='red'></Icon>
                    {item.endAddress}
                </p>
                <div className='d-flex w-full'>
                    <p className='flex-1'>
                        <Icon name='money bill alternate outline'></Icon>
                        {moneyFormatter(item.price)}
                    </p>
                    <p className='flex-1'>
                        <Icon name='clock outline'></Icon>
                        {item.startTime}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RouteItem;
