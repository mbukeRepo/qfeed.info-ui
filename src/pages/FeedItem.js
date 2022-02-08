import {Component} from 'react';
import axios from "axios";
import "./FeedItem.css";
import {Upload, Button, Divider, List, Skeleton} from "antd";
import {UploadOutlined} from "@ant-design/icons"
import {connect}  from "react-redux";
import ImageViewer from '../components/ImageViewer';
class FeedItem extends Component{
    state = {
        feed: {},
        fileList: [],
        visible: false,
        docUrl: null
    }
    componentDidMount = async () => {
        const {data} = await axios.get("http://35.170.82.230:5000/api/feed/" + this.props.match.params.id);
        this.setState({feed: data.feed})
    }
    uploadHandler =async (event) => {
        try {
            const newValues = {};
            let formdata = new FormData();
            formdata.append('files', this.state.fileList[0]);
            const {data} = await axios.post("http://34.238.193.147:4000/", formdata);
            newValues["docUrl"] = "http://34.238.193.147:4000/uploads/" + data.imageLink;
            await axios.post("http://35.170.82.230:5000/api/feed/" + this.props.match.params.id + "/comment",newValues, {headers: {
                "Authorization": `Bearer ${this.props.token}`}});
            // location.reload();
            window.location.reload();
        } catch (error) {
            console.log(error.response)
        }
            
    } 
    showImage = (docUrl) => {
        this.setState({visible: true, docUrl})
    }
    toggle = () => {
        this.setState({visible: !this.state.visible})
    }
    render(){
        const {fileList} = this.state.fileList;
        const uploadProps = {
            onRemove: file => {
              this.setState(state => {
                const index = state.fileList.indexOf(file);
                const newFileList = state.fileList.slice();
                newFileList.splice(index, 1);
                return {
                  fileList: newFileList,
                };
              });
            },
            beforeUpload: file => {
              this.setState(state => ({
                fileList: [...state.fileList, file],
              }));
              return false;
            },
            fileList,
          }; 
        return(
            <div className="single_feed">
                <ImageViewer
                    docUrl = {this.state.docUrl}
                    visible={this.state.visible}
                    toggle = {this.toggle}
                />
                {this.state.feed.content && <div className="content" dangerouslySetInnerHTML={{__html: this.state.feed.content}}></div>}
                {this.state.feed.docUrl &&
                    <div className="single__feed-image">
                        <img src={this.state.feed.docUrl} alt=""  />
                    </div>
                }
                <Divider/>
                {
                    this.state.feed.docUrl && 
                    <div>
                        <div className="answer_img">
                            <Upload
                            {...uploadProps}
                            >
                                <Button icon={<UploadOutlined />}>Upload your answer</Button>
                            </Upload>
                            <Button style={{marginTop: '23px'}} onClick={this.uploadHandler}>Submit</Button>
                        </div>
                        <Divider/>
                        <h2>Answers {this.state.feed.comments.length}</h2>
                        <div className="comments">
                        <List
                        bordered
                        >
                            {this.state.feed.comments.map((item, index) => (
                                    <List.Item 
                                        actions={[<Button key="list-loadmore-edit" onClick={() => this.showImage(item.docUrl)}>View</Button>]}
                                        key={index}
                                    >
                                        <Skeleton avatar title={false} loading={item.loading} active>
                                        <List.Item.Meta
                                            avatar={<h3>{index + 1}</h3>}
                                        />
                                        </Skeleton>
                                    </List.Item>        
                            ))}
                        </List>
                        </div>
                        
                    </div>
                }
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        token: state.auth.token
    }
}

export default connect(mapStateToProps)(FeedItem) ;