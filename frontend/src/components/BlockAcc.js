import React, {Component} from 'react';

function BlockAcc({ user }) {
    return (
        <div>
            <div className='block-acc'></div>
            <div className='imgfs'
                 style={{ position: 'absolute', left: '305px', top: '160px', width: '160px', height: '160px' }}>
            </div>
            <div className='acc-text-nick'>{user.name}</div>
            <div className='acc-text-email'>{user.email}</div>

            <div className='acc-text-2'>Изменить данные</div>

        </div>
    );
};

export default BlockAcc;