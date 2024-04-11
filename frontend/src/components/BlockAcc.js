import React, {Component} from 'react';

class BlockAcc extends Component {
    render() {
        return (
            <div>
                <div className='block-acc'></div>
                <div className='imgfs'
                     style={{position: 'absolute', left: '305px', top: '160px', width: '160px', height: '160px'}}></div>
                <div className='acc-text-nick'>0Nickname0</div>
                <div className='acc-text-email'>email.email@mail.ru</div>
                {/*<div className='button' style={{position: 'absolute', left: '270px', top:'405px', width: '212px', height:'56px', backgroundColor:'#807EFF', color:"white", borderRadius:'75px'}}>Стать автором</div*/}
                <div className='acc-text-2'>Изменить данные</div>
            </div>
        );
    }
}

export default BlockAcc;