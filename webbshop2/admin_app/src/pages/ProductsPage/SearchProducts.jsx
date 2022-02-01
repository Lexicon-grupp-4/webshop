import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Autosuggest from 'react-autosuggest';
import { setActiveProduct } from '../../redux/products.slice';

const getSuggestionValue = suggestion => suggestion.name;


// Use your imagination to render suggestions.
const renderSuggestion = suggestion => (
    <div>
        {suggestion.name}
    </div>
);

class SearchProducts extends React.Component {
    constructor(props) {
        super(props);
        this.onSuggestionSelected = this.onSuggestionSelected.bind(this);

        // Autosuggest is a controlled component.
        // This means that you need to provide an input value
        // and an onChange handler that updates this value (see below).
        // Suggestions also need to be provided to the Autosuggest,
        // and they are initially empty because the Autosuggest is closed.
        this.state = {
        value: '',
        suggestions: []
        };
    }

    onChange = (event, { newValue }) => {
        this.setState({
        value: newValue
        });
    };

    // Autosuggest will call this function every time you need to update suggestions.
    // You already implemented this logic above, so just use it.
    onSuggestionsFetchRequested = ({ value }) => {
        fetch(`/api/products?search=${value}`)
        .then(response => response.json())
        .then(data => {
            this.setState({ suggestions: data });
        })
        .catch(() => console.log("some error"));
    };

    // Autosuggest will call this function every time you need to clear suggestions.
    onSuggestionsClearRequested = () => {
        this.setState({
        suggestions: []
        });
    };

    onSuggestionSelected(event, { suggestion, suggestionValue, index, method }){
        event.preventDefault();
        console.log('ping... ', suggestion);
        this.props.setActiveProduct(suggestion); // receive test
    }

    render() {
        const { value, suggestions } = this.state;

        // Autosuggest will pass through all these props to the input.
        const inputProps = {
        placeholder: 'Sök en produkt',
        value,
        onChange: this.onChange
        };

        return (
        <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            onSuggestionSelected={this.onSuggestionSelected}
            inputProps={inputProps}
        />
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    setActiveProduct: bindActionCreators(setActiveProduct, dispatch)
})

export default connect(null, mapDispatchToProps)(SearchProducts);
