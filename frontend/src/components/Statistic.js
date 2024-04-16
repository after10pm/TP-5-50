import React, {Component} from 'react';

class Statistic extends Component {
    render() {
        return (
            <div>
                <div className='statistic-block'></div>
                <div className='statistic-text-main'>Статистика</div>
                <div className='statistic-text'>Подписок</div>
                <div className='statistic-text' style={{top:'640px'}}>Лайков</div>
                <div className='statistic-text-count'>13 098</div>
                <div className='statistic-text-count' style={{top:'665px'}}>78 065</div>
            </div>
        );
    }
}

export default Statistic;