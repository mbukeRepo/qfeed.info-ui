import { Input } from "antd";

const Filters = props => {
    const { Search } = Input;
    const onSearch =  (value) => {
        props.onSearch(value)
    }
    return(
                <div className="feed-list_filters border_radius" >
                    <Search
                    placeholder="input search text"
                    allowClear
                    enterButton="Search"
                    size="large"
                    onSearch={onSearch}
                    />
                </div>
    );
}

export default Filters;