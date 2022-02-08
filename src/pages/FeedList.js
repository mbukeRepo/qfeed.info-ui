import {Component} from 'react'
import Filters from '../components/Filters';
import "./FeedList.css"
import InfiniteScroll from "react-infinite-scroll-component";
import {Card} from "antd";
import { Link } from "react-router-dom";
import axios from 'axios'
import Loading from '../components/Loading';
class FeedList extends Component{
    state = {
        loading: false,
        feed: [],
        page: 1,
        hasMore: true,
        search: null,
        notfound: false
    }
    componentDidMount =  async () => {
        const {data} = await axios.get("http://35.170.82.230:5000/api/feed");
        this.setState({feed: data.feeds})
    }
    fetchMoreData = async () => {
        this.setState({page: this.state.page + 1});
        const {data} = await axios.get("http://35.170.82.230:5000/api/feed?page=" + this.state.page);
        this.setState({feed: this.state.feed.concat(data.feeds)});
        if (data.feeds.length === 0) this.setState({hasMore: false});
    }
    searchHandler = async (searchString) => {
        if (this.state.search === "") return;
        const {data} = await axios.get("http://35.170.82.230:5000/api/feed/search/"+  searchString);
        this.setState({feed: data.feeds});
        if (this.state.feed.length === 0) this.setState({notfound: true});
    }
    render(){
        let  feed =  <Loading/>;
        if (this.state.feed.length !== 0 && this.state.search === null){
            feed = <InfiniteScroll
            dataLength={this.state.feed.length}
            next={this.fetchMoreData}
            hasMore={this.state.hasMore}
            loader={<h4>..</h4>}
            >
            {this.state.feed.map((item) => (
                <Link to = {`/${item._id}`}  key={item._id} className="feed_card " style={{borderRadius: "12px"}}>
                    <Card title = {item.subject + "-" + item.type } className="border_radius" style = {{marginBottom: '12px', marginTop: '20px'}} >
                        <div >
                            {item.docUrl && <img src={item.docUrl} width="100%" alt="..."/>
                            }
                        </div>
                        
                        <p style={{marginTop:'15px'}}>
                            {item.title + "  "} 
                        </p>
                    </Card>
                </Link>
            ))}
            </InfiniteScroll>
        }
        if(this.state.search) {
            feed = this.state.feed.map((item) => (
                <Link to = {`/${item._id}`}  key={item._id} className="feed_card" style={{borderRadius: "12px"}}>
                    <Card title = {item.subject + "-" + item.type } style = {{marginBottom: '12px', marginTop: '20px'}} >
                        <div >
                            {item.docUrl && <img src={item.docUrl} width="100%" alt="..."/>
                            }
                        </div>
                        
                        <p style={{marginTop:'15px'}}>
                            {item.title + "  "} 
                        </p>
                    </Card>
                </Link>
            ));
        }
        return (
            <div className="feed-list">
                <Filters onSearch={this.searchHandler} />
                {feed}
            </div>
        );
    }
}

export default FeedList;
