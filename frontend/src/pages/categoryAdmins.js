import React, {Component} from 'react';
import BlockCategory from "../components/blockCategory";

class CategoryAdmins extends Component {
    render() {
        return (
            <div>
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


                <BlockCategory/>
                <div className='category-main-text' style={{width:'500px'}}>Изменение категорий</div>
                <div className='admins-add-category'>Добавить категорию</div>
                <div className='admins-add-category' style={{backgroundColor:'#FF6F6F', top:'297px'}}>Удалить категорию</div>

                <input type="text" id="new_category" name="new_category" className='admins-add-category-input'/>



            </div>
        );
    }
}

export default CategoryAdmins;