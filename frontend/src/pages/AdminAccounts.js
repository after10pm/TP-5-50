import React, {Component} from 'react';
import '../components/Admins.css'

class AdminAccounts extends Component {
    render() {
        return (
            <div className='header'>
                <p className='brand'>SocialSphere</p>
                <div className='button' style={{position: 'absolute', left: '1660px', width: '215px'}}>admin</div>
                <div className='rec' style={{left: '1860px', top: '25px', backgroundColor:'#DFDEFF', width:'21px', height:'21px'}}></div>
                <div className='account-check-mark' style={{left: '1866.5px', top: '30px', width:'6px', height:'6px'}}/>



                <div className='admins-fon'>
                    <div className='admins-img'/>
                    <div className='admins-img-2'/>
                </div>



            </div>
        );
    }
}

export default AdminAccounts;