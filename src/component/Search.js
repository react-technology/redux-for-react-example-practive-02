import React, { Component } from 'react'

export default class Search extends Component {

    constructor(props) {
        super(props);
        this.state = {
            keyword: ''
        }
    }

    onChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        this.setState({
            [name]: value
        })
        console.log(this.state.keyword);
    }

    onSearch = () => {
        console.log(this.state)
        this.props.onSearch(this.state.keyword)
    }

    render() {

        var keyword = this.state.keyword;

        return (
            < div className="col-xs-6 col-sm-6 col-md-6 col-lg-6" >
                <div className="input-group">
                    <input
                        type="text"
                        className="form-control"
                        value={keyword}
                        name="keyword"
                        onChange={this.onChange}
                        placeholder="Nhập từ khóa..." />
                    <span className="input-group-btn">
                        <button className="btn btn-primary" type="button" onClick={this.onSearch}>
                            <span className="fa fa-search mr-5" />Tìm
                        </button>
                    </span>
                </div>
            </div >
        );
    }
}