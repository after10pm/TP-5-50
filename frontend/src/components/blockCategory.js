import React, {Component} from 'react';
import "../components/Category.css";


class BlockCategory extends Component {
    constructor(props) {
        super(props);
        const categories = {
            А: ['Автотесты', 'Анимации в react'],
            Б: ['Блог'],
            В: ['Валидация']
        };
        this.state = {
            categories: categories,
            allWords: Object.values(categories).flat(),
            // Initialize searchResults with all words
            searchResults: {
                А: categories.А,
                Б: categories.Б,
                В: categories.В
            },
            newCategory: ''
        };

    };
    handleChangeSearch = (event) => {
        const searchTerm = event.target.value.toLowerCase();
        const { categories } = this.state;
        const searchResults = {
            А: categories.А.filter(word => word.toLowerCase().includes(searchTerm)),
            Б: categories.Б.filter(word => word.toLowerCase().includes(searchTerm)),
            В: categories.В.filter(word => word.toLowerCase().includes(searchTerm))
        };
        this.setState({ searchResults });
    };
    render() {
        const { searchResults } = this.state;
        return (
            <div>
                <div className='category-block'></div>


                <input type="text" onChange={this.handleChangeSearch} placeholder="Поиск" className='category-search'/>

                <div className='category-letter'>A</div>
                {searchResults.А.map((word, index) =>
                    <div key={`A-${index}`} className='category-word' style={{ top: 340 + 25 * index + 'px' }}>{word}</div>
                )}

                <div className='category-letter' style={{ top: '480px' }}>Б</div>
                {searchResults.Б.map((word, index) =>
                    <div key={`Б-${index}`} className='category-word' style={{ top: 555 + 25 * index + 'px' }}>{word}</div>
                )}

                <div className='category-letter' style={{ top: '700px' }}>В</div>
                {searchResults.В.map((word, index) =>
                    <div key={`В-${index}`} className='category-word' style={{ top: 770 + 25 * index + 'px' }}>{word}</div>
                )}
            </div>
        );
    }
}

export default BlockCategory;