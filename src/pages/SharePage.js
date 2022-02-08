import {Component} from 'react';
import { Button, Form, Upload, Input, Select } from 'antd';
import {UploadOutlined} from "@ant-design/icons"
import Editor from '../components/Editor';
import "./SharePage.css"
import axios from 'axios';
import {connect } from "react-redux";

class SharePage extends Component{
    state = {
        editorHtml: "",
        current: "article",
        fileList: []
    }
    
    rteChange = (content, delta, source, editor) => {
        localStorage.setItem("html", editor.getHTML())
    }
    componentDidMount = () => {
        this.setState({editorHtml: localStorage.getItem("html")});
    }
    handleClick = (event, key) => {
        this.setState({current: key});
    }
    onFinishHandler =  async (values) => {
        try {
            const { fileList } = this.state;
        // let docUrl ;
        const newValues = {...values};
        if (this.state.current === "question"){
            let formdata = new FormData();
            formdata.append('files', fileList[0]);
            const {data} = await axios.post("http://34.238.193.147:4000/", formdata);
            newValues["docUrl"] = "http://34.238.193.147:4000/uploads/" + data.imageLink;
            newValues["type"] = "question";
        }else {
            newValues["content"] = this.state.editorHtml;
            newValues["type"] = "article";
        }
        const {data} = await axios.post("http://35.170.82.230:5000/api/feed", newValues, {headers: {
            "Authorization": `Bearer ${this.props.token}`}});
        console.log(data);
        this.props.history.push("/");
        } catch (error) {
            
        }
    }

    render(){
        const {Option} = Select;
        const subjects = ["math", "physics", "cs", "chemistry"];
        const options = subjects.map(s => <Option key={s} value={s} >{s}</Option>);
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
            <div className="sharepage">
                <div className="sharepage__content" style={{marginBottom:'23px', padding: '12px'}}>
                    <div style={{display:'flex', flexDirection:'row'}}>
                        <Button type="primary" onClick={(event) => this.handleClick(event, "article")}>Article</Button>
                        <Button onClick={(event) => this.handleClick(event, "question")}>Question</Button>
                    </div>
                </div>


                {this.state.current === "question" &&
                <div className="sharepage__content" style={{padding:'15px'}}>
                    <Upload
                        {...uploadProps}
                    >
                        <Button icon={<UploadOutlined />}>Click to Upload</Button>
                    </Upload>
                </div>
                
                
                }

                <div className="sharepage__content">
                    <Form
                        onFinish={this.onFinishHandler}
                    >
                            <Form.Item
                                label="title"
                                name="title"
                                rules={[{ required: true, message: 'Please input the title!' }]}
                                className="sharepage__content"
                                style={{marginTop: '23px'}}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="subject"
                                name="subject"
                                rules={[
                                {
                                    required: true,
                                    message: 'Please select subject',
                                },
                                ]}
                                className="sharepage__content"
                                style={{marginTop: '23px'}}
                            >
                                <Select>
                                    {options}
                                </Select>
                            </Form.Item>
                    
                            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                                <Button type="primary" htmlType="submit" style={{marginBottom:'12px'}}>
                                    Publish
                                </Button>    
                            </Form.Item>
                        </Form>
                </div>
                {this.state.current === "article" && 
               
                        
                        <Editor editorHtml={this.state.editorHtml} onChange={this.rteChange} className="sharepage__content" />
                        
                }
            </div>
        );
    }
}
const mapStateToProps = state => {
    return{
        token: state.auth.token
    }
}

export default connect(mapStateToProps)(SharePage);